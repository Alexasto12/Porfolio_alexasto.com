import type { Metadata, Viewport } from "next";
import { bricolage, spaceMono, hanken } from "./fonts";
import { I18nProvider } from "@/lib/i18n";
import { TweaksProvider } from "@/lib/tweaks";
import { BgField } from "@/components/BgField";
import { TweaksPanel } from "@/components/TweaksPanel";
import {
  SITE_URL,
  BRAND,
  PERSON,
  SAME_AS,
  REFERENCED_LINKS,
  TITLE_DEFAULT,
  DESCRIPTION,
  OG_DESCRIPTION,
  KEYWORDS,
} from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE_DEFAULT,
    template: `%s · ${BRAND}`,
  },
  description: DESCRIPTION,
  applicationName: BRAND,
  authors: [{ name: PERSON.name, url: SITE_URL }],
  creator: PERSON.name,
  publisher: PERSON.name,
  category: "technology",
  keywords: KEYWORDS,
  alternates: {
    canonical: "/",
    languages: {
      "es-ES": "/",
      "ca-ES": "/",
      "en": "/",
      "x-default": "/",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "profile",
    firstName: "Alejandro",
    lastName: "Cabrera",
    username: "alexasto12",
    locale: "es_ES",
    alternateLocale: ["ca_ES", "en_US"],
    url: SITE_URL,
    title: TITLE_DEFAULT,
    description: OG_DESCRIPTION,
    siteName: BRAND,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE_DEFAULT,
    description: OG_DESCRIPTION,
  },
  formatDetection: {
    email: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f3ec" },
    { media: "(prefers-color-scheme: dark)", color: "#14130e" },
  ],
  width: "device-width",
  initialScale: 1,
};

/**
 * JSON-LD knowledge graph. Resolves the "Alexasto" brand to the person
 * "Alejandro Cabrera" and links every public profile/project, so search
 * engines and LLMs treat the query "Alexasto" as this entity.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: BRAND,
      alternateName: [`${BRAND} — ${PERSON.name}`, PERSON.name],
      inLanguage: ["es-ES", "ca-ES", "en"],
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: PERSON.name,
      alternateName: PERSON.alternateName,
      url: SITE_URL,
      jobTitle: PERSON.jobTitle,
      email: `mailto:${PERSON.email}`,
      worksFor: { "@type": "Organization", name: PERSON.worksFor },
      address: {
        "@type": "PostalAddress",
        addressLocality: PERSON.locality,
        addressRegion: PERSON.region,
        addressCountry: PERSON.country,
      },
      knowsAbout: PERSON.knowsAbout,
      knowsLanguage: ["es", "ca", "en"],
      sameAs: SAME_AS,
      subjectOf: REFERENCED_LINKS.map((link) => ({
        "@type": "CreativeWork",
        name: link.title,
        url: link.url,
      })),
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: TITLE_DEFAULT,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#person` },
      mainEntity: { "@id": `${SITE_URL}/#person` },
      inLanguage: "es-ES",
      description: DESCRIPTION,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${bricolage.variable} ${spaceMono.variable} ${hanken.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body">
        <I18nProvider>
          <TweaksProvider>
            <BgField />
            {children}
            <TweaksPanel />
          </TweaksProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
