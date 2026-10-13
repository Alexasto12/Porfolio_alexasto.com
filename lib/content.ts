/* =========================================================
   Content (ES / CA / EN)
   Every visible string lives here, in the three languages.
   Facts come from docs/portfolio-refresh/DECISIONES.md; keep the
   three versions saying the same thing.
   ========================================================= */
import type { Localized, Translatable } from "./i18n-types";

export type Link = { label: Translatable; href: Translatable };

/** A card that can show a screenshot of its site (see lib/shots.ts). */
export interface Shot {
  alt: Localized;
}

export interface Card {
  id: string;
  name: string;
  sub?: Localized;
  description: Localized;
  tags: string[];
  links: Link[];
  shot?: Shot;
}

export interface Capability {
  title: Localized;
  description?: Localized;
  link?: Link;
}

export interface TimelineEntry {
  year: string;
  kind: "milestone" | "education" | "work" | "project";
  title: Localized;
  place: Localized;
  body: Localized;
}

const DESANY = "https://www.digitaldesany.com";
/** digitaldesany.com has Spanish (/es) and Catalan (/ca); English readers get Spanish. */
const desanyHome: Localized = { es: `${DESANY}/es`, ca: `${DESANY}/ca`, en: `${DESANY}/es` };
const desanyCase = (slug: string) => `${DESANY}/es/casos-exito/${slug}`;

const caseLinkLabel: Localized = {
  es: "ficha en Digital DesAny ↗",
  ca: "fitxa a Digital DesAny ↗",
  en: "case study at Digital DesAny ↗",
};

export const PERSON_NAME = "Alejandro Cabrera";

export const DATA = {
  /** In-page index, in section order. */
  sections: [
    { id: "ahora", num: "02", label: { es: "Ahora", ca: "Ara", en: "Now" } },
    { id: "experiencia", num: "03", label: { es: "Experiencia", ca: "Experiència", en: "Experience" } },
    { id: "recorrido", num: "04", label: { es: "Recorrido", ca: "Recorregut", en: "Path" } },
    { id: "formacion", num: "05", label: { es: "Formación", ca: "Formació", en: "Education" } },
    { id: "principios", num: "06", label: { es: "Principios", ca: "Principis", en: "Principles" } },
    { id: "contacto", num: "07", label: { es: "Contacto", ca: "Contacte", en: "Contact" } },
  ] as { id: string; num: string; label: Localized }[],

  telemetry: {
    name: PERSON_NAME,
    role: {
      es: "Backend y full-stack · Granollers",
      ca: "Backend i full-stack · Granollers",
      en: "Backend and full-stack · Granollers",
    } as Localized,
    availability: {
      es: "Disponible para proyectos",
      ca: "Disponible per a projectes",
      en: "Open to new projects",
    } as Localized,
    skipLink: { es: "Saltar al contenido", ca: "Vés al contingut", en: "Skip to content" } as Localized,
    langLabel: { es: "Idioma", ca: "Idioma", en: "Language" } as Localized,
  },

  hero: {
    label: { es: "Perfil", ca: "Perfil", en: "Profile" } as Localized,
    hint: {
      es: "pasa el cursor por el nombre para reanimarlo ↻",
      ca: "passa el cursor pel nom per tornar-lo a animar ↻",
      en: "hover the name to replay ↻",
    } as Localized,
    firstName: "Alejandro",
    lastName: "Cabrera",
    title: {
      es: "Desarrollador backend y full-stack. Cofundador de Digital DesAny.",
      ca: "Desenvolupador backend i full-stack. Cofundador de Digital DesAny.",
      en: "Backend and full-stack developer. Co-founder of Digital DesAny.",
    } as Localized,
    line: {
      es: "Hago webs, backends y automatizaciones desde Granollers. Casi todo pasa por Digital DesAny, el estudio que llevo con Oriol Tamborero.",
      ca: "Faig webs, backends i automatitzacions des de Granollers. Gairebé tot passa per Digital DesAny, l'estudi que porto amb l'Oriol Tamborero.",
      en: "I build websites, backends and automations from Granollers, near Barcelona. Most of it goes through Digital DesAny, the studio I run with Oriol Tamborero.",
    } as Localized,
    ctaWork: { label: { es: "Ver trabajos", ca: "Veure treballs", en: "See my work" } as Localized, href: "#ahora" },
    ctaTalk: { label: { es: "Hablemos", ca: "Parlem", en: "Let's talk" } as Localized, href: "#contacto" },
    stackLabel: { es: "Con lo que trabajo", ca: "Amb què treballo", en: "What I work with" } as Localized,
    stack: [
      "Go · Fiber · PostgreSQL · Redis",
      "Java 21 · Spring Boot 3 · AS/400",
      "Next.js 15 · React 19 · TypeScript",
      "WordPress · PHP · Docker",
    ],
  },

  now: {
    num: "02",
    label: { es: "Ahora", ca: "Ara", en: "Now" } as Localized,
    heading: { es: "Digital DesAny.", ca: "Digital DesAny.", en: "Digital DesAny." } as Localized,
    description: {
      es: "Digital DesAny es el estudio web que fundé con Oriol Tamborero en Granollers. Trabajamos para pymes de toda Cataluña, en persona o en remoto.",
      ca: "Digital DesAny és l'estudi web que vaig fundar amb l'Oriol Tamborero a Granollers. Treballem per a pimes de tot Catalunya, en persona o en remot.",
      en: "Digital DesAny is the web studio I founded with Oriol Tamborero in Granollers. We work for small and medium businesses all over Catalonia, in person or remotely.",
    } as Localized,
    servicesLabel: { es: "Qué hacemos", ca: "Què fem", en: "What we do" } as Localized,
    services: [
      {
        title: { es: "Webs a medida", ca: "Webs a mida", en: "Custom websites" },
        description: {
          es: "En cuatro partes que se contratan juntas o por separado: diseño, desarrollo, digitalización y despliegue.",
          ca: "En quatre parts que es contracten juntes o per separat: disseny, desenvolupament, digitalització i desplegament.",
          en: "In four parts you can hire together or separately: design, development, digitalisation and deployment.",
        },
      },
      {
        title: { es: "Gestión de redes sociales", ca: "Gestió de xarxes socials", en: "Social media management" },
      },
      {
        title: { es: "Automatizaciones", ca: "Automatitzacions", en: "Automations" },
        description: {
          es: "Con y sin IA, según lo que pida el caso.",
          ca: "Amb IA i sense, segons el que demani el cas.",
          en: "With or without AI, depending on what the job needs.",
        },
      },
      {
        title: { es: "Software a medida", ca: "Programari a mida", en: "Custom software" },
      },
    ] as Capability[],
    ownership: {
      es: "Cuando el proyecto está pagado, el código y el diseño son del cliente, con documentación técnica completa.",
      ca: "Quan el projecte està pagat, el codi i el disseny són del client, amb documentació tècnica completa.",
      en: "Once a project is paid for, the code and the design belong to the client, with full technical documentation.",
    } as Localized,
    links: [
      {
        label: { es: "servicios en digitaldesany.com ↗", ca: "serveis a digitaldesany.com ↗", en: "services at digitaldesany.com ↗" },
        href: desanyHome,
      },
      { label: "linkedin ↗", href: "https://www.linkedin.com/company/digital-desany/" },
    ] as Link[],
    casesLabel: { es: "Casos", ca: "Casos", en: "Case studies" } as Localized,
    cases: [
      {
        id: "larasoak",
        name: "Lara's Oak",
        sub: { es: "Portfolio · CMS propio", ca: "Portfolio · CMS propi", en: "Portfolio · custom CMS" },
        description: {
          es: "Portfolio de storyboard y concept art, con un CMS hecho sobre un sistema de bloques propio.",
          ca: "Portfolio de storyboard i concept art, amb un CMS fet sobre un sistema de blocs propi.",
          en: "Storyboard and concept art portfolio, with a CMS built on our own block system.",
        },
        tags: ["NEXT.JS", "CMS"],
        links: [
          { label: caseLinkLabel, href: desanyCase("lara-oak") },
          { label: "larasoak.art ↗", href: "https://larasoak.art" },
        ],
        shot: {
          alt: {
            es: "Portada de larasoak.art, el portfolio de Lara's Oak",
            ca: "Portada de larasoak.art, el portfolio de Lara's Oak",
            en: "Home page of larasoak.art, the Lara's Oak portfolio",
          },
        },
      },
      {
        id: "paulakrebel",
        name: "Paula Krebel",
        sub: { es: "Portfolio · marca", ca: "Portfolio · marca", en: "Portfolio · branding" },
        description: {
          es: "Portfolio trilingüe de ilustración infantil y juvenil, con diseño de marca y design system.",
          ca: "Portfolio trilingüe d'il·lustració infantil i juvenil, amb disseny de marca i design system.",
          en: "Trilingual portfolio of children's and young adult illustration, with brand design and a design system.",
        },
        tags: ["ES · CA · EN", "DESIGN SYSTEM"],
        links: [{ label: caseLinkLabel, href: desanyCase("paula-krebel") }],
      },
      {
        id: "roses",
        name: "Roses de Sant Jordi",
        sub: { es: "Campaña de Sant Jordi", ca: "Campanya de Sant Jordi", en: "Sant Jordi campaign" },
        description: {
          es: "Rosa digital con dedicatoria para Sant Jordi, en catalán y castellano. Más de 500 rosas enviadas y tendencia en Reddit Catalunya.",
          ca: "Rosa digital amb dedicatòria per Sant Jordi, en català i castellà. Més de 500 roses enviades i tendència a Reddit Catalunya.",
          en: "A digital rose with a dedication for Sant Jordi, in Catalan and Spanish. Over 500 roses sent and trending on Reddit Catalunya.",
        },
        tags: ["CA · ES", "+500"],
        links: [
          { label: caseLinkLabel, href: desanyCase("rosesstjordi") },
          { label: "rosesstjordi.com ↗", href: "https://rosesstjordi.com" },
        ],
        shot: {
          alt: {
            es: "Portada de rosesstjordi.com, con la rosa digital de Sant Jordi",
            ca: "Portada de rosesstjordi.com, amb la rosa digital de Sant Jordi",
            en: "Home page of rosesstjordi.com, with the Sant Jordi digital rose",
          },
        },
      },
      {
        id: "hidrotech",
        name: "Hidrotech Bordalló",
        sub: { es: "Redes sociales", ca: "Xarxes socials", en: "Social media" },
        description: {
          es: "Redes sociales para una empresa de maquinaria de limpieza industrial: reels de demostración, LinkedIn, YouTube y emails a su base de clientes.",
          ca: "Xarxes socials per a una empresa de maquinària de neteja industrial: reels de demostració, LinkedIn, YouTube i correus a la seva base de clients.",
          en: "Social media for an industrial cleaning machinery company: demo reels, LinkedIn, YouTube and emails to its customer base.",
        },
        tags: ["REELS", "LINKEDIN", "YOUTUBE", "EMAIL"],
        links: [],
      },
    ] as Card[],
  },

  experience: {
    num: "03",
    label: { es: "Experiencia", ca: "Experiència", en: "Experience" } as Localized,
    heading: {
      es: "Lo que he construido fuera del estudio.",
      ca: "El que he construït fora de l'estudi.",
      en: "What I've built outside the studio.",
    } as Localized,
    description: {
      es: "Un puesto de programador web principal, una startup que cerramos y un encargo freelance propio.",
      ca: "Una feina de programador web principal, una startup que vam tancar i un encàrrec freelance propi.",
      en: "A lead web developer job, a startup we shut down and a freelance job of my own.",
    } as Localized,

    vmv: {
      client: "VMV Cosmetic Group",
      range: "2025-2026",
      role: { es: "Programador web principal", ca: "Programador web principal", en: "Lead web developer" } as Localized,
      heading: {
        es: "Stack completo a escala corporativa.",
        ca: "Stack complet a escala corporativa.",
        en: "Full stack at corporate scale.",
      } as Localized,
      intro: {
        es: "Fui el programador web principal de una empresa cosmética internacional. Llevaba su superficie web completa: dominios, plugins propios sobre WordPress y microservicios en Go, Java y Node.",
        ca: "Vaig ser el programador web principal d'una empresa cosmètica internacional. Portava tota la seva superfície web: dominis, plugins propis sobre WordPress i microserveis en Go, Java i Node.",
        en: "I was the lead web developer at an international cosmetics company. I looked after its whole web surface: domains, in-house WordPress plugins and microservices in Go, Java and Node.",
      } as Localized,
      stats: [
        {
          value: 32,
          label: { es: "dominios", ca: "dominis", en: "domains" },
          caption: { es: "21 con web activa", ca: "21 amb web activa", en: "21 with a live site" },
        },
        {
          value: 12,
          label: { es: "plugins internos", ca: "plugins interns", en: "internal plugins" },
          caption: { es: "y un store interno propio", ca: "i un store intern propi", en: "and an in-house plugin store" },
        },
        {
          value: 20,
          label: { es: "microservicios", ca: "microserveis", en: "microservices" },
          caption: { es: "Go · Java · Node", ca: "Go · Java · Node", en: "Go · Java · Node" },
        },
      ] as { value: number; label: Localized; caption: Localized }[],
      capabilitiesLabel: { es: "Lo que construí", ca: "El que vaig construir", en: "What I built" } as Localized,
      capabilities: [
        {
          title: { es: "WAF en Go con reputación de IPs.", ca: "WAF en Go amb reputació d'IPs.", en: "Go WAF with IP reputation." },
        },
        {
          title: { es: "Puente Java 21 a AS/400.", ca: "Pont Java 21 a AS/400.", en: "Java 21 bridge to AS/400." },
          description: {
            es: "Servicios Java 21 / Spring Boot 3 que exponen el ERP en AS/400 como REST, con un patrón anti-corrupción.",
            ca: "Serveis Java 21 / Spring Boot 3 que exposen l'ERP en AS/400 com a REST, amb un patró anticorrupció.",
            en: "Java 21 / Spring Boot 3 services that expose the AS/400 ERP as REST, behind an anti-corruption layer.",
          },
        },
        {
          title: { es: "Plataforma de magazine corporativo.", ca: "Plataforma de magazine corporatiu.", en: "Corporate magazine platform." },
          description: {
            es: "Edición colaborativa, versiones por número y previsualización en tiempo real.",
            ca: "Edició col·laborativa, versions per número i previsualització en temps real.",
            en: "Collaborative editing, per-issue versions and real-time preview.",
          },
          link: {
            label: { es: "demo pública ↗", ca: "demo pública ↗", en: "public demo ↗" },
            href: "https://magazine.salerm.com/s/7611600d-0ac8-4b56-b5a3-f54e1ed7522c",
          },
        },
        {
          title: { es: "Gateway de IA.", ca: "Gateway d'IA.", en: "AI gateway." },
          description: {
            es: "Un único punto de entrada a modelos de lenguaje, con API compatible con OpenAI.",
            ca: "Un únic punt d'entrada a models de llenguatge, amb API compatible amb OpenAI.",
            en: "A single entry point to language models, with an OpenAI-compatible API.",
          },
        },
        {
          title: {
            es: "Firma de documentos con biometría.",
            ca: "Signatura de documents amb biometria.",
            en: "Document signing with biometrics.",
          },
          description: {
            es: "Plataforma en Next.js, con trazabilidad del documento desde que se crea hasta que se archiva.",
            ca: "Plataforma en Next.js, amb traçabilitat del document des que es crea fins que s'arxiva.",
            en: "A Next.js platform that tracks each document from creation to archive.",
          },
        },
        {
          title: { es: "Motor asíncrono de PDF.", ca: "Motor asíncron de PDF.", en: "Async PDF engine." },
          description: {
            es: "Genera los PDF en segundo plano y muestra su estado en tiempo real.",
            ca: "Genera els PDF en segon pla i en mostra l'estat en temps real.",
            en: "Generates PDFs in the background and shows their status in real time.",
          },
        },
        {
          title: {
            es: "Avisos de WhatsApp Business.",
            ca: "Avisos de WhatsApp Business.",
            en: "WhatsApp Business notifications.",
          },
          description: {
            es: "Notificaciones para las delegaciones, en Go.",
            ca: "Notificacions per a les delegacions, en Go.",
            en: "Notifications for the regional offices, in Go.",
          },
        },
        {
          title: { es: "Copias de seguridad.", ca: "Còpies de seguretat.", en: "Backups." },
          description: {
            es: "Delegan el trabajo pesado en procesos hijo, fuera del límite de memoria de PHP.",
            ca: "Deleguen la feina pesada a processos fill, fora del límit de memòria de PHP.",
            en: "They hand the heavy work to child processes, outside PHP's memory limit.",
          },
        },
      ] as Capability[],
      ticker: [
        { es: "32 dominios", ca: "32 dominis", en: "32 domains" },
        { es: "WordPress", ca: "WordPress", en: "WordPress" },
        { es: "WAF en Go", ca: "WAF en Go", en: "Go WAF" },
        { es: "AS/400", ca: "AS/400", en: "AS/400" },
        { es: "Java 21", ca: "Java 21", en: "Java 21" },
        { es: "Spring Boot 3", ca: "Spring Boot 3", en: "Spring Boot 3" },
        { es: "Go", ca: "Go", en: "Go" },
        { es: "Node", ca: "Node", en: "Node" },
        { es: "Next.js", ca: "Next.js", en: "Next.js" },
        { es: "Docker", ca: "Docker", en: "Docker" },
        { es: "CI/CD", ca: "CI/CD", en: "CI/CD" },
        { es: "DNS", ca: "DNS", en: "DNS" },
        { es: "Correo corporativo", ca: "Correu corporatiu", en: "Corporate email" },
      ] as Localized[],
    },

    neibr: {
      title: "Neibr",
      sub: {
        es: "Cofundador · cerrada en 2026",
        ca: "Cofundador · tancada el 2026",
        en: "Co-founder · shut down in 2026",
      } as Localized,
      tagline: {
        es: "API B2B para operadores de paquetería.",
        ca: "API B2B per a operadors de paqueteria.",
        en: "B2B API for parcel carriers.",
      } as Localized,
      what: {
        es: "Cuando una entrega falla, el paquete se asigna a un vecino en un radio de 200 m en lugar de volver al origen.",
        ca: "Quan una entrega falla, el paquet s'assigna a un veí en un radi de 200 m en lloc de tornar a l'origen.",
        en: "When a delivery fails, the parcel goes to a neighbour within 200 m instead of going back to the depot.",
      } as Localized,
      role: {
        es: "Fui cofundador y el único desarrollador de backend. También monté el despliegue y la web, y participé en la parte comercial y en las redes de la empresa.",
        ca: "Vaig ser cofundador i l'únic desenvolupador de backend. També vaig muntar el desplegament i la web, i vaig participar en la part comercial i a les xarxes de l'empresa.",
        en: "I was a co-founder and the only backend developer. I also set up the deployment and the website, and took part in sales and the company's social media.",
      } as Localized,
      tech: {
        es: "Go (Fiber), PostgreSQL y Redis. La asignación filtra primero por bounding box en SQL y luego calcula la distancia exacta con Haversine. API keys multi-tenant, escrituras idempotentes, webhooks firmados con HMAC y un ledger de auditoría inmutable.",
        ca: "Go (Fiber), PostgreSQL i Redis. L'assignació filtra primer per bounding box en SQL i després calcula la distància exacta amb Haversine. API keys multi-tenant, escriptures idempotents, webhooks signats amb HMAC i un ledger d'auditoria immutable.",
        en: "Go (Fiber), PostgreSQL and Redis. Assignment prefilters by bounding box in SQL, then computes the exact distance with Haversine. Multi-tenant API keys, idempotent writes, HMAC-signed webhooks and an immutable audit ledger.",
      } as Localized,
      awardLabel: { es: "Premio", ca: "Premi", en: "Award" } as Localized,
      award: {
        es: "Uno de los proyectos ganadores de los Santander X Spain Awards 2026 (UVic).",
        ca: "Un dels projectes guanyadors dels Santander X Spain Awards 2026 (UVic).",
        en: "One of the winning projects of the Santander X Spain Awards 2026 (UVic).",
      } as Localized,
      closureLabel: { es: "Por qué se cerró", ca: "Per què es va tancar", en: "Why it closed" } as Localized,
      closure: {
        es: "Hablar con un gran operador nos mostró problemas del modelo que el código no iba a resolver, y lo cerramos antes de lanzar.",
        ca: "Parlar amb un gran operador ens va mostrar problemes del model que el codi no resoldria, i el vam tancar abans de llançar-lo.",
        en: "Talking to a large carrier showed us problems in the model that code wasn't going to fix, so we shut it down before launch.",
      } as Localized,
      tags: ["GO · FIBER", "POSTGRESQL", "REDIS", "HMAC"],
      links: [{ label: "neibr.es ↗", href: "https://neibr.es" }] as Link[],
      shotAlt: {
        es: "Portada de neibr.es, la web de Neibr",
        ca: "Portada de neibr.es, la web de Neibr",
        en: "Home page of neibr.es, the Neibr website",
      } as Localized,
      terminalLabel: {
        es: "Ejemplo de petición y respuesta de la API",
        ca: "Exemple de petició i resposta de l'API",
        en: "API request and response example",
      } as Localized,
      endpointTitle: {
        es: "Crear envío y asignar vecino",
        ca: "Crear enviament i assignar veí",
        en: "Create shipment and assign neighbour",
      } as Localized,
      stressLabel: { es: "Stress test", ca: "Stress test", en: "Stress test" } as Localized,
      stress: {
        requests: 2.9,
        requestsLabel: {
          es: "millones de peticiones en 50 minutos",
          ca: "milions de peticions en 50 minuts",
          en: "million requests in 50 minutes",
        } as Localized,
        facts: [
          { value: "~968", label: { es: "peticiones por segundo", ca: "peticions per segon", en: "requests per second" } },
          { value: "< 100 ms", label: { es: "p95", ca: "p95", en: "p95" } },
          { value: "0", label: { es: "errores 5xx", ca: "errors 5xx", en: "5xx errors" } },
        ] as { value: string; label: Localized }[],
      },
    },

    gok: {
      id: "gokthermal",
      name: "GOK Thermal",
      sub: { es: "Encargo freelance", ca: "Encàrrec freelance", en: "Freelance job" },
      description: {
        es: "Web de un instalador de climatización de Granollers, con galería de proyectos, reseñas y contacto directo por WhatsApp o llamada. La hice como encargo freelance propio, fuera de Digital DesAny.",
        ca: "Web d'un instal·lador de climatització de Granollers, amb galeria de projectes, ressenyes i contacte directe per WhatsApp o trucada. La vaig fer com a encàrrec freelance propi, fora de Digital DesAny.",
        en: "Website for an HVAC installer in Granollers, with a project gallery, reviews and direct contact by WhatsApp or phone. I built it as my own freelance job, outside Digital DesAny.",
      },
      tags: ["NEXT.JS", "FREELANCE"],
      links: [{ label: "gokthermal.com ↗", href: "https://gokthermal.com" }],
      shot: {
        alt: {
          es: "Portada de gokthermal.com, la web de GOK Thermal",
          ca: "Portada de gokthermal.com, la web de GOK Thermal",
          en: "Home page of gokthermal.com, the GOK Thermal website",
        },
      },
    } as Card,
  },

  timeline: {
    num: "04",
    label: { es: "Recorrido", ca: "Recorregut", en: "Path" } as Localized,
    heading: {
      es: "Quince años aprendiendo a sostener sistemas.",
      ca: "Quinze anys aprenent a sostenir sistemes.",
      en: "Fifteen years learning to hold systems up.",
    } as Localized,
    description: {
      es: "De cambiar el disco duro del portátil familiar a montar un estudio propio. Esta es la versión corta.",
      ca: "De canviar el disc dur del portàtil familiar a muntar un estudi propi. Aquesta és la versió curta.",
      en: "From swapping the family laptop's hard drive to starting my own studio. This is the short version.",
    } as Localized,
    kindLabels: {
      milestone: { es: "Hito", ca: "Fita", en: "Milestone" },
      education: { es: "Formación", ca: "Formació", en: "Education" },
      work: { es: "Trabajo", ca: "Feina", en: "Work" },
      project: { es: "Estudio", ca: "Estudi", en: "Studio" },
    } as Record<TimelineEntry["kind"], Localized>,
    entries: [
      {
        year: "2011",
        kind: "milestone",
        title: {
          es: "Cambio el disco duro del portátil familiar.",
          ca: "Canvio el disc dur del portàtil familiar.",
          en: "I swap the family laptop's hard drive.",
        },
        place: { es: "Granollers · con 11 años", ca: "Granollers · amb 11 anys", en: "Granollers · aged 11" },
        body: {
          es: "Se rompió el portátil de casa y, en vez de tirarlo, lo abrí, cambié el disco y descubrí que detrás de la pantalla había un sistema entero que se podía leer. Esa tarde empezó todo.",
          ca: "Es va trencar el portàtil de casa i, en lloc de llençar-lo, el vaig obrir, vaig canviar el disc i vaig descobrir que darrere de la pantalla hi havia un sistema sencer que es podia llegir. Aquella tarda va començar tot.",
          en: "The family laptop broke and, instead of throwing it out, I opened it, swapped the drive and found a whole readable system behind the screen. Everything started that afternoon.",
        },
      },
      {
        year: "2012",
        kind: "milestone",
        title: {
          es: "Instalo Mandriva para jugar a Wormux y Battle for Wesnoth.",
          ca: "Instal·lo Mandriva per jugar a Wormux i Battle for Wesnoth.",
          en: "I install Mandriva to play Wormux and Battle for Wesnoth.",
        },
        place: { es: "primer Linux", ca: "primer Linux", en: "first Linux" },
        body: {
          es: "El motor fue jugar. Instalé Mandriva en aquel portátil y me peleé con paquetes, repositorios y la consola. Aprendí más en una semana intentando abrir Wormux que en un año de clase.",
          ca: "El motor va ser jugar. Vaig instal·lar Mandriva en aquell portàtil i em vaig barallar amb paquets, repositoris i la consola. Vaig aprendre més en una setmana intentant obrir Wormux que en un any de classe.",
          en: "Gaming was the driver. I installed Mandriva on that laptop and fought with packages, repositories and the terminal. I learned more in a week trying to launch Wormux than in a year of school.",
        },
      },
      {
        year: "2014",
        kind: "milestone",
        title: {
          es: "Monto mi primer PC tras hacer de helpdesk freelance.",
          ca: "Munto el meu primer PC després de fer d'helpdesk freelance.",
          en: "I build my first PC after doing freelance helpdesk work.",
        },
        place: { es: "vecinos · familia · amigos", ca: "veïns · família · amics", en: "neighbours · family · friends" },
        body: {
          es: "Empecé a arreglar ordenadores de gente cercana: pequeñas reparaciones, reinstalaciones y configuraciones. Con eso me pagué el primer PC.",
          ca: "Vaig començar a arreglar ordinadors de gent propera: petites reparacions, reinstal·lacions i configuracions. Amb això em vaig pagar el primer PC.",
          en: "I started fixing computers for people around me: small repairs, reinstalls and setups. That paid for my first PC.",
        },
      },
      {
        year: "2016",
        kind: "work",
        title: {
          es: "Empiezo a sustituir componentes: RAM, GPU, refrigeración.",
          ca: "Començo a substituir components: RAM, GPU, refrigeració.",
          en: "I start replacing components: RAM, GPU, cooling.",
        },
        place: { es: "pequeño negocio · particulares", ca: "petit negoci · particulars", en: "small business · individuals" },
        body: {
          es: "El servicio técnico crece. Además de reinstalar y configurar, cambio componentes físicos: RAM, tarjetas gráficas y sistemas de refrigeración.",
          ca: "El servei tècnic creix. A més de reinstal·lar i configurar, canvio components físics: RAM, targetes gràfiques i sistemes de refrigeració.",
          en: "The repair work grows. On top of reinstalls and setups, I replace hardware: RAM, graphics cards and cooling systems.",
        },
      },
      {
        year: "2019",
        kind: "work",
        title: {
          es: "Helpdesk presencial en un centro de vacunación.",
          ca: "Helpdesk presencial en un centre de vacunació.",
          en: "On-site helpdesk at a vaccination centre.",
        },
        place: { es: "primer empleo formal", ca: "primera feina formal", en: "first formal job" },
        body: {
          es: "Soporte técnico presencial: tickets, diagnóstico y escalado de incidencias. En los ratos libres de las guardias empiezo a aprender a programar y preparo las pruebas de acceso a un grado superior.",
          ca: "Suport tècnic presencial: tiquets, diagnòstic i escalat d'incidències. En les estones lliures de les guàrdies començo a aprendre a programar i preparo les proves d'accés a un grau superior.",
          en: "On-site tech support: tickets, diagnosis and escalation. In the quiet hours on shift I start teaching myself to code and prepare the entrance exams for a higher vocational course.",
        },
      },
      {
        year: "2022",
        kind: "education",
        title: {
          es: "Entro al Grado Superior DAW.",
          ca: "Entro al Grau Superior DAW.",
          en: "I start the DAW higher vocational course.",
        },
        place: { es: "Desarrollo de Aplicaciones Web", ca: "Desenvolupament d'Aplicacions Web", en: "Web Application Development" },
        body: {
          es: "Java (POO), MySQL, HTML, CSS, JavaScript, Angular, React, PHP y Laravel. De aprender solo en las guardias a aprender con estructura y compañeros.",
          ca: "Java (POO), MySQL, HTML, CSS, JavaScript, Angular, React, PHP i Laravel. D'aprendre sol a les guàrdies a aprendre amb estructura i companys.",
          en: "Java (OOP), MySQL, HTML, CSS, JavaScript, Angular, React, PHP and Laravel. From learning alone on shift to learning with structure and classmates.",
        },
      },
      {
        year: "2024",
        kind: "work",
        title: {
          es: "Integro WiPay con máquinas expendedoras en Automated Transactions.",
          ca: "Integro WiPay amb màquines expenedores a Automated Transactions.",
          en: "I integrate WiPay with vending machines at Automated Transactions.",
        },
        place: { es: "Automated Transactions", ca: "Automated Transactions", en: "Automated Transactions" },
        body: {
          es: "Integración del pago cashless WiPay con máquinas expendedoras por MDB. El trabajo concreto: traducir los payloads de pago a hexadecimal por bus serie a 9600 baudios.",
          ca: "Integració del pagament cashless WiPay amb màquines expenedores per MDB. La feina concreta: traduir els payloads de pagament a hexadecimal pel bus sèrie a 9600 bauds.",
          en: "Integrating WiPay cashless payments with vending machines over MDB. The actual work: translating payment payloads to hexadecimal over a serial bus at 9600 baud.",
        },
      },
      {
        year: "2025",
        kind: "work",
        title: {
          es: "Programador web principal en VMV Cosmetic Group.",
          ca: "Programador web principal a VMV Cosmetic Group.",
          en: "Lead web developer at VMV Cosmetic Group.",
        },
        place: { es: "Barcelona · 2025-2026", ca: "Barcelona · 2025-2026", en: "Barcelona · 2025-2026" },
        body: {
          es: "Entré como programador web principal. En pocos meses escribía microservicios en Go, integraba el AS/400 desde Java y montaba el primer WAF interno.",
          ca: "Hi vaig entrar com a programador web principal. En pocs mesos escrivia microserveis en Go, integrava l'AS/400 des de Java i muntava el primer WAF intern.",
          en: "I joined as lead web developer. Within months I was writing Go microservices, integrating the AS/400 from Java and building the first internal WAF.",
        },
      },
      {
        year: "2026",
        kind: "project",
        title: {
          es: "Fundo Digital DesAny con Oriol Tamborero.",
          ca: "Fundo Digital DesAny amb l'Oriol Tamborero.",
          en: "I co-found Digital DesAny with Oriol Tamborero.",
        },
        place: { es: "Granollers", ca: "Granollers", en: "Granollers" },
        body: {
          es: "Un estudio web para pymes de toda Cataluña: webs a medida, redes sociales, automatizaciones y software a medida.",
          ca: "Un estudi web per a pimes de tot Catalunya: webs a mida, xarxes socials, automatitzacions i programari a mida.",
          en: "A web studio for small and medium businesses across Catalonia: custom websites, social media, automations and custom software.",
        },
      },
    ] as TimelineEntry[],
  },

  education: {
    num: "05",
    label: { es: "Formación", ca: "Formació", en: "Education" } as Localized,
    heading: { es: "Origen.", ca: "Origen.", en: "Origins." } as Localized,
    description: {
      es: "Trabajos de DAW que marcaron el rumbo. Código público en GitHub, con sus aciertos y sus rastros de aprendizaje.",
      ca: "Treballs de DAW que van marcar el rumb. Codi públic a GitHub, amb els seus encerts i els seus rastres d'aprenentatge.",
      en: "DAW projects that set the direction. Public code on GitHub, with the good parts and the learning marks.",
    } as Localized,
    projects: [
      {
        id: "peer2stream",
        name: "Peer2Stream",
        sub: { es: "TFG de DAW · 10/10", ca: "TFG de DAW · 10/10", en: "DAW final project · 10/10" },
        description: {
          es: "Sirve para descubrir, ver y organizar películas y series, con los datos de TMDB. Es mi trabajo de fin de grado de DAW, hecho con Ismael Delgado. Nota: 10/10.",
          ca: "Serveix per descobrir, veure i organitzar pel·lícules i sèries, amb les dades de TMDB. És el meu treball de final de grau de DAW, fet amb l'Ismael Delgado. Nota: 10/10.",
          en: "An app to discover, watch and organise films and series, with data from TMDB. My DAW final project, built with Ismael Delgado. Grade: 10/10.",
        },
        tags: ["NEXT.JS 15", "REACT 19", "MONGODB", "TMDB"],
        links: [
          { label: "demo ↗", href: "https://peer2stream.alexasto.com/discover" },
          { label: "github ↗", href: "https://github.com/Alexasto12/peer2stream" },
        ],
        shot: {
          alt: {
            es: "Página Discover de Peer2Stream, con carteles de películas y series",
            ca: "Pàgina Discover de Peer2Stream, amb cartells de pel·lícules i sèries",
            en: "Peer2Stream Discover page, with film and series posters",
          },
        },
      },
      {
        id: "pokeapi",
        name: "Pokédex DS",
        sub: { es: "Ejercicio de DAW", ca: "Exercici de DAW", en: "DAW exercise" },
        description: {
          es: "Una Pokédex con forma de Nintendo DS Lite y datos en vivo de la PokeAPI. La carcasa de la DS está adaptada de un CodePen de Anton Essential (licencia MIT).",
          ca: "Una Pokédex amb forma de Nintendo DS Lite i dades en directe de la PokeAPI. La carcassa de la DS està adaptada d'un CodePen d'Anton Essential (llicència MIT).",
          en: "A Pokédex shaped like a Nintendo DS Lite, with live data from the PokeAPI. The DS shell is adapted from a CodePen by Anton Essential (MIT licence).",
        },
        tags: ["HTML · CSS · JS", "POKEAPI"],
        links: [
          { label: "demo ↗", href: "https://alexasto12.github.io/ProjectePokeAPI/" },
          { label: "github ↗", href: "https://github.com/Alexasto12/ProjectePokeAPI" },
        ],
        shot: {
          alt: {
            es: "La Pokédex DS en el navegador, con la carcasa de una Nintendo DS Lite",
            ca: "La Pokédex DS al navegador, amb la carcassa d'una Nintendo DS Lite",
            en: "The Pokédex DS in the browser, inside a Nintendo DS Lite shell",
          },
        },
      },
    ] as Card[],
    wordpress: {
      text: {
        es: "En WordPress.org tengo publicado el plugin Simply Bootstrap Carousel, con más de 10 instalaciones activas.",
        ca: "A WordPress.org tinc publicat el plugin Simply Bootstrap Carousel, amb més de 10 instal·lacions actives.",
        en: "On WordPress.org I publish the Simply Bootstrap Carousel plugin, with over 10 active installs.",
      } as Localized,
      link: { label: "profiles.wordpress.org/alexasto12 ↗", href: "https://profiles.wordpress.org/alexasto12/" } as Link,
    },
  },

  principles: {
    num: "06",
    label: { es: "Principios", ca: "Principis", en: "Principles" } as Localized,
    heading: {
      es: "Cuatro principios. Cero gimmicks.",
      ca: "Quatre principis. Zero gimmicks.",
      en: "Four principles. Zero gimmicks.",
    } as Localized,
    description: {
      es: "Lo que aplico en cada sistema que toco. Vale para una API B2B, una integración legacy o el portfolio que estás leyendo.",
      ca: "El que aplico en cada sistema que toco. Val per a una API B2B, una integració legacy o el portfolio que estàs llegint.",
      en: "What I apply to every system I touch. It works for a B2B API, a legacy integration or the portfolio you're reading.",
    } as Localized,
    items: [
      {
        index: "01",
        title: { es: "Diseño primero la API.", ca: "Dissenyo primer l'API.", en: "API design comes first." },
        body: {
          es: "Antes de escribir lógica de negocio, diseño el contrato y la arquitectura de la base de datos. La forma de los datos predice la forma del producto. OpenAPI versionado y esquema documentado antes de la primera función.",
          ca: "Abans d'escriure lògica de negoci, dissenyo el contracte i l'arquitectura de la base de dades. La forma de les dades prediu la forma del producte. OpenAPI versionat i esquema documentat abans de la primera funció.",
          en: "Before writing business logic, I design the contract and the database schema. The shape of the data predicts the shape of the product. Versioned OpenAPI and a documented schema before the first function.",
        },
      },
      {
        index: "02",
        title: { es: "Mido lo que se mueve.", ca: "Mesuro el que es mou.", en: "I measure what moves." },
        body: {
          es: "Logs estructurados y métricas desde el día uno. Analizo los logs antes de cambiar nada: sin datos, optimizar es adivinar. Cada servicio expone lo suficiente para saber si está vivo y cuánto tarda.",
          ca: "Logs estructurats i mètriques des del primer dia. Analitzo els logs abans de canviar res: sense dades, optimitzar és endevinar. Cada servei exposa el suficient per saber si és viu i quant tarda.",
          en: "Structured logs and metrics from day one. I read the logs before changing anything: without data, optimising is guessing. Every service exposes enough to tell whether it's alive and how long things take.",
        },
      },
      {
        index: "03",
        title: { es: "Construyo para fallos.", ca: "Construeixo per als errors.", en: "I build for failure." },
        body: {
          es: "Timeouts, reintentos y rate limits desde el inicio. El camino feliz es la minoría; diseño para que los fallos queden contenidos. Valido los datos externos antes de procesarlos, no después.",
          ca: "Timeouts, reintents i rate limits des de l'inici. El camí feliç és la minoria; dissenyo perquè els errors quedin continguts. Valido les dades externes abans de processar-les, no després.",
          en: "Timeouts, retries and rate limits from the start. The happy path is the minority; I design so failures stay contained. I validate external data before processing it, not after.",
        },
      },
      {
        index: "04",
        title: { es: "Documento como código.", ca: "Documento com a codi.", en: "Docs as code." },
        body: {
          es: "ADRs cortos para las decisiones que importan, READMEs que se puedan ejecutar y control de versiones para todo. La documentación vive en el mismo repo que el código, no en una wiki que nadie visita.",
          ca: "ADRs curts per a les decisions que importen, READMEs que es puguin executar i control de versions per a tot. La documentació viu al mateix repo que el codi, no en una wiki que ningú visita.",
          en: "Short ADRs for the decisions that matter, READMEs you can actually run and version control for everything. Docs live in the same repo as the code, not in a wiki nobody visits.",
        },
      },
    ] as { index: string; title: Localized; body: Localized }[],
  },

  contact: {
    num: "07",
    label: { es: "Contacto", ca: "Contacte", en: "Contact" } as Localized,
    heading: { es: "Construyamos algo", ca: "Construïm alguna cosa", en: "Let's build something" } as Localized,
    headingAccent: { es: "robusto.", ca: "robusta.", en: "robust." } as Localized,
    body: {
      es: "Si tienes un sistema que pide menos latencia, más claridad o simplemente menos sustos en producción, escribe.",
      ca: "Si tens un sistema que demana menys latència, més claredat o simplement menys ensurts en producció, escriu.",
      en: "If you've got a system asking for lower latency, more clarity or just fewer surprises in production, drop a line.",
    } as Localized,
    work: {
      label: { es: "Encargos", ca: "Encàrrecs", en: "Projects" } as Localized,
      note: {
        es: "Los proyectos los llevamos desde Digital DesAny.",
        ca: "Els projectes els portem des de Digital DesAny.",
        en: "Client projects go through Digital DesAny.",
      } as Localized,
      email: "info@digitaldesany.com",
      cta: { es: "Escribir a Digital DesAny", ca: "Escriure a Digital DesAny", en: "Email Digital DesAny" } as Localized,
      whatsapp: { label: "WhatsApp +34 624 905 650", href: "https://wa.me/34624905650" },
    },
    personal: {
      label: { es: "Personal", ca: "Personal", en: "Personal" } as Localized,
      note: {
        es: "Para todo lo demás, escríbeme a mí.",
        ca: "Per a tota la resta, escriu-me a mi.",
        en: "For anything else, write to me.",
      } as Localized,
      email: "contact@alexasto.com",
    },
    channelsLabel: { es: "Perfiles", ca: "Perfils", en: "Profiles" } as Localized,
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/ccalejandro/" },
      { label: "LinkedIn · Digital DesAny", href: "https://www.linkedin.com/company/digital-desany/" },
      { label: "GitHub", href: "https://github.com/Alexasto12" },
      { label: "WordPress.org", href: "https://profiles.wordpress.org/alexasto12/" },
    ] as Link[],
    footerNote: {
      es: "Sin plantillas. Hecho a mano en Granollers.",
      ca: "Sense plantilles. Fet a mà a Granollers.",
      en: "No templates. Hand-built in Granollers.",
    } as Localized,
    copyright: "© 2026 Alejandro Cabrera",
  },
};

export type Data = typeof DATA;
