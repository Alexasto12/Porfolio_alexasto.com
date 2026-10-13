# Decisiones y hechos

Este archivo manda sobre cualquier otro. Lo marcado como **(por defecto)** es una propuesta: cámbialo antes de lanzar si no estás de acuerdo.

## Decisiones

- **Dirección visual (por defecto):** se mantiene el tema oscuro, con la paleta accesible de `CLAUDE.md` y menos etiquetas mono.
- **Nombre visible (por defecto):** Alejandro Cabrera. AC_SYSTEMS desaparece. "Alexasto" queda solo como usuario y dominio.
- **Título (por defecto):**
  - es: Desarrollador backend y full-stack. Cofundador de Digital DesAny.
  - ca: Desenvolupador backend i full-stack. Cofundador de Digital DesAny.
  - en: Backend and full-stack developer. Co-founder of Digital DesAny.
- **Línea del hero (por defecto):**
  - es: Hago webs, backends y automatizaciones desde Granollers. Casi todo pasa por Digital DesAny, el estudio que llevo con Oriol Tamborero.
  - ca: Faig webs, backends i automatitzacions des de Granollers. Gairebé tot passa per Digital DesAny, l'estudi que porto amb l'Oriol Tamborero.
  - en: I build websites, backends and automations from Granollers, near Barcelona. Most of it goes through Digital DesAny, the studio I run with Oriol Tamborero.
- **Dominio canónico (por defecto):** `SITE_URL=https://dev.alexasto.com` hasta que alexasto.com apunte a esta web. Después, `https://alexasto.com`.
- **"Cuatro principios" (por defecto):** se queda, al final, antes del contacto.
- **Grafix en el recorrido (por defecto):** no se incluye.
- **GOK Thermal:** es un encargo freelance aparte, no de DesAny. Va en Experiencia como encargo propio, separado de los casos del estudio.
- **Cierre de Neibr (por defecto):**
  - es: Hablar con un gran operador nos mostró problemas del modelo que el código no iba a resolver, y lo cerramos antes de lanzar.
- **Contacto:**
  - Encargos: info@digitaldesany.com y WhatsApp +34 624 905 650 (https://wa.me/34624905650).
  - Personal: contact@alexasto.com.
  - LinkedIn: https://www.linkedin.com/in/ccalejandro/

## Hechos que se pueden publicar

### Digital DesAny

- Estudio web fundado por Alejandro Cabrera y Oriol Tamborero, en Granollers. Trabaja para pymes de toda Cataluña, en persona o en remoto.
- Web: https://www.digitaldesany.com (castellano en `/es`, catalán en `/ca`). LinkedIn: https://www.linkedin.com/company/digital-desany/
- Líneas de servicio:
  - **Webs a medida**, en cuatro partes que se contratan juntas o por separado: diseño, desarrollo, digitalización y despliegue.
  - **Gestión de redes sociales.**
  - **Automatizaciones** con y sin IA, según lo que pida el caso.
  - **Software a medida.**
- Cuando el proyecto está pagado, el código y el diseño son del cliente, con documentación técnica completa.
- Casos (enlazar a su ficha en digitaldesany.com):
  - **Lara's Oak** (`/es/casos-exito/lara-oak`): portfolio de storyboard y concept art, con un CMS hecho sobre un sistema de bloques propio. Web: https://larasoak.art
  - **Paula Krebel** (`/es/casos-exito/paula-krebel`): portfolio trilingüe de ilustración infantil y juvenil, con diseño de marca y design system.
  - **Roses de Sant Jordi** (`/es/casos-exito/rosesstjordi`): rosa digital con dedicatoria para Sant Jordi, en catalán y castellano. Más de 500 rosas enviadas y tendencia en Reddit Catalunya. Web: https://rosesstjordi.com
  - **Hidrotech Bordalló:** redes sociales para una empresa de maquinaria de limpieza industrial (reels de demostración, LinkedIn, YouTube y emails a su base de clientes). Sin web propia que capturar.

### Encargos freelance (aparte de DesAny)

- **GOK Thermal:** web de un instalador de climatización de Granollers, hecha como encargo freelance propio. No aparece como caso de Digital DesAny. Web: https://gokthermal.com

### VMV Cosmetic Group (2025-2026)

- Programador web principal.
- 32 dominios, 21 de ellos con web activa.
- 12 plugins internos y un store interno propio.
- 20 microservicios en Go, Java y Node.
- Capacidades que se pueden nombrar:
  - WAF en Go con reputación de IPs.
  - Servicios Java 21 / Spring Boot 3 que exponen el ERP en AS/400 como REST, con un patrón anti-corrupción.
  - Plataforma de magazine corporativo, con demo pública: https://magazine.salerm.com/s/7611600d-0ac8-4b56-b5a3-f54e1ed7522c
  - Gateway de IA con API compatible con OpenAI.
  - Plataforma de firma de documentos con biometría, en Next.js.
  - Motor asíncrono de generación de PDF, con estados en tiempo real.
  - Notificaciones de WhatsApp Business para las delegaciones, en Go.
  - Copias de seguridad que delegan el trabajo pesado en procesos hijo, fuera del límite de memoria de PHP.

### Neibr (cerrada en 2026)

- API B2B para operadores de paquetería: cuando una entrega falla, el paquete se asigna a un vecino en un radio de 200 m en lugar de volver al origen.
- Alejandro: cofundador y único desarrollador de backend. Además montó el despliegue y la web, y participó en la parte comercial y en las redes corporativas.
- Stack: Go (Fiber), PostgreSQL y Redis.
- Asignación: prefiltro por bounding box en SQL y luego distancia exacta con Haversine.
- Seguridad e integridad: API keys multi-tenant, escrituras idempotentes, webhooks firmados con HMAC y un ledger de auditoría inmutable.
- Stress test: unos 2,9 millones de peticiones en 50 minutos (~968 req/s), p95 por debajo de 100 ms y 0 errores 5xx.
- Premio: uno de los proyectos ganadores de los Santander X Spain Awards 2026 (UVic). Confirma el nombre exacto antes de lanzar.

### Formación y otros

- **Peer2Stream:** trabajo de fin de grado de DAW, nota 10/10, hecho con Ismael Delgado. Sirve para descubrir, ver y organizar películas y series. Next.js 15, React 19, MongoDB y TMDB.
  - Demo: https://peer2stream.alexasto.com/discover
  - Código: https://github.com/Alexasto12/peer2stream
- **Pokédex DS:** ejercicio de DAW. La carcasa de la DS está adaptada de un CodePen de Anton Essential (licencia MIT), con datos de la PokeAPI.
  - Demo: https://alexasto12.github.io/ProjectePokeAPI/
  - Código: https://github.com/Alexasto12/ProjectePokeAPI
- **WordPress.org:** el plugin Simply Bootstrap Carousel, con más de 10 instalaciones activas. Perfil: https://profiles.wordpress.org/alexasto12/
- **Automated Transactions (2024):** integración del pago cashless WiPay con máquinas expendedoras por MDB, traduciendo los payloads a hexadecimal por bus serie a 9600 baudios.
- **Recorrido:** se mantienen los hitos que ya están en la web, pasados a años, y se añade el hito de 2026 con Digital DesAny.

## Webs que hay que capturar (Fase 3)

- https://larasoak.art
- https://gokthermal.com
- https://rosesstjordi.com
- https://neibr.es
- https://peer2stream.alexasto.com/discover
- https://alexasto12.github.io/ProjectePokeAPI/
- La web de Paula Krebel: sácala de su ficha en digitaldesany.com. Si no aparece, esa tarjeta va sin captura.

## Lo que no se publica nunca

- El funcionamiento interno de las defensas, los backups o el ERP de VMV, ni nombres internos, proveedores o incidentes.
- Detalles de negocio de Neibr más allá de la frase de cierre.
- Precios de clientes o condiciones comerciales.
