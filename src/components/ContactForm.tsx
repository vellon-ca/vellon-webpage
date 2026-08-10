"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { sendContact } from "@/lib/actions";

const segments = ["Individual", "Enterprise", "Healthcare", "Government"];
const ease = [0.22, 0.61, 0.36, 1] as const;

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
      setError(
        "Something went wrong. Please try again or email hello@vellon.ca."
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="border-t border-ink/25 pt-8">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="flex min-h-[380px] flex-col justify-center"
          >
            <span className="numeral text-sm text-accent">&mdash;</span>
            <h3 className="display mt-4 text-[1.9rem] leading-tight">
              Message received.
            </h3>
            <p className="mt-4 max-w-[36ch] text-pretty text-[0.9375rem] leading-relaxed text-ink-2">
              Thank you for reaching out. We&rsquo;ll come back to you within two
              business days.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            exit={{ opacity: 0 }}
            className="space-y-9"
          >
            <fieldset>
              <legend className="label mb-4">I&rsquo;m reaching out as</legend>
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {segments.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSegment(s)}
                    aria-pressed={segment === s}
                    className={`border-b pb-1 text-sm transition-colors ${
                      segment === s
                        ? "border-accent font-semibold text-accent"
                        : "border-transparent text-ink-3 hover:border-rule hover:text-ink"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="grid gap-9 sm:grid-cols-2">
              <Field label="Name" name="name" placeholder="Jane Doe" />
              <Field
                label="Email"
                name="email"
                type="email"
                placeholder="jane@company.com"
              />
            </div>

            <Field
              label="Organisation"
              name="org"
              placeholder="Optional"
              required={false}
            />

            <div>
              <label
                htmlFor="message"
                className="label mb-2 block"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                placeholder="Tell us what you're working on…"
                className="field-line resize-none"
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
              <p className="border-l-2 border-accent bg-accent/6 px-4 py-3 text-sm text-accent-deep">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="group inline-flex items-center gap-2 border-b border-ink pb-1 text-sm font-semibold text-ink transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
            >
              {pending ? "Sending…" : "Send message"}
              {!pending && (
                <span className="transition-transform duration-400 group-hover:translate-x-1">
                  &rarr;
                </span>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
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
      <label htmlFor={name} className="label mb-2 block">
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="field-line"
      />
    </div>
  );
}
