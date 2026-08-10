"use client";

import { Reveal } from "../Reveal";

/* A statement block, not a quotation. In this idiom the emphasis comes
   from the brass rule and the scale jump, not from a decorative glyph. */
export function Mission() {
  return (
    <section
      id="mission"
      className="relative overflow-hidden border-y border-rule bg-surface py-20 md:py-28"
    >
      <div className="mx-auto max-w-[86rem] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-y-8">
          <Reveal className="col-span-12 md:col-span-2">
            <p className="label">Why Vellon</p>
          </Reveal>

          <Reveal delay={0.1} className="col-span-12 md:col-span-9 md:col-start-4">
            <p className="display text-[clamp(1.45rem,2.75vw,2.4rem)] leading-[1.2]">
              The company that matters most over the next century won&rsquo;t be
              the one with the cleverest technology. It will be the one whose
              software the world quietly runs on.
            </p>
            <div className="mt-9 flex items-center gap-4">
              <span aria-hidden className="h-px w-10 bg-brass" />
              <p className="label">That is the company we&rsquo;re building</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
