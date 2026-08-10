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
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "border-b border-rule bg-bg/92 backdrop-blur-[2px]" : ""
      }`}
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
            className="fixed inset-0 z-[60] bg-bg px-6 pt-24 md:hidden"
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
                    className="flex items-baseline gap-4 py-5"
                  >
                    <span className="numeral text-xs text-brass">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="display text-[2rem] text-fg">
                      {link.label}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col gap-4">
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
