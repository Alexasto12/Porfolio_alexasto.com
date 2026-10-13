import type { Locale } from "@/lib/i18n-types";
import { TelemetryBar } from "./TelemetryBar";
import { Sections } from "./Sections";

/** The page for one locale, rendered on the server. */
export function LocalePage({ locale }: { locale: Locale }) {
  return (
    <>
      <TelemetryBar locale={locale} />
      <main id="contenido" tabIndex={-1} style={{ position: "relative", zIndex: 2 }}>
        <Sections locale={locale} />
      </main>
    </>
  );
}
