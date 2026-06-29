import Link from "next/link";
import { Logo } from "./Logo";
import { verticals } from "@/lib/site";

const company = [
  { label: "About", href: "/about" },
  { label: "Mission", href: "/about#mission" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-surface/40">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:py-20">
        <div className="space-y-5">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-muted">
            AI infrastructure for the modern world. Built for permanence, not
            relevance.
          </p>
          <p className="text-xs text-muted-2">
            Headquarters · Canada 🇨🇦
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-2">
            Solutions
          </h4>
          <ul className="space-y-3">
            {verticals.map((v) => (
              <li key={v.slug}>
                <Link
                  href={`/${v.slug}`}
                  className="text-sm text-muted transition-colors hover:text-white"
                >
                  {v.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-2">
            Company
          </h4>
          <ul className="space-y-3">
            {company.map((c) => (
              <li key={c.href}>
                <Link
                  href={c.href}
                  className="text-sm text-muted transition-colors hover:text-white"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-muted-2 sm:flex-row">
          <p>© {new Date().getFullYear()} Vellon. All rights reserved.</p>
          <p className="font-mono tracking-tight">vellon.ca</p>
        </div>
      </div>
    </footer>
  );
}
