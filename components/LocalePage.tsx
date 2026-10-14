import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n-types";
import type { PageKey } from "@/lib/routes";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { Sections } from "./Sections";
import { JsonLd } from "./ui/JsonLd";
import { AnchorScroll } from "./ui/AnchorScroll";

/** The frame of every page: header, main, footer, its structured data and the anchor handling. */
export function PageShell({ locale, page, children }: { locale: Locale; page: PageKey; children: ReactNode }) {
  return (
    <>
      <JsonLd locale={locale} page={page} />
      <SiteHeader locale={locale} page={page} />
      <main id="contenido" tabIndex={-1} className="page-main">
        {children}
      </main>
      <SiteFooter locale={locale} />
      <AnchorScroll />
    </>
  );
}

/** The home of one locale, rendered on the server. */
export function LocalePage({ locale }: { locale: Locale }) {
  return (
    <PageShell locale={locale} page="home">
      <Sections locale={locale} />
    </PageShell>
  );
}
