import { RootDocument } from "@/components/RootDocument";
import type { Metadata } from "next";
import { SITE_URL, VIEWPORT } from "@/lib/site";

export const viewport = VIEWPORT;
/** Base for every relative URL in the metadata of this locale (OG images included). */
export const metadata: Metadata = { metadataBase: new URL(SITE_URL) };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootDocument locale="ca">{children}</RootDocument>;
}
