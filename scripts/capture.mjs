/* Captures each project site at 1440×900 and saves an optimized WebP
   (≤ 200 KB) in public/shots/, plus lib/shots.json, which the cards read to
   decide whether to show an image. A site that fails keeps its card without
   a frame. Usage: npm run capture [-- --only larasoak,roses] */
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { chromium } from "@playwright/test";
import sharp from "sharp";
import { arg } from "./lib/server.mjs";

const ROOT = resolve(import.meta.dirname, "..");
const OUT = join(ROOT, "public", "shots");
const MANIFEST = join(ROOT, "lib", "shots.json");
const MAX_BYTES = 200 * 1024;
const VIEWPORT = { width: 1440, height: 900 };

/** id (matches the card id in lib/content.ts) → URL. */
const SITES = {
  larasoak: "https://larasoak.art",
  gokthermal: "https://gokthermal.com",
  roses: "https://rosesstjordi.com",
  neibr: "https://neibr.es",
  peer2stream: "https://peer2stream.alexasto.com/discover",
  pokeapi: "https://alexasto12.github.io/ProjectePokeAPI/",
  // Paula Krebel's site is read from her case study page (see findPaulaSite).
  paulakrebel: null,
};
const PAULA_CASE = "https://www.digitaldesany.com/es/casos-exito/paula-krebel";
const NOT_HER_SITE = /digitaldesany|linkedin|instagram|facebook|twitter|x\.com|tiktok|youtube|behance|wa\.me|mailto:|google/i;

async function findPaulaSite(page) {
  await page.goto(PAULA_CASE, { waitUntil: "domcontentloaded", timeout: 30_000 });
  const hrefs = await page.$$eval("a[href^='http']", (as) => as.map((a) => a.href));
  return hrefs.find((h) => !NOT_HER_SITE.test(h)) ?? null;
}

async function toWebp(png) {
  for (const quality of [80, 72, 64, 56, 48, 40]) {
    const buf = await sharp(png).webp({ quality, effort: 6 }).toBuffer();
    if (buf.length <= MAX_BYTES) return { buf, quality };
  }
  const buf = await sharp(png).resize({ width: 1200 }).webp({ quality: 40, effort: 6 }).toBuffer();
  return { buf, quality: 40 };
}

const only = arg("only", "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const manifest = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, "utf8")) : {};
const failures = [];
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
try {
  for (const [id, fixedUrl] of Object.entries(SITES)) {
    if (only.length && !only.includes(id)) continue;
    const context = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 1, locale: "es-ES" });
    const page = await context.newPage();
    let url = fixedUrl;
    try {
      if (!url) url = await findPaulaSite(page);
      if (!url) throw new Error("no site link found on the case study page");
      const res = await page.goto(url, { waitUntil: "networkidle", timeout: 45_000 });
      if (!res || res.status() >= 400) throw new Error(`HTTP ${res?.status() ?? "no response"}`);
      await page.waitForTimeout(1500);
      const png = await page.screenshot({ type: "png" });
      const { buf, quality } = await toWebp(png);
      writeFileSync(join(OUT, `${id}.webp`), buf);
      manifest[id] = { src: `/shots/${id}.webp`, width: VIEWPORT.width, height: VIEWPORT.height, url };
      console.log(`✓ ${id}  ${url}  ${(buf.length / 1024).toFixed(0)} KB (q${quality})`);
    } catch (err) {
      failures.push({ id, url: url ?? PAULA_CASE, error: String(err?.message ?? err).split("\n")[0] });
      console.log(`✗ ${id}  ${url ?? PAULA_CASE}  ${failures.at(-1).error}`);
    } finally {
      await context.close();
    }
  }
} finally {
  await browser.close();
}

writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
console.log(`manifest → ${MANIFEST} (${Object.keys(manifest).length} shots)`);
if (failures.length) {
  console.log(`${failures.length} site(s) failed; their cards stay without a frame.`);
  process.exitCode = 1;
}
