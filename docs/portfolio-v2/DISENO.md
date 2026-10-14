# Diseño v2: papel, tinta y vino

Este documento manda sobre la dirección visual. Sustituye a la línea "Dirección visual" de `docs/portfolio-refresh/DECISIONES.md`. Los hechos, textos y reglas de contenido siguen siendo los de `DECISIONES.md` y `CLAUDE.md`.

> **Ronda 2 (14/10/2026).** Tras ver la v2, Alejandro pidió cambios y `RONDA2.md` manda sobre este documento donde no coinciden: la paleta y la tipografía se quedan; se van la retícula y el grano, el fundido de papel a tinta, la hoja de contactos del hero, el scramble del nombre, el panel "ahora mismo", los contadores, la terminal que se escribe sola, el mapa de VMV y el raíl del Recorrido; cambia el orden de la portada y se añaden seis subpáginas. Lo que sigue describe la v2 tal como se planteó.

## Diagnóstico de la versión actual

Medido el 13/10/2026 sobre dev.alexasto.com:

- **Sin imágenes ni gráficos.** Hay 0 imágenes y 0 SVG en 11.400 px de página (`lib/shots.json` está vacío).
- **Todas las secciones iguales.** Las 7 secciones tienen el mismo fondo `#14130E`, y lo único que las separa es el número "03.".
- **Un solo tipo de bloque.** Casi todo es la misma caja: panel oscuro con borde, título, texto gris y etiquetas mono. Se repite en unas 20 tarjetas (casos, las 8 capacidades de VMV, GOK, formación, principios).
- **Movimiento mínimo.** Solo hay una entrada de 24 px al hacer scroll, el nombre con efecto scramble y un ticker. `motion` está instalado pero no se usa.
- **Bloques demasiado largos.** Experiencia mide 3.660 px y Recorrido 2.278 px para 10 hitos.
- **Lo más visual queda enterrado.** El stress test y la terminal de Neibr están a mitad de página.
- **Deuda de código:**
  - `TweaksPanel` (un panel de diseño con Ctrl+Shift+E) se publica en producción.
  - `lucide-react` y `class-variance-authority` están instalados pero no se usan.
  - Hay 107 bloques `style={{...}}` en línea.

## Decisión de base

**Base clara: papel (por defecto).** Encaja con la dirección que ya se eligió al diseñar la web: base papel, retícula editorial a la vista y un bloque oscuro de contraste para el peso técnico. Además separa esta web de la de Digital DesAny, que es oscura.

Si `PREGUNTAS.md` o el prompt dicen **"variante oscura"**, se invierten las superficies: la base es tinta, la sección Ahora pasa a papel y el resto del sistema se mantiene igual.

## Sistema visual

### Superficies

Cada sección tiene una superficie y un patrón de maquetación propios. Dos secciones seguidas no pueden repetir la misma combinación.

| Superficie | Fondo | Texto | Texto secundario | Acento de texto | Uso |
| --- | --- | --- | --- | --- | --- |
| Papel | `#F4EFE2` | `#14130E` (16,2:1) | `#6B675A` (4,9:1) | `#C12C52` (4,9:1) | Hero, Ahora, Recorrido, Formación |
| Tinta | `#14130E` | `#F4EFE2` | `#B6B2A2` | `#D64B6E` (4,5:1) | Experiencia (VMV y Neibr), "la sala de máquinas" |
| Vino | `#C12C52` | `#F4EFE2` (4,9:1) | `#F4EFE2` al 85 % solo en texto grande | `#14130E` | Una banda de cifras de Neibr y el Contacto entero |

- **Paso de una superficie a otra:** el fondo de la página se funde de papel a tinta al entrar en Experiencia, y de vuelta al salir. Se hace con un color de fondo animado por scroll (scroll-driven animation de CSS con `@supports`; sin soporte, cambio seco).
- **Header:** se adapta a la superficie que tiene debajo. Las secciones llevan `data-surface` y un IntersectionObserver cambia los tokens del header.
- **Textura y retícula:** papel con grano muy sutil (SVG de ruido, opacidad ≤ 4 %) y la retícula de 12 columnas a la vista con líneas de 1 px al 6 %. En tinta, la retícula al 5 %.

### Tipografía

- **Fuentes:** las mismas tres.
  - Bricolage Grotesque para titulares, con ejes de anchura y peso para dar contraste.
  - Hanken Grotesk para el texto.
  - Space Mono solo para datos: cifras, fechas, endpoints y metadatos. Nunca como decoración.
- **Escala:** titulares de sección en `clamp(2.75rem, 7vw, 6.5rem)`, texto de lectura en 17-18 px con interlineado 1,55 y ancho máximo de 62 caracteres.
- **Cifras grandes** en Bricolage 800 con `font-variant-numeric: tabular-nums` cuando se animan.

### Imágenes y gráficos

- **Capturas reales** de cada web (`npm run capture`), mostradas en un marco de navegador propio (`BrowserFrame`): barra fina con el dominio en mono y la captura dentro.
  - Al pasar el ratón, la captura hace un desplazamiento vertical lento dentro del marco, como si se recorriera la página.
  - Con `prefers-reduced-motion`, no se mueve.
- **Diagramas en SVG** hechos a mano como componentes. Sin librerías de gráficos ni ilustraciones genéricas o de stock.
- **Sin iconos genéricos.** Si hace falta un glifo, se dibuja en SVG con el mismo trazo que los diagramas (1,5 px, extremos redondeados).

### Movimiento

Cada animación explica algo del contenido. Si no explica nada, no va.

- **Herramientas:**
  - CSS con scroll-driven animations (`animation-timeline: view()`) dentro de `@supports`, para entradas, líneas que se dibujan y la transición de superficies.
  - `motion/react` (ya instalado), con `LazyMotion` y `domAnimation`, solo para secuencias orquestadas: entrada del hero, diagrama de Neibr, terminal y mapa de VMV.
- **Reglas:**
  - Todo el contenido se renderiza en el servidor y se ve completo sin JavaScript.
  - Con `prefers-reduced-motion: reduce` no hay ningún movimiento y todo se ve en su estado final.
  - Solo se anima `transform`, `opacity`, `clip-path` y `stroke-dashoffset`; nunca propiedades que fuercen layout.
  - Presupuesto: como mucho 35 KB gzip de JavaScript de cliente nuevo para toda la página.

## Sección por sección

### 1. Hero (papel)

- **Composición asimétrica en 12 columnas.** El nombre en Bricolage enorme ocupa 8 columnas. En las otras 4 va un panel "ahora mismo", con hora real de Granollers, el estado "Disponible para proyectos" y un enlace a DesAny.
- **Se mantienen** el scramble del nombre (solo con ratón), el título, la línea del hero y los dos botones.
- **Hoja de contactos al pie del hero:** una tira con 4 o 5 capturas pequeñas de los casos, que se desplaza en horizontal al hacer scroll (scroll-linked, sin bucle automático).
  - Cada miniatura enlaza a su caso.
  - En móvil es un carrusel con scroll-snap.
- **Entrada al cargar:** las letras del nombre suben escalonadas (40 ms entre letras) y después aparecen el resto de líneas. En total, menos de 1,2 s.

### 2. Ahora: Digital DesAny (papel)

- **Titular a todo el ancho** y, debajo, los cuatro servicios como cuatro columnas numeradas grandes (01 a 04). Cada servicio lleva un glifo SVG propio que se dibuja al entrar en pantalla:
  - Webs: un marco de navegador.
  - Automatizaciones: dos nodos unidos por una flecha que se repite.
  - Software: piezas encajando.
  - Redes: una cuadrícula de publicaciones.
- **Casos en un bento**, no en una lista de cajas iguales:
  - Lara's Oak y Roses de Sant Jordi en grande, con `BrowserFrame`.
  - Paula Krebel en mediano.
  - Hidrotech sin web: tarjeta en superficie vino con sus cuatro canales como chips grandes.
  - Cada caso lleva nombre, una línea y el enlace a su ficha.
- **Llamada a la acción:** cierra con una línea que lleva a digitaldesany.com.

### 3. Experiencia (tinta, la sala de máquinas)

**VMV**
- **Columna izquierda fija (sticky):** empresa, cargo, años y las tres cifras (32, 12, 20) con el contador que ya existe.
- **Columna derecha: un mapa de sistema en SVG** con nodos genéricos y ningún nombre interno: "ERP AS/400", "Puente Java 21", "32 dominios", "WAF", "Gateway IA", "Firma biométrica", "PDF asíncrono", "WhatsApp".
  - Las conexiones se dibujan a medida que se hace scroll.
  - Debajo, una leyenda breve: una línea por nodo, con el texto de la capacidad.
- **Sustituye** a las 8 cajas actuales.

**Neibr (caso de estudio)**
- **Diagrama del algoritmo** en SVG animado al entrar en pantalla, en 4 pasos con una línea de texto cada uno:
  1. Aparece el punto de la entrega fallida.
  2. El prefiltro dibuja un cuadrado (bounding box).
  3. El círculo de 200 m recorta los vecinos de dentro.
  4. Se resalta el más cercano con su distancia (Haversine).
  - Los puntos son de ejemplo, con semilla fija, y el diagrama se titula "Cómo se asigna un vecino (esquema)".
- **Banda vino a todo el ancho con las cifras del stress test:** 2,9 M peticiones, ~968 req/s, p95 < 100 ms y 0 errores 5xx. Contadores con números tabulares.
- **La terminal que ya existe:** la petición se escribe sola cuando entra en pantalla y la respuesta aparece después. Con reduced-motion, se muestra completa.
- **Narrativa a un lado:** rol, premio y por qué se cerró, con el enlace a neibr.es.

**GOK Thermal**
- Tarjeta con `BrowserFrame` y la etiqueta "Encargo freelance", en la misma superficie tinta.

### 4. Recorrido (papel)

- **Tres etapas** en lugar de 10 cajas, conservando todos los hitos:
  - Hardware (2011-2016).
  - Soporte y formación (2019-2022).
  - Desarrollo (2024-2026).
- **Escritorio:** un raíl horizontal con los años en mono, que se dibuja con el scroll. Cada etapa es una columna con sus hitos en una o dos líneas.
- **Móvil:** raíl vertical.
- **Objetivo de altura:** como mucho 1,2 pantallas en escritorio.

### 5. Formación (papel)

- Peer2Stream y Pokédex lado a lado con `BrowserFrame`, con sus créditos y enlaces. La línea de WordPress.org va debajo, en pequeño.

### 6. Principios (tinta)

- Una fila de 4 columnas, cada una con un número enorme en contorno (`-webkit-text-stroke`), el título y una frase. Sin cajas.

### 7. Contacto (vino, a todo el ancho)

- **"Construyamos algo robusto."** en papel sobre vino, a tamaño de hero.
- **Dos botones grandes:** escribir a DesAny y WhatsApp. Debajo, el contacto personal y los perfiles como una lista con flecha.
- El footer va en tinta.

## Referencias

Son las que se usaron al diseñar la web; sirven para medir el resultado:
- bleed.com, por los datos en vivo como credibilidad.
- lazyeight.design, por la retícula editorial a la vista.
- seungmee-lee.com y taamannae.dev, por el ritmo y la tipografía.
- semplice.com/showcase.

## Lo que no se hace

- Degradados morados, glassmorphism ni brillos de neón.
- Cursores personalizados.
- Scroll secuestrado (scroll-jacking) ni secciones que bloqueen el scroll.
- Carruseles que se mueven solos.
- Iconos de librería, ilustraciones de stock o imágenes generadas.
- Animar algo solo porque sí.
- Texto de menos de 11 px.
