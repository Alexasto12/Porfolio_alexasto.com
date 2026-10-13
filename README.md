# alexasto.com

Web personal de **Alejandro Cabrera**, desarrollador backend y full-stack y cofundador de Digital DesAny. Una sola página en castellano (`/`), catalán (`/ca`) e inglés (`/en`), generada en estático.

Next.js 15 (App Router, componentes de servidor), TypeScript, Tailwind CSS v4. Sin dependencias de pago. Las reglas de contenido, tono y accesibilidad están en `CLAUDE.md`; los hechos publicables, en `docs/portfolio-refresh/DECISIONES.md`.

## Estructura

```
app/
  (es)/            layout raíz en castellano, página "/" e imagen OG
  (ca)/ca/         lo mismo para "/ca" (layout en app/(ca))
  (en)/en/         lo mismo para "/en" (layout en app/(en))
  sitemap.ts · robots.ts · manifest.ts · icon.tsx · apple-icon.tsx
  fonts.ts · globals.css
components/
  RootDocument     <html lang> por idioma, JSON-LD y fondo
  LocalePage       header + main + footer de un idioma
  SiteHeader       nombre, índice de secciones, disponibilidad e idioma
  sections/        Hero, Now (Digital DesAny), Experience, Timeline,
                   Education, Principles, Contact
  ProjectCard      tarjeta con captura opcional (next/image)
  ui/              islas de cliente: Reveal, Counter, Scramble, TimelineRail
lib/
  content.ts       todo el texto en los tres idiomas
  site.ts          SITE_URL, metadatos, hreflang y JSON-LD por idioma
  og.tsx           imagen OG con Bricolage Grotesque (assets/fonts)
  shots.json       capturas disponibles (lo escribe npm run capture)
scripts/           check, shots, a11y, lh, seo, links y capture
```

## Comandos

```bash
npm ci
npm run dev        # http://localhost:3000
npm run check      # lint, tipos y build
npm run a11y       # axe + desbordamiento a 320/375 px + texto < 11 px
npm run shots      # capturas a 375 y 1440 px de /, /ca y /en
npm run lh         # Lighthouse móvil y escritorio
npm run seo        # lang, canonical, hreflang, JSON-LD, sitemap, OG
npm run links      # enlaces externos con respuesta 200
npm run capture    # capturas de las webs de los proyectos (necesita red)
```

Más detalle en `CLAUDE.md`.

## Despliegue

Vercel. El dominio canónico se lee de la variable `SITE_URL` (por defecto `https://dev.alexasto.com`).
