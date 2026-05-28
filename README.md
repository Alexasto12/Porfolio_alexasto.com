# alexasto.com

Portfolio de **Alejandro Cabrera** — Systems Architect (BCN).

One-page editorial con base "papel" clara, retícula visible y un bloque oscuro
de contraste para el peso técnico. Construido en Next.js 15 (App Router),
TypeScript, Tailwind CSS v4 y Motion. Sin dependencias de pago.

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 15 (App Router, RSC) |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS v4 (CSS variables tokens) |
| Motion | `motion` / `motion/react` (versión gratuita) |
| Scramble | Implementación propia (`lib/useScramble.ts`) |
| Fuentes | Bricolage Grotesque · Space Mono · Hanken Grotesk (via `next/font/google`) |

> Nota: NO usar `scrambleText` de Motion+ (de pago). El scramble es propio.

## Estructura

```
app/
  layout.tsx       fuentes + metadata
  page.tsx         composición de secciones
  fonts.ts         next/font
  globals.css      tokens + retícula + keyframes
components/
  TelemetryBar     barra sticky con reloj en vivo
  GridBackground   retícula de 4 columnas
  Hero             nombre con scramble + intro + stack
  NeibrFeature     proyecto bandera + contador 3M / 50min
  VmvBlock         bloque oscuro VMV + ticker
  WorkSection      genérica freelance/productos
  ProjectRow       fila individual con hover + scramble
  Counter          contador con useInView
  Ticker           marquee infinito CSS
  ScrambleText     wrapper del hook
  Sparkline        barras animadas
  Contact          CTA + enlaces
lib/
  useScramble.ts   hook propio (NO Motion+)
  cn.ts            clsx + tailwind-merge
data/
  projects.ts      todo el copy tipado
```

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run start
npm run typecheck
```

## Accesibilidad

- `prefers-reduced-motion`: scramble, parallax, ticker y contadores
  caen a su estado final.
- Contraste AA garantizado: el nombre del hero nunca queda blanco sobre
  blanco — en claro usa tinta/vino, en oscuro usa papel claro.
- `lang="es"`, foco visible, fuentes con `display: swap`.

## Deploy

Vercel — dominio `alexasto.com`. Sin variables de entorno necesarias.
