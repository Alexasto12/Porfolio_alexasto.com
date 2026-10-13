import { DATA } from "@/lib/content";
import { translator, type Locale } from "@/lib/i18n-types";
import { SectionHead } from "../ui/SectionHead";
import { ProjectCard } from "../ProjectCard";
import { LinkRow } from "../LinkRow";

/** "Now: Digital DesAny": what the studio does, for whom, and its cases. */
export function Now({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const d = DATA.now;
  return (
    <section id="ahora" className="sec now" data-surface="paper">
      <div className="shell">
        <SectionHead num={d.num} label={t(d.label)} heading={t(d.heading)} description={t(d.description)} />

        <h3 className="now__label meta">{t(d.servicesLabel)}</h3>
        <ol className="now__services grid">
          {d.services.map((s, i) => (
            <li key={i} className="now__service">
              <h4 className="h-item">{t(s.title)}</h4>
              {s.description && <p className="copy muted">{t(s.description)}</p>}
            </li>
          ))}
        </ol>
        <div className="now__own grid">
          <p className="copy muted">{t(d.ownership)}</p>
          <LinkRow links={d.links} locale={locale} />
        </div>

        <h3 className="now__label meta">{t(d.casesLabel)}</h3>
        <div className="now__cases">
          {d.cases.map((c) => (
            <ProjectCard key={c.id} card={c} locale={locale} level={4} />
          ))}
        </div>
      </div>
    </section>
  );
}
