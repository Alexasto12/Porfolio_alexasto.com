import { CONTACT, DATA } from "@/lib/content";
import { translator, type Locale } from "@/lib/i18n-types";
import { ContactButtons } from "../ui/ContactButtons";
import { ExtLink } from "../ui/Links";

/**
 * Contact (wine): the same words as the hero's main button, the two direct
 * channels with the message already written, what happens after the first
 * message and, apart, the personal address and profiles. Every page ends with it, so "#contacto" always works.
 */
export function Contact({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const d = DATA.contact;
  return (
    <section id="contacto" className="sec contact" data-surface="wine" aria-labelledby="contact-title">
      <div className="shell">
        <h2 id="contact-title" className="contact__title">
          {t(d.heading)}
        </h2>
        <p className="contact__body">{t(d.body)}</p>
        <ContactButtons locale={locale} size="lg" />
        <div className="contact__next">
          <h3 className="contact__label">{t(d.nextLabel)}</h3>
          <ol className="contact__steps">
            {d.next.map((s, i) => (
              <li key={s.title.es} className="contact__step">
                <span className="contact__num data" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4 className="contact__step-title">{t(s.title)}</h4>
                <p className="contact__step-text">{t(s.text)}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="contact__personal">
          <h3 className="contact__label">{t(d.personalLabel)}</h3>
          <p>
            {t(d.personalNote)} <a href={`mailto:${CONTACT.personalEmail}`} className="link">{CONTACT.personalEmail}</a>
          </p>
          <ul className="links" aria-label={t(d.profilesLabel)}>
            {CONTACT.profiles.map((p) => (
              <li key={p.href}>
                <ExtLink href={p.href} me>
                  {p.label}
                </ExtLink>
              </li>
            ))}
            <li>
              <ExtLink href={CONTACT.desanyLinkedIn}>{t(d.desanyLinkedIn)}</ExtLink>
            </li>
            <li>
              <ExtLink href={t(d.desanyProfile.href)}>{t(d.desanyProfile.label)}</ExtLink>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
