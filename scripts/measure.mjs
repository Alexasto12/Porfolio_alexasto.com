/* Measures / at 1440×900 and 375×812: height of each section, images and
   SVGs on the page, and the client JavaScript it downloads (gzip, as sent).
   Used to check the height targets and the JS budget of the v2 plan.
   Usage: npm run measure [-- --out docs/portfolio-v2/despues] */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "@playwright/test";
import { outDir, withServer } from "./lib/server.mjs";

const VIEWPORTS = [
  { width: 1440, height: 900 },
  { width: 375, height: 812 },
];

const dir = outDir();
mkdirSync(dir, { recursive: true });
const rows = [];

await withServer(async (base) => {
  const browser = await chromium.launch();
  try {
    for (const vp of VIEWPORTS) {
      const context = await browser.newContext({ viewport: vp, reducedMotion: "reduce", locale: "es-ES" });
      const page = await context.newPage();
      const scripts = [];
      page.on("requestfinished", async (req) => {
        if (req.resourceType() !== "script") return;
        const sizes = await req.sizes().catch(() => null);
        if (sizes) scripts.push({ url: req.url(), bytes: sizes.responseBodySize + sizes.responseHeadersSize });
      });
      await page.goto(`${base}/`, { waitUntil: "networkidle" });
      const data = await page.evaluate(() => ({
        page: document.documentElement.scrollHeight,
        images: document.querySelectorAll("img").length,
        svgs: document.querySelectorAll("svg").length,
        sections: [...document.querySelectorAll("main > section[id], main > * > section[id]")].map((s) => ({
          id: s.id,
          height: Math.round(s.getBoundingClientRect().height),
        })),
      }));
      const js = scripts.reduce((sum, s) => sum + s.bytes, 0);
      rows.push({ viewport: `${vp.width}×${vp.height}`, ...data, jsKB: +(js / 1024).toFixed(1), jsFiles: scripts.length });
      console.log(
        `✓ ${vp.width}: page ${data.page}px · ${data.images} img · ${data.svgs} svg · JS ${(js / 1024).toFixed(1)} KB · ` +
          data.sections.map((s) => `${s.id} ${s.height}`).join(" · ")
      );
      await context.close();
    }
  } finally {
    await browser.close();
  }
});

const ids = [...new Set(rows.flatMap((r) => r.sections.map((s) => s.id)))];
const md = [
  "# Medidas de /",
  "",
  `Generado: ${new Date().toISOString()}. Alto en px de cada sección; JS de cliente transferido (gzip) al cargar /.`,
  "",
  `| Medida | ${rows.map((r) => r.viewport).join(" | ")} |`,
  `|---|${rows.map(() => "---").join("|")}|`,
  `| Página | ${rows.map((r) => r.page).join(" | ")} |`,
  ...ids.map((id) => `| #${id} | ${rows.map((r) => r.sections.find((s) => s.id === id)?.height ?? "").join(" | ")} |`),
  `| Imágenes | ${rows.map((r) => r.images).join(" | ")} |`,
  `| SVG | ${rows.map((r) => r.svgs).join(" | ")} |`,
  `| JS de cliente (KB, gzip) | ${rows.map((r) => r.jsKB).join(" | ")} |`,
].join("\n");
writeFileSync(join(dir, "medidas.json"), JSON.stringify(rows, null, 2));
writeFileSync(join(dir, "medidas.md"), md + "\n");
console.log(`medidas → ${dir}`);
