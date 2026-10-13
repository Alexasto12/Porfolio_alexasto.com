import Image from "next/image";
import type { Card } from "@/lib/content";
import { translator, type Locale } from "@/lib/i18n-types";
import { CARD_IMAGE_SIZES, SHOTS } from "@/lib/shots";
import { Reveal } from "./ui/Reveal";
import { Tags } from "./ui/Tags";
import { LinkRow } from "./LinkRow";

type ProjectCardProps = {
  card: Card;
  index: number;
  locale: Locale;
  /** Heading level for the card title, so it nests under the section's headings. */
  level?: 3 | 4;
};

/**
 * Project card. The layout (stack, split or list) comes from CSS through
 * `html[data-cards]`, which the hidden tweaks panel sets.
 */
export function ProjectCard({ card, index, locale, level = 3 }: ProjectCardProps) {
  const t = translator(locale);
  const Heading = level === 3 ? "h3" : "h4";
  // Only real screenshots get a frame; a site that could not be captured has none.
  const file = card.shot ? SHOTS[card.id] : undefined;
  return (
    <Reveal as="article" delay={String((index % 2) + 1)} className="card panel card-tilt">
      {card.shot && file && (
        <div className="card__media">
          <Image
            className="shot-img"
            src={file.src}
            width={file.width}
            height={file.height}
            alt={t(card.shot.alt)}
            sizes={CARD_IMAGE_SIZES}
          />
        </div>
      )}
      <div className="card__body">
        <div style={{ display: "flex", alignItems: "baseline", gap: "12px", flexWrap: "wrap" }}>
          <Heading
            className="font-display"
            style={{
              fontWeight: 700,
              fontSize: "clamp(1.4rem,2.6vw,2rem)",
              letterSpacing: "-0.025em",
              lineHeight: 1,
            }}
          >
            {card.name}
          </Heading>
          {card.sub && (
            <span
              className="font-mono"
              style={{
                fontSize: "11px",
                color: "var(--muted-soft)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              {t(card.sub)}
            </span>
          )}
        </div>
        <p
          style={{
            marginTop: "14px",
            color: "var(--muted)",
            fontSize: "14.5px",
            lineHeight: 1.62,
            textWrap: "pretty",
          }}
        >
          {t(card.description)}
        </p>
        <div style={{ marginTop: "16px" }}>
          <Tags items={card.tags} />
        </div>
        <LinkRow links={card.links} locale={locale} />
      </div>
    </Reveal>
  );
}
