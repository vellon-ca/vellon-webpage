export type Vertical = {
  slug: string;
  index: string; // editorial index numeral, e.g. "01"
  name: string;
  nav: string;
  tagline: string;
  blurb: string;
  description: string;
  features: { title: string; body: string }[];
};

export const verticals: Vertical[] = [
  {
    slug: "individuals",
    index: "01",
    name: "Individuals",
    nav: "For Individuals",
    tagline: "Software that gets out of the way.",
    blurb:
      "Tools that remove friction from everyday life, without demanding attention in return.",
    description:
      "Personal software that quietly works in the background of your day — organising, anticipating, and removing friction so the small things take care of themselves.",
    features: [
      {
        title: "Always available",
        body: "Assistance that's there when you need it, across every device you own, and silent when you don't.",
      },
      {
        title: "Private by design",
        body: "Your data stays yours. We build with privacy as a default, not as a setting you have to find.",
      },
      {
        title: "Genuinely useful",
        body: "No gimmicks. Tools that save real time on the things you actually do, measured in minutes, not adjectives.",
      },
    ],
  },
  {
    slug: "enterprise",
    index: "02",
    name: "Enterprise",
    nav: "For Enterprise",
    tagline: "Scale without friction.",
    blurb:
      "Operational systems that help businesses move faster and decide with confidence.",
    description:
      "Operational intelligence for modern businesses — systems that help teams move faster, decide with confidence, and scale without adding friction to the work.",
    features: [
      {
        title: "Faster operations",
        body: "Automate the repetitive and surface the important, so your team spends its hours on the work that actually compounds.",
      },
      {
        title: "Better decisions",
        body: "Turn scattered data into clear, defensible decisions — in real time, at whatever scale you're operating.",
      },
      {
        title: "Built to scale",
        body: "Infrastructure that grows with you, from your first hundred users to your first hundred thousand.",
      },
    ],
  },
  {
    slug: "healthcare",
    index: "03",
    name: "Healthcare",
    nav: "For Healthcare",
    tagline: "Precision worth trusting.",
    blurb:
      "Systems that improve patient outcomes and give clinicians back their time.",
    description:
      "Clinical-grade software that improves patient outcomes, streamlines operations, and supports medical professionals with precision and reliability they can depend on.",
    features: [
      {
        title: "Better outcomes",
        body: "Decision support that helps clinicians catch what matters earlier and act on it with confidence.",
      },
      {
        title: "Less paperwork",
        body: "Reduce administrative load so providers spend more time with patients and less with forms.",
      },
      {
        title: "Reliable and compliant",
        body: "Engineered for the standards healthcare demands — secure, auditable, and dependable under load.",
      },
    ],
  },
  {
    slug: "government",
    index: "04",
    name: "Government",
    nav: "For Government",
    tagline: "Technology held to public standards.",
    blurb:
      "Secure platforms that help public institutions serve citizens more effectively.",
    description:
      "Secure, accountable technology platforms that help governments serve citizens more effectively and make evidence-based decisions at scale — with auditability built in from the start.",
    features: [
      {
        title: "Serve citizens better",
        body: "Modern digital services that meet people where they are and respect their time.",
      },
      {
        title: "Evidence at scale",
        body: "Insight across departments and populations, without compromising individual privacy.",
      },
      {
        title: "Secure and accountable",
        body: "Sovereign-grade security and full auditability, designed for the standard public trust requires.",
      },
    ],
  },
];

export const values = [
  {
    index: "01",
    name: "Trust",
    body: "Everything we build must be reliable, secure, and worthy of the institutions that depend on it.",
  },
  {
    index: "02",
    name: "Excellence",
    body: "We deliver, always. Our reputation is built on execution rather than announcement.",
  },
  {
    index: "03",
    name: "Universality",
    body: "We build for everyone, not just the customers who are easiest to reach.",
  },
  {
    index: "04",
    name: "Permanence",
    body: "We think in decades, not quarters. Software people rely on has to still be there in ten years.",
  },
  {
    index: "05",
    name: "Innovation",
    body: "We stay at the front — but we ship what works before we ship what's novel.",
  },
  {
    index: "06",
    name: "Security",
    body: "We protect what's entrusted to us. Secure by design, for the people and institutions behind every record.",
  },
];

export const ambitions = [
  {
    index: "01",
    text: "Become the most trusted operational software company in Canada, then well beyond it.",
  },
  {
    index: "02",
    text: "Earn the confidence of the institutions that cannot afford for software to fail.",
  },
  {
    index: "03",
    text: "Build products so useful to daily operations that going back is unthinkable.",
  },
  {
    index: "04",
    text: "Grow into a company that outlasts the technologies it was founded on.",
  },
];

/* Keep every row here to something that can be stood behind — this rail
   renders on the homepage hero, the about page and the share card. */
export const facts = [
  { term: "Based in", detail: "Canada" },
  { term: "Practice", detail: "Operational software" },
  { term: "Enquiries", detail: "hello@vellon.ca" },
];

export const navLinks = [
  { label: "Individuals", href: "/individuals" },
  { label: "Enterprise", href: "/enterprise" },
  { label: "Healthcare", href: "/healthcare" },
  { label: "Government", href: "/government" },
  { label: "Company", href: "/about" },
];
