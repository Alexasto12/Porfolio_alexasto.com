# Preguntas y decisiones tomadas sin preguntar

Lo que no cubría `DECISIONES.md`, qué se decidió y por qué. Lo marcado **Pendiente** necesita algo de Alejandro.

## Fase 0

- **ESLint no estaba configurado.** `next lint` pedía elegir configuración de forma interactiva, así que no se podía usar en `check`. Se añade `eslint.config.mjs` con `next/core-web-vitals` y `next/typescript`, y `lint` pasa a `eslint .`. Para que pase se corrigen dos avisos sin cambio visible: el `//` de la barra superior va como `{"//"}` y se quita un `eslint-disable` sin uso.
- **Versión de Playwright.** Se fija `@playwright/test` a 1.56.1 porque es la que corresponde al Chromium preinstalado en la sesión. Si se actualiza, hay que instalar su navegador con `npx playwright install chromium`.
- **Línea base de catalán e inglés.** Antes de la Fase 4 el idioma se elige en el cliente y `/ca` y `/en` no existen. Las capturas y axe de `antes/` cargan `/` con el idioma forzado (localStorage y locale del navegador). Lighthouse de `antes/` solo mide `/`.
- **Lighthouse es ruidoso en el contenedor.** Dos pasadas seguidas dieron 80 y 92 de rendimiento móvil. `lh` hace 3 pasadas y guarda la mediana. Las cifras sirven para comparar antes y después en esta máquina, no como valor absoluto.

## Fase 1

- **La paleta de texto da 4,51:1 justo sobre `#14130E`, y sobre nada más.** Sobre los paneles con tinte claro (`#1C1B15`) `#807D71` y `#D64B6E` bajaban a 4,18:1, y la textura de ruido del fondo también los dejaba por debajo de 4,5:1. Para mantener los valores de `CLAUDE.md` sin tocarlos: los paneles tienen ahora fondo opaco `#14130E` (se distinguen por el borde) y se quita la textura de ruido. El gris `#88857A` que ya existía (5:1) se mantiene para texto secundario.
- **Botón grande al pasar el ratón.** Pasaba a `#E24A72` con texto blanco (3,85:1). Ahora oscurece a `#8B1E3F`.
- **"Hover en el nombre para reanimar"** se mantiene solo en dispositivos con ratón (`@media (hover: hover) and (pointer: fine)`), que era la opción que conserva la función. El nombre animado lleva el texto real oculto para lectores de pantalla y la versión animada con `aria-hidden`.
- **Barra superior en móvil.** Por debajo de 860 px se ocultan el rol, la ubicación y el reloj; por debajo de 480 px también AC_SYSTEMS (desaparece en la Fase 2). Queda "Disponible para proyectos" y el selector de idioma en una sola línea a 320 px.
- **Orden del selector de idioma:** ES, CA, EN, el mismo orden que las rutas `/`, `/ca` y `/en`.
- **Panel oculto de ajustes (Ctrl+Shift+E).** El acento que elige solo cambia texto grande, rellenos y bordes; el texto pequeño usa siempre `#D64B6E` para no romper el contraste.

## Fase 2

- **Pendiente: sin acceso a digitaldesany.com.** La red de la sesión no deja salir a dominios externos (solo GitHub, npm y Google Fonts), así que no he podido comprobar ninguna URL del estudio. Lo que he hecho:
  - "Servicios" enlaza a la portada de digitaldesany.com en el idioma de la ruta (`/es`, `/ca`; en inglés, `/es` porque no hay versión inglesa). Si existe una página de servicios, cambia `desanyHome` en `lib/content.ts`.
  - Las fichas de los casos usan las rutas de `DECISIONES.md` (`/es/casos-exito/...`) en los tres idiomas. No sé la ruta catalana.
  - Hidrotech Bordalló no tiene ruta de ficha en `DECISIONES.md`: va sin enlace.
  - Paula Krebel va sin enlace a su web, porque la URL sale de su ficha y no la he podido leer.
- **Pendiente: nombre exacto del premio.** Está tal cual lo da `DECISIONES.md`: "uno de los proyectos ganadores de los Santander X Spain Awards 2026 (UVic)".
- **Pendiente: traducciones del cierre de Neibr.** `DECISIONES.md` solo da la frase en castellano. Catalán: "Parlar amb un gran operador ens va mostrar problemes del model que el codi no resoldria, i el vam tancar abans de llançar-lo." Inglés: "Talking to a large carrier showed us problems in the model that code wasn't going to fix, so we shut it down before launch."
- **Pendiente: años del recorrido.** Los he calculado con el titular que ya había ("Quince años aprendiendo..."): de los 11 años a 2026 van quince, así que 11 años es 2011 y el resto sale de ahí (12 → 2012, 14 → 2014, 16 → 2016, 19 → 2019, 22 → 2022). Si el año de nacimiento no es 2000, hay que mover todos.
- **Servicios dentro de "Ahora".** El orden de secciones del plan no tiene una sección de servicios aparte, así que las cuatro líneas de DesAny van dentro de "Ahora: Digital DesAny", junto con los casos.
- **WordPress.org** va como una línea al final de Formación, porque `DECISIONES.md` lo agrupa en "Formación y otros" y el plan no le da sección.
- **VMV.** Solo aparecen las ocho capacidades que `DECISIONES.md` deja nombrar. Se quitan la tarjeta de integraciones con DNS y servidores Debian, los detalles del WAF, la lectura con tokens del magazine, el fallback entre proveedores del gateway, y del stack y el ticker SQLite, LiteLLM, VERCEL y KAFKA (detalle interno o proveedores). El ticker estaba solo en castellano; ahora está en los tres idiomas.
- **Datos que desaparecen por no estar en `DECISIONES.md` o contradecirlo:** las 5.000 visitas y las casi 300 rosas de Sant Jordi (ahora "más de 500 rosas" y Reddit), el "en desarrollo" de GOK Thermal, el formato de tracking, la cancelación automática y el onboarding de Neibr, y la gráfica de barras del stress test (eran datos de adorno, no medidos).
- **Contacto.** Se quita "Respondo en menos de 48h": los encargos ahora van a DesAny y no tengo ese compromiso del estudio. En catalán, "Construïm alguna cosa robusta" (antes "robust", que no concordaba).
- **Hero.** Se quitan los dos párrafos antiguos ("microservicios de alto rendimiento", "elegancia estructural") porque los sustituye la línea de `DECISIONES.md`. El panel de stack queda como "Con lo que trabajo", sin la autoevaluación.
- **Panel oculto de ajustes.** Las variantes de tarjetas (stack, split, list) y de recorrido (rail, compact) siguen funcionando, ahora solo con CSS a partir de `html[data-cards]` y `html[data-timeline]`, para que las secciones puedan renderizarse en el servidor en la Fase 4.

## Fase 3

- **Pendiente: no hay ninguna captura real.** El script existe y funciona (`npm run capture`, probado contra un servidor local: 1440×900 a WebP de 43 KB), pero desde esta sesión las siete webs fallan con `ERR_TUNNEL_CONNECTION_FAILED` porque la red solo permite GitHub, npm y Google Fonts: larasoak.art, gokthermal.com, rosesstjordi.com, neibr.es, peer2stream.alexasto.com/discover, alexasto12.github.io/ProjectePokeAPI y la ficha de Paula Krebel en digitaldesany.com (de donde sale la URL de su web). Como dice el plan, esas tarjetas van sin marco.
  - Para añadirlas: en una máquina con red, `npm run capture` (o `-- --only larasoak,roses`), revisa las imágenes de `public/shots/` y haz commit de `public/shots/*.webp` y `lib/shots.json`. Las tarjetas muestran la imagen en cuanto el manifiesto la tiene, con `next/image`, `alt` en los tres idiomas, carga diferida y `sizes`.
  - Otra opción: añadir esos dominios a "Allowed domains" en la configuración de red del entorno de Claude Code y volver a lanzar la fase.
- **Paula Krebel:** el script busca en su ficha el primer enlace externo que no sea de redes ni de DesAny. Si la ficha no enlaza su web, la tarjeta sigue sin captura.
- **neibr.es** tiene hueco para su captura dentro del bloque de Neibr, debajo del enlace.

## Fase 4

- **Rutas.** Un layout raíz por idioma con grupos de rutas: `app/(es)` sirve `/`, `app/(ca)/ca` sirve `/ca` y `app/(en)/en` sirve `/en`. Así `<html lang>` sale del servidor y las tres páginas son estáticas, sin middleware ni reescrituras. Las secciones ya son componentes de servidor: el JS de la página baja de 24 kB a 1,85 kB.
- **El selector de idioma son enlaces**, no botones con `aria-pressed` como en la Fase 1: cambiar de idioma ahora es cambiar de página, y un enlace (`hreflang`, `lang`, `aria-current="page"` en el actual) funciona sin JavaScript y lo siguen los buscadores. Mantiene los nombres "Español", "Català" y "English".
- **No se guarda la preferencia de idioma.** El plan lo permite pero no lo pide, y sin redirección automática nadie la leería.
- **Pendiente: página 404.** Sin un layout raíz común, Next sirve su 404 por defecto (en inglés y sin estilos). Una 404 propia en tres idiomas necesita `experimental.globalNotFound`, que es experimental en Next 15, así que no lo activo sin tu visto bueno.
- **`SITE_URL`.** El dominio se lee de la variable de entorno `SITE_URL` (por defecto `https://dev.alexasto.com`). Cuando alexasto.com apunte a esta web, hay que poner `SITE_URL=https://alexasto.com` en Vercel; no he tocado su configuración.
- **`lastmod` del sitemap** sale de `CONTENT_UPDATED` en `lib/site.ts` (2026-10-13), no de la fecha del build. Hay que actualizarlo al cambiar el contenido.
- **Imagen OG.** Una por idioma, con Bricolage Grotesque desde `assets/fonts/` (WOFF de @fontsource, licencia OFL incluida; `next/og` no lee WOFF2). Next añade un sufijo a su URL (`/opengraph-image-xxxx`) porque vive en un grupo de rutas; las etiquetas `og:image` apuntan a la buena. Se quita `twitter-image`: X usa la imagen OG.
- **JSON-LD.** Se quita la lista `subjectOf` con webs de terceros y la marca "Alexasto" del título; "Alexasto" y "alexasto12" quedan como `alternateName`. Organization Digital DesAny lleva como `founder` a Alejandro y a Oriol Tamborero. El premio va en `award` con el texto de `DECISIONES.md` (pendiente de confirmar el nombre).
- **Comprobación.** `npm run seo` valida todo lo de esta fase y guarda las imágenes OG, el sitemap y robots.txt en `despues/seo/`.
