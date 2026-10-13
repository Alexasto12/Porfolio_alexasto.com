import { DATA } from "@/lib/content";
import { LOCALES, LOCALE_FULL, translator, type Locale } from "@/lib/i18n-types";
import { LOCALE_PATH } from "@/lib/site";

/** Skip link plus the banner: name, section index, availability and language. */
export function SiteHeader({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const d = DATA.header;
  return (
    <>
      <a className="skip-link" href="#contenido">
        {t(d.skipLink)}
      </a>
      <header className="site-header">
        <div className="site-header__bar">
          <a href="#perfil" className="site-header__name">
            {d.name}
          </a>
          <nav className="site-nav" aria-label={t(d.navLabel)}>
            <ol>
              {DATA.sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>
                    <span className="site-nav__num">{s.num}</span>
                    {t(s.label)}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <span className="site-header__spacer" />
          <span className="site-header__avail">
            <span className="dot dot--accent dot-pulse" aria-hidden />
            {t(d.availability)}
          </span>
          {/* Plain links between the static locale routes; no automatic redirect. */}
          <nav className="lang-switch" aria-label={t(d.langLabel)}>
            {LOCALES.map((lc) => (
              <a
                key={lc}
                href={LOCALE_PATH[lc]}
                hrefLang={lc}
                lang={lc}
                aria-label={LOCALE_FULL[lc]}
                aria-current={lc === locale ? "page" : undefined}
                data-on={lc === locale}
              >
                {lc.toUpperCase()}
              </a>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}
