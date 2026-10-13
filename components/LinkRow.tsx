import type { Link } from "@/lib/content";
import { pick, type Locale } from "@/lib/i18n-types";

/** Row of external links with the accent bar, as used on cards. */
export function LinkRow({ links, locale }: { links: Link[]; locale: Locale }) {
  if (!links.length) return null;
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 18px", marginTop: "16px" }}>
      {links.map((ln, i) => (
        <a key={i} href={pick(ln.href, locale)} target="_blank" rel="noreferrer" className="link-row">
          <span className="link-row__bar" aria-hidden />
          <span>{pick(ln.label, locale)}</span>
        </a>
      ))}
    </div>
  );
}
