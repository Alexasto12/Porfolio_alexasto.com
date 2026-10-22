/**
 * The catch-all route of one locale: every page other than its home, built
 * at compile time (no unknown slugs: they go to the 404). Each locale's
 * app/(xx)/.../[...slug]/page.tsx re-exports these with its own locale.
 */
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Locale } from "./i18n-types";
import { SUBPAGES, pageFromSlug, slugOf } from "./routes";
import { pageMetadata } from "./site";
import { SubPageFor } from "@/components/pages/Pages";

type Params = { params: Promise<{ slug: string[] }> };

export function subpageRoute(locale: Locale) {
  const generateStaticParams = () => SUBPAGES.map((p) => ({ slug: slugOf(p, locale) }));

  async function generateMetadata({ params }: Params): Promise<Metadata> {
    const page = pageFromSlug(locale, (await params).slug);
    return page ? pageMetadata(locale, page) : {};
  }

  async function Page({ params }: Params) {
    const page = pageFromSlug(locale, (await params).slug);
    if (!page || page === "home") notFound();
    return <SubPageFor page={page} locale={locale} />;
  }

  return { generateStaticParams, generateMetadata, Page };
}
