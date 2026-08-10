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
          background: "#0F1114",
        }}
      >
        <svg width="118" height="118" viewBox="0 0 64 64" fill="none">
          <path
            d="M17 18 L31 43 L45 18"
            stroke="#E2E6E9"
            strokeWidth="5"
            strokeLinecap="square"
          />
          <rect x="46" y="40" width="6" height="6" fill="#C4A06A" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
