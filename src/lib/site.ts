export type Vertical = {
  slug: string;
  name: string;
  nav: string;
  tagline: string;
  blurb: string;
  description: string;
  accent: string; // tailwind gradient classes
  glow: string; // rgba for glows
  features: { title: string; body: string }[];
};

export const verticals: Vertical[] = [
  {
    slug: "individuals",
    name: "Individuals",
    nav: "For Individuals",
    tagline: "AI that makes everyday life smarter.",
    blurb: "Tools that make everyday life smarter, simpler, and more connected.",
    description:
      "Personal AI that quietly works in the background of your day — organizing, anticipating, and removing friction so the small things take care of themselves.",
    accent: "from-indigo-400 to-cyan-300",
    glow: "rgba(99, 102, 241, 0.35)",
    features: [
      {
        title: "Always available",
        body: "Intelligent assistance that's there whenever you need it, across every device you own.",
      },
      {
        title: "Private by design",
        body: "Your data stays yours. We build with privacy as a default, not an afterthought.",
      },
      {
        title: "Genuinely useful",
        body: "No gimmicks. Tools that save you real time on the things you actually do.",
      },
    ],
  },
  {
    slug: "enterprise",
    name: "Enterprise",
    nav: "For Enterprise",
    tagline: "Scale without friction.",
    blurb:
      "Intelligent systems that help businesses operate faster and make better decisions.",
    description:
      "Operational intelligence for modern businesses — systems that help teams move faster, decide with confidence, and scale without adding friction.",
    accent: "from-violet-400 to-indigo-300",
    glow: "rgba(139, 92, 246, 0.35)",
    features: [
      {
        title: "Faster operations",
        body: "Automate the repetitive and surface the important. Your team focuses on the work that matters.",
      },
      {
        title: "Better decisions",
        body: "Turn scattered data into clear, defensible decisions — in real time, at any scale.",
      },
      {
        title: "Built to scale",
        body: "Infrastructure that grows with you, from your first hundred users to your first hundred million.",
      },
    ],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    nav: "For Healthcare",
    tagline: "Precision the world can trust.",
    blurb:
      "AI that improves patient outcomes and supports medical professionals with precision.",
    description:
      "Clinical-grade AI that improves patient outcomes, streamlines operations, and supports medical professionals with precision and reliability they can depend on.",
    accent: "from-emerald-400 to-teal-300",
    glow: "rgba(16, 185, 129, 0.32)",
    features: [
      {
        title: "Better outcomes",
        body: "Decision support that helps clinicians catch what matters earlier and act with confidence.",
      },
      {
        title: "Streamlined operations",
        body: "Reduce administrative load so providers can spend more time with patients, less with paperwork.",
      },
      {
        title: "Reliable & compliant",
        body: "Engineered for the standards healthcare demands — secure, auditable, and dependable.",
      },
    ],
  },
  {
    slug: "government",
    name: "Government",
    nav: "For Government",
    tagline: "Trusted technology for public service.",
    blurb:
      "Secure, trusted platforms that help governments serve citizens more effectively.",
    description:
      "Secure, trusted technology platforms that help governments serve citizens more effectively and make data-driven decisions at scale — with accountability built in.",
    accent: "from-sky-400 to-blue-300",
    glow: "rgba(56, 189, 248, 0.32)",
    features: [
      {
        title: "Serve citizens better",
        body: "Modern digital services that meet people where they are and respect their time.",
      },
      {
        title: "Decisions at scale",
        body: "Data-driven insight across departments and populations, without compromising privacy.",
      },
      {
        title: "Secure & accountable",
        body: "Sovereign-grade security and full auditability, designed for the public trust.",
      },
    ],
  },
];

export const values = [
  {
    name: "Trust",
    body: "Everything we build must be reliable, secure, and worthy of the institutions that depend on us.",
  },
  {
    name: "Excellence",
    body: "We deliver, always. Our reputation is built on execution.",
  },
  {
    name: "Universality",
    body: "We build for everyone, not just the privileged few.",
  },
  {
    name: "Permanence",
    body: "We think in decades, not quarters.",
  },
  {
    name: "Innovation",
    body: "We are always at the front, always pushing what's possible with AI.",
  },
  {
    name: "Security",
    body: "We protect what's entrusted to us — secure by design, for the people and institutions that depend on us.",
  },
];

export const navLinks = [
  { label: "Individuals", href: "/individuals" },
  { label: "Enterprise", href: "/enterprise" },
  { label: "Healthcare", href: "/healthcare" },
  { label: "Government", href: "/government" },
  { label: "Company", href: "/about" },
];
