# alexasto.com

Web personal de **Alejandro Cabrera**, desarrollador backend y full-stack y cofundador de Digital DesAny. Una sola página en castellano (`/`), catalán (`/ca`) e inglés (`/en`), generada en estático.

Next.js 15 (App Router, componentes de servidor), TypeScript, Tailwind CSS v4 y Motion. Sin dependencias de pago. Las reglas de contenido, tono y accesibilidad están en `CLAUDE.md`; los hechos publicables, en `docs/portfolio-refresh/DECISIONES.md`; la dirección visual, en `docs/portfolio-v2/DISENO.md`.

## Diseño

Papel, tinta y vino. La base es papel (`#F4EFE2`), con la retícula de 12 columnas a la vista y un grano muy suave. Experiencia, "la sala de máquinas", va en tinta (la página se funde de papel a tinta al entrar), igual que Principios y el pie. El vino (`#C12C52`) es la banda del stress test de Neibr y el Contacto entero. Cada sección declara su superficie con `data-surface` y los componentes solo usan los tokens de esa superficie, así que el contraste se mantiene en las tres (detalle en `CLAUDE.md`).

Imágenes y gráficos: capturas reales de cada web en un marco de navegador propio, un mapa de sistema de VMV y un diagrama de la asignación de Neibr, los dos en SVG hecho a mano. El movimiento explica algo del contenido y se apaga con `prefers-reduced-motion`; todo se ve completo sin JavaScript.

## Estructura

```
app/
  (es)/ (ca)/ca/ (en)/en/   un layout raíz por idioma, la página y su imagen OG
  sitemap.ts · robots.ts · manifest.ts · llms.txt/ · icon.tsx · apple-icon.tsx
  fonts.ts                  Bricolage Grotesque (variable, con anchura), Hanken Grotesk y Space Mono
  globals.css               importa styles/: base (tokens, superficies, tipos) y una hoja por sección
components/
  RootDocument · LocalePage · SiteHeader · SiteFooter
  sections/                 Hero, Now (Digital DesAny), Experience, Timeline, Education, Principles, Contact
  BrowserFrame              marco de navegador con la captura (next/image) y desplazamiento al pasar el ratón
  ContactSheet              hoja de contactos del hero
  VmvMap · NeibrDiagram     mapa de sistema de VMV y diagrama de Neibr (SVG)
  ApiTerminal               petición y respuesta de la API de Neibr
  ui/                       islas de cliente (Counter, Scramble, LocalTime, HeaderSurface) y piezas sin estado
lib/
  content.ts                todo el texto en los tres idiomas
  site.ts                   SITE_URL, metadatos, hreflang y JSON-LD por idioma
  og.tsx                    imagen OG con Bricolage Grotesque (assets/fonts)
  shots.json                capturas disponibles (lo escribe npm run capture)
scripts/                    shots, a11y, lh, seo, links, capture y measure (lib/server.mjs común)
docs/                       planes, decisiones, preguntas y resultados de las comprobaciones
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
npm run measure    # alto de cada sección, imágenes y JS de cliente
```

Más detalle en `CLAUDE.md`.

## Despliegue

Vercel. El dominio canónico se lee de la variable `SITE_URL` (por defecto `https://dev.alexasto.com`).
