import Link from "next/link";
import { verticals } from "@/lib/site";

const company = [
  { label: "About", href: "/about" },
  { label: "Mission", href: "/about#mission" },
  { label: "Contact", href: "/contact" },
  { label: "Sign in", href: "/signin" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-rule bg-bg">
      <div className="mx-auto max-w-[86rem] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-x-0 gap-y-12 md:gap-x-8 py-16 md:py-20">
          <div className="col-span-12 md:col-span-5">
            <p className="display max-w-[18ch] text-[1.6rem] leading-[1.2]">
              Intelligent software for how the world works.
            </p>
            <p className="mt-6 max-w-[30ch] text-sm leading-relaxed text-fg-2">
              Better systems for a changing world.
            </p>
          </div>

          <div className="col-span-6 md:col-span-3 md:col-start-7">
            <h4 className="label">Practice</h4>
            <ul className="mt-5 space-y-3">
              {verticals.map((v) => (
                <li key={v.slug}>
                  <Link
                    href={`/${v.slug}`}
                    className="link-draw text-sm text-fg-2 transition-colors hover:text-fg"
                  >
                    {v.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-6 md:col-span-2 md:col-start-11">
            <h4 className="label">Company</h4>
            <ul className="mt-5 space-y-3">
              {company.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className="link-draw text-sm text-fg-2 transition-colors hover:text-fg"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Oversized wordmark as a signature, clipped by the page edge */}
        <div className="relative overflow-hidden border-t border-rule pt-10">
          <p
            aria-hidden
            className="display select-none text-[clamp(4rem,18vw,15rem)] leading-[0.82] text-fg/[0.055]"
            style={{ letterSpacing: "-0.045em" }}
          >
            Vellon
          </p>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-rule py-6 text-xs text-fg-3 sm:flex-row sm:items-center">
          <p>&copy; {new Date().getFullYear()} Vellon. All rights reserved.</p>
          <p className="flex items-center gap-4">
            <span>Canada</span>
            <span aria-hidden className="h-3 w-px bg-rule" />
            <a
              href="mailto:hello@vellon.ca"
              className="link-draw transition-colors hover:text-fg"
            >
              hello@vellon.ca
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
