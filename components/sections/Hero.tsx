import { DATA } from "@/lib/content";
import { translator, type Locale } from "@/lib/i18n-types";
import { Scramble } from "../ui/Scramble";

export function Hero({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const d = DATA.hero;
  return (
    <section id="perfil" className="sec hero" data-surface="paper">
      <div className="shell">
        <p className="hero__hint meta hover-only" aria-hidden>
          {t(d.hint)}
        </p>
        <h1 className="hero__name">
          <Scramble text={d.firstName} perChar={30} className="hero__first" />
          <Scramble text={d.lastName} perChar={30} className="hero__last" />
        </h1>
        <p className="hero__title lede">{t(d.title)}</p>
        <div className="hero__row grid">
          <div className="hero__intro">
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
            </div>
          </div>
          <div className="hero__stack">
            <h2 className="meta">{t(d.stackLabel)}</h2>
            <ul className="data">
              {d.stack.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
