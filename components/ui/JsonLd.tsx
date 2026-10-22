import type { Locale } from "@/lib/i18n-types";
import type { PageKey } from "@/lib/routes";
import { jsonLd } from "@/lib/site";

/** The structured data of one page, as a JSON-LD script. */
export function JsonLd({ locale, page }: { locale: Locale; page: PageKey }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(locale, page)) }} />;
}
