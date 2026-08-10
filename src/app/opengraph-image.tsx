import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Vellon — software for the work underneath";

/* Pull the display face so the share card matches the site's identity.
   Wrapped so a font-fetch hiccup degrades to the system sans instead of
   failing the build. */
async function displayFont(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Archivo:wght@600&display=swap",
      // No UA header, so Google hands back a TTF rather than woff2,
      // which is what ImageResponse can parse.
      { headers: { "User-Agent": "Mozilla/5.0" } }
    ).then((r) => r.text());

    const url = css.match(/src:\s*url\(([^)]+)\)\s*format\('(?:truetype|opentype)'\)/)?.[1];
    if (!url) return null;

    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const display = await displayFont();
  const face = display ? "Archivo" : "sans-serif";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "68px 80px",
          background: "#0F1114",
          color: "#E2E6E9",
        }}
      >
        {/* Masthead */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(255,255,255,0.16)",
            paddingBottom: 24,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <span
              style={{
                fontFamily: face,
                fontSize: 36,
                letterSpacing: "-0.03em",
              }}
            >
              Vellon
            </span>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: "#C4A06A",
                display: "flex",
              }}
            />
          </div>
          <span
            style={{
              fontSize: 16,
              letterSpacing: "0.16em",
              color: "#79828A",
              fontWeight: 600,
            }}
          >
            CANADA
          </span>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", marginTop: 8 }}>
          <div
            style={{
              display: "flex",
              fontFamily: face,
              fontSize: 94,
              lineHeight: 1.02,
              letterSpacing: "-0.025em",
            }}
          >
            Software that runs
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: face,
              fontSize: 94,
              lineHeight: 1.02,
              letterSpacing: "-0.025em",
            }}
          >
            the work&nbsp;
            <span style={{ color: "#C4A06A" }}>underneath</span>.
          </div>
        </div>

        {/* Footer rule */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid rgba(255,255,255,0.16)",
            paddingTop: 22,
          }}
        >
          <span
            style={{
              fontSize: 24,
              color: "#9AA3AB",
              maxWidth: 760,
              display: "flex",
            }}
          >
            Operational software for the organisations that keep things moving.
          </span>
          <span style={{ fontSize: 21, color: "#79828A", display: "flex" }}>
            vellon.ca
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: display
        ? [{ name: "Archivo", data: display, style: "normal", weight: 600 }]
        : [],
    }
  );
}
