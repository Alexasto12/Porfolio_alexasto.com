import type { Metadata } from "next";
import { bricolage, spaceMono, hanken } from "./fonts";
import { NOT_FOUND } from "@/lib/pages";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "404 · Alejandro Cabrera",
  robots: { index: false, follow: true },
};

/** The 404 of the whole site. It cannot know the visitor's language, so it says it in all three. */
export default function GlobalNotFound() {
  return (
    <html lang="es" className={`${bricolage.variable} ${spaceMono.variable} ${hanken.variable}`}>
      <body>
        <main className="sec notfound" data-surface="paper">
          <div className="shell">
            <p className="notfound__code data">{NOT_FOUND.title}</p>
            {NOT_FOUND.lines.map((l) => (
              <section key={l.lang} lang={l.lang} className="notfound__line">
                <h1 className="notfound__heading">{l.heading}</h1>
                <p className="copy muted">{l.text}</p>
                <a href={l.href} hrefLang={l.lang} className="more-link">
                  {l.link}
                </a>
              </section>
            ))}
          </div>
        </main>
      </body>
    </html>
  );
}
