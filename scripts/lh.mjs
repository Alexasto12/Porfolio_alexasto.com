/* Lighthouse (mobile and desktop) using Playwright's Chromium. Each case runs
   several times and keeps the run with the median performance score, since a
   single run in a shared container is noisy.
   By default the Spanish home; --all for the three homes, --pages and
   --locales to pick others (e.g. --pages neibr,web --locales es).
   Usage: npm run lh [-- --out docs/portfolio-refresh/antes] [-- --runs 3] [-- --all] */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "@playwright/test";
import * as chromeLauncher from "chrome-launcher";
import lighthouse from "lighthouse";
import desktopConfig from "lighthouse/core/config/desktop-config.js";
import { arg, outDir, targetName, targets, withServer } from "./lib/server.mjs";

const dir = join(outDir(), "lighthouse");
mkdirSync(dir, { recursive: true });
const all = process.argv.includes("--all");
const runs = Math.max(1, Number(arg("runs", "3")));

const CATEGORIES = ["performance", "accessibility", "best-practices", "seo"];
const METRICS = {
  "first-contentful-paint": "FCP",
  "largest-contentful-paint": "LCP",
  "total-blocking-time": "TBT",
  "cumulative-layout-shift": "CLS",
  "speed-index": "SI",
};

const rows = [];

await withServer(async (base) => {
  const pages = targets(base).filter((p) => all || arg("locales") || p.locale === "es");
  const chrome = await chromeLauncher.launch({
    chromePath: chromium.executablePath(),
    chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
  });
  try {
    for (const target of pages) {
      for (const formFactor of ["mobile", "desktop"]) {
        const config = formFactor === "desktop" ? desktopConfig : undefined;
        const results = [];
        for (let i = 0; i < runs; i++) {
          results.push(
            await lighthouse(
              target.url,
              {
                port: chrome.port,
                output: "html",
                logLevel: "error",
                onlyCategories: CATEGORIES,
                disableFullPageScreenshot: true,
              },
              config
            )
          );
        }
        results.sort((a, b) => a.lhr.categories.performance.score - b.lhr.categories.performance.score);
        const { lhr, report } = results[Math.floor(results.length / 2)];
        const name = `${target.page === "home" ? target.locale : targetName(target)}-${formFactor}`;
        writeFileSync(join(dir, `${name}.html`), report);
        const row = { page: target.path, formFactor, runs };
        for (const c of CATEGORIES) row[c] = Math.round((lhr.categories[c]?.score ?? 0) * 100);
        for (const [id, label] of Object.entries(METRICS)) row[label] = lhr.audits[id]?.displayValue ?? "";
        rows.push(row);
        console.log(
          `✓ ${name} (median of ${runs}): ${CATEGORIES.map((c) => `${c} ${row[c]}`).join(" · ")} · ` +
            Object.values(METRICS).map((m) => `${m} ${row[m]}`).join(" · ")
        );
      }
    }
  } finally {
    await chrome.kill();
  }
});

const md = [
  "# Lighthouse",
  "",
  `Generado: ${new Date().toISOString()}, en local contra \`next start\` con el Chromium de Playwright. ` +
    `Cada fila es la pasada con la puntuación de rendimiento mediana de ${runs}.`,
  "",
  "| Página | Dispositivo | Rendimiento | Accesibilidad | Buenas prácticas | SEO | FCP | LCP | TBT | CLS | SI |",
  "|---|---|---|---|---|---|---|---|---|---|---|",
  ...rows.map(
    (r) =>
      `| ${r.page} | ${r.formFactor} | ${r.performance} | ${r.accessibility} | ${r["best-practices"]} | ${r.seo} | ${r.FCP} | ${r.LCP} | ${r.TBT} | ${r.CLS} | ${r.SI} |`
  ),
].join("\n");
writeFileSync(join(dir, "summary.json"), JSON.stringify(rows, null, 2));
writeFileSync(join(dir, "summary.md"), md + "\n");
console.log(`lighthouse → ${dir}`);
