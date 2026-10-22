import { DATA } from "@/lib/content";
import { pick, translator, type Locale } from "@/lib/i18n-types";
import { ROUTES } from "@/lib/routes";
import { SectionHead } from "../ui/SectionHead";
import { ExtLink } from "../ui/Links";
import { CaseCard } from "../CaseCard";
import { VmvCapabilities, VmvFigures } from "../VmvBlocks";
import { NeibrFigure, StressBand } from "../NeibrBlocks";

/**
 * Experience (ink): VMV with its figures and what I built there, Neibr with
 * its diagram and the wine band of the stress test, and the GOK Thermal
 * freelance job. Each of the first two links to its own page.
 */
export function Experience({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const d = DATA.experience;
  return (
    <section id="experiencia" className="sec xp" data-surface="ink" aria-labelledby="xp-title">
      <div className="shell">
        <SectionHead id="xp-title" heading={t(d.heading)} description={t(d.description)} />
        <Vmv locale={locale} />
        <Neibr locale={locale} />
      </div>
      <StressBand locale={locale} />
      <div className="shell">
        <div className="xp__gok">
          <CaseCard card={d.gok} locale={locale} sizes="(max-width: 860px) 100vw, 560px" />
        </div>
      </div>
    </section>
  );
}

function Vmv({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const d = DATA.experience.vmv;
  return (
    <article id="vmv" className="xp-job vmv grid" aria-labelledby="vmv-title">
      <div className="xp-job__side">
        <h3 id="vmv-title" className="h-block">
          {d.client}
        </h3>
        <p className="xp-job__meta">
          {t(d.role)}, <span className="data">{d.range}</span>
        </p>
        <p className="copy">{t(d.intro)}</p>
        <VmvFigures locale={locale} />
      </div>
      <div className="xp-job__main">
        <h4 className="xp-job__label">{t(d.capabilitiesLabel)}</h4>
        <VmvCapabilities locale={locale} />
        <a href={ROUTES.vmv[locale]} className="more-link">
          {t(d.more)}
        </a>
      </div>
    </article>
  );
}

function Neibr({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const d = DATA.experience.neibr;
  return (
    <article id="neibr" className="xp-job neibr grid" aria-labelledby="neibr-title">
      <div className="xp-job__side">
        <h3 id="neibr-title" className="h-block">
          {d.title}
        </h3>
        <p className="xp-job__meta">{t(d.sub)}</p>
        <p className="lede">{t(d.tagline)}</p>
        <p className="copy">{t(d.what)}</p>
        <p className="copy muted">{t(d.role)}</p>
        <p className="neibr__award">{t(d.award)}</p>
        <h4 className="xp-job__label">{t(d.closureLabel)}</h4>
        <p className="copy muted">{t(d.closure)}</p>
        <p className="xp-job__links">
          <a href={ROUTES.neibr[locale]} className="more-link">
            {t(d.more)}
          </a>
          <ExtLink href={pick(d.caseLink.href, locale)}>
            <span className="sr-only">Neibr: </span>
            {pick(d.caseLink.label, locale)}
          </ExtLink>
          <ExtLink href={pick(d.site.href, locale)}>{pick(d.site.label, locale)}</ExtLink>
        </p>
      </div>
      <div className="xp-job__main">
        <NeibrFigure locale={locale} />
      </div>
    </article>
  );
}
