import type { Card } from "@/lib/content";
import { translator, type Locale } from "@/lib/i18n-types";
import { BrowserFrame } from "./BrowserFrame";
import { Tags } from "./ui/Tags";
import { LinkRow } from "./LinkRow";

type ProjectCardProps = {
  card: Card;
  locale: Locale;
  /** Heading level for the card title, so it nests under the section's headings. */
  level?: 3 | 4;
  sizes?: string;
  className?: string;
};

/** A project: its capture in a BrowserFrame (if there is one), name, line, tags and links. */
export function ProjectCard({ card, locale, level = 3, sizes = "(max-width: 860px) 100vw, 600px", className = "" }: ProjectCardProps) {
  const t = translator(locale);
  const Heading = level === 3 ? "h3" : "h4";
  return (
    <article className={`project ${className}`.trim()}>
      {card.shot && <BrowserFrame id={card.id} alt={t(card.shot.alt)} sizes={sizes} className="project__frame" />}
      <div className="project__body">
        <div className="project__head">
          <Heading className="h-item">{card.name}</Heading>
          {card.sub && <span className="meta">{t(card.sub)}</span>}
        </div>
        <p className="project__text copy muted">{t(card.description)}</p>
        <Tags items={card.tags} className="project__tags" />
        <LinkRow links={card.links} locale={locale} className="project__links" />
      </div>
    </article>
  );
}
