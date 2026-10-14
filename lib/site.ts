/**
 * Single source of truth for SEO metadata and structured data, per page
 * and locale.
 *
 * Server-only (no "use client", no React) so it can be imported from
 * metadata, sitemap, robots, manifest, OG images and structured data.
 */
import type { Metadata, Viewport } from "next";
import { DATA, PERSON_NAME, CONTACT, DESANY } from "./content";
import { SEO, PAGE_NAME, PARENT, PAGES } from "./pages";
import { LOCALES, type Locale, type Localized } from "./i18n-types";
import { ROUTES, type PageKey } from "./routes";

/**
 * Canonical origin, from the SITE_URL environment variable. Defaults to
 * dev.alexasto.com until alexasto.com points at this site (DECISIONES.md).
 */
export const SITE_URL = (process.env.SITE_URL || "https://dev.alexasto.com").replace(/\/$/, "");
export const SITE_HOST = new URL(SITE_URL).host;

/** Date the content last changed (sitemap lastmod, dateModified). Update with the copy. */
export const CONTENT_UPDATED = "2026-10-14";

export const OG_LOCALE: Record<Locale, string> = { es: "es_ES", ca: "ca_ES", en: "en_US" };

/** Absolute URL of a page in one locale. The Spanish home is the bare origin. */
export const pageUrl = (page: PageKey, locale: Locale) => {
  const path = ROUTES[page][locale];
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
};

/** Path of a page's Open Graph image (app/og/[name]/route.tsx). */
export const ogPath = (locale: Locale, page: PageKey) => `/og/${locale}-${page}.png`;

/** The line under the name on the OG image: the trade on the home, the page's own title elsewhere. */
export const ogLine = (locale: Locale, page: PageKey): string =>
  page === "home" ? DATA.hero.role[locale] : PAGES[page].h1[locale];

export const ogAlt = (locale: Locale, page: PageKey) => `${PERSON_NAME}. ${ogLine(locale, page)}`;

/** hreflang map of one page: one entry per locale plus x-default (Spanish). */
export function hreflangs(page: PageKey = "home"): Record<string, string> {
  const map: Record<string, string> = {};
  for (const lc of LOCALES) map[lc] = pageUrl(page, lc);
  map["x-default"] = pageUrl(page, "es");
  return map;
}

/** The trade alone (jobTitle): the place goes in occupationLocation and address. */
export const JOB_TITLE: Localized = {
  es: "Desarrollador web y backend",
  ca: "Desenvolupador web i backend",
  en: "Web and backend developer",
};
const CATALONIA: Localized = { es: "Cataluña", ca: "Catalunya", en: "Catalonia" };
export const DESCRIPTION: Localized = SEO.home.description;

/** Profiles that identify the same person, for `sameAs` and rel="me". */
export const SAME_AS = CONTACT.profiles.map((p) => p.href);

/** Digital DesAny's own @id, as digitaldesany.com publishes it, so both graphs describe one entity. */
const DESANY_ID = "https://www.digitaldesany.com#organization";

const AWARD: Localized = {
  es: "Santander X Spain Awards 2026 (UVic), uno de los proyectos ganadores, con Neibr",
  ca: "Santander X Spain Awards 2026 (UVic), un dels projectes guanyadors, amb Neibr",
  en: "Santander X Spain Awards 2026 (UVic), one of the winning projects, with Neibr",
};

export const VIEWPORT: Viewport = {
  themeColor: "#f4efe2",
  width: "device-width",
  initialScale: 1,
};

/** Search engine verification tokens, only when the environment provides them. */
function verification(): Metadata["verification"] | undefined {
  const google = process.env.GOOGLE_SITE_VERIFICATION;
  const bing = process.env.BING_SITE_VERIFICATION;
  if (!google && !bing) return undefined;
  return { ...(google ? { google } : {}), ...(bing ? { other: { "msvalidate.01": bing } } : {}) };
}

export function pageMetadata(locale: Locale, page: PageKey = "home"): Metadata {
  const title = SEO[page].title[locale];
  const description = SEO[page].description[locale];
  const url = pageUrl(page, locale);
  const image = { url: ogPath(locale, page), width: 1200, height: 630, alt: ogAlt(locale, page), type: "image/png" };
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    applicationName: PERSON_NAME,
    authors: [{ name: PERSON_NAME, url: SITE_URL }],
    creator: PERSON_NAME,
    alternates: { canonical: url, languages: hreflangs(page) },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    openGraph: {
      ...(page === "home" || page === "about"
        ? { type: "profile" as const, firstName: "Alejandro", lastName: "Cabrera", username: "alexasto12" }
        : { type: "website" as const }),
      locale: OG_LOCALE[locale],
      alternateLocale: LOCALES.filter((lc) => lc !== locale).map((lc) => OG_LOCALE[lc]),
      url,
      title,
      description,
      siteName: PERSON_NAME,
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
    formatDetection: { email: false, telephone: false },
    verification: verification(),
  };
}

const wiki = (title: string) => `https://en.wikipedia.org/wiki/${title}`;
const KNOWS_ABOUT = [
  { "@type": "Thing", name: "Go", sameAs: wiki("Go_(programming_language)") },
  { "@type": "Thing", name: "Java", sameAs: wiki("Java_(programming_language)") },
  { "@type": "Thing", name: "Spring Boot", sameAs: wiki("Spring_Framework") },
  { "@type": "Thing", name: "IBM AS/400", sameAs: wiki("IBM_AS/400") },
  { "@type": "Thing", name: "Node.js", sameAs: wiki("Node.js") },
  { "@type": "Thing", name: "Next.js", sameAs: wiki("Next.js") },
  { "@type": "Thing", name: "React", sameAs: wiki("React_(software)") },
  { "@type": "Thing", name: "PostgreSQL", sameAs: wiki("PostgreSQL") },
  { "@type": "Thing", name: "Redis", sameAs: wiki("Redis") },
  { "@type": "Thing", name: "WordPress", sameAs: wiki("WordPress") },
  { "@type": "Thing", name: "Docker", sameAs: wiki("Docker_(software)") },
  "REST APIs",
];

const PAGE_TYPE: Record<PageKey, string> = {
  home: "ProfilePage",
  about: "AboutPage",
  projects: "CollectionPage",
  neibr: "WebPage",
  vmv: "WebPage",
  backend: "WebPage",
  web: "WebPage",
};

/** The breadcrumb trail of a page, from the home down to it. */
export function trail(page: PageKey): PageKey[] {
  const out: PageKey[] = [page];
  for (let p = PARENT[page]; p; p = PARENT[p]) out.unshift(p);
  return out;
}

/** JSON-LD graph of one page: the site, the person, the studio and the page itself. */
export function jsonLd(locale: Locale, page: PageKey = "home") {
  const personId = `${SITE_URL}/#person`;
  const websiteId = `${SITE_URL}/#website`;
  const url = pageUrl(page, locale);
  const pageId = page === "home" && locale === "es" ? `${SITE_URL}/#webpage` : `${url}#webpage`;
  const address = {
    "@type": "PostalAddress",
    addressLocality: "Granollers",
    addressRegion: "Barcelona",
    addressCountry: "ES",
  };
  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: `${SITE_URL}/`,
      name: PERSON_NAME,
      alternateName: ["Alexasto", "alexasto12"],
      inLanguage: ["es", "ca", "en"],
      publisher: { "@id": personId },
    },
    {
      "@type": "Person",
      "@id": personId,
      name: PERSON_NAME,
      givenName: "Alejandro",
      familyName: "Cabrera",
      alternateName: ["Alexasto", "alexasto12"],
      url: `${SITE_URL}/`,
      description: DATA.hero.lead[locale],
      jobTitle: JOB_TITLE[locale],
      hasOccupation: {
        "@type": "Occupation",
        name: JOB_TITLE[locale],
        occupationLocation: { "@type": "City", name: "Granollers", sameAs: wiki("Granollers") },
      },
      email: CONTACT.personalEmail,
      worksFor: { "@id": DESANY_ID },
      award: AWARD[locale],
      address,
      knowsAbout: KNOWS_ABOUT,
      knowsLanguage: ["es", "ca", "en"],
      sameAs: SAME_AS,
    },
    {
      "@type": "Organization",
      "@id": DESANY_ID,
      name: "Digital DesAny",
      // The same url and founder @id that digitaldesany.com publishes, so the two graphs merge cleanly.
      url: `${DESANY}/es`,
      email: CONTACT.workEmail,
      sameAs: [CONTACT.desanyLinkedIn],
      founder: [{ "@id": personId }, { "@type": "Person", "@id": `${DESANY}#oriol`, name: "Oriol Tamborero" }],
      address,
      areaServed: { "@type": "AdministrativeArea", name: CATALONIA[locale], sameAs: wiki("Catalonia") },
    },
    {
      "@type": PAGE_TYPE[page],
      "@id": pageId,
      url,
      name: SEO[page].title[locale],
      description: SEO[page].description[locale],
      inLanguage: locale,
      isPartOf: { "@id": websiteId },
      dateModified: CONTENT_UPDATED,
      ...(page === "home" || page === "about"
        ? { mainEntity: { "@id": personId } }
        : page === "neibr" || page === "vmv"
          ? { about: { "@id": `${SITE_URL}/#${page}` }, author: { "@id": personId } }
          : { about: { "@id": personId } }),
      ...(page !== "home" ? { breadcrumb: { "@id": `${url}#breadcrumb` } } : {}),
    },
  ];
  if (page !== "home") {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: trail(page).map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: PAGE_NAME[p][locale],
        item: pageUrl(p, locale),
      })),
    });
  }
  if (page === "neibr") {
    graph.push({
      "@type": "CreativeWork",
      "@id": `${SITE_URL}/#neibr`,
      name: "Neibr",
      url: "https://neibr.es",
      description: DATA.experience.neibr.what[locale],
      creator: { "@id": personId },
      keywords: "Go, Fiber, PostgreSQL, Redis, HMAC, API",
      award: AWARD[locale],
      image: `${SITE_URL}/shots/neibr.webp`,
    });
  }
  if (page === "vmv") {
    graph.push({ "@type": "Organization", "@id": `${SITE_URL}/#vmv`, name: "VMV Cosmetic Group" });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}
