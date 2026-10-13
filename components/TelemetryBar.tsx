"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { LOCALES, LOCALE_FULL, type Locale } from "@/lib/i18n-types";
import { DATA } from "@/lib/content";

export function TelemetryBar() {
  const { t, locale, setLocale } = useI18n();
  const d = DATA.telemetry;
  const [clock, setClock] = useState("");

  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Europe/Madrid",
      });
    setClock(fmt());
    const id = setInterval(() => setClock(fmt()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <a className="skip-link" href="#contenido">
        {t(d.skipLink)}
      </a>
      <div className="telemetry">
        <div className="telemetry__inner">
          <span className="telemetry__sysid">{d.systemId}</span>
          <span className="telemetry__sep" aria-hidden>
            {"//"}
          </span>
          <span className="telemetry__role">
            {t(d.role)} · {d.loc}
          </span>
          <span className="telemetry__spacer" />
          <span className="telemetry__clock" title="CET">
            <span className="font-mono">{clock}</span> CET
          </span>
          <span className="telemetry__sep" aria-hidden>
            ·
          </span>
          <span className="telemetry__avail">
            <span className="dot dot--accent dot-pulse" aria-hidden />
            {t(d.availability)}
          </span>
          <span className="lang-switch" role="group" aria-label={t(d.langLabel)}>
            {LOCALES.map((lc: Locale) => (
              <button
                key={lc}
                type="button"
                lang={lc}
                aria-label={LOCALE_FULL[lc]}
                aria-pressed={locale === lc}
                data-on={locale === lc}
                onClick={() => setLocale(lc)}
              >
                {lc.toUpperCase()}
              </button>
            ))}
          </span>
        </div>
      </div>
    </>
  );
}
