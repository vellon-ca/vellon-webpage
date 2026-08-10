import Link from "next/link";

/* On a dark ground the contrasting band lifts rather than drops — a raised
   surface with a brass edge, so it still reads as a distinct material. */
export function CTA({
  title = "Let's build something worth relying on.",
  body = "Tell us what you're working on. We read every message that comes in.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="relative overflow-hidden border-t border-rule">
      <div className="mx-auto max-w-[86rem] px-6 py-16 md:px-10 md:py-20">
        <div className="border-t-2 border-brass bg-surface">
          <div className="grid grid-cols-12 items-end gap-y-10 px-6 py-14 md:px-12 md:py-16">
            <div className="col-span-12 md:col-span-7">
              <p className="label">Get in touch</p>
              <h2 className="display display-lg mt-6 max-w-[18ch] text-balance">
                {title}
              </h2>
            </div>

            <div className="col-span-12 md:col-span-4 md:col-start-9">
              <p className="max-w-[36ch] text-pretty text-[0.9375rem] leading-relaxed text-fg-2">
                {body}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 border-b border-fg pb-1 text-sm font-semibold text-fg"
                >
                  Start a conversation
                  <span className="transition-transform duration-400 group-hover:translate-x-1">
                    &rarr;
                  </span>
                </Link>
                <a
                  href="mailto:hello@vellon.ca"
                  className="link-draw text-sm text-fg-2 transition-colors hover:text-fg"
                >
                  hello@vellon.ca
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
