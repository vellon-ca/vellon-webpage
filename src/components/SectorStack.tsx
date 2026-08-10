/* FIG. 01 — the argument the headline makes, drawn.
   Four sector planes resting on Vellon as the base layer. Set as a survey
   drawing (flat line work, mono annotation, leader lines) rather than a 3D
   render, which is what keeps it out of developer-tool-marketing territory.

   Geometry note: each plane spans ±HH about its centre, so the centre-to-
   centre spacing has to clear 2 × HH or the diamonds intersect and the
   stack reads as a mesh instead of as separated layers. */
const CX = 200;
const HW = 115;
const HH = 30;
const GAP = 72; // > 2 × HH
const TOP = 42;

export function SectorStack({ className = "" }: { className?: string }) {
  const planes = ["INDIVIDUALS", "ENTERPRISE", "HEALTHCARE", "GOVERNMENT"].map(
    (label, i) => ({ label, y: TOP + i * GAP })
  );
  const baseY = TOP + planes.length * GAP + 22; // extra air under the stack
  const face = (y: number) =>
    `M${CX} ${y - HH} L${CX + HW} ${y} L${CX} ${y + HH} L${CX - HW} ${y} Z`;

  return (
    <svg
      viewBox={`0 0 560 ${baseY + 62}`}
      className={className}
      role="img"
      aria-label="Diagram: four sector planes — individuals, enterprise, healthcare and government — resting on a highlighted base plane labelled Vellon"
    >
      {/* Extent lines tying the stack together */}
      <g stroke="var(--rule-2)" strokeWidth="1" strokeDasharray="2 5">
        <line x1={CX - HW} y1={TOP} x2={CX - HW} y2={baseY} />
        <line x1={CX + HW} y1={TOP} x2={CX + HW} y2={baseY} />
      </g>

      {/* Sector planes */}
      <g fill="none" stroke="var(--fg-3)" strokeWidth="1.15" strokeLinejoin="round">
        {planes.map((p) => (
          <path key={p.label} d={face(p.y)} />
        ))}
      </g>

      {/* Base plane — the only brass in the drawing */}
      <path
        d={face(baseY)}
        fill="rgba(196,160,106,0.12)"
        stroke="var(--brass)"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />

      {/* Leader lines */}
      <g stroke="var(--rule-2)" strokeWidth="1">
        {planes.map((p) => (
          <line key={p.label} x1={CX + HW} y1={p.y} x2={CX + HW + 24} y2={p.y} />
        ))}
        <line
          x1={CX + HW}
          y1={baseY}
          x2={CX + HW + 24}
          y2={baseY}
          stroke="var(--brass-dim)"
        />
      </g>

      {/* Annotation */}
      <g
        fontFamily="var(--font-plex-mono), ui-monospace, monospace"
        fontSize="10"
        letterSpacing="0.12em"
      >
        {planes.map((p) => (
          <text key={p.label} x={CX + HW + 32} y={p.y + 3.5} fill="var(--fg-3)">
            {p.label}
          </text>
        ))}
        <text x={CX + HW + 32} y={baseY + 3.5} fill="var(--brass)">
          VELLON
        </text>
        <text x="10" y={baseY + 54} fill="var(--fg-3)" opacity="0.65">
          FIG. 01 — SECTOR STACK
        </text>
      </g>
    </svg>
  );
}
