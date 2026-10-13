# Resultado (después de la renovación)

Generado el 13 de octubre de 2026 sobre la rama `claude/portfolio-refresh` con los scripts del repo (`npm run check`, `shots`, `a11y`, `lh -- --all`, `seo` y `links`), después de la revisión final.

- `check.md`: salida de `npm run check` (ESLint, `tsc --noEmit` y build con la tabla de rutas estáticas).
- `shots/`: `{idioma}-{ancho}-top.jpg` (primera pantalla) y `{idioma}-{ancho}-full.jpg` (página completa) de `/`, `/ca` y `/en` a 375 y 1440 px.
- `a11y/axe.md`: axe (WCAG 2.2 AA y buenas prácticas), desbordamiento a 320 y 375 px y texto por debajo de 11 px.
- `lighthouse/summary.md`: móvil y escritorio de las tres rutas; los `.html` son los informes completos.
- `seo/seo.md`: comprobación de rutas estáticas, `lang`, canonical, hreflang, `og:locale`, JSON-LD, sitemap y robots. `og-es.png`, `og-ca.png` y `og-en.png` son las imágenes OG.
- `links.md`: enlaces externos. Desde la sesión solo responden los de GitHub porque la red no deja salir a otros dominios (ver `PREGUNTAS.md`).

La comparación con `antes/` está en la descripción del pull request.
