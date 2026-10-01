import type { Metadata } from "next";
import { renderLegalDoc } from "@/lib/legalDoc";

/**
 * Rendered at build time from content/legal/terms-of-service.md, which is the
 * canonical text. Mirrors src/app/privacy/page.tsx deliberately — same
 * force-static read, same prose wrapper, no Reveal — because both are documents
 * someone may be sent to in order to read one clause.
 *
 * Two things about this document that are not obvious from the text:
 *
 * 1. It must never govern the RIDE. Every ride-app terms template is written for
 *    a company that IS the counterparty to the trip; Vellon is not, and the
 *    privacy policy's first paragraph and the root CLAUDE.md both turn on that.
 *    So fares, cancellations and no-shows are POINTED AT the taxi company, never
 *    governed here. Adding "you agree to pay the fare" or a cancellation-fee
 *    clause would silently make Vellon the transportation provider.
 *
 * 2. The liability cap, the indemnity and the "Vellon does not arrange
 *    transportation" recital are exactly the clauses the go-live checklist (§7g)
 *    earmarks for a limited-scope lawyer markup. They are drafted, not reviewed.
 *
 * Still outstanding before the first iOS submission: Apple's minimum EULA terms
 * require a developer ADDRESS, not just an email (item 8). This document offers a
 * postal address on request, which depends on the registered-office decision in
 * §7f — do not paste a home address in to close the gap.
 */
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms for using the Vellon Dispatch app and dashboard — what Vellon is responsible for, what the taxi company is responsible for, and how fares, accounts and payments work.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  const html = renderLegalDoc("terms-of-service");

  return (
    <section className="pt-36 pb-24 md:pt-48 md:pb-32">
      <div className="mx-auto max-w-[86rem] px-6 md:px-10">
        <p className="label">Legal</p>
        <div className="mt-8 h-px w-full bg-rule md:mt-10" />

        <article
          className="legal-prose mt-10 md:mt-14"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </section>
  );
}
