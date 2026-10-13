import { DATA } from "@/lib/content";
import { translator, type Locale } from "@/lib/i18n-types";
import { Reveal } from "../ui/Reveal";
import { Scramble } from "../ui/Scramble";

export function Hero({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const d = DATA.hero;
  return (
    <section
      id="perfil"
      className="shell section"
      style={{ paddingTop: "clamp(40px,7vw,84px)", paddingBottom: "clamp(56px,9vw,120px)" }}
    >
      <Reveal style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "16px" }}>
        <span className="section__label">01 · {t(d.label)}</span>
        <span className="mono-label hover-only" aria-hidden>
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
          <Scramble text={d.firstName} perChar={30} />
        </Reveal>
        <Reveal as="span" delay="1" style={{ display: "block", color: "var(--tw-accent)" }}>
          <Scramble text={d.lastName} perChar={30} />
        </Reveal>
      </h1>

      <Reveal
        as="p"
        delay="2"
        className="font-display"
        style={{
          marginTop: "clamp(20px,3vw,34px)",
          fontWeight: 600,
          letterSpacing: "-0.02em",
          fontSize: "clamp(1.3rem,2.8vw,2rem)",
          lineHeight: 1.15,
          maxWidth: "34ch",
          textWrap: "balance",
        }}
      >
        {t(d.title)}
      </Reveal>

      <div className="g4" style={{ marginTop: "clamp(34px,5vw,64px)", alignItems: "start" }}>
        <Reveal className="col-2" delay="1" style={{ maxWidth: "50ch" }}>
          <p style={{ fontSize: "clamp(16px,1.5vw,19px)", lineHeight: 1.6, fontWeight: 500, textWrap: "pretty" }}>
            {t(d.line)}
          </p>
          <div style={{ marginTop: "28px", display: "flex", flexWrap: "wrap", gap: "14px", alignItems: "center" }}>
            <a href={d.ctaWork.href} className="cta-big">
              {t(d.ctaWork.label)}
              <span className="arrow" aria-hidden>
                ↓
              </span>
            </a>
            <a href={d.ctaTalk.href} className="cta-ghost">
              {t(d.ctaTalk.label)}
            </a>
          </div>
        </Reveal>

        <Reveal className="col-2 panel" delay="2" style={{ padding: "clamp(20px,2.4vw,30px)" }}>
          <div className="mono-label" style={{ marginBottom: "14px" }}>
            {t(d.stackLabel)}
          </div>
          <ul className="font-mono" style={{ fontSize: "13px", display: "flex", flexDirection: "column", gap: "9px" }}>
            {d.stack.map((s) => (
              <li key={s} style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                <span style={{ color: "var(--accent-text)" }} aria-hidden>
                  /
                </span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
