import { Bricolage_Grotesque, Space_Mono, Hanken_Grotesk } from "next/font/google";

/**
 * Bricolage is loaded as a *variable* font (wght + opsz axes) so headings can
 * shift weight/optical-size continuously — used for the scroll-driven kinetic
 * typography. Omitting `weight` opts into the full variable range.
 */
export const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
  variable: "--font-display",
});

export const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-mono",
});

export const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-body",
});
