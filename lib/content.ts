/* =========================================================
   Content of the home page (ES / CA / EN)
   Every visible string lives here or in lib/pages.ts, in the three
   languages. Facts come from docs/portfolio-refresh/DECISIONES.md; keep
   the three versions saying the same thing.
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
  description: Localized;
  links: Link[];
  shot?: Shot;
  /** Without a site to capture: a label and a few words in large type, in the frame's place. */
  poster?: { label: Localized; words: Localized<string[]> };
}

export interface Capability {
  title: Localized;
  description?: Localized;
  link?: Link;
}

export interface TimelineEntry {
  year: string;
  title: Localized;
  place: Localized;
  body: Localized;
}

export const DESANY = "https://www.digitaldesany.com";
/** digitaldesany.com has Spanish (/es) and Catalan (/ca); English readers get Spanish. */
export const desany = (es: string, ca: string): Localized => ({
  es: `${DESANY}/es${es}`,
  ca: `${DESANY}/ca${ca}`,
  en: `${DESANY}/es${es}`,
});
const desanyCase = (slug: string): Localized => desany(`/casos-exito/${slug}`, `/casos-exit/${slug}`);

/** Visible label of the link to a case study on digitaldesany.com (the case name goes before it, for screen readers and search). */
export const CASE_LINK: Localized = {
  es: "El caso en digitaldesany.com",
  ca: "El cas a digitaldesany.com",
  en: "The case study at digitaldesany.com",
};

export const PERSON_NAME = "Alejandro Cabrera";

export const CONTACT = {
  whatsappNumber: "34624905650",
  whatsappLabel: "+34 624 905 650",
  workEmail: "info@digitaldesany.com",
  personalEmail: "contact@alexasto.com",
  profiles: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ccalejandro/" },
    { label: "GitHub", href: "https://github.com/Alexasto12" },
    { label: "WordPress.org", href: "https://profiles.wordpress.org/alexasto12/" },
  ],
  desanyLinkedIn: "https://www.linkedin.com/company/digital-desany/",
};

export const DATA = {
  /** In-page index of the home, in section order. */
  nav: [
    { id: "trabajos", label: { es: "Trabajos", ca: "Treballs", en: "Work" } },
    { id: "servicios", label: { es: "Servicios", ca: "Serveis", en: "Services" } },
    { id: "experiencia", label: { es: "Experiencia", ca: "Experiència", en: "Experience" } },
    { id: "sobre-mi", label: { es: "Sobre mí", ca: "Sobre mi", en: "About" } },
    { id: "como-trabajo", label: { es: "Cómo trabajo", ca: "Com treballo", en: "How I work" } },
  ] as { id: string; label: Localized }[],

  header: {
    name: PERSON_NAME,
    cta: { es: "Hablemos", ca: "Parlem", en: "Let's talk" } as Localized,
    skipLink: { es: "Saltar al contenido", ca: "Vés al contingut", en: "Skip to content" } as Localized,
    navLabel: { es: "Secciones", ca: "Seccions", en: "Sections" } as Localized,
    menu: { es: "Índice", ca: "Índex", en: "Menu" } as Localized,
    langLabel: { es: "Idioma", ca: "Idioma", en: "Language" } as Localized,
  },

  hero: {
    firstName: "Alejandro",
    lastName: "Cabrera",
    role: {
      es: "Desarrollador web y backend en Granollers",
      ca: "Desenvolupador web i backend a Granollers",
      en: "Web and backend developer in Granollers",
    } as Localized,
    lead: {
      es: "Hago webs, backends y automatizaciones para pymes de toda Cataluña.",
      ca: "Faig webs, backends i automatitzacions per a pimes de tot Catalunya.",
      en: "I build websites, backends and automations for small and medium businesses across Catalonia.",
    } as Localized,
    sub: {
      es: "Casi todo pasa por Digital DesAny, el estudio que llevo con Oriol Tamborero en Granollers, cerca de Barcelona. Trabajamos en persona o en remoto.",
      ca: "Gairebé tot passa per Digital DesAny, l'estudi que porto amb l'Oriol Tamborero a Granollers, a prop de Barcelona. Treballem en persona o en remot.",
      en: "Most of it goes through Digital DesAny, the studio I run with Oriol Tamborero in Granollers, near Barcelona. We work in person or remotely.",
    } as Localized,
    ctaPrimary: { es: "Cuéntame tu proyecto", ca: "Explica'm el teu projecte", en: "Tell me about your project" } as Localized,
    ctaWork: { es: "Ver trabajos", ca: "Veure treballs", en: "See my work" } as Localized,
    proofLabel: { es: "Algunas cifras", ca: "Algunes xifres", en: "Some figures" } as Localized,
    /** Published figures, each pointing to where the page tells the story. */
    proof: [
      {
        value: { es: "+500", ca: "+500", en: "500+" },
        text: {
          es: "rosas digitales enviadas por Sant Jordi",
          ca: "roses digitals enviades per Sant Jordi",
          en: "digital roses sent for Sant Jordi",
        },
        href: "roses",
      },
      {
        value: { es: "32", ca: "32", en: "32" },
        text: {
          es: "dominios a mi cargo en VMV Cosmetic Group",
          ca: "dominis al meu càrrec a VMV Cosmetic Group",
          en: "domains I looked after at VMV Cosmetic Group",
        },
        href: "vmv",
      },
      {
        value: { es: "2,9 M", ca: "2,9 M", en: "2.9 M" },
        text: {
          es: "peticiones en 50 minutos en el stress test de Neibr, con 0 errores 5xx",
          ca: "peticions en 50 minuts a l'stress test de Neibr, amb 0 errors 5xx",
          en: "requests in 50 minutes in the Neibr stress test, with zero 5xx errors",
        },
        href: "neibr",
      },
      {
        value: { es: "Premio", ca: "Premi", en: "Award" },
        text: {
          es: "Neibr fue uno de los proyectos ganadores de los Santander X Spain Awards 2026 (UVic)",
          ca: "Neibr va ser un dels projectes guanyadors dels Santander X Spain Awards 2026 (UVic)",
          en: "Neibr was one of the winning projects of the Santander X Spain Awards 2026 (UVic)",
        },
        href: "neibr",
      },
    ] as { value: Localized; text: Localized; href: string }[],
  },

  work: {
    heading: { es: "Trabajos con Digital DesAny", ca: "Treballs amb Digital DesAny", en: "Work with Digital DesAny" } as Localized,
    description: {
      es: "Webs a medida, una campaña de Sant Jordi y redes sociales. Cada caso completo está en digitaldesany.com.",
      ca: "Webs a mida, una campanya de Sant Jordi i xarxes socials. Cada cas complet és a digitaldesany.com.",
      en: "Custom websites, a Sant Jordi campaign and social media. Each full case study is on digitaldesany.com.",
    } as Localized,
    allCases: {
      label: { es: "Todos los casos en digitaldesany.com", ca: "Tots els casos a digitaldesany.com", en: "All case studies at digitaldesany.com" },
      href: desany("/casos-exito", "/casos-exit"),
    } as Link,
    cases: [
      {
        id: "roses",
        name: "Roses de Sant Jordi",
        description: {
          es: "Más de 500 rosas enviadas y tendencia en Reddit Catalunya. Una rosa digital con dedicatoria para Sant Jordi, en catalán y castellano.",
          ca: "Més de 500 roses enviades i tendència a Reddit Catalunya. Una rosa digital amb dedicatòria per Sant Jordi, en català i castellà.",
          en: "Over 500 roses sent and trending on Reddit Catalunya. A digital rose with a dedication for Sant Jordi, in Catalan and Spanish.",
        },
        links: [
          { label: CASE_LINK, href: desanyCase("rosesstjordi") },
          { label: "rosesstjordi.com", href: "https://rosesstjordi.com" },
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
        id: "larasoak",
        name: "Lara's Oak",
        description: {
          es: "Portfolio de storyboard y concept art, con un CMS hecho sobre un sistema de bloques propio.",
          ca: "Portfolio de storyboard i concept art, amb un CMS fet sobre un sistema de blocs propi.",
          en: "Storyboard and concept art portfolio, with a CMS built on our own block system.",
        },
        links: [
          { label: CASE_LINK, href: desanyCase("lara-oak") },
          { label: "larasoak.art", href: "https://larasoak.art" },
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
        description: {
          es: "Portfolio trilingüe de ilustración infantil y juvenil, con diseño de marca y design system.",
          ca: "Portfolio trilingüe d'il·lustració infantil i juvenil, amb disseny de marca i design system.",
          en: "Trilingual portfolio of children's and young adult illustration, with brand design and a design system.",
        },
        links: [{ label: CASE_LINK, href: desanyCase("paula-krebel") }],
        shot: {
          alt: {
            es: "Portada de la web de Paula Krebel, portfolio de ilustración",
            ca: "Portada del web de Paula Krebel, portfolio d'il·lustració",
            en: "Home page of Paula Krebel's illustration portfolio",
          },
        },
      },
      {
        id: "hidrotech",
        name: "Hidrotech Bordalló",
        description: {
          es: "Redes sociales para una empresa de maquinaria de limpieza industrial: reels de demostración, LinkedIn, YouTube y emails a su base de clientes.",
          ca: "Xarxes socials per a una empresa de maquinària de neteja industrial: reels de demostració, LinkedIn, YouTube i correus a la seva base de clients.",
          en: "Social media for an industrial cleaning machinery company: demo reels, LinkedIn, YouTube and emails to its customer base.",
        },
        // digitaldesany.com has no case page for it (yet): the service it was part of.
        links: [
          {
            label: {
              es: "Gestión de redes en digitaldesany.com",
              ca: "Gestió de xarxes a digitaldesany.com",
              en: "Social media management at digitaldesany.com",
            },
            href: desany("/servicios/gestion-rrss", "/serveis/gestio-xarxes-socials"),
          },
        ],
        poster: {
          label: { es: "Redes sociales", ca: "Xarxes socials", en: "Social media" },
          words: {
            es: ["Reels", "LinkedIn", "YouTube", "Emails"],
            ca: ["Reels", "LinkedIn", "YouTube", "Correus"],
            en: ["Reels", "LinkedIn", "YouTube", "Emails"],
          },
        },
      },
    ] as Card[],
  },

  services: {
    heading: {
      es: "Webs, redes, automatizaciones y software a medida",
      ca: "Webs, xarxes, automatitzacions i programari a mida",
      en: "Websites, social media, automations and custom software",
    } as Localized,
    description: {
      es: "Trabajamos para pymes de toda Cataluña, en persona o en remoto.",
      ca: "Treballem per a pimes de tot Catalunya, en persona o en remot.",
      en: "We work for small and medium businesses across Catalonia, in person or remotely.",
    } as Localized,
    ownership: {
      es: "Cuando el proyecto está pagado, el código y el diseño son tuyos, con documentación técnica completa.",
      ca: "Quan el projecte està pagat, el codi i el disseny són teus, amb documentació tècnica completa.",
      en: "Once the project is paid for, the code and the design are yours, with full technical documentation.",
    } as Localized,
    examplesLabel: { es: "Ejemplos", ca: "Exemples", en: "Examples" } as Localized,
    items: [
      {
        title: { es: "Webs a medida", ca: "Webs a mida", en: "Custom websites" },
        text: {
          es: "En cuatro partes que se contratan juntas o por separado: diseño, desarrollo, digitalización y despliegue.",
          ca: "En quatre parts que es contracten juntes o per separat: disseny, desenvolupament, digitalització i desplegament.",
          en: "In four parts you can hire together or separately: design, development, digitalisation and deployment.",
        },
        examples: [
          { label: "Roses de Sant Jordi", id: "roses" },
          { label: "Lara's Oak", id: "larasoak" },
          { label: "Paula Krebel", id: "paulakrebel" },
        ],
        page: "web",
        more: desany("/servicios", "/serveis"),
      },
      {
        title: { es: "Gestión de redes sociales", ca: "Gestió de xarxes socials", en: "Social media management" },
        text: {
          es: "Para Hidrotech Bordalló, por ejemplo: reels de demostración, LinkedIn, YouTube y emails a su base de clientes.",
          ca: "Per a Hidrotech Bordalló, per exemple: reels de demostració, LinkedIn, YouTube i correus a la seva base de clients.",
          en: "For Hidrotech Bordalló, for example: demo reels, LinkedIn, YouTube and emails to its customer base.",
        },
        examples: [{ label: "Hidrotech Bordalló", id: "hidrotech" }],
        more: desany("/servicios/gestion-rrss", "/serveis/gestio-xarxes-socials"),
      },
      {
        title: { es: "Automatizaciones", ca: "Automatitzacions", en: "Automations" },
        text: {
          es: "Con y sin IA, según lo que pida el caso.",
          ca: "Amb IA i sense, segons el que demani el cas.",
          en: "With or without AI, depending on what the job needs.",
        },
        more: desany("/servicios/automatizaciones", "/serveis/automatitzacions"),
      },
      {
        title: { es: "Software a medida", ca: "Programari a mida", en: "Custom software" },
        text: {
          es: "APIs, integraciones y aplicaciones hechas para un caso concreto.",
          ca: "APIs, integracions i aplicacions fetes per a un cas concret.",
          en: "APIs, integrations and applications built for one specific case.",
        },
        page: "backend",
        more: desany("/servicios/software-a-medida", "/serveis/programari-a-mida"),
      },
    ] as {
      title: Localized;
      text: Localized;
      examples?: { label: string; id: string }[];
      page?: "web" | "backend";
      more: Localized;
    }[],
    moreLabel: { es: "En digitaldesany.com", ca: "A digitaldesany.com", en: "On digitaldesany.com" } as Localized,
    pageLabel: {
      web: { es: "Desarrollo web", ca: "Desenvolupament web", en: "Web development" },
      backend: { es: "Desarrollo backend", ca: "Desenvolupament backend", en: "Backend development" },
    } as Record<"web" | "backend", Localized>,
    cta: {
      line: {
        es: "Si tienes un proyecto en mente, escríbenos.",
        ca: "Si tens un projecte al cap, escriu-nos.",
        en: "If you have a project in mind, get in touch.",
      } as Localized,
      studio: {
        es: "Más sobre el estudio en digitaldesany.com",
        ca: "Més sobre l'estudi a digitaldesany.com",
        en: "More about the studio at digitaldesany.com",
      } as Localized,
    },
  },

  experience: {
    heading: { es: "Experiencia en backend y web", ca: "Experiència en backend i web", en: "Backend and web experience" } as Localized,
    description: {
      es: "Fui programador web principal en VMV Cosmetic Group y cofundé Neibr, una API B2B que cerramos antes de lanzar. Aparte, hice la web de GOK Thermal como encargo freelance.",
      ca: "Vaig ser programador web principal a VMV Cosmetic Group i vaig cofundar Neibr, una API B2B que vam tancar abans de llançar-la. A part, vaig fer el web de GOK Thermal com a encàrrec freelance.",
      en: "I was lead web developer at VMV Cosmetic Group and co-founded Neibr, a B2B API we shut down before launch. Separately, I built the GOK Thermal website as a freelance job.",
    } as Localized,

    vmv: {
      client: "VMV Cosmetic Group",
      range: "2025-2026",
      role: { es: "Programador web principal", ca: "Programador web principal", en: "Lead web developer" } as Localized,
      intro: {
        es: "Fui el programador web principal de una empresa cosmética internacional. Llevaba toda su parte web: dominios, plugins propios sobre WordPress y microservicios en Go, Java y Node.",
        ca: "Vaig ser el programador web principal d'una empresa cosmètica internacional. Portava tota la seva part web: dominis, plugins propis sobre WordPress i microserveis en Go, Java i Node.",
        en: "I was the lead web developer at an international cosmetics company. I looked after all of its web work: domains, in-house WordPress plugins and microservices in Go, Java and Node.",
      } as Localized,
      stats: [
        {
          value: "32",
          label: { es: "dominios, 21 de ellos con web activa", ca: "dominis, 21 d'ells amb web activa", en: "domains, 21 of them with a live site" },
        },
        {
          value: "12",
          label: { es: "plugins internos y un store interno propio", ca: "plugins interns i un store intern propi", en: "internal plugins and an in-house plugin store" },
        },
        {
          value: "20",
          label: { es: "microservicios en Go, Java y Node", ca: "microserveis en Go, Java i Node", en: "microservices in Go, Java and Node" },
        },
      ] as { value: string; label: Localized }[],
      capabilitiesLabel: { es: "Lo que hice allí", ca: "El que hi vaig fer", en: "What I built there" } as Localized,
      capabilities: [
        {
          title: { es: "WAF en Go", ca: "WAF en Go", en: "Go WAF" },
          description: {
            es: "Con reputación de IPs.",
            ca: "Amb reputació d'IPs.",
            en: "With IP reputation.",
          },
        },
        {
          title: { es: "Puente Java 21 al ERP", ca: "Pont Java 21 a l'ERP", en: "Java 21 bridge to the ERP" },
          description: {
            es: "Servicios Java 21 / Spring Boot 3 que exponen el ERP en AS/400 como REST, con un patrón anti-corrupción.",
            ca: "Serveis Java 21 / Spring Boot 3 que exposen l'ERP en AS/400 com a REST, amb un patró anticorrupció.",
            en: "Java 21 / Spring Boot 3 services that expose the AS/400 ERP as REST, behind an anti-corruption layer.",
          },
        },
        {
          title: { es: "Magazine corporativo", ca: "Magazine corporatiu", en: "Corporate magazine" },
          description: {
            es: "Edición colaborativa, versiones por número y previsualización en tiempo real.",
            ca: "Edició col·laborativa, versions per número i previsualització en temps real.",
            en: "Collaborative editing, per-issue versions and real-time preview.",
          },
          link: {
            label: { es: "Demo pública del magazine", ca: "Demo pública del magazine", en: "Public demo of the magazine" },
            href: "https://magazine.salerm.com/s/7611600d-0ac8-4b56-b5a3-f54e1ed7522c",
          },
        },
        {
          title: { es: "Gateway de IA", ca: "Gateway d'IA", en: "AI gateway" },
          description: {
            es: "Un único punto de entrada a modelos de lenguaje, con API compatible con OpenAI.",
            ca: "Un únic punt d'entrada a models de llenguatge, amb API compatible amb OpenAI.",
            en: "A single entry point to language models, with an OpenAI-compatible API.",
          },
        },
        {
          title: { es: "Firma de documentos con biometría", ca: "Signatura de documents amb biometria", en: "Document signing with biometrics" },
          description: {
            es: "Plataforma en Next.js, con trazabilidad del documento desde que se crea hasta que se archiva.",
            ca: "Plataforma en Next.js, amb traçabilitat del document des que es crea fins que s'arxiva.",
            en: "A Next.js platform that tracks each document from creation to archive.",
          },
        },
        {
          title: { es: "Motor asíncrono de PDF", ca: "Motor asíncron de PDF", en: "Async PDF engine" },
          description: {
            es: "Genera los PDF en segundo plano y muestra su estado en tiempo real.",
            ca: "Genera els PDF en segon pla i en mostra l'estat en temps real.",
            en: "Generates PDFs in the background and shows their status in real time.",
          },
        },
        {
          title: { es: "Avisos de WhatsApp Business", ca: "Avisos de WhatsApp Business", en: "WhatsApp Business notifications" },
          description: {
            es: "Notificaciones para las delegaciones, en Go.",
            ca: "Notificacions per a les delegacions, en Go.",
            en: "Notifications for the regional offices, in Go.",
          },
        },
        {
          title: { es: "Copias de seguridad", ca: "Còpies de seguretat", en: "Backups" },
          description: {
            es: "Delegan el trabajo pesado en procesos hijo, fuera del límite de memoria de PHP.",
            ca: "Deleguen la feina pesada a processos fill, fora del límit de memòria de PHP.",
            en: "They hand the heavy work to child processes, outside PHP's memory limit.",
          },
        },
      ] as Capability[],
      more: { es: "Todo lo que llevaba en VMV", ca: "Tot el que portava a VMV", en: "Everything I looked after at VMV" } as Localized,
    },

    neibr: {
      title: "Neibr",
      sub: {
        es: "Cofundador, cerrada en 2026",
        ca: "Cofundador, tancada el 2026",
        en: "Co-founder, shut down in 2026",
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
      stack: {
        es: "Go (Fiber), PostgreSQL y Redis.",
        ca: "Go (Fiber), PostgreSQL i Redis.",
        en: "Go (Fiber), PostgreSQL and Redis.",
      } as Localized,
      assignment: {
        es: "La asignación filtra primero por bounding box en SQL y luego calcula la distancia exacta con Haversine.",
        ca: "L'assignació filtra primer per bounding box en SQL i després calcula la distància exacta amb Haversine.",
        en: "Assignment prefilters by bounding box in SQL, then computes the exact distance with Haversine.",
      } as Localized,
      security: {
        es: "API keys multi-tenant, escrituras idempotentes, webhooks firmados con HMAC y un ledger de auditoría inmutable.",
        ca: "API keys multi-tenant, escriptures idempotents, webhooks signats amb HMAC i un ledger d'auditoria immutable.",
        en: "Multi-tenant API keys, idempotent writes, HMAC-signed webhooks and an immutable audit ledger.",
      } as Localized,
      award: {
        es: "Fue uno de los proyectos ganadores de los Santander X Spain Awards 2026 (UVic).",
        ca: "Va ser un dels projectes guanyadors dels Santander X Spain Awards 2026 (UVic).",
        en: "It was one of the winning projects of the Santander X Spain Awards 2026 (UVic).",
      } as Localized,
      closureLabel: { es: "Por qué cerramos Neibr", ca: "Per què vam tancar Neibr", en: "Why we shut it down" } as Localized,
      closure: {
        es: "Hablar con un gran operador nos mostró problemas del modelo que el código no iba a resolver, y lo cerramos antes de lanzar.",
        ca: "Parlar amb un gran operador ens va mostrar problemes del model que el codi no resoldria, i el vam tancar abans de llançar-lo.",
        en: "Talking to a large carrier showed us problems in the model that code wasn't going to fix, so we shut it down before launch.",
      } as Localized,
      diagram: {
        title: {
          es: "Cómo se asigna un vecino. Puntos de ejemplo.",
          ca: "Com s'assigna un veí. Punts d'exemple.",
          en: "How a neighbour gets assigned. Sample points.",
        } as Localized,
        steps: [
          {
            es: "Una entrega falla en este punto.",
            ca: "Una entrega falla en aquest punt.",
            en: "A delivery fails at this point.",
          },
          {
            es: "Un prefiltro en SQL se queda con los vecinos de dentro de un cuadrado (bounding box).",
            ca: "Un prefiltre en SQL es queda amb els veïns de dins d'un quadrat (bounding box).",
            en: "An SQL prefilter keeps the neighbours inside a square (bounding box).",
          },
          {
            es: "El círculo de 200 m deja fuera a los que quedan lejos.",
            ca: "El cercle de 200 m deixa fora els que queden lluny.",
            en: "The 200 m circle leaves out the ones too far away.",
          },
          {
            es: "Se resalta el más cercano, con su distancia exacta calculada con Haversine.",
            ca: "Es ressalta el més proper, amb la distància exacta calculada amb Haversine.",
            en: "The nearest one is highlighted, with its exact distance worked out with Haversine.",
          },
        ] as Localized[],
      },
      site: { label: "neibr.es", href: "https://neibr.es" } as Link,
      /** digitaldesany.com tells the website side (design, development and deployment). */
      caseLink: { label: CASE_LINK, href: desanyCase("neibr") } as Link,
      shotAlt: {
        es: "Portada de neibr.es, la web de Neibr",
        ca: "Portada de neibr.es, la web de Neibr",
        en: "Home page of neibr.es, the Neibr website",
      } as Localized,
      more: { es: "Cómo hice el backend de Neibr", ca: "Com vaig fer el backend de Neibr", en: "How I built the Neibr backend" } as Localized,
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
      stressLabel: { es: "stress test de la API", ca: "stress test de l'API", en: "API stress test" } as Localized,
      stress: [
        {
          value: { es: "2,9 M", ca: "2,9 M", en: "2.9 M" },
          label: { es: "peticiones en 50 minutos", ca: "peticions en 50 minuts", en: "requests in 50 minutes" },
          main: true,
        },
        { value: { es: "~968", ca: "~968", en: "~968" }, label: { es: "peticiones por segundo", ca: "peticions per segon", en: "requests per second" } },
        { value: { es: "< 100 ms", ca: "< 100 ms", en: "< 100 ms" }, label: { es: "p95", ca: "p95", en: "p95" } },
        { value: { es: "0", ca: "0", en: "0" }, label: { es: "errores 5xx", ca: "errors 5xx", en: "5xx errors" } },
      ] as { value: Localized; label: Localized; main?: boolean }[],
      stressSentence: {
        es: "Unos 2,9 millones de peticiones en 50 minutos: unas 968 por segundo, con el p95 por debajo de 100 ms y ningún error 5xx.",
        ca: "Uns 2,9 milions de peticions en 50 minuts: unes 968 per segon, amb el p95 per sota de 100 ms i cap error 5xx.",
        en: "About 2.9 million requests in 50 minutes: some 968 per second, with p95 under 100 ms and no 5xx errors.",
      } as Localized,
    },

    gok: {
      id: "gokthermal",
      name: "GOK Thermal",
      description: {
        es: "Web de un instalador de climatización de Granollers, con galería de proyectos, reseñas y contacto directo por WhatsApp o llamada. La hice como encargo freelance propio, fuera de Digital DesAny.",
        ca: "Web d'un instal·lador de climatització de Granollers, amb galeria de projectes, ressenyes i contacte directe per WhatsApp o trucada. La vaig fer com a encàrrec freelance propi, fora de Digital DesAny.",
        en: "Website for an HVAC installer in Granollers, with a project gallery, reviews and direct contact by WhatsApp or phone. I built it as my own freelance job, outside Digital DesAny.",
      },
      links: [{ label: "gokthermal.com", href: "https://gokthermal.com" }],
      shot: {
        alt: {
          es: "Portada de gokthermal.com, la web de GOK Thermal",
          ca: "Portada de gokthermal.com, la web de GOK Thermal",
          en: "Home page of gokthermal.com, the GOK Thermal website",
        },
      },
    } as Card,
  },

  about: {
    heading: {
      es: "Empecé abriendo el portátil de casa con 11 años",
      ca: "Vaig començar obrint el portàtil de casa amb 11 anys",
      en: "I started by opening up the family laptop at 11",
    } as Localized,
    description: {
      es: "Después vinieron las reparaciones, el soporte técnico, el grado de DAW, VMV Cosmetic Group y Digital DesAny.",
      ca: "Després van venir les reparacions, el suport tècnic, el grau de DAW, VMV Cosmetic Group i Digital DesAny.",
      en: "Then came repairs, tech support, the DAW web development course, VMV Cosmetic Group and Digital DesAny.",
    } as Localized,
    stack: {
      es: "Hoy trabajo con Go y Fiber, Java 21 y Spring Boot 3, Next.js, React y TypeScript, WordPress y PHP, PostgreSQL, Redis y Docker.",
      ca: "Avui treballo amb Go i Fiber, Java 21 i Spring Boot 3, Next.js, React i TypeScript, WordPress i PHP, PostgreSQL, Redis i Docker.",
      en: "Today I work with Go and Fiber, Java 21 and Spring Boot 3, Next.js, React and TypeScript, WordPress and PHP, PostgreSQL, Redis and Docker.",
    } as Localized,
    /** The path in three stages; each one takes the entries whose years fall in its range. */
    stages: [
      { name: { es: "Hardware", ca: "Hardware", en: "Hardware" }, from: 2011, to: 2016 },
      { name: { es: "Soporte y formación", ca: "Suport i formació", en: "Support and study" }, from: 2019, to: 2022 },
      { name: { es: "Desarrollo", ca: "Desenvolupament", en: "Development" }, from: 2024, to: 2026 },
    ] as { name: Localized; from: number; to: number }[],
    entries: [
      {
        year: "2011",
        title: {
          es: "Cambio el disco duro del portátil familiar.",
          ca: "Canvio el disc dur del portàtil familiar.",
          en: "I swap the family laptop's hard drive.",
        },
        place: { es: "Granollers, con 11 años", ca: "Granollers, amb 11 anys", en: "Granollers, aged 11" },
        body: {
          es: "Se rompió el portátil de casa y, en vez de tirarlo, lo abrí, cambié el disco y descubrí que detrás de la pantalla había un sistema entero que se podía leer.",
          ca: "Es va trencar el portàtil de casa i, en lloc de llençar-lo, el vaig obrir, vaig canviar el disc i vaig descobrir que darrere de la pantalla hi havia un sistema sencer que es podia llegir.",
          en: "The family laptop broke and, instead of throwing it out, I opened it, swapped the drive and found a whole readable system behind the screen.",
        },
      },
      {
        year: "2012",
        title: {
          es: "Instalo Mandriva para jugar a Wormux y Battle for Wesnoth.",
          ca: "Instal·lo Mandriva per jugar a Wormux i Battle for Wesnoth.",
          en: "I install Mandriva to play Wormux and Battle for Wesnoth.",
        },
        place: { es: "Primer Linux", ca: "Primer Linux", en: "First Linux" },
        body: {
          es: "El motor fue jugar. Instalé Mandriva en aquel portátil y me peleé con paquetes, repositorios y la consola.",
          ca: "El motor va ser jugar. Vaig instal·lar Mandriva en aquell portàtil i em vaig barallar amb paquets, repositoris i la consola.",
          en: "Gaming was the driver. I installed Mandriva on that laptop and fought with packages, repositories and the terminal.",
        },
      },
      {
        year: "2014",
        title: {
          es: "Monto mi primer PC tras hacer de helpdesk freelance.",
          ca: "Munto el meu primer PC després de fer d'helpdesk freelance.",
          en: "I build my first PC after doing freelance helpdesk work.",
        },
        place: { es: "Para vecinos, familia y amigos", ca: "Per a veïns, família i amics", en: "For neighbours, family and friends" },
        body: {
          es: "Empecé a arreglar ordenadores de gente cercana: pequeñas reparaciones, reinstalaciones y configuraciones. Con eso me pagué el primer PC.",
          ca: "Vaig començar a arreglar ordinadors de gent propera: petites reparacions, reinstal·lacions i configuracions. Amb això em vaig pagar el primer PC.",
          en: "I started fixing computers for people around me: small repairs, reinstalls and setups. That paid for my first PC.",
        },
      },
      {
        year: "2016",
        title: {
          es: "Empiezo a sustituir componentes: RAM, GPU, refrigeración.",
          ca: "Començo a substituir components: RAM, GPU, refrigeració.",
          en: "I start replacing components: RAM, GPU, cooling.",
        },
        place: { es: "Pequeño negocio y particulares", ca: "Petit negoci i particulars", en: "Small business and individuals" },
        body: {
          es: "El servicio técnico crece. Además de reinstalar y configurar, cambio componentes físicos: RAM, tarjetas gráficas y sistemas de refrigeración.",
          ca: "El servei tècnic creix. A més de reinstal·lar i configurar, canvio components físics: RAM, targetes gràfiques i sistemes de refrigeració.",
          en: "The repair work grows. On top of reinstalls and setups, I replace hardware: RAM, graphics cards and cooling systems.",
        },
      },
      {
        year: "2019",
        title: {
          es: "Helpdesk presencial en un centro de vacunación.",
          ca: "Helpdesk presencial en un centre de vacunació.",
          en: "On-site helpdesk at a vaccination centre.",
        },
        place: { es: "Primer empleo formal", ca: "Primera feina formal", en: "First formal job" },
        body: {
          es: "Soporte técnico presencial: tickets, diagnóstico y escalado de incidencias. En los ratos libres de las guardias empiezo a aprender a programar y preparo las pruebas de acceso a un grado superior.",
          ca: "Suport tècnic presencial: tiquets, diagnòstic i escalat d'incidències. En les estones lliures de les guàrdies començo a aprendre a programar i preparo les proves d'accés a un grau superior.",
          en: "On-site tech support: tickets, diagnosis and escalation. In the quiet hours on shift I start teaching myself to code and prepare the entrance exams for a higher vocational course.",
        },
      },
      {
        year: "2022",
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
        title: {
          es: "Colaboro en la integración de WiPay con máquinas expendedoras en Automated Transactions.",
          ca: "Col·laboro en la integració de WiPay amb màquines expenedores a Automated Transactions.",
          en: "I help integrate WiPay with vending machines at Automated Transactions.",
        },
        place: {
          es: "Pagos por bus serie a 9600 baudios",
          ca: "Pagaments per bus sèrie a 9600 bauds",
          en: "Payments over a serial bus at 9600 baud",
        },
        body: {
          es: "Integración del pago cashless WiPay con máquinas expendedoras por MDB. El trabajo concreto: traducir los payloads de pago a hexadecimal por bus serie a 9600 baudios.",
          ca: "Integració del pagament cashless WiPay amb màquines expenedores per MDB. La feina concreta: traduir els payloads de pagament a hexadecimal pel bus sèrie a 9600 bauds.",
          en: "Integrating WiPay cashless payments with vending machines over MDB. The actual work: translating payment payloads to hexadecimal over a serial bus at 9600 baud.",
        },
      },
      {
        year: "2025",
        title: {
          es: "Programador web principal en VMV Cosmetic Group.",
          ca: "Programador web principal a VMV Cosmetic Group.",
          en: "Lead web developer at VMV Cosmetic Group.",
        },
        place: { es: "Barcelona, 2025-2026", ca: "Barcelona, 2025-2026", en: "Barcelona, 2025-2026" },
        body: {
          es: "Entré como programador web principal. En pocos meses escribía microservicios en Go, integraba el AS/400 desde Java y montaba el primer WAF interno.",
          ca: "Hi vaig entrar com a programador web principal. En pocs mesos escrivia microserveis en Go, integrava l'AS/400 des de Java i muntava el primer WAF intern.",
          en: "I joined as lead web developer. Within months I was writing Go microservices, integrating the AS/400 from Java and building the first internal WAF.",
        },
      },
      {
        year: "2026",
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
    educationLabel: { es: "Formación y código abierto", ca: "Formació i codi obert", en: "Education and open source" } as Localized,
    /** public/photos/, built by scripts/portrait.mjs (ink on paper). */
    portrait: {
      src: "/photos/alejandro-cabrera.jpg",
      width: 1200,
      height: 1500,
      alt: { es: "Retrato de Alejandro Cabrera", ca: "Retrat de l'Alejandro Cabrera", en: "Portrait of Alejandro Cabrera" } as Localized,
    },
    peer2stream: {
      id: "peer2stream",
      name: "Peer2Stream",
      description: {
        es: "Mi trabajo de fin de grado de DAW, con nota 10/10, hecho con Ismael Delgado. Sirve para descubrir, ver y organizar películas y series con los datos de TMDB. Next.js 15, React 19 y MongoDB.",
        ca: "El meu treball de final de grau de DAW, amb nota 10/10, fet amb l'Ismael Delgado. Serveix per descobrir, veure i organitzar pel·lícules i sèries amb les dades de TMDB. Next.js 15, React 19 i MongoDB.",
        en: "My DAW final project, graded 10/10, built with Ismael Delgado. It helps you discover, watch and organise films and series with TMDB data. Next.js 15, React 19 and MongoDB.",
      },
      links: [
        { label: { es: "Demo de Peer2Stream", ca: "Demo de Peer2Stream", en: "Peer2Stream demo" }, href: "https://peer2stream.alexasto.com/discover" },
        { label: { es: "Código de Peer2Stream en GitHub", ca: "Codi de Peer2Stream a GitHub", en: "Peer2Stream code on GitHub" }, href: "https://github.com/Alexasto12/peer2stream" },
      ],
      shot: {
        alt: {
          es: "Página Discover de Peer2Stream, con carteles de películas y series",
          ca: "Pàgina Discover de Peer2Stream, amb cartells de pel·lícules i sèries",
          en: "Peer2Stream Discover page, with film and series posters",
        },
      },
    } as Card,
    pokedex: {
      id: "pokeapi",
      name: "Pokédex DS",
      description: {
        es: "Un ejercicio de DAW: una Pokédex con forma de Nintendo DS Lite y datos en vivo de la PokeAPI. La carcasa de la DS está adaptada de un CodePen de Anton Essential (licencia MIT).",
        ca: "Un exercici de DAW: una Pokédex amb forma de Nintendo DS Lite i dades en directe de la PokeAPI. La carcassa de la DS està adaptada d'un CodePen d'Anton Essential (llicència MIT).",
        en: "A DAW exercise: a Pokédex shaped like a Nintendo DS Lite, with live data from the PokeAPI. The DS shell is adapted from a CodePen by Anton Essential (MIT licence).",
      },
      links: [
        { label: { es: "Demo de la Pokédex", ca: "Demo de la Pokédex", en: "Pokédex demo" }, href: "https://alexasto12.github.io/ProjectePokeAPI/" },
        { label: { es: "Código de la Pokédex en GitHub", ca: "Codi de la Pokédex a GitHub", en: "Pokédex code on GitHub" }, href: "https://github.com/Alexasto12/ProjectePokeAPI" },
      ],
    } as Card,
    wordpress: {
      text: {
        es: "En WordPress.org tengo publicado el plugin Simply Bootstrap Carousel, con más de 10 instalaciones activas.",
        ca: "A WordPress.org tinc publicat el plugin Simply Bootstrap Carousel, amb més de 10 instal·lacions actives.",
        en: "On WordPress.org I publish the Simply Bootstrap Carousel plugin, with over 10 active installs.",
      } as Localized,
      link: {
        label: { es: "Mi perfil en WordPress.org", ca: "El meu perfil a WordPress.org", en: "My WordPress.org profile" },
        href: "https://profiles.wordpress.org/alexasto12/",
      } as Link,
    },
    more: { es: "Mi recorrido completo", ca: "El meu recorregut complet", en: "My full story" } as Localized,
  },

  process: {
    heading: { es: "Cómo trabajo", ca: "Com treballo", en: "How I work" } as Localized,
    items: [
      {
        title: { es: "Primero, la API y los datos", ca: "Primer, l'API i les dades", en: "The API and the data first" },
        body: {
          es: "Antes de escribir lógica de negocio diseño el contrato de la API y el esquema de la base de datos, con OpenAPI versionado y el esquema documentado.",
          ca: "Abans d'escriure lògica de negoci dissenyo el contracte de l'API i l'esquema de la base de dades, amb OpenAPI versionat i l'esquema documentat.",
          en: "Before writing business logic I design the API contract and the database schema, with versioned OpenAPI and a documented schema.",
        },
      },
      {
        title: { es: "Mido antes de cambiar", ca: "Mesuro abans de canviar", en: "I measure before changing things" },
        body: {
          es: "Logs estructurados y métricas desde el primer día, y leo los logs antes de tocar nada. En el stress test de Neibr, el p95 quedó por debajo de 100 ms a unas 968 peticiones por segundo.",
          ca: "Logs estructurats i mètriques des del primer dia, i llegeixo els logs abans de tocar res. A l'stress test de Neibr, el p95 va quedar per sota de 100 ms a unes 968 peticions per segon.",
          en: "Structured logs and metrics from day one, and I read the logs before touching anything. In the Neibr stress test, p95 stayed under 100 ms at about 968 requests per second.",
        },
      },
      {
        title: { es: "Cuento con los fallos", ca: "Compto amb els errors", en: "I plan for failure" },
        body: {
          es: "Timeouts, reintentos y rate limits desde el inicio, y los datos externos se validan antes de procesarlos. En Neibr, escrituras idempotentes y webhooks firmados con HMAC.",
          ca: "Timeouts, reintents i rate limits des de l'inici, i les dades externes es validen abans de processar-les. A Neibr, escriptures idempotents i webhooks signats amb HMAC.",
          en: "Timeouts, retries and rate limits from the start, and external data is validated before it is processed. In Neibr, idempotent writes and HMAC-signed webhooks.",
        },
      },
      {
        title: { es: "La documentación, junto al código", ca: "La documentació, al costat del codi", en: "Docs next to the code" },
        body: {
          es: "ADRs cortos para las decisiones que importan y READMEs que se pueden ejecutar. Los proyectos de Digital DesAny se entregan con documentación técnica completa.",
          ca: "ADRs curts per a les decisions que importen i READMEs que es poden executar. Els projectes de Digital DesAny s'entreguen amb documentació tècnica completa.",
          en: "Short ADRs for the decisions that matter and READMEs you can actually run. Digital DesAny projects are delivered with full technical documentation.",
        },
      },
    ] as { title: Localized; body: Localized }[],
  },

  contact: {
    heading: { es: "Cuéntame tu proyecto", ca: "Explica'm el teu projecte", en: "Tell me about your project" } as Localized,
    body: {
      es: "Escríbenos por WhatsApp o por correo y cuéntanos qué necesitas y para cuándo. Los proyectos los llevamos desde Digital DesAny.",
      ca: "Escriu-nos per WhatsApp o per correu i explica'ns què necessites i per a quan. Els projectes els portem des de Digital DesAny.",
      en: "Message us on WhatsApp or by email and tell us what you need and by when. Client projects go through Digital DesAny.",
    } as Localized,
    whatsapp: { es: "Escribir por WhatsApp", ca: "Escriure per WhatsApp", en: "Message on WhatsApp" } as Localized,
    email: { es: "Escribir por correo", ca: "Escriure per correu", en: "Send an email" } as Localized,
    /** Prefilled message and subject; {host} is the site's domain. */
    whatsappText: {
      es: "Hola, os escribo desde {host}. Me gustaría comentaros un proyecto.",
      ca: "Hola, us escric des de {host}. M'agradaria comentar-vos un projecte.",
      en: "Hi, I'm writing from {host}. I'd like to talk about a project.",
    } as Localized,
    emailSubject: {
      es: "Proyecto desde {host}",
      ca: "Projecte des de {host}",
      en: "Project via {host}",
    } as Localized,
    personalLabel: { es: "Para todo lo demás", ca: "Per a tota la resta", en: "For anything else" } as Localized,
    personalNote: {
      es: "Escríbeme a mí:",
      ca: "Escriu-me a mi:",
      en: "Write to me:",
    } as Localized,
    profilesLabel: { es: "Perfiles", ca: "Perfils", en: "Profiles" } as Localized,
    desanyLinkedIn: { es: "Digital DesAny en LinkedIn", ca: "Digital DesAny a LinkedIn", en: "Digital DesAny on LinkedIn" } as Localized,
  },

  footer: {
    copyright: "© 2026 Alejandro Cabrera",
    place: "Granollers",
    pagesLabel: { es: "Páginas", ca: "Pàgines", en: "Pages" } as Localized,
    studio: { label: "Digital DesAny", href: desany("", "") } as Link,
  },
};

export type Data = typeof DATA;
