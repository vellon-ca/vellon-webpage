import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Vellon. Whether you're an individual, enterprise, healthcare system, or government — we'd love to talk.",
};

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden pt-40 pb-28 md:pt-52">
      <div className="pointer-events-none absolute inset-0 grid-bg" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[700px] -translate-x-1/2 glow" />
      <div className="relative mx-auto grid max-w-5xl gap-12 px-6 md:grid-cols-2 md:gap-16">
        <div>
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent">
            Get in touch
          </p>
          <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
            Let&apos;s build something the world can rely on.
          </h1>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted">
            Tell us who you are and what you&apos;re working on. Whether
            you&apos;re an individual, an enterprise, a healthcare system, or a
            government — we read every message.
          </p>
          <div className="mt-10 space-y-4">
            <a
              href="mailto:hello@vellon.ca"
              className="flex items-center gap-3 text-muted transition-colors hover:text-white"
            >
              <span className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-surface">
                @
              </span>
              hello@vellon.ca
            </a>
            <div className="flex items-center gap-3 text-muted">
              <span className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-surface">
                🇨🇦
              </span>
              Headquartered in Canada
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
