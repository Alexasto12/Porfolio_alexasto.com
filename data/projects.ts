import { l, type Localized } from "@/lib/i18n-types";

export type Tag = Localized<string>;

export type ProjectLink = {
  label: string;
  href: string;
  kind?: "landing" | "platform" | "repo" | "demo";
};

export type MockKey =
  | "neibrPlatform"
  | "neibrLanding"
  | "larasoak"
  | "gokthermal"
  | "roses"
  | "peer2stream"
  | "pokeDS"
  | "salerm";

export type LocalizedProject = {
  id: string;
  name: string;
  domain?: string;
  description: Localized<string>;
  tags: Tag[];
  links: ProjectLink[];
  meta?: Localized<string>;
  mock?: MockKey;
  mockUrl?: string;
  accent?: string;
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
  title: Localized<string>;
  place: Localized<string>;
  body: Localized<string>;
  kind?: "milestone" | "education" | "work" | "project";
};

const tag = (es: string, en: string, ca: string): Tag => l(es, en, ca);

/* ───────────── Telemetry bar (slim) ───────────── */

export const telemetry = {
  systemId: "AC_SYSTEMS",
  name: "Alejandro Cabrera",
  role: l(
    "Systems Architect · BCN",
    "Systems Architect · BCN",
    "Arquitecte de sistemes · BCN"
  ),
  availability: l(
    "Disponible para nuevos proyectos",
    "Open to new projects",
    "Disponible per a nous projectes"
  ),
} as const;

/* ───────────── Hero ───────────── */

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
    "Vivo en Barcelona, vengo de Granollers. Trabajo sobre el principio de que un sistema bien pensado se nota: en la latencia, en el coste y en la calma con la que se opera.",
    "I live in Barcelona, originally from Granollers. I work on the principle that a well-thought system shows: in latency, in cost, and in the calm of operating it.",
    "Visc a Barcelona, vinc de Granollers. Treballo sobre el principi que un sistema ben pensat es nota: en la latència, en el cost i en la calma amb què s'opera."
  ),
  stack: [
    { label: "Go · Chi · SQLite WAL", weight: "primary" as const },
    { label: "Java 21 · Spring Boot · AS/400", weight: "primary" as const },
    { label: "Next.js 15 · React 19 · TS", weight: "primary" as const },
    { label: "Docker · LiteLLM · WordPress", weight: "secondary" as const },
  ],
  contextLabel: l("CONTEXTO", "CONTEXT", "CONTEXT"),
  stackLabel: l("STACK PRINCIPAL", "PRIMARY STACK", "STACK PRINCIPAL"),
  ratings: [
    {
      label: l("Arquitectura", "Architecture", "Arquitectura"),
      value: 10,
    },
    {
      label: l("Backend de alto rendimiento", "High-perf backend", "Backend d'alt rendiment"),
      value: 10,
    },
    { label: l("Seguridad", "Security", "Seguretat"), value: 9 },
    { label: l("AI engineering", "AI engineering", "AI engineering"), value: 7 },
  ],
} as const;

/* ───────────── Approach ───────────── */

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

/* ───────────── Neibr — API platform ───────────── */

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
    "Infraestructura logística B2B API-first construida en Go: microservicios multi-tenant, gestión de tokens, panel de operador y una app de usuario para vecinos. Elimina retornos de paquetería mediante Double Blind Handover y garantía de Cero Retornos.",
    "B2B, API-first logistics infrastructure built in Go: multi-tenant microservices, token management, operator dashboard and a user app for neighbours. Eliminates parcel returns through Double Blind Handover and a Zero Returns guarantee.",
    "Infraestructura logística B2B API-first construïda en Go: microserveis multi-tenant, gestió de tokens, panell d'operador i una app d'usuari per a veïns. Elimina retorns de paqueteria mitjançant Double Blind Handover i garantia de Zero Retorns."
  ),
  description2: l(
    "Matching geoespacial con PostGIS (ST_DWithin <150 m), ranking de vecinos por reputación y SLA por operador. Onboarding de carriers en horas vía API REST documentada con OpenAPI.",
    "Geospatial matching with PostGIS (ST_DWithin <150 m), neighbour ranking by reputation and per-carrier SLAs. Carrier onboarding in hours via a REST API documented with OpenAPI.",
    "Matching geoespacial amb PostGIS (ST_DWithin <150 m), rànquing de veïns per reputació i SLA per operador. Onboarding de carriers en hores via API REST documentada amb OpenAPI."
  ),
  stat: {
    value: 3_000_000,
    valueLabel: l("requests", "requests", "requests"),
    duration: "50 min",
    durationLabel: l("duración", "duration", "durada"),
    caption: l(
      "Stress test superado sin degradación. p50 38ms · p99 142ms · 0 errores 5xx.",
      "Stress test passed without degradation. p50 38ms · p99 142ms · 0 5xx errors.",
      "Stress test superat sense degradació. p50 38ms · p99 142ms · 0 errors 5xx."
    ),
  },
  tags: [
    tag("GO · CHI ROUTER", "GO · CHI ROUTER", "GO · CHI ROUTER"),
    tag("POSTGIS", "POSTGIS", "POSTGIS"),
    tag("API-FIRST", "API-FIRST", "API-FIRST"),
    tag("MULTI-TENANT", "MULTI-TENANT", "MULTI-TENANT"),
    tag("B2B + APP", "B2B + APP", "B2B + APP"),
  ],
  concepts: [
    l("Double Blind Handover", "Double Blind Handover", "Double Blind Handover"),
    l("Garantía Cero Retornos", "Zero Returns Guarantee", "Garantia Zero Retorns"),
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
    l(
      "Matching geoespacial con PostGIS",
      "Geospatial matching with PostGIS",
      "Matching geoespacial amb PostGIS"
    ),
  ],
  conceptsLabel: l("CONCEPTOS CLAVE", "KEY CONCEPTS", "CONCEPTES CLAU"),
  outputLabel: l("STRESS TEST · OUTPUT", "STRESS TEST · OUTPUT", "STRESS TEST · OUTPUT"),
  endpointLabel: l(
    "ENDPOINT EJEMPLO",
    "EXAMPLE ENDPOINT",
    "ENDPOINT EXEMPLE"
  ),
  separateLandingNote: l(
    "La marca y la documentación pública viven en neibr.es, un proyecto independiente con su propio repo. Lo encontrarás más abajo, en productos propios.",
    "The brand and public docs live at neibr.es, a separate project with its own repo. You'll find it below, under own products.",
    "La marca i la documentació pública viuen a neibr.es, un projecte independent amb el seu propi repo. El trobaràs més avall, a productes propis."
  ),
} as const;

/* ───────────── VMV (dark block) ───────────── */

export const vmv = {
  sectionNumber: "003",
  sectionLabel: l("EXPERIENCIA", "EXPERIENCE", "EXPERIÈNCIA"),
  client: "VMV Cosmetic Group",
  range: l("2023 — presente", "2023 — present", "2023 — present"),
  heading: l(
    "Stack completo a escala corporativa.",
    "Full stack at corporate scale.",
    "Stack complet a escala corporativa."
  ),
  intro: l(
    "Más de dos años operando la infraestructura digital de una empresa cosmética con presencia internacional. Una superficie que va del DNS y el correo corporativo hasta un gateway de IA, pasando por +20 microservicios y una red de plugins propios.",
    "More than two years running the digital infrastructure of an international cosmetics company. A surface that spans from DNS and corporate email to an AI gateway, including 20+ microservices and a network of in-house plugins.",
    "Més de dos anys operant la infraestructura digital d'una empresa cosmètica amb presència internacional. Una superfície que va del DNS i el correu corporatiu fins a un gateway d'IA, passant per +20 microserveis i una xarxa de plugins propis."
  ),
  stats: [
    {
      value: 32,
      label: l("dominios administrados", "managed domains", "dominis administrats"),
      caption: l("21 con web activa", "21 with active site", "21 amb web activa"),
    },
    {
      value: 12,
      label: l("plugins propios", "in-house plugins", "plugins propis"),
      caption: l(
        "+ store interno de plugins",
        "+ internal plugin store",
        "+ store intern de plugins"
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
      title: l("WebShield · WAF Go.", "WebShield · Go WAF.", "WebShield · WAF Go."),
      description: l(
        "WAF de carga temprana en Go con worker pools y SQLite WAL. IP scoring dinámico, bloqueos sincronizados con WordPress, listas reactivas y métricas en vivo del tráfico bloqueado por dominio.",
        "Early-loading Go WAF with worker pools and SQLite WAL. Dynamic IP scoring, blocklists synced with WordPress, reactive lists and live metrics on blocked traffic per domain.",
        "WAF de càrrega primerenca en Go amb worker pools i SQLite WAL. IP scoring dinàmic, bloquejos sincronitzats amb WordPress, llistes reactives i mètriques en directe del trànsit bloquejat per domini."
      ),
      badge: l("INTERNO", "INTERNAL", "INTERN"),
    },
    {
      title: l("AS/400 Integration API.", "AS/400 Integration API.", "AS/400 Integration API."),
      description: l(
        "Puente Java 21 / Spring Boot 3 hacia mainframe AS/400. Mapeo de tipos, control de transacciones distribuidas y un patrón anti-corrupción que aísla el modelo del dominio moderno del de RPG.",
        "Java 21 / Spring Boot 3 bridge to the AS/400 mainframe. Type mapping, distributed transaction control and an anti-corruption layer that isolates the modern domain model from the RPG one.",
        "Pont Java 21 / Spring Boot 3 cap al mainframe AS/400. Mapeig de tipus, control de transaccions distribuïdes i un patró anti-corrupció que aïlla el model del domini modern del de RPG."
      ),
      badge: l("INTERNO", "INTERNAL", "INTERN"),
    },
    {
      title: l(
        "Visualizador de revistas · Salerm Magazine.",
        "Magazine viewer · Salerm Magazine.",
        "Visualitzador de revistes · Salerm Magazine."
      ),
      description: l(
        "CMS con lectura protegida por tokens y panel de administración aislado. Edición colaborativa, control de versiones por número, previsualización en tiempo real y página pública compartible.",
        "CMS with token-protected reading and an isolated admin panel. Collaborative editing, per-issue versioning, real-time preview and a publicly shareable page.",
        "CMS amb lectura protegida per tokens i panell d'administració aïllat. Edició col·laborativa, control de versions per número, previsualització en temps real i pàgina pública compartible."
      ),
      link: {
        label: "magazine.salerm.com ↗",
        href: "https://magazine.salerm.com/s/7611600d-0ac8-4b56-b5a3-f54e1ed7522c",
        kind: "demo" as const,
      },
      badge: l("DEMO PÚBLICA", "PUBLIC DEMO", "DEMO PÚBLICA"),
    },
    {
      title: l(
        "Gateway de IA unificado.",
        "Unified AI gateway.",
        "Gateway d'IA unificat."
      ),
      description: l(
        "Proxy/enrutador de modelos de lenguaje con API compatible OpenAI, control de contexto y streaming. Cuotas por equipo, redacted logging y fallback automático entre proveedores.",
        "Language-model proxy/router with an OpenAI-compatible API, context control and streaming. Per-team quotas, redacted logging and automatic provider fallback.",
        "Proxy/enrutador de models de llenguatge amb API compatible OpenAI, control de context i streaming. Quotes per equip, redacted logging i fallback automàtic entre proveïdors."
      ),
      badge: l("INTERNO", "INTERNAL", "INTERN"),
    },
    {
      title: l(
        "VMV Backups · respaldo a nivel sistema.",
        "VMV Backups · system-level backup.",
        "VMV Backups · còpia a nivell de sistema."
      ),
      description: l(
        "Protocolo de backup que bypassa los límites de memoria de PHP llamando directamente al kernel. Snapshots incrementales, verificación de integridad y restore puntual por dominio.",
        "Backup protocol that bypasses PHP memory limits by calling the kernel directly. Incremental snapshots, integrity checks and point-in-time restore per domain.",
        "Protocol de backup que bypassa els límits de memòria de PHP cridant directament al kernel. Snapshots incrementals, verificació d'integritat i restore puntual per domini."
      ),
      badge: l("INTERNO", "INTERNAL", "INTERN"),
    },
    {
      title: l(
        "VMV Sign · firma legal con biometría.",
        "VMV Sign · legal signature with biometrics.",
        "VMV Sign · signatura legal amb biometria."
      ),
      description: l(
        "Plataforma LegalTech en Next.js: inyección de campos en formularios PDF, flujos biométricos y trazabilidad completa del documento desde la creación hasta el archivado.",
        "Next.js LegalTech platform: PDF form-field injection, biometric workflows and full document traceability from creation to archive.",
        "Plataforma LegalTech en Next.js: injecció de camps en formularis PDF, fluxos biomètrics i traçabilitat completa del document des de la creació fins a l'arxivat."
      ),
      badge: l("INTERNO", "INTERNAL", "INTERN"),
    },
    {
      title: l(
        "Motor de generación de PDF asíncrono.",
        "Async PDF generation engine.",
        "Motor de generació de PDF asíncron."
      ),
      description: l(
        "Cola de jobs y estados en tiempo real (SSE) para liberar a los servidores web. Reintentos idempotentes, plantillas versionadas y backpressure controlado.",
        "Job queue and real-time status (SSE) to offload web servers. Idempotent retries, versioned templates and controlled backpressure.",
        "Cua de jobs i estats en temps real (SSE) per alliberar els servidors web. Reintents idempotents, plantilles versionades i backpressure controlat."
      ),
      badge: l("INTERNO", "INTERNAL", "INTERN"),
    },
    {
      title: l(
        "Plugins publicados en WordPress.org.",
        "Plugins published on WordPress.org.",
        "Plugins publicats a WordPress.org."
      ),
      description: l(
        "Además del store interno, mantengo extensiones publicadas en el repositorio oficial de WordPress.org — código abierto, soporte público y compatibilidad con cada versión mayor.",
        "Beyond the internal store, I maintain extensions published on the official WordPress.org repository — open source, public support and compatibility with each major version.",
        "A més del store intern, mantinc extensions publicades al repositori oficial de WordPress.org — codi obert, suport públic i compatibilitat amb cada versió major."
      ),
      link: {
        label: "wordpress.org · perfil ↗",
        href: "https://profiles.wordpress.org/alexasto12/",
        kind: "platform" as const,
      },
      badge: l("PÚBLICO", "PUBLIC", "PÚBLIC"),
    },
  ] as VmvCapability[],
  ticker: [
    "+30 DOMINIOS",
    "infraestructura",
    "DNS",
    "correo corporativo",
    "WebShield",
    "AS/400",
    "CI/CD",
    "observabilidad",
    "Go",
    "Java 21",
    "Spring Boot 3",
    "WordPress",
    "OpenAPI",
    "Kafka",
    "Docker",
    "Salerm",
  ],
  capabilitiesLabel: l("CAPACIDADES", "CAPABILITIES", "CAPACITATS"),
  bracketLabel: l("BLOQUE TÉCNICO", "TECHNICAL BLOCK", "BLOC TÈCNIC"),
} as const;

/* ───────────── Timeline ───────────── */

export const timeline = {
  sectionNumber: "004",
  sectionLabel: l("RECORRIDO", "PATH", "RECORREGUT"),
  heading: l(
    "Catorce años aprendiendo a sostener sistemas.",
    "Fourteen years learning to hold systems up.",
    "Catorze anys aprenent a sostenir sistemes."
  ),
  description: l(
    "De arreglar el portátil familiar con Mandriva Linux a los 11 a operar la infraestructura de una empresa cosmética con presencia internacional. Esta es la versión corta.",
    "From fixing the family laptop with Mandriva Linux at age 11 to operating the infrastructure of an international cosmetics company. This is the short version.",
    "D'arreglar el portàtil familiar amb Mandriva Linux als 11 a operar la infraestructura d'una empresa cosmètica amb presència internacional. Aquesta és la versió curta."
  ),
  entries: [
    {
      year: "2011",
      title: l(
        "Mandriva Linux en el portátil de casa.",
        "Mandriva Linux on the family laptop.",
        "Mandriva Linux al portàtil de casa."
      ),
      place: l("Granollers · 11 años", "Granollers · age 11", "Granollers · 11 anys"),
      body: l(
        "Se rompió el portátil familiar y decidí no reemplazarlo. Cambié el disco duro, instalé Mandriva Linux y descubrí que detrás de la pantalla había un sistema entero que se podía leer. Esa tarde empezó todo.",
        "The family laptop broke and I refused to replace it. I swapped the hard drive, installed Mandriva Linux and discovered there was a whole readable system behind the screen. Everything started that afternoon.",
        "Es va trencar el portàtil familiar i vaig decidir no canviar-lo. Vaig canviar el disc dur, vaig instal·lar Mandriva Linux i vaig descobrir que darrere de la pantalla hi havia un sistema sencer que es podia llegir. Aquella tarda va començar tot."
      ),
      kind: "milestone",
    },
    {
      year: "2017–19",
      title: l(
        "Bachillerato tecnológico.",
        "Technology high school.",
        "Batxillerat tecnològic."
      ),
      place: l("Granollers", "Granollers", "Granollers"),
      body: l(
        "Bachillerato científico-tecnológico. En paralelo, primeros experimentos serios con Java, PHP y servidores locales: APIs caseras, bots y un par de páginas para amigos.",
        "Science & tech high school. In parallel, first serious experiments with Java, PHP and local servers: home-made APIs, bots and a couple of sites for friends.",
        "Batxillerat científic-tecnològic. En paral·lel, primers experiments seriosos amb Java, PHP i servidors locals: APIs casolanes, bots i un parell de pàgines per a amics."
      ),
      kind: "education",
    },
    {
      year: "2020–22",
      title: l(
        "Grado superior · Desarrollo de Aplicaciones Web.",
        "Higher Vocational · Web Application Development.",
        "Cicle superior · Desenvolupament d'Aplicacions Web."
      ),
      place: l("Barcelona", "Barcelona", "Barcelona"),
      body: l(
        "Stack base: HTML, CSS, JavaScript, PHP, Laravel, Angular, MySQL. Mi proyecto integrador fue un CRUD full-stack Laravel + Angular sobre MySQL. Aquí empieza la disciplina.",
        "Base stack: HTML, CSS, JavaScript, PHP, Laravel, Angular, MySQL. My integration project was a full-stack CRUD Laravel + Angular over MySQL. Discipline starts here.",
        "Stack base: HTML, CSS, JavaScript, PHP, Laravel, Angular, MySQL. El meu projecte integrador va ser un CRUD full-stack Laravel + Angular sobre MySQL. Aquí comença la disciplina."
      ),
      kind: "education",
    },
    {
      year: "2023",
      title: l(
        "Entrada en VMV Cosmetic Group.",
        "Joined VMV Cosmetic Group.",
        "Entrada a VMV Cosmetic Group."
      ),
      place: l("Barcelona · Systems / Web", "Barcelona · Systems / Web", "Barcelona · Systems / Web"),
      body: l(
        "Empiezo administrando dominios y WordPress. En meses ya estoy escribiendo microservicios en Go, integrando con AS/400 desde Java y montando el primer WAF interno. La infraestructura crece a +30 dominios.",
        "Started by managing domains and WordPress. Within months I was writing Go microservices, integrating with AS/400 from Java and building the first internal WAF. The infrastructure grew to 30+ domains.",
        "Començo administrant dominis i WordPress. En mesos ja escric microserveis en Go, integro amb AS/400 des de Java i munto el primer WAF intern. La infraestructura creix a +30 dominis."
      ),
      kind: "work",
    },
    {
      year: "2024",
      title: l(
        "TFG: peer2stream · 10/10.",
        "Final Year Project: peer2stream · 10/10.",
        "TFG: peer2stream · 10/10."
      ),
      place: l("Trabajo de Fin de Grado", "Final Year Project", "Treball de Final de Grau"),
      body: l(
        "Plataforma web para descubrir, ver y organizar películas y series. Next.js 15, React 19, MongoDB, integración con TMDB, autenticación JWT y seguimiento por episodio. Nota máxima.",
        "Web platform to discover, watch and organize movies and shows. Next.js 15, React 19, MongoDB, TMDB integration, JWT auth and per-episode tracking. Top grade.",
        "Plataforma web per descobrir, veure i organitzar pel·lícules i sèries. Next.js 15, React 19, MongoDB, integració amb TMDB, autenticació JWT i seguiment per episodi. Nota màxima."
      ),
      kind: "education",
    },
    {
      year: "2024",
      title: l(
        "Lanzamiento de Neibr.",
        "Neibr launch.",
        "Llançament de Neibr."
      ),
      place: l("Producto propio", "Own product", "Producte propi"),
      body: l(
        "Arranco Neibr como producto propio: una plataforma logística B2B API-first en Go con matching geoespacial PostGIS. Repositorio de marca (neibr.es) y plataforma viven separados.",
        "I launched Neibr as my own product: a B2B, API-first logistics platform in Go with PostGIS geospatial matching. Brand repo (neibr.es) and platform live separately.",
        "Engego Neibr com a producte propi: una plataforma logística B2B API-first en Go amb matching geoespacial PostGIS. Repositori de marca (neibr.es) i plataforma viuen separats."
      ),
      kind: "project",
    },
    {
      year: l("Hoy", "Today", "Avui"),
      title: l(
        "Systems Architect en VMV · arquitecto de Neibr · freelance.",
        "Systems Architect at VMV · Neibr architect · freelance.",
        "Arquitecte de sistemes a VMV · arquitecte de Neibr · freelance."
      ),
      place: l("Barcelona · BCN-ETSY", "Barcelona · BCN-ETSY", "Barcelona · BCN-ETSY"),
      body: l(
        "Sigo operando la infraestructura corporativa de VMV, evolucionando Neibr en paralelo y aceptando proyectos freelance donde el reto técnico sea real.",
        "Still operating VMV's corporate infrastructure, evolving Neibr in parallel and taking on freelance projects where the technical challenge is real.",
        "Continuo operant la infraestructura corporativa de VMV, evolucionant Neibr en paral·lel i acceptant projectes freelance on el repte tècnic sigui real."
      ),
      kind: "work",
    },
  ] as TimelineEntry[],
} as const;

/* ───────────── Freelance ───────────── */

export const freelance = {
  sectionNumber: "005",
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
      mock: "larasoak" as const,
      mockUrl: "larasoak.art",
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
      mock: "gokthermal" as const,
      mockUrl: "gokthermal.com",
    },
  ] as LocalizedProject[],
} as const;

/* ───────────── Own products ───────────── */

export const products = {
  sectionNumber: "006",
  sectionLabel: l("PRODUCTOS PROPIOS", "OWN PRODUCTS", "PRODUCTES PROPIS"),
  heading: l(
    "Lo que arranco yo.",
    "What I start myself.",
    "El que arrenco jo."
  ),
  description: l(
    "Proyectos que financio y mantengo. Aquí prueba las ideas que después aplico a clientes.",
    "Projects I fund and maintain. Here I test the ideas I later apply to clients.",
    "Projectes que finançament i mantinc. Aquí provo les idees que després aplico a clients."
  ),
  items: [
    {
      id: "neibr-landing",
      name: "neibr.es — Marca / Landing",
      description: l(
        "Sitio de marca y onboarding comercial de Neibr. Repositorio independiente de la plataforma; orientado a SEO, captación de operadores y documentación pública. Multilenguaje ES/CA/EN.",
        "Brand site and commercial onboarding for Neibr. Separate repo from the platform; SEO, carrier lead-gen and public docs first. Multilingual ES/CA/EN.",
        "Lloc de marca i onboarding comercial de Neibr. Repositori independent de la plataforma; orientat a SEO, captació d'operadors i documentació pública. Multilingüe ES/CA/EN."
      ),
      tags: [
        tag("LANDING", "LANDING", "LANDING"),
        tag("SEO", "SEO", "SEO"),
        tag("ES · CA · EN", "ES · CA · EN", "ES · CA · EN"),
      ],
      links: [
        { label: "neibr.es ↗", href: "https://neibr.es", kind: "landing" as const },
      ],
      mock: "neibrLanding" as const,
      mockUrl: "neibr.es",
    },
    {
      id: "roses-st-jordi",
      name: "Roses Sant Jordi",
      description: l(
        "Proyecto propio multi-dominio para la campaña de Sant Jordi (.com / .cat / .es). Hasta 5.000 visitas de tráfico real en una semana, con SEO localizado por idioma y dominio.",
        "Own multi-domain project for the Sant Jordi campaign (.com / .cat / .es). Up to 5,000 real visits in one week, with per-language and per-domain localized SEO.",
        "Projecte propi multi-domini per a la campanya de Sant Jordi (.com / .cat / .es). Fins a 5.000 visites de trànsit real en una setmana, amb SEO localitzat per idioma i domini."
      ),
      tags: [
        tag("MULTI-DOMINIO", "MULTI-DOMAIN", "MULTI-DOMINI"),
        tag("+5K TRÁFICO", "+5K TRAFFIC", "+5K TRÀNSIT"),
        tag("SEO", "SEO", "SEO"),
      ],
      links: [
        {
          label: "rosesstjordi.com ↗",
          href: "https://rosesstjordi.com",
          kind: "landing" as const,
        },
      ],
      mock: "roses" as const,
      mockUrl: "rosesstjordi.com",
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
    },
  ] as LocalizedProject[],
} as const;

/* ───────────── Academic ───────────── */

export const academic = {
  sectionNumber: "007",
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
      mock: "peer2stream" as const,
      mockUrl: "peer2stream · local demo",
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
      mock: "pokeDS" as const,
      mockUrl: "alexasto12.github.io/ProjectePokeAPI",
    },
  ] as LocalizedProject[],
} as const;

/* ───────────── Contact ───────────── */

export const contact = {
  sectionNumber: "008",
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
    { label: "EMAIL", href: "mailto:contact@alexasto.com" },
    { label: "GITHUB", href: "https://github.com/Alexasto12" },
    {
      label: "LINKEDIN",
      href: "https://www.linkedin.com/in/alejandro-cabrera-asto/",
    },
    {
      label: "WORDPRESS.ORG",
      href: "https://profiles.wordpress.org/alexasto12/",
    },
  ],
  footerNote: l(
    "Sin agencias intermediarias. Sin templates. Construido a mano en Barcelona.",
    "No middle agencies. No templates. Hand-built in Barcelona.",
    "Sense agències intermediàries. Sense templates. Construït a mà a Barcelona."
  ),
} as const;
