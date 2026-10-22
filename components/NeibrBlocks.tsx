import { DATA } from "@/lib/content";
import { translator, type Locale } from "@/lib/i18n-types";
import { ApiTerminal } from "./ApiTerminal";
import { NeibrDiagram } from "./NeibrDiagram";

/** The assignment diagram with its four steps (the only motion left: it explains the algorithm). */
export function NeibrFigure({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const d = DATA.experience.neibr.diagram;
  return <NeibrDiagram title={t(d.title)} steps={d.steps.map((s) => t(s))} />;
}

/**
 * Full-width wine band: the stress test figures, the same facts as a
 * sentence, the stack and, next to it, the request the API answered.
 * `withStack={false}` where the page has just told the stack and the
 * security (the Neibr page), so it is not repeated.
 */
export function StressBand({
  locale,
  headingLevel = 3,
  withStack = true,
}: {
  locale: Locale;
  headingLevel?: 2 | 3;
  withStack?: boolean;
}) {
  const t = translator(locale);
  const d = DATA.experience.neibr;
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <div className="stress" data-surface="wine">
      <div className="shell stress__grid grid">
        <section className="stress__figures" aria-labelledby="stress-title">
          <Heading id="stress-title" className="stress__title">
            Neibr: {t(d.stressLabel)}
          </Heading>
          <dl className="stress__list">
            {d.stress.map((f, i) => (
              <div key={i} className={`stress__item ${f.main ? "stress__item--main" : ""}`.trim()}>
                <dt className="stress__label">{t(f.label)}</dt>
                <dd className="stress__value">{t(f.value)}</dd>
              </div>
            ))}
          </dl>
          <p className="stress__sentence">{t(d.stressSentence)}</p>
          {withStack && (
            <p className="stress__stack">
              {t(d.stack)} {t(d.security)}
            </p>
          )}
        </section>
        <div className="stress__terminal">
          <ApiTerminal title={t(d.endpointTitle)} label={t(d.terminalLabel)} />
        </div>
      </div>
    </div>
  );
}
