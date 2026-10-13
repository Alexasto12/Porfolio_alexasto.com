import { DATA } from "@/lib/content";
import { translator, type Locale } from "@/lib/i18n-types";
import { SectionHead } from "../ui/SectionHead";
import { ProjectCard } from "../ProjectCard";
import { LinkRow } from "../LinkRow";

export function Education({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const d = DATA.education;
  return (
    <section id="formacion" className="sec edu" data-surface="paper">
      <div className="shell">
        <SectionHead num={d.num} label={t(d.label)} heading={t(d.heading)} description={t(d.description)} />
        <div className="edu__projects">
          {d.projects.map((p) => (
            <ProjectCard key={p.id} card={p} locale={locale} level={3} />
          ))}
        </div>
        <div className="edu__wp">
          <p className="copy muted">{t(d.wordpress.text)}</p>
          <LinkRow links={[d.wordpress.link]} locale={locale} />
        </div>
      </div>
    </section>
  );
}
