"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Vertical } from "@/lib/site";

const ease = [0.21, 0.47, 0.32, 0.98] as const;

export function VerticalHero({ vertical }: { vertical: Vertical }) {
  return (
    <section className="relative overflow-hidden pt-40 pb-20 md:pt-52 md:pb-28">
      <div className="pointer-events-none absolute inset-0 grid-bg" />
      <div
        className="pointer-events-none absolute left-1/2 top-10 h-[480px] w-[760px] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle at center, ${vertical.glow}, transparent 60%)` }}
      />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className={`mb-5 inline-block rounded-full border border-border-strong bg-surface/60 bg-gradient-to-r px-4 py-1.5 text-sm font-medium ${vertical.accent} bg-clip-text text-transparent backdrop-blur`}
        >
          For {vertical.name}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05, ease }}
          className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight text-white md:text-6xl"
        >
          {vertical.tagline}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease }}
          className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted md:text-xl"
        >
          {vertical.description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease }}
          className="mt-9"
        >
          <Link
            href="/contact"
            className="group inline-block rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-transform hover:scale-[1.03]"
          >
            Talk to us
            <span className="ml-1.5 inline-block transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
