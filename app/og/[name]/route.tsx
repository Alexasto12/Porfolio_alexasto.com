/**
 * Open Graph images of every page, built at compile time: /og/es-home.png,
 * /og/ca-neibr.png… (lib/site.ts ogPath). A route of its own because the
 * opengraph-image file convention cannot sit inside a catch-all segment.
 */
import { notFound } from "next/navigation";
import { LOCALES } from "@/lib/i18n-types";
import { ogImage } from "@/lib/og";
import { PAGE_KEYS } from "@/lib/routes";
import { ogPath } from "@/lib/site";

export const dynamic = "force-static";
export const dynamicParams = false;

const IMAGES = LOCALES.flatMap((locale) =>
  PAGE_KEYS.map((page) => ({ name: ogPath(locale, page).split("/").pop()!, locale, page }))
);

export const generateStaticParams = () => IMAGES.map(({ name }) => ({ name }));

export async function GET(_: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const image = IMAGES.find((i) => i.name === name);
  if (!image) notFound();
  return ogImage(image.locale, image.page);
}
