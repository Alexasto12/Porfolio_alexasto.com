import { DATA } from "@/lib/content";
import { translator, type Locale } from "@/lib/i18n-types";

export function Contact({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const d = DATA.contact;
  return (
    <section id="contacto" className="sec contact" data-surface="wine">
      <div className="shell">
        <p className="sec-index meta">
          <span className="sec-index__num">{d.num}</span>
          <span>{t(d.label)}</span>
        </p>
        <h2 className="contact__title">
          {t(d.heading)} {t(d.headingAccent)}
        </h2>
        <div className="contact__grid grid">
          <div className="contact__main">
            <p className="copy">{t(d.body)}</p>
            <h3 className="contact__label meta">{t(d.work.label)}</h3>
            <p className="copy">{t(d.work.note)}</p>
            <div className="contact__ctas">
              <a href={`mailto:${d.work.email}`} className="btn btn--solid">
                {t(d.work.cta)}
                <span className="btn__arrow" aria-hidden>
                  ↗
                </span>
              </a>
              <a href={d.work.whatsapp.href} target="_blank" rel="noreferrer" className="btn">
                {d.work.whatsapp.label}
              </a>
            </div>
            <a href={`mailto:${d.work.email}`} className="contact__mail link-data">
              {d.work.email}
            </a>
            <h3 className="contact__label meta">{t(d.personal.label)}</h3>
            <p className="copy">{t(d.personal.note)}</p>
            <a href={`mailto:${d.personal.email}`} className="contact__mail link-data">
              {d.personal.email}
            </a>
          </div>
          <div className="contact__profiles">
            <h3 className="meta">{t(d.channelsLabel)}</h3>
            <ul>
              {d.links.map((ln, i) => (
                <li key={i}>
                  <a href={t(ln.href)} target="_blank" rel="noreferrer" className="contact__profile">
                    <span>{t(ln.label)}</span>
                    <span aria-hidden>↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
