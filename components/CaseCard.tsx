import type { Card } from "@/lib/content";
import { translator, type Locale } from "@/lib/i18n-types";
import { BrowserFrame } from "./BrowserFrame";
import { LinkRow } from "./ui/Links";

type CaseCardProps = {
  card: Card;
  locale: Locale;
  /** Heading level, so the card nests under its section's heading. */
  level?: 3 | 4;
  sizes?: string;
  /** Put the card's id on it, so in-page links can reach it (only once per page). */
  anchor?: boolean;
};

/** A piece of work: its capture (if there is one), name, one paragraph and its links. */
export function CaseCard({ card, locale, level = 3, sizes = "(max-width: 860px) 100vw, 640px", anchor = true }: CaseCardProps) {
  const t = translator(locale);
  const Heading = level === 3 ? "h3" : "h4";
  const headingId = `${card.id}-name`;
  return (
    <article
      id={anchor ? card.id : undefined}
      className={`case ${card.shot || card.poster ? "" : "case--text"}`.trim()}
      aria-labelledby={headingId}
    >
      {card.shot && <BrowserFrame id={card.id} alt={t(card.shot.alt)} sizes={sizes} />}
      {card.poster && (
        // Same frame as a capture, so the grid stays even. The words repeat the paragraph below, hence aria-hidden.
        <div className="bframe case__poster" aria-hidden="true">
          <div className="bframe__bar">
            <span className="bframe__url">{t(card.poster.label)}</span>
          </div>
          <div className="bframe__view case__poster-view" data-surface="ink">
            <ul>
              {card.poster.words[locale].map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <div className="case__body">
        <Heading id={headingId} className="h-item">
          {card.name}
        </Heading>
        <p className="copy muted">{t(card.description)}</p>
        <LinkRow links={card.links} locale={locale} prefix={card.name} />
      </div>
    </article>
  );
}
