import { CONTACT, DATA } from "@/lib/content";
import { pick, translator, type Locale } from "@/lib/i18n-types";
import { PAGE_NAME } from "@/lib/pages";
import { PAGE_KEYS, ROUTES } from "@/lib/routes";
import { ExtLink } from "./ui/Links";

/** Footer (ink): who and where, every page of the site, the contacts and the profiles. */
export function SiteFooter({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const f = DATA.footer;
  return (
    <footer className="site-footer" data-surface="ink">
      <div className="shell site-footer__grid">
        <div className="site-footer__who">
          <p className="site-footer__name">{DATA.header.name}</p>
          <p className="muted">{t(DATA.hero.role)}</p>
        </div>
        <nav className="site-footer__pages" aria-label={t(f.pagesLabel)}>
          <ul>
            {PAGE_KEYS.map((k) => (
              <li key={k}>
                <a href={ROUTES[k][locale]}>{t(PAGE_NAME[k])}</a>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="site-footer__contact">
          <li>
            <a href={`mailto:${CONTACT.workEmail}`}>{CONTACT.workEmail}</a>
          </li>
          <li>
            <a href={`mailto:${CONTACT.personalEmail}`}>{CONTACT.personalEmail}</a>
          </li>
          {CONTACT.profiles.map((p) => (
            <li key={p.href}>
              <ExtLink href={p.href} me>
                {p.label}
              </ExtLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="shell">
        <div className="site-footer__base">
          <p>
            {f.copyright} · {f.place}
          </p>
          <ExtLink href={pick(f.studio.href, locale)}>{pick(f.studio.label, locale)}</ExtLink>
        </div>
      </div>
    </footer>
  );
}
