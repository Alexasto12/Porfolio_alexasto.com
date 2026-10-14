import { DATA } from "@/lib/content";
import { pick, translator, type Locale } from "@/lib/i18n-types";
import { ExtLink } from "./ui/Links";

/** VMV's three figures: big number, then what it counts. Static: the number is the point. */
export function VmvFigures({ locale }: { locale: Locale }) {
  const t = translator(locale);
  return (
    <dl className="figures">
      {DATA.experience.vmv.stats.map((s, i) => (
        <div key={i} className="figures__item">
          <dt className="figures__label">{t(s.label)}</dt>
          <dd className="figures__value">{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** What I built at VMV: capabilities only, never internal names or how the defences work. */
export function VmvCapabilities({ locale, level = 4 }: { locale: Locale; level?: 3 | 4 }) {
  const t = translator(locale);
  const Heading = level === 3 ? "h3" : "h4";
  return (
    <ul className="caps">
      {DATA.experience.vmv.capabilities.map((c, i) => (
        <li key={i} className="caps__item">
          <Heading className="caps__title">{t(c.title)}</Heading>
          {c.description && <p className="caps__text">{t(c.description)}</p>}
          {c.link && <ExtLink href={pick(c.link.href, locale)}>{pick(c.link.label, locale)}</ExtLink>}
        </li>
      ))}
    </ul>
  );
}
