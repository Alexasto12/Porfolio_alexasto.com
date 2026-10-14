import { DATA } from "@/lib/content";
import { translator, type Locale } from "@/lib/i18n-types";
import { SectionHead } from "../ui/SectionHead";

/**
 * Path (paper): every milestone, grouped in three stages. On wide screens a
 * horizontal rail with the years draws itself as the section scrolls in;
 * on phones the rail runs down the side.
 */
export function Timeline({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const d = DATA.timeline;
  const stages = d.stages.map((st) => ({
    ...st,
    entries: d.entries.filter((e) => Number(e.year) >= st.from && Number(e.year) <= st.to),
  }));
  return (
    <section id="recorrido" className="sec path" data-surface="paper">
      <div className="shell">
        <SectionHead
          num={d.num}
          label={t(d.label)}
          heading={t(d.heading)}
          description={t(d.description)}
          className="sec-head--split"
        />
        {/* The years again, as a rail: the list below carries them for everyone. */}
        <div className="path__rail" aria-hidden>
          <span className="path__line" />
          {stages.map((st, i) => (
            <span key={st.from} className={`path__seg path__seg--${i + 1}`}>
              {st.entries.map((e) => (
                <span key={e.year} className="path__tick data">
                  {e.year}
                </span>
              ))}
            </span>
          ))}
        </div>
        <ol className="path__stages">
          {stages.map((st) => (
            <li key={st.from} className="path__stage">
              <h3 className="path__name">{t(st.name)}</h3>
              <p className="path__range data">
                {st.from}-{st.to}
              </p>
              <ol className="path__items">
                {st.entries.map((e) => (
                  <li key={e.year} className="path__item">
                    <span className="path__year data">{e.year}</span>
                    <div>
                      <h4 className="path__title">{t(e.title)}</h4>
                      <p className="path__place meta">{t(e.place)}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
