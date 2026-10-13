# Portfolio de Alejandro Cabrera

Web personal de Alejandro Cabrera, cofundador de Digital DesAny. Se publica en dev.alexasto.com (el dominio final está en `docs/portfolio-refresh/DECISIONES.md`). Next.js 15 con App Router, Tailwind v4 y Motion. Trilingüe: castellano (por defecto), catalán e inglés.

Si estás ejecutando la renovación de octubre de 2026, el plan está en `docs/portfolio-refresh/PLAN.md` y los hechos y decisiones en `docs/portfolio-refresh/DECISIONES.md`.

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

- **Fondo:** `#14130E`.
- **Gris de texto secundario:** `#807D71` (antes `#6A675D`, que daba 3,3:1).
- **Acento para texto pequeño:** `#D64B6E`.
- **Acento `#C12C52`:** solo en texto de 24 px o más, como el "Cabrera" del hero.

## Comandos

- **Instalar:** `npm ci` (el lockfile es `package-lock.json`). Playwright va fijado a la versión del Chromium preinstalado en las sesiones en la nube (`@playwright/test` 1.56.1, Chromium 1194). En otra máquina, `npx playwright install chromium`.
- **Desarrollo:** `npm run dev` (http://localhost:3000).
- **Build:** `npm run build`; servir el build con `npm run start`.
- **Lint:** `npm run lint` (ESLint 9 con `eslint.config.mjs`; `next lint` está obsoleto). Tipos: `npm run typecheck`.
- **`check`:** `npm run check`. Lint, comprobación de tipos y build.
- **`shots`:** `npm run shots`. Capturas con Playwright a 375 y 1440 px en `/`, `/ca` y `/en` (pantalla inicial y página completa).
- **`a11y`:** `npm run a11y`. axe-core (WCAG 2.2 AA y buenas prácticas) sobre las mismas páginas, más desbordamiento horizontal a 320 y 375 px y texto por debajo de 11 px. Sale con código 1 si hay errores serios o críticos o si algo desborda.
- **`lh`:** `npm run lh`. Lighthouse en móvil y escritorio con el Chromium de Playwright; guarda la mediana de 3 pasadas (`-- --runs N`, `-- --all` para las tres rutas).
- **`seo`:** `npm run seo`. Comprueba rutas estáticas, `lang`, canonical, hreflang, `og:locale`, JSON-LD, sitemap y robots.txt, que cada idioma no lleve textos de los otros dos, y guarda las imágenes OG.
- **`links`:** `npm run links`. Comprueba que los enlaces externos de `/`, `/ca` y `/en` responden 200. Necesita salida a internet.
- **`capture`:** `npm run capture`. Captura a 1440×900 las webs de los proyectos y guarda WebP de 200 KB como máximo en `public/shots/`, más el manifiesto `lib/shots.json`. Necesita salida a internet.

`shots`, `a11y` y `lh` levantan `next start` en el puerto 3100 (o `CHECK_PORT`) y recompilan si el código es más nuevo que el build. Con `BASE_URL` apuntan a otro servidor. Por defecto guardan en `docs/portfolio-refresh/despues/`; `-- --out docs/portfolio-refresh/antes` cambia la carpeta.

**Definición de terminado:** nada está terminado hasta que `check` pasa y `a11y` no da errores serios ni críticos.
