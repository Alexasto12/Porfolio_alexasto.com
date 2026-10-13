import type { Card } from "@/lib/content";
import { DATA } from "@/lib/content";
import { pick, translator, type Locale } from "@/lib/i18n-types";
import { SectionHead } from "../ui/SectionHead";
import { ServiceGlyph } from "../ui/ServiceGlyph";
import { BrowserFrame } from "../BrowserFrame";
import { LinkRow } from "../LinkRow";

/** "Now: Digital DesAny" (paper): the studio, its four services and its cases in a bento. */
export function Now({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const d = DATA.now;
  return (
    <section id="ahora" className="sec now" data-surface="paper">
      <div className="shell">
        <SectionHead num={d.num} label={t(d.label)} heading={t(d.heading)} className="now__head" />
        <div className="now__intro grid">
          <p className="copy">{t(d.description)}</p>
          <p className="copy muted">{t(d.ownership)}</p>
        </div>

        <h3 className="now__label meta">{t(d.servicesLabel)}</h3>
        <ol className="now__services grid">
          {d.services.map((s, i) => (
            <li key={i} className="now__service">
              <span className="now__num figure" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <ServiceGlyph kind={i} />
              <h4 className="h-item">{t(s.title)}</h4>
              {s.description && <p className="now__service-text muted">{t(s.description)}</p>}
            </li>
          ))}
        </ol>
        <LinkRow links={d.links} locale={locale} className="now__links" />

        <h3 className="now__label meta">{t(d.casesLabel)}</h3>
        <div className="bento">
          {d.cases.map((c) =>
            c.shot ? <CaseTile key={c.id} card={c} locale={locale} /> : <ChannelsTile key={c.id} card={c} locale={locale} />
          )}
        </div>

        <a href={pick(d.more.href, locale)} target="_blank" rel="noreferrer" className="now__more">
          <span>{t(d.more.label)}</span>
          <span className="now__more-arrow" aria-hidden>
            ↗
          </span>
        </a>
      </div>
    </section>
  );
}

/** A case with a site: its capture in a BrowserFrame, name, one line and links. */
function CaseTile({ card, locale }: { card: Card; locale: Locale }) {
  const t = translator(locale);
  const big = card.id !== "paulakrebel";
  return (
    <article id={card.id} className={`bento__item bento__item--${card.id}`} aria-labelledby={`${card.id}-name`}>
      <BrowserFrame
        id={card.id}
        alt={t(card.shot!.alt)}
        sizes={big ? "(max-width: 860px) 100vw, 720px" : "(max-width: 860px) 100vw, 520px"}
      />
      <div className="bento__body">
        <div className="bento__head">
          <h4 id={`${card.id}-name`} className="h-item">
            {card.name}
          </h4>
          {card.sub && <span className="meta">{t(card.sub)}</span>}
        </div>
        <p className="copy muted">{t(card.description)}</p>
        <LinkRow links={card.links} locale={locale} className="bento__links" />
      </div>
    </article>
  );
}

/** A case with no site to show (Hidrotech): on wine, with its channels as big chips. */
function ChannelsTile({ card, locale }: { card: Card; locale: Locale }) {
  const t = translator(locale);
  return (
    <article
      id={card.id}
      className={`bento__item bento__item--${card.id} bento__channels`}
      data-surface="wine"
      aria-labelledby={`${card.id}-name`}
    >
      {card.sub && <span className="meta">{t(card.sub)}</span>}
      <h4 id={`${card.id}-name`} className="bento__channels-name">
        {card.name}
      </h4>
      <p className="copy">{t(card.description)}</p>
      <ul className="chips">
        {card.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </article>
  );
}
