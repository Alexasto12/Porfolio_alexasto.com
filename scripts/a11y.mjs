/* axe-core (WCAG 2.2 AA) on /, /ca and /en at 375 and 1440 px, plus two
   checks axe does not cover: horizontal overflow at 320/375 px and text
   rendered below 11 px. Exits 1 on serious/critical axe violations or overflow.
   Usage: npm run a11y [-- --out docs/portfolio-refresh/antes] */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { outDir, openSettled, resolveLocalePages, withServer } from "./lib/server.mjs";

const AXE_VIEWPORTS = [
  { width: 375, height: 812 },
  { width: 1440, height: 900 },
];
const OVERFLOW_WIDTHS = [320, 375];
const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"];
const BLOCKING = new Set(["serious", "critical"]);

const dir = join(outDir(), "a11y");
mkdirSync(dir, { recursive: true });

function overflowProbe() {
  const vw = window.innerWidth;
  const offenders = [];
  const clipped = (el) => {
    for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
      if (getComputedStyle(p).overflowX !== "visible") return true;
    }
    return false;
  };
  for (const el of document.body.querySelectorAll("*")) {
    const r = el.getBoundingClientRect();
    if (r.width && r.right > vw + 1 && !clipped(el)) {
      const cls = typeof el.className === "string" ? el.className.split(" ")[0] : "";
      offenders.push(`${el.tagName.toLowerCase()}${cls ? "." + cls : ""} → ${Math.round(r.right)}px`);
      if (offenders.length >= 5) break;
    }
  }
  return { scrollWidth: document.documentElement.scrollWidth, innerWidth: vw, offenders };
}

function smallTextProbe() {
  const seen = new Map();
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    if (!n.textContent.trim()) continue;
    const el = n.parentElement;
    if (!el || el.closest("[aria-hidden='true']")) continue;
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden") continue;
    const size = parseFloat(cs.fontSize);
    if (size < 11) {
      const key = `${size}px · ${el.tagName.toLowerCase()}.${String(el.className).split(" ")[0]}`;
      if (!seen.has(key)) seen.set(key, n.textContent.trim().slice(0, 40));
    }
  }
  return [...seen].map(([k, sample]) => `${k} “${sample}”`);
}

const report = { generatedAt: new Date().toISOString(), axe: [], overflow: [], smallText: [] };
let failed = false;

await withServer(async (base) => {
  const browser = await chromium.launch();
  try {
    for (const target of await resolveLocalePages(base)) {
      for (const vp of AXE_VIEWPORTS) {
        const { context, page } = await openSettled(browser, target, vp);
        const res = await new AxeBuilder({ page }).withTags(TAGS).analyze();
        const violations = res.violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          help: v.help,
          nodes: v.nodes.length,
          targets: v.nodes.slice(0, 4).map((n) => n.target.join(" ")),
        }));
        const blocking = violations.filter((v) => BLOCKING.has(v.impact));
        if (blocking.length) failed = true;
        report.axe.push({ locale: target.locale, width: vp.width, violations });
        if (vp.width === 375) {
          report.smallText.push({ locale: target.locale, items: await page.evaluate(smallTextProbe) });
        }
        console.log(
          `${blocking.length ? "✗" : "✓"} axe ${target.locale} @${vp.width}: ` +
            `${violations.length} rules (${blocking.length} serious/critical)` +
            (blocking.length ? ` → ${blocking.map((v) => v.id).join(", ")}` : "")
        );
        await context.close();
      }
      for (const width of OVERFLOW_WIDTHS) {
        const { context, page } = await openSettled(browser, target, { width, height: 720 });
        const o = await page.evaluate(overflowProbe);
        const ok = o.scrollWidth <= o.innerWidth && o.offenders.length === 0;
        if (!ok) failed = true;
        report.overflow.push({ locale: target.locale, width, ...o, ok });
        console.log(
          `${ok ? "✓" : "✗"} overflow ${target.locale} @${width}: scrollWidth ${o.scrollWidth}` +
            (o.offenders.length ? ` · ${o.offenders.join(" | ")}` : "")
        );
        await context.close();
      }
    }
  } finally {
    await browser.close();
  }
});

const md = [
  "# axe-core y comprobaciones propias",
  "",
  `Generado: ${report.generatedAt}. Etiquetas: ${TAGS.join(", ")}.`,
  "",
  "## axe",
  "",
  "| Idioma | Ancho | Reglas con fallos | Serias o críticas | Detalle |",
  "|---|---|---|---|---|",
  ...report.axe.map((r) => {
    const b = r.violations.filter((v) => BLOCKING.has(v.impact));
    const detail = r.violations.map((v) => `${v.id} (${v.impact}, ${v.nodes})`).join("; ") || "sin fallos";
    return `| ${r.locale} | ${r.width} | ${r.violations.length} | ${b.length} | ${detail} |`;
  }),
  "",
  "## Desbordamiento horizontal",
  "",
  "| Idioma | Ancho | scrollWidth | Resultado | Elementos que se salen |",
  "|---|---|---|---|---|",
  ...report.overflow.map(
    (o) => `| ${o.locale} | ${o.width} | ${o.scrollWidth} | ${o.ok ? "ok" : "desborda"} | ${o.offenders.join("<br>") || "ninguno"} |`
  ),
  "",
  "## Texto por debajo de 11 px (375 px)",
  "",
  ...report.smallText.flatMap((s) => [
    `### ${s.locale}`,
    "",
    ...(s.items.length ? s.items.map((i) => `- ${i}`) : ["- ninguno"]),
    "",
  ]),
].join("\n");

writeFileSync(join(dir, "axe.json"), JSON.stringify(report, null, 2));
writeFileSync(join(dir, "axe.md"), md + "\n");
console.log(`a11y → ${dir}`);
process.exit(failed ? 1 : 0);
