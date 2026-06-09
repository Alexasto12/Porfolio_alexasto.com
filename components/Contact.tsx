"use client";

import { useI18n } from "@/lib/i18n";
import { DATA } from "@/lib/content";
import { Reveal } from "./ui/Reveal";

export function Contact() {
  const { t, locale } = useI18n();
  const d = DATA.contact;
  return (
    <section
      id="contacto"
      className="shell section"
      data-screen-label="Contact / 009"
      style={{ paddingTop: "clamp(20px,3vw,40px)", paddingBottom: "clamp(56px,8vw,100px)" }}
    >
      <div style={{ borderTop: "1px solid var(--line-strong)", paddingTop: "18px" }}>
        <Reveal style={{ display: "flex", alignItems: "baseline", gap: "18px" }}>
          <span className="section__num font-display">
            {d.num}
            <span className="dot-accent">.</span>
          </span>
          <span className="section__label">{t(d.label)}</span>
        </Reveal>

        <Reveal
          as="h2"
          delay="1"
          key={`ch-${locale}`}
          className="font-display"
          style={{
            marginTop: "clamp(28px,5vw,56px)",
            fontWeight: 800,
            lineHeight: 0.92,
            letterSpacing: "-0.04em",
            fontSize: "clamp(2.8rem,8vw,7rem)",
            textWrap: "balance",
          }}
        >
          {t(d.heading)} <span style={{ color: "var(--tw-accent)" }}>{t(d.headingAccent)}</span>
        </Reveal>

        <div className="g4" style={{ marginTop: "clamp(34px,5vw,56px)", alignItems: "start" }}>
          <Reveal className="col-2">
            <p
              key={`cb-${locale}`}
              style={{
                fontSize: "clamp(15px,1.5vw,18px)",
                lineHeight: 1.62,
                color: "var(--muted)",
                maxWidth: "44ch",
                textWrap: "pretty",
              }}
            >
              {t(d.body)}
            </p>
            <div
              style={{
                marginTop: "28px",
                display: "flex",
                flexWrap: "wrap",
                gap: "16px",
                alignItems: "center",
              }}
            >
              <a href={d.cta.href} className="cta-big">
                {t(d.cta.label)}
                <span className="arrow">↗</span>
              </a>
              <span className="chip chip--accent">
                <span className="dot dot--accent dot-pulse" />
                {t(d.respLabel)}
              </span>
            </div>
            <a
              href={`mailto:${d.email}`}
              className="font-mono"
              style={{
                display: "inline-block",
                marginTop: "22px",
                fontSize: "13px",
                color: "var(--muted)",
                letterSpacing: "0.04em",
              }}
            >
              {d.email}
            </a>
          </Reveal>

          <Reveal delay="1" className="col-2 start-3 panel" style={{ padding: "clamp(20px,2.4vw,30px)" }}>
            <div className="mono-label" style={{ marginBottom: "16px" }}>
              ↳ CANALES
            </div>
            <ul style={{ display: "flex", flexDirection: "column" }}>
              {d.links.map((ln, i) => (
                <li key={i}>
                  <a
                    href={ln.href}
                    target="_blank"
                    rel="noreferrer"
                    className="link-cta"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "16px 0",
                      borderTop: i === 0 ? "none" : "1px solid var(--line)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "13px",
                      letterSpacing: "0.1em",
                    }}
                  >
                    <span>{ln.label}</span>
                    <span style={{ color: "var(--tw-accent)" }}>↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal
          style={{
            marginTop: "clamp(48px,7vw,90px)",
            borderTop: "1px solid var(--line)",
            paddingTop: "22px",
            display: "flex",
            justifyContent: "space-between",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <p
            key={`fn-${locale}`}
            className="font-mono"
            style={{
              fontSize: "11px",
              color: "var(--muted-soft)",
              letterSpacing: "0.04em",
              maxWidth: "52ch",
              lineHeight: 1.5,
            }}
          >
            {t(d.footerNote)}
          </p>
          <p
            className="font-mono"
            style={{
              fontSize: "11px",
              color: "var(--muted-faint)",
              letterSpacing: "0.1em",
              whiteSpace: "nowrap",
            }}
          >
            © 2026 · AC_SYSTEMS
          </p>
        </Reveal>
      </div>
    </section>
  );
}
