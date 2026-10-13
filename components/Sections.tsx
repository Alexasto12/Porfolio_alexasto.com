import type { Locale } from "@/lib/i18n-types";
import { Hero } from "./sections/Hero";
import { Now } from "./sections/Now";
import { Experience } from "./sections/Experience";
import { Timeline } from "./sections/Timeline";
import { Education } from "./sections/Education";
import { Principles } from "./sections/Principles";
import { Contact } from "./sections/Contact";

/** The whole page body for one locale, in section order. */
export function Sections({ locale }: { locale: Locale }) {
  return (
    <>
      <Hero locale={locale} />
      <Now locale={locale} />
      <Experience locale={locale} />
      <Timeline locale={locale} />
      <Education locale={locale} />
      <Principles locale={locale} />
      <Contact locale={locale} />
    </>
  );
}
