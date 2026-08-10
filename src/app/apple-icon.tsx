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
          background: "#F6F3EC",
        }}
      >
        <svg width="118" height="118" viewBox="0 0 64 64" fill="none">
          <path
            d="M17 18 L31 43 L45 18"
            stroke="#16150F"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="49.5" cy="43" r="3.4" fill="#A6401A" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
