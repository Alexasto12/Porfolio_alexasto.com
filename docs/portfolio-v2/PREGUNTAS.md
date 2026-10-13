# Preguntas y decisiones tomadas sin preguntar (v2)

Lo que no cubrían `DISENO.md`, `DECISIONES.md` ni `CLAUDE.md`, qué se decidió y por qué. Lo marcado **Pendiente** necesita algo de Alejandro.

## Fase 0

- **Red.** Esta vez la sesión sí tiene salida a internet: responden larasoak.art, paulakrebel.com, gokthermal.com, neibr.es, digitaldesany.com, peer2stream.alexasto.com y alexasto12.github.io.
- **Pendiente: rosesstjordi.com no funciona.** Por HTTPS da error 525 de Cloudflare y por HTTP sirve una página de aparcamiento de Arsys. La ficha del caso en digitaldesany.com (`/es/casos-exito/rosesstjordi`) enlaza a **https://rosesstjordi.cat**, que sí responde ("Rosa de Sant Jordi 2026"). La captura se hace de rosesstjordi.cat. Hay que confirmar que es el dominio bueno y actualizar `DECISIONES.md`.
- **Paula Krebel:** su web es https://paulakrebel.com (lo dice el plan y coincide con el enlace de su ficha). El script ya no la busca en la ficha.
- **Capturas de hasta tres pantallas.** `DISENO.md` pide que la captura se desplace dentro del marco al pasar el ratón, y con una captura de 1440×900 no hay nada que recorrer. El script sigue usando una ventana de 1440×900, pero guarda hasta 2.700 px de alto (tres pantallas) y el marco enseña la primera. Lara's Oak, Roses, Neibr, Peer2Stream y la Pokédex ocupan exactamente una pantalla (diseños a pantalla completa o con scroll interno), así que en esas el marco no se mueve. Paula Krebel (2.700 px) y GOK Thermal (1.244 px) sí.
- **Banner de cookies de GOK Thermal.** Aparecía unos segundos después de cargar. El script espera, pulsa la opción menos permisiva ("Solo necesarias", "Rechazar" o equivalentes) y, si no hay ninguna, sigue. También espera a que terminen de cargar las imágenes y reintenta una vez si la web tarda (GOK Thermal no llega nunca a "networkidle" y a veces se queda colgada).
- **Contenido de terceros dentro de las capturas.** Son las webs tal como están hoy: Peer2Stream enseña carteles de películas de TMDB, y la portada de neibr.es enseña el texto "api.neibr.es" en pequeño. La renovación anterior quitó api.neibr.es de los textos, no de capturas de la web real.
- **Línea base con capturas.** El plan pide capturar antes de guardar la línea base, así que `antes/` es el diseño actual ya con las 7 capturas dentro de las tarjetas (7 imágenes, 0 SVG). La versión publicada sin imágenes es la de `docs/portfolio-refresh/despues/`.
- **Medidas.** Se añade `npm run measure`: alto de cada sección a 1440 y 375 px, número de imágenes y SVG, y JS de cliente transferido. Sirve para los objetivos de altura (Fases 3 y 4) y para el presupuesto de 35 KB (Fase 6). Línea base: 112,3 KB de JS (109 kB de "First Load JS" según `next build`), Experiencia 3.439 px y Recorrido 2.243 px a 1440.
- **Fichas de DesAny en catalán y página de servicios.** Ahora se pueden comprobar: existen `/ca/casos-exit/lara-oak`, `/ca/casos-exit/paula-krebel` y `/ca/casos-exit/rosesstjordi`, y también `/es/servicios` y `/ca/serveis`. Se usarán en la Fase 2 (solo cambian enlaces, no textos). Hidrotech Bordalló sigue sin ficha: `/es/casos-exito/hidrotech-bordallo` lleva a la página del servicio de redes, así que su tarjeta sigue sin enlace.

## Fase 1

- **Transición de papel a tinta con `opacity`, no con `background-color`.** `DISENO.md` pide un color de fondo animado por scroll y, a la vez, que solo se animen `transform`, `opacity`, `clip-path` y `stroke-dashoffset`. Para cumplir las dos cosas, detrás del contenido hay una capa fija de tinta cuya opacidad sigue la línea de tiempo de `#experiencia` (`view-timeline`): sube en el primer 30 % de la entrada y baja en el último 30 % de la salida. Experiencia es transparente solo cuando el navegador lo soporta y no hay reduced motion; si no, tiene su fondo de tinta y el cambio es seco.
- **El header sigue a la superficie de debajo** con un IntersectionObserver sobre una línea de 1 px a media altura del header. Si cruza una banda dentro de una sección (la banda vino de Neibr), gana la banda.
- **Fuera las entradas genéricas.** `Reveal` animaba la entrada de casi cada bloque con JavaScript. No explicaba nada del contenido, así que desaparece (y con él `useReveal`). El movimiento que queda o llega en las fases siguientes es el que explica algo.
- **Hover sin transiciones de color.** Los cambios de color al pasar el ratón son instantáneos; solo se anima el desplazamiento de las flechas y de las capturas, para cumplir la regla de propiedades animables.
- **Limpieza extra:** además de `lucide-react` y `class-variance-authority`, se van `clsx`, `tailwind-merge` y `lib/cn.ts`, que tampoco se usaban. `TimelineRail` (JS que cambiaba un `height` en cada scroll) pasa a CSS con `scaleY` y `animation-timeline`.
- **Estilos en línea que quedan:** las imágenes OG, `icon` y `apple-icon` (Satori, el motor de `next/og`, solo acepta estilos en línea) y el desplazamiento de cada captura en `BrowserFrame` (`--shift`, calculado con el alto de la imagen).
- **Bricolage Grotesque variable con eje de anchura.** Los titulares van estrechos (`font-stretch: 80 %`) y las cifras a anchura completa. La fuente pasa de 41 KB a 78 KB (WOFF2, latin).
- **`overflow-x: clip` en `body`** en lugar de `hidden`: con `hidden` el `body` pasa a ser un contenedor de scroll y `position: sticky` deja de funcionar.
- **Margen lateral en móvil de 16 px** (`max(16px, 4vw)`, antes `max(20px, 4vw)`).
- **`theme-color` y el manifest** pasan a papel (`#F4EFE2`), que es el color con el que empieza la página.
