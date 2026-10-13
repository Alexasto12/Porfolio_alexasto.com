import { DATA } from "@/lib/content";
import { LOCALE_TAG, translator, type Locale } from "@/lib/i18n-types";
import { Counter } from "../ui/Counter";
import { Tags } from "../ui/Tags";
import { SectionHead } from "../ui/SectionHead";
import { ApiTerminal } from "../ApiTerminal";
import { BrowserFrame } from "../BrowserFrame";
import { LinkRow } from "../LinkRow";
import { ProjectCard } from "../ProjectCard";

/** Experience, "the engine room" (ink): VMV, Neibr (closed) and the GOK Thermal freelance job. */
export function Experience({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const d = DATA.experience;
  return (
    <section id="experiencia" className="sec xp" data-surface="ink">
      <div className="shell">
        <SectionHead num={d.num} label={t(d.label)} heading={t(d.heading)} description={t(d.description)} />
        <Vmv locale={locale} />
        <NeibrIntro locale={locale} />
      </div>
      <NeibrStress locale={locale} />
      <div className="shell">
        <NeibrApi locale={locale} />
        <ProjectCard card={d.gok} locale={locale} level={3} className="xp__gok" />
      </div>
    </section>
  );
}

function XpHeader({ title, chip }: { title: string; chip: string }) {
  return (
    <div className="xp__header">
      <h3 className="h-block">{title}</h3>
      <span className="meta">{chip}</span>
    </div>
  );
}

function Vmv({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const d = DATA.experience.vmv;
  return (
    <article className="vmv">
      <XpHeader title={d.client} chip={`${t(d.role)} · ${d.range}`} />
      <div className="vmv__intro grid">
        <p className="lede">{t(d.heading)}</p>
        <p className="copy muted">{t(d.intro)}</p>
      </div>
      <dl className="vmv__stats grid">
        {d.stats.map((s, i) => (
          <div key={i} className="vmv__stat">
            <dt className="meta">{t(s.label)}</dt>
            <dd className="vmv__value figure accent-lg">
              <Counter to={s.value} locale={LOCALE_TAG[locale]} />
            </dd>
            <dd className="data muted">{t(s.caption)}</dd>
          </div>
        ))}
      </dl>
      <h4 className="vmv__label meta">{t(d.capabilitiesLabel)}</h4>
      <ul className="vmv__caps grid">
        {d.capabilities.map((c, i) => (
          <li key={i} className="vmv__cap">
            <span className="vmv__cap-title">{t(c.title)}</span>
            {c.description && <span className="muted">{t(c.description)}</span>}
            {c.link && <LinkRow links={[c.link]} locale={locale} />}
          </li>
        ))}
      </ul>
      {/* Static on purpose: a band that never stops moving fails WCAG 2.2.2. */}
      <ul className="vmv__tech tags" aria-label={t(d.techLabel)}>
        {d.ticker.map((w, i) => (
          <li key={i}>{t(w)}</li>
        ))}
      </ul>
    </article>
  );
}

function NeibrIntro({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const d = DATA.experience.neibr;
  return (
    <article id="neibr" className="neibr" aria-labelledby="neibr-title">
      <div className="xp__header">
        <h3 id="neibr-title" className="h-block">
          {d.title}
        </h3>
        <span className="meta">{t(d.sub)}</span>
      </div>
      <div className="neibr__intro grid">
        <div className="neibr__story">
          <p className="lede">{t(d.tagline)}</p>
          <p className="copy">{t(d.what)}</p>
          <p className="copy muted">{t(d.role)}</p>
          <p className="copy muted">{t(d.tech)}</p>
          <Tags items={d.tags} className="neibr__tags" />
        </div>
        <div className="neibr__facts">
          <dl>
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
          <BrowserFrame id="neibr" alt={t(d.shotAlt)} sizes="(max-width: 860px) 100vw, 520px" />
        </div>
      </div>
    </article>
  );
}

/** Full-width wine band with the stress test figures. */
function NeibrStress({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const d = DATA.experience.neibr;
  return (
    <div className="stress" data-surface="wine">
      <div className="shell">
        <p className="meta">{t(d.stressLabel)}</p>
        <dl className="stress__grid">
          <div className="stress__item stress__item--main">
            <dt className="data">{t(d.stress.requestsLabel)}</dt>
            <dd className="stress__value figure">
              <Counter to={d.stress.requests} decimals={1} locale={LOCALE_TAG[locale]} />
            </dd>
          </div>
          {d.stress.facts.map((f, i) => (
            <div key={i} className="stress__item">
              <dt className="data">{t(f.label)}</dt>
              <dd className="stress__value figure">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

function NeibrApi({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const d = DATA.experience.neibr;
  return (
    <div className="neibr__api">
      <p className="meta">{t(d.endpointTitle)}</p>
      <ApiTerminal label={t(d.terminalLabel)} />
    </div>
  );
}
