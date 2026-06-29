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
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={`relative z-[60] flex w-full max-w-6xl items-center justify-between rounded-full border px-3 py-2.5 transition-all duration-300 ${
          scrolled
            ? "border-border-strong bg-[#0a0c11]/80 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="pl-2">
          <Logo />
        </div>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-full px-3.5 py-2 text-sm text-muted transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/signin"
            className="rounded-full px-4 py-2 text-sm text-muted transition-colors hover:text-white"
          >
            Sign in
          </Link>
          <Link
            href="/contact"
            className="group relative rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-transform hover:scale-[1.03]"
          >
            Get in touch
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="grid h-9 w-9 place-items-center rounded-full text-white md:hidden"
        >
          <div className="space-y-1.5">
            <span
              className={`block h-0.5 w-5 bg-current transition-transform ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-current transition-opacity ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-current transition-transform ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 top-0 z-40 bg-background/95 px-6 pt-28 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-border py-4 text-2xl font-medium text-white"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-8 block rounded-full bg-white py-3.5 text-center font-medium text-black"
            >
              Get in touch
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
