import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n-types";
import { translator } from "@/lib/i18n-types";
import { PAGE_NAME, UI } from "@/lib/pages";
import { ROUTES, type PageKey } from "@/lib/routes";
import { trail } from "@/lib/site";
import { PageShell } from "../LocalePage";
import { Contact } from "../sections/Contact";

/** A page other than the home: its content, then the contact section every page ends with. */
export function SubPage({ locale, page, children }: { locale: Locale; page: PageKey; children: ReactNode }) {
  return (
    <PageShell locale={locale} page={page}>
      {children}
      <Contact locale={locale} />
    </PageShell>
  );
}

/** Breadcrumbs, the page's h1, an optional line of metadata and the lede. */
export function PageHead({
  locale,
  page,
  title,
  meta,
  lede,
  children,
}: {
  locale: Locale;
  page: PageKey;
  title: string;
  meta?: ReactNode;
  lede?: string;
  children?: ReactNode;
}) {
  const t = translator(locale);
  const crumbs = trail(page);
  return (
    <section className="sec page-head" data-surface="paper" aria-labelledby="page-title">
      <div className="shell">
        <nav className="crumbs" aria-label={t(UI.breadcrumbLabel)}>
          <ol>
            {crumbs.map((p) => (
              <li key={p}>
                {p === page ? (
                  <span aria-current="page">{t(PAGE_NAME[p])}</span>
                ) : (
                  <a href={ROUTES[p][locale]}>{t(PAGE_NAME[p])}</a>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <h1 id="page-title" className="page-head__title">
          {title}
        </h1>
        {meta && <p className="page-head__meta">{meta}</p>}
        {lede && <p className="page-head__lede">{lede}</p>}
        {children}
      </div>
    </section>
  );
}

/** One section of a subpage: an h2 and its content, on paper unless told otherwise. */
export function PageSection({
  id,
  title,
  surface = "paper",
  children,
  className = "",
}: {
  id: string;
  title: string;
  surface?: "paper" | "ink";
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`sec page-sec ${className}`.trim()} data-surface={surface} aria-labelledby={`${id}-title`}>
      <div className="shell">
        <h2 id={`${id}-title`} className="page-sec__title">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

/** A piece of work told in one paragraph, with a link to its own page and to its site. */
export function ProjectItem({
  id,
  name,
  text,
  page,
  pageLabel,
  locale,
  children,
}: {
  id: string;
  name: string;
  text: string;
  page?: PageKey;
  pageLabel?: string;
  locale: Locale;
  children?: ReactNode;
}) {
  return (
    <article id={id} className="case case--text" aria-labelledby={`${id}-name`}>
      <div className="case__body">
        <h3 id={`${id}-name`} className="h-item">
          {name}
        </h3>
        <p className="copy muted">{text}</p>
        <p className="xp-job__links">
          {page && pageLabel && (
            <a href={ROUTES[page][locale]} className="more-link">
              {pageLabel}
            </a>
          )}
          {children}
        </p>
      </div>
    </article>
  );
}
