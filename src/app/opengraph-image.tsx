import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Vellon — AI infrastructure for the modern world";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px",
          background: "#06070a",
          backgroundImage:
            "radial-gradient(circle at 50% 0%, rgba(99,102,241,0.28), transparent 55%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <defs>
              <linearGradient id="v" x1="16" y1="16" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                <stop stopColor="#818cf8" />
                <stop offset="1" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
            <path
              d="M18 19 L32 45 L46 19"
              stroke="url(#v)"
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="32" cy="45" r="3.2" fill="url(#v)" />
          </svg>
          <span style={{ fontSize: 40, fontWeight: 600, color: "#ffffff" }}>
            Vellon
          </span>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 600,
            color: "#ffffff",
            lineHeight: 1.1,
            marginTop: 44,
            letterSpacing: "-0.03em",
          }}
        >
          AI infrastructure for the modern world.
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "#8a8f98",
            marginTop: 28,
          }}
        >
          Intelligent software for individuals, enterprises, healthcare, and
          governments.
        </div>
      </div>
    ),
    { ...size }
  );
}
