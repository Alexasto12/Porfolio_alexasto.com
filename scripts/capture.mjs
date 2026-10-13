/* Captures each project site with a 1440×900 viewport and saves an optimized
   WebP (≤ 200 KB) in public/shots/, plus lib/shots.json, which the frames read
   to decide whether to show an image. The capture is up to three screens tall
   so BrowserFrame can scroll through it on hover; the frame shows the first
   screen. A site that fails loses any older capture and its frame stays empty.
   Usage: npm run capture [-- --only larasoak,roses] */
import { mkdirSync, readFileSync, rmSync, writeFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { chromium } from "@playwright/test";
import sharp from "sharp";
import { arg } from "./lib/server.mjs";

const ROOT = resolve(import.meta.dirname, "..");
const OUT = join(ROOT, "public", "shots");
const MANIFEST = join(ROOT, "lib", "shots.json");
const MAX_BYTES = 200 * 1024;
const VIEWPORT = { width: 1440, height: 900 };
/** Three screens: enough to show the page scrolling inside the frame. */
const MAX_HEIGHT = VIEWPORT.height * 3;

/** id (matches the card id in lib/content.ts) → URL. */
const SITES = {
  larasoak: "https://larasoak.art",
  gokthermal: "https://gokthermal.com",
  // rosesstjordi.com is parked (HTTPS 525); the studio case study links to .cat.
  roses: "https://rosesstjordi.cat",
  neibr: "https://neibr.es",
  peer2stream: "https://peer2stream.alexasto.com/discover",
  pokeapi: "https://alexasto12.github.io/ProjectePokeAPI/",
  paulakrebel: "https://paulakrebel.com",
};

/** Cookie banners: the least permissive choice first, then a close button. */
const COOKIE_BUTTONS = [
  /^(solo|sólo) (las )?necesarias$/i,
  /^només (les )?necessàries$/i,
  /^(rechazar|rebutjar|reject)( todo| tot| all)?$/i,
  /^(necessary|essential) only$/i,
];

async function dismissCookies(page) {
  for (const name of COOKIE_BUTTONS) {
    const button = page.getByRole("button", { name }).first();
    if (await button.isVisible().catch(() => false)) {
      await button.click().catch(() => {});
      await page.waitForTimeout(600);
      return true;
    }
  }
  return false;
}

/** Smallest effort first: lower the quality, then the width, until it fits. */
async function toWebp(png) {
  for (const quality of [80, 72, 64, 56, 48, 40]) {
    const buf = await sharp(png).webp({ quality, effort: 6 }).toBuffer();
    if (buf.length <= MAX_BYTES) return { buf, quality };
  }
  for (const width of [1200, 1000, 800]) {
    const buf = await sharp(png).resize({ width }).webp({ quality: 40, effort: 6 }).toBuffer();
    if (buf.length <= MAX_BYTES) return { buf, quality: 40 };
  }
  throw new Error(`could not get the screenshot under ${MAX_BYTES / 1024} KB`);
}

const only = arg("only", "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const manifest = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, "utf8")) : {};
const failures = [];
mkdirSync(OUT, { recursive: true });

/** Loads one site and returns a PNG of up to three screens. */
async function shoot(browser, url) {
  const context = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 1, locale: "es-ES" });
  const page = await context.newPage();
  try {
    const res = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45_000 });
    if (!res || res.status() >= 400) throw new Error(`HTTP ${res?.status() ?? "no response"}`);
    // Some sites keep a request open forever; settle for a quiet moment.
    await page.waitForLoadState("networkidle", { timeout: 15_000 }).catch(() => {});
    // Banners usually appear a few seconds after load.
    await page.waitForTimeout(4000);
    await dismissCookies(page);
    // Walk the page so lazy images and scroll effects load, then go back up.
    await page.evaluate(async (max) => {
      for (let y = 0; y < max; y += 450) {
        window.scrollTo({ top: y, behavior: "instant" });
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo({ top: 0, behavior: "instant" });
    }, MAX_HEIGHT);
    // Wait (up to 10 s) for every image in the first three screens to finish.
    await page
      .waitForFunction(
        (max) => [...document.images].every((i) => i.complete || i.getBoundingClientRect().top > max),
        MAX_HEIGHT,
        { timeout: 10_000 }
      )
      .catch(() => {});
    await page.waitForTimeout(1500);
    const full = await page.evaluate(() => document.documentElement.scrollHeight);
    const clipHeight = Math.max(VIEWPORT.height, Math.min(full, MAX_HEIGHT));
    return await page.screenshot({
      type: "png",
      fullPage: true,
      timeout: 60_000,
      clip: { x: 0, y: 0, width: VIEWPORT.width, height: clipHeight },
    });
  } finally {
    await context.close();
  }
}

const browser = await chromium.launch();
try {
  for (const [id, url] of Object.entries(SITES)) {
    if (only.length && !only.includes(id)) continue;
    try {
      // One retry: some of these sites are slow to answer now and then.
      const png = await shoot(browser, url).catch(() => shoot(browser, url));
      const { buf, quality } = await toWebp(png);
      writeFileSync(join(OUT, `${id}.webp`), buf);
      const { width, height } = await sharp(buf).metadata();
      manifest[id] = { src: `/shots/${id}.webp`, width, height, url };
      console.log(`✓ ${id}  ${url}  ${(buf.length / 1024).toFixed(0)} KB (q${quality})`);
    } catch (err) {
      // A failed site loses any older capture, so its frame shows no stale image.
      delete manifest[id];
      rmSync(join(OUT, `${id}.webp`), { force: true });
      failures.push({ id, url, error: String(err?.message ?? err).split("\n")[0] });
      console.log(`✗ ${id}  ${url}  ${failures.at(-1).error}`);
    }
  }
} finally {
  await browser.close();
}

writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
console.log(`manifest → ${MANIFEST} (${Object.keys(manifest).length} shots)`);
if (failures.length) {
  console.log(`${failures.length} site(s) failed; their frames stay empty.`);
  process.exitCode = 1;
}
