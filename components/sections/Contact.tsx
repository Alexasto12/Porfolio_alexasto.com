import { DATA } from "@/lib/content";
import { translator, type Locale } from "@/lib/i18n-types";

/**
 * Contact (wine, full width): the closing line at hero size, two big buttons
 * for project enquiries, then the personal address and the profiles as a
 * list with arrows.
 */
export function Contact({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const d = DATA.contact;
  return (
    <section id="contacto" className="sec contact" data-surface="wine" aria-labelledby="contact-title">
      <div className="shell">
        <p className="sec-index meta">
          <span className="sec-index__num">{d.num}</span>
          <span>{t(d.label)}</span>
        </p>
        <h2 id="contact-title" className="contact__title">
          {t(d.heading)} {t(d.headingAccent)}
        </h2>
        <div className="contact__lead grid">
          <p className="contact__body">{t(d.body)}</p>
          <p className="contact__note">
            <span className="meta">{t(d.work.label)}</span> {t(d.work.note)}
          </p>
        </div>
        <div className="contact__ctas">
          <a href={`mailto:${d.work.email}`} className="contact__cta contact__cta--solid">
            <span>{t(d.work.cta)}</span>
            <span className="contact__arrow" aria-hidden>
              ↗
            </span>
          </a>
          <a href={d.work.whatsapp.href} target="_blank" rel="noreferrer" className="contact__cta">
            <span>{d.work.whatsapp.label}</span>
            <span className="contact__arrow" aria-hidden>
              ↗
            </span>
          </a>
        </div>
        <ul className="contact__list">
          <li>
            <a href={`mailto:${d.work.email}`} className="contact__row">
              <span className="meta">{t(d.work.label)}</span>
              <span className="contact__value">{d.work.email}</span>
              <span className="contact__arrow" aria-hidden>
                ↗
              </span>
            </a>
          </li>
          <li>
            <a href={`mailto:${d.personal.email}`} className="contact__row">
              <span className="meta">{t(d.personal.label)}</span>
              <span className="contact__value">
                {d.personal.email} <span className="contact__aside">{t(d.personal.note)}</span>
              </span>
              <span className="contact__arrow" aria-hidden>
                ↗
              </span>
            </a>
          </li>
          {d.links.map((ln, i) => (
            <li key={i}>
              <a href={t(ln.href)} target="_blank" rel="noreferrer" className="contact__row">
                <span className="meta">{t(d.channelsLabel)}</span>
                <span className="contact__value">{t(ln.label)}</span>
                <span className="contact__arrow" aria-hidden>
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
