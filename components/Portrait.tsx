import Image from "next/image";
import { DATA } from "@/lib/content";
import { translator, type Locale } from "@/lib/i18n-types";

type PortraitProps = {
  locale: Locale;
  /** `sizes` for next/image, matched to the column it sits in. */
  sizes: string;
  /** Only where it is in the first screen (the About page), so it does not delay the LCP elsewhere. */
  priority?: boolean;
  className?: string;
};

/** My photo in ink on paper (scripts/portrait.mjs), 4:5. */
export function Portrait({ locale, sizes, priority, className = "" }: PortraitProps) {
  const t = translator(locale);
  const p = DATA.about.portrait;
  return (
    <figure className={`portrait ${className}`.trim()}>
      <Image src={p.src} width={p.width} height={p.height} alt={t(p.alt)} sizes={sizes} priority={priority} />
    </figure>
  );
}
