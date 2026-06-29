"use client";

import { values } from "@/lib/site";
import { Reveal, Stagger, StaggerItem } from "../Reveal";

export function Values() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <Reveal>
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent">
            Our values
          </p>
          <h2 className="text-balance text-4xl font-semibold tracking-tight text-white md:text-5xl">
            We think in decades, not quarters
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-muted">
            The world is at an inflection point. AI is reshaping every industry
            at once. We&apos;re building for permanence — technology worthy of the
            institutions that depend on it.
          </p>
        </Reveal>

        <Stagger className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
          {values.map((v) => (
            <StaggerItem
              key={v.name}
              className="group bg-surface p-6 transition-colors hover:bg-surface-2"
            >
              <div className="flex h-full flex-col">
                <h3 className="text-lg font-semibold text-white">{v.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {v.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
