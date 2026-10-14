# alexasto.com

Web personal de **Alejandro Cabrera**, desarrollador web y backend en Granollers y cofundador de Digital DesAny. Una portada y seis páginas (proyectos, Neibr, VMV Cosmetic Group, sobre mí, desarrollo backend y desarrollo web) en castellano (`/`), catalán (`/ca`) e inglés (`/en`): 21 URL, todas generadas en estático.

Next.js 15 (App Router, componentes de servidor), TypeScript y Tailwind CSS v4. Casi sin movimiento, y el que hay es CSS. Sin dependencias de pago. Las reglas de contenido, tono y accesibilidad están en `CLAUDE.md`; los hechos publicables, en `docs/portfolio-refresh/DECISIONES.md`; la dirección visual, en `docs/portfolio-v2/DISENO.md` con los cambios de `docs/portfolio-v2/RONDA2.md`.

## Diseño

Papel, tinta y vino. La base es papel (`#F4EFE2`). Experiencia y Cómo trabajo van en tinta, igual que el pie. El vino (`#C12C52`) es la banda del stress test de Neibr y el Contacto entero. Cada sección declara su superficie con `data-surface` y los componentes solo usan los tokens de esa superficie, así que el contraste se mantiene en las tres (detalle en `CLAUDE.md`).

La portada sigue el orden de una página de venta: quién soy y qué hago, con cifras publicadas; los trabajos; los servicios con WhatsApp y correo a mano; la experiencia; el recorrido; cómo trabajo; y el contacto. Imágenes: capturas reales de cada web en un marco sencillo y un diagrama de la asignación de Neibr en SVG hecho a mano, el único elemento que se anima (y se apaga con `prefers-reduced-motion`). Todo se ve completo sin JavaScript.

## Estructura

```
app/
  (es)/ (ca)/ca/ (en)/en/   un layout raíz por idioma, la portada y un catch-all con las subpáginas
  og/[name]/                imágenes OG de cada página (/og/es-home.png…)
  sitemap.ts · robots.ts · manifest.ts · llms.txt/ · global-not-found.tsx (404 en los tres idiomas)
  favicon.ico · icon.svg · apple-icon.png
  fonts.ts                  Bricolage Grotesque, Hanken Grotesk y Space Mono, servidas desde assets/fonts
  globals.css               importa styles/: base (tokens, superficies, tipos) y una hoja por parte
components/
  RootDocument · LocalePage · SiteHeader · SiteFooter
  sections/                 Hero, Work, Services, Experience, About, Process, Contact
  pages/                    las subpáginas (Pages) y sus piezas (PageParts)
  CaseCard · BrowserFrame   tarjeta de trabajo y marco con la captura (next/image)
  VmvBlocks · NeibrBlocks   bloques de VMV y Neibr que comparten portada y subpáginas
  NeibrDiagram · ApiTerminal  diagrama de Neibr (SVG) y ejemplo de petición y respuesta
  ui/                       AnchorScroll, HeaderSurface y useSequence (cliente) y piezas sin estado
lib/
  routes.json · routes.ts   las 21 URL (también las leen los scripts)
  content.ts                texto de la portada en los tres idiomas
  pages.ts                  títulos, descripciones y texto propio de cada subpágina
  site.ts                   SITE_URL, metadatos, hreflang y JSON-LD por página
  og.tsx                    imagen OG con Bricolage Grotesque (assets/fonts)
  shots.json                capturas disponibles (lo escribe npm run capture)
scripts/                    shots, a11y, motion, lh, seo, links, capture y measure (lib/server.mjs común)
                            subset-fonts.py: subconjuntos de las fuentes en assets/fonts
docs/                       planes, decisiones, preguntas y resultados de las comprobaciones
```

## Comandos

```bash
npm ci
npm run dev        # http://localhost:3000
npm run check      # lint, tipos y build
npm run a11y       # axe + desbordamiento a 320/375 px + texto < 11 px, en las 21 páginas
npm run motion     # reduced motion, sin JS, impresión y el diagrama de Neibr
npm run shots      # capturas a 375 y 1440 px de las portadas (--all: todas las páginas)
npm run lh         # Lighthouse móvil y escritorio
npm run seo        # metadatos, JSON-LD, enlaces internos y anclas, sitemap y 404 de las 21 páginas
npm run links      # enlaces externos con respuesta 200
npm run capture    # capturas de las webs de los proyectos (necesita red)
npm run measure    # alto de cada sección, imágenes y JS de cliente
```

Más detalle en `CLAUDE.md`.

## Despliegue

Vercel. El dominio canónico se lee de la variable `SITE_URL` (por defecto `https://dev.alexasto.com`). Si existen `GOOGLE_SITE_VERIFICATION` o `BING_SITE_VERIFICATION`, la web añade la etiqueta de verificación de Search Console o de Bing.
