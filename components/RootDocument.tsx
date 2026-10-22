import type { ReactNode } from "react";
import { bricolage, spaceMono, hanken } from "@/app/fonts";
import type { Locale } from "@/lib/i18n-types";
import "@/app/globals.css";

/** <html> for one locale: `lang` comes from the server, per route. Each page brings its own JSON-LD. */
export function RootDocument({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <html lang={locale} className={`${bricolage.variable} ${spaceMono.variable} ${hanken.variable}`}>
      <body>{children}</body>
    </html>
  );
}
