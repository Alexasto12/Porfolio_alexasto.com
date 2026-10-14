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
- **Pendiente (sigue de la Fase 0):** el enlace y el `alt` de Roses de Sant Jordi dicen ahora rosesstjordi.cat, también en `llms.txt`.
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
- **Hitos en una o dos líneas, como pide `DISENO.md`:** año, título y lugar. Los diez hitos siguen, en tres etapas (Hardware 2011-2016, Soporte y formación 2019-2022, Desarrollo 2024-2026; "Hardware" igual en los tres idiomas, "Suport i formació" y "Support and study"). El párrafo largo de cada hito y la etiqueta de tipo (hito, formación, trabajo, estudio) dejan de verse; siguen en `lib/content.ts`. Así se pierde a la vista, por ejemplo, el detalle de los 9.600 baudios de Automated Transactions; el hito sigue con su título.
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
- **Bricolage con anchura fija (80 %), sin el eje de anchura.** Se aparta de `DISENO.md` ("con ejes de anchura y peso"): con el eje de anchura la fuente pesa el doble, y el LCP en móvil no bajaba de 2,5 s. Titulares y cifras van ahora con el mismo corte estrecho; el contraste lo dan el peso (600 a 800) y el tamaño. **Pendiente:** si se quiere recuperar el eje, hay que volver a medir el LCP en móvil.
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
