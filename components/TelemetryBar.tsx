"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { LOCALES, type Locale } from "@/lib/i18n-types";
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
    <div className="telemetry">
      <div className="telemetry__inner">
        <span className="telemetry__sysid">{d.systemId}</span>
        <span className="telemetry__sep">//</span>
        <span className="telemetry__role">
          {t(d.role)} · {d.loc}
        </span>
        <span className="telemetry__spacer" />
        <span className="telemetry__avail" title="CET">
          <span className="font-mono" style={{ color: "var(--muted-soft)" }}>
            {clock}
          </span>{" "}
          CET
        </span>
        <span className="telemetry__sep">·</span>
        <span className="telemetry__avail">
          <span className="dot dot--accent dot-pulse" />
          {t(d.availability)}
        </span>
        <span className="lang-switch" style={{ marginLeft: "6px" }}>
          {LOCALES.map((lc: Locale) => (
            <button
              key={lc}
              data-on={locale === lc}
              onClick={() => setLocale(lc)}
              style={locale === lc ? { background: "var(--tw-accent)", color: "#fff" } : undefined}
            >
              {lc.toUpperCase()}
            </button>
          ))}
        </span>
      </div>
    </div>
  );
}
