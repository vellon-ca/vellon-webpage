import type { Metadata } from "next";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { Values } from "@/components/home/Values";
import { CTA } from "@/components/CTA";
import { facts } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Vellon builds operational software for the organisations that keep things moving — from individuals to enterprises, healthcare systems and government.",
};

const beliefs = [
  {
    index: "01",
    title: "Most software is built for one room",
    body: "One market, one user, one problem. That is a reasonable way to start a company and a poor way to build infrastructure. The systems people actually depend on have to work in rooms their authors never visited.",
  },
  {
    index: "02",
    title: "Reliability is the product",
    body: "A dispatcher at six in the morning does not care which model is underneath. They care that the screen loads, the record is right, and the thing they clicked yesterday still works today. Everything else is downstream of that.",
  },
  {
    index: "03",
    title: "Permanence over relevance",
    body: "We are building a company meant to outlast the technologies it was founded on. That means shipping less, changing carefully, and treating every migration as something a real business has to live through.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-14 md:pt-48 md:pb-20">
        <div className="mx-auto max-w-[86rem] px-6 md:px-10">
          <Reveal>
            <p className="label">Company</p>
            <h1 className="display display-xl mt-6 max-w-[13ch] text-balance">
              A company built to be depended on.
            </h1>
          </Reveal>

          <div className="mt-12 h-px w-full bg-rule md:mt-16" />

          <Reveal delay={0.1} className="grid grid-cols-12 gap-y-8 pt-8">
            <p className="lede col-span-12 max-w-[56ch] text-pretty md:col-span-6 md:col-start-4">
              Vellon builds the software that turns complex operations into
              simple, intelligent systems. Dispatch, records, scheduling,
              settlement — the work an organisation is run from, and the record
              of it that outlives the day.
            </p>
            <dl className="col-span-12 md:col-span-2 md:col-start-11">
              {facts.map((f) => (
                <div
                  key={f.term}
                  className="border-t border-rule py-2.5 first:border-t-0 md:first:border-t"
                >
                  <dt className="label">{f.term}</dt>
                  <dd className="mt-1 text-[0.8125rem] text-fg-2">
                    {f.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section
        id="mission"
        className="relative overflow-hidden border-y border-rule bg-surface py-20 md:py-28"
      >
        <div className="mx-auto max-w-[86rem] px-6 md:px-10">
          <div className="grid grid-cols-12 gap-x-0 gap-y-12 md:gap-x-10">
            <Reveal className="col-span-12 md:col-span-6">
              <p className="label !text-brass">Mission</p>
              <p className="display mt-6 max-w-[20ch] text-[clamp(1.4rem,2.5vw,2.15rem)] leading-[1.24]">
                To build technology the world can rely on — across every sector,
                every border, and every generation.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="col-span-12 md:col-span-5 md:col-start-8">
              <p className="label !text-brass">Vision</p>
              <p className="display mt-6 max-w-[20ch] text-[clamp(1.4rem,2.5vw,2.15rem)] leading-[1.24]">
                A future where Vellon is woven into how the world operates — not
                just used, but depended upon.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[86rem] px-6 md:px-10">
          <Reveal className="grid grid-cols-12 gap-y-5 pb-10 md:pb-14">
            <p className="label col-span-12 md:col-span-3">What we believe</p>
            <h2 className="display display-lg col-span-12 max-w-[18ch] md:col-span-7 md:col-start-4">
              The world is at an inflection point.
            </h2>
          </Reveal>

          <Stagger className="border-t border-rule">
            {beliefs.map((b) => (
              <StaggerItem key={b.index}>
                <div className="grid grid-cols-12 gap-x-6 gap-y-3 border-b border-rule py-8 md:py-11">
                  <span className="numeral col-span-2 text-sm text-brass md:col-span-1">
                    {b.index}
                  </span>
                  <h3 className="display col-span-10 max-w-[18ch] text-[clamp(1.2rem,1.9vw,1.7rem)] leading-tight md:col-span-4">
                    {b.title}
                  </h3>
                  <p className="col-span-12 col-start-1 max-w-[54ch] text-pretty text-[0.9375rem] leading-relaxed text-fg-2 md:col-span-6 md:col-start-6">
                    {b.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <Values />
      <CTA />
    </>
  );
}
