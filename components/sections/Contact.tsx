import { CONTACT, DATA } from "@/lib/content";
import { translator, type Locale } from "@/lib/i18n-types";
import { ContactButtons } from "../ui/ContactButtons";
import { ExtLink } from "../ui/Links";

/**
 * Contact (wine): the same words as the hero's main button, the two direct
 * channels with the message already written, and, apart, the personal
 * address and profiles. Every page ends with it, so "#contacto" always works.
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
          </ul>
        </div>
      </div>
    </section>
  );
}
