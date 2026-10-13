/* Screenshots of /, /ca and /en at 375 and 1440 px (full page + first screen).
   Usage: npm run shots [-- --out docs/portfolio-refresh/antes] [-- --locales es] */
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "@playwright/test";
import { arg, outDir, openSettled, resolveLocalePages, withServer } from "./lib/server.mjs";

const VIEWPORTS = [
  { width: 375, height: 812 },
  { width: 1440, height: 900 },
];

const locales = arg("locales", "es,ca,en").split(",");
const dir = join(outDir(), "shots");
mkdirSync(dir, { recursive: true });

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
        console.log(`✓ ${name}  ${target.url}${target.storage ? ` (locale via localStorage)` : ""}`);
        await context.close();
      }
    }
  } finally {
    await browser.close();
  }
});
console.log(`shots → ${dir}`);
