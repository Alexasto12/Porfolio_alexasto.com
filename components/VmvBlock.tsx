"use client";

import { useI18n } from "@/lib/i18n";
import { DATA } from "@/lib/content";
import { Reveal } from "./ui/Reveal";
import { Counter } from "./ui/Counter";

export function VmvBlock() {
  const { t, locale } = useI18n();
  const d = DATA.vmv;
  return (
    <section
      id="experiencia"
      className="shell section"
      data-screen-label="VMV / 003"
      style={{ paddingBottom: "clamp(40px,6vw,80px)" }}
    >
      <div style={{ borderTop: "1px solid var(--line-strong)", paddingTop: "18px" }}>
        <Reveal
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: "18px", flexWrap: "wrap" }}>
            <span className="section__num font-display">
              {d.num}
              <span className="dot-accent">.</span>
            </span>
            <span className="section__label">{t(d.label)}</span>
          </div>
          <span className="chip">
            {d.client} · {t(d.range)}
          </span>
        </Reveal>

        <Reveal delay="1" className="g4" style={{ marginTop: "clamp(24px,4vw,48px)", alignItems: "end" }}>
          <h2
            key={`vh-${locale}`}
            className="col-2 font-display"
            style={{
              fontWeight: 800,
              fontSize: "clamp(2rem,4.4vw,3.6rem)",
              lineHeight: 0.98,
              letterSpacing: "-0.03em",
              textWrap: "balance",
            }}
          >
            {t(d.heading)}
          </h2>
          <p
            key={`vi-${locale}`}
            className="col-2"
            style={{ color: "var(--muted)", fontSize: "14.5px", lineHeight: 1.62, textWrap: "pretty" }}
          >
            {t(d.intro)}
          </p>
        </Reveal>

        {/* stat counters */}
        <Reveal delay="1" className="g4" style={{ marginTop: "clamp(34px,5vw,60px)" }}>
          {d.stats.map((s, i) => (
            <div
              key={i}
              className={i === 2 ? "col-2" : "col-1"}
              style={{ borderTop: "2px solid var(--tw-accent)", paddingTop: "16px" }}
            >
              <div className="stat-value font-display" style={{ fontSize: "clamp(3rem,7vw,5.2rem)" }}>
                <Counter to={s.value} format={false} />
              </div>
              <div
                key={`sl-${locale}-${i}`}
                className="font-mono"
                style={{
                  marginTop: "10px",
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                  color: "var(--ink)",
                }}
              >
                {t(s.label)}
              </div>
              <div
                key={`scp-${locale}-${i}`}
                className="font-mono"
                style={{ marginTop: "4px", fontSize: "11px", color: "var(--muted-soft)" }}
              >
                {t(s.caption)}
              </div>
            </div>
          ))}
        </Reveal>

        {/* capabilities grid */}
        <div className="mono-label" style={{ marginTop: "clamp(40px,6vw,72px)", marginBottom: "18px" }}>
          ↳ {t(d.capabilitiesLabel)}
        </div>
        <div className="g4">
          {d.capabilities.map((c, i) => (
            <Reveal
              key={i}
              delay={String((i % 2) + 1)}
              className="col-2 panel card-tilt"
              style={{
                padding: "clamp(18px,2.2vw,26px)",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "12px",
                }}
              >
                <h3
                  key={`ct-${locale}-${i}`}
                  className="font-display"
                  style={{
                    fontWeight: 600,
                    fontSize: "clamp(1rem,1.5vw,1.2rem)",
                    letterSpacing: "-0.015em",
                    maxWidth: "26ch",
                  }}
                >
                  {t(c.title)}
                </h3>
                {c.badge && (
                  <span className="chip chip--accent" style={{ fontSize: "9px" }}>
                    {t(c.badge)}
                  </span>
                )}
              </div>
              <p
                key={`cd-${locale}-${i}`}
                style={{ color: "var(--muted)", fontSize: "13.5px", lineHeight: 1.6, textWrap: "pretty" }}
              >
                {t(c.description)}
              </p>
              {c.link && (
                <a
                  href={c.link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="link-row"
                  style={{ marginTop: "4px" }}
                >
                  <span className="link-row__bar" />
                  <span>{c.link.label}</span>
                </a>
              )}
            </Reveal>
          ))}
        </div>
      </div>

      {/* ticker */}
      <div className="ticker" style={{ marginTop: "clamp(40px,6vw,72px)" }}>
        <div className="ticker__track">
          {[0, 1].map((dup) => (
            <div key={dup} className="ticker__item" aria-hidden={dup === 1}>
              {d.ticker.map((w, i) => (
                <span key={i}>{w}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
