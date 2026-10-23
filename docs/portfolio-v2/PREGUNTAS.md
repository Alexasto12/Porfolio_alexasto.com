# Preguntas y decisiones tomadas sin preguntar (v2)

Lo que no cubrían `DISENO.md`, `DECISIONES.md` ni `CLAUDE.md`, qué se decidió y por qué. Lo marcado **Pendiente** necesitaba algo de Alejandro; sus respuestas están al final y cada punto dice cómo quedó.

## Fase 0

- **Red.** Esta vez la sesión sí tiene salida a internet: responden larasoak.art, paulakrebel.com, gokthermal.com, neibr.es, digitaldesany.com, peer2stream.alexasto.com y alexasto12.github.io.
- **Resuelto: rosesstjordi.com no funcionaba.** Por HTTPS da error 525 de Cloudflare y por HTTP sirve una página de aparcamiento de Arsys. La ficha del caso en digitaldesany.com (`/es/casos-exito/rosesstjordi`) enlaza a **https://rosesstjordi.cat**, que sí responde ("Rosa de Sant Jordi 2026"). La captura se hace de rosesstjordi.cat. Había que confirmar el dominio bueno. **Respuesta:** el DNS de .com y .es estaba mal configurado y ya apunta bien; los tres dominios sirven la misma web. Se vuelve a rosesstjordi.com, el de `DECISIONES.md`.
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
- **Bricolage Grotesque variable con eje de anchura.** Los titulares van estrechos (`font-stretch: 80 %`) y las cifras a anchura completa. La fuente pasa de 41 KB a 78 KB (WOFF2, latin). (Cambiado en la Fase 6: anchura fija.)
- **`overflow-x: clip` en `body`** en lugar de `hidden`: con `hidden` el `body` pasa a ser un contenedor de scroll y `position: sticky` deja de funcionar.
- **Margen lateral en móvil de 16 px** (`max(16px, 4vw)`, antes `max(20px, 4vw)`).
- **`theme-color` y el manifest** pasan a papel (`#F4EFE2`), que es el color con el que empieza la página.

## Fase 2

- **Entrada del hero en CSS, no con `motion/react`.** Las letras del nombre suben con 40 ms entre una y otra y después aparece el resto (1,07 s en total). Con CSS la página está completa sin JavaScript, no cuesta JS y no depende de la hidratación. `motion/react` queda para las secuencias que lo necesitan (Neibr). (Cambiado en la Fase 6: ya no se usa.) El scramble del nombre ya no se lanza al cargar: solo al pasar un ratón (`hover: hover` y `pointer: fine`) y nunca con reduced motion.
- **Panel "ahora mismo".** La hora de Granollers solo existe con JavaScript (una página estática no puede saberla): sin JS esa línea queda sin hora. Se queda dentro del panel la lista "Con lo que trabajo", que `DISENO.md` no menciona, para no perder contenido.
- **Hoja de contactos:** cinco capturas (Lara's Oak, Roses de Sant Jordi, Paula Krebel, GOK Thermal y Peer2Stream), numeradas como fotogramas y enlazadas a su caso en la página. En escritorio se desliza a la izquierda durante la primera pantalla de scroll (`scroll(root)`); si una miniatura recibe el foco de teclado, la tira vuelve a su sitio y caben las cinco (para que ningún enlace con foco quede oculto, WCAG 2.4.11). Sin soporte o con reduced motion caben las cinco y no se mueve. En móvil es un carrusel con scroll-snap. Las imágenes llevan `alt=""` porque el texto del enlace ya nombra el caso.
- **Servicios numerados 01 a 04.** La renovación anterior quitó esos números por decorativos; `DISENO.md` los vuelve a pedir. Van en el orden de `DECISIONES.md` (webs, redes, automatizaciones, software), con el glifo de cada uno, no en el orden en que los lista `DISENO.md`.
- **Bento de casos.** Cada caso lleva nombre, su frase de siempre y los enlaces, sin las etiquetas de tecnologías. Las cuatro etiquetas de Hidrotech (reels, LinkedIn, YouTube y email) son los canales que pide `DISENO.md` como chips grandes.
- **Textos nuevos (en los tres idiomas):** "Ahora mismo", "hora local", "Mi estudio", "Algunos trabajos" y "Más sobre el estudio en digitaldesany.com".
- **Enlaces de DesAny:** las fichas de `/ca` van a su versión catalana (`/ca/casos-exit/...`), "servicios" va a `/es/servicios` y `/ca/serveis` (en inglés, la española) y la línea final a la portada del estudio.
- **Resuelto (sigue de la Fase 0):** el enlace y el `alt` de Roses de Sant Jordi decían rosesstjordi.cat, también en `llms.txt`. Tras la respuesta de Alejandro vuelven a rosesstjordi.com, y la captura se ha repetido desde ese dominio.
- **Impresión:** al imprimir, Experiencia lleva su fondo de tinta (la capa del fundido depende del scroll).

## Revisión de la Fase 1 (cinco revisores y un verificador escéptico por hallazgo)

Confirmaron 9 hallazgos y descartaron 4. Arreglados en la Fase 3:

- **El fundido dejaba texto sobre un fondo a medio camino.** La capa de tinta tardaba un 30 % de pantalla en llegar a opaca, y para entonces "03 Experiencia" y el final de GOK ya estaban en pantalla (contraste de hasta 1,3:1 en `#D64B6E`). Ahora el fundido de entrada dura los primeros 64 px (dentro del relleno superior de la sección, que es de 80 a 96 px) y el de salida los últimos 40 px (el relleno inferior es de 48 a 64 px). Comprobado con Playwright a 1440 y 375: cuando aparece el primer texto la tinta ya está al 100 %, y al salir el último texto ya ha pasado. Son dos capas (una para entrar y otra para salir) porque dos animaciones de `opacity` en el mismo elemento se pisan. El `@supports` también exige `timeline-scope`.
- **La retícula y el grano bajaban algunos textos de su mínimo.** Con las líneas al 6 % y el grano al 4 %, `#6B675A` y `#C12C52` bajaban a 4,0:1 justo encima de una línea, y `#D64B6E` sobre tinta (4,51:1 en liso) bajaba a 4,05:1 con cualquier línea. Decisión: la regla de accesibilidad de `CLAUDE.md` manda sobre los porcentajes de `DISENO.md`. En papel la retícula baja al 2,5 % y el grano a un máximo del 1,5 %. En tinta la retícula se queda al 5 % y el acento de texto pequeño pasa a `#DE5A7A` (5,2:1 en liso, 4,6:1 sobre una línea). En vino la retícula va al 5 %. Todo queda en `CLAUDE.md`.
- **La selección de texto era invisible sobre vino** (fondo vino sobre vino). Ahora usa los tokens de la superficie (`--fg` sobre `--bg`). Los colores de la terminal pasan a tokens (`--term-*`).
- **`scroll-padding-top` (72 px) era menor que el header entre 861 y 1279 px** (80 px, porque el índice baja a su propia fila) y había un hueco entre 860 y 861 px con zoom. Ahora 96 px hasta 1279 y 64 px desde 1280, con sintaxis de rango (`width > 860px`).
- **La cascada:** los CSS de cada sección se importaban antes que la base y `.sec` les pisaba el relleno (y `.hover-only` la pista del hero). Arreglado en la Fase 2 con `app/styles/base.css`.
- **`sizes` de algunas capturas** no coincidía con su ancho real; ajustado a 400 px (columnas de 4) y 700 px (columnas de 7).
- **Los puntos de la terminal** habían perdido su CSS; la barra ya no los lleva.
- **Descartados:** que el `@supports` solo mirara `view()` (no hay navegador con `view()` y sin `timeline-scope`, aunque ahora se comprueban los dos), que el desplazamiento del marco no funcione en 5 de 7 capturas (está documentado en la Fase 0) y un `sizes` algo grande en la captura de Neibr (ya no se usa).

## Fase 3

- **Experiencia mide 2.389 px a 1440** (2.393 en catalán y 2.389 en inglés), frente a 3.439 antes. Para llegar a 2.400 con todo el contenido:
  - **Leyenda de VMV de una línea por capacidad**, como pide `DISENO.md` ("una leyenda breve: una línea por nodo"): el nodo y el título de la capacidad. La segunda frase de cada capacidad (por ejemplo "con un patrón anti-corrupción" o "API compatible con OpenAI") deja de verse; sigue en `lib/content.ts`. La plataforma de magazine conserva su enlace a la demo pública.
  - **Ocho líneas para ocho nodos, no exactamente una por nodo:** "ERP AS/400" y "Puente Java 21" comparten capacidad, y "32 dominios" lleva dos (el magazine y las copias de seguridad), para no perder ninguna de las ocho.
  - **Neibr sin etiquetas de tecnologías y sin la frase de la asignación:** el diagrama ya cuenta el prefiltro por bounding box y Haversine paso a paso, y la frase del stack ("Go (Fiber), PostgreSQL y Redis") va en la banda vino con la de seguridad (API keys, idempotencia, HMAC y ledger). Las tres frases salen del texto que ya había, partido en tres.
  - **La terminal va dentro de la banda vino**, al lado de las cifras del stress test: es la petición que la API servía a ese ritmo. Su barra lleva el título del endpoint ("Crear envío y asignar vecino") en lugar de "shipments.http".
- **Mapa de VMV:** "Mapa de lo que llevaba (esquema)". Un bus horizontal con "20 microservicios" y los ocho nodos de `DISENO.md`, sin nombres internos. Las conexiones se dibujan con el scroll (CSS, `view-timeline`): primero el bus, después los ramales y por último WAF → dominios y ERP → puente. En móvil, el mismo mapa en vertical para que ningún texto baje de 11 px.
- **Diagrama de Neibr:** "Cómo se asigna un vecino (esquema)", con la nota "Puntos de ejemplo, no datos reales" (texto nuevo, en los tres idiomas). Puntos fijos sacados de un generador con semilla. El vecino más cercano está a 46,9 m y se muestra como "47 m", la misma distancia que devuelve la terminal. Los cuatro pasos (textos nuevos a partir de `DISENO.md` y `DECISIONES.md`) se reproducen una vez al entrar en pantalla, con una barra que marca el paso en curso (con `motion/react` hasta la Fase 6, ahora con CSS).
- **Terminal:** la petición se escribe carácter a carácter (`clip-path` en pasos) y la respuesta llega después. Con `motion/react` también.
- **Cómo se protege el contenido:** el HTML del servidor trae el diagrama y la terminal completos. Solo si hay JavaScript, no hay reduced motion y el bloque aún no está en pantalla, se oculta para reproducirlo. Y solo después de que las funciones de Motion hayan cargado: antes, el estado oculto no se aplicaba y la secuencia no arrancaba.
- **Cifras con contador:** las cuatro del stress test (2,9; ~968; < 100 ms; 0) usan el contador que ya existía, con prefijo y sufijo.
- **La captura de neibr.es ya no se muestra:** `DISENO.md` no le da sitio en el nuevo bloque de Neibr. Sigue en `public/shots/`.

## Fase 4

- **Recorrido mide 1.058 px a 1440** (946 en catalán e inglés, donde el titular cabe en dos líneas), frente a 2.243 antes. El límite era 1,2 pantallas (1.080 px a 900 de alto).
- **Hitos en una o dos líneas, como pide `DISENO.md`:** año, título y lugar. Los nueve hitos siguen, en tres etapas (Hardware 2011-2016, Soporte y formación 2019-2022, Desarrollo 2024-2026; "Hardware" igual en los tres idiomas, "Suport i formació" y "Support and study"). El párrafo largo de cada hito y la etiqueta de tipo (hito, formación, trabajo, estudio) dejan de verse; siguen en `lib/content.ts`. Así se pierde a la vista, por ejemplo, el detalle de los 9.600 baudios de Automated Transactions; el hito sigue con su título.
- **El raíl de años es decorativo** (`aria-hidden`): repite los años, que la lista de cada etapa ya da a todo el mundo. Se dibuja de izquierda a derecha con el scroll y los años de cada etapa aparecen al pasar la línea. En móvil no hay raíl horizontal: las etapas van en vertical con una línea a la izquierda que se dibuja hacia abajo.
- **Cabecera partida** (`sec-head--split`): en pantallas anchas, la frase de introducción va al lado de la última línea del titular, en Experiencia, Recorrido, Formación y Principios.
- **Formación:** Peer2Stream y la Pokédex a 6 columnas cada una, con su captura, créditos, tecnologías y enlaces. La línea de WordPress.org va debajo, más pequeña.
- **Principios:** el número va en contorno (`-webkit-text-stroke` de 1,5 px en el acento) y solo si el navegador lo dibuja; si no, en color sólido. `DISENO.md` dice "el título y una frase", pero cada principio tiene tres frases y se quedan las tres, para no recortar contenido sin necesidad (aquí no hay un objetivo de altura que lo pida).

## Fase 5

- **Contacto en vino a todo el ancho:** "Construyamos algo robusto." a tamaño de titular de portada, en papel. Debajo, la frase de siempre y la nota de encargos, y los dos botones grandes (escribir a DesAny, relleno papel con texto tinta; WhatsApp, con borde) en una fila propia para que no se partan. Al final, una lista con flecha: encargos (info@digitaldesany.com), personal (contact@alexasto.com, con "Para todo lo demás, escríbeme a mí.") y los cuatro perfiles. Todo el texto sobre vino va en papel (4,9:1).
- **Imagen OG nueva** en los tres idiomas: papel con la retícula, una línea de tinta arriba, "Alejandro" en tinta y "Cabrera" en vino, el título de cada idioma, el dominio en vino y "Granollers". Sigue siendo Bricolage Grotesque desde `assets/fonts/` (las versiones estáticas: Satori no lee la variable, así que aquí no hay eje de anchura).
- **README:** el que había ya no decía "Systems Architect" ni "base papel clara" (lo corrigió la renovación anterior). Se reescribe para el diseño nuevo: superficies, estructura de componentes y hojas de estilo, y el comando `measure`.
- **El pie** ya iba en tinta desde la Fase 1; no cambia de contenido.

## Fase 6

- **Fuera `motion/react`.** `DISENO.md` lo nombra para las secuencias orquestadas, pero al final solo lo usaban el diagrama de Neibr y la terminal, y costaba JS y tiempo de carga. Ahora las dos secuencias son transiciones de CSS: un hook pequeño (`useSequence`) pone `data-phase` en `hidden` mientras el bloque está fuera de pantalla y en `play` cuando entra, y cada pieza lleva su retardo en una variable (`--d`). Las demás animaciones ya eran CSS. Se desinstala `motion`. Sin JavaScript, con reduced motion o al imprimir, las dos se ven completas.
- **Fuentes propias en subconjunto** (`scripts/subset-fonts.py`, `assets/fonts/`): solo los caracteres de los tres idiomas y los pesos que se usan. Bricolage pasa a 24 KB, Hanken Grotesk a 14 KB y Space Mono a 11 KB. Las licencias OFL van al lado.
- **Bricolage con anchura fija (80 %), sin el eje de anchura.** Se aparta de `DISENO.md` ("con ejes de anchura y peso"): con el eje de anchura la fuente pesa el doble, y el LCP en móvil no bajaba de 2,5 s. Titulares y cifras van ahora con el mismo corte estrecho; el contraste lo dan el peso (600 a 800) y el tamaño. **Aprobado por Alejandro:** se queda la anchura fija.
- **Space Mono solo en regular.** Ningún dato va en negrita, así que la 700 no se descarga.
- **Grano como SVG en línea** en lugar de imagen de fondo: Lighthouse tomaba la imagen de fondo como elemento LCP.
- **La entrada del hero ya no anima la opacidad** del bloque de debajo del nombre, solo lo desplaza 18 px. Con la opacidad, el texto del LCP no contaba como pintado hasta el final de la animación.
- **Probado y descartado:** CSS en línea (`inlineCss`, el LCP empeoraba) y no precargar Space Mono (también empeoraba).
- **Contadores:** antes, a los 1,8 s arrancaban aunque no estuvieran en pantalla, y al llegar ya habían terminado. Ahora solo cuentan al entrar en pantalla (comportamiento que ya estaba en `main`).
- **Comprobación del movimiento:** `npm run motion` (script nuevo). Con reduced motion: ninguna animación en marcha, las secuencias en su estado final, ningún texto oculto o recortado y todas las líneas SVG dibujadas. Sin JavaScript: recorre la página pantalla a pantalla y comprueba que todo el texto se ve. Pasa en castellano, catalán e inglés a 375 y 1440 px.
- **JS de cliente en `/`:** 111,7 KB transferidos (gzip), frente a 112,3 KB en la línea base. El cliente nuevo cabe en el presupuesto de 35 KB con un saldo de -0,6 KB.
- **Lighthouse móvil (mediana de 3):** rendimiento 98, accesibilidad 100, buenas prácticas 100 y SEO 100; LCP 2,4 s, CLS 0,004 y TBT 90 ms. Escritorio: 100 en todo, LCP 0,6 s. Entre pasadas el LCP en móvil varía unos 0,15 s.
- **`a11y`:** 0 fallos de axe en los tres idiomas a 375 y 1440, sin desbordamiento a 320 y 375 y ningún texto por debajo de 11 px.

## Revisión de las Fases 2 y 3 (cuatro revisores y un verificador por hallazgo)

Confirmaron 22 hallazgos (14 distintos, varios repetidos entre revisores) y descartaron 2. Arreglados en la Fase 6:

- **El fotograma de Peer2Stream no llevaba a ningún sitio** (`#peer2stream` no existía). El proyecto de Formación lleva ahora su `id`.
- **Textos de SVG por debajo de 11 px:** el mapa de VMV entre 861 y 1.100 px (ahora usa el diseño vertical hasta 1.100) y las etiquetas "200 m" y "47 m" en móviles estrechos (más grandes por debajo de 420 px).
- **El título de la terminal se cortaba con puntos suspensivos en móvil.** La barra ahora parte el título en dos líneas.
- **Las líneas de la terminal se recortaban a 320 px** y el scroll horizontal no las enseñaba. Cada línea mide ahora lo que su texto.
- **La caja del diagrama de Neibr no se dibujaba** (el CSS pisaba los atributos de Motion). Resuelto al pasar las secuencias a CSS.
- **El diagrama y la terminal podían quedarse ocultos** si el IntersectionObserver no llegaba a dispararse (un bloque más alto que la pantalla). Ahora se reproducen en cuanto su borde superior pasa del último cuarto de la pantalla, sea cual sea su alto, y al imprimir se muestran completos.
- **La hoja de contactos saltaba al hacer clic** (`:focus-within` también salta con el ratón en Chrome). Ahora solo vuelve a su sitio con el foco de teclado (`:focus-visible`).
- **El anillo de foco de los fotogramas se cortaba en móvil.** El carrusel deja espacio para él.
- **El orden de lectura y de foco del hero no coincidía con el visual** por debajo de 1.100 px. El panel "ahora mismo" va ahora detrás del texto en el HTML.
- **El header se volvía vino al pasar la tarjeta de Hidrotech.** Solo cambian el header las secciones, la banda del stress test y el pie.
- **Solapes en los diagramas:** "47 m" encima de un punto gris, "200 m" cortado por la caja y el ramal de "Firma biométrica" tachando "20 microservicios". Etiquetas movidas.
- **Descartados:** que las conexiones del mapa de VMV describan una arquitectura que no está en los documentos (el mapa se titula "esquema", las uniones salen de lo publicado, como el puente Java que expone el ERP, y no cuenta nada de cómo funcionan las defensas) y que haya puntos de ejemplo tocando los bordes del círculo y de la caja (ninguno queda en el grupo equivocado).

## Fase 7

- **Revisión final de las Fases 4 a 6** (cuatro revisores y un verificador por dimensión): 8 hallazgos confirmados (7 distintos) y 2 descartados. Todos arreglados:
  - **Negrita falsa en Space Mono.** Las etiquetas de la lista de Contacto y los números de la hoja de contactos heredaban un peso 600, y como solo se sirve la regular, el navegador la engordaba. Ahora van en 400, y `font-synthesis-weight: none` impide que vuelva a pasar con cualquier fuente.
  - **Al imprimir, el diagrama de Neibr y la terminal salían ocultos,** y las líneas que se dibujan con el scroll salían a medias. El reinicio en `beforeprint` llegaba tarde (React lo aplica después de la captura). Ahora el estado oculto solo existe en pantalla (`@media screen`) y al imprimir no hay animaciones ni transiciones. Lo que dice la Fase 6 sobre la impresión es cierto desde aquí.
  - **El raíl del Recorrido encendía los años en el orden 1, 3, 2** con el alto que tiene la sección a 1440×900 (un rango de la etapa 2 quedaba invertido). Ahora la línea de tiempo es el propio raíl y todos los rangos están en el mismo eje, así que el orden no depende del alto. Comprobado a 1024, 1440 y 1920 px de ancho, en castellano, catalán e inglés.
  - **El botón de WhatsApp partía el número** entre 561 y 640 px de ancho. Los dos botones pasan a una columna por debajo de 640 px.
  - **"Construyamos" se metía en el margen derecho a 320 px.** El tamaño mínimo del titular de Contacto baja de 3,4 a 3,05 rem y, si una pantalla aún más estrecha no tiene sitio, la palabra se parte en lugar de cortarse.
  - **Las flechas se perdían al hacer los subconjuntos:** el script solo descargaba el trozo "latin" de Google Fonts. Hanken Grotesk y Space Mono salen ahora del repositorio de Google Fonts completo (mismos dibujos, comprobado glifo a glifo) y conservan → y ↗. Bricolage sigue saliendo de la API: el repositorio tiene una versión más nueva con otros dibujos y otro espaciado, y cambiarla movería todos los titulares. El script falla si se pierde un carácter que la fuente sí tiene.
  - **Los subconjuntos perdían la referencia a la licencia OFL** (entradas 13 y 14 de la tabla `name`). Ahora la conservan.
- **Descartados:** que `PREGUNTAS.md` dijera "diez hitos" (son nueve, también en `main`; corregido aquí aunque no se vea en la web) y que `npm run motion` no probara la página con JavaScript y movimiento. Aun así, `motion` tiene ahora cuatro modos: reduced motion, sin JavaScript, impresión y secuencias (el diagrama y la terminal se reproducen al entrar en pantalla y acaban completos). Pasa en los tres idiomas a 375 y 1440 px.
- **Resuelto: el perfil personal de LinkedIn no se puede comprobar desde aquí.** `linkedin.com/in/ccalejandro` responde 999 a las peticiones automáticas (y 429 con un navegador simulado). El enlace es el mismo que en `main` y la página de empresa sí responde 200. **Respuesta:** Alejandro confirma que el enlace está bien.
- **Galería de antes y después** en `CAPTURAS.md`, con una imagen por sección a 1440 y 375 px. `npm run shots -- --sections` las genera; para `antes` se levantó `9ed0d20` (el diseño anterior con las capturas de la Fase 0) en un servidor aparte.
- **Lighthouse final, móvil** (repetido tras las respuestas de Alejandro, en un contenedor nuevo): rendimiento 98 y LCP 2,49 s (2.488 ms, mediana de 3, el mismo método que la línea base). Con 5 pasadas en la misma máquina sale 97 y 2,55 s. El LCP está en el límite de 2,5 s: el 81 % es retraso de renderizado (HTML, las tres fuentes precargadas, el CSS y el JS de React y Next). Lo que se podía quitar sin tocar cómo sirve Next la página ya está quitado (Fase 6). La primera pasada en el contenedor recién arrancado dio 94 y 2,8 s; se descartó por ser el arranque en frío y se repitió.

## Respuestas de Alejandro (14 de octubre)

- **Roses de Sant Jordi:** el DNS de rosesstjordi.com y rosesstjordi.es no estaba bien configurado y ya apunta bien; se pueden usar los tres dominios. Comprobado: los tres responden 200 con la misma web (mismo HTML, sin redirigir de uno a otro). Se usa **rosesstjordi.com**, que es el dominio de `DECISIONES.md`, en el enlace, el `alt` de la captura (en los tres idiomas), `llms.txt` y `scripts/capture.mjs`. La captura se ha repetido desde .com (`npm run capture -- --only roses`). En `DECISIONES.md` se añade que la web responde también en .es y .cat.
- **Bricolage con anchura fija al 80 %:** aprobado; se queda así.
- **LinkedIn personal:** el enlace está bien. `npm run links` lo seguirá marcando con 999 porque LinkedIn rechaza las peticiones automáticas.

## Ronda 2 (14 de octubre)

Alejandro pidió más SEO, quitar los saltos que provocaba la animación del nombre, que los trabajos no se movieran con el scroll, que los enlaces llevaran bien a las secciones, más espacio, menos AI slop y una estructura más de marketing. El plan está en `RONDA2.md`, y las comprobaciones de esta ronda en `ronda2/`.

### Decisiones tomadas sin preguntar

- **Por qué fallaban los enlaces a secciones.** Con `scroll-behavior: smooth`, un segundo clic durante el primer desplazamiento se perdía (27 de 30 veces en la prueba). Ahora lo hace un manejador pequeño: desplaza, cambia el hash y mueve el foco; sin JavaScript el salto es instantáneo. Cada sección compensa su relleno con un `scroll-margin-top` negativo y el titular queda entre 35 y 43 px bajo la cabecera en las cinco secciones del índice y en Contacto, a 1440 y a 375, también desde una subpágina (Servicios queda algo más abajo porque cuenta la línea que lo separa de Trabajos). `#inicio` vuelve arriba del todo.
- **Nombre sin animación.** El scramble cambiaba el ancho de las letras y movía las líneas de debajo. El nombre es texto normal y no se anima.
- **Trabajos quietos.** La hoja de contactos que se deslizaba con el scroll (`DISENO.md`, Trabajos) se quita porque lo pide Alejandro. Una captura solo se desplaza dentro de su marco si el puntero se queda encima 0,6 s.
- **Cabecera fija también en móvil.** El índice se pliega en un desplegable por debajo de 1.024 px y, por debajo de 560 px, los idiomas van dentro del desplegable para que quepan el nombre, "Hablemos" y el botón del índice (comprobado a 320, 360, 375 y 414 px en los tres idiomas).
- **Orden de la portada:** Inicio, Trabajos, Servicios, Experiencia, Sobre mí, Cómo trabajo y Contacto. Primero lo que se ofrece y la prueba, después la trayectoria. GOK Thermal sigue en Experiencia y no en Trabajos porque fue un encargo propio, fuera de Digital DesAny (`DECISIONES.md`).
- **H1:** "Alejandro Cabrera" y debajo "Desarrollador web y backend en Granollers", dentro del mismo H1, para que el titular diga oficio y lugar. Los títulos de la pestaña dicen lo mismo en los tres idiomas ("in Granollers" en inglés, antes "near Barcelona"); "cerca de Barcelona" va en el texto y en las descripciones, también en los tres.
- **Cifras en el inicio:** +500 rosas, 32 dominios, 2,9 millones de peticiones y el premio, cada una con enlace a donde se cuenta. El premio usa el texto de `DECISIONES.md`, que ya estaba publicado; su nombre exacto sigue pendiente (abajo).
- **Lo que se quita por sonar a plantilla:** la retícula y el grano, el panel "ahora mismo" con reloj, los contadores, la terminal que se escribe sola (ahora es estática), los glifos de servicios, el mapa de VMV, el raíl de años, la numeración de secciones, las etiquetas mono en mayúsculas, los puntos del marco de navegador, las flechas en enlaces internos, los titulares de eslogan y la nota "Sin plantillas" del pie. Space Mono queda solo para datos (dominios, años, código).
- **También se quita el fundido de papel a tinta al entrar en Experiencia.** Lighthouse medía la sección con el fondo todavía en papel y daba accesibilidad 96 por contraste. Con el corte seco cada sección pinta su superficie y el contraste es el de la paleta en todo momento.
- **Hidrotech Bordalló no tiene web que capturar.** Su tarjeta lleva en el lugar de la captura los canales en letra grande sobre tinta (Reels, LinkedIn, YouTube, Emails), que repiten lo que dice el párrafo; para lectores de pantalla va oculto (`aria-hidden`) y solo se lee el párrafo.
- **Neibr en su página:** la captura de neibr.es va junto a "Mi parte" (antes tenía una sección propia con la columna de texto vacía).
- **Espacio:** escala de nueve pasos (`--space-1` a `--space-9`). Los límites de alto de la v2 (Experiencia hasta 2.400 px y Recorrido hasta 1.080 px a 1440) dejan de aplicarse porque esas secciones ya no son las mismas. La portada mide ahora 10.052 px a 1440 y 15.172 px a 375 (`ronda2/medidas.md`).
- **Seis subpáginas en los tres idiomas** (21 URL en total, en `lib/routes.json`): Proyectos, Neibr, VMV Cosmetic Group, Sobre mí, Desarrollo backend y Desarrollo web. Solo llevan hechos de `DECISIONES.md` y textos que ya estaban aprobados (los cuerpos del recorrido, las frases completas de las capacidades de VMV y la asignación de Neibr). La de VMV cuenta capacidades y escala, nada de cómo funcionan sus defensas ni nombres internos.
- **Imágenes OG por página** en `/og/{idioma}-{página}.png`. La convención `opengraph-image` de Next no puede ir dentro de una ruta catch-all: el build pasaba, pero al servir rompía todas las rutas con un error 500.
- **Las rutas que no existen responden 404** con la página propia en los tres idiomas y `noindex`. `next start` escribe en el log "Error: Internal: NoFallbackError" cada vez; es cosa de Next 15.5 con `dynamicParams = false` y no cambia la respuesta.
- **Verificación de Search Console y Bing:** la web añade la etiqueta solo si existen las variables `GOOGLE_SITE_VERIFICATION` o `BING_SITE_VERIFICATION`. Definirlas en Vercel es cosa de Alejandro (abajo).

### Pendiente de Alejandro

Nada de esto se publica hasta tener respuesta:

1. **Nombre exacto del premio** de Neibr (pendiente desde el refresh). Hoy dice "uno de los proyectos ganadores de los Santander X Spain Awards 2026 (UVic)".
2. **Dominio final.** `alexasto.com` hace una redirección temporal (302) a GitHub, `www.alexasto.com` no resuelve y `dev.` parece un entorno de pruebas. Si la web pasa a `alexasto.com`: `SITE_URL=https://alexasto.com` en Vercel, 301 de `dev.alexasto.com` y de `www` al dominio, y cambiar el `sameAs` de digitaldesany.com el mismo día. Mientras tanto, mejor una 301 de `alexasto.com` a `dev.alexasto.com` que la 302 a GitHub. DNS y Vercel quedan fuera de mi alcance.
3. **Search Console y Bing Webmaster Tools:** dar de alta el dominio, definir las variables de verificación (o el registro TXT en el DNS) y enviar `/sitemap.xml`.
4. **Enlaces que apunten aquí** (gratis y del mismo tema): un enlace visible desde digitaldesany.com (hoy solo aparece en su JSON-LD), el campo de web en GitHub, LinkedIn y WordPress.org, un crédito en el pie de gokthermal.com y de peer2stream.alexasto.com y, si los clientes quieren, en las páginas de caso de Digital DesAny.
5. **Resultados medibles** de Lara's Oak, Paula Krebel, Hidrotech Bordalló y GOK Thermal (lanzamiento, visitas, contactos, lo que haya) y **testimonios** de clientes con su permiso. Hoy solo Roses tiene un resultado publicado.
6. **Tiempo de respuesta u horario en Contacto.** digitaldesany.com publica "de lunes a viernes, de 09:00 a 20:00", pero no lo pongo aquí sin que lo confirmes. Confirma también que el mensaje de WhatsApp que se rellena solo ("Hola, os escribo desde dev.alexasto.com…") le va bien al estudio.
7. **Pasos de trabajo con plazos** (primera llamada, presupuesto, entrega), si quieres que "Cómo trabajo" los cuente. Hoy son cuatro principios, cada uno con una prueba publicada.
8. **Foto tuya**, opcional: ayuda a la confianza y al perfil (`Person.image`).

### Revisión de la ronda 2 (cuatro revisores y un verificador por dimensión)

Confirmaron 19 hallazgos y descartaron 7. Todos los confirmados están arreglados:

- **Contenido.** La entradilla de Trabajos decía que la campaña de Sant Jordi era para clientes del estudio, y Roses de Sant Jordi es un proyecto propio de Digital DesAny (su página de caso lo marca así): se quita "para clientes del estudio" en los tres idiomas. La página de desarrollo backend contaba la integración de WiPay sin el "Colaboro… en Automated Transactions" que la v1 recuperó a propósito: ahora va completo. "Por qué la cerramos" seguido de "lo cerramos" pasa a "Por qué cerramos Neibr". "Neibr: Stress test" pasa a minúscula tras los dos puntos, como el resto de titulares. La descripción de Sobre mí dice "cofundar" en los tres idiomas y la de desarrollo web en inglés dice "SMEs" (pymes), no "small businesses".
- **Accesibilidad.** El menú abierto tapaba el siguiente enlace al salir de él con el tabulador (WCAG 2.4.11): ahora se cierra cuando el foco sale, y Escape solo devuelve el foco al botón si estaba dentro. Sin JavaScript, el menú abierto tapaba el titular al que se acababa de saltar: mientras está abierto, la cabecera deja de ser fija (`@media (scripting: none)`). En escritorio, los titulares con entradilla larga aterrizaban más abajo (la entradilla empujaba el título): ahora solo la entradilla se alinea abajo. Los enlaces a las páginas de servicio medían 22,5 px de alto y pasan a 24.
- **SEO.** `jobTitle` ya no lleva el lugar (va en `occupationLocation` y `address`). Las páginas de Neibr y VMV dicen en el JSON-LD que tratan de Neibr y de VMV, con Alejandro como autor. El nodo de Digital DesAny usa la misma `url` y el mismo `@id` de Oriol Tamborero que publica digitaldesany.com, para que los dos grafos se unan sin duplicados. `areaServed` va en el idioma de la página.
- **Scripts.** `links` comprobaba la URL de WhatsApp cortada en catalán e inglés (no decodificaba el apóstrofo). `motion` no probaba las páginas de desarrollo backend, que también tienen el diagrama, y ahora acepta que un diagrama que ya está en pantalla al cargar se quede completo. Una comprobación de `seo` no podía fallar y ahora mira que cada página tenga una ruta propia en cada idioma. Fuera un comentario del fundido que ya no existe y tres exportaciones sin uso.
- **Descartados:** las tres h1 de la 404 (una por idioma, cada una en su sección con `lang`), que la etiqueta de la API se lea varias veces (es como funcionan `figure` y `figcaption`), que la terminal use `--paper` (es un token de la paleta), que las subpáginas copien la portada (el texto se reutiliza a propósito y cada página tiene su título, su descripción y su contenido propio), que `links` no pueda pasar por el 999 de LinkedIn (ya pasaba antes y está explicado arriba), la tarjeta sola de GOK en Proyectos y la cifra sola en la banda del stress test en móvil (preferencias de maquetación que ya estaban en la v2).

### Resultado (en `ronda2/`)

- **`check`:** lint, tipos y build sin errores; 52 páginas estáticas.
- **`seo`:** 392 de 392 comprobaciones en las 21 URL, con los 21 títulos de 60 caracteres o menos, las descripciones entre 110 y 160, un h1 por página, los `@id` del JSON-LD resueltos, los enlaces internos y sus anclas, el sitemap, `/es` y la 404.
- **`a11y`:** 0 fallos de axe en las 21 páginas a 375 y 1440 px, sin desbordamiento a 320 y 375 y sin texto por debajo de 11 px.
- **`motion`:** 72 de 72 (las nueve páginas con el diagrama, dos anchos y cuatro modos).
- **Lighthouse (mediana de 3), las tres portadas:** móvil 98 de rendimiento y 100 en accesibilidad, buenas prácticas y SEO, LCP 2,4 s, CLS 0 y TBT entre 50 y 60 ms; escritorio 100 en todo, LCP 0,5 a 0,6 s.
- **`links`:** 45 enlaces; solo el LinkedIn personal da 999 (ya explicado).
- **`measure`:** portada de 10.052 px a 1440 y 15.145 px a 375, 5 imágenes, 1 SVG y 110 KB de JavaScript.

## Respuestas de Alejandro (22 de octubre)

- **Foto (pendiente 8 de la ronda 2):** Alejandro manda un retrato y pregunta si ponerlo en blanco y negro. Va en tinta sobre papel, con los dos colores de la paleta en lugar de un gris neutro, así que parece impreso en la página. `scripts/portrait.mjs` recorta a 4:5, quita un cable fino de la pared por encima de la cabeza (solo el fondo; la persona no se toca), aplica el bitono y no copia metadatos. El original no está en el repositorio. Sale en "Sobre mí" de la portada (carga diferida, lejos de la primera pantalla) y en la cabecera de la página Sobre mí (con prioridad, porque ahí sí está en la primera pantalla). No va en el inicio, porque sería la imagen más grande de la primera pantalla y el LCP en móvil ya está en 2,4 s, y porque el inicio tiene que contar primero qué hago. También va en `Person.image` del JSON-LD y en el sitemap de la portada y de Sobre mí. Lighthouse móvil (mediana de 3, tras la revisión): portada 99 (LCP 2,3 s) y Sobre mí 99 (LCP 2,1 s); escritorio, 100 en las dos.
- **Enlazar cada caso a digitaldesany.com:** Roses, Lara's Oak y Paula Krebel ya llevaban "El caso en digitaldesany.com". Se añade:
  - **Neibr**, que también tiene caso en digitaldesany.com (la web: diseño, desarrollo y despliegue). El enlace sale en Experiencia, en la página de Neibr y en Proyectos.
  - **"Todos los casos en digitaldesany.com"** debajo de los trabajos, en la portada y en Proyectos.
  - **Hidrotech Bordalló**, cuyo caso está como ficha en la página del servicio de gestión de redes ("Con quién hemos trabajado"). `/es/casos-exito/hidrotech-bordallo` redirige ahí, así que lleva el mismo "El caso en digitaldesany.com". La ficha no tiene ancla propia: si el estudio le pone un `id`, el enlace puede ir directo a ella.
- **Visitas de Roses:** la página de caso de Roses en digitaldesany.com dice "cerca de 5.000 visitas reales" y Alejandro lo confirma. Se añade a `DECISIONES.md` y a la tarjeta de Roses en los tres idiomas ("cerca de 5.000 visitas", "prop de 5.000 visites", "close to 5,000 visits") y a `llms.txt`.
- **Revisión de este cambio** (dos revisores y un verificador por dimensión): 2 hallazgos confirmados, los dos arreglados. El `sizes` del retrato pedía una imagen de 640 px para un hueco de 384 como mucho en escritorio (ahora sigue el ancho real de la columna). Y la fecha de contenido (`lastmod` del sitemap y `dateModified`) seguía en el 14 de octubre. Descartados 3: la etiqueta del enlace de Neibr (es correcta), que la entradilla de Trabajos diga que cada caso está en digitaldesany.com (lo está, también el de Hidrotech) y `llms.txt` (no cambiaba en este commit).

## Capa de marketing (22 de octubre)

Alejandro pide aplicar una capa de marketing y reformular los textos, contando lo mismo pero mejor, después de investigar técnicas. La investigación (cuatro ángulos: conversión, confianza, redacción de interfaz y portfolios) y la guía que sale de ella están en `MARKETING.md`. Cada texto cambiado, con su antes y después, está en `marketing/CAMBIOS.md`.

### Decisiones tomadas sin preguntar

- **Lo que se aplica:**
  - La frase del inicio dice qué hago, para quién y por qué elegirme: la propiedad del código, que es la única diferencia comercial que se puede demostrar. Sale dos veces en la portada, con las mismas palabras (inicio y Servicios), y no entra en la descripción de `Person` del JSON-LD.
  - Lo técnico va en palabras llanas allí donde lee la pyme ("sin ningún error del servidor", "95 de cada 100 respuestas"), con el término exacto entre paréntesis.
  - Los servicios empiezan por lo que resuelven y después dicen cómo.
  - Contacto explica quién lleva los proyectos (Oriol Tamborero y yo, desde Digital DesAny), para que "Cuéntame" y "Cuéntanos" no choquen.
  - Neibr se presenta por el papel (cofundador y único desarrollador de backend). El cierre se cuenta en su bloque como decisión, con el año.
  - Los enlaces dicen adónde llevan ("El servicio en digitaldesany.com", "Las cifras y el caso en digitaldesany.com").
  - Se quitan la entradilla de Servicios, que repetía el inicio, y el enlace al estudio de la franja de la mitad de la página, que sacaba de la web justo donde se decide.
  - La página de Neibr explica la seguridad en palabras llanas antes de los términos técnicos.
- **Lo que no se aplica sin datos:** el plan de pasos tras el primer mensaje, el tiempo de respuesta, "si cambias de proveedor, te los llevas" y el nuevo mensaje de WhatsApp que proponía la guía (lo recibe el estudio).
- **Debajo de los botones** va una línea con lo que hace el de WhatsApp: "WhatsApp se abre con el mensaje ya escrito". Es lo que ya hace el código.
- **"Web" en catalán va en masculino** en toda la web ("el web", "dos webs", "webs publicats"): es lo que dice Optimot para "lloc web" y lo que escribe digitaldesany.com/ca. Antes había de los dos géneros.
- **Calcos fuera:** "store" pasa a "tienda" o "botiga", "magazine" a "revista" y "design system" a "sistema de diseño". "Backends" sale de la frase para pymes, pero el H1 sigue diciendo "Desarrollador web y backend".
- **Descartadas por el verificador** (no eran claramente mejores): las descripciones de tres capacidades de VMV. Para quien evalúa, el término exacto sirve más que la versión llana.

### Pendiente de Alejandro

La capa de marketing quedaría más fuerte con estos datos. No se publica nada de esto sin respuesta:

1. **Qué pasa después del primer mensaje** (llamada, visita, presupuesto por escrito, si la primera reunión es gratis). Con eso se puede poner en Contacto un plan de tres pasos.
2. **Horario o tiempo de respuesta.** digitaldesany.com publica "de lunes a viernes, de 09:00 a 20:00".
3. **Quién lee el WhatsApp e info@**: tú, Oriol o los dos.
4. **Idiomas en que atiende el estudio** (catalán, castellano, inglés), para decirlo junto a los botones.
5. **Si se puede publicar "Si un día cambias de proveedor, te los llevas"**, y si dominio y hosting quedan a nombre del cliente.
6. **Qué incluyen "digitalización" y "despliegue"**, para explicar las cuatro partes de una web.
7. **Qué parte hiciste tú en Roses, Lara's Oak, Paula Krebel e Hidrotech**, para una línea "Mi parte" en cada tarjeta. Hoy se cuentan en "nosotros".
8. **Un caso de automatización del estudio**, con permiso del cliente, para que el servicio de Automatizaciones no tenga que tirar del ejemplo de VMV.
9. **Testimonios reales** con nombre y permiso, y si Digital DesAny tiene reseñas en Google.
10. **Los primeros mensajes reales de clientes** (anonimizados), para escribir con sus palabras.
11. **Visto bueno al mensaje de WhatsApp propuesto**, que deja al cliente solo con escribir lo que necesita: "Hola, os escribo desde dev.alexasto.com. Lo que necesito y para cuándo: ".
12. **Siguen abiertos** el nombre exacto del premio, el dominio final y Search Console (ronda 2).

### Revisión final de la capa de marketing (dos revisores y un verificador por dimensión)

Se revisó el resultado ya publicado en las 21 páginas: coherencia entre páginas e idiomas, hechos y voz, y la implementación y la maqueta. Hubo 5 hallazgos confirmados, todos menores y todos arreglados:

- **El título de `/desarrollo-web` decía "para pymes en Granollers"** y estrechaba el mercado frente a "toda Cataluña". Pasa a "Webs a medida desde Granollers: Next.js y WordPress", con 51, 50 y 54 caracteres.
- **El inglés decía "the parts you need"** donde el castellano y el catalán dicen "las partes que te faltan". Pasa a "the parts you're missing".
- **El primer PC salía contado dos veces seguidas** en Sobre mí. Ahora solo lo cuenta el hito de 2014.
- **Los paréntesis de la banda del stress test quedaban solos en una línea**, igual que la última palabra de una cifra del inicio, de la línea de WhatsApp y de la frase de la franja. Ahora esos textos reparten las líneas (`text-wrap: balance`).
- **Un repetido que ya estaba antes:** la página de Neibr repetía la frase técnica de seguridad en la banda del stress test, justo después de su sección. La banda ya no la repite en esa página.

Descartados 4:

- Dos repeticiones entre la entradilla y las tarjetas de Experiencia y Trabajos. Ya estaban o son el resumen que pide la guía.
- El segundo botón del inicio queda por debajo de la primera pantalla a 360×640 y 375×667. El principal sigue a la vista, y la guía comprueba a 375×812 y 360×740.
- La frase técnica de Neibr repetida: no la introdujo este cambio, pero se ha quitado igualmente.

## Capa de marketing en Sobre mí (23 de octubre)

Alejandro recuerda que la revisión de marketing también tocaba Sobre mí. Se aplica a la sección de la portada y a `/sobre-mi` con el mismo proceso (un editor, un verificador por propuesta). El detalle está al final de `marketing/CAMBIOS.md`.

### Decisiones tomadas sin preguntar

- **Cada hecho, una vez por página.** El resumen de la portada deja de repetir los hitos que tiene debajo y cuenta lo que la portada no enseña. Los hitos no repiten su título.
- **Todos los títulos del recorrido son acciones en primera persona**, también los de 2019 y VMV. El de 2019 dice "Empiezo a programar por mi cuenta en las guardias de helpdesk": "empiezo" y no "aprendo", que es lo que decía el texto original.
- **La etapa "Desarrollo" pasa a "Web y backend"**, las palabras del H1.
- **Pie de foto en la portada** con nombre, oficio y lugar. También es el `caption` de la imagen en el JSON-LD de `Person`. En `/sobre-mi` la foto va sin pie, al lado del nombre.
- **El hito de 2025 enlaza a la página de VMV**, con la etiqueta de Experiencia.
- **Fuera "Dónde encontrarme"** de `/sobre-mi`: repetía los perfiles y el correo de Contacto, que va justo después.

### Pendiente de Alejandro

- **Opcional:** el texto de 2026 ("Un estudio web para pymes de toda Cataluña: webs a medida, redes sociales, automatizaciones y software a medida") repite casi entera la entradilla de `/sobre-mi`. Se podría dejar en lo que la entradilla no dice (las redes sociales) o en algo nuevo del estudio. No se toca sin un dato nuevo.

