import { DATA } from "@/lib/content";
import { pick, translator, type Locale } from "@/lib/i18n-types";
import { Scramble } from "../ui/Scramble";
import { LocalTime } from "../ui/LocalTime";
import { ContactSheet } from "../ContactSheet";

/**
 * Hero (paper): the name over 8 of the 12 columns, a "right now" panel in the
 * other 4, the title and line, two calls to action and the contact sheet.
 */
export function Hero({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const d = DATA.hero;
  return (
    <section id="perfil" className="sec hero" data-surface="paper">
      <div className="shell">
        <div className="hero__grid grid">
          <h1 className="hero__name">
            <Scramble text={d.firstName} className="hero__first" />
            <Scramble text={d.lastName} offset={d.firstName.length} className="hero__last" />
          </h1>

          <aside className="hero__now hero__after" aria-labelledby="hero-now">
            <h2 id="hero-now" className="meta">
              {t(d.nowLabel)}
            </h2>
            <p className="hero__clock">
              <span className="hero__place">{d.place}</span>
              <LocalTime className="hero__time figure" />
              <span className="meta">{t(d.timeLabel)}</span>
            </p>
            <p className="hero__avail">
              <span className="dot" aria-hidden />
              {t(DATA.header.availability)}
            </p>
            <p className="hero__studio">
              <span className="meta">{t(d.studioLabel)}</span>
              <a href={pick(d.studio.href, locale)} target="_blank" rel="noreferrer" className="link-data">
                <span>{t(d.studio.label)}</span>
                <span className="link-data__arrow" aria-hidden>
                  ↗
                </span>
              </a>
            </p>
            <div className="hero__stack">
              <h3 className="meta">{t(d.stackLabel)}</h3>
              <ul className="data">
                {d.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </aside>

          <p className="hero__title lede hero__after">{t(d.title)}</p>
          <div className="hero__intro hero__after">
            <p className="copy">{t(d.line)}</p>
            <div className="hero__ctas">
              <a href={d.ctaWork.href} className="btn btn--solid">
                {t(d.ctaWork.label)}
                <span className="btn__arrow btn__arrow--down" aria-hidden>
                  ↓
                </span>
              </a>
              <a href={d.ctaTalk.href} className="btn">
                {t(d.ctaTalk.label)}
              </a>
              <span className="hero__hint meta" aria-hidden>
                {t(d.hint)}
              </span>
            </div>
          </div>
        </div>
        <div className="hero__after">
          <ContactSheet locale={locale} />
        </div>
      </div>
    </section>
  );
}
