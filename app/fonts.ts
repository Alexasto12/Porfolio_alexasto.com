import { Bricolage_Grotesque, Space_Mono, Hanken_Grotesk } from "next/font/google";

/* Variable, with the width axis: headings run narrow, figures run wide. */
export const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["wdth"],
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
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-body",
});
