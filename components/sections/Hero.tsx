import { DATA } from "@/lib/content";
import { translator, type Locale } from "@/lib/i18n-types";

/**
 * Hero (paper): the name and the trade in the h1, the offer, two calls to
 * action and a row of published figures, each linking to its story below.
 * No motion: the name is plain text, so nothing can shift the layout.
 */
export function Hero({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const d = DATA.hero;
  return (
    <section id="inicio" className="sec hero" data-surface="paper" aria-labelledby="hero-title">
      <div className="shell">
        <div className="hero__grid grid">
          <h1 id="hero-title" className="hero__title">
            <span className="hero__name">
              <span className="hero__first">{d.firstName}</span> <span className="hero__last">{d.lastName}</span>
            </span>{" "}
            <span className="hero__role">{t(d.role)}</span>
          </h1>
          <div className="hero__intro">
            <p className="hero__lead">{t(d.lead)}</p>
            <p className="hero__sub copy">{t(d.sub)}</p>
            <div className="hero__ctas">
              <a href="#contacto" className="btn btn--solid">
                {t(d.ctaPrimary)}
              </a>
              <a href="#trabajos" className="btn">
                {t(d.ctaWork)}
              </a>
            </div>
          </div>
        </div>
        <ul className="proof grid" aria-label={t(d.proofLabel)}>
          {d.proof.map((p, i) => (
            <li key={i} className="proof__item">
              <a href={`#${p.href}`} className="proof__link">
                <span className="proof__value">{t(p.value)}</span>
                <span className="proof__text">{t(p.text)}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
