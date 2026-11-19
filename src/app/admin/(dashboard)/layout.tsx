import Link from "next/link";
import { redirect } from "next/navigation";
import { destroySession, isAuthed } from "@/lib/auth";

async function logout() {
  "use server";
  await destroySession();
  redirect("/admin/login");
}

const nav = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Second line of defence — middleware already redirected strangers
  if (!(await isAuthed())) redirect("/admin/login");

  return (
    <div className="min-h-dvh bg-sand/50">
      <header className="border-b border-navy/10 bg-navy text-cream">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4">
          <Link href="/admin" className="flex items-baseline gap-2">
            <span className="font-script text-2xl text-amber">
              Margherita&rsquo;s
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-cream/60">
              Admin
            </span>
          </Link>
          <nav className="flex flex-wrap items-center gap-1 text-sm">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="rounded-full px-4 py-2 transition-colors hover:bg-cream/10"
              >
                {n.label}
              </Link>
            ))}
            <Link
              href="/"
              className="rounded-full px-4 py-2 text-cream/60 transition-colors hover:bg-cream/10 hover:text-cream"
            >
              View store ↗
            </Link>
            <form action={logout} className="inline">
              <button
                type="submit"
                className="cursor-pointer rounded-full border border-cream/25 px-4 py-2 transition-colors hover:border-amber hover:text-amber"
              >
                Log out
              </button>
            </form>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-10">{children}</main>
    </div>
  );
}