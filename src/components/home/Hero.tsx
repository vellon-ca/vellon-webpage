"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { facts } from "@/lib/site";
import { SectorStack } from "../SectorStack";
import { ease } from "../Reveal";

export function Hero() {
  const still = useReducedMotion();
  const rise = (delay = 0, y = 18) => ({
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: still ? { duration: 0 } : { duration: 1, delay, ease },
  });

  return (
    <section className="relative overflow-hidden pt-32 pb-14 md:pt-40 md:pb-20">
      <div className="mx-auto max-w-[86rem] px-6 md:px-10">
        {/* Headline left, figure right — the drawing carries the argument */}
        <div className="grid grid-cols-12 items-center gap-x-0 gap-y-12 lg:gap-x-10">
          <div className="col-span-12 lg:col-span-6">
            <motion.div {...rise(0, 0)} className="mb-7 h-px w-10 bg-brass" />
            <motion.h1 {...rise(0.05)} className="display display-xl">
              Intelligent software for how the world works.
            </motion.h1>
            <motion.p
              {...rise(0.15, 14)}
              className="lede mt-8 max-w-[46ch] text-pretty"
            >
              Vellon builds AI-native software for people, organisations, and
              institutions — turning complex work into systems that are simpler,
              more capable, and built to adapt.
            </motion.p>
            <motion.div
              {...rise(0.25, 12)}
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 border-b border-fg pb-1 text-sm font-semibold text-fg"
              >
                Get in touch
                <span className="transition-transform duration-400 group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
              <Link
                href="/about"
                className="link-draw text-sm font-medium text-fg-2 transition-colors hover:text-fg"
              >
                Our mission
              </Link>
            </motion.div>
          </div>

          {/* No wrapper fade here: the figure draws itself in, and fading the
              whole thing would play that reveal at low opacity. */}
          <div className="col-span-12 lg:col-span-6 lg:pl-4">
            <SectorStack className="h-auto w-full max-w-[620px]" />
          </div>
        </div>

        {/* Company metadata as an instrument read-out. The cells carry their
            own top rules, so the line reads as segmented rather than solid. */}
        <motion.dl
          {...rise(0.45, 10)}
          className="mt-20 grid grid-cols-1 gap-x-12 gap-y-0 sm:grid-cols-3 md:mt-28"
        >
          {facts.map((f) => (
            <div
              key={f.term}
              className="flex flex-col gap-1.5 border-t border-rule pt-4"
            >
              <dt className="label">{f.term}</dt>
              <dd className="text-[0.875rem] text-fg-2">{f.detail}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
