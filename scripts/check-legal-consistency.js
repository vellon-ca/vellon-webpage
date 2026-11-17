// Cross-consistency pass: the terms and the privacy policy must not disagree
// about data, payments, or who the counterparty to a ride is. Whitespace is
// normalised first -- both documents are hard-wrapped at ~80 cols, so a claim
// that spans a line break is invisible to a naive regex (this produced three
// false FAILs before it was normalised).
const fs = require("fs");
const norm = (s) => s.replace(/\s+/g, " ");
const t = norm(fs.readFileSync("content/legal/terms-of-service.md", "utf8"));
const p = norm(fs.readFileSync("content/legal/privacy-policy.md", "utf8"));
const checks = [
  ["terms: no-transportation recital", /We do not provide transportation/.test(t)],
  ["terms: ride contract is with the company", /your contract for that ride is with that company/.test(t)],
  ["terms: never receive card number", /We never receive your card number/.test(t)],
  ["privacy agrees on card number", /We never receive your card number/.test(p)],
  ["terms: calls not recorded", /Calls are \*\*not recorded\*\*/.test(t)],
  ["privacy agrees calls not recorded", /are \*\*not recorded\*\*/.test(p)],
  ["terms: no marketing", /do not send marketing through the app/.test(t)],
  ["privacy agrees no marketing", /We do not send marketing messages/.test(p)],
  ["terms: location stops when offline", /stops when you go offline/.test(t)],
  ["privacy agrees location stops offline", /stops when you go offline/.test(p)],
  ["terms: one device at a time", /one device at a time/.test(t)],
  ["privacy agrees one device", /one device at a time/.test(p)],
  ["terms: safety report survives deletion", /kept even if you later delete your account/.test(t)],
  ["privacy agrees report survives", /Kept even if the person who filed them deletes/.test(p)],
  ["terms: driver anonymised, not erased", /\*\*anonymised\*\* rather than erased/.test(t)],
  ["privacy agrees driver anonymised", /anonymised/.test(p)],
  ["terms: the company charges the card, not Vellon (direct charges)", /charge is made by the taxi company/.test(t) && !/statement will show Vellon/.test(t)],
  ["privacy agrees the charge is on the company's Stripe account", /taxi company's own Stripe account/.test(p)],
  ["privacy does NOT describe driver payouts through the platform", !/pays you (directly )?through the platform|driver payouts/.test(p)],
  ["terms: no cancellation or no-show fee", /does not charge a cancellation fee or a no-show fee/.test(t)],
  ["terms does NOT claim usage analytics", !/usage data|analytics to improve/i.test(t)],
  ["terms does NOT set fares", /The rates are the taxi company/.test(t)],
  ["terms does NOT restate a retention period", !/6 years|12 months/.test(t)],
  ["terms links to /privacy", /\]\(\/privacy\)/.test(t)],
  ["Apple: not a party", /Apple is not a party/.test(t)],
  ["Apple: no maintenance obligation", /no obligation whatsoever to furnish any maintenance/.test(t)],
  ["Apple: third-party beneficiary", /third-party beneficiaries/.test(t)],
  ["consumer savings clause present", /cannot lawfully be limited/.test(t)],
  ["NS law + consumer carve-out", /Province of Nova Scotia/.test(t) && /where you live/.test(t)],
];

// Every in-document #anchor must resolve, in all four files. The slug rule is a
// copy of slugify() in src/lib/legalDoc.ts -- keep the two identical.
const slug = (h) => h.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-z0-9 -]/g, "").trim().replace(/\s+/g, "-");
const shape = {};
for (const f of ["terms-of-service", "privacy-policy", "terms-of-service.fr", "privacy-policy.fr"]) {
  const raw = fs.readFileSync(`content/legal/${f}.md`, "utf8");
  const ids = new Set([...raw.matchAll(/^#{1,6} (.+)$/gm)].map((m) => slug(m[1])));
  const dead = [...norm(raw).matchAll(/\]\(#([^)]+)\)/g)].map((m) => m[1]).filter((a) => !ids.has(a));
  checks.push([`${f}: no dead anchors${dead.length ? " -- " + dead.join(", ") : ""}`, dead.length === 0]);
  shape[f] = [
    (raw.match(/^## /gm) || []).length,
    (raw.match(/^### /gm) || []).length,
    (raw.match(/^\|/gm) || []).length,
    (raw.match(/^- /gm) || []).length,
    (norm(raw).match(/\*\*/g) || []).length,
  ].join("/");
}
// The French files are translations of the English ones: same sections, same
// table rows, same bullets, same count of bold markers. A mismatch means one
// side was edited without the other.
for (const d of ["terms-of-service", "privacy-policy"]) {
  checks.push([`${d}: fr has the same shape as en (${shape[d]} vs ${shape[d + ".fr"]})`, shape[d] === shape[d + ".fr"]]);
}
const tf = norm(fs.readFileSync("content/legal/terms-of-service.fr.md", "utf8"));
const pf = norm(fs.readFileSync("content/legal/privacy-policy.fr.md", "utf8"));
checks.push(["fr: both say the English version prevails", /version anglaise prévaut/.test(tf) && /version anglaise prévaut/.test(pf)]);
checks.push(["fr terms link to /fr/privacy, never /privacy", /\]\(\/fr\/privacy\)/.test(tf) && !/\]\(\/privacy\)/.test(tf)]);
checks.push(["en terms say a French version exists", /also published in French/.test(t)]);

let bad = 0;
for (const [n, ok] of checks) { if (!ok) bad++; console.log((ok ? "PASS" : "FAIL").padEnd(5), n); }
console.log(bad ? `\n${bad} FAILED` : `\nall ${checks.length} consistency checks pass`);
process.exit(bad ? 1 : 0);
