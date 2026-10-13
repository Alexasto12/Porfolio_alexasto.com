import { DATA } from "@/lib/content";
import { translator, type Locale } from "@/lib/i18n-types";
import { Reveal } from "../ui/Reveal";
import { SectionHead } from "../ui/SectionHead";
import { TimelineRail } from "../ui/TimelineRail";

/** Path: one axis in years. Rail or compact rows via `html[data-timeline]`. */
export function Timeline({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const d = DATA.timeline;
  return (
    <section id="recorrido" className="shell section" style={{ paddingBottom: "clamp(56px,9vw,110px)" }}>
      <SectionHead num={d.num} label={t(d.label)} heading={t(d.heading)} description={t(d.description)} />
      <div className="tl" style={{ marginTop: "clamp(34px,5vw,64px)" }}>
        <TimelineRail />
        <ol className="tl__list">
          {d.entries.map((e) => (
            <Reveal as="li" key={e.year} className="tl__row">
              <div className="tl__node">
                <span className="tl__year font-display">{e.year}</span>
              </div>
              <div className="tl__content">
                <div className="tl__meta">
                  <span className="tl__kind" data-kind={e.kind}>
                    {t(d.kindLabels[e.kind])}
                  </span>
                  <span className="tl__place">{t(e.place)}</span>
                </div>
                <h3 className="tl__title">{t(e.title)}</h3>
                <p className="tl__body">{t(e.body)}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
