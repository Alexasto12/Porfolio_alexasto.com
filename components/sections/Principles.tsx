import { DATA } from "@/lib/content";
import { translator, type Locale } from "@/lib/i18n-types";
import { SectionHead } from "../ui/SectionHead";

/** Principles (ink): four columns with an outlined number, a title and the text. No boxes. */
export function Principles({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const d = DATA.principles;
  return (
    <section id="principios" className="sec principles" data-surface="ink">
      <div className="shell">
        <SectionHead
          num={d.num}
          label={t(d.label)}
          heading={t(d.heading)}
          description={t(d.description)}
          className="sec-head--split"
        />
        <ol className="principles__list grid">
          {d.items.map((p) => (
            <li key={p.index} className="principles__item">
              <span className="principles__num" aria-hidden>
                {p.index}
              </span>
              <h3 className="principles__title">{t(p.title)}</h3>
              <p className="principles__text muted">{t(p.body)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
