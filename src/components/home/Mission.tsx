"use client";

import { Reveal } from "../Reveal";

export function Mission() {
  return (
    <section
      id="mission"
      className="grain relative overflow-hidden border-y border-rule bg-paper-2 py-24 md:py-36"
    >
      <div className="mx-auto max-w-[86rem] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-y-8">
          <Reveal className="col-span-12 md:col-span-2">
            <p className="label">Why Vellon</p>
          </Reveal>

          {/* Quote hangs off-axis, starting at column four */}
          <Reveal delay={0.1} className="relative col-span-12 md:col-span-9 md:col-start-4">
            <span
              aria-hidden
              className="display pointer-events-none absolute -left-2 -top-10 select-none text-[7rem] leading-none text-accent/18 md:-left-11 md:-top-8 md:text-[9rem]"
            >
              &ldquo;
            </span>
            <blockquote className="display relative text-[clamp(1.5rem,2.9vw,2.55rem)] leading-[1.22] text-ink">
              The company that matters most over the next century won&rsquo;t be
              the one with the cleverest technology. It will be the one whose
              software the world quietly runs on.
            </blockquote>
            <div className="mt-9 flex items-center gap-4">
              <span aria-hidden className="h-px w-10 bg-accent" />
              <p className="label !text-ink-2">That is the company we&rsquo;re building</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
