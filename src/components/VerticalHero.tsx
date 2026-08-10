"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Vertical } from "@/lib/site";
import { ease } from "./Reveal";
import { SpellOut } from "./SpellOut";

/* The index numeral arrives like an odometer coming to rest: the last digit
   rolls through the ten and lands on the sector's number.

   Rolling a fixed number of steps *backwards from the target* rather than
   counting up from 00 is what keeps the four pages consistent. A count-up
   gives /individuals a single tick to 01 and /government four to 04 — same
   template, four different-feeling animations, with the flagship page getting
   the least. This way every page rolls the same distance for the same length
   of time and only the resting digit differs.

   Starts from the real value so the server HTML and the first client render
   agree; the roll begins in an effect, after mount. */
const STEPS = 8;
const TICK = 62;

function useSettlingIndex(index: string, still: boolean | null) {
  const [shown, setShown] = useState(index);

  useEffect(() => {
    if (still) return;

    const target = Number(index.slice(-1));
    const head = index.slice(0, -1);
    /* +10*n keeps the modulo positive for any STEPS. */
    const seq = Array.from(
      { length: STEPS },
      (_, k) => (target - STEPS + k + 10 * STEPS) % 10,
    );

    let k = 0;
    setShown(head + seq[0]);
    const id = setInterval(() => {
      k += 1;
      if (k >= seq.length) {
        clearInterval(id);
        setShown(index);
      } else {
        setShown(head + seq[k]);
      }
    }, TICK);

    return () => clearInterval(id);
  }, [index, still]);

  return shown;
}

export function VerticalHero({ vertical }: { vertical: Vertical }) {
  const still = useReducedMotion();
  const digits = useSettlingIndex(vertical.index, still);

  const rise = (delay = 0, y = 16) => ({
    initial: { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: still ? { duration: 0 } : { duration: 1, delay, ease },
  });

  return (
    <section className="relative overflow-hidden pt-36 pb-14 md:pt-48 md:pb-20">
      <div className="mx-auto max-w-[86rem] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-x-6 gap-y-6">
          {/* The index numeral is used as a graphic element, not decoration.
              Tabular figures mean the roll can't shift the layout. */}
          <motion.span
            aria-hidden
            {...rise(0, 0)}
            className="numeral col-span-12 select-none text-[clamp(3.5rem,7vw,6.5rem)] leading-[0.8] text-fg/14 md:col-span-2"
          >
            {digits}
          </motion.span>

          <div className="col-span-12 md:col-span-10 md:col-start-3">
            {/* The sector's name types itself in. The headline underneath
                keeps its plain lift — two competing entrances on one hero
                reads as noise, and this is the line that names the page. */}
            <p className="label !text-brass">
              <SpellOut text={`For ${vertical.name}`} delay={0.12} />
            </p>
            <motion.h1
              {...rise(0.34)}
              className="display mt-5 max-w-[16ch] text-balance text-[clamp(2.4rem,5.6vw,4.8rem)]"
            >
              {vertical.tagline}
            </motion.h1>
          </div>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={still ? { duration: 0 } : { duration: 1.2, delay: 0.5, ease }}
          style={{ transformOrigin: "left" }}
          className="mt-12 h-px w-full bg-rule md:mt-14"
        />

        <motion.div {...rise(0.64, 12)} className="grid grid-cols-12 gap-y-7 pt-8">
          <p className="lede col-span-12 max-w-[52ch] text-pretty md:col-span-6 md:col-start-3">
            {vertical.description}
          </p>
          <div className="col-span-12 md:col-span-3 md:col-start-10 md:justify-self-end">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 border-b border-fg pb-1 text-sm font-semibold text-fg"
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
