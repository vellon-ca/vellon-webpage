"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./Logo";
import { navLinks } from "@/lib/site";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    /* The open menu is a child of the header, so the header's own z-index is
       the one that counts against the rest of the page — z-50 leaves it level
       with the film panel. It goes up while the menu is open and back down
       when it closes, so the film panel still covers the bar. */
    <header
      className={`fixed inset-x-0 top-0 transition-colors duration-500 ${
        open ? "z-[80]" : "z-50"
      } ${scrolled ? "border-b border-rule bg-bg/92 backdrop-blur-[2px]" : ""}`}
    >
      <div className="mx-auto flex max-w-[86rem] items-center justify-between px-6 py-5 md:px-10">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="link-draw text-[0.8125rem] font-medium text-fg-2 transition-colors hover:text-fg"
            >
              {link.label}
            </Link>
          ))}
          <span aria-hidden className="h-4 w-px bg-rule" />
          <Link
            href="/signin"
            className="link-draw text-[0.8125rem] font-medium text-fg-2 transition-colors hover:text-fg"
          >
            Sign in
          </Link>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 border-b border-fg pb-[3px] text-[0.8125rem] font-semibold text-fg"
          >
            Get in touch
            <span className="transition-transform duration-400 group-hover:translate-x-[3px]">
              &rarr;
            </span>
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="relative z-[70] grid h-9 w-9 place-items-center text-fg md:hidden"
        >
          <span className="sr-only">Menu</span>
          <span className="block space-y-[5px]">
            <span
              className={`block h-px w-6 bg-current transition-transform duration-300 ${
                open ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-current transition-opacity duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-current transition-transform duration-300 ${
                open ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            /* dvh, not vh: on a phone `inset-0` resolves against the tall
               viewport, which puts the bottom of the sheet under the browser
               toolbar. It scrolls too — six entries plus the two account
               links overrun a short screen, and a fixed box with no overflow
               just piles them up. */
            className="fixed inset-x-0 top-0 z-[60] h-[100dvh] overflow-y-auto overscroll-contain bg-bg px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[4.75rem] md:hidden"
          >
            <ul>
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.5 }}
                  className="border-b border-rule"
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-4"
                  >
                    <span className="numeral text-xs text-brass">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="display text-[1.75rem] text-fg">
                      {link.label}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-4">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="border-b border-fg pb-2 text-sm font-semibold text-fg"
              >
                Get in touch &rarr;
              </Link>
              <Link
                href="/signin"
                onClick={() => setOpen(false)}
                className="text-sm text-fg-2"
              >
                Sign in
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
