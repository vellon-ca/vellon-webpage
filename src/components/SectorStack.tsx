"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { verticals } from "@/lib/site";
import { ease } from "./Reveal";

/* FIG. 01 — the argument the headline makes, drawn.

   Four sector plates resting on Vellon as the base layer. Set as a survey
   drawing (flat line work, mono annotation, leader lines) rather than a 3D
   render, which is what keeps it out of developer-tool-marketing territory.

   The drawing builds itself once on load — base plate first, then the
   sectors stacking upward onto it — and responds to hover by selecting one
   plate: it lifts, goes brass, drops a datum line to the base, and the
   others recede. Hover is decoration only; the SVG keeps role="img" and
   contains nothing focusable, so assistive tech reads the one label. Every
   sector here is also a real link 200px down the page in the index.

   Geometry budget — the plates intersect the moment this stops holding:

     GAP >= 2*HH  (the plate's own span)
          + T     (its extruded thickness, drawn below the top face)
          + LIFT  (how far a hovered plate rises into the one above)
          + AIR   (visible clearance left over)

   so GAP is derived from those rather than typed in as a number. */
const CX = 200;
const HW = 118; // half-width of the top face
const HH = 27; // half-height of the top face
const T = 9; // plate thickness
const LIFT = 7; // hover lift
const AIR = 10; // clearance at full lift
const GAP = 2 * HH + T + LIFT + AIR;
const TOP = 44;

const N = verticals.length;
const BASE_Y = TOP + N * GAP + 18; // extra air isolates the base plate
const VB_W = 560;
const VB_H = BASE_Y + HH + T + 58;
const LEAD = 24; // leader-line length
const LABEL_X = CX + HW + LEAD + 8;
const NUM_X = CX - HW - 20;
const CAPTION_Y = VB_H - 14;

const topFace = (y: number) =>
  `M${CX} ${y - HH} L${CX + HW} ${y} L${CX} ${y + HH} L${CX - HW} ${y} Z`;

/* The extruded band under the top face: the three lower edges, dropped by T. */
const sideFace = (y: number) =>
  `M${CX - HW} ${y} L${CX} ${y + HH} L${CX + HW} ${y} L${CX + HW} ${y + T} ` +
  `L${CX} ${y + HH + T} L${CX - HW} ${y + T} Z`;

const MONO = {
  fontFamily: "var(--font-plex-mono), ui-monospace, monospace",
  fontSize: 10,
  letterSpacing: "0.12em",
} as const;

export function SectorStack({ className = "" }: { className?: string }) {
  const still = useReducedMotion();
  /* `active` is the plate under the pointer; `last` keeps the readout text
     mounted through the fade-out so it doesn't blank mid-transition. */
  const [active, setActive] = useState<number | null>(null);
  const [last, setLast] = useState(0);

  /* One observer on the svg root drives every child, rather than
     whileInView per element. Above the fold this fires immediately; on a
     phone, where the figure sits below the copy, it waits for the scroll
     instead of playing the whole build off-screen. */
  const ref = useRef<SVGSVGElement>(null);
  const shown = useInView(ref, { once: true, margin: "-70px" });

  const t = (duration: number, delay = 0) =>
    still ? { duration: 0 } : { duration, delay, ease };
  /* Animate to `v` once the figure is in view, otherwise hold at 0. */
  const to = (v: number) => (shown ? v : 0);

  const plates = verticals.map((v, i) => ({ ...v, y: TOP + i * GAP }));

  const select = (i: number) => {
    setActive(i);
    setLast(i);
  };

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      className={className}
      role="img"
      aria-label="Diagram: four sector plates — individuals, enterprise, healthcare and government — stacked on a highlighted base plate labelled Vellon"
      onPointerLeave={() => setActive(null)}
    >
      <defs>
        {/* Drafting hatch, brass, used only inside the base plate */}
        <pattern
          id="fig01-hatch"
          width="7"
          height="7"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="7"
            stroke="var(--brass)"
            strokeWidth="1"
            opacity="0.2"
          />
        </pattern>
      </defs>

      {/* Extent lines tying the stack together. Faded in rather than traced:
          pathLength drives stroke-dasharray internally, which would eat the
          dash pattern these are drawn with. */}
      <g stroke="var(--rule-2)" strokeWidth="1" strokeDasharray="2 5">
        {[CX - HW, CX + HW].map((x) => (
          <motion.path
            key={x}
            d={`M${x} ${TOP} L${x} ${BASE_Y}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: to(1) }}
            transition={t(0.9, 0.3)}
          />
        ))}
      </g>

      {/* Base plate — the only brass in the drawing, and it draws first:
          everything above is stacked onto it. */}
      <g>
        <motion.path
          d={sideFace(BASE_Y)}
          fill="rgba(196,160,106,0.16)"
          stroke="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: to(1) }}
          transition={t(0.7, 0.75)}
        />
        <motion.path
          d={topFace(BASE_Y)}
          fill="url(#fig01-hatch)"
          stroke="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: to(0.6) }}
          transition={t(0.7, 0.75)}
        />
        {/* Selecting a plate lights the layer it rests on. Kept off the
            motion element above so hovering never replays the reveal. */}
        <path
          d={topFace(BASE_Y)}
          fill="rgba(196,160,106,0.1)"
          stroke="none"
          opacity={active === null ? 0 : 1}
          style={{ transition: "opacity .4s ease" }}
        />
        <g fill="none" stroke="var(--brass)" strokeWidth="1.7" strokeLinejoin="round">
          {[
            { d: sideFace(BASE_Y), delay: 0.5 },
            { d: topFace(BASE_Y), delay: 0.35 },
          ].map((p) => (
            <motion.path
              key={p.delay}
              d={p.d}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: to(1), opacity: to(1) }}
              transition={t(0.7, p.delay)}
            />
          ))}
        </g>
      </g>

      {/* Sector plates, built from the base upward */}
      {plates.map((p, i) => {
        const on = active === i;
        const dim = active !== null && !on;
        const rise = still ? 0 : (N - 1 - i) * 0.1;

        return (
          <motion.g
            key={p.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: to(1), y: shown ? 0 : 10 }}
            transition={t(0.7, 0.55 + rise)}
          >
            {/* Reveal transform lives on the parent; the hover lift lives
                here, so the two never overwrite each other's transform. */}
            <g
              style={{
                transform: on ? `translateY(-${LIFT}px)` : "translateY(0px)",
                opacity: dim ? 0.4 : 1,
                transition:
                  "transform .5s cubic-bezier(.22,.61,.36,1), opacity .4s ease",
              }}
            >
              <motion.path
                d={sideFace(p.y)}
                fill={on ? "rgba(196,160,106,0.14)" : "var(--surface-2)"}
                stroke={on ? "var(--brass)" : "var(--fg-3)"}
                strokeWidth={on ? 1.5 : 1.15}
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: to(1) }}
                transition={t(0.65, 0.7 + rise)}
                style={{ transition: "fill .35s ease, stroke .35s ease" }}
              />
              <motion.path
                d={topFace(p.y)}
                fill={on ? "rgba(196,160,106,0.1)" : "transparent"}
                stroke={on ? "var(--brass)" : "var(--fg-3)"}
                strokeWidth={on ? 1.5 : 1.15}
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: to(1) }}
                transition={t(0.65, 0.55 + rise)}
                style={{ transition: "fill .35s ease, stroke .35s ease" }}
              />

              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: to(1) }}
                transition={t(0.6, 1.05 + rise)}
              >
                <path
                  d={`M${CX + HW} ${p.y} L${CX + HW + LEAD} ${p.y}`}
                  stroke={on ? "var(--brass)" : "var(--rule-2)"}
                  strokeWidth="1"
                  style={{ transition: "stroke .35s ease" }}
                />
                <text
                  x={LABEL_X}
                  y={p.y + 3.5}
                  {...MONO}
                  fill={on ? "var(--brass)" : "var(--fg-3)"}
                  style={{ transition: "fill .35s ease" }}
                >
                  {p.name.toUpperCase()}
                </text>
                <text
                  x={NUM_X}
                  y={p.y + 3.5}
                  {...MONO}
                  textAnchor="end"
                  fill={on ? "var(--brass)" : "var(--fg-3)"}
                  opacity={on ? 1 : 0.55}
                  style={{ transition: "fill .35s ease, opacity .35s ease" }}
                >
                  {p.index}
                </text>
              </motion.g>
            </g>
          </motion.g>
        );
      })}

      {/* Datum line: what the selected plate is actually resting on */}
      {active !== null && (
        <motion.path
          key={`datum-${active}`}
          d={`M${CX} ${plates[active].y + HH + T - LIFT} L${CX} ${BASE_Y - HH}`}
          stroke="var(--brass-dim)"
          strokeWidth="1"
          strokeDasharray="2 4"
          style={{ transformOrigin: "50% 0%" }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={t(0.45)}
        />
      )}

      {/* Base annotation */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: to(1) }}
        transition={t(0.6, 0.95)}
      >
        <path
          d={`M${CX + HW} ${BASE_Y} L${CX + HW + LEAD} ${BASE_Y}`}
          stroke="var(--brass-dim)"
          strokeWidth="1"
        />
        <text x={LABEL_X} y={BASE_Y + 3.5} {...MONO} fill="var(--brass)">
          VELLON
        </text>
        <text
          x={NUM_X}
          y={BASE_Y + 3.5}
          {...MONO}
          textAnchor="end"
          fill="var(--brass-dim)"
        >
          00
        </text>
      </motion.g>

      {/* Caption and read-out */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: to(1) }}
        transition={t(0.6, 1.35)}
      >
        <text x="10" y={CAPTION_Y} {...MONO} fill="var(--fg-3)" opacity="0.65">
          FIG. 01 — SECTOR STACK
        </text>
        <text
          x={VB_W - 10}
          y={CAPTION_Y}
          {...MONO}
          textAnchor="end"
          fill="var(--fg-3)"
          opacity={active === null ? 0.65 : 0}
          style={{ transition: "opacity .3s ease" }}
        >
          {N} SECTORS · 1 BASE LAYER
        </text>
        <text
          x={VB_W - 10}
          y={CAPTION_Y}
          {...MONO}
          textAnchor="end"
          fill="var(--brass)"
          opacity={active === null ? 0 : 1}
          style={{ transition: "opacity .3s ease" }}
        >
          {verticals[last].tagline.replace(/\.$/, "").toUpperCase()}
        </text>
      </motion.g>

      {/* Hit bands, last so they sit above the line work. Contiguous, one
          band per plate, so the pointer is never between two targets.

          Each band clears the selection on leave as well: most of the svg
          (the base plate, the margins) belongs to no band, and pointerleave
          on the <svg> only fires once the pointer is out of the element
          entirely — so without this, moving off a plate onto the base would
          leave that plate lit. Band-to-band is safe: leave fires on the old
          rect before enter fires on the new one. */}
      <g fill="transparent" style={{ pointerEvents: "all" }}>
        {plates.map((p, i) => (
          <rect
            key={p.slug}
            x={CX - HW - 22}
            y={p.y - GAP / 2}
            width={LABEL_X + 96 - (CX - HW - 22)}
            height={GAP}
            onPointerEnter={() => select(i)}
            onPointerLeave={() => setActive(null)}
          />
        ))}
      </g>
    </svg>
  );
}
