import type { Metadata } from "next";
import { renderLegalDoc } from "@/lib/legalDoc";

/**
 * Rendered at build time from content/legal/privacy-policy.md, which is the
 * canonical text. force-static is explicit rather than relied upon: it keeps the
 * filesystem read a build-time concern, so the markdown never needs to be
 * present in a serverless bundle.
 *
 * Both app stores require a publicly reachable privacy-policy URL before review,
 * and Play's Data Safety form and Apple's App Privacy labels have to agree with
 * what this page says. Fill those FROM this text, not from memory.
 */
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Vellon Dispatch handles passenger, driver and dispatch information — what is collected, who it is shared with, where it is stored and how to have it deleted.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  const html = renderLegalDoc("privacy-policy");

  return (
    <section className="pt-36 pb-24 md:pt-48 md:pb-32">
      <div className="mx-auto max-w-[86rem] px-6 md:px-10">
        <p className="label">Legal</p>
        <div className="mt-8 h-px w-full bg-rule md:mt-10" />

        {/*
          Deliberately NOT wrapped in <Reveal> like the marketing pages. This is
          a document someone may have been sent to in order to read a specific
          clause, possibly via an in-page anchor; content that fades in on scroll
          is the wrong behaviour for that, and anything that delays paint on a
          legal page is a liability rather than a flourish.
        */}
        <article
          className="legal-prose mt-10 md:mt-14"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </section>
  );
}
