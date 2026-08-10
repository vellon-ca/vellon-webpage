"use client";

import { values } from "@/lib/site";
import { Reveal, Stagger, StaggerItem } from "../Reveal";

/* A numbered definition list — hairline separated, no boxes. */
export function Values() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-[86rem] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-x-0 gap-y-12 md:gap-x-8">
          <Reveal className="col-span-12 md:col-span-4 md:sticky md:top-28 md:self-start">
            <p className="label">Values</p>
            <h2 className="display display-lg mt-5">
              We think in decades, not quarters.
            </h2>
            <p className="lede mt-6 max-w-[34ch] text-pretty">
              Software that people organise their working day around has to
              still be there in ten years. That shapes what we build, and what
              we don't.
            </p>
          </Reveal>

          <Stagger className="col-span-12 md:col-span-7 md:col-start-6">
            {values.map((v) => (
              <StaggerItem key={v.name}>
                <div className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-rule py-6 sm:grid-cols-[3rem_9rem_1fr] sm:gap-x-6 sm:py-7">
                  <span className="numeral text-sm text-brass">{v.index}</span>
                  <h3 className="display text-[1.35rem] leading-tight">
                    {v.name}
                  </h3>
                  <p className="col-start-2 mt-2 max-w-[44ch] text-pretty text-[0.9375rem] leading-relaxed text-fg-2 sm:col-start-3 sm:mt-0">
                    {v.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
