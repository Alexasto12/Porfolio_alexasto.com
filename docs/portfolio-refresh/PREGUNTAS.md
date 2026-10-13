# Preguntas y decisiones tomadas sin preguntar

Lo que no cubría `DECISIONES.md`, qué se decidió y por qué. Lo marcado **Pendiente** necesita algo de Alejandro.

## Fase 0

- **ESLint no estaba configurado.** `next lint` pedía elegir configuración de forma interactiva, así que no se podía usar en `check`. Se añade `eslint.config.mjs` con `next/core-web-vitals` y `next/typescript`, y `lint` pasa a `eslint .`. Para que pase se corrigen dos avisos sin cambio visible: el `//` de la barra superior va como `{"//"}` y se quita un `eslint-disable` sin uso.
- **Versión de Playwright.** Se fija `@playwright/test` a 1.56.1 porque es la que corresponde al Chromium preinstalado en la sesión. Si se actualiza, hay que instalar su navegador con `npx playwright install chromium`.
- **Línea base de catalán e inglés.** Antes de la Fase 4 el idioma se elige en el cliente y `/ca` y `/en` no existen. Las capturas y axe de `antes/` cargan `/` con el idioma forzado (localStorage y locale del navegador). Lighthouse de `antes/` solo mide `/`.
- **Lighthouse es ruidoso en el contenedor.** Dos pasadas seguidas dieron 80 y 92 de rendimiento móvil. `lh` hace 3 pasadas y guarda la mediana. Las cifras sirven para comparar antes y después en esta máquina, no como valor absoluto.

## Fase 1

- **La paleta de texto da 4,51:1 justo sobre `#14130E`, y sobre nada más.** Sobre los paneles con tinte claro (`#1C1B15`) `#807D71` y `#D64B6E` bajaban a 4,18:1, y la textura de ruido del fondo también los dejaba por debajo de 4,5:1. Para mantener los valores de `CLAUDE.md` sin tocarlos: los paneles tienen ahora fondo opaco `#14130E` (se distinguen por el borde) y se quita la textura de ruido. El gris `#88857A` que ya existía (5:1) se mantiene para texto secundario.
- **Botón grande al pasar el ratón.** Pasaba a `#E24A72` con texto blanco (3,85:1). Ahora oscurece a `#8B1E3F`.
- **"Hover en el nombre para reanimar"** se mantiene solo en dispositivos con ratón (`@media (hover: hover) and (pointer: fine)`), que era la opción que conserva la función. El nombre animado lleva el texto real oculto para lectores de pantalla y la versión animada con `aria-hidden`.
- **Barra superior en móvil.** Por debajo de 860 px se ocultan el rol, la ubicación y el reloj; por debajo de 480 px también AC_SYSTEMS (desaparece en la Fase 2). Queda "Disponible para proyectos" y el selector de idioma en una sola línea a 320 px.
- **Orden del selector de idioma:** ES, CA, EN, el mismo orden que las rutas `/`, `/ca` y `/en`.
- **Panel oculto de ajustes (Ctrl+Shift+E).** El acento que elige solo cambia texto grande, rellenos y bordes; el texto pequeño usa siempre `#D64B6E` para no romper el contraste.
