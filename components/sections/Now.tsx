import { DATA } from "@/lib/content";
import { translator, type Locale } from "@/lib/i18n-types";
import { Reveal } from "../ui/Reveal";
import { SectionHead } from "../ui/SectionHead";
import { ProjectCard } from "../ProjectCard";
import { LinkRow } from "../LinkRow";

/** "Now: Digital DesAny": what the studio does, for whom, and its cases. */
export function Now({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const d = DATA.now;
  return (
    <section id="ahora" className="shell section" style={{ paddingBottom: "clamp(56px,9vw,110px)" }}>
      <SectionHead num={d.num} label={t(d.label)} heading={t(d.heading)} description={t(d.description)} />

      <Reveal as="h3" className="mono-label" style={{ marginTop: "clamp(34px,5vw,60px)", marginBottom: "18px" }}>
        {t(d.servicesLabel)}
      </Reveal>
      <div className="g4">
        {d.services.map((s, i) => (
          <Reveal
            key={i}
            delay={String((i % 2) + 1)}
            className="col-1 panel"
            style={{ padding: "clamp(18px,2.2vw,26px)", display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <span className="font-mono" style={{ fontSize: "11px", color: "var(--accent-text)" }} aria-hidden>
              {String(i + 1).padStart(2, "0")}
            </span>
            <h4
              className="font-display"
              style={{ fontWeight: 700, fontSize: "clamp(1.1rem,1.6vw,1.3rem)", letterSpacing: "-0.02em" }}
            >
              {t(s.title)}
            </h4>
            {s.description && (
              <p style={{ color: "var(--muted)", fontSize: "14px", lineHeight: 1.55, textWrap: "pretty" }}>
                {t(s.description)}
              </p>
            )}
          </Reveal>
        ))}
      </div>
      <Reveal className="g4" style={{ marginTop: "clamp(22px,3vw,32px)", alignItems: "start" }}>
        <p className="col-2" style={{ color: "var(--muted)", fontSize: "14.5px", lineHeight: 1.62, textWrap: "pretty" }}>
          {t(d.ownership)}
        </p>
        <div className="col-2">
          <LinkRow links={d.links} locale={locale} />
        </div>
      </Reveal>

      <Reveal as="h3" className="mono-label" style={{ marginTop: "clamp(40px,6vw,72px)", marginBottom: "18px" }}>
        {t(d.casesLabel)}
      </Reveal>
      <div className="cards">
        {d.cases.map((c, i) => (
          <ProjectCard key={c.id} card={c} index={i} locale={locale} level={4} />
        ))}
      </div>
    </section>
  );
}
