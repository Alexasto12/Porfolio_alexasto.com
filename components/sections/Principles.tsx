import { DATA } from "@/lib/content";
import { translator, type Locale } from "@/lib/i18n-types";
import { SectionHead } from "../ui/SectionHead";

export function Principles({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const d = DATA.principles;
  return (
    <section id="principios" className="sec principles" data-surface="ink">
      <div className="shell">
        <SectionHead num={d.num} label={t(d.label)} heading={t(d.heading)} description={t(d.description)} />
        <ol className="principles__list grid">
          {d.items.map((p) => (
            <li key={p.index} className="principles__item">
              <span className="principles__num figure" aria-hidden>
                {p.index}
              </span>
              <h3 className="h-item">{t(p.title)}</h3>
              <p className="copy muted">{t(p.body)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
