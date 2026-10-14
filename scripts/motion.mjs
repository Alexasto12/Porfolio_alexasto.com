/* Motion check on /, /ca and /en at 375 and 1440 px, in two modes:
   - reduced: prefers-reduced-motion emulated. Nothing may animate, every
     sequence (data-phase) stays "final", no text is hidden or clipped and
     every SVG line is fully drawn. Saves a full-page screenshot.
   - nojs: JavaScript off, normal motion. Each section is scrolled into view
     and its text must be fully visible: nothing waits for JS to appear.
   Exits 1 if anything fails.
   Usage: npm run motion [-- --out docs/portfolio-v2/despues] [-- --locales es] */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "@playwright/test";
import { arg, outDir, openSettled, resolveLocalePages, withServer } from "./lib/server.mjs";

const VIEWPORTS = [
  { width: 375, height: 812 },
  { width: 1440, height: 900 },
];
const only = arg("locales", "").split(",").filter(Boolean);

const dir = join(outDir(), "motion");
mkdirSync(dir, { recursive: true });

/** Text that is on screen but invisible: opacity below 1 or clipped. */
function hiddenText({ inViewOnly }) {
  const found = new Map();
  const vh = window.innerHeight;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    if (!n.textContent.trim()) continue;
    const el = n.parentElement;
    if (!el || el.closest(".sr-only, .skip-link")) continue;
    if (!el.checkVisibility({ visibilityProperty: true })) continue;
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) continue;
    if (inViewOnly && (r.bottom <= 0 || r.top >= vh)) continue;
    let opacity = 1;
    let clipped = false;
    for (let e = el; e && e !== document.documentElement; e = e.parentElement) {
      const cs = getComputedStyle(e);
      opacity *= parseFloat(cs.opacity);
      if (cs.clipPath !== "none") clipped = true;
    }
    if (opacity < 0.99 || clipped) {
      const cls = typeof el.className === "string" ? el.className : el.className.baseVal;
      const key = `${el.tagName.toLowerCase()}.${String(cls).split(" ")[0]}`;
      if (!found.has(key)) found.set(key, `${key} (opacity ${opacity.toFixed(2)}${clipped ? ", clip-path" : ""}) “${n.textContent.trim().slice(0, 30)}”`);
    }
  }
  return [...found.values()];
}

/** State that must hold with reduced motion once the page has settled. */
function reducedProbe() {
  const running = document
    .getAnimations()
    .filter((a) => a.playState === "running")
    .map((a) => `${a.constructor.name} ${a.animationName ?? a.transitionProperty ?? ""} on ${a.effect?.target?.className?.baseVal ?? a.effect?.target?.className ?? "?"}`);
  const phases = [...document.querySelectorAll("[data-phase]")]
    .filter((e) => e.dataset.phase !== "final")
    .map((e) => `${e.className.baseVal ?? e.className}: ${e.dataset.phase}`);
  // SVG strokes drawn with dashes must end at offset 0 (fully drawn).
  const undrawn = [...document.querySelectorAll("svg *")]
    .filter((e) => {
      const cs = getComputedStyle(e);
      return cs.strokeDasharray !== "none" && parseFloat(cs.strokeDashoffset) !== 0 && e.checkVisibility();
    })
    .map((e) => `${e.tagName}.${(e.className.baseVal || "").split(" ")[0]} offset ${getComputedStyle(e).strokeDashoffset}`);
  return { running: [...new Set(running)], phases, undrawn: [...new Set(undrawn)] };
}

const report = { generatedAt: new Date().toISOString(), reduced: [], nojs: [] };
let failed = false;

await withServer(async (base) => {
  const browser = await chromium.launch();
  try {
    const pages = (await resolveLocalePages(base)).filter((p) => !only.length || only.includes(p.locale));
    for (const target of pages) {
      for (const vp of VIEWPORTS) {
        // Reduced motion (openSettled emulates it and walks the whole page).
        {
          const { context, page } = await openSettled(browser, target, vp);
          const probe = await page.evaluate(reducedProbe);
          const hidden = await page.evaluate(hiddenText, { inViewOnly: false });
          const ok = !probe.running.length && !probe.phases.length && !probe.undrawn.length && !hidden.length;
          if (!ok) failed = true;
          report.reduced.push({ locale: target.locale, width: vp.width, ok, ...probe, hidden });
          await page.screenshot({ path: join(dir, `reduced-${target.locale}-${vp.width}.png`), fullPage: true });
          console.log(`${ok ? "✓" : "✗"} reduced ${target.locale} ${vp.width}`);
          for (const line of [...probe.running, ...probe.phases, ...probe.undrawn, ...hidden]) console.log(`    ${line}`);
          await context.close();
        }
        // No JavaScript, normal motion: every section readable once in view.
        {
          const context = await browser.newContext({ viewport: vp, javaScriptEnabled: false, reducedMotion: "no-preference" });
          const page = await context.newPage();
          await page.goto(target.url, { waitUntil: "networkidle" });
          // The hero entrance is time based (about 1.1 s).
          await page.waitForTimeout(1500);
          const issues = new Set();
          const phases = await page.$$eval("[data-phase]", (els) => els.filter((e) => e.dataset.phase !== "final").length);
          if (phases) issues.add(`${phases} sequence(s) not in their final state`);
          // Walk the page one screen at a time, checking what is on screen.
          const height = await page.evaluate(() => document.documentElement.scrollHeight);
          let screens = 0;
          for (let y = 0; y < height; y += Math.floor(vp.height * 0.8)) {
            await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), y);
            await page.waitForTimeout(150);
            for (const h of await page.evaluate(hiddenText, { inViewOnly: true })) issues.add(h);
            screens++;
          }
          const ok = !issues.size;
          if (!ok) failed = true;
          report.nojs.push({ locale: target.locale, width: vp.width, ok, screens, issues: [...issues] });
          console.log(`${ok ? "✓" : "✗"} nojs ${target.locale} ${vp.width} (${screens} screens)`);
          for (const line of issues) console.log(`    ${line}`);
          await context.close();
        }
      }
    }
  } finally {
    await browser.close();
  }
});

writeFileSync(join(dir, "report.json"), JSON.stringify(report, null, 2));
console.log(`\nmotion report → ${join(dir, "report.json")}`);
process.exit(failed ? 1 : 0);
