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
};

export type VmvCapability = {
  title: Localized<string>;
  description: Localized<string>;
};

export type VmvStat = {
  value: number;
  label: Localized<string>;
  caption: Localized<string>;
};

const tag = (es: string, en: string, ca: string): Tag => l(es, en, ca);

/* ────────────────────────────────────────────────
 * Telemetry bar
 * ────────────────────────────────────────────── */

export const telemetry = {
  systemId: "AC_SYSTEMS",
  name: "Alejandro Cabrera",
  role: l(
    "Systems Architect · BCN",
    "Systems Architect · BCN",
    "Arquitecte de sistemes · BCN"
  ),
  status: l("sistema activo", "system online", "sistema actiu"),
  uptime: "99.98%",
  availability: l(
    "Disponible para nuevos proyectos",
    "Open to new projects",
    "Disponible per a nous projectes"
  ),
} as const;

/* ────────────────────────────────────────────────
 * Hero
 * ────────────────────────────────────────────── */

export const hero = {
  sectionLabel: l("001 — PERFIL", "001 — PROFILE", "001 — PERFIL"),
  sectionHint: l(
    "hover para reanimar ↻",
    "hover to replay ↻",
    "passa el cursor per reanimar ↻"
  ),
  firstName: "Alejandro",
  lastName: "Cabrera",
  intro: l(
    "Arquitecto de sistemas. Diseño y construyo microservicios de alto rendimiento, infraestructura de red corporativa y plataformas API-first. Busco que la elegancia estructural del backend se refleje en la del frontend.",
    "Systems architect. I design and build high-throughput microservices, corporate network infrastructure and API-first platforms. I aim for the structural elegance of the backend to translate into the frontend.",
    "Arquitecte de sistemes. Dissenyo i construeixo microserveis d'alt rendiment, infraestructura de xarxa corporativa i plataformes API-first. Busco que l'elegància estructural del backend es reflecteixi en la del frontend."
  ),
  intro2: l(
    "Vivo en Barcelona. Trabajo sobre el principio de que un sistema bien pensado se nota: en la latencia, en el coste y en la calma con la que se opera.",
    "Based in Barcelona. I work on the principle that a well-thought system shows: in latency, in cost, and in the calm of operating it.",
    "Visc a Barcelona. Treballo sobre el principi que un sistema ben pensat es nota: en la latència, en el cost i en la calma amb què s'opera."
  ),
  stack: ["Go / Java · Node", "Next · Astro", "Docker · LiteLLM"],
  contextLabel: l("CONTEXTO", "CONTEXT", "CONTEXT"),
  stackLabel: l("STACK", "STACK", "STACK"),
} as const;

/* ────────────────────────────────────────────────
 * Approach / philosophy
 * ────────────────────────────────────────────── */

export const approach = {
  sectionLabel: l("002 — ENFOQUE", "002 — APPROACH", "002 — ENFOC"),
  heading: l(
    "Cuatro principios. Cero gimmicks.",
    "Four principles. Zero gimmicks.",
    "Quatre principis. Zero gimmicks."
  ),
  principles: [
    {
      index: "01",
      title: l(
        "Diseño primero la API.",
        "API design comes first.",
        "Dissenyo primer l'API."
      ),
      body: l(
        "Antes de escribir lógica de negocio, defino contratos. La forma de los datos predice la forma del producto.",
        "Before writing business logic, I define contracts. The shape of data predicts the shape of the product.",
        "Abans d'escriure lògica de negoci, defineixo contractes. La forma de les dades prediu la forma del producte."
      ),
    },
    {
      index: "02",
      title: l(
        "Mido lo que se mueve.",
        "Measure what moves.",
        "Mesuro el que es mou."
      ),
      body: l(
        "Métricas, trazas y logs estructurados desde el día uno. Sin observabilidad, optimizar es adivinar.",
        "Metrics, traces and structured logs from day one. Without observability, optimizing is guessing.",
        "Mètriques, traces i logs estructurats des del primer dia. Sense observabilitat, optimitzar és endevinar."
      ),
    },
    {
      index: "03",
      title: l(
        "Construyo para fallos.",
        "Build for failure.",
        "Construeixo per als errors."
      ),
      body: l(
        "Timeouts, retries con jitter, circuit breakers y degradación elegante. El happy path es la excepción, no la regla.",
        "Timeouts, retries with jitter, circuit breakers and graceful degradation. The happy path is the exception, not the rule.",
        "Timeouts, reintents amb jitter, circuit breakers i degradació elegant. El happy path és l'excepció, no la regla."
      ),
    },
    {
      index: "04",
      title: l(
        "Documento como código.",
        "Docs as code.",
        "Documento com a codi."
      ),
      body: l(
        "OpenAPI versionado, ADRs cortos y READMEs que un nuevo integrante pueda ejecutar en una tarde.",
        "Versioned OpenAPI, short ADRs and READMEs a new teammate can run in an afternoon.",
        "OpenAPI versionat, ADRs curts i READMEs que un nou membre pugui executar en una tarda."
      ),
    },
  ],
} as const;

/* ────────────────────────────────────────────────
 * Neibr — flagship project
 * ────────────────────────────────────────────── */

export const neibr = {
  sectionLabel: l("PROYECTO BANDERA", "FLAGSHIP PROJECT", "PROJECTE BANDERA"),
  productLabel: l("PLATAFORMA · API", "PLATFORM · API", "PLATAFORMA · API"),
  brandLabel: l("MARCA · LANDING", "BRAND · LANDING", "MARCA · LANDING"),
  title: "Neibr",
  tagline: l(
    "Logística B2B API-first.",
    "B2B logistics, API-first.",
    "Logística B2B API-first."
  ),
  description: l(
    "Infraestructura logística B2B API-First. Elimina retornos de paquetería mediante Double Blind Handover y garantía de Cero Retornos. Los operadores logísticos integran la API; los vecinos reciben paquetes y acumulan puntos canjeables.",
    "B2B, API-first logistics infrastructure. Eliminates parcel returns through Double Blind Handover and a Zero Returns guarantee. Carriers integrate via API; neighbours receive parcels and earn redeemable points.",
    "Infraestructura logística B2B API-First. Elimina retorns de paqueteria mitjançant Double Blind Handover i garantia de Zero Retorns. Els operadors logístics integren l'API; els veïns reben paquets i acumulen punts bescanviables."
  ),
  description2: l(
    "Dos productos en uno: una plataforma backend (microservicios en Go, multi-tenant, gestión de tokens, panel de operador) y una app de usuario que distribuye los puntos en una red vecinal. Repositorio de marca y plataforma viven separados.",
    "Two products in one: a backend platform (Go microservices, multi-tenant, token management, operator dashboard) and a user app that distributes points across a neighbourhood network. The brand site and the platform live in separate repos.",
    "Dos productes en un: una plataforma backend (microserveis en Go, multi-tenant, gestió de tokens, panell d'operador) i una app d'usuari que distribueix els punts en una xarxa veïnal. El repositori de marca i la plataforma viuen separats."
  ),
  stat: {
    value: 3_000_000,
    valueLabel: l("requests", "requests", "requests"),
    duration: "50 min",
    durationLabel: l("duración", "duration", "durada"),
    caption: l(
      "Stress test superado sin degradación. p99 estable, errores bajo el umbral.",
      "Stress test passed without degradation. p99 stable, error rate below threshold.",
      "Stress test superat sense degradació. p99 estable, errors sota el llindar."
    ),
  },
  tags: [
    tag("GO BACKEND", "GO BACKEND", "GO BACKEND"),
    tag("API-FIRST", "API-FIRST", "API-FIRST"),
    tag("B2B + APP", "B2B + APP", "B2B + APP"),
    tag("MULTI-IDIOMA (ES/CA/EN)", "MULTI-LANG (ES/CA/EN)", "MULTI-IDIOMA (ES/CA/EN)"),
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
      "Onboarding de operadores en horas",
      "Carrier onboarding in hours",
      "Onboarding d'operadors en hores"
    ),
  ],
  links: [
    {
      label: l("Visita la plataforma", "Visit the platform", "Visita la plataforma"),
      href: "https://neibr.es",
      kind: "landing" as const,
      hint: l("Sitio de marca", "Brand site", "Lloc de marca"),
    },
  ],
  conceptsLabel: l("CONCEPTOS CLAVE", "KEY CONCEPTS", "CONCEPTES CLAU"),
  outputLabel: l("STRESS TEST · OUTPUT", "STRESS TEST · OUTPUT", "STRESS TEST · OUTPUT"),
} as const;

/* ────────────────────────────────────────────────
 * VMV — corporate experience (dark block)
 * ────────────────────────────────────────────── */

export const vmv = {
  sectionLabel: l("003 — EXPERIENCIA", "003 — EXPERIENCE", "003 — EXPERIÈNCIA"),
  client: "VMV Cosmetic Group",
  heading: l(
    "Stack completo a escala corporativa.",
    "Full stack at corporate scale.",
    "Stack complet a escala corporativa."
  ),
  intro: l(
    "Más de dos años operando la infraestructura digital de una empresa cosmética con presencia internacional. Una superficie que va del DNS a un gateway de IA, pasando por +20 microservicios y una red de plugins corporativos.",
    "More than two years running the digital infrastructure of an international cosmetics company. A surface that spans from DNS to an AI gateway, including 20+ microservices and a corporate plugin network.",
    "Més de dos anys operant la infraestructura digital d'una empresa cosmètica amb presència internacional. Una superfície que va del DNS a un gateway d'IA, passant per +20 microserveis i una xarxa de plugins corporatius."
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
      title: l(
        "Ecosistema de plugins.",
        "Plugin ecosystem.",
        "Ecosistema de plugins."
      ),
      description: l(
        "Una red de plugins corporativos con su propio orquestador de actualizaciones — un \"store\" interno que distribuye y versiona cada pieza. Releases canarios, rollback en un click y telemetría agregada por dominio.",
        "A corporate plugin network with its own update orchestrator — an internal \"store\" that distributes and versions every piece. Canary releases, one-click rollback and per-domain aggregated telemetry.",
        "Una xarxa de plugins corporatius amb el seu propi orquestrador d'actualitzacions — un \"store\" intern que distribueix i versiona cada peça. Releases canaris, rollback en un clic i telemetria agregada per domini."
      ),
    },
    {
      title: l(
        "Seguridad perimetral.",
        "Perimeter security.",
        "Seguretat perimetral."
      ),
      description: l(
        "WAF de carga temprana con IP scoring dinámico y bloqueos sincronizados entre un microservicio en Go y la capa de WordPress. Listas reactivas, ventanas de cuarentena y métricas en vivo del tráfico bloqueado.",
        "Early-loading WAF with dynamic IP scoring and synced blocklists between a Go microservice and the WordPress layer. Reactive lists, quarantine windows and live metrics on blocked traffic.",
        "WAF de càrrega primerenca amb IP scoring dinàmic i bloquejos sincronitzats entre un microservei en Go i la capa de WordPress. Llistes reactives, finestres de quarantena i mètriques en directe del trànsit bloquejat."
      ),
    },
    {
      title: l(
        "Visualizador de revistas interactivo.",
        "Interactive magazine viewer.",
        "Visualitzador de revistes interactiu."
      ),
      description: l(
        "CMS con lectura protegida por tokens y panel de administración aislado. Edición colaborativa, control de versiones por número y previsualización en tiempo real.",
        "CMS with token-protected reading and an isolated admin panel. Collaborative editing, per-issue versioning and real-time preview.",
        "CMS amb lectura protegida per tokens i panell d'administració aïllat. Edició col·laborativa, control de versions per número i previsualització en temps real."
      ),
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
    },
    {
      title: l(
        "Integraciones legacy.",
        "Legacy integrations.",
        "Integracions legacy."
      ),
      description: l(
        "Puentes hacia mainframe AS/400 desde servicios Java. Mapeo de tipos, control de transacciones distribuidas y un patrón anti-corrupción que aísla el modelo del dominio moderno.",
        "Bridges to AS/400 mainframe from Java services. Type mapping, distributed transaction control and an anti-corruption layer that isolates the modern domain model.",
        "Ponts cap a mainframe AS/400 des de serveis Java. Mapeig de tipus, control de transaccions distribuïdes i un patró anti-corrupció que aïlla el model del domini modern."
      ),
    },
  ] as VmvCapability[],
  ticker: [
    "+30 DOMINIOS",
    "infraestructura",
    "DNS",
    "correo corporativo",
    "seguridad perimetral",
    "WAF",
    "CI/CD",
    "observabilidad",
    "AS/400",
    "Go",
    "Java",
    "Node",
    "WordPress",
    "OpenAPI",
    "Kafka",
    "Docker",
  ],
  capabilitiesLabel: l("CAPACIDADES", "CAPABILITIES", "CAPACITATS"),
  bracketLabel: l("BLOQUE TÉCNICO", "TECHNICAL BLOCK", "BLOC TÈCNIC"),
} as const;

/* ────────────────────────────────────────────────
 * Freelance / client work
 * ────────────────────────────────────────────── */

export const freelance = {
  sectionLabel: l("004 — FREELANCE", "004 — FREELANCE", "004 — FREELANCE"),
  intro: l(
    "Encargos de cliente a coste contenido y entrega rápida. Stack moderno, CMS hechos a medida cuando aporta y nada de plantillas.",
    "Client work, lean budgets and quick turnaround. Modern stack, custom CMS when it helps and zero templates.",
    "Encàrrecs de client a cost contingut i lliurament ràpid. Stack modern, CMS fets a mida quan aporta i res de plantilles."
  ),
  projects: [
    {
      id: "larasoak",
      name: "larasoak.art",
      description: l(
        "Portfolio editorial para Lara Carrasco (storyboard, concept art y diseño para animación y videojuegos) con CMS propio: gestión de obra, subida de imágenes a almacenamiento en la nube (Vercel Blob) y secciones de storyboards, concept art, client work y sketchbook.",
        "Editorial portfolio for Lara Carrasco (storyboard, concept art and design for animation and video games) with an in-house CMS: artwork management, cloud image uploads (Vercel Blob) and dedicated storyboards, concept art, client work and sketchbook sections.",
        "Portfolio editorial per a la Lara Carrasco (storyboard, concept art i disseny per a animació i videojocs) amb CMS propi: gestió d'obra, pujada d'imatges a emmagatzematge al núvol (Vercel Blob) i seccions de storyboards, concept art, client work i sketchbook."
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
    },
  ] as LocalizedProject[],
} as const;

/* ────────────────────────────────────────────────
 * Own products
 * ────────────────────────────────────────────── */

export const products = {
  sectionLabel: l("005 — PRODUCTOS PROPIOS", "005 — OWN PRODUCTS", "005 — PRODUCTES PROPIS"),
  intro: l(
    "Proyectos que arranco, financio y mantengo yo. Aprendizajes que después aplico a clientes.",
    "Projects I start, fund and maintain myself. Lessons I later apply to client work.",
    "Projectes que arrenco, finançament i mantinc jo. Aprenentatges que després aplico a clients."
  ),
  items: [
    {
      id: "neibr-platform",
      name: "Neibr — Plataforma",
      description: l(
        "La plataforma logística B2B descrita arriba como proyecto bandera: microservicios en Go, multi-tenant y orientada a integraciones API.",
        "The B2B logistics platform featured above as the flagship project: Go microservices, multi-tenant and API-integration first.",
        "La plataforma logística B2B descrita a dalt com a projecte bandera: microserveis en Go, multi-tenant i orientada a integracions API."
      ),
      tags: [
        tag("VER ARRIBA ↑", "SEE ABOVE ↑", "VEURE A DALT ↑"),
        tag("GO · API", "GO · API", "GO · API"),
      ],
      links: [],
    },
    {
      id: "neibr-landing",
      name: "neibr.es — Marca / Landing",
      description: l(
        "Sitio de marca y onboarding comercial de Neibr. Repositorio independiente de la plataforma; orientado a SEO, captación y documentación pública.",
        "Brand site and commercial onboarding for Neibr. Separate repo from the platform; SEO, lead-gen and public docs first.",
        "Lloc de marca i onboarding comercial de Neibr. Repositori independent de la plataforma; orientat a SEO, captació i documentació pública."
      ),
      tags: [
        tag("LANDING", "LANDING", "LANDING"),
        tag("SEO", "SEO", "SEO"),
      ],
      links: [
        { label: "neibr.es ↗", href: "https://neibr.es", kind: "landing" as const },
      ],
    },
    {
      id: "roses-st-jordi",
      name: "Roses Sant Jordi",
      description: l(
        "Proyecto propio multi-dominio para la campaña de Sant Jordi (.com / .cat / .es). Hasta 5.000 visitas de tráfico real en una semana, con SEO localizado por idioma.",
        "Own multi-domain project for the Sant Jordi campaign (.com / .cat / .es). Up to 5,000 real visits in one week, with per-language localized SEO.",
        "Projecte propi multi-domini per a la campanya de Sant Jordi (.com / .cat / .es). Fins a 5.000 visites de trànsit real en una setmana, amb SEO localitzat per idioma."
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
    },
    {
      id: "alexasto",
      name: "alexasto.com",
      description: l(
        "Marca personal — este sitio. Next.js 15, Tailwind v4, Motion. Diseñado como un \"panel de control\" sobre base editorial.",
        "Personal brand — this site. Next.js 15, Tailwind v4, Motion. Designed as a \"control panel\" on an editorial base.",
        "Marca personal — aquest lloc. Next.js 15, Tailwind v4, Motion. Dissenyat com un \"panell de control\" sobre base editorial."
      ),
      tags: [
        tag("NEXT.JS 15", "NEXT.JS 15", "NEXT.JS 15"),
        tag("MOTION", "MOTION", "MOTION"),
        tag("TAILWIND v4", "TAILWIND v4", "TAILWIND v4"),
      ],
      links: [],
    },
  ] as LocalizedProject[],
} as const;

/* ────────────────────────────────────────────────
 * Academic / student projects
 * ────────────────────────────────────────────── */

export const academic = {
  sectionLabel: l("006 — ACADÉMICO", "006 — ACADEMIC", "006 — ACADÈMIC"),
  intro: l(
    "Trabajos de formación que marcaron el rumbo. Código público en GitHub, con sus aciertos y sus rastros de aprendizaje.",
    "Training projects that set the direction. Public code on GitHub, with its highs and its learning traces.",
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
    },
    {
      id: "projecte-pokeapi",
      name: "ProjectePokeAPI",
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
    },
  ] as LocalizedProject[],
} as const;

/* ────────────────────────────────────────────────
 * Contact
 * ────────────────────────────────────────────── */

export const contact = {
  sectionLabel: l("007 — CONTACTO", "007 — CONTACT", "007 — CONTACTE"),
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
  ],
  footerNote: l(
    "Sin agencias intermediarias. Sin templates. Construido a mano en Barcelona.",
    "No middle agencies. No templates. Hand-built in Barcelona.",
    "Sense agències intermediàries. Sense templates. Construït a mà a Barcelona."
  ),
} as const;
