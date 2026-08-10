"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/* A label struck onto the page one character at a time, with a caret that
   keeps its place and blinks once the line is finished.

   Types by slicing the string rather than by revealing per-letter elements,
   which is why the caret can sit where the typing is: untyped characters
   aren't occupying space yet. It also means the text is a single text node
   at every frame, so kerning and ligatures are never broken — the cost is
   that the line grows as it types, so this belongs on something that owns
   its own line. On a wrapped headline, words would jump between lines as it
   went.

   Server HTML and the first client render both show the finished string; the
   reset to zero happens in a layout effect, before paint, so the complete
   line is never briefly visible. Reduced motion simply never starts. */

/* Milliseconds per character. A space costs a little more, which is what
   keeps a uniform interval from sounding like a printer. */
const KEY = 46;
const SPACE = 92;
/* How long the caret sits blinking after the last character before it goes. */
const REST = 1500;

type Phase = "idle" | "typing" | "resting" | "done";

export function Typewriter({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  /* Seconds before the first keystroke. */
  delay?: number;
}) {
  const still = useReducedMotion();
  const [n, setN] = useState(text.length);
  const [phase, setPhase] = useState<Phase>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useLayoutEffect(() => {
    /* `useReducedMotion` resolves to null before it resolves to a boolean,
       so this can run again with a different answer. Both branches must
       leave the line complete rather than one of them bailing out. */
    if (still) {
      setN(text.length);
      setPhase("done");
      return;
    }

    setN(0);
    setPhase("typing");

    let i = 0;
    const step = () => {
      i += 1;
      setN(i);
      if (i >= text.length) {
        setPhase("resting");
        timer.current = setTimeout(() => setPhase("done"), REST);
        return;
      }
      timer.current = setTimeout(step, text[i] === " " ? SPACE : KEY);
    };
    timer.current = setTimeout(step, delay * 1000);

    return () => clearTimeout(timer.current);
  }, [text, delay, still]);

  /* Nothing to clean up beyond the chain above; this only guards a rest
     timer outliving the component on a fast route change. */
  useEffect(() => () => clearTimeout(timer.current), []);

  const carriage = phase === "typing" || phase === "resting";

  return (
    <span className={className}>
      {/* The line as written, once, for anything that reads rather than
          looks — the visible copy is a moving target. */}
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {text.slice(0, n)}
        {carriage && (
          <motion.span
            className="ml-[0.08em] inline-block h-[0.95em] w-[0.45em] translate-y-[0.12em] bg-current align-baseline"
            /* Solid while the keys are moving, blinking once they stop —
               a caret that blinks mid-word reads as a stalled page. */
            animate={phase === "resting" ? { opacity: [1, 1, 0, 0] } : { opacity: 1 }}
            transition={
              phase === "resting"
                ? {
                    duration: 1.02,
                    times: [0, 0.48, 0.5, 1],
                    repeat: Infinity,
                    ease: "linear",
                  }
                : { duration: 0 }
            }
          />
        )}
      </span>
    </span>
  );
}
