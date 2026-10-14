import { DATA } from "@/lib/content";
import { translator, type Locale } from "@/lib/i18n-types";
import { SectionHead } from "../ui/SectionHead";
import { CaseCard } from "../CaseCard";

/** Work (paper): the Digital DesAny cases, the one with a result first, in an even grid. */
export function Work({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const d = DATA.work;
  return (
    <section id="trabajos" className="sec work" data-surface="paper" aria-labelledby="work-title">
      <div className="shell">
        <SectionHead id="work-title" heading={t(d.heading)} description={t(d.description)} />
        <div className="work__grid">
          {d.cases.map((c) => (
            <CaseCard key={c.id} card={c} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
