"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ease } from "./Reveal";

/* A label typing itself onto the page, one letter at a time.

   Deliberately restricted to mono labels — `.label` and `.numeral`, IBM Plex
   Mono at +0.14em / +0.1em tracking. Splitting text into per-letter elements
   breaks shaping across the boundaries, which is invisible on a monospaced,
   positively-tracked label and very visible on `.display`, which runs Archivo
   at -0.032em. Don't reach for this on a headline; wipe the whole line with a
   clip-path instead if one ever needs motion.

   Opacity only, so the letters stay inline: no `inline-block`, which means no
   word-wrapper spans, no non-breaking-space joins, and wrapping behaves
   exactly as it does with plain text.

   Reduced motion collapses the transition to zero rather than rendering a
   different tree — same rule as Reveal, and doubly load-bearing here because
   `useReducedMotion()` resolves to null on the first render, so a structural
   branch would change the DOM after hydration. */
export function SpellOut({
  text,
  className,
  delay = 0,
  step = 0.032,
}: {
  text: string;
  className?: string;
  /* Seconds before the first letter. */
  delay?: number;
  /* Seconds between letters. Tuned for short labels; a long string wants
     less, or the tail arrives after the reader has moved on. */
  step?: number;
}) {
  const still = useReducedMotion();

  return (
    <span className={className}>
      {/* The whole string, once, for anything that reads rather than looks. */}
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {Array.from(text).map((ch, i) => (
          <motion.span
            key={`${i}-${ch}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={
              still
                ? { duration: 0 }
                : { duration: 0.26, delay: delay + i * step, ease }
            }
          >
            {ch}
          </motion.span>
        ))}
      </span>
    </span>
  );
}
