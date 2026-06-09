"use client";

import { useI18n } from "@/lib/i18n";
import { DATA } from "@/lib/content";
import { Reveal } from "./ui/Reveal";
import { Scramble } from "./ui/Scramble";
import { RatingBar } from "./ui/RatingBar";

export function Hero() {
  const { t, locale } = useI18n();
  const d = DATA.hero;
  return (
    <section
      id="perfil"
      className="shell section"
      data-screen-label="Hero / 001"
      style={{ paddingTop: "clamp(40px,7vw,84px)", paddingBottom: "clamp(56px,9vw,120px)" }}
    >
      <Reveal
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          gap: "16px",
        }}
      >
        <span className="section__label">{t(d.label)}</span>
        <span className="mono-label" style={{ fontSize: "9.5px" }}>
          {t(d.hint)}
        </span>
      </Reveal>

      <h1
        className="font-display"
        style={{
          marginTop: "clamp(28px,5vw,56px)",
          fontWeight: 800,
          lineHeight: 0.84,
          letterSpacing: "-0.05em",
          fontSize: "clamp(3.6rem, 13vw, 12rem)",
        }}
      >
        <Reveal as="span" style={{ display: "block" }}>
          <Scramble key="fn" text={d.firstName} perChar={30} />
        </Reveal>
        <Reveal as="span" delay="1" style={{ display: "block", color: "var(--tw-accent)" }}>
          <Scramble key="ln" text={d.lastName} perChar={30} />
        </Reveal>
      </h1>

      <Reveal
        as="p"
        delay="2"
        key={`tag-${locale}`}
        className="font-display"
        style={{
          marginTop: "clamp(20px,3vw,34px)",
          fontWeight: 600,
          letterSpacing: "-0.02em",
          fontSize: "clamp(1.3rem,2.8vw,2rem)",
        }}
      >
        {t(d.tagline)}
      </Reveal>

      <div className="g4" style={{ marginTop: "clamp(34px,5vw,64px)" }}>
        {/* intro */}
        <Reveal className="col-2" delay="1" style={{ maxWidth: "50ch" }}>
          <div className="mono-label" style={{ marginBottom: "14px" }}>
            ↓ {t(d.contextLabel)}
          </div>
          <p
            key={`i1-${locale}`}
            style={{
              fontSize: "clamp(16px,1.5vw,19px)",
              lineHeight: 1.6,
              fontWeight: 500,
              textWrap: "pretty",
            }}
          >
            {t(d.intro)}
          </p>
          <p
            key={`i2-${locale}`}
            style={{
              marginTop: "18px",
              fontSize: "15px",
              lineHeight: 1.66,
              color: "var(--muted)",
              textWrap: "pretty",
            }}
          >
            {t(d.intro2)}
          </p>
        </Reveal>

        {/* status panel */}
        <Reveal
          className="col-2 panel"
          delay="2"
          style={{
            padding: "clamp(20px,2.4vw,30px)",
            display: "flex",
            flexDirection: "column",
            gap: "26px",
          }}
        >
          <div>
            <div className="mono-label" style={{ marginBottom: "14px" }}>
              ↳ {t(d.stackLabel)}
            </div>
            <ul
              className="font-mono"
              style={{ fontSize: "13px", display: "flex", flexDirection: "column", gap: "9px" }}
            >
              {d.stack.map((s) => (
                <li key={s.label} style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <span style={{ color: "var(--tw-accent)" }}>/</span>
                  <span style={{ color: s.w === "s" ? "var(--muted)" : "var(--ink)" }}>
                    {s.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ borderTop: "1px solid var(--line-strong)", paddingTop: "20px" }}>
            <div className="mono-label" style={{ marginBottom: "14px" }}>
              ↳ SELF · X/10
            </div>
            <ul style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {d.ratings.map((r) => (
                <li key={r.label.es} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <RatingBar value={r.value} />
                  <span
                    key={`${r.label.es}-${locale}`}
                    className="font-mono"
                    style={{ fontSize: "10.5px", textTransform: "uppercase", letterSpacing: "0.1em" }}
                  >
                    {t(r.label)}
                  </span>
                  <span
                    className="font-mono tabular"
                    style={{ marginLeft: "auto", color: "var(--tw-accent)", fontSize: "12px" }}
                  >
                    {r.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
