import { DATA } from "@/lib/content";
import { LOCALES, LOCALE_FULL, translator, type Locale } from "@/lib/i18n-types";
import { ROUTES, homeAnchor, type PageKey } from "@/lib/routes";
import { HeaderSurface } from "./ui/HeaderSurface";

/**
 * Skip link plus the banner: name, the home's index, a call to action and
 * the language switch (to the same page in the other language). Sticky at
 * every width. Below 1024px the index folds into a menu (native <details>,
 * so it works without JavaScript); below 560px the languages go in it too.
 */
export function SiteHeader({ locale, page }: { locale: Locale; page: PageKey }) {
  const t = translator(locale);
  const d = DATA.header;
  const onHome = page === "home";
  const items = DATA.nav.map((s) => (
    <li key={s.id}>
      <a href={homeAnchor(locale, s.id, onHome)}>{t(s.label)}</a>
    </li>
  ));
  const langs = LOCALES.map((lc) => (
    <a
      key={lc}
      href={ROUTES[page][lc]}
      hrefLang={lc}
      lang={lc}
      aria-label={LOCALE_FULL[lc]}
      aria-current={lc === locale ? "page" : undefined}
    >
      {lc.toUpperCase()}
    </a>
  ));
  return (
    <>
      <a className="skip-link" href="#contenido">
        {t(d.skipLink)}
      </a>
      {/* Starts on paper; HeaderSurface then follows the surface below it. */}
      <header className="site-header" data-surface="paper">
        <div className="site-header__bar">
          <a href={onHome ? "#inicio" : ROUTES.home[locale]} className="site-header__name">
            {d.name}
          </a>
          <nav className="site-nav" aria-label={t(d.navLabel)}>
            <ul>{items}</ul>
          </nav>
          <span className="site-header__spacer" />
          {/* Every page ends with the contact section. */}
          <a href="#contacto" className="site-header__cta">
            {t(d.cta)}
          </a>
          {/* Plain links between the static locale routes; no automatic redirect. */}
          <nav className="lang-switch" aria-label={t(d.langLabel)}>
            {langs}
          </nav>
          <details className="site-menu">
            <summary>{t(d.menu)}</summary>
            <div className="site-menu__panel">
              <nav aria-label={t(d.navLabel)}>
                <ul>{items}</ul>
              </nav>
              {/* On narrow screens the language switch moves in here (the one in the bar is hidden). */}
              <nav className="site-menu__langs lang-switch" aria-label={t(d.langLabel)}>
                {langs}
              </nav>
            </div>
          </details>
        </div>
        <HeaderSurface />
      </header>
    </>
  );
}
