import { DATA } from "@/lib/content";
import { pick, translator, type Locale } from "@/lib/i18n-types";
import { ROUTES } from "@/lib/routes";
import { SectionHead } from "../ui/SectionHead";
import { ExtLink, LinkRow } from "../ui/Links";
import { CaseCard } from "../CaseCard";
import { Portrait } from "../Portrait";

/** The path in three stages, each with the milestones whose years fall in it. */
export function stagesOf() {
  const d = DATA.about;
  return d.stages.map((st) => ({
    ...st,
    entries: d.entries.filter((e) => Number(e.year) >= st.from && Number(e.year) <= st.to),
  }));
}

/**
 * About (paper): where it started, with my photo beside it, the path in
 * three stages (year, what, where), the stack in one sentence, and
 * education with open source. The full story is on its own page.
 */
export function About({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const d = DATA.about;
  return (
    <section id="sobre-mi" className="sec about" data-surface="paper" aria-labelledby="about-title">
      <div className="shell">
        <div className="about__intro grid">
          <div className="about__text">
            <SectionHead id="about-title" heading={t(d.heading)} />
            <p className="about__lead copy">{t(d.description)}</p>
            <p className="about__stack copy">{t(d.stack)}</p>
          </div>
          <Portrait locale={locale} className="about__photo" />
        </div>
        <ol className="stages grid">
          {stagesOf().map((st) => (
            <li key={st.from} className="stage">
              <h3 className="stage__name">{t(st.name)}</h3>
              <p className="stage__range data">
                {st.from}-{st.to}
              </p>
              <ol className="stage__items">
                {st.entries.map((e) => (
                  <li key={e.year} className="stage__item">
                    <span className="stage__year data">{e.year}</span>
                    <div>
                      <h4 className="stage__title">{t(e.title)}</h4>
                      <p className="stage__place">{t(e.place)}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ol>
        <h3 className="about__label">{t(d.educationLabel)}</h3>
        <div className="edu grid">
          <div className="edu__main">
            <CaseCard card={d.peer2stream} locale={locale} level={4} sizes="(max-width: 860px) 100vw, 600px" />
          </div>
          <div className="edu__side">
            <article id={d.pokedex.id} className="edu__item" aria-labelledby={`${d.pokedex.id}-name`}>
              <h4 id={`${d.pokedex.id}-name`} className="h-item">
                {d.pokedex.name}
              </h4>
              <p className="copy muted">{t(d.pokedex.description)}</p>
              <LinkRow links={d.pokedex.links} locale={locale} />
            </article>
            <div className="edu__item">
              <p className="copy muted">{t(d.wordpress.text)}</p>
              <ExtLink href={pick(d.wordpress.link.href, locale)} me>
                {pick(d.wordpress.link.label, locale)}
              </ExtLink>
            </div>
            <a href={ROUTES.about[locale]} className="more-link">
              {t(d.more)}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
