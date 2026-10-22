# Portfolio de Alejandro Cabrera

Web personal de Alejandro Cabrera, cofundador de Digital DesAny. Se publica en dev.alexasto.com (el dominio final está en `docs/portfolio-refresh/DECISIONES.md`). Next.js 15 con App Router y Tailwind v4; el movimiento es CSS, sin librerías de animación. Trilingüe: castellano (por defecto), catalán e inglés.

Si estás ejecutando la renovación de octubre de 2026, el plan está en `docs/portfolio-refresh/PLAN.md` y los hechos y decisiones en `docs/portfolio-refresh/DECISIONES.md`.

La dirección visual es la de `docs/portfolio-v2/DISENO.md` (papel, tinta y vino), que sustituye a la de `DECISIONES.md`. Su plan está en `docs/portfolio-v2/PLAN.md`. La ronda 2 (`docs/portfolio-v2/RONDA2.md`, comentarios de Alejandro) manda sobre `DISENO.md` donde no coinciden: portada en orden de venta, subpáginas para SEO y fuera la retícula, el grano y los efectos decorativos.

Las 21 URL (portada y seis subpáginas en tres idiomas) salen de `lib/routes.json`, que leen la app y los scripts. Una página nueva se añade ahí, en `lib/pages.ts` (título, descripción y texto) y en `components/pages/Pages.tsx`.

## Reglas fijas

- **Cero dependencias de pago.** Nada que exija un plan de pago, ni siquiera con capa gratuita. Las herramientas de comprobación (Playwright, axe-core, Lighthouse) van como devDependencies.
- **Tres idiomas siempre iguales.** Todo texto visible existe en castellano, catalán e inglés y dice lo mismo en los tres. Si cambias una frase en un idioma, cámbiala en los otros dos.
- **Sin rayas.** Nada de `—` ni `–` en textos nuevos o reescritos: usa comas, puntos, dos puntos o paréntesis.
- **Tono.** Primera persona, frases cortas, hechos y cifras. Sin autoetiquetas ("arquitecto visual", "ingeniero de combate"), sin barras de autoevaluación y sin superlativos que no se puedan comprobar.
- **No inventes datos.** Solo se publican hechos que estén en `DECISIONES.md` o que ya estén en la web y no lo contradigan. Si un texto necesita un dato que no tienes, escríbelo sin cifra y apúntalo en `docs/portfolio-refresh/PREGUNTAS.md`.
- **VMV Cosmetic Group se describe por capacidades y escala.** Nunca publiques cómo funcionan sus defensas, nombres internos de sistemas, columnas o esquemas del ERP, proveedores ni incidentes.
- **Accesibilidad: WCAG 2.2 AA como mínimo.**
  - Contraste de texto de al menos 4,5:1 (3:1 en texto grande).
  - Foco visible en todo lo que se pueda enfocar.
  - Áreas táctiles de al menos 24×24 px.
  - Ningún texto por debajo de 11 px.
- **Fuera de tu alcance.** No toques dominios, DNS, la configuración de Vercel ni el CI.

## Paleta de texto accesible

Tres superficies (`docs/portfolio-v2/DISENO.md`). Cada sección declara `data-surface` y los componentes solo usan sus tokens (`--bg`, `--fg`, `--fg-2`, `--accent`, `--accent-lg`, `--mark`, `--on-mark`), nunca colores sueltos.

- **Papel** `#F4EFE2` (base):
  - Texto `#14130E` (16,2:1).
  - Secundario `#6B675A` (4,9:1).
  - Acento `#C12C52` (4,9:1), en texto de cualquier tamaño.
- **Tinta** `#14130E` (Experiencia, Cómo trabajo y footer):
  - Texto `#F4EFE2`.
  - Secundario `#B6B2A2`.
  - Acento de texto `#DE5A7A` (5,2:1; 4,6:1 sobre una línea de la retícula). Antes era `#D64B6E`, que daba 4,5:1 justo y bajaba de ahí sobre las líneas.
  - `#C12C52` solo en rellenos, bordes o texto de 24 px o más.
- **Vino** `#C12C52` (banda del stress test y Contacto):
  - Texto `#F4EFE2` (4,9:1) en cualquier tamaño.
  - `#14130E` (3,3:1) y `#F4EFE2` al 85 % solo en texto grande.
- Desde la ronda 2 no hay retícula ni grano: cada superficie es un color liso. Si se vuelve a poner algo debajo del texto, hay que volver a medir el contraste encima.

## Comandos

- **Instalar:** `npm ci` (el lockfile es `package-lock.json`). Playwright va fijado a la versión del Chromium preinstalado en las sesiones en la nube (`@playwright/test` 1.56.1, Chromium 1194). En otra máquina, `npx playwright install chromium`.
- **Desarrollo:** `npm run dev` (http://localhost:3000).
- **Build:** `npm run build`; servir el build con `npm run start`.
- **Lint:** `npm run lint` (ESLint 9 con `eslint.config.mjs`; `next lint` está obsoleto). Tipos: `npm run typecheck`.
- **`check`:** `npm run check`. Lint, comprobación de tipos y build.
- **`shots`:** `npm run shots`. Capturas con Playwright a 375 y 1440 px en `/`, `/ca` y `/en` (pantalla inicial y página completa); `-- --all` hace todas las páginas. `-- --locales es` y `-- --pages home,neibr` acotan (también en `a11y`, `motion` y `lh`).
- **`a11y`:** `npm run a11y`. axe-core (WCAG 2.2 AA y buenas prácticas) en las 21 páginas a 375 y 1440 px, más desbordamiento horizontal a 320 y 375 px y texto por debajo de 11 px. Sale con código 1 si hay errores serios o críticos o si algo desborda.
- **`motion`:** `npm run motion`. Cuatro modos en las páginas con el diagrama de Neibr (portadas, Neibr y desarrollo backend), a 375 y 1440 px. Con reduced motion: ninguna animación en marcha, las secuencias en su estado final, ningún texto oculto o recortado y las líneas SVG dibujadas. Sin JavaScript: recorre la página y todo el texto se ve. Impresión: desde arriba, nada oculto ni a medio dibujar. Secuencias: el diagrama de Neibr se reproduce al entrar en pantalla y acaba completo (si ya está en pantalla al cargar, se queda completo). `-- --locales es` limita los idiomas.
- **`lh`:** `npm run lh`. Lighthouse en móvil y escritorio con el Chromium de Playwright; guarda la mediana de 3 pasadas (`-- --runs N`, `-- --all` para las tres portadas).
- **`seo`:** `npm run seo`. En las 21 páginas: estáticas, `lang`, canonical, hreflang, `og:locale`, título de 60 caracteres como mucho, descripción de 110 a 160, un solo h1, JSON-LD con todos los `@id` resueltos, sin rayas, sin textos de los otros idiomas e imagen OG de 1200×630. Además, que todos los enlaces internos y sus `#anclas` existen, el sitemap, robots.txt, la redirección de `/es` y la 404. Guarda las imágenes OG de las portadas.
- **`links`:** `npm run links`. Comprueba que los enlaces externos de las 21 páginas responden 200. Necesita salida a internet. El perfil personal de LinkedIn sale con 999 porque LinkedIn rechaza las peticiones automáticas; el enlace está bien.
- **`capture`:** `npm run capture`. Captura con una ventana de 1440×900 las webs de los proyectos (hasta tres pantallas de alto, para el desplazamiento de `BrowserFrame`) y guarda WebP de 200 KB como máximo en `public/shots/`, más el manifiesto `lib/shots.json`. Necesita salida a internet.
- **`measure`:** `npm run measure`. Alto de cada sección de `/` a 1440 y 375 px, número de imágenes y SVG, y JS de cliente transferido.
- **Retrato:** `node scripts/portrait.mjs <original.jpg>` (a mano). Rehace `public/photos/alejandro-cabrera.jpg` desde el original de 2000×2000 (que no está en el repositorio): recorte 4:5, sin el cable de la pared, en tinta y papel y sin metadatos.
- **Fuentes:** `python3 scripts/subset-fonts.py` (a mano, necesita fonttools y brotli). Regenera los subconjuntos de `assets/fonts/` desde Google Fonts: solo los caracteres de los tres idiomas y los pesos en uso (Bricolage 600 a 800 con la anchura fija al 80 %, Hanken 400 a 500 y Space Mono 400). Si un texto nuevo usa un carácter que no está en `UNICODES`, añádelo ahí y vuelve a ejecutarlo; el script dice qué caracteres no tiene la fuente. No pidas en CSS pesos fuera de esos rangos: no hay negrita sintética (`font-synthesis-weight: none`).

`shots`, `a11y`, `motion`, `lh`, `seo`, `links` y `measure` levantan `next start` en el puerto 3100 (o `CHECK_PORT`; fallan si ya está ocupado) y recompilan si el código, `assets/` o la configuración son más nuevos que el build. Con `BASE_URL` apuntan a otro servidor. Por defecto guardan en `docs/portfolio-refresh/despues/`; `-- --out docs/portfolio-refresh/antes` cambia la carpeta.

**Definición de terminado:** nada está terminado hasta que `check` pasa y `a11y` no da errores serios ni críticos.
