import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import type { Locale } from "./i18n-types";
import type { PageKey } from "./routes";
import { SITE_HOST, ogLine } from "./site";

export const OG_SIZE = { width: 1200, height: 630 };

/* Paper, ink and wine, as on the page (docs/portfolio-v2/DISENO.md). */
const PAPER = "#f4efe2";
const INK = "#14130e";
const WINE = "#c12c52";
const LINE = "rgba(20,19,14,0.2)";

/** Bricolage Grotesque from the repo (Satori needs woff/ttf, not woff2). */
async function loadFonts() {
  const dir = join(process.cwd(), "assets", "fonts");
  const [semibold, extrabold] = await Promise.all([
    readFile(join(dir, "bricolage-grotesque-latin-600-normal.woff")),
    readFile(join(dir, "bricolage-grotesque-latin-800-normal.woff")),
  ]);
  return [
    { name: "Bricolage Grotesque", data: semibold, weight: 600 as const, style: "normal" as const },
    { name: "Bricolage Grotesque", data: extrabold, weight: 800 as const, style: "normal" as const },
  ];
}

/** Open Graph image of one page, on paper: name, the trade or the page title, and the domain. */
export async function ogImage(locale: Locale, page: PageKey = "home") {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          background: PAPER,
          color: INK,
          padding: "64px 80px 60px",
          fontFamily: "Bricolage Grotesque",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", borderTop: `3px solid ${INK}`, paddingTop: 28 }}>
          <div style={{ fontSize: 156, fontWeight: 800, lineHeight: 0.86, letterSpacing: -7 }}>Alejandro</div>
          <div style={{ fontSize: 156, fontWeight: 800, lineHeight: 0.86, letterSpacing: -7, color: WINE }}>Cabrera</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div style={{ fontSize: 40, fontWeight: 600, lineHeight: 1.15, letterSpacing: -0.5, maxWidth: 900 }}>
            {ogLine(locale, page)}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderTop: `1px solid ${LINE}`,
              paddingTop: 22,
              fontSize: 28,
              fontWeight: 600,
            }}
          >
            <span style={{ color: WINE }}>{SITE_HOST}</span>
            <span>Granollers</span>
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: await loadFonts() }
  );
}
