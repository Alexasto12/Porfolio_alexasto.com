/**
 * Single source of truth for SEO / GEO metadata.
 *
 * Server-safe (no "use client", no React) so it can be imported from
 * metadata, sitemap, robots, manifest and structured-data generators.
 */

/** Canonical origin the site is indexed under. */
export const SITE_URL = "https://dev.alexasto.com";

/** Brand handle. The thing people type into Google ("Alexasto"). */
export const BRAND = "Alexasto";

export const PERSON = {
  name: "Alejandro Cabrera",
  /** Names/handles the same entity is known by across the web. */
  alternateName: ["Alexasto", "alexasto12", "alexasto", "Alex Cabrera"],
  jobTitle: "Systems Architect",
  email: "contact@alexasto.com",
  locality: "Granollers",
  region: "Barcelona",
  country: "ES",
  worksFor: "VMV Cosmetic Group",
  knowsAbout: [
    "Systems Architecture",
    "Microservices",
    "Go",
    "Java",
    "Spring Boot",
    "API-first design",
    "OpenAPI",
    "Next.js",
    "React",
    "TypeScript",
    "WordPress",
    "DevOps",
    "Network infrastructure",
    "Web security",
    "AS/400 integration",
  ],
} as const;

/**
 * Profiles that prove the "Alexasto / Alejandro Cabrera" entity is one and
 * the same person — fed to `sameAs` so search engines and LLMs can resolve it.
 */
export const SAME_AS = [
  "https://github.com/Alexasto12",
  "https://www.linkedin.com/in/ccalejandro/",
  "https://profiles.wordpress.org/alexasto12/",
] as const;

/**
 * Public work referenced from the landing. Surfaced in the sitemap and in
 * structured data so the single page exposes the projects it points to.
 */
export const REFERENCED_LINKS: { url: string; title: string }[] = [
  { url: "https://neibr.es", title: "Neibr — B2B logistics platform (own product)" },
  { url: "https://api.neibr.es", title: "Neibr API — public documentation" },
  { url: "https://larasoak.art", title: "larasoak.art — editorial portfolio (client work)" },
  { url: "https://gokthermal.com", title: "gokthermal.com — HVAC services site (client work)" },
  { url: "https://rosesstjordi.com", title: "Roses Sant Jordi — multi-domain campaign (own product)" },
  { url: "https://github.com/Alexasto12/peer2stream", title: "peer2stream — final year project (10/10)" },
  { url: "https://github.com/Alexasto12/ProjectePokeAPI", title: "Pokédex DS — academic project" },
  { url: "https://alexasto12.github.io/ProjectePokeAPI/", title: "Pokédex DS — live demo" },
];

export const TITLE_DEFAULT = `${BRAND} — ${PERSON.name} · ${PERSON.jobTitle}`;

export const DESCRIPTION =
  "Alexasto es el portfolio de Alejandro Cabrera, arquitecto de sistemas en " +
  "Barcelona. Microservicios de alto rendimiento, infraestructura de red " +
  "corporativa y plataformas API-first en Go, Java y Next.js.";

export const OG_DESCRIPTION =
  "Alexasto · Alejandro Cabrera — diseño y construyo microservicios de alto " +
  "rendimiento e infraestructura API-first.";

export const KEYWORDS = [
  "Alexasto",
  "alexasto",
  "alexasto12",
  "Alejandro Cabrera",
  "Alejandro Cabrera arquitecto de sistemas",
  "Systems Architect",
  "Arquitecto de sistemas Barcelona",
  "Microservices",
  "Go",
  "Java",
  "API-first",
  "Next.js",
  "Barcelona",
  "Granollers",
  "Neibr",
];
