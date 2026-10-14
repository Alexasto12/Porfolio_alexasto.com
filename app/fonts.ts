import localFont from "next/font/local";

/*
 * Self-hosted subsets (scripts/subset-fonts.py): only the characters and axis
 * ranges the site uses, about half the weight of the Google Fonts files.
 * Licences (OFL) next to the files in assets/fonts/.
 */

/* Variable weight (600-800) at a fixed 80 % width: the narrow cut of the headings. */
export const bricolage = localFont({
  src: "../assets/fonts/bricolage-grotesque-subset.woff2",
  weight: "600 800",
  style: "normal",
  display: "swap",
  variable: "--font-display",
  fallback: ["system-ui", "sans-serif"],
});

export const hanken = localFont({
  src: "../assets/fonts/hanken-grotesk-subset.woff2",
  weight: "400 500",
  style: "normal",
  display: "swap",
  variable: "--font-body",
  fallback: ["system-ui", "sans-serif"],
});

/* Regular only: data is set in Space Mono 400, never bold. */
export const spaceMono = localFont({
  src: "../assets/fonts/space-mono-400-subset.woff2",
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-mono",
  fallback: ["ui-monospace", "monospace"],
});
