import { DATA } from "@/lib/content";
import { translator, type Locale } from "@/lib/i18n-types";
import { Reveal } from "../ui/Reveal";
import { SectionHead } from "../ui/SectionHead";
import { ProjectCard } from "../ProjectCard";
import { LinkRow } from "../LinkRow";

export function Education({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const d = DATA.education;
  return (
    <section id="formacion" className="shell section" style={{ paddingBottom: "clamp(56px,9vw,110px)" }}>
      <SectionHead num={d.num} label={t(d.label)} heading={t(d.heading)} description={t(d.description)} />
      <div className="cards" style={{ marginTop: "clamp(30px,4vw,56px)" }}>
        {d.projects.map((p, i) => (
          <ProjectCard key={p.id} card={p} index={i} locale={locale} level={3} />
        ))}
      </div>
      <Reveal
        style={{
          marginTop: "clamp(26px,3.6vw,44px)",
          paddingTop: "18px",
          borderTop: "1px solid var(--line)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "baseline",
          gap: "4px 24px",
        }}
      >
        <p style={{ color: "var(--muted)", fontSize: "14.5px", lineHeight: 1.62, maxWidth: "60ch" }}>
          {t(d.wordpress.text)}
        </p>
        <LinkRow links={[d.wordpress.link]} locale={locale} />
      </Reveal>
    </section>
  );
}
