import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { verticals } from "@/lib/site";
import { VerticalHero } from "@/components/VerticalHero";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { CTA } from "@/components/CTA";

export const dynamicParams = false;

export function generateStaticParams() {
  return verticals.map((v) => ({ vertical: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ vertical: string }>;
}): Promise<Metadata> {
  const { vertical: slug } = await params;
  const v = verticals.find((x) => x.slug === slug);
  if (!v) return {};
  return {
    title: `Vellon for ${v.name}`,
    description: v.description,
  };
}

export default async function VerticalPage({
  params,
}: {
  params: Promise<{ vertical: string }>;
}) {
  const { vertical: slug } = await params;
  const v = verticals.find((x) => x.slug === slug);
  if (!v) notFound();

  const others = verticals.filter((x) => x.slug !== v.slug);

  return (
    <>
      <VerticalHero vertical={v} />

      {/* Broadsheet columns — ruled tops, no boxes */}
      <section className="border-t border-rule bg-surface py-20 md:py-28">
        <div className="mx-auto max-w-[86rem] px-6 md:px-10">
          <Reveal className="pb-10 md:pb-14">
            <p className="label">What we deliver</p>
          </Reveal>

          <Stagger className="grid gap-x-10 gap-y-12 md:grid-cols-3">
            {v.features.map((f, i) => (
              <StaggerItem key={f.title}>
                <div className="border-t border-rule-2 pt-6">
                  <span className="numeral text-sm text-brass">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display mt-4 text-[1.45rem] leading-tight">
                    {f.title}
                  </h3>
                  <p className="mt-3 max-w-[38ch] text-pretty text-[0.9375rem] leading-relaxed text-fg-2">
                    {f.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[86rem] px-6 md:px-10">
          <Reveal>
            <p className="label pb-6">Elsewhere</p>
            <div className="border-t border-rule">
              {others.map((other) => (
                <Link
                  key={other.slug}
                  href={`/${other.slug}`}
                  className="index-row group flex items-baseline justify-between gap-6 border-b border-rule px-1 py-5 hover:bg-surface"
                >
                  <span className="flex items-baseline gap-5">
                    <span className="numeral text-xs text-fg-3 transition-colors group-hover:text-brass">
                      {other.index}
                    </span>
                    <span className="display text-[1.3rem]">
                      Vellon for {other.name}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className="text-fg-3 transition-all duration-500 group-hover:translate-x-1.5 group-hover:text-brass"
                  >
                    &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CTA
        title={`Bring Vellon to ${
          v.slug === "individuals" ? "your day" : "your organisation"
        }.`}
        body={v.blurb}
      />
    </>
  );
}
