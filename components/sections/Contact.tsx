import { DATA } from "@/lib/content";
import { translator, type Locale } from "@/lib/i18n-types";
import { Reveal } from "../ui/Reveal";

export function Contact({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const d = DATA.contact;
  return (
    <section
      id="contacto"
      className="shell section"
      style={{ paddingTop: "clamp(20px,3vw,40px)", paddingBottom: "clamp(48px,7vw,90px)" }}
    >
      <div style={{ borderTop: "1px solid var(--line-strong)", paddingTop: "18px" }}>
        <Reveal style={{ display: "flex", alignItems: "baseline", gap: "18px" }}>
          <span className="section__num font-display" aria-hidden>
            {d.num}
            <span className="dot-accent">.</span>
          </span>
          <span className="section__label">{t(d.label)}</span>
        </Reveal>

        <Reveal
          as="h2"
          delay="1"
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

            <h3 className="mono-label" style={{ marginTop: "30px" }}>
              {t(d.work.label)}
            </h3>
            <p style={{ marginTop: "8px", fontSize: "15px", lineHeight: 1.6 }}>{t(d.work.note)}</p>
            <div style={{ marginTop: "18px", display: "flex", flexWrap: "wrap", gap: "14px", alignItems: "center" }}>
              <a href={`mailto:${d.work.email}`} className="cta-big">
                {t(d.work.cta)}
                <span className="arrow" aria-hidden>
                  ↗
                </span>
              </a>
              <a href={d.work.whatsapp.href} target="_blank" rel="noreferrer" className="cta-ghost">
                {d.work.whatsapp.label}
              </a>
            </div>
            <a href={`mailto:${d.work.email}`} className="contact-mail font-mono">
              {d.work.email}
            </a>

            <h3 className="mono-label" style={{ marginTop: "30px" }}>
              {t(d.personal.label)}
            </h3>
            <p style={{ marginTop: "8px", fontSize: "15px", lineHeight: 1.6 }}>{t(d.personal.note)}</p>
            <a href={`mailto:${d.personal.email}`} className="contact-mail font-mono">
              {d.personal.email}
            </a>
          </Reveal>

          <Reveal delay="1" className="col-2 start-3 panel" style={{ padding: "clamp(20px,2.4vw,30px)" }}>
            <h3 className="mono-label" style={{ marginBottom: "16px" }}>
              {t(d.channelsLabel)}
            </h3>
            <ul style={{ display: "flex", flexDirection: "column" }}>
              {d.links.map((ln, i) => (
                <li key={i}>
                  <a
                    href={t(ln.href)}
                    target="_blank"
                    rel="noreferrer"
                    className="link-cta"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "12px",
                      padding: "16px 0",
                      borderTop: i === 0 ? "none" : "1px solid var(--line)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "13px",
                      letterSpacing: "0.06em",
                    }}
                  >
                    <span>{t(ln.label)}</span>
                    <span style={{ color: "var(--accent-text)" }} aria-hidden>
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
