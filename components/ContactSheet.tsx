import Image from "next/image";
import { DATA } from "@/lib/content";
import { SHOTS } from "@/lib/shots";
import { translator, type Locale } from "@/lib/i18n-types";

/**
 * The contact sheet at the foot of the hero: small captures of the cases,
 * numbered like frames on a film strip, each linking to its case below. On
 * wide screens the strip slides sideways as the page scrolls (CSS
 * scroll-driven, never on its own); on phones it is a snap carousel.
 */
export function ContactSheet({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const d = DATA.hero;
  const items = d.sheet.filter((it) => SHOTS[it.id]);
  if (!items.length) return null;
  return (
    <div className="sheet">
      <h2 className="sheet__label meta">{t(d.sheetLabel)}</h2>
      <div className="sheet__window">
        <ol className="sheet__track">
          {items.map((it, i) => {
            const shot = SHOTS[it.id]!;
            return (
              <li key={it.id}>
                <a href={`#${it.id}`} className="sheet__item">
                  <span className="sheet__img">
                    {/* The link text names the case; the capture is decoration here. */}
                    <Image
                      src={shot.src}
                      width={shot.width}
                      height={shot.height}
                      alt=""
                      sizes="(max-width: 860px) 70vw, 300px"
                    />
                  </span>
                  <span className="sheet__cap">
                    <span className="sheet__num data" aria-hidden>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {it.name}
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
