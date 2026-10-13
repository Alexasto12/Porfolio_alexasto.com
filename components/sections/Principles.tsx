import { DATA } from "@/lib/content";
import { translator, type Locale } from "@/lib/i18n-types";
import { Reveal } from "../ui/Reveal";
import { SectionHead } from "../ui/SectionHead";

export function Principles({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const d = DATA.principles;
  return (
    <section id="principios" className="shell section" style={{ paddingBottom: "clamp(56px,9vw,110px)" }}>
      <SectionHead num={d.num} label={t(d.label)} heading={t(d.heading)} description={t(d.description)} />
      <div className="g4" style={{ marginTop: "clamp(30px,4vw,56px)" }}>
        {d.items.map((p, i) => (
          <Reveal
            key={p.index}
            delay={String((i % 2) + 1)}
            className="col-2 panel"
            style={{ padding: "clamp(20px,2.4vw,30px)", display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <div style={{ display: "flex", alignItems: "baseline", gap: "14px" }}>
              <span
                className="font-display"
                aria-hidden
                style={{
                  color: "var(--tw-accent)",
                  fontWeight: 800,
                  fontSize: "clamp(1.6rem,2.6vw,2.2rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                }}
              >
                {p.index}
              </span>
              <h3
                className="font-display"
                style={{ fontWeight: 600, fontSize: "clamp(1.05rem,1.7vw,1.3rem)", letterSpacing: "-0.015em" }}
              >
                {t(p.title)}
              </h3>
            </div>
            <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.62, textWrap: "pretty" }}>{t(p.body)}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
