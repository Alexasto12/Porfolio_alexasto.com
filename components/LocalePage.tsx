import type { Locale } from "@/lib/i18n-types";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { Sections } from "./Sections";

/** The page for one locale, rendered on the server. */
export function LocalePage({ locale }: { locale: Locale }) {
  return (
    <>
      <SiteHeader locale={locale} />
      <main id="contenido" tabIndex={-1} style={{ position: "relative", zIndex: 2 }}>
        <Sections locale={locale} />
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
