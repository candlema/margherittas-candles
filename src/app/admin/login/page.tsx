import { redirect } from "next/navigation";
import { createSession, isAuthed } from "@/lib/auth";

async function login(formData: FormData) {
  "use server";
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    await createSession();
    redirect("/admin");
  }
  redirect("/admin/login?error=1");
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAuthed()) redirect("/admin");
  const { error } = await searchParams;

  return (
    <div className="flex min-h-dvh items-center justify-center bg-navy px-5">
      <div className="w-full max-w-sm rounded-2xl bg-cream p-8 shadow-2xl">
        <p className="text-center font-script text-4xl text-navy">
          Margherita&rsquo;s
        </p>
        <p className="mt-1 text-center text-xs font-medium uppercase tracking-[0.3em] text-amber-deep">
          Admin
        </p>

        {error && (
          <p className="mt-6 rounded-lg bg-ruby/10 px-4 py-3 text-center text-sm font-medium text-ruby">
            Wrong email or password — try again.
          </p>
        )}

        <form action={login} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="text-xs font-medium uppercase tracking-wider text-navy/60"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="username"
              className="mt-1.5 w-full rounded-lg border border-navy/20 bg-white px-4 py-3 text-sm outline-none focus:border-amber-deep"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-xs font-medium uppercase tracking-wider text-navy/60"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-1.5 w-full rounded-lg border border-navy/20 bg-white px-4 py-3 text-sm outline-none focus:border-amber-deep"
            />
          </div>
          <button
            type="submit"
            className="w-full cursor-pointer rounded-full bg-navy py-3.5 text-sm font-semibold uppercase tracking-wider text-cream transition-colors hover:bg-amber hover:text-navy"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}