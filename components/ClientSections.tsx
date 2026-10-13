"use client";

import { useI18n } from "@/lib/i18n";
import { Sections } from "./Sections";

/** Renders the sections in the locale chosen on the client. */
export function ClientSections() {
  const { locale } = useI18n();
  return <Sections locale={locale} />;
}
