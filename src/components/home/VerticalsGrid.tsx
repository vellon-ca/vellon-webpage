"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { verticals } from "@/lib/site";
import { Reveal } from "../Reveal";

export function VerticalsGrid() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent">
          One company, every scale
        </p>
        <h2 className="text-balance text-4xl font-semibold tracking-tight text-white md:text-5xl">
          Built for everyone, everywhere
        </h2>
        <p className="mt-4 text-pretty text-lg text-muted">
          Most companies build for one market. Vellon delivers intelligent
          software across four core verticals.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-5 md:grid-cols-2">
        {verticals.map((v, i) => (
          <motion.div
            key={v.slug}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.7,
              delay: (i % 2) * 0.1,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
          >
            <Link
              href={`/${v.slug}`}
              className="card-glow group relative block h-full overflow-hidden rounded-3xl border border-border bg-surface/60 p-8 transition-colors hover:border-border-strong"
            >
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: v.glow }}
              />
              <div className="relative">
                <div
                  className={`mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${v.accent} text-black`}
                >
                  <VerticalIcon slug={v.slug} />
                </div>
                <h3 className="text-xl font-semibold text-white">{v.name}</h3>
                <p
                  className={`mt-1 bg-gradient-to-r ${v.accent} bg-clip-text text-sm font-medium text-transparent`}
                >
                  {v.tagline}
                </p>
                <p className="mt-4 text-pretty leading-relaxed text-muted">
                  {v.blurb}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-white">
                  Learn more
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function VerticalIcon({ slug }: { slug: string }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (slug) {
    case "individuals":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
        </svg>
      );
    case "enterprise":
      return (
        <svg {...common}>
          <rect x="4" y="3" width="16" height="18" rx="1" />
          <path d="M9 8h.01M15 8h.01M9 12h.01M15 12h.01M10 21v-3h4v3" />
        </svg>
      );
    case "healthcare":
      return (
        <svg {...common}>
          <path d="M3 12h4l2 5 4-12 2 7h6" />
        </svg>
      );
    case "government":
      return (
        <svg {...common}>
          <path d="M3 21h18M5 21V11l7-5 7 5v10M9 21v-6h6v6" />
        </svg>
      );
    default:
      return null;
  }
}
