"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Mission() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.3]);

  const words =
    "We believe the most important technology company of the next century won't be the one that built the smartest model — it will be the one that made AI work for everyone, everywhere, at every scale.".split(
      " "
    );

  return (
    <section
      ref={ref}
      id="mission"
      className="relative overflow-hidden border-y border-border py-32 md:py-44"
    >
      <motion.div
        style={{ y }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 glow opacity-60"
      />
      <motion.div style={{ opacity }} className="relative mx-auto max-w-4xl px-6">
        <p className="mb-8 text-center text-sm font-medium uppercase tracking-widest text-accent">
          Why Vellon
        </p>
        <p className="text-center text-2xl font-medium leading-snug tracking-tight text-white md:text-4xl md:leading-snug">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0.15 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, margin: "-30% 0px -30% 0px" }}
              transition={{ duration: 0.4, delay: i * 0.015 }}
              className="inline-block"
            >
              {word}&nbsp;
            </motion.span>
          ))}
        </p>
        <p className="mt-12 text-center text-xl font-semibold text-gradient-accent">
          That company is Vellon.
        </p>
      </motion.div>
    </section>
  );
}
