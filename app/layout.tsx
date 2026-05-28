import type { Metadata, Viewport } from "next";
import { bricolage, spaceMono, hanken } from "./fonts";
import { I18nProvider } from "@/lib/i18n";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://alexasto.com"),
  title: {
    default: "Alejandro Cabrera — Systems Architect",
    template: "%s · alexasto",
  },
  description:
    "Arquitecto de sistemas en Barcelona. Microservicios de alto rendimiento, infraestructura de red corporativa y plataformas API-first.",
  authors: [{ name: "Alejandro Cabrera" }],
  creator: "Alejandro Cabrera",
  keywords: [
    "Systems Architect",
    "Microservices",
    "Go",
    "API-first",
    "Next.js",
    "Barcelona",
  ],
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://alexasto.com",
    title: "Alejandro Cabrera — Systems Architect",
    description:
      "Diseño y construyo microservicios de alto rendimiento e infraestructura API-first.",
    siteName: "alexasto",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alejandro Cabrera — Systems Architect",
    description:
      "Diseño y construyo microservicios de alto rendimiento e infraestructura API-first.",
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${bricolage.variable} ${spaceMono.variable} ${hanken.variable}`}
    >
      <body className="font-body">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
