"use client";

import { useI18n } from "@/lib/i18n";
import { DATA } from "@/lib/content";
import { Reveal } from "./ui/Reveal";
import { Counter } from "./ui/Counter";
import { Bars } from "./ui/Bars";
import { Tags } from "./ui/Tags";
import { ApiTerminal } from "./ApiTerminal";

export function NeibrFeature() {
  const { t, locale } = useI18n();
  const d = DATA.neibr;
  return (
    <section
      id="neibr"
      className="shell section"
      data-screen-label="Neibr / flagship"
      style={{ paddingTop: "clamp(20px,3vw,40px)", paddingBottom: "clamp(56px,9vw,120px)" }}
    >
      <div style={{ borderTop: "1px solid var(--line-strong)", paddingTop: "clamp(28px,4vw,52px)" }}>
        <Reveal style={{ display: "flex", gap: "14px", alignItems: "center", flexWrap: "wrap" }}>
          <span className="section__label">★ {t(d.label)}</span>
          <span className="chip chip--accent">{t(d.productLabel)}</span>
        </Reveal>

        {/* title row */}
        <Reveal
          delay="1"
          className="g4"
          style={{ marginTop: "clamp(26px,4vw,48px)", alignItems: "end" }}
        >
          <h2
            className="col-3 font-display"
            style={{
              fontWeight: 800,
              lineHeight: 0.86,
              letterSpacing: "-0.045em",
              fontSize: "clamp(3.4rem,11vw,9rem)",
            }}
          >
            {d.title}
            <span style={{ color: "var(--tw-accent)" }}>.</span>
          </h2>
          <p
            key={`ntag-${locale}`}
            className="col-1 font-display"
            style={{
              fontWeight: 500,
              color: "var(--tw-accent)",
              fontSize: "clamp(1.1rem,2vw,1.5rem)",
              textAlign: "right",
              lineHeight: 1.1,
            }}
          >
            {t(d.tagline)}
          </p>
        </Reveal>

        {/* terminal + endpoint */}
        <div className="g4" style={{ marginTop: "clamp(28px,4vw,52px)", alignItems: "start" }}>
          <Reveal className="col-1">
            <div className="mono-label">↳ {t(d.endpointLabel)}</div>
            <div
              key={`ep-${locale}`}
              className="font-display"
              style={{
                marginTop: "8px",
                fontWeight: 600,
                letterSpacing: "-0.01em",
                fontSize: "clamp(1.05rem,1.7vw,1.25rem)",
                lineHeight: 1.22,
              }}
            >
              {t(d.endpointTitle)}
            </div>
          </Reveal>
          <Reveal delay="1" className="col-3">
            <ApiTerminal />
          </Reveal>
        </div>

        {/* description + stat */}
        <div className="g4" style={{ marginTop: "clamp(40px,6vw,80px)", alignItems: "start" }}>
          <Reveal className="col-2">
            <p
              key={`nd-${locale}`}
              style={{
                fontSize: "clamp(15px,1.4vw,17px)",
                lineHeight: 1.62,
                fontWeight: 500,
                maxWidth: "48ch",
                textWrap: "pretty",
              }}
            >
              {t(d.description)}
            </p>
            <p
              key={`nd2-${locale}`}
              style={{
                marginTop: "18px",
                fontSize: "14.5px",
                lineHeight: 1.64,
                color: "var(--muted)",
                maxWidth: "48ch",
                textWrap: "pretty",
              }}
            >
              {t(d.description2)}
            </p>
            <div className="mono-label" style={{ marginTop: "26px", marginBottom: "12px" }}>
              ↳ {t(d.conceptsLabel)}
            </div>
            <ul
              className="font-mono"
              style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "12.5px" }}
            >
              {d.concepts.map((c, i) => (
                <li key={`${i}-${locale}`} style={{ display: "flex", gap: "10px" }}>
                  <span style={{ color: "var(--tw-accent)" }}>→</span>
                  <span>{t(c)}</span>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: "16px" }}>
              <Tags items={d.tags} />
            </div>
            <p
              key={`nsep-${locale}`}
              style={{
                marginTop: "22px",
                fontSize: "13px",
                lineHeight: 1.6,
                fontStyle: "italic",
                color: "var(--muted)",
                maxWidth: "48ch",
              }}
            >
              ↘ {t(d.sepNote)}
            </p>
          </Reveal>

          {/* stat panel */}
          <Reveal
            delay="1"
            className="col-2 panel card-tilt"
            style={{ padding: "clamp(22px,2.6vw,32px)", display: "flex", flexDirection: "column" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="mono-label">{t(d.outputLabel)}</span>
              <span
                className="font-mono"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  color: "var(--tw-accent)",
                }}
              >
                <span className="dot dot--accent dot-pulse" />
                PASSED
              </span>
            </div>
            <div
              style={{
                marginTop: "18px",
                display: "flex",
                alignItems: "baseline",
                gap: "12px",
                flexWrap: "wrap",
              }}
            >
              <span className="stat-value" style={{ fontSize: "clamp(3rem,8vw,6rem)" }}>
                <Counter to={d.stat.value} />
              </span>
              <span className="mono-label">{t(d.stat.valueLabel)}</span>
            </div>
            <div style={{ marginTop: "6px", display: "flex", alignItems: "baseline", gap: "12px" }}>
              <span className="font-display" style={{ fontWeight: 600, fontSize: "clamp(1.4rem,3vw,2rem)" }}>
                {d.stat.duration}
              </span>
              <span className="mono-label">{t(d.stat.durationLabel)}</span>
            </div>
            <p
              key={`sc-${locale}`}
              style={{ marginTop: "18px", fontSize: "13px", lineHeight: 1.6, color: "var(--muted)" }}
            >
              {t(d.stat.caption)}
            </p>
            <div style={{ marginTop: "22px", paddingTop: "22px", borderTop: "1px solid var(--line)" }}>
              <Bars count={36} seed={11} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
