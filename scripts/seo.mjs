/* Checks the SEO setup of every page in the three languages and saves the
   Open Graph images of the homes: static routes, <html lang>, canonical,
   hreflang, og:locale, title and description length, one h1, JSON-LD (and
   that every @id it points to exists), no dashes, no text from the other
   languages, internal links and #anchors that land, the sitemap, robots.txt,
   the /es redirect and the 404. Exits 1 on any failure.
   Usage: npm run seo [-- --out docs/portfolio-refresh/despues] */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { chromium } from "@playwright/test";
import { ALL_PAGES, LOCALES, PAGE_KEYS, ROUTES, outDir, withServer } from "./lib/server.mjs";

const ROOT = resolve(import.meta.dirname, "..");
const SITE_URL = (process.env.SITE_URL || "https://dev.alexasto.com").replace(/\/$/, "");
const OG_LOCALE = { es: "es_ES", ca: "ca_ES", en: "en_US" };
const urlFor = (path) => (path === "/" ? SITE_URL : SITE_URL + path);
const hreflangOf = (page) => ({
  ...Object.fromEntries(LOCALES.map((lc) => [lc, urlFor(ROUTES[page][lc])])),
  "x-default": urlFor(ROUTES[page].es),
});
/** Lengths search results show without cutting (titles in characters, as a rule of thumb). */
const TITLE_MAX = 60;
const DESCRIPTION = [110, 160];

const dir = join(outDir(), "seo");
mkdirSync(dir, { recursive: true });
const results = [];
const check = (name, ok, detail = "") => {
  results.push({ name, ok, detail: String(detail ?? "") });
  if (!ok) console.log(`✗ ${name}${detail ? `  ${detail}` : ""}`);
};

const attr = (tag, name) => tag.match(new RegExp(`${name}="([^"]*)"`))?.[1];
const metaContent = (html, prop) =>
  [...html.matchAll(/<meta[^>]+>/g)]
    .map((m) => m[0])
    .filter((t) => attr(t, "property") === prop || attr(t, "name") === prop)
    .map((t) => attr(t, "content"));
const decode = (s) =>
  s.replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const pngSize = (buf) => [buf.readUInt32BE(16), buf.readUInt32BE(20)];

/** Every { "@id": … } reference in a JSON-LD value. */
function refs(value, out = []) {
  if (Array.isArray(value)) value.forEach((v) => refs(v, out));
  else if (value && typeof value === "object") {
    const keys = Object.keys(value);
    if (keys.length === 1 && keys[0] === "@id") out.push(value["@id"]);
    else for (const k of keys) if (k !== "@id") refs(value[k], out);
  }
  return out;
}

const manifestPath = join(ROOT, ".next", "prerender-manifest.json");

await withServer(async (base) => {
  if (!process.env.BASE_URL) {
    // The local build says nothing about a remote server.
    const prerender = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, "utf8")).routes : {};
    const missing = ALL_PAGES.filter((p) => !(p.path in prerender)).map((p) => p.path);
    check(`${ALL_PAGES.length} pages prerendered`, missing.length === 0, missing.join(" "));
  }

  const html = {};
  for (const p of ALL_PAGES) {
    const res = await fetch(base + p.path, { redirect: "manual" });
    html[p.path] = decode(await res.text());
    check(`${p.path} responds 200`, res.status === 200, res.status);
  }

  // Visible text per page, to find strings of one language in another and
  // dashes. Text nodes keep their source case (innerText would apply
  // text-transform) and are not split by React's <!-- --> separators.
  const browser = await chromium.launch();
  const lines = {};
  try {
    for (const p of ALL_PAGES) {
      const page = await browser.newPage();
      await page.goto(base + p.path, { waitUntil: "networkidle" });
      lines[p.path] = await page.evaluate(() => {
        const out = [];
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        for (let n = walker.nextNode(); n; n = walker.nextNode()) {
          if (n.parentElement?.closest("script, style")) continue;
          const text = n.textContent.replace(/\s+/g, " ").trim();
          if (text) out.push(text);
        }
        return out;
      });
      await page.close();
    }
  } finally {
    await browser.close();
  }

  const internal = new Map();
  for (const p of ALL_PAGES) {
    const h = html[p.path];
    const lc = p.locale;
    const at = p.path;
    check(`${at} <html lang="${lc}">`, new RegExp(`<html[^>]*lang="${lc}"`).test(h));

    const links = [...h.matchAll(/<link[^>]+>/g)].map((m) => m[0]);
    const canonical = attr(links.find((l) => attr(l, "rel") === "canonical") ?? "", "href");
    check(`${at} canonical`, canonical === urlFor(p.path), canonical);

    const alternates = Object.fromEntries(
      links.filter((l) => attr(l, "rel") === "alternate" && attr(l, "hrefLang")).map((l) => [attr(l, "hrefLang"), attr(l, "href")])
    );
    check(`${at} hreflang es/ca/en/x-default`, JSON.stringify(alternates) === JSON.stringify(hreflangOf(p.page)), JSON.stringify(alternates));

    const ogLocale = metaContent(h, "og:locale");
    const ogAlt = metaContent(h, "og:locale:alternate").sort();
    const expectedAlt = Object.entries(OG_LOCALE).filter(([k]) => k !== lc).map(([, v]) => v).sort();
    check(
      `${at} og:locale ${OG_LOCALE[lc]} + alternates`,
      ogLocale[0] === OG_LOCALE[lc] && JSON.stringify(ogAlt) === JSON.stringify(expectedAlt),
      `${ogLocale.join(",")} | ${ogAlt.join(",")}`
    );
    check(`${at} og:url = canonical`, metaContent(h, "og:url")[0] === canonical);

    const title = h.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
    const description = metaContent(h, "description");
    check(`${at} title ≤ ${TITLE_MAX}`, title.length > 0 && title.length <= TITLE_MAX, `${title.length}: ${title}`);
    check(
      `${at} one description of ${DESCRIPTION.join("–")}`,
      description.length === 1 && description[0].length >= DESCRIPTION[0] && description[0].length <= DESCRIPTION[1],
      `${description[0]?.length}: ${description[0]}`
    );
    const h1s = [...h.matchAll(/<h1[\s>]/g)].length;
    check(`${at} one h1`, h1s === 1, h1s);
    check(`${at} no meta keywords`, metaContent(h, "keywords").length === 0);
    check(`${at} no api.neibr.es`, !h.includes("api.neibr.es"));
    check(`${at} indexable`, !/<meta name="robots" content="[^"]*noindex/.test(h));

    const dashes = [title, ...description, ...lines[at]].filter((t) => /[—–]/.test(t));
    check(`${at} no dashes (— –)`, dashes.length === 0, dashes.slice(0, 2).join(" | "));

    // Structured data: one graph, every reference resolves inside it.
    const ld = h.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)?.[1];
    let graph = [];
    try {
      graph = JSON.parse(ld ?? "")["@graph"] ?? [];
    } catch {}
    const types = graph.map((n) => n["@type"]).flat();
    const ids = new Set(graph.map((n) => n["@id"]).filter(Boolean));
    const dangling = [...new Set(refs(graph))].filter((id) => !ids.has(id));
    const person = graph.find((n) => n["@type"] === "Person");
    check(
      `${at} JSON-LD WebSite, Person, Organization${p.page === "home" ? "" : ", BreadcrumbList"}`,
      ["WebSite", "Person", "Organization", ...(p.page === "home" ? [] : ["BreadcrumbList"])].every((t) => types.includes(t)) &&
        Boolean(person?.jobTitle && person?.sameAs?.length),
      types.join(",")
    );
    check(`${at} JSON-LD @id references resolve`, graph.length > 0 && dangling.length === 0, dangling.join(" "));
    const webpage = graph.find((n) => /Page$/.test(n["@type"]) && n.url === canonical);
    check(`${at} JSON-LD page node with url, name and inLanguage`, Boolean(webpage?.name && webpage?.inLanguage === lc), webpage?.["@type"]);

    // Text that is visible only in another language must not be in this HTML.
    const own = new Set(lines[at]);
    const leaks = [];
    for (const other of LOCALES.filter((o) => o !== lc)) {
      for (const line of new Set(lines[ROUTES[p.page][other]])) {
        if (line.length < 12 || own.has(line)) continue;
        // Whole text nodes only: "CMS propi" (ca) is a substring of "CMS propio" (es).
        const node = new RegExp(`>\\s*${line.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*<`);
        if (node.test(h)) leaks.push(`${other}: ${line.slice(0, 60)}`);
      }
    }
    check(`${at} has no text from the other languages`, leaks.length === 0, leaks.slice(0, 3).join(" | "));

    // Open Graph image: 1200×630 PNG; the homes' are kept for the record.
    const ogImage = metaContent(h, "og:image")[0];
    const twImage = metaContent(h, "twitter:image")[0];
    if (ogImage) {
      const res = await fetch(ogImage.replace(SITE_URL, base));
      const buf = Buffer.from(await res.arrayBuffer());
      const [w, hgt] = pngSize(buf);
      if (p.page === "home") writeFileSync(join(dir, `og-${lc}.png`), buf);
      check(`${at} og:image 1200×630`, res.status === 200 && w === 1200 && hgt === 630 && twImage === ogImage, `${w}×${hgt}`);
    } else {
      check(`${at} og:image`, false, "missing");
    }

    for (const [, href] of h.matchAll(/<a[^>]+href="([^"]+)"/g)) {
      if (!href.startsWith("/") && !href.startsWith("#")) continue;
      const target = href.startsWith("#") ? `${p.path}${href}` : href;
      if (!internal.has(target)) internal.set(target, at);
    }
  }

  // Internal links: the page answers 200 and the #anchor exists on it.
  const bodies = {};
  const broken = [];
  for (const [href, from] of internal) {
    const [path, hash] = href.split("#");
    if (!(path in bodies)) {
      const res = await fetch(base + path, { redirect: "manual" });
      bodies[path] = res.status === 200 ? await res.text() : null;
    }
    if (bodies[path] === null) broken.push(`${href} (from ${from}): not 200`);
    else if (hash && !new RegExp(`id="${hash}"`).test(bodies[path])) broken.push(`${href} (from ${from}): no #${hash}`);
  }
  check(`${internal.size} internal links and anchors land`, broken.length === 0, broken.slice(0, 5).join(" | "));

  const sitemap = await (await fetch(base + "/sitemap.xml")).text();
  writeFileSync(join(dir, "sitemap.xml"), sitemap);
  const urls = [...sitemap.matchAll(/<url>(.*?)<\/url>/gs)].map((m) => m[1]);
  const locs = urls.map((u) => u.match(/<loc>(.*?)<\/loc>/)?.[1]);
  const expected = ALL_PAGES.map((p) => urlFor(p.path));
  check(
    `sitemap has the ${expected.length} pages and nothing else`,
    urls.length === expected.length && expected.every((u) => locs.includes(u)),
    `${urls.length} urls`
  );
  check(
    "sitemap alternates and lastmod",
    urls.every((u) => (u.match(/<xhtml:link rel="alternate"/g) || []).length === 4 && /<lastmod>\d{4}-\d{2}-\d{2}/.test(u))
  );

  const robots = await (await fetch(base + "/robots.txt")).text();
  writeFileSync(join(dir, "robots.txt"), robots);
  check("robots.txt without Host, with Sitemap", !/^host:/im.test(robots) && /^sitemap:/im.test(robots));

  for (const [from, to] of [["/es", "/"], ["/es/sobre-mi", "/sobre-mi"]]) {
    const res = await fetch(base + from, { redirect: "manual" });
    const location = res.headers.get("location")?.replace(base, "");
    check(`${from} redirects to ${to}`, res.status === 308 && location === to, `${res.status} ${location}`);
  }
  const missing = await fetch(base + "/no-existe");
  const body = await missing.text();
  check("unknown path: 404, noindex, in the three languages", missing.status === 404 && /noindex/.test(body) && /lang="ca"/.test(body) && /lang="en"/.test(body), missing.status);
  for (const asset of ["/favicon.ico", "/icon.svg", "/apple-icon.png", "/manifest.webmanifest", "/llms.txt"]) {
    const res = await fetch(base + asset);
    check(`${asset} responds 200`, res.status === 200, res.status);
  }
  check(`${PAGE_KEYS.length} pages × ${LOCALES.length} languages`, ALL_PAGES.length === PAGE_KEYS.length * LOCALES.length);
});

const failed = results.filter((r) => !r.ok);
console.log(`${results.length - failed.length}/${results.length} checks pass`);
writeFileSync(
  join(dir, "seo.md"),
  [
    "# Comprobación de SEO e idiomas",
    "",
    `Generado: ${new Date().toISOString()}. SITE_URL: ${SITE_URL}. ${results.length - failed.length} de ${results.length} comprobaciones pasan.`,
    "",
    "| Comprobación | Resultado | Detalle |",
    "|---|---|---|",
    ...results.map((r) => `| ${r.name} | ${r.ok ? "ok" : "falla"} | ${r.detail.replace(/\|/g, "\\|")} |`),
    "",
  ].join("\n")
);
console.log(`seo → ${dir} (${failed.length} failed)`);
process.exit(failed.length ? 1 : 0);
