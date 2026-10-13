import { DATA } from "@/lib/content";
import { translator, type Locale } from "@/lib/i18n-types";
import { SectionHead } from "../ui/SectionHead";

/** Path: one axis in years. */
export function Timeline({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const d = DATA.timeline;
  return (
    <section id="recorrido" className="sec path" data-surface="paper">
      <div className="shell">
        <SectionHead num={d.num} label={t(d.label)} heading={t(d.heading)} description={t(d.description)} />
        <div className="tl">
          <span className="tl__rail" aria-hidden />
          <ol className="tl__list">
            {d.entries.map((e) => (
              <li key={e.year} className="tl__row">
                <span className="tl__year font-mono">{e.year}</span>
                <div>
                  <p className="tl__meta meta">
                    <span className="tl__kind" data-kind={e.kind}>
                      {t(d.kindLabels[e.kind])}
                    </span>
                    <span>{t(e.place)}</span>
                  </p>
                  <h3 className="tl__title h-item">{t(e.title)}</h3>
                  <p className="copy muted">{t(e.body)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
