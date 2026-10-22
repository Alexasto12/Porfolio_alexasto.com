import { DATA } from "@/lib/content";
import { translator, type Locale } from "@/lib/i18n-types";
import { SectionHead } from "../ui/SectionHead";

/** The four ways I work, each with a published proof. Shared by the home and the subpages. */
export function ProcessList({ locale, level = 3 }: { locale: Locale; level?: 3 | 4 }) {
  const t = translator(locale);
  const Heading = level === 3 ? "h3" : "h4";
  return (
    <ul className="process grid">
      {DATA.process.items.map((p, i) => (
        <li key={i} className="process__item">
          <Heading className="process__title">{t(p.title)}</Heading>
          <p className="process__text">{t(p.body)}</p>
        </li>
      ))}
    </ul>
  );
}

/** How I work (ink): right before the contact, as DECISIONES.md asks for the principles. */
export function Process({ locale }: { locale: Locale }) {
  const t = translator(locale);
  return (
    <section id="como-trabajo" className="sec process-sec" data-surface="ink" aria-labelledby="process-title">
      <div className="shell">
        <SectionHead id="process-title" heading={t(DATA.process.heading)} />
        <ProcessList locale={locale} />
      </div>
    </section>
  );
}
