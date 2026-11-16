import type { Metadata } from "next";
import Link from "next/link";
import { renderLegalDoc } from "@/lib/legalDoc";

/**
 * French translation of /privacy, rendered at build time from
 * content/legal/privacy-policy.fr.md. Mirrors src/app/privacy/page.tsx; read the notes
 * there before changing either.
 *
 * The English text is the governing version (both French documents say so in
 * their first paragraph), so an edit to the English markdown must be carried
 * into the French file in the same change. `npm run check:legal` fails when the
 * two stop having the same shape.
 */
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Comment Vellon Dispatch traite les renseignements des passagers, des chauffeurs et du personnel de la centrale : ce qui est recueilli, à qui c'est communiqué, où c'est conservé et comment le faire supprimer.",
  alternates: {
    canonical: "/fr/privacy",
    languages: { "en-CA": "/privacy", "fr-CA": "/fr/privacy" },
  },
};

export default function PrivacyPageFr() {
  const html = renderLegalDoc("privacy-policy.fr");

  return (
    <section className="pt-36 pb-24 md:pt-48 md:pb-32">
      <div className="mx-auto max-w-[86rem] px-6 md:px-10">
        <div className="flex items-baseline justify-between gap-6">
          <p className="label">Mentions légales</p>
          <Link
            href="/privacy"
            hrefLang="en"
            lang="en"
            className="link-draw text-xs text-fg-3 transition-colors hover:text-fg"
          >
            English
          </Link>
        </div>
        <div className="mt-8 h-px w-full bg-rule md:mt-10" />

        <article
          lang="fr-CA"
          className="legal-prose mt-10 md:mt-14"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </section>
  );
}
