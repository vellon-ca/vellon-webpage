import type { Metadata } from "next";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { Values } from "@/components/home/Values";
import { CTA } from "@/components/CTA";

export const metadata: Metadata = {
  title: "About",
  description:
    "Vellon is a global AI-first technology company built to serve everyone — infrastructure for the modern world.",
};

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-40 pb-16 md:pt-52 md:pb-24">
        <div className="pointer-events-none absolute inset-0 grid-bg" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-[460px] w-[760px] -translate-x-1/2 glow" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <p className="mb-5 text-sm font-medium uppercase tracking-widest text-accent">
              Who we are
            </p>
            <h1 className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight text-white md:text-6xl">
              <span className="text-gradient">
                Infrastructure for the modern world
              </span>
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-muted md:text-xl">
              Vellon is a global AI-first technology company built to serve
              everyone. From individuals to enterprises, healthcare systems to
              governments — we deliver intelligent software that solves real
              problems at every level of society.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="mission" className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="grid gap-5 md:grid-cols-2">
          <Reveal className="card-glow relative overflow-hidden rounded-3xl border border-border bg-surface/60 p-9">
            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
            <h2 className="text-sm font-medium uppercase tracking-widest text-accent">
              Our mission
            </h2>
            <p className="mt-5 text-2xl font-medium leading-snug tracking-tight text-white md:text-3xl">
              To build technology that the world can rely on — across every
              sector, every border, and every generation.
            </p>
          </Reveal>
          <Reveal
            delay={0.1}
            className="card-glow relative overflow-hidden rounded-3xl border border-border bg-surface/60 p-9"
          >
            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-accent-2/20 blur-3xl" />
            <h2 className="text-sm font-medium uppercase tracking-widest text-accent-2">
              Our vision
            </h2>
            <p className="mt-5 text-2xl font-medium leading-snug tracking-tight text-white md:text-3xl">
              A future where Vellon is woven into the fabric of how the world
              operates — not just used, but depended upon.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border bg-surface/30 py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal>
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl">
              The world is at an inflection point
            </h2>
          </Reveal>
          <Stagger className="mt-8 space-y-6" stagger={0.12}>
            {[
              "AI is reshaping every industry simultaneously. Most companies are building for one market, one user, one problem. Vellon is built for all of them.",
              "We believe the most important technology company of the next century won't be the one that built the smartest model — it will be the one that made AI work for everyone, everywhere, at every scale.",
              "We are building for permanence, not relevance. A generational company that outlasts trends, technologies, and market cycles.",
            ].map((p) => (
              <StaggerItem key={p}>
                <p className="text-lg leading-relaxed text-muted">{p}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-8 font-mono text-sm text-muted-2">
              <span>
                <span className="text-white">Headquarters</span> · Canada
              </span>
              <span>
                <span className="text-white">Sector</span> · AI &amp; Technology
              </span>
              <span>
                <span className="text-white">Stage</span> · Early stage
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <Values />
      <CTA />
    </>
  );
}
