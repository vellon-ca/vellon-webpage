"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "../Reveal";

const goals = [
  {
    metric: "Billions",
    label: "of users served across every continent",
  },
  {
    metric: "4",
    label: "core verticals — individuals to governments",
  },
  {
    metric: "∞",
    label: "built to outlast trends and market cycles",
  },
];

const ambitions = [
  "Become the most trusted AI solutions company in the world",
  "Earn the confidence of governments, healthcare institutions, and Fortune 500 enterprises",
  "Build products so essential the world cannot function without them",
  "Grow into a generational company that outlasts technologies",
];

export function Goals() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative overflow-hidden border-t border-border py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-50" />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent">
            Our goals
          </p>
          <h2 className="text-balance text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Ambition, measured in generations
          </h2>
        </Reveal>

        <div ref={ref} className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-3">
          {goals.map((g, i) => (
            <motion.div
              key={g.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="bg-surface px-8 py-12 text-center"
            >
              <div className="text-5xl font-semibold tracking-tight text-gradient-accent md:text-6xl">
                {g.metric}
              </div>
              <p className="mx-auto mt-3 max-w-[14rem] text-sm leading-relaxed text-muted">
                {g.label}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mx-auto mt-12 grid max-w-3xl gap-3 sm:grid-cols-2">
          {ambitions.map((a, i) => (
            <motion.div
              key={a}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex items-start gap-3 rounded-xl border border-border bg-surface/50 px-4 py-3.5"
            >
              <span className="mt-0.5 text-accent">✓</span>
              <span className="text-sm leading-relaxed text-muted">{a}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
