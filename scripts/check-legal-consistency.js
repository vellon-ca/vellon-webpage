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
  ["terms: statement shows Vellon (merchant of record, honest)", /charge on your statement will show Vellon/.test(t)],
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
let bad = 0;
for (const [n, ok] of checks) { if (!ok) bad++; console.log((ok ? "PASS" : "FAIL").padEnd(5), n); }
console.log(bad ? `\n${bad} FAILED` : `\nall ${checks.length} consistency checks pass`);
process.exit(bad ? 1 : 0);
