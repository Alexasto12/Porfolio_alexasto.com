import { DATA } from "@/lib/content";
import { LOCALES, LOCALE_FULL, translator, type Locale } from "@/lib/i18n-types";
import { LOCALE_PATH } from "@/lib/site";
import { Clock } from "./ui/Clock";

export function TelemetryBar({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const d = DATA.telemetry;
  return (
    <>
      <a className="skip-link" href="#contenido">
        {t(d.skipLink)}
      </a>
      <div className="telemetry">
        <div className="telemetry__inner">
          <span className="telemetry__sysid">{d.name}</span>
          <span className="telemetry__sep" aria-hidden>
            {"//"}
          </span>
          <span className="telemetry__role">{t(d.role)}</span>
          <span className="telemetry__spacer" />
          <span className="telemetry__clock" title="CET">
            <Clock /> CET
          </span>
          <span className="telemetry__sep" aria-hidden>
            ·
          </span>
          <span className="telemetry__avail">
            <span className="dot dot--accent dot-pulse" aria-hidden />
            {t(d.availability)}
          </span>
          {/* Plain links between the static locale routes; no automatic redirect. */}
          <nav className="lang-switch" aria-label={t(d.langLabel)}>
            {LOCALES.map((lc) => (
              <a
                key={lc}
                href={LOCALE_PATH[lc]}
                hrefLang={lc}
                lang={lc}
                aria-label={LOCALE_FULL[lc]}
                aria-current={lc === locale ? "page" : undefined}
                data-on={lc === locale}
              >
                {lc.toUpperCase()}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
