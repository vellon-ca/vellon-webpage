"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.21, 0.47, 0.32, 0.98] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-40 pb-24 md:pt-52 md:pb-32">
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 grid-bg" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2 glow" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-32 h-[420px] w-[420px] -translate-x-1/2 rounded-full"
        style={{
          background:
            "conic-gradient(from 90deg, rgba(99,102,241,0.0), rgba(99,102,241,0.25), rgba(34,211,238,0.18), rgba(99,102,241,0.0))",
          filter: "blur(60px)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface/60 px-3.5 py-1.5 text-xs text-muted backdrop-blur"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          AI-first technology company · Early stage
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05, ease }}
          className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight text-white md:text-7xl"
        >
          <span className="text-gradient">AI infrastructure for</span>
          <br />
          <span className="text-gradient-accent">the modern world.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease }}
          className="mx-auto mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-muted md:text-xl"
        >
          Vellon builds intelligent software for individuals, enterprises,
          healthcare systems, and governments. Not a single tool — infrastructure
          the world can rely on.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            href="/contact"
            className="group w-full rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-transform hover:scale-[1.03] sm:w-auto"
          >
            Get in touch
            <span className="ml-1.5 inline-block transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
          <Link
            href="/about"
            className="w-full rounded-full border border-border-strong bg-surface/40 px-6 py-3 text-sm font-medium text-white backdrop-blur transition-colors hover:bg-surface sm:w-auto"
          >
            Our mission
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
