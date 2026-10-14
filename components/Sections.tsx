import type { Locale } from "@/lib/i18n-types";
import { Hero } from "./sections/Hero";
import { Work } from "./sections/Work";
import { Services } from "./sections/Services";
import { Experience } from "./sections/Experience";
import { About } from "./sections/About";
import { Process } from "./sections/Process";
import { Contact } from "./sections/Contact";

/**
 * The home for one locale, in section order: promise, proof, offer, depth,
 * who, how, and the call to action (docs/portfolio-v2/RONDA2.md).
 */
export function Sections({ locale }: { locale: Locale }) {
  return (
    <>
      <Hero locale={locale} />
      <Work locale={locale} />
      <Services locale={locale} />
      <Experience locale={locale} />
      <About locale={locale} />
      <Process locale={locale} />
      <Contact locale={locale} />
    </>
  );
}
