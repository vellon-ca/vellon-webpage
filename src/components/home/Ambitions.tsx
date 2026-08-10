"use client";

import { ambitions } from "@/lib/site";
import { Reveal, Stagger, StaggerItem } from "../Reveal";

/* Full-width statements at display size — no invented metrics,
   just what the company is actually trying to do. */
export function Ambitions() {
  return (
    <section className="relative overflow-hidden border-t border-rule py-20 md:py-28">
      <div className="mx-auto max-w-[86rem] px-6 md:px-10">
        <Reveal className="flex flex-wrap items-baseline justify-between gap-4 pb-10 md:pb-14">
          <p className="label">Ambitions</p>
          <p className="label !text-fg-3">Measured in generations</p>
        </Reveal>

        <Stagger className="border-t border-rule">
          {ambitions.map((a) => (
            <StaggerItem key={a.index}>
              <div className="grid grid-cols-12 items-baseline gap-x-4 gap-y-2 border-b border-rule py-7 md:py-10">
                <span className="numeral col-span-2 text-sm text-brass md:col-span-1">
                  {a.index}
                </span>
                <p className="display col-span-10 max-w-[34ch] text-[clamp(1.25rem,2.3vw,2rem)] leading-[1.24] md:col-span-7">
                  {a.text}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
