/* Checks the per-locale SEO setup and saves the Open Graph images:
   static routes, <html lang>, canonical, hreflang, og:locale, JSON-LD,
   no meta keywords, sitemap, robots.txt, and that each locale's HTML has no
   text that only appears in the other two. Exits 1 on any failure.
   Usage: npm run seo [-- --out docs/portfolio-refresh/despues] */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { chromium } from "@playwright/test";
import { LOCALE_PAGES, outDir, withServer } from "./lib/server.mjs";

const ROOT = resolve(import.meta.dirname, "..");
const SITE_URL = (process.env.SITE_URL || "https://dev.alexasto.com").replace(/\/$/, "");
const OG_LOCALE = { es: "es_ES", ca: "ca_ES", en: "en_US" };
const urlFor = (path) => (path === "/" ? SITE_URL : SITE_URL + path);
const EXPECTED_HREFLANG = {
  es: urlFor("/"),
  ca: urlFor("/ca"),
  en: urlFor("/en"),
  "x-default": urlFor("/"),
};

const dir = join(outDir(), "seo");
mkdirSync(dir, { recursive: true });
const results = [];
const check = (name, ok, detail = "") => {
  results.push({ name, ok, detail });
  console.log(`${ok ? "✓" : "✗"} ${name}${detail ? `  ${detail}` : ""}`);
};

const attr = (tag, name) => tag.match(new RegExp(`${name}="([^"]*)"`))?.[1];
const metaContent = (html, prop) =>
  [...html.matchAll(/<meta[^>]+>/g)]
    .map((m) => m[0])
    .filter((t) => attr(t, "property") === prop || attr(t, "name") === prop)
    .map((t) => attr(t, "content"));
const decode = (s) =>
  s.replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

// Static: the three routes must be prerendered at build time.
const manifestPath = join(ROOT, ".next", "prerender-manifest.json");

await withServer(async (base) => {
  const prerender = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, "utf8")).routes : {};
  for (const p of LOCALE_PAGES) check(`static ${p.path}`, p.path in prerender, "prerender-manifest");

  const html = {};
  for (const p of LOCALE_PAGES) {
    const res = await fetch(base + p.path);
    html[p.locale] = decode(await res.text());
    check(`${p.path} responds 200`, res.status === 200, String(res.status));
  }

  // Visible text per locale, to find strings that belong to only one locale.
  const browser = await chromium.launch();
  const lines = {};
  try {
    for (const p of LOCALE_PAGES) {
      const page = await browser.newPage();
      await page.goto(base + p.path, { waitUntil: "networkidle" });
      lines[p.locale] = new Set(
        (await page.evaluate(() => document.body.innerText))
          .split("\n")
          .map((s) => s.trim())
          .filter((s) => s.length >= 12)
      );
      await page.close();
    }
  } finally {
    await browser.close();
  }

  for (const p of LOCALE_PAGES) {
    const h = html[p.locale];
    const lc = p.locale;
    check(`${p.path} <html lang="${lc}">`, new RegExp(`<html[^>]*lang="${lc}"`).test(h));

    const links = [...h.matchAll(/<link[^>]+>/g)].map((m) => m[0]);
    const canonical = links.find((l) => attr(l, "rel") === "canonical");
    check(`${p.path} canonical`, attr(canonical ?? "", "href") === urlFor(p.path), attr(canonical ?? "", "href"));

    const alternates = Object.fromEntries(
      links.filter((l) => attr(l, "rel") === "alternate" && attr(l, "hrefLang")).map((l) => [attr(l, "hrefLang"), attr(l, "href")])
    );
    const hreflangOk = JSON.stringify(alternates) === JSON.stringify(EXPECTED_HREFLANG);
    check(`${p.path} hreflang es/ca/en/x-default`, hreflangOk, JSON.stringify(alternates));

    const ogLocale = metaContent(h, "og:locale");
    const ogAlt = metaContent(h, "og:locale:alternate").sort();
    const expectedAlt = Object.entries(OG_LOCALE).filter(([k]) => k !== lc).map(([, v]) => v).sort();
    check(
      `${p.path} og:locale ${OG_LOCALE[lc]} + alternates`,
      ogLocale[0] === OG_LOCALE[lc] && JSON.stringify(ogAlt) === JSON.stringify(expectedAlt),
      `${ogLocale.join(",")} | ${ogAlt.join(",")}`
    );
    check(`${p.path} title and description`, /<title>[^<]+<\/title>/.test(h) && metaContent(h, "description").length === 1);
    check(`${p.path} no meta keywords`, metaContent(h, "keywords").length === 0);
    check(`${p.path} no api.neibr.es`, !h.includes("api.neibr.es"));

    const ld = h.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)?.[1];
    let graph = [];
    try {
      graph = JSON.parse(ld ?? "")["@graph"] ?? [];
    } catch {}
    const person = graph.find((n) => n["@type"] === "Person");
    const org = graph.find((n) => n["@type"] === "Organization");
    check(
      `${p.path} JSON-LD Person + Organization`,
      Boolean(person?.jobTitle && person?.award && org?.name === "Digital DesAny" && org?.founder?.length),
      person?.jobTitle ?? "missing"
    );

    // Text that is visible only in another locale must not be in this HTML.
    const leaks = [];
    for (const other of LOCALE_PAGES.filter((o) => o.locale !== lc)) {
      for (const line of lines[other.locale]) {
        if (!lines[lc].has(line) && h.includes(line)) leaks.push(`${other.locale}: ${line.slice(0, 60)}`);
      }
    }
    check(`${p.path} has no text from the other locales`, leaks.length === 0, leaks.slice(0, 3).join(" | "));

    // Open Graph image for this locale.
    const ogImage = metaContent(h, "og:image")[0];
    if (ogImage) {
      const res = await fetch(ogImage.replace(SITE_URL, base));
      const buf = Buffer.from(await res.arrayBuffer());
      writeFileSync(join(dir, `og-${lc}.png`), buf);
      const w = buf.readUInt32BE(16);
      const hgt = buf.readUInt32BE(20);
      check(`${p.path} og:image`, res.status === 200 && w === 1200 && hgt === 630, `${w}×${hgt} → seo/og-${lc}.png`);
    } else {
      check(`${p.path} og:image`, false, "missing");
    }
  }

  const sitemap = await (await fetch(base + "/sitemap.xml")).text();
  writeFileSync(join(dir, "sitemap.xml"), sitemap);
  const urls = [...sitemap.matchAll(/<url>(.*?)<\/url>/gs)].map((m) => m[1]);
  const locs = urls.map((u) => u.match(/<loc>(.*?)<\/loc>/)?.[1]);
  check(
    "sitemap has only the three locale URLs",
    urls.length === 3 && LOCALE_PAGES.every((p) => locs.includes(urlFor(p.path))),
    locs.join(" ")
  );
  check(
    "sitemap alternates and lastmod",
    urls.every(
      (u) =>
        (u.match(/<xhtml:link rel="alternate"/g) || []).length === 4 &&
        /<lastmod>\d{4}-\d{2}-\d{2}/.test(u)
    )
  );

  const robots = await (await fetch(base + "/robots.txt")).text();
  writeFileSync(join(dir, "robots.txt"), robots);
  check("robots.txt without Host, with Sitemap", !/^host:/im.test(robots) && /^sitemap:/im.test(robots));
});

const failed = results.filter((r) => !r.ok);
writeFileSync(
  join(dir, "seo.md"),
  [
    "# Comprobación de SEO e idiomas",
    "",
    `Generado: ${new Date().toISOString()}. SITE_URL: ${SITE_URL}.`,
    "",
    "| Comprobación | Resultado | Detalle |",
    "|---|---|---|",
    ...results.map((r) => `| ${r.name} | ${r.ok ? "ok" : "falla"} | ${r.detail.replace(/\|/g, "\\|")} |`),
    "",
  ].join("\n")
);
console.log(`seo → ${dir} (${failed.length} failed)`);
process.exit(failed.length ? 1 : 0);
