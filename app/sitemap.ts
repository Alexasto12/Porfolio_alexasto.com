import type { MetadataRoute } from "next";
import { LOCALES } from "@/lib/i18n-types";
import { CONTENT_UPDATED, hreflangs, localeUrl } from "@/lib/site";

/** Only this site's own URLs: the three locale routes, each with its alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = hreflangs();
  return LOCALES.map((lc) => ({
    url: localeUrl(lc),
    lastModified: CONTENT_UPDATED,
    changeFrequency: "monthly",
    priority: lc === "es" ? 1 : 0.9,
    alternates: { languages },
  }));
}
