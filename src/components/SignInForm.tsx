"use client";

import Link from "next/link";

export function SignInForm() {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // No auth backend yet — wire to Supabase/your provider when ready.
  }

  return (
    <div>
      <p className="label">Account</p>
      <h1 className="display mt-5 text-[clamp(2rem,3.4vw,2.8rem)] leading-tight">
        Sign in to Vellon.
      </h1>
      <p className="mt-4 text-[0.9375rem] text-fg-2">
        Welcome back. Enter your details to continue.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 space-y-8 border-t border-rule-2 pt-8"
      >
        <div>
          <label htmlFor="email" className="label mb-2 block">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            required
            placeholder="you@company.com"
            className="field-line"
          />
        </div>

        <div>
          <div className="mb-2 flex items-baseline justify-between">
            <label htmlFor="password" className="label">
              Password
            </label>
            <button
              type="button"
              className="link-draw text-xs text-fg-3 transition-colors hover:text-fg"
            >
              Forgot?
            </button>
          </div>
          <input
            id="password"
            type="password"
            name="password"
            required
            placeholder="••••••••"
            className="field-line"
          />
        </div>

        <button
          type="submit"
          className="group inline-flex items-center gap-2 border-b border-fg pb-1 text-sm font-semibold text-fg"
        >
          Sign in
          <span className="transition-transform duration-400 group-hover:translate-x-1">
            &rarr;
          </span>
        </button>
      </form>

      <p className="mt-8 text-sm text-fg-2">
        Don&rsquo;t have an account?{" "}
        <Link href="/contact" className="link-draw text-fg">
          Get in touch
        </Link>
      </p>
    </div>
  );
}
