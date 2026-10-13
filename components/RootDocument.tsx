import type { ReactNode } from "react";
import { bricolage, spaceMono, hanken } from "@/app/fonts";
import { jsonLd } from "@/lib/site";
import type { Locale } from "@/lib/i18n-types";
import "@/app/globals.css";

/** <html> for one locale: `lang` comes from the server, per route. */
export function RootDocument({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <html lang={locale} className={`${bricolage.variable} ${spaceMono.variable} ${hanken.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(locale)) }}
        />
        {/* Ink layer behind the page; it fades in while Experiencia is on screen. */}
        <div className="surface-fade" aria-hidden>
          <div className="surface-fade__ink" />
        </div>
        {children}
      </body>
    </html>
  );
}
