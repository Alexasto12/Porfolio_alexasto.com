import type { Link } from "@/lib/content";
import { pick, type Locale } from "@/lib/i18n-types";

/** External links as data, each with an arrow. */
export function LinkRow({ links, locale, className = "" }: { links: Link[]; locale: Locale; className?: string }) {
  if (!links.length) return null;
  return (
    <ul className={`links ${className}`.trim()}>
      {links.map((ln, i) => (
        <li key={i}>
          <a href={pick(ln.href, locale)} target="_blank" rel="noreferrer" className="link-data">
            <span>{pick(ln.label, locale)}</span>
            <span className="link-data__arrow" aria-hidden>
              ↗
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
