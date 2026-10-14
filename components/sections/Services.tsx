import { DATA, desany } from "@/lib/content";
import { pick, translator, type Locale } from "@/lib/i18n-types";
import { ROUTES } from "@/lib/routes";
import { SectionHead } from "../ui/SectionHead";
import { ExtLink } from "../ui/Links";
import { ContactButtons } from "../ui/ContactButtons";

/**
 * Services (paper): the studio's four lines, each with its example on this
 * page and its page at digitaldesany.com; who owns the code; and the first
 * direct contact, right where the offer is read.
 */
export function Services({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const d = DATA.services;
  return (
    <section id="servicios" className="sec services" data-surface="paper" aria-labelledby="services-title">
      <div className="shell">
        <SectionHead id="services-title" heading={t(d.heading)} description={t(d.description)} />
        <p className="services__own">{t(d.ownership)}</p>
        <ul className="services__grid grid">
          {d.items.map((s, i) => (
            <li key={i} className="service">
              <h3 className="h-item">{t(s.title)}</h3>
              <p className="copy muted">{t(s.text)}</p>
              {s.examples && (
                <p className="service__ex">
                  {t(d.examplesLabel)}:{" "}
                  {s.examples.map((ex, j) => (
                    <span key={ex.id}>
                      {j > 0 && ", "}
                      <a href={`#${ex.id}`} className="link">
                        {ex.label}
                      </a>
                    </span>
                  ))}
                </p>
              )}
              <p className="service__more">
                {s.page && (
                  <a href={ROUTES[s.page][locale]} className="link">
                    {t(d.pageLabel[s.page])}
                  </a>
                )}
                <ExtLink href={pick(s.more, locale)}>
                  <span className="sr-only">{t(s.title)}: </span>
                  {t(d.moreLabel)}
                </ExtLink>
              </p>
            </li>
          ))}
        </ul>
        <div className="cta-band">
          <p className="cta-band__line">{t(d.cta.line)}</p>
          <ContactButtons locale={locale} />
          <ExtLink href={pick(desany("", ""), locale)}>{t(d.cta.studio)}</ExtLink>
        </div>
      </div>
    </section>
  );
}
