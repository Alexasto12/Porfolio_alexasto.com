# Preguntas y decisiones tomadas sin preguntar

Lo que no cubría `DECISIONES.md`, qué se decidió y por qué. Lo marcado **Pendiente** necesita algo de Alejandro.

## Fase 0

- **ESLint no estaba configurado.** `next lint` pedía elegir configuración de forma interactiva, así que no se podía usar en `check`. Se añade `eslint.config.mjs` con `next/core-web-vitals` y `next/typescript`, y `lint` pasa a `eslint .`. Para que pase se corrigen dos avisos sin cambio visible: el `//` de la barra superior va como `{"//"}` y se quita un `eslint-disable` sin uso.
- **Versión de Playwright.** Se fija `@playwright/test` a 1.56.1 porque es la que corresponde al Chromium preinstalado en la sesión. Si se actualiza, hay que instalar su navegador con `npx playwright install chromium`.
- **Línea base de catalán e inglés.** Antes de la Fase 4 el idioma se elige en el cliente y `/ca` y `/en` no existen. Las capturas y axe de `antes/` cargan `/` con el idioma forzado (localStorage y locale del navegador). Lighthouse de `antes/` solo mide `/`.
- **Lighthouse es ruidoso en el contenedor.** Dos pasadas seguidas dieron 80 y 92 de rendimiento móvil. `lh` hace 3 pasadas y guarda la mediana. Las cifras sirven para comparar antes y después en esta máquina, no como valor absoluto.
