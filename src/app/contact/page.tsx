import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Vellon. Tell us who you are and what you're working on — we read every message.",
};

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden pt-36 pb-24 md:pt-48 md:pb-32">
      <div className="mx-auto max-w-[86rem] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-x-0 gap-y-14 md:gap-x-10">
          <div className="col-span-12 md:col-span-5">
            <p className="label">Contact</p>
            <h1 className="display mt-6 max-w-[13ch] text-balance text-[clamp(2.3rem,4.6vw,3.8rem)]">
              Let&rsquo;s build something worth relying on.
            </h1>
            <p className="lede mt-8 max-w-[38ch] text-pretty">
              Tell us who you are and what you&rsquo;re working on. Every message
              reaches a person.
            </p>

            <dl className="mt-12 max-w-sm">
              <div className="flex items-baseline justify-between border-t border-rule py-3">
                <dt className="label">Email</dt>
                <dd>
                  <a
                    href="mailto:hello@vellon.ca"
                    className="link-draw text-sm text-fg transition-colors hover:text-brass"
                  >
                    hello@vellon.ca
                  </a>
                </dd>
              </div>
              <div className="flex items-baseline justify-between border-t border-b border-rule py-3">
                <dt className="label">Based in</dt>
                <dd className="text-sm text-fg-2">Canada</dd>
              </div>
            </dl>
          </div>

          <div className="col-span-12 md:col-span-6 md:col-start-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
