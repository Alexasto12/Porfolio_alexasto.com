import type { ReactNode } from "react";
import type { Link } from "@/lib/content";
import { pick, type Locale } from "@/lib/i18n-types";

type ExtLinkProps = {
  href: string;
  children: ReactNode;
  /** One of my own profiles: rel="me" ties it to this site. */
  me?: boolean;
  className?: string;
};

/**
 * A link to another site: new tab, noopener (keeps the referrer, so the
 * other site can see the visit came from here) and the ↗ that marks it as
 * external. Mailto and in-page links never get the arrow.
 */
export function ExtLink({ href, children, me, className = "link-ext" }: ExtLinkProps) {
  return (
    <a href={href} target="_blank" rel={me ? "me noopener" : "noopener"} className={className}>
      <span>{children}</span>
      <span className="link-ext__arrow" aria-hidden>
        ↗
      </span>
    </a>
  );
}

/** External links in a row. `prefix` goes before each label for screen readers and search (the card's name). */
export function LinkRow({ links, locale, prefix, className = "" }: { links: Link[]; locale: Locale; prefix?: string; className?: string }) {
  if (!links.length) return null;
  return (
    <ul className={`links ${className}`.trim()}>
      {links.map((ln, i) => (
        <li key={i}>
          <ExtLink href={pick(ln.href, locale)}>
            {prefix && <span className="sr-only">{prefix}: </span>}
            {pick(ln.label, locale)}
          </ExtLink>
        </li>
      ))}
    </ul>
  );
}
