"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Vertical } from "@/lib/site";
import { ease } from "./Reveal";

export function VerticalHero({ vertical }: { vertical: Vertical }) {
  const still = useReducedMotion();
  const rise = (delay = 0, y = 16) => ({
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: still ? { duration: 0 } : { duration: 1, delay, ease },
  });

  return (
    <section className="grain relative overflow-hidden pt-36 pb-14 md:pt-48 md:pb-20">
      <div className="mx-auto max-w-[86rem] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-x-6 gap-y-6">
          {/* The index numeral is used as a graphic element, not decoration */}
          <motion.span
            aria-hidden
            {...rise(0, 0)}
            className="numeral numeral-display col-span-12 select-none text-[clamp(3.5rem,7vw,6.5rem)] leading-[0.8] text-ink/12 md:col-span-2"
          >
            {vertical.index}
          </motion.span>

          <div className="col-span-12 md:col-span-10 md:col-start-3">
            <motion.p {...rise(0.05, 0)} className="label !text-accent">
              For {vertical.name}
            </motion.p>
            <motion.h1
              {...rise(0.1)}
              className="display mt-5 max-w-[16ch] text-balance text-[clamp(2.4rem,5.6vw,4.8rem)]"
            >
              {vertical.tagline}
            </motion.h1>
          </div>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={still ? { duration: 0 } : { duration: 1.2, delay: 0.25, ease }}
          style={{ transformOrigin: "left" }}
          className="mt-12 h-px w-full bg-rule md:mt-14"
        />

        <motion.div {...rise(0.4, 12)} className="grid grid-cols-12 gap-y-7 pt-8">
          <p className="lede col-span-12 max-w-[52ch] text-pretty md:col-span-6 md:col-start-3">
            {vertical.description}
          </p>
          <div className="col-span-12 md:col-span-3 md:col-start-10 md:justify-self-end">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 border-b border-ink pb-1 text-sm font-semibold text-ink"
            >
              Talk to us
              <span className="transition-transform duration-400 group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
