import { CONTACT, DATA } from "@/lib/content";
import { translator, type Locale } from "@/lib/i18n-types";
import { SITE_HOST } from "@/lib/site";

/** WhatsApp with a prefilled message, so the studio knows where the lead came from. */
export function whatsappHref(locale: Locale) {
  const text = DATA.contact.whatsappText[locale].replace("{host}", SITE_HOST);
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

/** Email to the studio with the subject already written. */
export function mailtoHref(locale: Locale) {
  const subject = DATA.contact.emailSubject[locale].replace("{host}", SITE_HOST);
  return `mailto:${CONTACT.workEmail}?subject=${encodeURIComponent(subject)}`;
}

/** The two direct channels for a project: WhatsApp (solid) and email. */
export function ContactButtons({ locale, size = "md" }: { locale: Locale; size?: "md" | "lg" }) {
  const t = translator(locale);
  const d = DATA.contact;
  return (
    <div className={`cbtns cbtns--${size}`}>
      <a href={whatsappHref(locale)} target="_blank" rel="noopener" className="cbtn cbtn--solid">
        <span className="cbtn__label">{t(d.whatsapp)}</span>
        <span className="cbtn__detail">{CONTACT.whatsappLabel}</span>
      </a>
      <a href={mailtoHref(locale)} className="cbtn">
        <span className="cbtn__label">{t(d.email)}</span>
        <span className="cbtn__detail">{CONTACT.workEmail}</span>
      </a>
    </div>
  );
}
