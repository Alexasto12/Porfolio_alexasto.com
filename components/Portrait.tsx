import Image from "next/image";
import { DATA } from "@/lib/content";
import { translator, type Locale } from "@/lib/i18n-types";

/**
 * Both places put it in columns 9 to 12 of the shell (at most 387px wide),
 * and at most 300px wide below 861px. Measured: 253px at 861, 300 at 1024,
 * 375 at 1280.
 */
const SIZES = "(max-width: 860px) 300px, (max-width: 1280px) 30vw, 384px";

type PortraitProps = {
  locale: Locale;
  /** Only where it is in the first screen (the About page), so it does not delay the LCP elsewhere. */
  priority?: boolean;
  className?: string;
};

/** My photo in ink on paper (scripts/portrait.mjs), 4:5. */
export function Portrait({ locale, priority, className = "" }: PortraitProps) {
  const t = translator(locale);
  const p = DATA.about.portrait;
  return (
    <figure className={`portrait ${className}`.trim()}>
      <Image src={p.src} width={p.width} height={p.height} alt={t(p.alt)} sizes={SIZES} priority={priority} />
    </figure>
  );
}
