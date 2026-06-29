import type { Metadata } from "next";
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

  return (
    <>
      <VerticalHero vertical={v} />

      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal className="mx-auto mb-14 max-w-xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-white md:text-4xl">
            What we deliver
          </h2>
        </Reveal>

        <Stagger className="grid gap-5 md:grid-cols-3">
          {v.features.map((f) => (
            <StaggerItem
              key={f.title}
              className="card-glow relative h-full overflow-hidden rounded-2xl border border-border bg-surface/60 p-7"
            >
              <div
                className={`mb-5 h-1.5 w-12 rounded-full bg-gradient-to-r ${v.accent}`}
              />
              <h3 className="text-lg font-semibold text-white">{f.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{f.body}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-20">
          <div className="grid gap-3 sm:grid-cols-3">
            {verticals
              .filter((x) => x.slug !== v.slug)
              .map((other) => (
                <a
                  key={other.slug}
                  href={`/${other.slug}`}
                  className="group flex items-center justify-between rounded-xl border border-border bg-surface/40 px-5 py-4 transition-colors hover:border-border-strong"
                >
                  <span className="text-sm text-muted transition-colors group-hover:text-white">
                    Vellon for {other.name}
                  </span>
                  <span className="text-muted-2 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>
              ))}
          </div>
        </Reveal>
      </section>

      <CTA
        title={`Bring Vellon to ${v.name.toLowerCase() === "individuals" ? "your life" : "your organization"}.`}
        body={v.blurb}
      />
    </>
  );
}
