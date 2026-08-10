import Link from "next/link";

/* The single dark band on the page — contrast by material, not by effect. */
export function CTA({
  title = "Let's build something worth relying on.",
  body = "Tell us what you're working on. We read every message that comes in.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="grain relative overflow-hidden bg-ink text-paper">
      <div className="mx-auto max-w-[86rem] px-6 py-20 md:px-10 md:py-28">
        <div className="grid grid-cols-12 items-end gap-y-10">
          <div className="col-span-12 md:col-span-7">
            <p className="label !text-paper/45">Get in touch</p>
            <h2 className="display display-lg mt-6 max-w-[16ch] text-balance text-paper">
              {title}
            </h2>
          </div>

          <div className="col-span-12 md:col-span-4 md:col-start-9">
            <p className="max-w-[36ch] text-pretty text-[0.9375rem] leading-relaxed text-paper/65">
              {body}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 border-b border-paper pb-1 text-sm font-semibold text-paper"
              >
                Start a conversation
                <span className="transition-transform duration-400 group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
              <a
                href="mailto:hello@vellon.ca"
                className="link-draw text-sm text-paper/65 transition-colors hover:text-paper"
              >
                hello@vellon.ca
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
