import type { MetadataRoute } from "next";
import { LOCALES } from "@/lib/i18n-types";
import { PAGE_KEYS } from "@/lib/routes";
import { CONTENT_UPDATED, hreflangs, pageUrl } from "@/lib/site";
import { SHOTS } from "@/lib/shots";
import { DATA } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

/** Captures shown on each page (absolute URLs of the originals, not of /_next/image). */
const IMAGES: Partial<Record<(typeof PAGE_KEYS)[number], string[]>> = {
  home: ["roses", "larasoak", "paulakrebel", "gokthermal", "peer2stream"],
  projects: ["roses", "larasoak", "paulakrebel", "gokthermal", "peer2stream"],
  web: ["roses", "larasoak", "paulakrebel", "gokthermal"],
  neibr: ["neibr"],
  about: ["peer2stream"],
};

/** Pages that show my photo. */
const PORTRAIT_ON: (typeof PAGE_KEYS)[number][] = ["home", "about"];

/** Every page in every locale, each with its alternates and the images it shows. */
export default function sitemap(): MetadataRoute.Sitemap {
  return PAGE_KEYS.flatMap((page) => {
    const languages = hreflangs(page);
    const images = [
      ...(PORTRAIT_ON.includes(page) ? [`${SITE_URL}${DATA.about.portrait.src}`] : []),
      ...(IMAGES[page] ?? []).flatMap((id) => (SHOTS[id] ? [`${SITE_URL}${SHOTS[id]!.src}`] : [])),
    ];
    return LOCALES.map((lc) => ({
      url: pageUrl(page, lc),
      lastModified: CONTENT_UPDATED,
      alternates: { languages },
      ...(images.length ? { images } : {}),
    }));
  });
}
