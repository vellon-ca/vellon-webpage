"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function CTA({
  title = "Let's build the future, together.",
  body = "Whether you're an individual, an enterprise, a healthcare system, or a government — Vellon is built for you.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-28 pt-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="card-glow relative overflow-hidden rounded-[2rem] border border-border-strong bg-surface px-8 py-16 text-center md:px-16 md:py-24"
      >
        <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[700px] -translate-x-1/2 glow" />
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
        <div className="relative">
          <h2 className="mx-auto max-w-2xl text-balance text-4xl font-semibold tracking-tight text-white md:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-lg text-muted">
            {body}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
              className="w-full rounded-full border border-border-strong bg-transparent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-surface-2 sm:w-auto"
            >
              Learn about Vellon
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
