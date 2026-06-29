"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sendContact } from "@/lib/actions";

const segments = ["Individual", "Enterprise", "Healthcare", "Government"];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [segment, setSegment] = useState(segments[1]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const formData = new FormData(e.currentTarget);
    formData.set("segment", segment);
    try {
      const result = await sendContact(formData);
      if (result.ok) {
        setSubmitted(true);
      } else {
        setError(result.error);
      }
    } catch {
      setError("Something went wrong. Please try again or email hello@vellon.ca.");
    } finally {
      setPending(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="card-glow relative rounded-3xl border border-border bg-surface/60 p-7 md:p-8"
    >
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex min-h-[360px] flex-col items-center justify-center text-center"
          >
            <div className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-indigo-400 to-cyan-300 text-2xl text-black">
              ✓
            </div>
            <h3 className="mt-5 text-xl font-semibold text-white">
              Message received
            </h3>
            <p className="mt-2 max-w-xs text-sm text-muted">
              Thank you for reaching out. We&apos;ll be in touch soon.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-5"
          >
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-2">
                I&apos;m reaching out as
              </label>
              <div className="grid grid-cols-2 gap-2">
                {segments.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSegment(s)}
                    className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
                      segment === s
                        ? "border-border-strong bg-surface-2 text-white"
                        : "border-border bg-transparent text-muted hover:text-white"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <Field label="Name" name="name" placeholder="Jane Doe" />
            <Field
              label="Email"
              name="email"
              type="email"
              placeholder="jane@company.com"
            />
            <Field
              label="Organization"
              name="org"
              placeholder="Optional"
              required={false}
            />
            <div>
              <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-2">
                Message
              </label>
              <textarea
                name="message"
                required
                rows={4}
                placeholder="Tell us what you're working on…"
                className="w-full resize-none rounded-lg border border-border bg-background/60 px-3.5 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-muted-2 focus:border-border-strong"
              />
            </div>

            {/* Honeypot — hidden from humans, catches bots */}
            <input
              type="text"
              name="company_website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute left-[-9999px] h-0 w-0 opacity-0"
            />

            {error && (
              <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3.5 py-2.5 text-sm text-red-300">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="group w-full rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending ? "Sending…" : "Send message"}
              {!pending && (
                <span className="ml-1.5 inline-block transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-lg border border-border bg-background/60 px-3.5 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-muted-2 focus:border-border-strong"
      />
    </div>
  );
}
