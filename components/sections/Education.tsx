import type { Card } from "@/lib/content";
import { DATA } from "@/lib/content";
import { translator, type Locale } from "@/lib/i18n-types";
import { SectionHead } from "../ui/SectionHead";
import { Tags } from "../ui/Tags";
import { BrowserFrame } from "../BrowserFrame";
import { LinkRow } from "../LinkRow";

/** Education (paper): Peer2Stream and the Pokédex side by side, WordPress.org underneath. */
export function Education({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const d = DATA.education;
  return (
    <section id="formacion" className="sec edu" data-surface="paper">
      <div className="shell">
        <SectionHead
          num={d.num}
          label={t(d.label)}
          heading={t(d.heading)}
          description={t(d.description)}
          className="sec-head--split"
        />
        <div className="edu__projects grid">
          {d.projects.map((p) => (
            <EduProject key={p.id} card={p} locale={locale} />
          ))}
        </div>
        <div className="edu__wp">
          <p className="muted">{t(d.wordpress.text)}</p>
          <LinkRow links={[d.wordpress.link]} locale={locale} />
        </div>
      </div>
    </section>
  );
}

function EduProject({ card, locale }: { card: Card; locale: Locale }) {
  const t = translator(locale);
  return (
    <article id={card.id} className="edu__project" aria-labelledby={`${card.id}-name`}>
      {card.shot && <BrowserFrame id={card.id} alt={t(card.shot.alt)} sizes="(max-width: 860px) 100vw, 600px" />}
      <div className="edu__head">
        <h3 id={`${card.id}-name`} className="h-item">
          {card.name}
        </h3>
        {card.sub && <span className="meta">{t(card.sub)}</span>}
      </div>
      <p className="copy muted">{t(card.description)}</p>
      <Tags items={card.tags} />
      <LinkRow links={card.links} locale={locale} />
    </article>
  );
}
