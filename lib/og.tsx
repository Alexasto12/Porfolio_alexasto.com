import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { DATA, PERSON_NAME } from "./content";
import type { Locale } from "./i18n-types";
import { SITE_HOST } from "./site";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

export const ogAlt = (locale: Locale) => `${PERSON_NAME}. ${DATA.hero.title[locale]}`;

/* Paper, ink and wine, as on the page (docs/portfolio-v2/DISENO.md). */
const PAPER = "#f4efe2";
const INK = "#14130e";
const WINE = "#c12c52";
const GRID = "rgba(20,19,14,0.06)";
const LINE = "rgba(20,19,14,0.2)";
/** Left edge of each of the 12 columns of the visible grid (1040 px wide, 80 px margins). */
const COLUMNS = Array.from({ length: 12 }, (_, i) => 80 + Math.round((i * 1040) / 12));

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

/** Open Graph image for one locale, on paper: the grid, name, title and domain. */
export async function ogImage(locale: Locale) {
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
        {COLUMNS.map((x) => (
          <div key={x} style={{ position: "absolute", top: 0, bottom: 0, left: x, width: 1, background: GRID }} />
        ))}
        <div style={{ display: "flex", flexDirection: "column", borderTop: `3px solid ${INK}`, paddingTop: 28 }}>
          <div style={{ fontSize: 156, fontWeight: 800, lineHeight: 0.86, letterSpacing: -7 }}>Alejandro</div>
          <div style={{ fontSize: 156, fontWeight: 800, lineHeight: 0.86, letterSpacing: -7, color: WINE }}>Cabrera</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div style={{ fontSize: 40, fontWeight: 600, lineHeight: 1.15, letterSpacing: -0.5, maxWidth: 900 }}>
            {DATA.hero.title[locale]}
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
