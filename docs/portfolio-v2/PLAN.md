# Plan: portfolio v2 (refactor visual)

## Cómo trabajar

- **Rama:** trabaja en `claude/portfolio-v2`, creada desde `main`.
- **PR y casillas:** al terminar la Fase 0, abre un PR en borrador. Al cerrar cada fase:
  - haz commit y push,
  - marca aquí sus casillas,
  - guarda capturas en `docs/portfolio-v2/fases/<n>/` (375 y 1440 px, `/`),
  - actualiza la descripción del PR.
- **Prioridad de documentos:** `docs/portfolio-v2/DISENO.md` manda en lo visual. `CLAUDE.md` y `docs/portfolio-refresh/DECISIONES.md` mandan en contenido y reglas.
- **No pidas confirmación.** Si algo es ambiguo, elige lo más conservador y apúntalo en `docs/portfolio-v2/PREGUNTAS.md`.
- **Prohibido:** no hagas merge, no fuerces push y no toques el CI ni la configuración de Vercel.

## Fase 0. Preparación y capturas (bloqueante)

- [x] **¿Ya hay capturas?** Si `lib/shots.json` en `main` ya tiene las 7 entradas (larasoak, gokthermal, roses, neibr, peer2stream, pokeapi, paulakrebel), no captures: revísalas a ojo y pasa a la línea base. En ese caso, salta también en la Fase 7 la comprobación de `links` si no hay red, y apúntalo en el PR.
- [x] **Si no las hay, comprueba la red:** `curl -sI https://larasoak.art` debe responder. Si falla con un error de proxy o de túnel, **para aquí**. Escribe en el PR y en `PREGUNTAS.md` exactamente qué dominios no responden, y no sigas: sin capturas, el refactor no tiene sentido.
- [x] **Capturas (solo si no las había):** añade `paulakrebel: "https://paulakrebel.com"` en `scripts/capture.mjs` (en lugar de buscarla en la ficha), ejecuta `npm run capture` y revisa a ojo cada imagen de `public/shots/`. Si una web sale con un banner de cookies o a medio cargar, ajusta la espera o cierra el banner en el script y repite.
- [x] **Línea base:** guarda `npm run shots`, `npm run a11y` y `npm run lh` en `docs/portfolio-v2/antes/`.

**Hecho cuando:** `lib/shots.json` tiene las 7 capturas y la línea base está en el repo.

## Fase 1. Sistema visual y limpieza

- [x] **Tokens de superficie:** papel, tinta y vino en `app/globals.css`, según la tabla de `DISENO.md`, con el atributo `data-surface` en cada sección. Actualiza la paleta de `CLAUDE.md` con los valores nuevos.
- [x] **Transición de fondo** de papel a tinta al entrar en Experiencia y de vuelta al salir, más el header adaptado a la superficie.
- [x] **Tipografía y retícula:** la escala de `DISENO.md`, la retícula de 12 columnas y el grano en papel.
- [x] **`BrowserFrame`:** marco de navegador con el dominio, `next/image`, `alt` en los tres idiomas y desplazamiento al pasar el ratón.
- [x] **Limpieza:**
  - Quita `TweaksPanel`, `lib/tweaks.tsx` y su uso. Las variantes que fijaba pasan a ser el diseño único.
  - Desinstala `lucide-react` y `class-variance-authority`.
  - Pasa los `style={{...}}` en línea a clases. Solo pueden quedar los que dependan de un valor calculado.

**Hecho cuando:** `check` y `a11y` pasan, no queda ningún `style={{` con valores fijos y la página usa ya las tres superficies.

## Fase 2. Hero y Ahora

- [ ] **Hero** según `DISENO.md`: composición en 12 columnas, panel "ahora mismo" con la hora real, hoja de contactos con las capturas y entrada escalonada del nombre.
- [ ] **Ahora:** los cuatro servicios con sus glifos SVG dibujándose, y los casos en bento (Lara's Oak y Roses en grande, Paula Krebel en mediano, Hidrotech en vino).

**Hecho cuando:** en la captura a 1440×900 de `/`, en el primer pantallazo se ve al menos una captura de un proyecto.

## Fase 3. Experiencia (la sala de máquinas)

- [ ] **VMV:** columna fija con las cifras y el mapa de sistema en SVG, con las conexiones dibujándose con el scroll y la leyenda de capacidades. Sustituye a las 8 cajas.
- [ ] **Neibr:**
  - el diagrama del algoritmo en 4 pasos,
  - la banda vino con las cifras del stress test,
  - la terminal escribiéndose sola al entrar en pantalla,
  - la narrativa con el premio y el cierre.
- [ ] **GOK Thermal:** tarjeta con `BrowserFrame` y la etiqueta "Encargo freelance".

**Hecho cuando:** Experiencia mide como mucho 2.400 px a 1440 de ancho, y ningún tramo de más de 1,5 pantallas queda sin imagen, diagrama o cifra destacada.

## Fase 4. Recorrido, Formación y Principios

- [ ] **Recorrido:** tres etapas, con raíl horizontal en escritorio y vertical en móvil, sin perder ningún hito.
- [ ] **Formación:** Peer2Stream y Pokédex con `BrowserFrame`, con sus créditos.
- [ ] **Principios:** en tinta, cuatro columnas con números en contorno y sin cajas.

**Hecho cuando:** el Recorrido mide como mucho 1,2 pantallas en escritorio.

## Fase 5. Contacto, footer y metadatos

- [ ] **Contacto:** en vino a todo el ancho, con los dos botones grandes y los perfiles. Footer en tinta.
- [ ] **Imágenes OG:** regenera las de los tres idiomas con la estética nueva (papel, nombre y titular).
- [ ] **README del repo:** actualízalo. Hoy aún dice "Systems Architect" y "base papel clara" como algo pendiente.

## Fase 6. Movimiento, rendimiento y accesibilidad

- [ ] **Repaso del movimiento contra `DISENO.md`:** cada animación explica algo y respeta `prefers-reduced-motion`. Comprueba con Playwright, emulando reduced-motion, que todo se ve en su estado final.
- [ ] **Presupuesto de JavaScript:** como mucho 35 KB gzip de cliente nuevo. Apunta la cifra real en el PR.
- [ ] **Métricas (`npm run lh`, mediana de 3 pasadas, móvil):** rendimiento ≥ 85 en el contenedor, accesibilidad 100, CLS ≤ 0,05 y LCP ≤ 2,5 s.
- [ ] **Accesibilidad y desbordamiento:** `npm run a11y` sin errores serios ni críticos y sin desbordamiento a 320 px en los tres idiomas.

## Fase 7. Cierre

- [ ] Ejecuta `check`, `a11y`, `seo`, `links`, `shots` y `lh`, y guarda los resultados en `docs/portfolio-v2/despues/`.
- [ ] Monta una galería de antes y después en `docs/portfolio-v2/CAPTURAS.md`, con las capturas de cada sección a 1440 y 375 px.
- [ ] Completa la descripción del PR:
  - resumen por fase,
  - tabla de métricas antes y después,
  - peso de JavaScript,
  - lo que queda en `PREGUNTAS.md`.
- [ ] Marca el PR como listo para revisar.
