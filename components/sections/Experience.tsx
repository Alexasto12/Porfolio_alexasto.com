import { DATA } from "@/lib/content";
import { LOCALE_TAG, translator, type Locale } from "@/lib/i18n-types";
import { Counter } from "../ui/Counter";
import { Tags } from "../ui/Tags";
import { SectionHead } from "../ui/SectionHead";
import { ApiTerminal } from "../ApiTerminal";
import { BrowserFrame } from "../BrowserFrame";
import { LinkRow } from "../LinkRow";
import { NeibrDiagram } from "../NeibrDiagram";
import { VmvMap } from "../VmvMap";

/**
 * Experience, "the engine room" (ink): VMV with its system map, Neibr as a
 * case study (diagram, wine band with the stress test, terminal) and the
 * GOK Thermal freelance job.
 */
export function Experience({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const d = DATA.experience;
  return (
    <section id="experiencia" className="sec xp" data-surface="ink">
      <div className="shell">
        <SectionHead num={d.num} label={t(d.label)} heading={t(d.heading)} description={t(d.description)} className="xp__head sec-head--split" />
        <Vmv locale={locale} />
        <NeibrIntro locale={locale} />
      </div>
      <NeibrStress locale={locale} />
      <div className="shell">
        <Gok locale={locale} />
      </div>
    </section>
  );
}

function Vmv({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const d = DATA.experience.vmv;
  return (
    <article className="vmv grid" aria-labelledby="vmv-title">
      {/* Fixed while the map and its legend scroll past. */}
      <div className="vmv__aside">
        <h3 id="vmv-title" className="h-block">
          {d.client}
        </h3>
        <p className="vmv__role meta">
          {t(d.role)} · {d.range}
        </p>
        <p className="vmv__lede lede">{t(d.heading)}</p>
        <p className="vmv__intro copy muted">{t(d.intro)}</p>
        <dl className="vmv__stats">
          {d.stats.map((s, i) => (
            <div key={i} className="vmv__stat">
              <dt className="vmv__stat-label">
                <span>{t(s.label)}</span>
                <span className="muted">{t(s.caption)}</span>
              </dt>
              <dd className="vmv__value figure accent-lg">
                <Counter to={s.value} locale={LOCALE_TAG[locale]} />
              </dd>
            </div>
          ))}
        </dl>
        {/* Static on purpose: a band that never stops moving fails WCAG 2.2.2. */}
        <ul className="vmv__tech tags" aria-label={t(d.techLabel)}>
          {d.ticker.map((w, i) => (
            <li key={i}>{t(w)}</li>
          ))}
        </ul>
      </div>
      <div className="vmv__main">
        <VmvMap locale={locale} legendId="vmv-legend" />
        <h4 className="vmv__label meta">{t(d.capabilitiesLabel)}</h4>
        <dl id="vmv-legend" className="legend">
          {d.capabilities.map((c, i) => (
            <div key={i} className="legend__item">
              <dt className="legend__node data">{c.node ? t(d.mapNodes[c.node]) : ""}</dt>
              <dd className="legend__text">
                <span>{t(c.title)}</span>
                {c.link && (
                  <a href={t(c.link.href)} target="_blank" rel="noreferrer" className="link-data legend__link">
                    <span>{t(c.link.label)}</span>
                    <span className="link-data__arrow" aria-hidden>
                      ↗
                    </span>
                  </a>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}

function NeibrIntro({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const d = DATA.experience.neibr;
  return (
    <article id="neibr" className="neibr" aria-labelledby="neibr-title">
      <div className="neibr__intro grid">
        <div className="neibr__story">
          <div className="neibr__head">
            <h3 id="neibr-title" className="h-block">
              {d.title}
            </h3>
            <span className="meta">{t(d.sub)}</span>
          </div>
          <p className="lede">{t(d.tagline)}</p>
          <p className="copy">{t(d.what)}</p>
          <p className="copy muted">{t(d.role)}</p>
          <dl className="neibr__facts">
            <div>
              <dt className="meta">{t(d.awardLabel)}</dt>
              <dd className="copy">{t(d.award)}</dd>
            </div>
            <div>
              <dt className="meta">{t(d.closureLabel)}</dt>
              <dd className="copy muted">{t(d.closure)}</dd>
            </div>
          </dl>
          <LinkRow links={d.links} locale={locale} />
        </div>
        <div className="neibr__diagram">
          <NeibrDiagram title={t(d.diagram.title)} note={t(d.diagram.note)} steps={d.diagram.steps.map((s) => t(s))} />
        </div>
      </div>
    </article>
  );
}

/**
 * Full-width wine band: the stress test figures and, next to them, the
 * request that the API answered at that rate.
 */
function NeibrStress({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const d = DATA.experience.neibr;
  const tag = LOCALE_TAG[locale];
  return (
    <div className="stress" data-surface="wine">
      <div className="shell stress__grid grid">
        <section className="stress__figures" aria-labelledby="stress-title">
          <h4 id="stress-title" className="meta">
            Neibr · {t(d.stressLabel)}
          </h4>
          <dl className="stress__list">
            <div className="stress__item stress__item--main">
              <dt className="stress__label">{t(d.stress.requestsLabel)}</dt>
              <dd className="stress__value figure">
                <Counter to={d.stress.requests} decimals={1} locale={tag} />
              </dd>
            </div>
            {d.stress.facts.map((f, i) => (
              <div key={i} className="stress__item">
                <dt className="stress__label">{t(f.label)}</dt>
                <dd className="stress__value figure">
                  <Counter to={f.value} prefix={f.prefix} suffix={f.suffix} locale={tag} />
                </dd>
              </div>
            ))}
          </dl>
          <p className="stress__stack">
            {t(d.stack)} {t(d.security)}
          </p>
        </section>
        <div className="stress__terminal">
          <ApiTerminal title={t(d.endpointTitle)} label={t(d.terminalLabel)} />
        </div>
      </div>
    </div>
  );
}

/** GOK Thermal: a freelance job of my own, on the same ink surface. */
function Gok({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const g = DATA.experience.gok;
  return (
    <article id={g.id} className="gok grid" aria-labelledby="gok-title">
      <BrowserFrame id={g.id} alt={t(g.shot!.alt)} sizes="(max-width: 860px) 100vw, 400px" className="gok__frame" />
      <div className="gok__body">
        <p className="gok__chip">{t(g.sub!)}</p>
        <h3 id="gok-title" className="h-block">
          {g.name}
        </h3>
        <p className="copy muted">{t(g.description)}</p>
        <Tags items={g.tags} />
        <LinkRow links={g.links} locale={locale} />
      </div>
    </article>
  );
}
