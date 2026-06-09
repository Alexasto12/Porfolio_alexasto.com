"use client";

import { useI18n } from "@/lib/i18n";
import { DATA } from "@/lib/content";
import { Reveal } from "./ui/Reveal";
import { SectionHead } from "./ui/SectionHead";

export function ServicesSection() {
  const { t, locale } = useI18n();
  const d = DATA.services;
  return (
    <section
      id="servicios"
      className="shell section"
      data-screen-label="Services / 005"
      style={{ paddingBottom: "clamp(56px,9vw,110px)" }}
    >
      <SectionHead num={d.num} label={d.label} heading={d.heading} description={d.description} />
      <div className="g4" style={{ marginTop: "clamp(30px,4vw,56px)" }}>
        {d.groups.map((g, i) => (
          <Reveal
            key={i}
            delay={String((i % 2) + 1)}
            className="col-2 panel"
            style={{ padding: "clamp(20px,2.4vw,30px)" }}
          >
            <h3
              key={`gt-${locale}-${i}`}
              className="font-display"
              style={{
                fontWeight: 700,
                fontSize: "clamp(1.1rem,1.8vw,1.4rem)",
                letterSpacing: "-0.02em",
                paddingBottom: "14px",
                marginBottom: "16px",
                borderBottom: "1px solid var(--line-strong)",
                display: "flex",
                alignItems: "baseline",
                gap: "10px",
              }}
            >
              <span style={{ color: "var(--tw-accent)", fontFamily: "var(--font-mono)", fontSize: "11px" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {t(g.group)}
            </h3>
            <ul style={{ display: "flex", flexDirection: "column", gap: "11px" }}>
              {g.items.map((it, j) => (
                <li
                  key={`${locale}-${j}`}
                  style={{
                    display: "flex",
                    gap: "11px",
                    alignItems: "flex-start",
                    fontSize: "14px",
                    lineHeight: 1.5,
                  }}
                >
                  <span
                    style={{
                      color: "var(--tw-accent)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "12px",
                      marginTop: "1px",
                    }}
                  >
                    +
                  </span>
                  <span>{t(it)}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
      <Reveal style={{ marginTop: "clamp(30px,4vw,52px)", display: "flex", justifyContent: "center" }}>
        <a href={d.cta.href} className="cta-big">
          {t(d.cta.label)}
        </a>
      </Reveal>
    </section>
  );
}
