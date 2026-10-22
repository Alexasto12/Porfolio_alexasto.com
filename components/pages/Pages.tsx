import { CONTACT, DATA } from "@/lib/content";
import { pick, translator, type Locale } from "@/lib/i18n-types";
import { PAGES } from "@/lib/pages";
import { ROUTES, type PageKey } from "@/lib/routes";
import { SubPage, PageHead, PageSection, ProjectItem } from "./PageParts";
import { CaseCard } from "../CaseCard";
import { BrowserFrame } from "../BrowserFrame";
import { Portrait } from "../Portrait";
import { ExtLink, LinkRow } from "../ui/Links";
import { VmvCapabilities, VmvFigures } from "../VmvBlocks";
import { NeibrFigure, StressBand } from "../NeibrBlocks";
import { ProcessList } from "../sections/Process";
import { stagesOf } from "../sections/About";

const SIZES_HALF = "(max-width: 860px) 100vw, 640px";

/** Every piece of work, grouped, with one sentence of fact each. */
function ProjectsPage({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const p = PAGES.projects;
  const xp = DATA.experience;
  const ab = DATA.about;
  return (
    <SubPage locale={locale} page="projects">
      <PageHead locale={locale} page="projects" title={t(p.h1)} lede={t(p.lede)} />
      <PageSection id="digital-desany" title={t(p.groups.desany)}>
        <div className="work__grid">
          {DATA.work.cases.map((c) => (
            <CaseCard key={c.id} card={c} locale={locale} sizes={SIZES_HALF} />
          ))}
        </div>
        <p className="page-sec__more">
          <ExtLink href={pick(DATA.work.allCases.href, locale)}>{pick(DATA.work.allCases.label, locale)}</ExtLink>
        </p>
      </PageSection>
      <PageSection id="backend" title={t(p.groups.backend)}>
        <div className="work__grid">
          <ProjectItem
            id="neibr"
            name={xp.neibr.title}
            text={`${t(xp.neibr.tagline)} ${t(xp.neibr.what)} ${t(xp.neibr.award)}`}
            page="neibr"
            pageLabel={t(xp.neibr.more)}
            locale={locale}
          >
            <ExtLink href={pick(xp.neibr.caseLink.href, locale)}>
              <span className="sr-only">Neibr: </span>
              {pick(xp.neibr.caseLink.label, locale)}
            </ExtLink>
            <ExtLink href={pick(xp.neibr.site.href, locale)}>{pick(xp.neibr.site.label, locale)}</ExtLink>
          </ProjectItem>
          <ProjectItem id="vmv" name={xp.vmv.client} text={t(xp.vmv.intro)} page="vmv" pageLabel={t(xp.vmv.more)} locale={locale} />
        </div>
      </PageSection>
      <PageSection id="freelance" title={t(p.groups.freelance)}>
        <div className="work__grid">
          <CaseCard card={xp.gok} locale={locale} sizes={SIZES_HALF} />
        </div>
      </PageSection>
      <PageSection id="formacion" title={t(p.groups.learning)}>
        <div className="work__grid">
          <CaseCard card={ab.peer2stream} locale={locale} sizes={SIZES_HALF} />
          <div className="work__stack">
            <CaseCard card={ab.pokedex} locale={locale} />
            <ProjectItem id="wordpress" name={p.wordpressName} text={t(ab.wordpress.text)} locale={locale}>
              <ExtLink href={pick(ab.wordpress.link.href, locale)} me>
                {pick(ab.wordpress.link.label, locale)}
              </ExtLink>
            </ProjectItem>
          </div>
        </div>
      </PageSection>
    </SubPage>
  );
}

/** Neibr, the whole backend story. */
function NeibrPage({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const p = PAGES.neibr;
  const d = DATA.experience.neibr;
  return (
    <SubPage locale={locale} page="neibr">
      <PageHead locale={locale} page="neibr" title={t(p.h1)} meta={t(d.sub)} lede={`${t(d.tagline)} ${t(d.what)}`}>
        <p className="page-head__note">{t(d.award)}</p>
      </PageHead>
      <PageSection id="mi-parte" title={t(p.sections.role)}>
        <div className="page-split grid">
          <div className="page-split__text">
            <p className="copy">{t(d.role)}</p>
            <p className="xp-job__links">
              <ExtLink href={pick(d.caseLink.href, locale)}>
                <span className="sr-only">Neibr: </span>
                {pick(d.caseLink.label, locale)}
              </ExtLink>
              <ExtLink href={pick(d.site.href, locale)}>{pick(d.site.label, locale)}</ExtLink>
            </p>
          </div>
          <div className="page-split__media">
            <BrowserFrame id="neibr" alt={t(d.shotAlt)} sizes={SIZES_HALF} />
          </div>
        </div>
      </PageSection>
      <PageSection id="asignacion" title={t(p.sections.assignment)}>
        <div className="page-split grid">
          <div className="page-split__text">
            <p className="copy">{t(d.assignment)}</p>
            <p className="copy muted">{t(d.stack)}</p>
          </div>
          <div className="page-split__media">
            <NeibrFigure locale={locale} />
          </div>
        </div>
      </PageSection>
      <PageSection id="seguridad" title={t(p.sections.security)}>
        <p className="copy">{t(d.security)}</p>
      </PageSection>
      <StressBand locale={locale} headingLevel={2} />
      <PageSection id="cierre" title={t(d.closureLabel)}>
        <p className="copy">{t(d.closure)}</p>
      </PageSection>
    </SubPage>
  );
}

/** VMV Cosmetic Group: scale and capabilities only. */
function VmvPage({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const p = PAGES.vmv;
  const d = DATA.experience.vmv;
  const vmvEntry = DATA.about.entries.find((e) => e.year === "2025")!;
  return (
    <SubPage locale={locale} page="vmv">
      <PageHead
        locale={locale}
        page="vmv"
        title={t(p.h1)}
        meta={<span className="data">{d.range}</span>}
        lede={t(d.intro)}
      />
      <PageSection id="cifras" title={t(p.sections.figures)}>
        <VmvFigures locale={locale} />
      </PageSection>
      <PageSection id="lo-que-hice" title={t(p.sections.built)}>
        <p className="copy page-sec__intro">{t(vmvEntry.body)}</p>
        <VmvCapabilities locale={locale} level={3} />
      </PageSection>
      <PageSection id="tecnologias" title={t(p.sections.tech)}>
        <p className="copy">{t(p.tech)}</p>
      </PageSection>
    </SubPage>
  );
}

/** About me: the full path, education, how I work and where to find me. */
function AboutPage({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const p = PAGES.about;
  const d = DATA.about;
  return (
    <SubPage locale={locale} page="about">
      <PageHead
        locale={locale}
        page="about"
        title={t(p.h1)}
        lede={t(p.lede)}
        aside={<Portrait locale={locale} className="page-head__photo" priority />}
      >
        <p className="copy page-head__extra">{t(d.stack)}</p>
      </PageHead>
      <PageSection id="recorrido" title={t(p.sections.path)}>
        <ol className="stages stages--full grid">
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
                      <p className="stage__body">{t(e.body)}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ol>
      </PageSection>
      <PageSection id="formacion" title={t(p.sections.education)}>
        <div className="work__grid">
          <CaseCard card={d.peer2stream} locale={locale} sizes={SIZES_HALF} />
          <div className="work__stack">
            <CaseCard card={d.pokedex} locale={locale} />
            <ProjectItem id="wordpress" name={PAGES.projects.wordpressName} text={t(d.wordpress.text)} locale={locale}>
              <ExtLink href={pick(d.wordpress.link.href, locale)} me>
                {pick(d.wordpress.link.label, locale)}
              </ExtLink>
            </ProjectItem>
          </div>
        </div>
      </PageSection>
      <PageSection id="como-trabajo" title={t(p.sections.process)} surface="ink">
        <ProcessList locale={locale} />
      </PageSection>
      <PageSection id="perfiles" title={t(p.sections.profiles)}>
        <ul className="links links--big">
          {CONTACT.profiles.map((pr) => (
            <li key={pr.href}>
              <ExtLink href={pr.href} me>
                {pr.label}
              </ExtLink>
            </li>
          ))}
          <li>
            <a href={`mailto:${CONTACT.personalEmail}`} className="link">
              {CONTACT.personalEmail}
            </a>
          </li>
        </ul>
      </PageSection>
    </SubPage>
  );
}

/** Backend and APIs: the systems that prove it, in one place for that search. */
function BackendPage({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const p = PAGES.backend;
  const n = DATA.experience.neibr;
  const v = DATA.experience.vmv;
  const at = DATA.about.entries.find((e) => e.year === "2024")!;
  return (
    <SubPage locale={locale} page="backend">
      <PageHead locale={locale} page="backend" title={t(p.h1)} lede={t(p.lede)} />
      <PageSection id="neibr" title={t(p.sections.neibr)}>
        <div className="page-split grid">
          <div className="page-split__text">
            <p className="copy">{t(n.what)}</p>
            <p className="copy">
              {t(n.stack)} {t(n.assignment)}
            </p>
            <p className="copy">{t(n.security)}</p>
            <p className="copy">{t(n.stressSentence)}</p>
            <a href={ROUTES.neibr[locale]} className="more-link">
              {t(n.more)}
            </a>
          </div>
          <div className="page-split__media">
            <NeibrFigure locale={locale} />
          </div>
        </div>
      </PageSection>
      <PageSection id="vmv" title={t(p.sections.vmv)}>
        <p className="copy page-sec__intro">{t(v.intro)}</p>
        <VmvCapabilities locale={locale} level={3} />
        <a href={ROUTES.vmv[locale]} className="more-link">
          {t(v.more)}
        </a>
      </PageSection>
      <PageSection id="pagos" title={t(p.sections.hardware)}>
        {/* The title says it was a collaboration at Automated Transactions, not his alone. */}
        <p className="copy">
          {t(at.title)} {t(at.body)}
        </p>
      </PageSection>
      <PageSection id="como-trabajo" title={t(p.sections.process)} surface="ink">
        <ProcessList locale={locale} />
      </PageSection>
      <PageSection id="tecnologias" title={t(p.sections.tech)}>
        <p className="copy">{t(DATA.about.stack)}</p>
        <p className="page-sec__more">
          <ExtLink href={pick(p.service, locale)}>{t(p.serviceLabel)}</ExtLink>
        </p>
      </PageSection>
    </SubPage>
  );
}

/** Custom websites with Next.js and WordPress: the published sites and how they are made. */
function WebPage({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const p = PAGES.web;
  const cases = [...DATA.work.cases.filter((c) => c.shot), DATA.experience.gok];
  return (
    <SubPage locale={locale} page="web">
      <PageHead locale={locale} page="web" title={t(p.h1)} lede={t(p.lede)}>
        <p className="copy page-head__extra">{t(DATA.services.ownership)}</p>
      </PageHead>
      <PageSection id="webs" title={t(p.sections.cases)}>
        <div className="work__grid">
          {cases.map((c) => (
            <CaseCard key={c.id} card={c} locale={locale} sizes={SIZES_HALF} />
          ))}
        </div>
      </PageSection>
      <PageSection id="nextjs" title={t(p.sections.nextjs)}>
        <p className="copy">{t(p.nextjs)}</p>
      </PageSection>
      <PageSection id="wordpress" title={t(p.sections.wordpress)}>
        <p className="copy">{t(p.wordpress)}</p>
        <p className="page-sec__more">
          <ExtLink href={pick(DATA.about.wordpress.link.href, locale)} me>
            {pick(DATA.about.wordpress.link.label, locale)}
          </ExtLink>
        </p>
      </PageSection>
      <PageSection id="partes" title={t(p.sections.parts)}>
        <p className="copy page-sec__intro">{t(p.partsNote)}</p>
        <LinkRow links={p.parts} locale={locale} className="links--big" />
      </PageSection>
    </SubPage>
  );
}

const PAGE_COMPONENTS: Record<Exclude<PageKey, "home">, (props: { locale: Locale }) => React.ReactElement> = {
  projects: ProjectsPage,
  neibr: NeibrPage,
  vmv: VmvPage,
  about: AboutPage,
  backend: BackendPage,
  web: WebPage,
};

/** The subpage for a key, in one locale. */
export function SubPageFor({ page, locale }: { page: Exclude<PageKey, "home">; locale: Locale }) {
  const Page = PAGE_COMPONENTS[page];
  return <Page locale={locale} />;
}
