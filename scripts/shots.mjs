/* Screenshots of /, /ca and /en at 375 and 1440 px (full page + first screen).
   With --sections, also one image per top-level section (by id) in
   shots/secciones/, for the before/after gallery; the 1440 ones are scaled
   to 960 px wide to keep the repo light.
   Usage: npm run shots [-- --out docs/portfolio-refresh/antes] [-- --locales es] [-- --sections] */
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "@playwright/test";
import sharp from "sharp";
import { arg, outDir, openSettled, resolveLocalePages, withServer } from "./lib/server.mjs";

const VIEWPORTS = [
  { width: 375, height: 812 },
  { width: 1440, height: 900 },
];

const locales = arg("locales", "es,ca,en").split(",");
const sections = process.argv.includes("--sections");
const dir = join(outDir(), "shots");
mkdirSync(dir, { recursive: true });
if (sections) mkdirSync(join(dir, "secciones"), { recursive: true });

/** Top-level sections by id; fixed and sticky chrome outside <main> is hidden so it doesn't cover them. */
async function shootSections(page, name, width) {
  const ids = await page.evaluate(() => {
    for (const el of document.body.querySelectorAll("*")) {
      const pos = getComputedStyle(el).position;
      if ((pos === "fixed" || pos === "sticky") && !el.closest("main")) el.style.visibility = "hidden";
    }
    return [...document.querySelectorAll("section[id]")]
      .filter((s) => !s.parentElement.closest("section[id]"))
      .map((s) => s.id);
  });
  for (const id of ids) {
    const shot = await page.locator(`#${id}`).screenshot({ type: "png" });
    const img = width > 960 ? sharp(shot).resize({ width: 960 }) : sharp(shot);
    await img.jpeg({ quality: 68, mozjpeg: true }).toFile(join(dir, "secciones", `${name}-${id}.jpg`));
  }
  return ids;
}

await withServer(async (base) => {
  const browser = await chromium.launch();
  try {
    for (const target of (await resolveLocalePages(base)).filter((t) => locales.includes(t.locale))) {
      for (const vp of VIEWPORTS) {
        const { context, page } = await openSettled(browser, target, vp);
        const name = `${target.locale}-${vp.width}`;
        await page.screenshot({ path: join(dir, `${name}-top.jpg`), type: "jpeg", quality: 65 });
        await page.screenshot({
          path: join(dir, `${name}-full.jpg`),
          type: "jpeg",
          quality: 65,
          fullPage: true,
        });
        const ids = sections ? await shootSections(page, name, vp.width) : [];
        console.log(`✓ ${name}  ${target.url}${target.storage ? ` (locale via localStorage)` : ""}${ids.length ? ` · ${ids.length} sections` : ""}`);
        await context.close();
      }
    }
  } finally {
    await browser.close();
  }
});
console.log(`shots → ${dir}`);
