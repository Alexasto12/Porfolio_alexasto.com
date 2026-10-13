/* Shared helpers for the check scripts (shots, a11y, lh, seo, links).
   Starts `next start` on a local port (building first if the build is
   missing or older than the sources), or reuses BASE_URL if it is set. */
import { spawn, spawnSync } from "node:child_process";
import { existsSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..", "..");
const NEXT_BIN = join(ROOT, "node_modules", ".bin", "next");
/** Everything that changes the build output. */
const SOURCE_DIRS = ["app", "components", "lib", "public", "assets"];
const SOURCE_FILES = ["next.config.ts", "postcss.config.mjs", "tsconfig.json", "package.json", "package-lock.json"];

export const LOCALE_PAGES = [
  { locale: "es", path: "/" },
  { locale: "ca", path: "/ca" },
  { locale: "en", path: "/en" },
];

/** Reads `--name value` or `--name=value` from argv. */
export function arg(name, fallback) {
  const argv = process.argv.slice(2);
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === `--${name}`) return argv[i + 1] ?? fallback;
    if (argv[i].startsWith(`--${name}=`)) return argv[i].slice(name.length + 3);
  }
  return fallback;
}

export function outDir() {
  return resolve(ROOT, arg("out", "docs/portfolio-refresh/despues"));
}

function newestMtime(dir) {
  if (!existsSync(dir)) return 0;
  // The directory's own mtime catches deleted and renamed files.
  let newest = statSync(dir).mtimeMs;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    const m = entry.isDirectory() ? newestMtime(p) : statSync(p).mtimeMs;
    if (m > newest) newest = m;
  }
  return newest;
}

function ensureBuild() {
  const buildId = join(ROOT, ".next", "BUILD_ID");
  const built = existsSync(buildId) ? statSync(buildId).mtimeMs : 0;
  const sources = Math.max(
    ...SOURCE_DIRS.map((d) => newestMtime(join(ROOT, d))),
    ...SOURCE_FILES.map((f) => (existsSync(join(ROOT, f)) ? statSync(join(ROOT, f)).mtimeMs : 0))
  );
  if (built && built >= sources) return;
  console.log("› build missing or stale, running next build…");
  const r = spawnSync(NEXT_BIN, ["build"], { cwd: ROOT, stdio: "inherit" });
  if (r.status !== 0) throw new Error("next build failed");
}

async function waitFor(url, timeoutMs = 60_000) {
  const t0 = Date.now();
  while (Date.now() - t0 < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.status < 500) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 300));
  }
  throw new Error(`server did not answer at ${url}`);
}

/** Runs `fn(baseUrl)` against a production server. */
export async function withServer(fn) {
  if (process.env.BASE_URL) return fn(process.env.BASE_URL.replace(/\/$/, ""));
  ensureBuild();
  const port = Number(process.env.CHECK_PORT || 3100);
  const base = `http://localhost:${port}`;
  // Never test whatever else happens to be listening on the port.
  const busy = await fetch(base, { signal: AbortSignal.timeout(2000) }).then(() => true, () => false);
  if (busy) throw new Error(`port ${port} is already in use; stop that server or set CHECK_PORT`);
  const child = spawn(NEXT_BIN, ["start", "-p", String(port)], {
    cwd: ROOT,
    stdio: ["ignore", "ignore", "inherit"],
  });
  const stop = () => child.kill("SIGTERM");
  const onSignal = () => {
    stop();
    process.exit(130);
  };
  process.once("SIGINT", onSignal);
  process.once("SIGTERM", onSignal);
  const exited = new Promise((_, reject) => {
    child.once("error", reject);
    child.once("exit", (code) => reject(new Error(`next start exited early (code ${code})`)));
  });
  exited.catch(() => {});
  try {
    await Promise.race([waitFor(`${base}/`), exited]);
    return await fn(base);
  } finally {
    process.off("SIGINT", onSignal);
    process.off("SIGTERM", onSignal);
    stop();
  }
}

/**
 * Resolves how to load each locale. Once /ca and /en exist they are used as
 * is; before that (client-side i18n) the locale is forced via localStorage.
 */
export async function resolveLocalePages(base) {
  const pages = [];
  for (const p of LOCALE_PAGES) {
    let ok = false;
    try {
      ok = (await fetch(base + p.path)).status === 200;
    } catch {}
    pages.push(
      ok
        ? { ...p, url: base + p.path, storage: null }
        : { ...p, url: base + "/", storage: p.locale }
    );
  }
  return pages;
}

/** Opens a page in a fresh context, settled and fully revealed. */
export async function openSettled(browser, target, viewport) {
  const mobile = viewport.width < 800;
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 1,
    isMobile: mobile,
    hasTouch: mobile,
    reducedMotion: "reduce",
    locale: { es: "es-ES", ca: "ca-ES", en: "en-US" }[target.locale],
  });
  if (target.storage) {
    await context.addInitScript((lc) => {
      try {
        window.localStorage.setItem("alexasto.locale", lc);
      } catch {}
    }, target.storage);
  }
  const page = await context.newPage();
  await page.goto(target.url, { waitUntil: "networkidle" });
  // Walk the page so lazy images and scroll-triggered effects settle.
  await page.evaluate(async () => {
    const step = Math.max(200, Math.floor(window.innerHeight * 0.8));
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  });
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(400);
  return { context, page };
}
