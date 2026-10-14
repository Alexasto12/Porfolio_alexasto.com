/* Motion check on the three homes and the three Neibr pages (the pages with
   the diagram) at 375 and 1440 px, in four modes:
   - reduced: prefers-reduced-motion emulated. Nothing may animate, every
     sequence (data-phase) stays "final", no text is hidden or clipped and
     every SVG line is fully drawn. (npm run shots also captures with
     reduced motion, so its images show this state.)
   - nojs: JavaScript off, normal motion. Each section is scrolled into view
     and its text must be fully visible: nothing waits for JS to appear.
   - print: JavaScript on, normal motion, printed from the top of the page
     (sequences still waiting, scroll-driven lines not drawn yet). On paper
     nothing may animate, no text may be hidden and every line is drawn.
   - play: JavaScript on, normal motion. Each sequence (the Neibr diagram)
     is scrolled into view; it must start and end complete.
   Exits 1 if anything fails.
   Usage: npm run motion [-- --out docs/portfolio-v2/despues] [-- --locales es] [-- --pages home] */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "@playwright/test";
import { arg, outDir, openSettled, targetName, targets, withServer } from "./lib/server.mjs";

const VIEWPORTS = [
  { width: 375, height: 812 },
  { width: 1440, height: 900 },
];

const dir = join(outDir(), "motion");
mkdirSync(dir, { recursive: true });

/**
 * Text that is on screen but invisible: opacity below 1 or clipped (a
 * clip-path of inset(0) clips nothing). With skipDecorative, aria-hidden
 * text is left out (decoration that repeats visible text).
 */
function hiddenText({ inViewOnly, root = "body", skipDecorative = false }) {
  const found = new Map();
  const vh = window.innerHeight;
  const walker = document.createTreeWalker(document.querySelector(root), NodeFilter.SHOW_TEXT);
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    if (!n.textContent.trim()) continue;
    const el = n.parentElement;
    if (!el || el.closest(".sr-only, .skip-link")) continue;
    if (skipDecorative && el.closest("[aria-hidden='true']")) continue;
    if (!el.checkVisibility({ visibilityProperty: true })) continue;
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) continue;
    if (inViewOnly && (r.bottom <= 0 || r.top >= vh)) continue;
    let opacity = 1;
    let clipped = false;
    for (let e = el; e && e !== document.documentElement; e = e.parentElement) {
      const cs = getComputedStyle(e);
      opacity *= parseFloat(cs.opacity);
      if (cs.clipPath !== "none" && !/^inset\((0(px|%)?\s*)+\)$/.test(cs.clipPath)) clipped = true;
    }
    if (opacity < 0.99 || clipped) {
      const cls = typeof el.className === "string" ? el.className : el.className.baseVal;
      const key = `${el.tagName.toLowerCase()}.${String(cls).split(" ")[0]}`;
      if (!found.has(key)) found.set(key, `${key} (opacity ${opacity.toFixed(2)}${clipped ? ", clip-path" : ""}) “${n.textContent.trim().slice(0, 30)}”`);
    }
  }
  return [...found.values()];
}

/** Running animations, sequences not in their final state and SVG lines not fully drawn, under `root`. */
function reducedProbe(root = "body") {
  const scope = document.querySelector(root);
  const running = document
    .getAnimations()
    .filter((a) => a.playState === "running" && scope.contains(a.effect?.target ?? null))
    .map((a) => `${a.constructor.name} ${a.animationName ?? a.transitionProperty ?? ""} on ${a.effect?.target?.className?.baseVal ?? a.effect?.target?.className ?? "?"}`);
  const phases = [...scope.querySelectorAll("[data-phase]")]
    .filter((e) => e.dataset.phase !== "final")
    .map((e) => `${e.className.baseVal ?? e.className}: ${e.dataset.phase}`);
  // SVG strokes drawn with dashes must end at offset 0 (fully drawn).
  const undrawn = [...scope.querySelectorAll("svg *")]
    .filter((e) => {
      const cs = getComputedStyle(e);
      return cs.strokeDasharray !== "none" && parseFloat(cs.strokeDashoffset) !== 0 && e.checkVisibility();
    })
    .map((e) => `${e.tagName}.${(e.className.baseVal || "").split(" ")[0]} offset ${getComputedStyle(e).strokeDashoffset}`);
  return { running: [...new Set(running)], phases, undrawn: [...new Set(undrawn)] };
}

const report = { generatedAt: new Date().toISOString(), reduced: [], nojs: [], print: [], play: [] };
let failed = false;

function record(mode, target, vp, issues, extra = {}) {
  const ok = !issues.length;
  if (!ok) failed = true;
  report[mode].push({ page: targetName(target), width: vp.width, ok, issues, ...extra });
  console.log(`${ok ? "✓" : "✗"} ${mode} ${targetName(target)} ${vp.width}`);
  for (const line of issues) console.log(`    ${line}`);
}

async function openWithMotion(browser, target, vp) {
  const context = await browser.newContext({ viewport: vp, reducedMotion: "no-preference" });
  const page = await context.newPage();
  await page.goto(target.url, { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  return { context, page };
}

await withServer(async (base) => {
  const browser = await chromium.launch();
  try {
    const pages = arg("pages") ? targets(base) : targets(base, { all: true }).filter((p) => p.page === "home" || p.page === "neibr");
    for (const target of pages) {
      for (const vp of VIEWPORTS) {
        // Reduced motion (openSettled emulates it and walks the whole page).
        {
          const { context, page } = await openSettled(browser, target, vp);
          const probe = await page.evaluate(reducedProbe);
          const hidden = await page.evaluate(hiddenText, { inViewOnly: false });
          record("reduced", target, vp, [...probe.running, ...probe.phases, ...probe.undrawn, ...hidden]);
          await context.close();
        }
        // No JavaScript, normal motion: every section readable once in view.
        {
          const context = await browser.newContext({ viewport: vp, javaScriptEnabled: false, reducedMotion: "no-preference" });
          const page = await context.newPage();
          await page.goto(target.url, { waitUntil: "networkidle" });
          await page.waitForTimeout(500);
          const issues = new Set();
          const phases = await page.$$eval("[data-phase]", (els) => els.filter((e) => e.dataset.phase !== "final").length);
          if (phases) issues.add(`${phases} sequence(s) not in their final state`);
          // Walk the page one screen at a time, checking what is on screen.
          const height = await page.evaluate(() => document.documentElement.scrollHeight);
          let screens = 0;
          for (let y = 0; y < height; y += Math.floor(vp.height * 0.8)) {
            await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), y);
            await page.waitForTimeout(150);
            for (const h of await page.evaluate(hiddenText, { inViewOnly: true, skipDecorative: true })) issues.add(h);
            screens++;
          }
          record("nojs", target, vp, [...issues], { screens });
          await context.close();
        }
        // Printed from the top: the CSS, not JS timing, must show everything.
        {
          const { context, page } = await openWithMotion(browser, target, vp);
          await page.emulateMedia({ media: "print" });
          const probe = await page.evaluate(reducedProbe);
          const hidden = await page.evaluate(hiddenText, { inViewOnly: false });
          // data-phase may still say "hidden" in the DOM: on paper the CSS ignores it.
          record("print", target, vp, [...probe.running, ...probe.undrawn, ...hidden]);
          await context.close();
        }
        // Each sequence plays when it comes into view and ends complete.
        {
          const { context, page } = await openWithMotion(browser, target, vp);
          const issues = [];
          for (const sel of await page.$$eval("[data-phase]", (els) => els.map((e) => `.${e.classList[0]}`))) {
            const before = await page.$eval(sel, (e) => e.dataset.phase);
            if (before !== "hidden") issues.push(`${sel}: ${before} before scrolling to it (expected hidden)`);
            await page.evaluate((sel) => {
              const el = document.querySelector(sel);
              window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.4, behavior: "instant" });
            }, sel);
            // The diagram ends at about 3.7 s (components/NeibrDiagram.tsx).
            await page.waitForTimeout(4500);
            const phase = await page.$eval(sel, (e) => e.dataset.phase);
            if (phase !== "play") issues.push(`${sel}: ${phase} after scrolling to it (expected play)`);
            const probe = await page.evaluate(reducedProbe, sel);
            const hidden = await page.evaluate(hiddenText, { inViewOnly: false, root: sel });
            issues.push(...probe.running.map((r) => `${sel}: still running ${r}`), ...probe.undrawn, ...hidden);
          }
          record("play", target, vp, issues);
          await context.close();
        }
      }
    }
  } finally {
    await browser.close();
  }
});

writeFileSync(join(dir, "report.json"), JSON.stringify(report, null, 2));
const MODES = { reduced: "Reduced motion", nojs: "Sin JavaScript", print: "Impresión", play: "Secuencias" };
const md = [
  "# Movimiento",
  "",
  `Generado: ${report.generatedAt}. Reduced motion: nada se mueve y todo está en su estado final. Sin JavaScript: todo el texto se ve. Impresión: desde arriba, sin nada oculto ni a medio dibujar. Secuencias: el diagrama de Neibr se reproduce al entrar en pantalla y acaba completo.`,
  "",
  "| Modo | Página | Ancho | Resultado |",
  "|---|---|---|---|",
  ...Object.entries(MODES).flatMap(([mode, name]) =>
    report[mode].map((r) => `| ${name} | ${r.page} | ${r.width} | ${r.ok ? "✓" : `✗ ${r.issues.slice(0, 3).join("; ")}`} |`)
  ),
  "",
];
writeFileSync(join(dir, "motion.md"), md.join("\n"));
console.log(`\nmotion report → ${join(dir, "report.json")}`);
process.exit(failed ? 1 : 0);
