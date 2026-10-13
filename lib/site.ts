/**
 * Single source of truth for SEO metadata, per locale.
 *
 * Server-only (no "use client", no React) so it can be imported from
 * metadata, sitemap, robots, manifest, OG images and structured data.
 */
import type { Metadata, Viewport } from "next";
import { DATA, PERSON_NAME } from "./content";
import { LOCALES, type Locale, type Localized } from "./i18n-types";

/**
 * Canonical origin, from the SITE_URL environment variable. Defaults to
 * dev.alexasto.com until alexasto.com points at this site (DECISIONES.md).
 */
export const SITE_URL = (process.env.SITE_URL || "https://dev.alexasto.com").replace(/\/$/, "");
export const SITE_HOST = new URL(SITE_URL).host;

/** Date the page content last changed (sitemap lastmod). Update with the copy. */
export const CONTENT_UPDATED = "2026-10-13";

/** Route of each locale. Spanish is the default and lives at the root. */
export const LOCALE_PATH: Record<Locale, string> = { es: "/", ca: "/ca", en: "/en" };

export const OG_LOCALE: Record<Locale, string> = { es: "es_ES", ca: "ca_ES", en: "en_US" };

export const localeUrl = (locale: Locale) =>
  LOCALE_PATH[locale] === "/" ? SITE_URL : `${SITE_URL}${LOCALE_PATH[locale]}`;

/** hreflang map: one entry per locale plus x-default (Spanish). */
export function hreflangs(): Record<string, string> {
  const map: Record<string, string> = {};
  for (const lc of LOCALES) map[lc] = localeUrl(lc);
  map["x-default"] = localeUrl("es");
  return map;
}

const JOB_TITLE: Localized = {
  es: "Desarrollador backend y full-stack",
  ca: "Desenvolupador backend i full-stack",
  en: "Backend and full-stack developer",
};

export const TITLE: Localized = {
  es: `${PERSON_NAME} · ${JOB_TITLE.es}`,
  ca: `${PERSON_NAME} · ${JOB_TITLE.ca}`,
  en: `${PERSON_NAME} · ${JOB_TITLE.en}`,
};

export const DESCRIPTION: Localized = {
  es: `${DATA.hero.title.es} ${DATA.hero.line.es}`,
  ca: `${DATA.hero.title.ca} ${DATA.hero.line.ca}`,
  en: `${DATA.hero.title.en} ${DATA.hero.line.en}`,
};

/** Profiles that identify the same person, for `sameAs`. */
export const SAME_AS = [
  "https://www.linkedin.com/in/ccalejandro/",
  "https://github.com/Alexasto12",
  "https://profiles.wordpress.org/alexasto12/",
];

const DESANY = {
  name: "Digital DesAny",
  url: "https://www.digitaldesany.com",
  linkedin: "https://www.linkedin.com/company/digital-desany/",
  email: "info@digitaldesany.com",
};

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

export function pageMetadata(locale: Locale): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: TITLE[locale],
    description: DESCRIPTION[locale],
    applicationName: PERSON_NAME,
    authors: [{ name: PERSON_NAME, url: SITE_URL }],
    creator: PERSON_NAME,
    alternates: {
      canonical: localeUrl(locale),
      languages: hreflangs(),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    openGraph: {
      type: "profile",
      firstName: "Alejandro",
      lastName: "Cabrera",
      username: "alexasto12",
      locale: OG_LOCALE[locale],
      alternateLocale: LOCALES.filter((lc) => lc !== locale).map((lc) => OG_LOCALE[lc]),
      url: localeUrl(locale),
      title: TITLE[locale],
      description: DESCRIPTION[locale],
      siteName: PERSON_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title: TITLE[locale],
      description: DESCRIPTION[locale],
    },
    formatDetection: { email: false, telephone: false },
  };
}

/** JSON-LD graph: WebSite, Person, Organization (Digital DesAny) and this ProfilePage. */
export function jsonLd(locale: Locale) {
  const personId = `${SITE_URL}/#person`;
  const orgId = `${SITE_URL}/#digital-desany`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: PERSON_NAME,
        inLanguage: ["es", "ca", "en"],
        publisher: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: PERSON_NAME,
        alternateName: ["Alexasto", "alexasto12"],
        url: SITE_URL,
        jobTitle: JOB_TITLE[locale],
        email: "mailto:contact@alexasto.com",
        worksFor: { "@id": orgId },
        award: AWARD[locale],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Granollers",
          addressRegion: "Barcelona",
          addressCountry: "ES",
        },
        knowsAbout: ["Go", "Java", "Spring Boot", "Next.js", "React", "TypeScript", "PostgreSQL", "WordPress", "APIs"],
        knowsLanguage: ["es", "ca", "en"],
        sameAs: SAME_AS,
      },
      {
        "@type": "Organization",
        "@id": orgId,
        name: DESANY.name,
        url: DESANY.url,
        email: `mailto:${DESANY.email}`,
        sameAs: [DESANY.linkedin],
        founder: [{ "@id": personId }, { "@type": "Person", name: "Oriol Tamborero" }],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Granollers",
          addressRegion: "Barcelona",
          addressCountry: "ES",
        },
      },
      {
        "@type": "ProfilePage",
        "@id": `${localeUrl(locale)}#webpage`,
        url: localeUrl(locale),
        name: TITLE[locale],
        description: DESCRIPTION[locale],
        inLanguage: locale,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": personId },
        mainEntity: { "@id": personId },
      },
    ],
  };
}
