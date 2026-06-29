"use client";

import { motion } from "framer-motion";

export function SignInForm() {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // No auth backend yet — wire to Supabase/your provider when ready.
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="card-glow relative w-full max-w-md rounded-3xl border border-border bg-surface/60 p-7 md:p-8"
    >
      <h1 className="text-2xl font-semibold tracking-tight text-white">
        Sign in to Vellon
      </h1>
      <p className="mt-2 text-sm text-muted">
        Welcome back. Enter your details to continue.
      </p>

      <form onSubmit={handleSubmit} className="mt-7 space-y-5">
        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="you@company.com"
            className="w-full rounded-lg border border-border bg-background/60 px-3.5 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-muted-2 focus:border-border-strong"
          />
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="block text-xs font-medium uppercase tracking-wider text-muted-2">
              Password
            </label>
            <button
              type="button"
              className="text-xs text-muted transition-colors hover:text-white"
            >
              Forgot?
            </button>
          </div>
          <input
            type="password"
            name="password"
            required
            placeholder="••••••••"
            className="w-full rounded-lg border border-border bg-background/60 px-3.5 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-muted-2 focus:border-border-strong"
          />
        </div>

        <button
          type="submit"
          className="group w-full rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-transform hover:scale-[1.02]"
        >
          Sign in
          <span className="ml-1.5 inline-block transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Don&apos;t have an account?{" "}
        <a href="/contact" className="text-white underline-offset-4 hover:underline">
          Get in touch
        </a>
      </p>
    </motion.div>
  );
}
