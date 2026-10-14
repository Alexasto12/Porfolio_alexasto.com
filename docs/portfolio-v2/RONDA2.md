# Ronda 2: comentarios de Alejandro sobre la v2

Lo que pidió, tal cual: más SEO, "un montón"; la animación del nombre mueve elementos porque provoca saltos de línea; los trabajos no se ven bien porque se mueven con el scroll; los enlaces no llevan bien a las secciones; separar un poco más los elementos; quitar lo que suena a AI slop; y reestructurar la información con un criterio más de marketing.

Antes de tocar nada se hizo un diagnóstico con cinco agentes (fallos reproducidos con Playwright, SEO, AI slop, marketing y espaciado). Lo que sigue es el plan que sale de ahí. Las decisiones tomadas sin preguntar y lo que necesita datos de Alejandro van a `PREGUNTAS.md`, sección "Ronda 2".

Reglas que no cambian: las de `CLAUDE.md` (tres idiomas iguales, sin rayas, sin datos inventados, VMV por capacidades y escala, WCAG 2.2 AA) y los hechos de `docs/portfolio-refresh/DECISIONES.md`. Donde esta ronda contradice `DISENO.md`, manda esta ronda, porque viene de Alejandro.

## R2-1. Fallos

- [x] **Enlaces a secciones.** El fallo real: con `scroll-behavior: smooth`, un segundo clic mientras dura el primer desplazamiento se pierde (27 de 30 veces). Se quita el smooth del CSS y un manejador pequeño hace el desplazamiento suave con `scrollIntoView`, cambia el hash y mueve el foco. Sin JavaScript, el salto es instantáneo.
- [x] **Todas las secciones aterrizan igual:** un `scroll-margin-top` negativo compensa el relleno superior de cada sección, así que el titular queda siempre a la misma distancia del header.
- [x] **"Ver trabajos" lleva a los trabajos**, no a los servicios.
- [x] **Nombre sin saltos:** fuera el scramble y su pista. El nombre es texto normal, una sola vez en el DOM, sin `inline-block` por letra y con `nowrap` (también evita el salto cuando la fuente tarda).
- [x] **Trabajos quietos:** fuera la hoja de contactos que se desliza con el scroll. El desplazamiento dentro del marco de una captura solo empieza tras un hover deliberado (0,6 s).
- [x] **Header en móvil fijo**, en una sola fila, con el índice en un desplegable, para que después de un salto el índice siga a mano.

## R2-2. Estructura, AI slop y espacio

Orden nuevo de la portada (AIDA con la prueba primero):

1. **Inicio** (papel): nombre y oficio en el H1, una frase de oferta, los dos botones ("Cuéntame tu proyecto" y "Ver trabajos") y una fila de pruebas con cifras publicadas (+500 rosas, 32 dominios, 2,9 millones de peticiones, el premio).
2. **Trabajos** (papel): los casos de Digital DesAny en una rejilla tranquila, primero el que tiene resultado (Roses).
3. **Servicios** (papel): las cuatro líneas con una frase y su caso de ejemplo, la propiedad del código bien visible y una franja con WhatsApp y correo directos.
4. **Experiencia** (tinta): VMV como lista de capacidades con cifras fijas, Neibr con su diagrama, la banda del stress test y la API de ejemplo sin efecto de escritura, y GOK Thermal.
5. **Sobre mí** (papel): Recorrido y Formación juntos y más cortos.
6. **Cómo trabajo** (tinta): los cuatro principios en frases concretas con una prueba publicada cada uno.
7. **Contacto** (vino): el mismo verbo que el botón del inicio, WhatsApp y correo con el mensaje y el asunto ya escritos, y el contacto personal aparte.

Lo que se va por sonar a plantilla: etiquetas mono en mayúsculas sobre todo (mono solo para datos), los números de sección y de lista, la retícula y el grano, el panel "ahora mismo" con reloj, los contadores, la terminal que se escribe sola, los glifos de servicios, el mapa de VMV, el raíl de años, los puntos del marco de navegador, las flechas en enlaces internos y de correo, titulares de eslogan con punto final ("Cuatro principios. Cero gimmicks.", "Construyamos algo robusto.") y la nota del pie "Sin plantillas". Al final también el fundido de papel a tinta al entrar en Experiencia (Lighthouse lo medía como falta de contraste; ver `PREGUNTAS.md`). Se queda lo que informa: las capturas reales, el diagrama de Neibr, las cifras, la frase del cierre de Neibr y la propiedad del código.

Espacio: una escala de nueve pasos (`--space-1` a `--space-9`) en `base.css`, más aire dentro de los bloques (que es donde estaba apretado) y menos relleno vacío entre secciones. Los límites de alto de la v2 (Experiencia ≤ 2.400 px y Recorrido ≤ 1.080 px) dejan de aplicarse porque las secciones cambian.

## R2-3. SEO técnico

- [x] Títulos y descripciones nuevos por idioma, con oficio y lugar (Granollers, Barcelona), de menos de 60 y 160 caracteres, separados del texto del hero.
- [x] Un solo H1 por página, con el nombre una vez y el oficio.
- [x] Encabezados que dicen de qué va cada sección; "cerca de Barcelona" también en castellano y catalán.
- [x] JSON-LD: el `@id` de Digital DesAny igual que el que publica digitaldesany.com, `@id` con barra, Person más completa (nombre y apellido, descripción, ocupación con lugar, `knowsAbout` con su página de Wikipedia), JSON-LD por página y migas en las subpáginas.
- [x] Enlaces externos con `noopener` en lugar de `noreferrer`, y `rel="me"` en los perfiles propios.
- [x] `favicon.ico`, iconos de 48, 192 y 512 px y manifiesto completo.
- [x] Página 404 propia en los tres idiomas y `/es` redirigido a `/`.
- [x] Verificación de Search Console y Bing por variable de entorno, solo si existe.
- [x] Sitemap y `llms.txt` con todas las páginas.

## R2-4. Páginas nuevas (tres idiomas cada una)

Hechas solo con hechos de `DECISIONES.md` y textos ya aprobados que hoy no se ven (cuerpos del recorrido, frases completas de las capacidades de VMV, la asignación de Neibr):

- [x] **Proyectos** (`/proyectos`, `/ca/projectes`, `/en/projects`): todo el trabajo, con una frase de hecho por proyecto.
- [x] **Neibr** (`/proyectos/neibr`): el backend completo, el diagrama, el stress test, la API de ejemplo, el premio y el cierre.
- [x] **VMV Cosmetic Group** (`/proyectos/vmv-cosmetic-group`): cifras y las ocho capacidades con su frase entera, sin nombres internos ni defensas.
- [x] **Sobre mí** (`/sobre-mi`, `/ca/sobre-mi`, `/en/about`): los nueve hitos con su texto, la formación, el plugin y cómo trabajo.
- [x] **Desarrollo backend** (`/desarrollo-backend`) y **Desarrollo web** (`/desarrollo-web`): una página por intención de búsqueda, con las pruebas que ya existen y enlace al servicio de Digital DesAny correspondiente.

`seo`, `a11y` y `links` recorren todas las rutas; `motion`, las que tienen el diagrama de Neibr; `shots -- --all`, todas.

## R2-5. Cierre

- [ ] `check`, `a11y`, `motion`, `seo`, `links`, `shots`, `lh` y `measure` en `docs/portfolio-v2/ronda2/` (los de la v2 se quedan en `despues/`).
- [ ] Revisión adversarial de todo el cambio (contenido y hechos, tres idiomas, accesibilidad, SEO, fallos).
- [ ] `PREGUNTAS.md`, galería y descripción del PR al día.
