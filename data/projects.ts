import { l, type Localized } from "@/lib/i18n-types";

export type Tag = Localized<string>;

export type ProjectLink = {
  label: string;
  href: string;
  kind?: "landing" | "platform" | "repo" | "demo";
};

export type LocalizedProject = {
  id: string;
  name: string;
  domain?: string;
  description: Localized<string>;
  tags: Tag[];
  links: ProjectLink[];
  meta?: Localized<string>;
  /** Free-form, used as the placeholder caption. */
  shotLabel?: Localized<string>;
};

export type VmvCapability = {
  title: Localized<string>;
  description: Localized<string>;
  link?: ProjectLink;
  badge?: Localized<string>;
};

export type VmvStat = {
  value: number;
  label: Localized<string>;
  caption: Localized<string>;
};

export type TimelineEntry = {
  year: string | Localized<string>;
  age?: string;
  title: Localized<string>;
  place: Localized<string>;
  body: Localized<string>;
  kind?: "milestone" | "education" | "work" | "project";
};

export type Service = {
  group: Localized<string>;
  items: Localized<string>[];
};

const tag = (es: string, en: string, ca: string): Tag => l(es, en, ca);

/* ───────── Telemetry bar ───────── */

export const telemetry = {
  systemId: "AC_SYSTEMS",
  name: "Alejandro Cabrera",
  role: l(
    "Systems Architect · Granollers / BCN",
    "Systems Architect · Granollers / BCN",
    "Arquitecte de sistemes · Granollers / BCN"
  ),
  availability: l(
    "Disponible para nuevos proyectos",
    "Open to new projects",
    "Disponible per a nous projectes"
  ),
} as const;

/* ───────── Hero ───────── */

export const hero = {
  sectionLabel: l("001 — PERFIL", "001 — PROFILE", "001 — PERFIL"),
  sectionHint: l(
    "hover para reanimar ↻",
    "hover to replay ↻",
    "passa el cursor per reanimar ↻"
  ),
  firstName: "Alejandro",
  lastName: "Cabrera",
  tagline: l(
    "Arquitecto de sistemas.",
    "Systems architect.",
    "Arquitecte de sistemes."
  ),
  intro: l(
    "Diseño y construyo microservicios de alto rendimiento, infraestructura de red corporativa y plataformas API-first. Busco que la elegancia estructural del backend se refleje en la del frontend.",
    "I design and build high-throughput microservices, corporate network infrastructure and API-first platforms. I aim for the structural elegance of the backend to translate into the frontend.",
    "Dissenyo i construeixo microserveis d'alt rendiment, infraestructura de xarxa corporativa i plataformes API-first. Busco que l'elegància estructural del backend es reflecteixi en la del frontend."
  ),
  intro2: l(
    "Vivo en Granollers, trabajo en Barcelona. La idea es siempre la misma: un sistema bien pensado se nota — en la latencia, en el coste y en la calma con la que se opera.",
    "I live in Granollers, work in Barcelona. The idea is always the same: a well-thought system shows — in latency, in cost, and in the calm of operating it.",
    "Visc a Granollers, treballo a Barcelona. La idea és sempre la mateixa: un sistema ben pensat es nota — en la latència, en el cost i en la calma amb què s'opera."
  ),
  stack: [
    { label: "Go · Chi · SQLite", weight: "primary" as const },
    { label: "Java 21 · Spring Boot · AS/400", weight: "primary" as const },
    { label: "Next.js 15 · React 19 · TS", weight: "primary" as const },
    { label: "WordPress · Docker · LiteLLM", weight: "secondary" as const },
  ],
  contextLabel: l("CONTEXTO", "CONTEXT", "CONTEXT"),
  stackLabel: l("STACK PRINCIPAL", "PRIMARY STACK", "STACK PRINCIPAL"),
  ratings: [
    { label: l("Arquitectura", "Architecture", "Arquitectura"), value: 10 },
    {
      label: l("Backend de alto rendimiento", "High-perf backend", "Backend d'alt rendiment"),
      value: 10,
    },
    { label: l("Seguridad", "Security", "Seguretat"), value: 9 },
    { label: l("AI engineering", "AI engineering", "AI engineering"), value: 7 },
  ],
} as const;

/* ───────── Approach ───────── */

export const approach = {
  sectionNumber: "002",
  sectionLabel: l("ENFOQUE", "APPROACH", "ENFOC"),
  heading: l(
    "Cuatro principios. Cero gimmicks.",
    "Four principles. Zero gimmicks.",
    "Quatre principis. Zero gimmicks."
  ),
  description: l(
    "Lo que aplico en cada sistema que toco. Vale para una API B2B, una integración legacy o el portfolio que estás leyendo.",
    "What I apply in every system I touch. Works for a B2B API, a legacy integration or the portfolio you're reading.",
    "El que aplico en cada sistema que toco. Val per a una API B2B, una integració legacy o el portfolio que estàs llegint."
  ),
  principles: [
    {
      index: "01",
      title: l("Diseño primero la API.", "API design comes first.", "Dissenyo primer l'API."),
      body: l(
        "Antes de escribir lógica de negocio, defino contratos. La forma de los datos predice la forma del producto. OpenAPI versionado, ejemplos canónicos y tests de contrato antes que código.",
        "Before writing business logic, I define contracts. The shape of data predicts the shape of the product. Versioned OpenAPI, canonical examples and contract tests before code.",
        "Abans d'escriure lògica de negoci, defineixo contractes. La forma de les dades prediu la forma del producte. OpenAPI versionat, exemples canònics i tests de contracte abans que codi."
      ),
    },
    {
      index: "02",
      title: l("Mido lo que se mueve.", "Measure what moves.", "Mesuro el que es mou."),
      body: l(
        "Métricas, trazas y logs estructurados desde el día uno. Sin observabilidad, optimizar es adivinar. Cada microservicio expone /metrics y un dashboard mínimo con p50/p99 y tasa de error.",
        "Metrics, traces and structured logs from day one. Without observability, optimizing is guessing. Every microservice ships a /metrics endpoint and a minimum dashboard with p50/p99 and error rate.",
        "Mètriques, traces i logs estructurats des del primer dia. Sense observabilitat, optimitzar és endevinar. Cada microservei exposa /metrics i un dashboard mínim amb p50/p99 i taxa d'error."
      ),
    },
    {
      index: "03",
      title: l("Construyo para fallos.", "Build for failure.", "Construeixo per als errors."),
      body: l(
        "Timeouts, retries con jitter, circuit breakers y degradación elegante. El happy path es la excepción, no la regla. Cuando algo cae, el sistema se contrae sin tirar al resto.",
        "Timeouts, retries with jitter, circuit breakers and graceful degradation. The happy path is the exception, not the rule. When something goes down, the system contracts without taking the rest with it.",
        "Timeouts, reintents amb jitter, circuit breakers i degradació elegant. El happy path és l'excepció, no la regla. Quan alguna cosa cau, el sistema es contrau sense endur-se la resta."
      ),
    },
    {
      index: "04",
      title: l("Documento como código.", "Docs as code.", "Documento com a codi."),
      body: l(
        "OpenAPI versionado, ADRs cortos para decisiones de arquitectura y READMEs que un nuevo integrante pueda ejecutar en una tarde. La documentación vive en el mismo repo que el código.",
        "Versioned OpenAPI, short ADRs for architecture decisions and READMEs a new teammate can run in an afternoon. Documentation lives in the same repo as the code.",
        "OpenAPI versionat, ADRs curts per a decisions d'arquitectura i READMEs que un nou membre pugui executar en una tarda. La documentació viu al mateix repo que el codi."
      ),
    },
  ],
} as const;

/* ───────── Neibr — API platform ───────── */

export const neibr = {
  sectionNumber: "—",
  sectionLabel: l("PROYECTO BANDERA", "FLAGSHIP PROJECT", "PROJECTE BANDERA"),
  productLabel: l("PLATAFORMA · API", "PLATFORM · API", "PLATAFORMA · API"),
  title: "Neibr",
  tagline: l(
    "Logística B2B API-first.",
    "B2B logistics, API-first.",
    "Logística B2B API-first."
  ),
  description: l(
    "Plataforma logística B2B API-first construida en Go. El operador notifica un fallo de entrega y el motor asigna el mejor vecino en un radio de 200 m; el tracking number se autogenera como PREFIX-SEQ-DDMMYYYY. Si no hay vecinos disponibles, el envío se cancela automáticamente.",
    "B2B, API-first logistics platform built in Go. The carrier reports a failed delivery and the engine assigns the best neighbour within a 200 m radius; the tracking number is auto-generated as PREFIX-SEQ-DDMMYYYY. If no neighbours are available, the shipment cancels automatically.",
    "Plataforma logística B2B API-first construïda en Go. L'operador notifica un fallit de lliurament i el motor assigna el millor veí en un radi de 200 m; el tracking number s'autogenera com a PREFIX-SEQ-DDMMYYYY. Si no hi ha veïns disponibles, l'enviament es cancel·la automàticament."
  ),
  description2: l(
    "Doble propósito: eliminar retornos de paquetería para el operador y crear una red local de confianza para el vecino. Autenticación por X-API-Key, multi-tenant y ciclo completo del envío documentado en api.neibr.es.",
    "Two goals: eliminate parcel returns for the carrier and build a local trust network for the neighbour. X-API-Key auth, multi-tenant and the full shipment lifecycle documented at api.neibr.es.",
    "Doble propòsit: eliminar retorns de paqueteria per a l'operador i crear una xarxa local de confiança per al veí. Autenticació per X-API-Key, multi-tenant i cicle complet de l'enviament documentat a api.neibr.es."
  ),
  stat: {
    value: 3_000_000,
    valueLabel: l("requests", "requests", "requests"),
    duration: "50 min",
    durationLabel: l("duración", "duration", "durada"),
    caption: l(
      "Stress test superado sin degradación. p50 / p99 estables y 0 errores 5xx.",
      "Stress test passed without degradation. p50 / p99 stable and 0 5xx errors.",
      "Stress test superat sense degradació. p50 / p99 estables i 0 errors 5xx."
    ),
  },
  tags: [
    tag("GO · CHI ROUTER", "GO · CHI ROUTER", "GO · CHI ROUTER"),
    tag("API-FIRST", "API-FIRST", "API-FIRST"),
    tag("MULTI-TENANT", "MULTI-TENANT", "MULTI-TENANT"),
    tag("B2B + APP", "B2B + APP", "B2B + APP"),
    tag("ES · CA · EN", "ES · CA · EN", "ES · CA · EN"),
  ],
  concepts: [
    l(
      "Vecino más cercano en 200 m",
      "Nearest neighbour within 200 m",
      "Veí més proper en 200 m"
    ),
    l(
      "Tracking PREFIX-SEQ-DDMMYYYY",
      "Tracking PREFIX-SEQ-DDMMYYYY",
      "Tracking PREFIX-SEQ-DDMMYYYY"
    ),
    l(
      "Cancelación automática si no hay vecino",
      "Automatic cancellation if no neighbour",
      "Cancel·lació automàtica si no hi ha veí"
    ),
    l(
      "Sistema de puntos vecinal",
      "Neighbour reward points",
      "Sistema de punts veïnal"
    ),
    l(
      "Onboarding de carriers vía API",
      "Carrier onboarding via API",
      "Onboarding de carriers via API"
    ),
  ],
  conceptsLabel: l("CONCEPTOS CLAVE", "KEY CONCEPTS", "CONCEPTES CLAU"),
  outputLabel: l("STRESS TEST · OUTPUT", "STRESS TEST · OUTPUT", "STRESS TEST · OUTPUT"),
  endpointLabel: l(
    "POST · /api/v1/b2b/shipments",
    "POST · /api/v1/b2b/shipments",
    "POST · /api/v1/b2b/shipments"
  ),
  endpointTitle: l(
    "Crear envío y asignar vecino",
    "Create shipment and assign neighbour",
    "Crear enviament i assignar veí"
  ),
  separateLandingNote: l(
    "La marca y la documentación pública viven en neibr.es como proyecto independiente. Lo encontrarás más abajo, en productos propios.",
    "The brand and public docs live at neibr.es as a separate project. You'll find it below, under own products.",
    "La marca i la documentació pública viuen a neibr.es com a projecte independent. El trobaràs més avall, a productes propis."
  ),
} as const;

/* ───────── VMV (dark block) ───────── */

export const vmv = {
  sectionNumber: "003",
  sectionLabel: l("EXPERIENCIA", "EXPERIENCE", "EXPERIÈNCIA"),
  client: "VMV Cosmetic Group",
  range: l("2025 — presente", "2025 — present", "2025 — present"),
  heading: l(
    "Stack completo a escala corporativa.",
    "Full stack at corporate scale.",
    "Stack complet a escala corporativa."
  ),
  intro: l(
    "Programador web principal: opero la infraestructura digital de una empresa cosmética internacional. Una superficie que va del DNS y las cuentas corporativas a microservicios en Go y Java, pasando por una red de plugins propios sobre WordPress.",
    "Lead web developer: I run the digital infrastructure of an international cosmetics company. A surface from DNS and corporate accounts to Go and Java microservices, including a network of in-house WordPress plugins.",
    "Programador web principal: opero la infraestructura digital d'una empresa cosmètica internacional. Una superfície que va del DNS i els comptes corporatius a microserveis en Go i Java, passant per una xarxa de plugins propis sobre WordPress."
  ),
  stats: [
    {
      value: 32,
      label: l("dominios administrados", "managed domains", "dominis administrats"),
      caption: l("21 con web activa", "21 with active site", "21 amb web activa"),
    },
    {
      value: 12,
      label: l("plugins internos", "internal plugins", "plugins interns"),
      caption: l(
        "+ store interno propio",
        "+ in-house plugin store",
        "+ store intern propi"
      ),
    },
    {
      value: 20,
      label: l("microservicios", "microservices", "microserveis"),
      caption: l("Go · Java · Node", "Go · Java · Node", "Go · Java · Node"),
    },
  ] as VmvStat[],
  capabilities: [
    {
      title: l("Cuentas, dominios e infraestructura.", "Accounts, domains & infrastructure.", "Comptes, dominis i infraestructura."),
      description: l(
        "Alta y gestión de cuentas corporativas, registros DNS, correo, certificados, hosting y despliegues. La capa que rara vez se ve y que sostiene todo lo demás.",
        "Setup and management of corporate accounts, DNS records, email, certificates, hosting and deploys. The layer you rarely see that holds everything else up.",
        "Alta i gestió de comptes corporatius, registres DNS, correu, certificats, hosting i desplegaments. La capa que poques vegades es veu i que sosté tota la resta."
      ),
    },
    {
      title: l("WAF en Go con worker pools.", "Go WAF with worker pools.", "WAF en Go amb worker pools."),
      description: l(
        "WAF de carga temprana en Go con SQLite WAL, worker pools y IP scoring dinámico. Listas reactivas, bloqueos sincronizados con la capa de WordPress y métricas en vivo del tráfico bloqueado por dominio.",
        "Early-loading Go WAF with SQLite WAL, worker pools and dynamic IP scoring. Reactive lists, blocklists synced with the WordPress layer and live metrics on blocked traffic per domain.",
        "WAF de càrrega primerenca en Go amb SQLite WAL, worker pools i IP scoring dinàmic. Llistes reactives, bloquejos sincronitzats amb la capa de WordPress i mètriques en directe del trànsit bloquejat per domini."
      ),
    },
    {
      title: l("Puente Java 21 a AS/400.", "Java 21 bridge to AS/400.", "Pont Java 21 a AS/400."),
      description: l(
        "Servicios Java 21 / Spring Boot 3 que exponen el ERP en AS/400 como REST. Mapeo de tipos, control de transacciones distribuidas y un patrón anti-corrupción que aísla el modelo del dominio moderno del RPG.",
        "Java 21 / Spring Boot 3 services exposing the AS/400 ERP as REST. Type mapping, distributed transaction control and an anti-corruption layer that isolates the modern domain model from the RPG one.",
        "Serveis Java 21 / Spring Boot 3 que exposen l'ERP en AS/400 com a REST. Mapeig de tipus, control de transaccions distribuïdes i un patró anti-corrupció que aïlla el model del domini modern del de RPG."
      ),
    },
    {
      title: l("Plataforma de magazine corporativo.", "Corporate magazine platform.", "Plataforma de magazine corporatiu."),
      description: l(
        "CMS con lectura protegida por tokens compartibles y panel de administración aislado. Edición colaborativa, control de versiones por número, previsualización en tiempo real y página pública sin login.",
        "CMS with shareable token-protected reading and isolated admin panel. Collaborative editing, per-issue versioning, real-time preview and a public, login-less page.",
        "CMS amb lectura protegida per tokens compartibles i panell d'administració aïllat. Edició col·laborativa, control de versions per número, previsualització en temps real i pàgina pública sense login."
      ),
      link: {
        label: "demo pública ↗",
        href: "https://magazine.salerm.com/s/7611600d-0ac8-4b56-b5a3-f54e1ed7522c",
        kind: "demo" as const,
      },
      badge: l("DEMO PÚBLICA", "PUBLIC DEMO", "DEMO PÚBLICA"),
    },
    {
      title: l("Gateway de IA unificado.", "Unified AI gateway.", "Gateway d'IA unificat."),
      description: l(
        "Proxy/enrutador de modelos de lenguaje con API compatible OpenAI, control de contexto y streaming. Cuotas por equipo, redacted logging y fallback automático entre proveedores.",
        "Language-model proxy/router with an OpenAI-compatible API, context control and streaming. Per-team quotas, redacted logging and automatic provider fallback.",
        "Proxy/enrutador de models de llenguatge amb API compatible OpenAI, control de context i streaming. Quotes per equip, redacted logging i fallback automàtic entre proveïdors."
      ),
    },
    {
      title: l("Sistema de respaldo a nivel kernel.", "Kernel-level backup system.", "Sistema de còpia a nivell kernel."),
      description: l(
        "Protocolo de backup que bypassa los límites de memoria de PHP llamando directamente al sistema. Snapshots incrementales, verificación de integridad y restore puntual por dominio.",
        "Backup protocol that bypasses PHP memory limits by calling the system directly. Incremental snapshots, integrity checks and point-in-time restore per domain.",
        "Protocol de backup que bypassa els límits de memòria de PHP cridant directament al sistema. Snapshots incrementals, verificació d'integritat i restore puntual per domini."
      ),
    },
    {
      title: l("Plataforma de firmas legales con biometría.", "Legal signature platform with biometrics.", "Plataforma de signatures legals amb biometria."),
      description: l(
        "Plataforma en Next.js para firma de documentos: inyección de campos en formularios PDF, flujos biométricos y trazabilidad completa del documento desde la creación hasta el archivado.",
        "Next.js platform for document signing: PDF form-field injection, biometric workflows and full document traceability from creation to archive.",
        "Plataforma en Next.js per a la signatura de documents: injecció de camps en formularis PDF, fluxos biomètrics i traçabilitat completa del document des de la creació fins a l'arxivat."
      ),
    },
    {
      title: l("Motor de generación de PDF asíncrono.", "Async PDF generation engine.", "Motor de generació de PDF asíncron."),
      description: l(
        "Cola de jobs y estados en tiempo real (SSE) para liberar a los servidores web. Reintentos idempotentes, plantillas versionadas y backpressure controlado.",
        "Job queue and real-time status (SSE) to offload web servers. Idempotent retries, versioned templates and controlled backpressure.",
        "Cua de jobs i estats en temps real (SSE) per alliberar els servidors web. Reintents idempotents, plantilles versionades i backpressure controlat."
      ),
    },
  ] as VmvCapability[],
  ticker: [
    "+30 DOMINIOS",
    "infraestructura",
    "DNS",
    "correo corporativo",
    "WAF Go",
    "AS/400",
    "CI/CD",
    "observabilidad",
    "Go",
    "Java 21",
    "Spring Boot 3",
    "WordPress",
    "OpenAPI",
    "Docker",
    "Vercel",
    "Kafka",
  ],
  capabilitiesLabel: l("CAPACIDADES", "CAPABILITIES", "CAPACITATS"),
  bracketLabel: l("BLOQUE TÉCNICO", "TECHNICAL BLOCK", "BLOC TÈCNIC"),
} as const;

/* ───────── Timeline ───────── */

export const timeline = {
  sectionNumber: "004",
  sectionLabel: l("RECORRIDO", "PATH", "RECORREGUT"),
  heading: l(
    "Quince años aprendiendo a sostener sistemas.",
    "Fifteen years learning to hold systems up.",
    "Quinze anys aprenent a sostenir sistemes."
  ),
  description: l(
    "De cambiar el disco duro del portátil familiar con 11 años a operar la infraestructura de una empresa cosmética internacional. Esta es la versión corta.",
    "From swapping the family laptop's hard drive at 11 to operating the infrastructure of an international cosmetics company. This is the short version.",
    "De canviar el disc dur del portàtil familiar amb 11 anys a operar la infraestructura d'una empresa cosmètica internacional. Aquesta és la versió curta."
  ),
  entries: [
    {
      year: "11",
      age: l("años · Granollers", "y/o · Granollers", "anys · Granollers"),
      title: l(
        "Cambio el disco duro del portátil familiar.",
        "Swapped the family laptop's hard drive.",
        "Canvio el disc dur del portàtil familiar."
      ),
      place: l("primera intervención", "first hands-on", "primera intervenció"),
      body: l(
        "Se rompió el portátil de casa y, en vez de tirarlo, lo abrí, cambié el disco y descubrí que detrás de la pantalla había un sistema entero que se podía leer. Esa tarde empezó todo.",
        "The family laptop broke and instead of trashing it I opened it, swapped the drive, and discovered there was a whole readable system behind the screen. Everything started that afternoon.",
        "Es va trencar el portàtil de casa i, en lloc de tirar-lo, el vaig obrir, vaig canviar el disc i vaig descobrir que darrere de la pantalla hi havia un sistema sencer que es podia llegir. Aquella tarda va començar tot."
      ),
      kind: "milestone",
    },
    {
      year: "12",
      age: l("años · Linux", "y/o · Linux", "anys · Linux"),
      title: l(
        "Instalo Mandriva para jugar a Wormux y Battle for Wesnoth.",
        "Installed Mandriva to play Wormux and Battle for Wesnoth.",
        "Instal·lo Mandriva per jugar a Wormux i Battle for Wesnoth."
      ),
      place: l("primer Linux", "first Linux", "primer Linux"),
      body: l(
        "El motor inicial fue jugar. Instalé Mandriva en aquel portátil, peleé con paquetes, repositorios y la consola — y aprendí más en una semana de intentar abrir Wormux que en un año de clase.",
        "The first engine was gaming. I installed Mandriva on that laptop, fought with packages, repos and the terminal — and learned more in a week trying to launch Wormux than in a year of school.",
        "El motor inicial va ser jugar. Vaig instal·lar Mandriva en aquell portàtil, vaig pelear-me amb paquets, repositoris i la consola — i vaig aprendre més en una setmana intentant obrir Wormux que en un any de classe."
      ),
      kind: "milestone",
    },
    {
      year: "14",
      age: l("años · primer build", "y/o · first build", "anys · primer build"),
      title: l(
        "Monto mi primer PC tras hacer de helpdesk freelance.",
        "Built my first PC after doing freelance helpdesk.",
        "Munto el meu primer PC després de fer d'helpdesk freelance."
      ),
      place: l("vecindario · familia · amigos", "neighbourhood · family · friends", "veïnat · família · amics"),
      body: l(
        "Empecé a arreglar ordenadores de gente cercana — pequeños arreglos, reinstalaciones, configuraciones — y con eso me autofinancié el primer PC. Hardware como aprendizaje a coste real.",
        "Started fixing people's computers — small repairs, reinstalls, configs — and self-funded my first PC with the proceeds. Hardware as real-cost learning.",
        "Vaig començar a arreglar ordinadors de gent propera — petites reparacions, reinstal·lacions, configuracions — i amb això em vaig autofinançar el primer PC. Hardware com a aprenentatge a cost real."
      ),
      kind: "milestone",
    },
    {
      year: "16",
      age: l("años · técnico", "y/o · technician", "anys · tècnic"),
      title: l(
        "Arreglo PCs y monto instalaciones desatendidas.",
        "Fixing PCs and building unattended installs.",
        "Arreglo PCs i munto instal·lacions desateses."
      ),
      place: l("pequeño negocio · particulares", "small business · individuals", "petit negoci · particulars"),
      body: l(
        "Servicio técnico real. Imágenes de Windows desatendidas, scripts de post-install, drivers, despliegues por lote. Aquí aprendí que la repetibilidad es lo que separa al técnico del improvisador.",
        "Real tech service. Unattended Windows images, post-install scripts, drivers, batch deploys. Here I learned that repeatability is what separates the technician from the improviser.",
        "Servei tècnic real. Imatges de Windows desateses, scripts de post-install, drivers, desplegaments per lot. Aquí vaig aprendre que la repetibilitat és el que separa el tècnic de l'improvisador."
      ),
      kind: "work",
    },
    {
      year: "19",
      age: l("años · soporte móvil", "y/o · mobile support", "anys · suport mòbil"),
      title: l(
        "Soporte técnico de telefonía móvil.",
        "Mobile-phone technical support.",
        "Suport tècnic de telefonia mòbil."
      ),
      place: l("primer empleo formal", "first formal job", "primera feina formal"),
      body: l(
        "Atención a usuarios, diagnóstico, escalado y reparación a nivel componente. El año de aprender a explicar cosas complicadas a quien las necesita sin la jerga.",
        "User support, diagnosis, escalation and component-level repair. The year of learning to explain complicated things to who needs them, without the jargon.",
        "Atenció a usuaris, diagnòstic, escalat i reparació a nivell de component. L'any d'aprendre a explicar coses complicades a qui les necessita, sense l'argot."
      ),
      kind: "work",
    },
    {
      year: "21",
      age: l("años · helpdesk", "y/o · helpdesk", "anys · helpdesk"),
      title: l(
        "Trabajo de helpdesk corporativo.",
        "Corporate helpdesk role.",
        "Treball d'helpdesk corporatiu."
      ),
      place: l("empresa · soporte L1/L2", "enterprise · L1/L2 support", "empresa · suport L1/L2"),
      body: l(
        "Primer contacto con la operación a escala: tickets, SLA, runbooks y la diferencia real entre L1 y L2. Empiezo a leer código para entender los problemas que escalan.",
        "First contact with scale operations: tickets, SLAs, runbooks and the real L1 vs L2 split. I start reading code to understand the problems that escalate.",
        "Primer contacte amb l'operació a escala: tickets, SLA, runbooks i la diferència real entre L1 i L2. Començo a llegir codi per entendre els problemes que escalen."
      ),
      kind: "work",
    },
    {
      year: "22",
      age: l("años · primera línea de código", "y/o · first line of code", "anys · primera línia de codi"),
      title: l(
        "Comienzo a programar en serio.",
        "Start programming for real.",
        "Començo a programar de debò."
      ),
      place: l("formación + autodidacta", "formal + self-taught", "formació + autodidacta"),
      body: l(
        "Cierro el ciclo del helpdesk y empiezo formación formal en desarrollo web. Stack base: HTML, CSS, JavaScript, PHP, Laravel, Angular, MySQL. El reflejo de programar todos los días.",
        "Closed the helpdesk loop and started formal web-dev training. Base stack: HTML, CSS, JavaScript, PHP, Laravel, Angular, MySQL. The reflex of writing code every day.",
        "Tanco el cicle de l'helpdesk i començo formació formal en desenvolupament web. Stack base: HTML, CSS, JavaScript, PHP, Laravel, Angular, MySQL. El reflex de programar cada dia."
      ),
      kind: "education",
    },
    {
      year: "2025",
      title: l(
        "Programador web principal en VMV Cosmetic Group.",
        "Lead web developer at VMV Cosmetic Group.",
        "Programador web principal a VMV Cosmetic Group."
      ),
      place: l("Barcelona · presente", "Barcelona · present", "Barcelona · present"),
      body: l(
        "Entro como programador web principal. En meses ya estoy escribiendo microservicios en Go, integrando con AS/400 desde Java y montando el primer WAF interno. Hoy sigo operando esa infraestructura.",
        "Joined as lead web developer. Within months I was writing Go microservices, integrating with AS/400 from Java and building the first internal WAF. I'm still operating that infrastructure today.",
        "Entro com a programador web principal. En mesos ja escric microserveis en Go, integro amb AS/400 des de Java i munto el primer WAF intern. Avui continuo operant aquesta infraestructura."
      ),
      kind: "work",
    },
    {
      year: l("Hoy", "Today", "Avui"),
      age: "2026",
      title: l(
        "VMV + freelance + fundación de Neibr.",
        "VMV + freelance + founding Neibr.",
        "VMV + freelance + fundació de Neibr."
      ),
      place: l("Granollers / Barcelona", "Granollers / Barcelona", "Granollers / Barcelona"),
      body: l(
        "Sigo en VMV como programador web principal, acepto encargos freelance donde el reto técnico sea real y fundo Neibr como producto propio: una plataforma logística B2B API-first en Go.",
        "Still at VMV as lead web developer, taking freelance projects where the technical challenge is real, and founding Neibr as my own product: a B2B, API-first logistics platform in Go.",
        "Continuo a VMV com a programador web principal, accepto encàrrecs freelance on el repte tècnic sigui real i fundo Neibr com a producte propi: una plataforma logística B2B API-first en Go."
      ),
      kind: "project",
    },
  ] as TimelineEntry[],
} as const;

/* ───────── Services offered ───────── */

export const services = {
  sectionNumber: "005",
  sectionLabel: l("SERVICIOS", "SERVICES", "SERVEIS"),
  heading: l(
    "Lo que ofrezco como freelance.",
    "What I offer as a freelancer.",
    "El que ofereixo com a freelance."
  ),
  description: l(
    "Si tu reto entra en alguno de estos bloques, podemos hablar. Trabajo solo o como pieza puntual dentro de equipos ya formados.",
    "If your challenge falls into any of these blocks, we can talk. I work solo or as a one-off piece inside existing teams.",
    "Si el teu repte entra en algun d'aquests blocs, podem parlar. Treballo sol o com a peça puntual dins d'equips ja formats."
  ),
  groups: [
    {
      group: l("Backend & APIs", "Backend & APIs", "Backend & APIs"),
      items: [
        l("Microservicios Go / Java", "Go / Java microservices", "Microserveis Go / Java"),
        l("Diseño de API REST + OpenAPI", "REST API design + OpenAPI", "Disseny d'API REST + OpenAPI"),
        l("Integraciones con sistemas legacy", "Legacy system integration", "Integracions amb sistemes legacy"),
        l("Auth, multi-tenant, rate limiting", "Auth, multi-tenant, rate limiting", "Auth, multi-tenant, rate limiting"),
      ],
    },
    {
      group: l("WordPress avanzado", "Advanced WordPress", "WordPress avançat"),
      items: [
        l("Plugins a medida + publicación en WordPress.org", "Custom plugins + WordPress.org publishing", "Plugins a mida + publicació a WordPress.org"),
        l("Hardening, WAF y mantenimiento", "Hardening, WAF and maintenance", "Hardening, WAF i manteniment"),
        l("Migraciones y multi-sitio", "Migrations and multisite", "Migracions i multi-site"),
      ],
    },
    {
      group: l("Frontend & sitios", "Frontend & sites", "Frontend & llocs"),
      items: [
        l("Next.js 15 / React 19 / TS", "Next.js 15 / React 19 / TS", "Next.js 15 / React 19 / TS"),
        l("CMS hechos a medida", "Custom CMS", "CMS fets a mida"),
        l("SEO técnico y multi-idioma", "Technical SEO and multi-language", "SEO tècnic i multi-idioma"),
        l("Sitios editoriales y portfolios", "Editorial sites and portfolios", "Llocs editorials i portfolios"),
      ],
    },
    {
      group: l("Infraestructura & operación", "Infrastructure & operations", "Infraestructura & operació"),
      items: [
        l("Alta de cuentas corporativas (Google Workspace, Microsoft 365, etc.)", "Corporate account setup (Google Workspace, Microsoft 365, etc.)", "Alta de comptes corporatius (Google Workspace, Microsoft 365, etc.)"),
        l("Dominios, DNS, correo y certificados", "Domains, DNS, email and certificates", "Dominis, DNS, correu i certificats"),
        l("Despliegue web, CI/CD y observabilidad", "Web deploy, CI/CD and observability", "Desplegament web, CI/CD i observabilitat"),
        l("Hosting, hardening y backups", "Hosting, hardening and backups", "Hosting, hardening i còpies"),
      ],
    },
  ] as Service[],
  cta: {
    label: l("HABLEMOS →", "LET'S TALK →", "PARLEM-NE →"),
    href: "#contacto",
  },
} as const;

/* ───────── Freelance ───────── */

export const freelance = {
  sectionNumber: "006",
  sectionLabel: l("FREELANCE", "FREELANCE", "FREELANCE"),
  heading: l(
    "Encargos pagados.",
    "Paid client work.",
    "Encàrrecs pagats."
  ),
  description: l(
    "Trabajos para clientes reales con presupuestos contenidos y entrega rápida. Stack moderno, CMS hechos a medida cuando aporta y nada de plantillas.",
    "Real client work, lean budgets, quick turnaround. Modern stack, custom CMS when it helps, zero templates.",
    "Treballs per a clients reals amb pressupostos continguts i lliurament ràpid. Stack modern, CMS fets a mida quan aporta i res de plantilles."
  ),
  projects: [
    {
      id: "larasoak",
      name: "larasoak.art",
      description: l(
        "Portfolio editorial para Lara Carrasco (storyboard, concept art y diseño para animación y videojuegos) con CMS propio: gestión de obra, subida de imágenes a almacenamiento en la nube (Vercel Blob) y secciones de storyboards, concept art, client work y sketchbook.",
        "Editorial portfolio for Lara Carrasco (storyboard, concept art and design for animation and video games) with an in-house CMS: artwork management, cloud uploads (Vercel Blob) and dedicated storyboards, concept art, client work and sketchbook sections.",
        "Portfolio editorial per a la Lara Carrasco (storyboard, concept art i disseny per a animació i videojocs) amb CMS propi: gestió d'obra, pujada al núvol (Vercel Blob) i seccions de storyboards, concept art, client work i sketchbook."
      ),
      tags: [
        tag("NEXT.JS", "NEXT.JS", "NEXT.JS"),
        tag("CMS PROPIO", "CUSTOM CMS", "CMS PROPI"),
        tag("VERCEL BLOB", "VERCEL BLOB", "VERCEL BLOB"),
        tag("CLIENTE PAGADO", "PAID CLIENT", "CLIENT PAGAT"),
      ],
      links: [
        { label: "larasoak.art ↗", href: "https://larasoak.art", kind: "landing" as const },
      ],
      shotLabel: l("larasoak.art · captura", "larasoak.art · screenshot", "larasoak.art · captura"),
    },
    {
      id: "gokthermal",
      name: "gokthermal.com",
      description: l(
        "Sitio de servicios para GOK Thermal (instalador de climatización y ACS, Granollers): galería de proyectos, reseñas y contacto directo por WhatsApp/llamada. En desarrollo.",
        "Service site for GOK Thermal (HVAC and DHW installer, Granollers): project gallery, reviews and direct contact via WhatsApp/call. In progress.",
        "Lloc de serveis per a GOK Thermal (instal·lador de climatització i ACS, Granollers): galeria de projectes, ressenyes i contacte directe per WhatsApp/trucada. En desenvolupament."
      ),
      tags: [
        tag("NEXT.JS", "NEXT.JS", "NEXT.JS"),
        tag("EN PROGRESO", "IN PROGRESS", "EN PROGRÉS"),
      ],
      links: [
        { label: "gokthermal.com ↗", href: "https://gokthermal.com", kind: "landing" as const },
      ],
      shotLabel: l("gokthermal.com · captura", "gokthermal.com · screenshot", "gokthermal.com · captura"),
    },
    {
      id: "wordpress-plugins",
      name: "Plugins en WordPress.org",
      description: l(
        "Extensiones publicadas en el repositorio oficial de WordPress.org — código abierto, soporte público y compatibilidad con cada versión mayor. Trabajo freelance independiente del catálogo interno de VMV.",
        "Extensions published on the official WordPress.org repository — open source, public support and compatibility with each major version. Freelance work independent from VMV's internal catalogue.",
        "Extensions publicades al repositori oficial de WordPress.org — codi obert, suport públic i compatibilitat amb cada versió major. Treball freelance independent del catàleg intern de VMV."
      ),
      tags: [
        tag("WORDPRESS", "WORDPRESS", "WORDPRESS"),
        tag("OPEN SOURCE", "OPEN SOURCE", "OPEN SOURCE"),
        tag("WP.ORG", "WP.ORG", "WP.ORG"),
      ],
      links: [
        {
          label: "profiles.wordpress.org/alexasto12 ↗",
          href: "https://profiles.wordpress.org/alexasto12/",
          kind: "platform" as const,
        },
      ],
      shotLabel: l("wordpress.org · perfil", "wordpress.org · profile", "wordpress.org · perfil"),
    },
  ] as LocalizedProject[],
} as const;

/* ───────── Own products ───────── */

export const products = {
  sectionNumber: "007",
  sectionLabel: l("PRODUCTOS PROPIOS", "OWN PRODUCTS", "PRODUCTES PROPIS"),
  heading: l(
    "Lo que arranco yo.",
    "What I start myself.",
    "El que arrenco jo."
  ),
  description: l(
    "Proyectos que financio y mantengo. Aquí pruebo las ideas que después aplico a clientes.",
    "Projects I fund and maintain. Here I test the ideas I later apply to clients.",
    "Projectes que finançament i mantinc. Aquí provo les idees que després aplico a clients."
  ),
  items: [
    {
      id: "neibr-landing",
      name: "neibr.es — Marca / Landing",
      description: l(
        "Sitio de marca y onboarding comercial de Neibr. Repositorio independiente de la plataforma; orientado a SEO, captación de operadores y documentación pública. Multi-idioma ES/CA/EN.",
        "Brand site and commercial onboarding for Neibr. Separate repo from the platform; SEO, carrier lead-gen and public docs first. Multi-language ES/CA/EN.",
        "Lloc de marca i onboarding comercial de Neibr. Repositori independent de la plataforma; orientat a SEO, captació d'operadors i documentació pública. Multi-idioma ES/CA/EN."
      ),
      tags: [
        tag("LANDING", "LANDING", "LANDING"),
        tag("SEO", "SEO", "SEO"),
        tag("ES · CA · EN", "ES · CA · EN", "ES · CA · EN"),
      ],
      links: [
        { label: "neibr.es ↗", href: "https://neibr.es", kind: "landing" as const },
      ],
      shotLabel: l("neibr.es · captura", "neibr.es · screenshot", "neibr.es · captura"),
    },
    {
      id: "roses-st-jordi",
      name: "Roses Sant Jordi",
      description: l(
        "Proyecto propio multi-dominio para la campaña de Sant Jordi (.com / .cat / .es). 5.000 visitas de tráfico real en un solo día y casi 300 rosas distintas enviadas. SEO localizado por idioma y dominio.",
        "Own multi-domain project for the Sant Jordi campaign (.com / .cat / .es). 5,000 real visits in a single day and nearly 300 different roses sent. SEO localized per language and domain.",
        "Projecte propi multi-domini per a la campanya de Sant Jordi (.com / .cat / .es). 5.000 visites de trànsit real en un sol dia i gairebé 300 roses diferents enviades. SEO localitzat per idioma i domini."
      ),
      tags: [
        tag("MULTI-DOMINIO", "MULTI-DOMAIN", "MULTI-DOMINI"),
        tag("+5K EN UN DÍA", "+5K IN ONE DAY", "+5K EN UN DIA"),
        tag("≈300 ROSAS", "≈300 ROSES", "≈300 ROSES"),
        tag("SEO", "SEO", "SEO"),
      ],
      links: [
        {
          label: "rosesstjordi.com ↗",
          href: "https://rosesstjordi.com",
          kind: "landing" as const,
        },
      ],
      shotLabel: l("rosesstjordi.com · captura", "rosesstjordi.com · screenshot", "rosesstjordi.com · captura"),
    },
    {
      id: "alexasto",
      name: "alexasto.com",
      description: l(
        "Marca personal — este sitio. Next.js 15, Tailwind v4, Motion. Diseñado como un \"panel de control\" sobre base editorial, con i18n propio (ES/CA/EN) y sin dependencias de pago.",
        "Personal brand — this site. Next.js 15, Tailwind v4, Motion. Designed as a \"control panel\" on an editorial base, with custom i18n (ES/CA/EN) and zero paid deps.",
        "Marca personal — aquest lloc. Next.js 15, Tailwind v4, Motion. Dissenyat com un \"panell de control\" sobre base editorial, amb i18n propi (ES/CA/EN) i sense dependències de pagament."
      ),
      tags: [
        tag("NEXT.JS 15", "NEXT.JS 15", "NEXT.JS 15"),
        tag("MOTION", "MOTION", "MOTION"),
        tag("TAILWIND v4", "TAILWIND v4", "TAILWIND v4"),
        tag("i18n", "i18n", "i18n"),
      ],
      links: [],
      shotLabel: l("este sitio · captura", "this site · screenshot", "aquest lloc · captura"),
    },
  ] as LocalizedProject[],
} as const;

/* ───────── Academic ───────── */

export const academic = {
  sectionNumber: "008",
  sectionLabel: l("ACADÉMICO", "ACADEMIC", "ACADÈMIC"),
  heading: l(
    "Origen.",
    "Origins.",
    "Origen."
  ),
  description: l(
    "Trabajos de formación que marcaron el rumbo. Código público en GitHub, con sus aciertos y sus rastros de aprendizaje.",
    "Training projects that set the direction. Public code on GitHub, with their highs and their learning traces.",
    "Treballs de formació que van marcar el rumb. Codi públic a GitHub, amb els seus encerts i els seus rastres d'aprenentatge."
  ),
  projects: [
    {
      id: "peer2stream",
      name: "peer2stream",
      meta: l(
        "TFG · Calificación 10/10",
        "Final Year Project · Grade 10/10",
        "TFG · Qualificació 10/10"
      ),
      description: l(
        "Plataforma web para descubrir, ver y organizar películas y series. Integra TMDB para metadatos, autenticación con JWT, biblioteca personal, seguimiento de progreso por episodio y recomendaciones. Trabajo de Fin de Grado con nota máxima.",
        "Web platform to discover, watch and organize movies and TV shows. TMDB integration for metadata, JWT auth, personal library, per-episode progress tracking and recommendations. Final Year Project with top grade.",
        "Plataforma web per descobrir, veure i organitzar pel·lícules i sèries. Integra TMDB per metadades, autenticació amb JWT, biblioteca personal, seguiment de progrés per episodi i recomanacions. Treball de Final de Grau amb la nota màxima."
      ),
      tags: [
        tag("NEXT.JS 15", "NEXT.JS 15", "NEXT.JS 15"),
        tag("REACT 19", "REACT 19", "REACT 19"),
        tag("MONGODB", "MONGODB", "MONGODB"),
        tag("TMDB API", "TMDB API", "TMDB API"),
        tag("TFG · 10/10", "FYP · 10/10", "TFG · 10/10"),
      ],
      links: [
        {
          label: "github.com/Alexasto12/peer2stream ↗",
          href: "https://github.com/Alexasto12/peer2stream",
          kind: "repo" as const,
        },
      ],
      shotLabel: l("peer2stream · captura", "peer2stream · screenshot", "peer2stream · captura"),
    },
    {
      id: "projecte-pokeapi",
      name: "Pokédex DS",
      meta: l(
        "Simulador de Nintendo DS · ejercicio académico",
        "Nintendo DS simulator · academic exercise",
        "Simulador de Nintendo DS · exercici acadèmic"
      ),
      description: l(
        "Pokédex como simulación interactiva de una Nintendo DS Lite. Animaciones, sonidos, control por botones DS y datos en vivo desde la PokeAPI. Ejercicio para aprender DOM, fetch y diseño de UI con personalidad.",
        "Pokédex as an interactive Nintendo DS Lite simulation. Animations, sounds, DS-button controls and live data from PokeAPI. Exercise to practice DOM, fetch and UI design with personality.",
        "Pokédex com a simulació interactiva d'una Nintendo DS Lite. Animacions, sons, control per botons DS i dades en directe des de la PokeAPI. Exercici per aprendre DOM, fetch i disseny d'UI amb personalitat."
      ),
      tags: [
        tag("HTML · CSS · JS", "HTML · CSS · JS", "HTML · CSS · JS"),
        tag("POKEAPI", "POKEAPI", "POKEAPI"),
        tag("DEMO LIVE", "LIVE DEMO", "DEMO LIVE"),
      ],
      links: [
        {
          label: "demo ↗",
          href: "https://alexasto12.github.io/ProjectePokeAPI/",
          kind: "demo" as const,
        },
        {
          label: "github ↗",
          href: "https://github.com/Alexasto12/ProjectePokeAPI",
          kind: "repo" as const,
        },
      ],
      shotLabel: l("Pokédex DS · captura", "Pokédex DS · screenshot", "Pokédex DS · captura"),
    },
  ] as LocalizedProject[],
} as const;

/* ───────── Contact ───────── */

export const contact = {
  sectionNumber: "009",
  sectionLabel: l("CONTACTO", "CONTACT", "CONTACTE"),
  heading: l("Construyamos algo", "Let's build something", "Construïm alguna cosa"),
  headingAccent: l("robusto.", "robust.", "robust."),
  body: l(
    "Si tienes un sistema que pide más latencia, más claridad o simplemente menos sustos en producción — escribe. Respondo en menos de 48h.",
    "If you've got a system asking for lower latency, more clarity or just fewer surprises in production — drop a line. I reply within 48h.",
    "Si tens un sistema que demana més latència, més claredat o simplement menys ensurts en producció — escriu. Responc en menys de 48h."
  ),
  cta: {
    label: l("ENVIAR MENSAJE", "SEND A MESSAGE", "ENVIAR MISSATGE"),
    href: "mailto:contact@alexasto.com",
  },
  email: "contact@alexasto.com",
  links: [
    { label: "GITHUB", href: "https://github.com/Alexasto12" },
    {
      label: "LINKEDIN",
      href: "https://www.linkedin.com/in/ccalejandro/",
    },
    {
      label: "WORDPRESS.ORG",
      href: "https://profiles.wordpress.org/alexasto12/",
    },
  ],
  footerNote: l(
    "Sin agencias intermediarias. Sin templates. Construido a mano en Granollers / Barcelona.",
    "No middle agencies. No templates. Hand-built in Granollers / Barcelona.",
    "Sense agències intermediàries. Sense templates. Construït a mà a Granollers / Barcelona."
  ),
} as const;
