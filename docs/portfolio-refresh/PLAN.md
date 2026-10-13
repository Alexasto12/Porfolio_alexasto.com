# Plan: renovación del portfolio (octubre de 2026)

## Cómo trabajar

- **Una sola rama:** trabaja en `claude/portfolio-refresh`, creada desde la rama por defecto.
- **PR y casillas:** al terminar la Fase 0, abre un pull request en borrador. Al cerrar cada fase, haz commit y push, marca aquí sus casillas y actualiza la descripción del PR.
- **No pidas confirmación.** Si algo es ambiguo, aplica `DECISIONES.md`. Si no lo cubre, elige la opción más conservadora y apunta en `PREGUNTAS.md` qué decidiste y por qué.
- **Bloqueos:** si una tarea necesita algo que no tienes (un dominio, DNS, otro repositorio, una web que no responde), apúntalo en `PREGUNTAS.md` y sigue con la siguiente.
- **Prohibido:** no hagas merge, no fuerces push y no cambies el CI ni la configuración de Vercel.

## Fase 0. Preparación

- [x] Lee el repo y apunta en `CLAUDE.md` los comandos reales (instalar, desarrollo, build, lint).
- [x] Añade los scripts `check`, `shots`, `a11y` y `lh` con devDependencies gratuitas: `@playwright/test`, `@axe-core/playwright` y `lighthouse` (este último usando el Chromium de Playwright).
- [x] Guarda la línea base en `docs/portfolio-refresh/antes/`: capturas a 375 y 1440 px, y la salida de axe y de Lighthouse.

**Hecho cuando:** los cuatro scripts funcionan en la sesión y la línea base está en el repo.

## Fase 1. Arreglos que se notan

- [x] **Errata del contacto:** "un sistema que pide más latencia" pasa a "menos latencia", también en catalán e inglés.
- [x] **Móvil:**
  - El selector de idioma y "Disponible para proyectos" se ven y se pueden usar a 320 y 375 px.
  - La barra superior no se parte en varias líneas.
  - La tarjeta de código de Neibr no desborda: el scroll horizontal queda dentro de la tarjeta.
- [x] **Foco y navegación por teclado:** foco visible con `:focus-visible` en enlaces y botones, y un skip link al contenido.
- [x] **Selector de idioma:** botones con `aria-pressed` y nombre accesible ("Español", "Català", "English").
- [x] **Áreas táctiles** de al menos 24×24 px en los botones de idioma y en los enlaces de las tarjetas.
- [x] **Contraste:** aplica la paleta de `CLAUDE.md` y sube a 11 px cualquier texto más pequeño.
- [x] **Contadores:** el HTML del servidor ya trae el valor final (dominios, plugins, microservicios y cifra del stress test). La animación ocurre solo en el cliente y respeta `prefers-reduced-motion`.
- [x] **"Hover en el nombre para reanimar":** quítalo, o muéstralo solo con `@media (hover: hover)`.

**Hecho cuando:**
- axe no da errores serios ni críticos en las tres versiones de idioma, a 375 y 1440 px.
- `document.documentElement.scrollWidth <= innerWidth` a 320 y 375 px.
- Las capturas nuevas están en `docs/portfolio-refresh/despues/`.

## Fase 2. Contenido: de "freelance en VMV" a "cofundador de DesAny"

Usa solo los hechos de `DECISIONES.md` y escribe cada cambio en los tres idiomas.

- [x] **Hero:** título y línea de `DECISIONES.md`, con dos llamadas a la acción: ver trabajos (ancla a la sección) y hablar (contacto).
- [x] **Sección nueva "Ahora: Digital DesAny"**, justo después del hero. Explica qué hace el estudio y para quién, e incluye los casos de `DECISIONES.md` enlazados a sus fichas en digitaldesany.com.
- [x] **Servicios:** sustituye "Lo que ofrezco como freelance" por las cuatro líneas de servicio de DesAny, con enlace a la página de servicios en el idioma de la ruta.
- [x] **Contacto:** los encargos van a DesAny y lo personal a contact@alexasto.com, según `DECISIONES.md`. Quita "Sin agencias intermediarias".
- [x] **VMV en pasado (2025-2026).** Revisa cada capacidad contra la regla de VMV de `CLAUDE.md`:
  - Quita el detalle de cómo funciona el WAF; basta con "WAF en Go con reputación de IPs".
  - "A nivel kernel" pasa a "delega el trabajo pesado en procesos hijo, fuera del límite de memoria de PHP".
  - Quita "control de transacciones distribuidas".
  - Quita KAFKA del ticker.
- [x] **Neibr:** deja de ser "proyecto bandera" y pasa a Experiencia como proyecto cerrado: qué era, tu rol, el premio, por qué se cerró y las cifras.
  - El ejemplo de la API usa un prefijo genérico (`CARRIER-000001-...`), no DHL.
  - Quita toda referencia a api.neibr.es (texto, JSON-LD y sitemap).
- [x] **Autoevaluación:** quita el bloque "SELF · X/10" entero.
- [x] **Stress test:** pon las cifras de `DECISIONES.md` en lugar de "p50 / p99 estables".
- [x] **Recorrido:** un solo eje en años (calcula los años a partir de las edades que ya figuran) y añade el hito de 2026 Digital DesAny. Sustituye el hito "Hoy".
- [x] **Créditos:**
  - Peer2Stream se hizo con Ismael Delgado, y su demo enlaza a `/discover`.
  - En la Pokédex, la carcasa de la DS está adaptada de un CodePen de Anton Essential (MIT).
- [x] **WordPress.org:** un plugin, descrito tal cual está en `DECISIONES.md`.
- [x] **Sant Jordi:** usa las cifras de `DECISIONES.md`.
- [x] **Marca:** nombre visible y AC_SYSTEMS según `DECISIONES.md`.
- [x] **Orden de las secciones:** Hero, Ahora (DesAny), Experiencia (VMV, Neibr y el encargo freelance de GOK Thermal, separado de DesAny), Recorrido, Formación (Peer2Stream y Pokédex), Principios y Contacto. La sección "Productos propios" desaparece: Roses de Sant Jordi pasa a los casos de DesAny, neibr.es se integra en Neibr y la tarjeta "este sitio" se quita.

**Hecho cuando:**
- Ningún texto contradice `DECISIONES.md`.
- Una búsqueda en el código no encuentra "presente" ni "present" para VMV, ni "api.neibr.es", "DHL", "X/10" o "Sin agencias".
- Los tres idiomas están completos.

## Fase 3. Capturas reales

- [x] **Script de capturas:** un script de Playwright que capture a 1440×900 cada web de la lista de `DECISIONES.md` y guarde la imagen optimizada en `public/shots/`, en AVIF o WebP y con un máximo de 200 KB.
- [x] **Sustituir los marcadores:** cambia cada caja "captura · 1440×900" por `next/image`, con `alt` descriptivo en los tres idiomas, carga diferida fuera del primer pantallazo y `sizes` correcto.
- [x] **Webs que fallen:** si una web no carga, quita el marco de esa tarjeta y apúntalo en `PREGUNTAS.md`.

**Hecho cuando:** no queda ninguna caja de marcador en la página.

## Fase 4. Idiomas, SEO y metadatos

- [x] **Rutas por idioma** generadas en estático: `/` (es), `/ca` y `/en`, con el `lang` del `<html>` puesto desde el servidor.
  - El selector cambia de ruta y puede seguir recordando la preferencia.
  - No hay redirección automática por idioma.
- [x] **hreflang y canonical:** los hreflang es, ca, en y x-default apuntan cada uno a su ruta, con un canonical por idioma. `og:locale` y sus alternates usan es_ES, ca_ES y en_US.
- [x] **Título y descripción por idioma,** coherentes con el hero nuevo.
- [x] **Dominio en una variable:** el dominio base se lee de `SITE_URL`, con el valor por defecto de `DECISIONES.md`.
- [x] **Sitemap y robots.txt:**
  - El sitemap lleva solo URLs propias (las tres rutas), con alternates y un `lastmod` real.
  - Quita la línea `Host` de robots.txt.
- [x] **JSON-LD:**
  - Person con el jobTitle nuevo, worksFor Digital DesAny y el premio.
  - Organization Digital DesAny, con Alejandro como founder.
  - Sin api.neibr.es, y sin `meta keywords`.
- [x] **Imagen OG por idioma,** con Bricolage Grotesque cargada desde archivo (no la fuente de reserva) y con el nombre, el título nuevo y el dominio de `DECISIONES.md`.

**Hecho cuando:**
- Las tres rutas se sirven en estático y el HTML de cada una no incluye los textos de los otros dos idiomas.
- El sitemap y los hreflang son válidos.
- La imagen OG se ve con la fuente correcta (con su captura en `despues/`).

## Fase 5. Navegación y estructura

- [x] **Landmarks:** un `header` con navegación (índice de secciones con su número) y un `footer`.
- [x] **Etiquetas mono:** quita las pequeñas que son solo decoración y no aportan información.
- [x] **Dirección visual** según `DECISIONES.md`.

**Hecho cuando:** axe no da errores serios ni críticos y las capturas finales están guardadas.

## Fase 6. Cierre

- [ ] Ejecuta `check`, `a11y`, `shots` y Lighthouse en móvil y escritorio, y guarda los resultados en `despues/`.
- [ ] Comprueba que todos los enlaces externos de la página responden 200.
- [ ] Completa la descripción del PR:
  - resumen por fase,
  - tabla de antes y después (Lighthouse y axe),
  - enlaces a las capturas,
  - lo que queda pendiente en `PREGUNTAS.md`.
- [ ] Marca el PR como listo para revisar.

## Fuera de alcance (lo hace Alejandro)

- Apuntar alexasto.com a este proyecto en Vercel, quitar la redirección a GitHub y redirigir dev.alexasto.com al dominio raíz.
- neibr.es: decidir con los socios si se marca como cerrado.
- Webs de clientes: el título "WIP" de larasoak.art y el crédito "Web: Digital DesAny" en los pies, siempre con permiso del cliente.
- Quitar la reseña propia del plugin en WordPress.org.
