"use client";

import Link from "next/link";
import { verticals } from "@/lib/site";
import { Reveal, Stagger, StaggerItem } from "../Reveal";

/* An index, not a card grid. Rows separated by hairlines, numbered,
   with the accent rule drawing in on hover. */
export function VerticalsIndex() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-[86rem] px-6 md:px-10">
        <Reveal className="grid grid-cols-12 gap-y-5 pb-10 md:pb-14">
          <p className="label col-span-12 md:col-span-3">Practice areas</p>
          <h2 className="display display-lg col-span-12 md:col-span-6 md:col-start-4">
            Four places the work happens.
          </h2>
        </Reveal>

        <Stagger className="border-t border-rule">
          {verticals.map((v) => (
            <StaggerItem key={v.slug}>
              <Link
                href={`/${v.slug}`}
                className="index-row group grid grid-cols-12 items-baseline gap-x-4 gap-y-2 border-b border-rule px-1 py-7 hover:bg-paper-2 md:py-9"
              >
                <span className="numeral col-span-2 text-sm text-ink-3 transition-colors group-hover:text-accent md:col-span-1">
                  {v.index}
                </span>
                <span className="display display-md col-span-10 md:col-span-4">
                  {v.name}
                </span>
                <span className="col-span-12 max-w-[46ch] text-pretty text-[0.9375rem] leading-relaxed text-ink-2 md:col-span-6 md:col-start-6">
                  {v.blurb}
                </span>
                <span
                  aria-hidden
                  className="hidden text-ink-3 transition-all duration-500 group-hover:translate-x-1.5 group-hover:text-accent md:col-span-1 md:block md:justify-self-end"
                >
                  &rarr;
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
