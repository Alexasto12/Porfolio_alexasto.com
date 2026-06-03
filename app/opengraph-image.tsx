import { ImageResponse } from "next/og";
import { BRAND, PERSON } from "@/lib/site";

export const alt = `${BRAND} — ${PERSON.name}, ${PERSON.jobTitle}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#14130e";
const INK = "#f4efe2";
const WINE = "#d44166";
const MUTED = "#b5b2a2";
const LINE = "rgba(255,255,255,0.14)";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: PAPER,
          color: INK,
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: MUTED,
          }}
        >
          <span>001 — Perfil</span>
          <span>Granollers / BCN</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 168,
              fontWeight: 800,
              lineHeight: 0.9,
              letterSpacing: -6,
              color: INK,
            }}
          >
            Alejandro
          </div>
          <div
            style={{
              fontSize: 168,
              fontWeight: 800,
              lineHeight: 0.9,
              letterSpacing: -6,
              color: WINE,
            }}
          >
            Cabrera
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: `1px solid ${LINE}`,
            paddingTop: 28,
            fontSize: 28,
          }}
        >
          <span style={{ color: INK }}>{PERSON.jobTitle}</span>
          <span style={{ color: WINE, fontWeight: 700, letterSpacing: 2 }}>
            {BRAND.toLowerCase()}.com
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
