/* Checks that every external link on every page (three languages) answers
   200 (after redirects). mailto: links are listed but not requested.
   Usage: npm run links [-- --out docs/portfolio-refresh/despues] */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { ALL_PAGES, outDir, withServer } from "./lib/server.mjs";

const dir = outDir();
mkdirSync(dir, { recursive: true });

async function status(url) {
  for (const method of ["HEAD", "GET"]) {
    try {
      const res = await fetch(url, {
        method,
        redirect: "follow",
        signal: AbortSignal.timeout(20_000),
        headers: { "user-agent": "Mozilla/5.0 (link check; +https://dev.alexasto.com)" },
      });
      if (res.status === 200 || method === "GET") return { code: res.status, final: res.url };
    } catch (err) {
      if (method === "GET") return { code: 0, error: String(err?.cause?.code ?? err?.message ?? err) };
    }
  }
}

const links = new Map();
await withServer(async (base) => {
  for (const p of ALL_PAGES) {
    const html = await (await fetch(base + p.path)).text();
    for (const [, href] of html.matchAll(/<a[^>]+href="([^"]+)"/g)) {
      const url = href.replace(/&amp;/g, "&");
      if (/^(https?:|mailto:)/.test(url)) {
        if (!links.has(url)) links.set(url, new Set());
        links.get(url).add(p.path);
      }
    }
  }
});

const rows = [];
for (const [url, pages] of [...links].sort()) {
  if (url.startsWith("mailto:")) {
    rows.push({ url, pages: [...pages], result: "mailto (no se comprueba)", ok: true });
    continue;
  }
  const r = await status(url);
  const ok = r.code === 200;
  rows.push({ url, pages: [...pages], result: r.code ? `${r.code}${r.final && r.final !== url ? ` → ${r.final}` : ""}` : `sin respuesta (${r.error})`, ok });
  console.log(`${ok ? "✓" : "✗"} ${url}  ${rows.at(-1).result}`);
}

const failed = rows.filter((r) => !r.ok);
writeFileSync(
  join(dir, "links.md"),
  [
    "# Enlaces externos",
    "",
    `Generado: ${new Date().toISOString()}. ${rows.length} enlaces, ${failed.length} sin 200.`,
    "",
    "| Enlace | Páginas | Resultado |",
    "|---|---|---|",
    ...rows.map(
      (r) => `| ${r.url} | ${r.pages.length > 3 ? `${r.pages.length} páginas` : r.pages.join(" ")} | ${r.ok ? "" : "✗ "}${r.result} |`
    ),
    "",
  ].join("\n")
);
console.log(`links → ${join(dir, "links.md")} (${failed.length} failed)`);
process.exit(failed.length ? 1 : 0);
