import type { MetadataRoute } from "next";
import { verticals } from "@/lib/site";

/* Only pages this site serves itself. /dispatch and /signin are redirects to
   other hosts, so they are left out: a sitemap listing a redirect is flagged in
   Search Console. dispatch.vellon.ca keeps its own sitemap. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://vellon.ca";
  return [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.8 },
    ...verticals.map((v) => ({
      url: `${base}/${v.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: `${base}/contact`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
