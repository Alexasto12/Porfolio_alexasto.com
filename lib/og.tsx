import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { DATA, PERSON_NAME } from "./content";
import type { Locale } from "./i18n-types";
import { SITE_HOST } from "./site";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

export const ogAlt = (locale: Locale) => `${PERSON_NAME}. ${DATA.hero.title[locale]}`;

const BG = "#14130e";
const INK = "#f4efe2";
const ACCENT_LARGE = "#c12c52";
const ACCENT_TEXT = "#d64b6e";
const LINE = "rgba(244,239,226,0.16)";

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

/** Open Graph image for one locale: name, title and domain. */
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
          background: BG,
          color: INK,
          padding: "72px 80px",
          fontFamily: "Bricolage Grotesque",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 150, fontWeight: 800, lineHeight: 0.9, letterSpacing: -6 }}>Alejandro</div>
          <div style={{ fontSize: 150, fontWeight: 800, lineHeight: 0.9, letterSpacing: -6, color: ACCENT_LARGE }}>
            Cabrera
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ fontSize: 40, fontWeight: 600, lineHeight: 1.2, letterSpacing: -0.5, maxWidth: 980 }}>
            {DATA.hero.title[locale]}
          </div>
          <div
            style={{
              display: "flex",
              borderTop: `1px solid ${LINE}`,
              paddingTop: 24,
              fontSize: 30,
              fontWeight: 600,
              color: ACCENT_TEXT,
            }}
          >
            {SITE_HOST}
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: await loadFonts() }
  );
}
