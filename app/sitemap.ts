import type { MetadataRoute } from "next";
import { SITE_URL, REFERENCED_LINKS } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Primary URL: the landing, with per-language alternates (single URL,
  // language is resolved client-side, so every locale shares "/").
  const home: MetadataRoute.Sitemap[number] = {
    url: SITE_URL,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 1,
    alternates: {
      languages: {
        es: SITE_URL,
        ca: SITE_URL,
        en: SITE_URL,
      },
    },
  };

  // Referenced work. The landing is a single page, so we expose the projects
  // it links to as discoverable URLs for crawlers.
  const referenced: MetadataRoute.Sitemap = REFERENCED_LINKS.map((link) => ({
    url: link.url,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [home, ...referenced];
}
