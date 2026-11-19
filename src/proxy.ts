import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SESSION_COOKIE = "admin_session";

function secretKey() {
  return new TextEncoder().encode(
    process.env.AUTH_SECRET ?? "dev-secret-change-me"
  );
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // The login page must stay reachable
  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  const token = req.cookies.get(SESSION_COOKIE)?.value;
  let authed = false;
  if (token) {
    try {
      await jwtVerify(token, secretKey());
      authed = true;
    } catch {
      authed = false;
    }
  }

  if (!authed) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};