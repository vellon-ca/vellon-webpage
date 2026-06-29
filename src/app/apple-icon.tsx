import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0c11",
        }}
      >
        <svg width="120" height="120" viewBox="0 0 64 64" fill="none">
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
      </div>
    ),
    { ...size }
  );
}
