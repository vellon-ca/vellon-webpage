"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { facts } from "@/lib/site";
import { ease } from "../Reveal";

export function Hero() {
  const still = useReducedMotion();
  /* With reduced motion we hand the settled state straight to the DOM. */
  const rise = (delay = 0, y = 18) => ({
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: still ? { duration: 0 } : { duration: 1, delay, ease },
  });

  return (
    <section className="grain relative overflow-hidden pt-36 pb-16 md:pt-48 md:pb-20">
      <div className="mx-auto max-w-[86rem] px-6 md:px-10">
        {/* Headline sits left, metadata rail sits right — deliberately off-centre */}
        <div className="grid grid-cols-12 gap-y-10">
          <motion.h1
            {...rise(0)}
            className="display display-xl col-span-12 lg:col-span-9"
          >
            Software that runs
            <br />
            the work <span className="text-accent">underneath</span>.
          </motion.h1>

          <motion.dl
            {...rise(0.35, 0)}
            className="col-span-12 self-end lg:col-span-3 lg:pb-2"
          >
            {facts.map((f) => (
              <div
                key={f.term}
                className="flex items-baseline justify-between border-t border-rule py-2.5"
              >
                <dt className="label">{f.term}</dt>
                <dd className="text-[0.8125rem] text-ink-2">{f.detail}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={still ? { duration: 0 } : { duration: 1.3, delay: 0.2, ease }}
          style={{ transformOrigin: "left" }}
          className="mt-10 h-px w-full bg-rule md:mt-14"
        />

        {/* The lede is indented into the grid rather than centred under the title */}
        <motion.div
          {...rise(0.45, 14)}
          className="grid grid-cols-12 gap-y-8 pt-8 md:pt-10"
        >
          <p className="lede col-span-12 max-w-[38ch] text-pretty md:col-span-7 md:col-start-4 lg:col-span-5 lg:col-start-4">
            Vellon builds the operational software organisations depend on but
            rarely think about — dispatch, records, scheduling, settlement. The
            layer underneath the work.
          </p>

          <div className="col-span-12 flex flex-wrap items-start gap-x-8 gap-y-4 md:col-span-3 md:col-start-10 md:justify-end lg:col-span-3 lg:col-start-10">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 border-b border-ink pb-1 text-sm font-semibold text-ink"
            >
              Get in touch
              <span className="transition-transform duration-400 group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
            <Link
              href="/about"
              className="link-draw text-sm font-medium text-ink-2 transition-colors hover:text-ink"
            >
              Our mission
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
