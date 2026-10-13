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
  jobTitle: "Backend and full-stack developer",
  email: "contact@alexasto.com",
  locality: "Granollers",
  region: "Barcelona",
  country: "ES",
  worksFor: "Digital DesAny",
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
  { url: "https://www.digitaldesany.com", title: "Digital DesAny, web studio (co-founder)" },
  { url: "https://neibr.es", title: "Neibr, B2B API for parcel carriers (co-founder, closed in 2026)" },
  { url: "https://larasoak.art", title: "Lara's Oak, portfolio with a custom CMS (Digital DesAny)" },
  { url: "https://rosesstjordi.com", title: "Roses de Sant Jordi, digital rose campaign (Digital DesAny)" },
  { url: "https://gokthermal.com", title: "GOK Thermal, HVAC installer website (freelance)" },
  { url: "https://github.com/Alexasto12/peer2stream", title: "Peer2Stream, DAW final project (10/10)" },
  { url: "https://github.com/Alexasto12/ProjectePokeAPI", title: "Pokédex DS, DAW exercise" },
];

export const TITLE_DEFAULT = `${PERSON.name} · Desarrollador backend y full-stack`;

export const DESCRIPTION =
  "Alejandro Cabrera, desarrollador backend y full-stack y cofundador de " +
  "Digital DesAny. Hago webs, backends y automatizaciones desde Granollers.";

export const OG_DESCRIPTION = DESCRIPTION;

export const KEYWORDS = [
  "Alexasto",
  "alexasto",
  "alexasto12",
  "Alejandro Cabrera",
  "Digital DesAny",
  "Microservices",
  "Go",
  "Java",
  "API-first",
  "Next.js",
  "Barcelona",
  "Granollers",
  "Neibr",
];
