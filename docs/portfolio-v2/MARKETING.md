# Capa de marketing: guía de redacción

> **Estado (22 de octubre de 2026).** Aplicada a los textos de la web: 55 textos cambiados, añadidos o quitados, uno por uno en [`marketing/CAMBIOS.md`](marketing/CAMBIOS.md). Cada propuesta pasó por un verificador que rechazaba todo lo que añadiera un hecho, rompiera los tres idiomas o no fuera claramente mejor: de 57 propuestas se aplicaron 54 (algunas corregidas) y se descartaron 3 (las descripciones de tres capacidades de VMV, donde el término exacto sirve mejor a quien evalúa). Decisiones tomadas al aplicarla:
>
> - **"Web" en catalán va en masculino** ("el web", "dos webs", "webs publicats"), como dice Optimot para "lloc web" y como escribe digitaldesany.com/ca.
> - **No se publica** "Si un día cambias de proveedor, te los llevas", ningún plan de pasos tras el primer mensaje ni tiempos de respuesta: faltan los datos (ver "Datos que faltan" y `PREGUNTAS.md`).
> - **El mensaje de WhatsApp que se rellena solo no cambia**, porque lo recibe el estudio. Debajo de los botones hay una línea que dice lo que hace el botón.
> - **La propiedad del código sale dos veces en la portada** (frase del inicio y Servicios), con las mismas palabras, y no entra en la descripción de `Person` del JSON-LD.
>
> Comprobado con `check`, `seo` (392 de 392), `a11y` (0 fallos en las 21 páginas), `motion` (72 de 72), `links` y Lighthouse en las tres portadas (móvil de 97 a 99, escritorio 100). Lo que sigue es la guía tal como salió de la investigación; sus ejemplos de antes y después pueden diferir un poco de lo publicado.

Esta guía sirve para reescribir los textos de la web (`lib/content.ts` y `lib/pages.ts`) con una capa de marketing, contando lo mismo pero mejor. Sale de cuatro investigaciones: conversión, confianza, redacción de interfaz (UX writing) y portfolios de estudios y desarrolladores. Contrasté los resultados con `CLAUDE.md`, `docs/portfolio-refresh/DECISIONES.md`, `docs/portfolio-v2/RONDA2.md`, los dos `PREGUNTAS.md` y la web servida en local, en los tres idiomas, a 1440 y a 375 px (build del 22 de octubre de 2026).

Tres reglas mandan sobre todo lo que viene después:

1. **Los hechos salen solo de `DECISIONES.md`** o de lo que ya está publicado en la web sin contradecirlo. Si una técnica necesita un dato que no tenemos, se escribe la versión sin ese dato y el dato va a "Datos que faltan".
2. **`CLAUDE.md` manda sobre esta guía.** Primera persona, frases cortas, hechos y cifras, sin autoetiquetas ni superlativos, sin rayas y con los tres idiomas iguales.
3. **"Mejor" quiere decir más claro, más concreto y más corto, no más persuasivo.** En el estudio de NN/g, la versión promocional de un mismo texto fue la peor; la concisa, escaneable y objetiva mejoró la usabilidad un 124 %.

Casi toda la evidencia es de profesionales del sector o cualitativa (NN/g, Copyhackers, Unbounce, encuestas de proveedores como GoDaddy). Sirve para elegir palabras, no para prometer subidas de conversión. Esta web no tiene tráfico para hacer tests A/B, así que comprobamos con métodos gratuitos: la prueba de cinco segundos con 3 a 5 dueños de pymes, leer el texto en voz alta y traducirlo de vuelta.

## Diagnóstico rápido de la web actual

Lo que ya funciona y se queda:

- El orden de la portada (promesa, prueba, oferta, profundidad, persona, criterio y acción) y su razón, que está en `RONDA2.md`.
- El H1 con nombre, oficio y lugar.
- La fila de cifras, cada una enlazada a donde se cuenta su historia.
- La tarjeta de Roses, que da primero el resultado y después qué es.
- Los títulos de "Cómo trabajo", el retrato y la frase del cierre de Neibr.
- Los botones "Escribir por WhatsApp" y "Escribir por correo", con el número y la dirección a la vista.
- La primera pantalla a 375 px, donde caben el H1, la frase de oferta, los dos botones y la primera cifra.

Lo que falla, por orden de impacto:

- **El hero no dice por qué elegirle.** Además usa "backends", que es vocabulario de desarrollador.
- **La jerga aparece en bloques que leen las pymes:** "0 errores 5xx", "p95", "APIs, integraciones".
- **Los servicios describen el método y no lo que resuelven** ("Con y sin IA, según lo que pida el caso").
- **La franja de la mitad de la página no dice qué escribir**, y comparte espacio con un enlace a otra web.
- **Contacto cambia de quién habla sin explicarlo:** el titular dice "Cuéntame" y el texto sigue con "Escríbenos... cuéntanos".
- **Experiencia presenta Neibr por su cierre** y tiene un titular genérico.
- **La descripción de Google de la portada está escrita para desarrolladores**, con el stack, mientras que la portada habla a pymes.
- **Hay textos repetidos y calcos:** "Trabajamos para pymes de toda Cataluña..." repite el hero, y aparecen "store" y "magazine" en castellano y catalán.

---

## 1. Para quién escribimos

### A. Dueño o gerente de una pyme catalana (objetivo principal: que escriba por WhatsApp o por correo)

- **Quién es:** del tipo de clientes que ya salen en la web: un instalador de climatización de Granollers, una empresa de maquinaria de limpieza industrial, una ilustradora o una artista de storyboard.
- **Qué quiere saber en los primeros segundos:**
  - Qué haces y si es para alguien como yo.
  - Por qué tú y no otro.
  - Si detrás hay una persona real y cercana.
  - Cómo te escribo sin esfuerzo.
  - Según la investigación, la claridad de la propuesta de valor decide si sigue leyendo (Unbounce, MECLABS, CXL).
- **Qué le preocupa:**
  - **Quedarse atado al proveedor:** no tener el código, el diseño o el dominio, y no poder cambiar de proveedor.
  - **Haber pagado webs que no sirvieron.** Los lectores de Marta Torre lo cuentan a propósito del Kit Digital: "me han costado caro y mal".
  - **No saber de quién fiarse**, con muchas llamadas comerciales.
  - **No entender lo técnico.**
  - **El precio.** No lo podemos publicar: `DECISIONES.md` prohíbe publicar condiciones comerciales.
  - Lo que más pesa: en la encuesta de GoDaddy a pymes, el precio no decidió en ningún caso. Pesaban la visión (que entiendan su idea y su marca), la confianza y poder dedicarse a su negocio. Las reseñas y el portfolio decidían para el 71 %.
- **Palabras que usa:** todavía no tenemos datos propios (falta leer mensajes reales de clientes, ver "Datos que faltan").
  - Hasta entonces usamos las palabras que ya funcionan en la web: web, redes, a medida, pymes, WhatsApp, correo, "qué necesitas y para cuándo".
  - En los bloques para pymes evitamos o explicamos las palabras del estudio y del oficio: backend, API, despliegue, digitalización, 5xx, p95.

### B. Quien evalúa a Alejandro como desarrollador (reclutador, responsable técnico, empresa que subcontrata, posible socio)

- **Qué quiere saber en los primeros segundos:**
  - Qué parte hizo él exactamente.
  - Con qué tecnologías y a qué escala, en cifras.
  - Si hay criterio, es decir, por qué decidió cada cosa.
  - Si se puede comprobar: código, demos, webs en marcha.
  - Fuentes: Kalzumeus, Vanschneider, el hilo de Hacker News, techinterview.
- **Qué le preocupa:**
  - Cifras de equipo vendidas como propias.
  - Palabras de moda sin nada detrás.
  - Afirmaciones que no se pueden comprobar.
  - Un fracaso escondido o maquillado.
- **Palabras que usa:** las del oficio, que aquí son la prueba y no se tocan: Go, Fiber, Java 21, Spring Boot 3, AS/400, Next.js, PostgreSQL, Redis, API, microservicios, p95, HMAC, idempotencia, OpenAPI, ADR. Busca cosas como "programador backend Barcelona".

### Qué página es de quién (una sola persona lectora por página)

| Página | Lector principal | Consecuencia |
|---|---|---|
| Portada (hero, Trabajos, Servicios, Contacto) | Pyme | Palabras de cliente primero; lo técnico, glosado o más abajo |
| Portada (Experiencia, Cómo trabajo) | Evaluador | Términos exactos, con la versión llana donde la lee también la pyme |
| `/desarrollo-web` | Pyme | Promesa, partes contratables, webs publicadas |
| `/desarrollo-backend`, `/proyectos/neibr`, `/proyectos/vmv-cosmetic-group` | Evaluador | Toda la precisión técnica; un enlace al servicio para la pyme que llegue |
| `/proyectos`, `/sobre-mi` | Los dos | Hechos y quién hizo qué |

---

## 2. Posicionamiento y mensaje

**Posicionamiento (frase interna, no se publica tal cual):** para pymes de toda Cataluña que necesitan una web, automatizaciones o software hecho para su caso, Alejandro Cabrera, desde Digital DesAny en Granollers, lo hace a medida, en persona o en remoto. Cuando el proyecto está pagado, el código y el diseño son del cliente, con documentación técnica completa.

**Alternativas que tiene el cliente (solo para nosotros, nunca se nombran en la web):**

- No hacer nada.
- Una plantilla hecha por uno mismo.
- Un familiar o conocido.
- Un proveedor que se queda el código.

Según April Dunford, nos posicionamos frente a estas alternativas diciendo qué gana el cliente, no hablando mal de nadie.

### Pilares del mensaje

| Pilar | Qué decimos | Hechos que lo sostienen (y solo esos) |
|---|---|---|
| 1. Lo que hacemos es tuyo | El código y el diseño son del cliente cuando el proyecto está pagado, con documentación técnica completa | `DECISIONES.md`, Digital DesAny ("Cuando el proyecto está pagado, el código y el diseño son del cliente..."); en la web, `services.ownership` y el último principio de "Cómo trabajo" |
| 2. A medida y por partes | Cuatro líneas: webs, redes, automatizaciones y software. Las webs, en cuatro partes que se contratan juntas o por separado | `DECISIONES.md`, líneas de servicio; casos de Lara's Oak, Paula Krebel, Roses e Hidrotech |
| 3. Pruebas que se pueden comprobar | Cifras exactas y enlaces fuera de la web | Roses: más de 500 rosas, cerca de 5.000 visitas, tendencia en Reddit Catalunya. VMV: 32 dominios (21 con web activa), 12 plugins, 20 microservicios. Neibr: unos 2,9 millones de peticiones en 50 minutos, unas 968 por segundo, p95 por debajo de 100 ms y 0 errores 5xx; uno de los proyectos ganadores de los Santander X Spain Awards 2026 (UVic). Webs en marcha, demo de la revista de VMV, Peer2Stream en GitHub (10/10), plugin en WordPress.org |
| 4. Personas reales y cerca | Dos fundadores con nombre, un sitio y dos canales directos | Alejandro Cabrera y Oriol Tamborero; Granollers, cerca de Barcelona; pymes de toda Cataluña, en persona o en remoto; WhatsApp +34 624 905 650 e info@digitaldesany.com; retrato; web en castellano, catalán e inglés |

El pilar 1 es la única diferencia comercial que podemos demostrar. Por eso va en la promesa del hero y junto a los botones de la oferta, siempre con las mismas palabras, y como mucho dos veces por página (ver la técnica 5).

---

## 3. Voz

### Quién habla

- **"Yo" es Alejandro** cuando habla de su trabajo: la frase del hero ("Hago..."), VMV Cosmetic Group, Neibr, GOK Thermal, el recorrido, la formación y "Cómo trabajo".
- **"Nosotros" es Digital DesAny:** los servicios, los casos del estudio y los canales de encargos (WhatsApp e info@).
- **El cambio de "yo" a "nosotros" se explica una vez, con nombres:** "Los proyectos los llevamos Oriol Tamborero y yo desde Digital DesAny". Así "Cuéntame tu proyecto", que es el botón del hero y el titular de Contacto, deja de chocar con "Escríbenos".
- **Nunca "yo" en un caso del estudio** (Roses, Lara's Oak, Paula Krebel, Hidrotech) hasta que Alejandro diga qué parte hizo él.
- **Nunca "nosotros" en VMV** (era su empleador, no un cliente) **ni en GOK Thermal** (encargo freelance propio).
- **Roses de Sant Jordi es un proyecto propio del estudio**, no de un cliente.
- **El lector puede ser el sujeto de la frase** ("Contratas solo las partes que te faltan"), pero quien narra sigue siendo Alejandro. Es lo que StoryBrand llama cliente protagonista, sin pasar a una voz publicitaria.

### Tratamiento: tú, tu, you

- **Castellano, tú; catalán, tu; inglés, you.** En todas las páginas, también en los textos alternativos y los mensajes que se rellenan solos. Nunca usted ni vostè, y nada de vós.
- **Por qué:**
  - La web ya trata de tú ("son tuyos", "Cuéntame tu proyecto").
  - El canal principal es WhatsApp.
  - Las fuentes:
    - La guía de estilo de la UB reserva el tu para mensajes menos formales y con confianza, y pide no mezclar formas en un mismo texto.
    - Kempas (BELLS, 2019) observa que el tuteo en la venta online en castellano busca confianza y cercanía.
    - NN/g encontró que un tono casual se percibía algo más de fiar (en EE. UU.).
- **Mezclar tratamientos es peor que cualquiera de las dos opciones.**
- **El mensaje de WhatsApp lo escribe el cliente al estudio**, así que usa "os" y "us" (vosotros), que es lo correcto en España.

### Longitud y forma

- **Una idea por frase.** Hero y servicios, unas 25 palabras como mucho por frase (una enumeración puede pasar un poco). Páginas técnicas, hasta 30. Es el criterio de lenguaje claro en castellano (Cassany; Prodigioso Volcán, citado por Meer).
- **Voz activa y presente, con sujeto claro:** "diseño", "hacemos". Nada de "se desarrolló".
- **Lo importante primero**, en cada frase, tarjeta y bloque (técnica 2).
- **Titulares en minúscula de frase**, sin Title Case en castellano ni en catalán.
- **Sin rayas, sin exclamaciones, sin emoji, sin titulares de eslogan con punto final** y con una pregunta retórica por sección como mucho.
- **Números:**
  - Castellano y catalán con coma decimal y punto de miles: 2,9 M, 5.000, 95 % (con espacio duro, U+00A0, que ya está en el subconjunto de fuentes). Inglés: 2.9 M, 5,000, 95%.
  - Las cautelas se copian tal cual: "más de", "cerca de", "unos", "~".
- **Caracteres:** "¿", "¡", "«»", "·", "…" y "%" están en `UNICODES` de `scripts/subset-fonts.py`. Cualquier otro hay que comprobarlo.

### Una palabra para cada cosa (glosario)

| Concepto | ES | CA | EN | Dónde |
|---|---|---|---|---|
| Lo que hizo el estudio para clientes y lo propio del estudio | trabajos | treballs | work | Sección e índice de la portada ("Trabajos con Digital DesAny") |
| La ficha en digitaldesany.com | caso | cas | case study | Enlaces "El caso en digitaldesany.com" |
| Todo lo hecho, también lo personal | proyectos | projectes | projects | Página `/proyectos` y pie |
| Cada una de las cuatro líneas | servicio | servei | service | Servicios |
| Digital DesAny | el estudio | l'estudi | the studio | Siempre |
| GOK Thermal | encargo freelance | encàrrec freelance | freelance job | Experiencia y Proyectos |
| Pymes | pymes | pimes | small and medium businesses (SMEs solo en títulos y descripciones SEO, por espacio) | Siempre |

- **"Stress test"** se queda tal cual en las páginas y bloques técnicos (es lo que se busca). En los textos para pymes se dice lo que significa: "sin ningún error del servidor".
- **Catalán, "web":** hoy aparece en masculino ("el web de GOK Thermal", "Portada del web de Paula Krebel") y en femenino ("la web de Neibr", "amb web activa", "La vaig fer", "Webs publicades"). Hay que consultar Optimot o TERMCAT, elegir un género y aplicarlo en todas las apariciones, también en las nuevas ("dues webs" o "dos webs").
- **Inglés:** ortografía británica, que ya se usa (neighbour, digitalisation, organise, licence).

### Cómo encajan las técnicas con las reglas de `CLAUDE.md`

| Regla de `CLAUDE.md` | Cómo la respeta la capa de marketing |
|---|---|
| Primera persona | El lector puede ser sujeto ("Contratas..."), pero quien narra es Alejandro; "nosotros" solo para el estudio |
| Hechos y cifras | La especificidad y la autoridad se consiguen con cifras publicadas y enlaces, nunca con adjetivos |
| Sin autoetiquetas ni superlativos | La confianza viene de lo que se puede comprobar; la técnica de "riesgo invertido" se limita al hecho de la propiedad del código, sin garantías |
| No inventar datos | Cada técnica que pide un dato que no hay (testimonios, plazos, precio, resultados) se queda en su versión sin él y el dato va a "Datos que faltan" |
| VMV solo por capacidades y escala | La versión llana de una capacidad dice quién la usaba ("las delegaciones"), nunca cómo funciona por dentro |
| Tres idiomas iguales | Cada técnica da la versión en castellano, catalán e inglés; los textos de venta (hero, titulares y botones) se escriben en cada idioma a partir de la misma idea y se comprueban traduciéndolos de vuelta |
| Sin rayas | Las aclaraciones van con dos puntos, comas o paréntesis |

---

## 4. Técnicas que aplicamos

Las técnicas van por orden de impacto. Cada ejemplo parte de un texto real de hoy y da el después en castellano, catalán e inglés. En los ejemplos de catalán, "web" va en el género que tiene hoy ese texto, hasta que se decida (ver Voz).

### T1. Propuesta de valor en la primera pantalla: qué, para quién y por qué tú

- **Qué es:** el primer bloque responde en cinco segundos qué haces, para quién y por qué elegirte. Una frase clara y concreta funciona mejor que una ingeniosa, y la persuasión solo sirve encima de la claridad.
- **Dónde se aplica:**
  - Frase de oferta del hero (`DATA.hero.lead`).
  - Descripción SEO de la portada (T13).
  - Entradilla de `/desarrollo-web`.
- **Antes** (`hero.lead`, ES): "Hago webs, backends y automatizaciones para pymes de toda Cataluña."
- **Después:**
  - ES: "Hago webs, automatizaciones y software a medida para pymes de toda Cataluña. El código y el diseño son tuyos cuando el proyecto está pagado."
  - CA: "Faig webs, automatitzacions i programari a mida per a pimes de tot Catalunya. El codi i el disseny són teus quan el projecte està pagat."
  - EN: "I build websites, automations and custom software for small and medium businesses across Catalonia. The code and the design are yours once the project is paid for."
- **Ojo:**
  - El H1 sigue diciendo "Desarrollador web y backend en Granollers": es lo que posiciona en buscadores y lo que busca quien evalúa.
  - "Software a medida" es el nombre de la línea de servicio (una palabra para cada cosa).
  - Las redes sociales no van en "Hago" hasta saber quién las lleva en el estudio.
  - Lo medí en el build local con una frase así: los dos botones siguen en la primera pantalla a 375×812 y 360×740 en los tres idiomas (a 320×568 ya quedaban debajo antes del cambio).
  - `hero.lead` es también la descripción de Person en el JSON-LD (`lib/site.ts`).
  - Hay que pasarlo por la prueba de cinco segundos con 3 a 5 dueños de pymes.
- **Fuentes:** Unbounce (claridad de la propuesta de valor), MarketingExperiments (claridad del mensaje), CXL (propuesta de valor), StoryBrand ("5 Things Your Website Should Include").

### T2. Lo importante primero: palabras iniciales y pirámide invertida

- **Qué es:** se lee escaneando, así que el principio de cada línea y la primera frase de cada bloque cargan con el significado. Las condiciones, los nombres que el lector aún no conoce y el relleno van detrás.
- **Dónde se aplica:**
  - Propiedad del código (`services.ownership`).
  - Servicio de redes.
  - Entrada de Experiencia.
  - Tercera cifra del hero.
  - Tarjetas y capacidades de VMV.
- **Antes** (`experience.description`, ES): "Fui programador web principal en VMV Cosmetic Group y cofundé Neibr, una API B2B que cerramos antes de lanzar. Aparte, hice la web de GOK Thermal como encargo freelance."
- **Después:**
  - ES: "Fui el programador web principal de VMV Cosmetic Group y cofundé Neibr, una API B2B para operadores de paquetería. Aparte, hice la web de GOK Thermal como encargo freelance."
  - CA: "Vaig ser el programador web principal de VMV Cosmetic Group i vaig cofundar Neibr, una API B2B per a operadors de paqueteria. A part, vaig fer el web de GOK Thermal com a encàrrec freelance."
  - EN: "I was the lead web developer at VMV Cosmetic Group and co-founded Neibr, a B2B API for parcel carriers. Separately, I built the GOK Thermal website as a freelance job."
- **Segundo ejemplo** (`services.items[1].text`):
  - Antes (ES): "Para Hidrotech Bordalló, por ejemplo: reels de demostración, LinkedIn, YouTube y emails a su base de clientes."
  - ES: "Reels de demostración, LinkedIn, YouTube y emails a la base de clientes, como en el caso de Hidrotech Bordalló."
  - CA: "Reels de demostració, LinkedIn, YouTube i correus a la base de clients, com en el cas d'Hidrotech Bordalló."
  - EN: "Demo reels, LinkedIn, YouTube and emails to the customer base, as in the Hidrotech Bordalló case."
- **Ojo:** el cierre de Neibr no desaparece. Se queda en su bloque, explicado ("Por qué cerramos Neibr").
- **Fuentes:** NN/g (patrón en F, las dos primeras palabras, pirámide invertida).

### T3. Dos capas: la palabra del cliente primero y el término técnico después

- **Qué es:** en los bloques que lee la pyme va primero lo que pasa, en palabras normales, y el término exacto detrás, entre paréntesis o en la frase siguiente. Así nadie tiene que traducir y el evaluador no pierde precisión. En las páginas técnicas, la jerga se queda entera.
- **Dónde se aplica:**
  - Fila de cifras del hero.
  - Banda del stress test: etiquetas de p95 y 5xx y la frase resumen.
  - Servicio de software.
  - Seguridad en la página de Neibr, con un texto llano nuevo antes del técnico.
  - No se aplica en VMV, en `/desarrollo-backend` ni en "Cómo trabajo", que son para evaluadores.
- **Antes** (`hero.proof[2].text`, ES): "peticiones en 50 minutos en el stress test de Neibr, con 0 errores 5xx"
- **Después:**
  - ES: "peticiones en 50 minutos sin ningún error del servidor (stress test de Neibr)"
  - CA: "peticions en 50 minuts sense cap error del servidor (stress test de Neibr)"
  - EN: "requests in 50 minutes without a single server error (Neibr stress test)"
- **Segundo ejemplo** (`neibr.stressSentence`):
  - Antes (ES): "Unos 2,9 millones de peticiones en 50 minutos: unas 968 por segundo, con el p95 por debajo de 100 ms y ningún error 5xx."
  - ES: "Unos 2,9 millones de peticiones en 50 minutos, unas 968 por segundo. El 95 % se respondió en menos de 100 ms (p95) y ninguna dio error del servidor (5xx)."
  - CA: "Uns 2,9 milions de peticions en 50 minuts, unes 968 per segon. El 95 % es va respondre en menys de 100 ms (p95) i cap no va donar error del servidor (5xx)."
  - EN: "About 2.9 million requests in 50 minutes, some 968 per second. 95% were answered in under 100 ms (p95) and none returned a server error (5xx)."
- **Etiquetas de la banda:**
  - "p95" pasa a "95 de cada 100 respuestas (p95)" / "95 de cada 100 respostes (p95)" / "95 in 100 responses (p95)".
  - "errores 5xx" pasa a "errores del servidor (5xx)" / "errors del servidor (5xx)" / "server errors (5xx)".
- **Ojo:**
  - "0 errores 5xx" y "sin ningún error del servidor" son el mismo hecho, porque los 5xx son errores del servidor.
  - No se simplifica hasta cambiar el hecho ("nunca falla").
  - Hay que mirar que las etiquetas nuevas no rompan la banda a 375 px.
- **Fuentes:** NN/g (escribir para expertos, rastro de información, cifras en número), Unbounce Conversion Benchmark Report (nivel de lectura), Kalzumeus, Stanford Web Credibility.

### T4. Primero el trabajo que resuelves, después el método

- **Qué es:** el cliente "contrata" un servicio para resolver algo en su situación (Jobs to be Done). Cada línea de servicio empieza por esa situación, con el cliente como sujeto, y el cómo (IA, Next.js, partes) va en segundo lugar. No se prometen resultados.
- **Dónde se aplica:**
  - Los cuatro servicios.
  - La entradilla de `/desarrollo-web`.
  - La tarjeta de GOK Thermal (lo que pueden hacer los clientes del instalador).
- **Antes** (Automatizaciones, ES): "Con y sin IA, según lo que pida el caso."
- **Después:**
  - ES: "Para que las tareas que repites a mano se hagan solas, con IA o sin ella según el caso. Un ejemplo de cuando trabajaba en VMV Cosmetic Group: los avisos de WhatsApp Business para sus delegaciones."
  - CA: "Perquè les tasques que repeteixes a mà es facin soles, amb IA o sense segons el cas. Un exemple de quan treballava a VMV Cosmetic Group: els avisos de WhatsApp Business per a les seves delegacions."
  - EN: "So the tasks you repeat by hand run on their own, with or without AI depending on the case. An example from my time at VMV Cosmetic Group: the WhatsApp Business notifications for its regional offices."
- **Webs a medida:**
  - Antes (ES): "En cuatro partes que se contratan juntas o por separado: diseño, desarrollo, digitalización y despliegue."
  - ES: "Contratas solo las partes que te faltan: diseño, desarrollo, digitalización o despliegue. O las cuatro juntas."
  - CA: "Contractes només les parts que et falten: disseny, desenvolupament, digitalització o desplegament. O les quatre juntes."
  - EN: "You hire only the parts you're missing: design, development, digitalisation or deployment. Or all four together."
- **Software a medida:**
  - Antes (ES): "APIs, integraciones y aplicaciones hechas para un caso concreto."
  - ES: "Cuando ningún programa estándar encaja con cómo trabajas: aplicaciones hechas para tu caso y conexiones entre los programas que ya usas (APIs e integraciones)."
  - CA: "Quan cap programa estàndard no encaixa amb com treballes: aplicacions fetes per al teu cas i connexions entre els programes que ja fas servir (APIs i integracions)."
  - EN: "When no off-the-shelf software fits the way you work: applications built for your case and connections between the programs you already use (APIs and integrations)."
- **Ojo:**
  - El ejemplo de VMV va en "yo" y dice que era su trabajo, no un caso del estudio.
  - Nada de "ahorra 10 horas" ni de "más ventas".
  - Si el estudio tiene un caso de automatización propio, sustituye al de VMV (ver "Datos que faltan").
- **Fuentes:** HBS Working Knowledge (Christensen, batidos), Copyhackers ("How to be specific"), AgencyAnalytics (el cliente protagonista), GoDaddy ("What clients want").

### T5. Posicionarse frente a la alternativa con el único hecho comercial que se puede demostrar

- **Qué es:** el miedo de la pyme a quedarse atada al proveedor se responde con una política concreta y comprobable, no con una garantía. Se dice el atributo y lo que significa para el cliente, sin nombrar a nadie.
- **Dónde se aplica:**
  - Promesa del hero (T1).
  - Línea de propiedad de Servicios.
  - Cabecera de `/desarrollo-web`, que ya reutiliza `services.ownership`.
  - **Regla:** como mucho dos veces por página, en la promesa y junto a la oferta. En la portada, el hero y Servicios; Contacto no lo repite.
- **Antes** (`services.ownership`, ES): "Cuando el proyecto está pagado, el código y el diseño son tuyos, con documentación técnica completa."
- **Después:**
  - ES: "El código y el diseño son tuyos cuando el proyecto está pagado, con documentación técnica completa. Si un día cambias de proveedor, te los llevas."
  - CA: "El codi i el disseny són teus quan el projecte està pagat, amb documentació tècnica completa. Si un dia canvies de proveïdor, te'ls endús."
  - EN: "The code and the design are yours once the project is paid for, with full technical documentation. If you ever change providers, you take them with you."
- **Ojo:**
  - La primera frase solo cambia el orden y se puede publicar ya.
  - La segunda es una consecuencia directa de que sean del cliente, pero conviene que Alejandro la confirme antes de publicarla.
  - No se extiende a dominio, hosting ni cuentas ("te lo llevas todo"), ni se añade "sin permanencia" o "garantía".
  - Las mismas palabras en el hero y en Servicios.
- **Fuentes:** April Dunford (guía rápida de posicionamiento), NN/g (cuatro factores de confianza, transparencia), Michel Fortin (riesgo invertido).

### T6. Quitar esfuerzo y dudas junto al botón

- **Qué es:** justo antes de hacer clic, el visitante calcula el esfuerzo y la duda. Una línea con un hecho junto al botón, que diga qué escribir o qué va a pasar, quita fricción sin añadir persuasión. Un primer paso pequeño y concreto (dos frases por WhatsApp) cuesta menos que un formulario.
- **Dónde se aplica:**
  - Franja de Servicios (`services.cta.line`).
  - Línea bajo los botones (texto nuevo en `ContactButtons`).
  - Mensaje prerrellenado de WhatsApp (`contact.whatsappText`).
  - Texto de Contacto (T10).
- **Antes** (`services.cta.line`, ES): "Si tienes un proyecto en mente, escríbenos."
- **Después:**
  - ES: "¿Tienes un proyecto en mente? Cuéntanos qué necesitas y para cuándo."
  - CA: "Tens un projecte al cap? Explica'ns què necessites i per a quan."
  - EN: "Have a project in mind? Tell us what you need and by when."
- **Línea nueva bajo los botones** (lo que el código ya hace):
  - ES: "Abre WhatsApp con el mensaje ya empezado."
  - CA: "Obre WhatsApp amb el missatge ja començat."
  - EN: "Opens WhatsApp with the message already started."
- **Mensaje prerrellenado, propuesta para que el cliente solo tenga que seguir escribiendo:**
  - Antes (ES): "Hola, os escribo desde {host}. Me gustaría comentaros un proyecto."
  - ES: "Hola, os escribo desde {host}. Lo que necesito y para cuándo: "
  - CA: "Hola, us escric des de {host}. El que necessito i per a quan: "
  - EN: "Hi, I'm writing from {host}. What I need and by when: "
- **Ojo:**
  - El enlace "Más sobre el estudio en digitaldesany.com" sale de la franja: es una salida a otra web justo donde se decide, y el pie ya enlaza al estudio.
  - El mensaje prerrellenado nuevo necesita el visto bueno del estudio, que es quien lo recibe. Lo pide `docs/portfolio-v2/PREGUNTAS.md` (Ronda 2, pendiente 6). Si no se cambia, la línea bajo el botón dice "con el mensaje ya escrito".
  - Una línea por botón y nada más: ni insignias ni "sin compromiso".
- **Fuentes:** MarketingExperiments (fricción y ansiedad), Copyhackers (texto de botones), Influence at Work (compromiso y coherencia), NN/g (confianza: formularios largos).

### T7. Enlaces y botones que dicen adónde llevan

- **Qué es:** un enlace es una promesa. La etiqueta debe dejar adivinar qué hay detrás, no solo dónde está. Las etiquetas iguales repetidas y las genéricas hacen dudar, sobre todo a quien usa lector de pantalla y oye los enlaces en lista.
- **Dónde se aplica:**
  - `services.moreLabel` (aparece cuatro veces).
  - Enlace del caso de Roses.
  - `hero.ctaWork` en inglés.
  - `PAGES.backend.serviceLabel`.
- **Antes** (`services.moreLabel`, ES): "En digitaldesany.com"
- **Después:**
  - ES: "El servicio en digitaldesany.com"
  - CA: "El servei a digitaldesany.com"
  - EN: "The service page at digitaldesany.com"
- **Ojo:** en Webs a medida el enlace va a la página general `/servicios`. O se apunta a una página concreta o esa tarjeta lleva "Los servicios en digitaldesany.com".
- **Más cambios:**
  - **Roses** (hoy usa el `CASE_LINK` común): "Las cifras y el caso, en digitaldesany.com" / "Les xifres i el cas, a digitaldesany.com" / "The figures and the case study, at digitaldesany.com". La tarjeta necesita su propia etiqueta.
  - **`hero.ctaWork` EN:** "See my work" pasa a "See the work". Los trabajos son del estudio y así coincide con "Ver trabajos".
  - **`PAGES.backend.serviceLabel`:** "Software a medida en digitaldesany.com" pasa a "APIs, integraciones y aplicaciones para tu empresa: software a medida en digitaldesany.com" / "APIs, integracions i aplicacions per a la teva empresa: programari a mida a digitaldesany.com" / "APIs, integrations and applications for your business: custom software at digitaldesany.com".
- **Lo que se queda:**
  - "Hablemos" en el header: es corto, cabe a 320 px y lleva a Contacto.
  - "Cuéntame tu proyecto", "Escribir por WhatsApp", "Cómo hice el backend de Neibr" y "Todo lo que llevaba en VMV".
  - El prefijo solo para lectores de pantalla con el nombre del caso o del servicio.
- **Fuentes:** NN/g ("Get Started Stops Users", enlaces "Learn more", rastro de información), Google (texto de los enlaces).

### T8. Concreción: sustantivos que se ven y cifras exactas

- **Qué es:** un resumen con categorías obliga a imaginar; los sustantivos concretos y los números con su cautela dejan ver el resultado. Se revisa cada titular y entradilla con las 4 U (útil, única, ultraespecífica; la urgencia se deja fuera).
- **Dónde se aplica:**
  - Entradilla de Trabajos.
  - Tarjetas.
  - Cifras de VMV.
  - Entradilla de Sobre mí, contada con escenas.
- **Antes** (`work.description`, ES): "Webs a medida, una campaña de Sant Jordi y redes sociales. Cada caso completo está en digitaldesany.com."
- **Después:**
  - ES: "Una campaña de Sant Jordi con más de 500 rosas enviadas, dos webs a medida para artistas y las redes de una empresa de maquinaria de limpieza industrial. Cada caso completo está en digitaldesany.com."
  - CA: "Una campanya de Sant Jordi amb més de 500 roses enviades, dues webs a mida per a artistes i les xarxes d'una empresa de maquinària de neteja industrial. Cada cas complet és a digitaldesany.com." (Con "web" en masculino, sería "dos webs".)
  - EN: "A Sant Jordi campaign with over 500 roses sent, two custom websites for artists and the social media of an industrial cleaning machinery company. Each full case study is on digitaldesany.com."
- **Segundo ejemplo** (etiqueta de VMV):
  - Antes (ES): "plugins internos y un store interno propio"
  - ES: "plugins internos y una tienda interna de plugins"
  - CA: "plugins interns i una botiga interna de plugins"
  - EN: se queda "internal plugins and an in-house plugin store".
- **Ojo:**
  - "Dos webs para artistas" son Lara's Oak (storyboard y concept art) y Paula Krebel (ilustración), las dos publicadas.
  - Las cifras se copian como están: "más de 500", "cerca de 5.000", "21 de 32".
  - No se calculan cifras nuevas, como "15 años de experiencia".
- **Fuentes:** Copyhackers ("How to be specific"), Unbounce (las 4 U), NN/g (titulares como frase de enganche, cifras en número), ClickZ (Schindler y Yalch, cifras precisas).

### T9. Autoridad sin testimonios: el hecho comprobable primero y su enlace al lado

- **Qué es:** se confía más en lo que se puede comprobar fuera de la web que en lo que la web dice de sí misma. Sin testimonios, cada bloque abre con su hecho más fuerte y lo enlaza a donde se ve.
- **Dónde se aplica:**
  - Fila de cifras: cada cifra enlaza a su historia.
  - Tarjetas, con su web en marcha.
  - Premio de Neibr.
  - Demo de la revista de VMV.
  - Peer2Stream en GitHub.
  - WordPress.org.
  - Orden de la portada: la prueba (Trabajos) va antes de la petición (franja de Servicios).
- **Antes** (`hero.proof[0].text`, ES): "rosas digitales enviadas por Sant Jordi"
- **Después:**
  - ES: "rosas digitales enviadas por Sant Jordi, con tendencia en Reddit Catalunya"
  - CA: "roses digitals enviades per Sant Jordi, amb tendència a Reddit Catalunya"
  - EN: "digital roses sent for Sant Jordi, trending on Reddit Catalunya"
- **Ojo:**
  - El premio se queda con su texto exacto ("uno de los proyectos ganadores de los Santander X Spain Awards 2026 (UVic)"): nada de "premiado" ni "premio del Banco Santander" mientras no se confirme el nombre.
  - No se escriben ni se resumen testimonios.
  - No se usan logos de quien no es cliente (VMV era el empleador).
- **Fuentes:** NN/g (confianza: conexión con el resto de la web), Influence at Work (autoridad), Stanford Web Credibility (directrices 1 y 3), GoDaddy.

### T10. Quién hizo qué, con personas y lugar

- **Qué es:** el lector quiere saber con quién va a tratar, y quien evalúa quiere saber qué parte fue de Alejandro. Los nombres, el pueblo y una frase que separe el "yo" del "nosotros" dan las dos cosas.
- **Dónde se aplica:**
  - Texto de Contacto.
  - Ejemplo de VMV en Automatizaciones (T4).
  - GOK Thermal.
  - En el futuro, una línea "Mi parte" en cada caso del estudio, cuando Alejandro la dé.
- **Antes** (`contact.body`, ES): "Escríbenos por WhatsApp o por correo y cuéntanos qué necesitas y para cuándo. Los proyectos los llevamos desde Digital DesAny."
- **Después:**
  - ES: "Escríbenos por WhatsApp o por correo. Con dos frases basta: qué necesitas y para cuándo. Los proyectos los llevamos Oriol Tamborero y yo desde Digital DesAny, en Granollers."
  - CA: "Escriu-nos per WhatsApp o per correu. N'hi ha prou amb dues frases: què necessites i per a quan. Els projectes els portem l'Oriol Tamborero i jo des de Digital DesAny, a Granollers."
  - EN: "Message us on WhatsApp or by email. Two sentences are enough: what you need and by when. Oriol Tamborero and I run the projects through Digital DesAny, in Granollers."
- **Ojo:**
  - Explica el paso de "Cuéntame" (titular) a "Escríbenos" sin decir quién contesta el WhatsApp, que no está confirmado.
  - "Colaboro en la integración" (Automated Transactions) se queda: no se cambia a "integré".
- **Fuentes:** Vanschneider (casos en el portfolio), NN/g ("About Us"), techinterview.org, Stanford Web Credibility (directrices 2, 4 y 5).

### T11. Un proyecto cerrado se cuenta como trabajo con resultados y el cierre como decisión

- **Qué es:** primero va el papel y lo conseguido, y el cierre una sola vez, como hecho, sin disculparse. Contar un revés junto a los aciertos se percibe como orgullo merecido, no como presunción (Brooks y otros, Harvard).
- **Dónde se aplica:**
  - Línea de rol de Neibr (`neibr.sub`, en la portada y en la cabecera de su página).
  - Orden del bloque.
  - Frase de cierre.
- **Antes** (`neibr.sub`, ES): "Cofundador, cerrada en 2026"
- **Después:**
  - ES: "Cofundador y único desarrollador de backend"
  - CA: "Cofundador i únic desenvolupador de backend"
  - EN: "Co-founder and sole backend developer"
- **Para no repetirlo, `neibr.role` pierde su primera frase:**
  - ES: "Además del backend, monté el despliegue y la web, y participé en la parte comercial y en las redes de la empresa."
  - CA: "A més del backend, vaig muntar el desplegament i la web, i vaig participar en la part comercial i a les xarxes de l'empresa."
  - EN: "Besides the backend, I set up the deployment and the website, and took part in sales and the company's social media."
- **Cierre, propuesta para Alejandro** (la frase de `DECISIONES.md` es "por defecto"; el contenido no cambia):
  - ES: "Antes de lanzar hablamos con un gran operador. Nos mostró problemas del modelo que el código no iba a resolver, y decidimos cerrar."
  - CA: "Abans de llançar vam parlar amb un gran operador. Ens va mostrar problemes del model que el codi no resoldria, i vam decidir tancar."
  - EN: "Before launch we talked to a large carrier. It showed us problems in the model that code wasn't going to fix, so we decided to shut it down."
- **Ojo:**
  - "Por qué cerramos Neibr" se queda a la vista.
  - Nada de "fracaso", "por desgracia" ni "pivotamos".
  - Ningún detalle de negocio más.
  - No se escribe una lección en boca de Alejandro que él no haya dicho.
- **Fuentes:** Behavioral Scientist ("Brag wisely", sobre Brooks y otros), ResumeAdapter y Dice (cómo contar una startup que cierra), Ertz y otros (mensajes de dos caras).

### T12. Titulares que resumen su sección

- **Qué es:** quien escanea lee los titulares y salta el resto. Cada h2 dice exactamente qué hay debajo, empieza por la palabra del índice o nombra lo principal, y se entiende fuera de contexto. Nada de juegos de palabras ni eslóganes.
- **Dónde se aplica:**
  - Experiencia.
  - Revisión de los demás h2 de la portada y de las subpáginas.
- **Antes** (`experience.heading`, ES): "Experiencia en backend y web"
- **Después:**
  - ES: "Experiencia: VMV Cosmetic Group, Neibr y GOK Thermal"
  - CA: "Experiència: VMV Cosmetic Group, Neibr i GOK Thermal"
  - EN: "Experience: VMV Cosmetic Group, Neibr and GOK Thermal"
- **Ojo:**
  - Ya cumplen y se quedan: "Webs, redes, automatizaciones y software a medida", "Trabajos con Digital DesAny", "Empecé abriendo el portátil de casa con 11 años" (escena concreta y comprobable) y los títulos de "Cómo trabajo".
  - No se tocan los `id` de las anclas.
  - Un solo h1 por página.
- **Fuentes:** NN/g (escaneo en capas, microcontenido), Google (contenido útil).

### T13. El texto de Google coincide con la promesa de la página

- **Qué es:** la descripción que sale en el buscador es lo primero que lee una pyme. Debe decir lo mismo que el hero de la página a la que lleva, con sus palabras. Cada página habla a un lector y a una intención de búsqueda.
- **Dónde se aplica:**
  - `SEO.home.description`.
  - `SEO.web.title` y `SEO.web.description`.
  - El texto de `app/llms.txt/route.ts` que repite la frase del hero.
- **Antes** (`SEO.home.description`, ES): "Desarrollador web y backend en Granollers (Barcelona). Hago webs, APIs y automatizaciones con Go, Java y Next.js. Cofundador de Digital DesAny."
- **Después:**
  - ES (158 caracteres): "Hago webs, automatizaciones y software a medida para pymes de toda Cataluña, desde Granollers. El código y el diseño son tuyos cuando el proyecto está pagado."
  - CA (155): "Faig webs, automatitzacions i programari a mida per a pimes de tot Catalunya, des de Granollers. El codi i el disseny són teus quan el projecte està pagat."
  - EN (157): "I build websites, automations and custom software for SMEs across Catalonia, from Granollers. The code and the design are yours once the project is paid for."
- **Ojo:**
  - El título de la portada no cambia (60 caracteres, oficio y lugar).
  - El stack sale de esta descripción a propósito: se queda en `/desarrollo-backend` y `/desarrollo-web`.
  - Antes de cambiar títulos, hay que mirar las consultas reales en Search Console (gratis). No tenemos datos de búsquedas, así que no se afirma nada sobre la demanda.
  - El cambio de `/desarrollo-web` está en su ficha.
- **Fuentes:** Unbounce (coincidencia del mensaje), Copyhackers (portada según el nivel de conciencia), Google (guía de inicio de SEO y contenido útil).

### T14. Conciso, escaneable y objetivo: quitar repeticiones y partir frases

- **Qué es:** la capa de marketing no añade párrafos: quita lo repetido, parte las frases con dos ideas y cambia cada adjetivo por el hecho que lo sostiene. Ante cada frase nueva, la pregunta es: si un cliente preguntara "¿cómo lo sabes?", ¿se sostendría?
- **Dónde se aplica:**
  - `services.description`: se borra, porque repite el hero ("Trabajamos para pymes de toda Cataluña, en persona o en remoto.").
  - "Cómo trabajo", punto 1.
  - Entradilla de `/desarrollo-web`.
  - Entradilla de Sobre mí.
- **Antes** (`process.items[0].body`, ES): "Antes de escribir lógica de negocio diseño el contrato de la API y el esquema de la base de datos, con OpenAPI versionado y el esquema documentado."
- **Después:**
  - ES: "Antes de escribir lógica de negocio, diseño el contrato de la API y el esquema de la base de datos. Los dos quedan documentados, con OpenAPI versionado."
  - CA: "Abans d'escriure lògica de negoci, dissenyo el contracte de l'API i l'esquema de la base de dades. Tots dos queden documentats, amb OpenAPI versionat."
  - EN: "Before writing business logic, I design the API contract and the database schema. Both get documented, with versioned OpenAPI."
- **Ojo:** al borrar `services.description`, `Services.tsx` deja de pasar `description` a `SectionHead`, y la línea de propiedad pasa a ser lo primero de la sección.
- **Fuentes:** NN/g ("Concise, scannable and objective"), Unbounce Conversion Benchmark Report (longitud y conversión), Meer (frases cortas), digital.gov (lenguaje claro).

---

## 5. Lo que no hacemos

### Técnicas descartadas

| Técnica | Por qué no |
|---|---|
| Urgencia o escasez ("plazas limitadas", "solo este mes", cuentas atrás) | No hay ningún plazo real que citar. La urgencia falsa resta credibilidad y es práctica desleal (Ley 3/1991, art. 23.4; barrido de la Comisión Europea de 2023). La única urgencia es la del cliente: "para cuándo" |
| Testimonios, reseñas, estrellas o contadores ("+20 clientes", "clientes satisfechos") | No existen. Se piden de verdad, con nombre y permiso, y hasta entonces se enlaza lo comprobable |
| Precios, "desde X €", "presupuesto gratis", "sin compromiso", "sin permanencia", "respuesta en 24 o 48 h", "garantía", "precio cerrado", "el dominio a tu nombre" | Son condiciones comerciales que `DECISIONES.md` no publica. El "Respondo en menos de 48h" se quitó a propósito (`docs/portfolio-refresh/PREGUNTAS.md`, Fase 2) |
| Superlativos y autoetiquetas ("experto", "los mejores", "líderes", "referente", "rápido", "seguro", "robusto", "escalable", "de calidad", "profesionales", "apasionado", "autodidacta") | Lo prohíbe `CLAUDE.md`; un hecho hace ese trabajo mejor |
| Inflar hechos ("premiado", "cientos de rosas", "+5.000 visitas", "decenas de webs", "15 años de experiencia", "integré" en lugar de "colaboro") | Cambia el hecho publicado o lo deduce sin que nadie lo haya dicho |
| Agitar el problema (PAS completo, "pierdes clientes cada día", "¿Miedo a que te estafen?") y el antes y después de un cliente | Pide afirmaciones sobre las pérdidas del lector o la situación previa del cliente que no podemos sostener. Solo Roses tiene resultado, y no tiene "antes" |
| Comparaciones ("a diferencia de otras agencias", hablar mal del Kit Digital) | No se puede comprobar, y Dunford desaconseja competir con rivales imaginarios |
| Sellos (Kit Digital, Agente Digitalizador) | Solo si el estudio está autorizado (Ley 3/1991, art. 21.2) |
| Botones en primera persona ("Quiero contaros mi proyecto") | Se basa en un solo test sin muestra publicada y suena forzado en castellano y catalán |
| Un tercer botón en el hero, o más salidas junto a los botones | Compiten con la acción principal |
| Etiquetas genéricas ("Más información", "Saber más", "Ver más", "Haz clic aquí", "Empezar", "Enviar") | No dicen adónde llevan |
| Simplificar las páginas técnicas (quitar Haversine, HMAC, p95, AS/400) | Para el evaluador, esa es la prueba |
| Jerga en los bloques para pymes sin explicarla ("backends", "5xx") | Es la "maldición del conocimiento" |
| Detalle interno de VMV (defensas, nombres internos, proveedores, incidentes, esquemas del ERP) o de negocio de Neibr | Lo prohíben `CLAUDE.md` y `DECISIONES.md` |
| Inventar la voz del cliente | Las palabras del cliente salen de mensajes reales, no se escriben |
| Tomar un test A/B como regla (el +90 % del botón, el +200 % del banco) | Son casos sueltos y de otro contexto |

### Aplazado hasta tener datos

- **Plan de tres pasos en Contacto (StoryBrand).** No sabemos qué pasa después del primer mensaje: llamada, visita o presupuesto. Plantilla preparada para cuando se sepa:
  - ES: "1. Nos escribes por WhatsApp o por correo: qué necesitas y para cuándo. 2. [paso confirmado por Alejandro]. 3. [entrega o siguiente paso confirmado]."
  - Con el plan publicado, la propiedad del código no se añade como tercer paso en la portada: ya sale dos veces.
- **Pregunta de problema y solución en Servicios** ("¿Tu web solo la puede tocar quien la hizo?"). La propiedad del código saldría tres veces en la portada. Se puede usar en `/desarrollo-web` si se quita de otro sitio.
- **"No hacemos..."** (decir qué no hace el estudio). Solo con las palabras de Alejandro.
- **"Ens pots escriure en català o en castellà"** y sus equivalentes. Es un compromiso de servicio y hay que confirmarlo.

### Frases que suenan a plantilla o a IA (prohibidas)

- **Castellano:**
  - Fórmulas: "soluciones digitales", "soluciones integrales", "a medida de tus necesidades", "impulsa tu negocio", "potencia tu presencia digital", "lleva tu negocio al siguiente nivel", "transformación digital", "en un mundo cada vez más digital", "de principio a fin", "sin complicaciones", "experiencia única", "pasión por", "marcar la diferencia", "te acompañamos en cada paso", "ecosistema", "sinergia".
  - Enlaces y aperturas: "Descubre", "¿Listo para...?", "Sabemos lo difícil que es...", "Entendemos tus necesidades", "En resumen".
  - Estructuras: "No es solo una web, es...", "No solo... sino también", tríadas como "calidad, compromiso y cercanía" o "rápidas, seguras y escalables".
- **Catalán:**
  - Fórmulas: "solucions digitals", "solucions integrals", "a mida de les teves necessitats", "impulsa el teu negoci", "fes créixer el teu negoci", "potencia la teva presència digital", "porta el teu negoci al següent nivell", "transformació digital", "en un món cada vegada més digital", "de principi a fi", "sense complicacions", "experiència única", "passió per", "marcar la diferència", "t'acompanyem a cada pas".
  - Enlaces y aperturas: "Descobreix", "Preparat per...?".
  - Estructuras: "No és només un web, és...", "No només... sinó també".
- **Inglés:**
  - Fórmulas: "seamless", "elevate", "cutting-edge", "tailored solutions", "empower", "unlock", "leverage", "game-changer", "take your business to the next level", "in today's digital world", "end-to-end", "hassle-free", "passionate about", "we're with you every step of the way", "robust, scalable and secure", "delve".
  - Enlaces y aperturas: "Ready to...?", "Discover".
  - Estructuras: "It's not just a website, it's...", "not only... but also".
- **Patrones, en cualquier idioma:**
  - Una pregunta retórica en cada bloque.
  - Una frase de resumen al final de una sección.
  - Titulares de eslogan con punto final.
  - Exclamaciones, emoji y negritas por todas partes.
  - Title Case en castellano y catalán.
  - Rayas (`—`, `–`).

---

## 6. Checklist por texto

Cada texto reescrito tiene que pasar todo esto:

1. **Tres idiomas:** dice lo mismo en castellano, catalán e inglés, con los mismos hechos y el mismo tratamiento (tú, tu, you), y se cambió en los tres a la vez.
2. **Hechos:** cada hecho está en `DECISIONES.md` o ya en la web, y las cifras van con su "más de", "cerca de" o "unos" tal cual.
3. **"¿Cómo lo sabes?":** se sostiene si un cliente lo pregunta.
4. **Primeras palabras:** las dos primeras dicen de qué va la línea, y la primera frase del bloque es la más importante.
5. **Una idea por frase:** unas 25 palabras como mucho en portada y servicios, 30 en las páginas técnicas.
6. **Quién habla:** "yo" para lo de Alejandro y "nosotros" para el estudio, nunca mezclados en la misma frase sobre el mismo trabajo. VMV y GOK nunca como casos del estudio.
7. **Jerga:** en un bloque para pymes, nada de jerga sin explicar. En una página técnica, el término exacto sigue ahí.
8. **Nada de la lista de "Lo que no hacemos"**, ni promesas comerciales, ni urgencia.
9. **Forma:** sin rayas, sin exclamaciones, sin emoji, sin eslogan con punto, como mucho una pregunta retórica por sección, titulares en minúscula de frase.
10. **VMV y Neibr:** VMV solo por capacidades y escala; Neibr, nada de negocio más allá del cierre.
11. **Enlaces y botones:** dicen adónde llevan, y la acción principal usa el mismo verbo en todas partes ("Cuéntame tu proyecto").
12. **Propiedad del código:** como mucho dos veces por página, y siempre con las mismas palabras.
13. **Caracteres:** todos están en `UNICODES` de `scripts/subset-fonts.py`.
14. **SEO:** si es un título, 60 caracteres o menos; si es una descripción, de 110 a 160.
15. **Comprobaciones:** `npm run check`, `npm run seo`, `npm run a11y` (sin desbordamientos a 320 y 375 px; mirar header, botones y la banda del stress test) y `npm run shots`, en los tres idiomas.
16. **Fecha:** se actualiza `CONTENT_UPDATED` en `lib/site.ts` (`lastmod` del sitemap y `dateModified`).
17. **Antes de publicar:**
    - Prueba de cinco segundos del hero con 3 a 5 dueños de pymes: qué hace y para quién.
    - Leer cada texto para pymes en voz alta, como si fuera por teléfono.
    - Traducir de vuelta el catalán y el inglés.

---

## 7. Datos que faltan (preguntar a Alejandro; no inventar)

| Dato | Dónde iría | Mientras tanto |
|---|---|---|
| Qué pasa después del primer mensaje: llamada, visita, presupuesto escrito, si la primera reunión es gratis | Plan de tres pasos en Contacto; franja de Servicios | Texto de Contacto sin plan (T10) |
| Tiempo de respuesta u horario (digitaldesany.com publica "de lunes a viernes, de 09:00 a 20:00") | Línea junto a los botones | Nada |
| Quién lee el WhatsApp y info@ (Alejandro, Oriol o los dos) | Texto de Contacto; si el botón del hero es "Cuéntame" o "Cuéntanos" | "Los proyectos los llevamos Oriol Tamborero y yo", sin decir quién contesta |
| Si el estudio atiende en catalán y en castellano (y en inglés) | Línea en Contacto ("Ens pots escriure en català o en castellà") | Nada |
| Si dominio y hosting quedan a nombre del cliente; si hay cuotas o permanencia | Propiedad del código en Servicios | Solo código y diseño |
| Si se puede publicar "Si un día cambias de proveedor, te los llevas" | `services.ownership` | Solo la primera frase |
| Si se puede mostrar un precio orientativo general de digitaldesany.com (choca con `DECISIONES.md`, así que es una decisión explícita) | Servicios y `/desarrollo-web` | Sin precio ni pistas ("precios ajustados") |
| Qué incluyen "digitalización" y "despliegue" | Servicio de webs y "Las cuatro partes" de `/desarrollo-web` | Los nombres de las partes, sin explicarlas |
| Qué parte hizo Alejandro en Roses, Lara's Oak, Paula Krebel e Hidrotech | Línea "Mi parte" en cada tarjeta | "Nosotros" |
| Quién lleva las redes en el estudio | Si las redes entran en "Hago..." del hero | Fuera del hero |
| Un caso real de automatización del estudio, con permiso | Servicio de Automatizaciones | El ejemplo de VMV, en "yo" |
| Resultados medibles de Lara's Oak, Paula Krebel, Hidrotech y GOK Thermal | Tarjetas y entradilla de Trabajos | Lo más concreto que se entregó, sin cifras |
| Testimonios reales con nombre y permiso; si Digital DesAny tiene perfil de Google con reseñas | Tarjetas, Contacto o un bloque nuevo | Enlaces comprobables |
| 20 a 30 primeros mensajes reales de clientes, anonimizados (voz del cliente) | Frase del hero y nombres de los servicios | Las palabras que ya usa la web |
| Qué no hace el estudio, en palabras de Alejandro | Entradilla de Servicios | Solo para quién es |
| Una frase de Alejandro sobre qué aprendió al cerrar Neibr | Bloque del cierre de Neibr | Ninguna lección |
| Nombre exacto del premio (pendiente desde el refresh) | Fila de cifras, Neibr, JSON-LD | El texto actual, sin ampliarlo |
| Consultas reales en Search Console | Títulos de `/desarrollo-web` y descripción de la portada | La propuesta de T13 y de la ficha de SEO |
| Visto bueno al mensaje prerrellenado nuevo de WhatsApp | `contact.whatsappText` | El mensaje actual |
| Si el estudio puede usar algún sello de programa | Ninguna parte, salvo que lo pida | Nada |

---

## 8. Fuentes

Las reunieron las cuatro investigaciones; para esta guía no las he vuelto a abrir. Entre paréntesis, lo fuerte que es cada una.

**Conversión y mensaje**

- https://unbounce.com/landing-pages/increase-conversions-by-improving-the-clarity-of-your-value-proposition/ (un test de proveedor)
- https://marketingexperiments.com/copywriting/web-messaging-clarity-conversion (un test de proveedor)
- https://cxl.com/blog/value-proposition-examples-how-to-create/
- https://storybrand.com/wp-content/uploads/2016/01/5-Things-Your-Website-Should-Include.pdf (anecdótico)
- https://www.aprildunford.com/post/a-quickstart-guide-to-positioning (marco de trabajo)
- https://unbounce.com/conversion-glossary/definition/message-match/
- https://unbounce.com/conversion-benchmark-report/ (muestra grande, correlacional, en inglés)
- https://unbounce.com/copywriting/gut-check-your-landing-page-headlines/
- https://copyhackers.com/2016/06/great-home-page-copy/
- https://copyhackers.com/how-to-optimize-your-button-copy/
- https://copyhackers.com/how-to-be-specific/
- https://copyhackers.com/2015/10/copywriting-formula/
- https://copyhackers.com/2014/10/amazon-review-mining/
- https://copyhackers.com/2022/08/how-to-write-about-us-page/
- https://marketingexperiments.com/conversion-marketing/friction-and-anxiety-in-your-marketing-process-defining-the-difference
- https://sitetuners.com/blog/me-vs-you-how-pronouns-affect-click-conversion-rates/
- https://www.library.hbs.edu/working-knowledge/clay-christensens-milkshake-marketing

**Confianza y persuasión honesta**

- https://www.nngroup.com/articles/trustworthy-design/ (cualitativo, varios países)
- https://www.nngroup.com/articles/about-us-information-on-websites/
- https://credibility.stanford.edu/guidelines/ (2002, muestra grande)
- https://www.influenceatwork.com/7-principles-of-persuasion/
- https://www.entrepreneur.com/article/282642
- https://www.godaddy.com/resources/news/what-clients-want (encuesta de proveedor, EE. UU.)
- https://www.brightlocal.com/research/local-consumer-review-survey-2025/
- https://www.clickz.com/3-ways-you-can-improve-landing-page-testimonials/
- https://michelfortin.com/copywriting/risk-reversal/
- https://ideas.repec.org/p/hbs/wpaper/14-034.html (revisado por pares, servicios públicos)
- https://checklists.opquast.com/en/digital-quality/108
- https://microcopyexamples.substack.com/p/what-you-are-not
- https://martatorre.dev/opinion-experiencia-kit-digital/
- https://www.vilaweb.cat/noticies/floristeria-barcelona-atendre-catala/
- https://constellation.uqac.ca/7773/1/socsci-10-00229.pdf (revisión académica, conclusiones mixtas)
- https://ec.europa.eu/commission/presscorner/api/files/document/print/en/ip_23_418/IP_23_418_EN.pdf
- https://www.ccpc.ie/business/ccpc-participates-in-eu-wide-sweep-of-websites-to-identify-dark-patterns/
- https://www.boe.es/buscar/act.php?id=BOE-A-1991-628

**Redacción de interfaz y SEO**

- https://www.nngroup.com/articles/concise-scannable-and-objective-how-to-write-for-the-web/ (1997, controlado)
- https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/
- https://www.nngroup.com/articles/first-2-words-a-signal-for-scanning/
- https://www.nngroup.com/articles/inverted-pyramid/
- https://www.nngroup.com/articles/writing-domain-experts/
- https://www.nngroup.com/articles/information-scent/
- https://www.nngroup.com/articles/web-writing-show-numbers-as-numerals/
- https://www.nngroup.com/articles/learn-more-links/
- https://www.nngroup.com/articles/get-started/
- https://www.nngroup.com/articles/layer-cake-pattern-scanning/
- https://www.nngroup.com/articles/microcontent-how-to-write-headlines-page-titles-and-subject-lines/
- https://www.nngroup.com/articles/headings-pickup-lines/
- https://www.nngroup.com/articles/tone-voice-users/
- https://www.nngroup.com/articles/tone-of-voice-dimensions/
- https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- https://developers.google.com/search/docs/crawling-indexing/links-crawlable
- https://www.ub.edu/llibre-estil/criteri.php?id=3052
- https://bells.uib.no/index.php/bells/article/view/1339
- https://www.meer.com/es/95909-por-que-y-como-escribir-oraciones-cortas
- https://digital.gov/guides/plain-language/writing
- https://www.smartling.com/blog/six-ways-transcreation-differs-from-translation (proveedor interesado)
- https://www.lostiempos.com/node/185148 (nota de Fundéu sobre banca)
- https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing (descriptivo)
- https://www.infobae.com/tecno/2024/07/03/estas-son-las-palabras-que-revelan-que-un-texto-fue-escrito-con-inteligencia-artificial/ (prensa, sin estudio)

**Portfolios y casos**

- https://thoughtbot.com/case-studies
- https://thoughtbot.com/case-studies/closeknit-health
- https://set.studio/
- https://vanschneider.com/blog/portfolio-tips/write-project-case-studies-portfolio/
- https://vanschneider.com/blog/portfolio-tips/make-portfolio-work-cant-shared/
- https://gooddesigner.substack.com/p/presenting-confidential-design-work
- https://www.kalzumeus.com/2011/10/28/dont-call-yourself-a-programmer/
- https://news.ycombinator.com/item?id=43134745
- https://agencyanalytics.com/blog/write-a-marketing-case-study-for-clients
- https://behavioralscientist.org/brag-wisely/ (resume a Brooks y otros, revisado por pares)
- https://www.resumeadapter.com/post-layoff-resume/startup-failure
- https://www.dice.com/career-advice/getting-a-job-after-the-startup-fails
- https://www.techinterview.org/post/3233474604/quantifying-impact-engineering-resume/
- https://www.psychologicalscience.org/news/were-only-human/precisely-right-no-doubt-trust-me.html
- https://jvns.ca/blog/brag-documents/
- https://www.freecodecamp.org/news/the-single-biggest-factor-in-a-clients-decision-to-give-you-a-project-3a9b3defac15/
