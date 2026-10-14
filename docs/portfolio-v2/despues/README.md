# Resultado (después del portfolio v2)

Generado el 14 de octubre de 2026 sobre la rama `claude/portfolio-v2` con los scripts del repo, después de la revisión final de la Fase 7. La línea base, con los mismos scripts, está en `../antes/`.

- `check.md`: salida de `npm run check` (ESLint, `tsc --noEmit` y build con la tabla de rutas estáticas).
- `a11y/axe.md`: axe (WCAG 2.2 AA y buenas prácticas) en `/`, `/ca` y `/en` a 375 y 1440 px, desbordamiento a 320 y 375 px y texto por debajo de 11 px.
- `motion/motion.md`: `npm run motion`. Reduced motion, sin JavaScript, impresión y secuencias, en los tres idiomas a 375 y 1440 px.
- `lighthouse/summary.md`: móvil y escritorio de `/`, mediana de 3 pasadas (como la línea base); los `.html` son los informes completos.
- `seo/seo.md`: rutas estáticas, `lang`, canonical, hreflang, `og:locale`, JSON-LD, sitemap y robots. `og-es.png`, `og-ca.png` y `og-en.png` son las imágenes OG.
- `links.md`: enlaces externos. Todos responden 200 menos el perfil personal de LinkedIn, que devuelve 999 (el código con el que LinkedIn rechaza peticiones automáticas); ver `../PREGUNTAS.md`.
- `shots/`: primera pantalla y página completa de `/`, `/ca` y `/en` a 375 y 1440 px, y en `secciones/` una imagen por sección de `/`.
- `medidas.md`: alto de cada sección, imágenes, SVG y JS de cliente.

La galería de antes y después está en `../CAPTURAS.md`; la comparación de métricas, en la descripción del pull request.
