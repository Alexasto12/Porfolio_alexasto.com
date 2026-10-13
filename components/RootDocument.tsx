import type { ReactNode } from "react";
import { bricolage, spaceMono, hanken } from "@/app/fonts";
import { TweaksProvider } from "@/lib/tweaks";
import { jsonLd } from "@/lib/site";
import type { Locale } from "@/lib/i18n-types";
import { BgField } from "./BgField";
import { TweaksPanel } from "./TweaksPanel";
import "@/app/globals.css";

/** <html> for one locale: `lang` comes from the server, per route. */
export function RootDocument({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <html lang={locale} className={`${bricolage.variable} ${spaceMono.variable} ${hanken.variable}`}>
      <body className="font-body">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(locale)) }}
        />
        <TweaksProvider>
          <BgField />
          {children}
          <TweaksPanel locale={locale} />
        </TweaksProvider>
      </body>
    </html>
  );
}
