/**
 * Every page of the site, per locale. lib/routes.json is the single source:
 * the app reads it here and the check scripts read the same file.
 */
import data from "./routes.json";
import { LOCALES, type Locale, type Localized } from "./i18n-types";

export type PageKey = keyof typeof data;
export const ROUTES = data as Record<PageKey, Localized>;
export const PAGE_KEYS = Object.keys(ROUTES) as PageKey[];
/** Pages other than the home, which is built from sections. */
export const SUBPAGES = PAGE_KEYS.filter((k) => k !== "home");

/** The path of a subpage inside its locale prefix, split into segments (for generateStaticParams). */
export function slugOf(page: PageKey, locale: Locale): string[] {
  const prefix = locale === "es" ? "" : `/${locale}`;
  return ROUTES[page][locale].slice(prefix.length + 1).split("/");
}

/** The page a locale's catch-all slug points to, if any. */
export function pageFromSlug(locale: Locale, slug: string[]): PageKey | undefined {
  const path = (locale === "es" ? "/" : `/${locale}/`) + slug.join("/");
  return SUBPAGES.find((k) => ROUTES[k][locale] === path);
}

/** An in-page anchor on the home, from any page: "#id" on the home itself, "/ca#id" elsewhere. */
export function homeAnchor(locale: Locale, id: string, onHome: boolean): string {
  return onHome ? `#${id}` : `${ROUTES.home[locale]}#${id}`;
}

export { LOCALES };
