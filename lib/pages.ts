/* =========================================================
   Pages other than the home (ES / CA / EN): their SEO texts and the
   copy that only they use. Facts come from DECISIONES.md; most of the
   body reuses DATA from lib/content.ts so each fact lives in one place.
   ========================================================= */
import type { Localized } from "./i18n-types";
import type { PageKey } from "./routes";
import { desany } from "./content";

/** Title (60 characters or fewer) and meta description (about 110 to 160) of every page. */
export const SEO: Record<PageKey, { title: Localized; description: Localized }> = {
  home: {
    title: {
      es: "Alejandro Cabrera, desarrollador web y backend en Granollers",
      ca: "Alejandro Cabrera, desenvolupador web i backend a Granollers",
      en: "Alejandro Cabrera, web and backend developer in Granollers",
    },
    description: {
      es: "Desarrollador web y backend en Granollers (Barcelona). Hago webs, APIs y automatizaciones con Go, Java y Next.js. Cofundador de Digital DesAny.",
      ca: "Desenvolupador web i backend a Granollers (Barcelona). Faig webs, APIs i automatitzacions amb Go, Java i Next.js. Cofundador de Digital DesAny.",
      en: "Web and backend developer in Granollers, near Barcelona. I build websites, APIs and automations in Go, Java and Next.js. Co-founder of Digital DesAny.",
    },
  },
  projects: {
    title: {
      es: "Proyectos web y backend · Alejandro Cabrera",
      ca: "Projectes web i backend · Alejandro Cabrera",
      en: "Web and backend projects · Alejandro Cabrera",
    },
    description: {
      es: "Webs, APIs y sistemas en los que he trabajado: casos de Digital DesAny, Neibr, VMV Cosmetic Group, GOK Thermal y mis proyectos de DAW.",
      ca: "Webs, APIs i sistemes en què he treballat: casos de Digital DesAny, Neibr, VMV Cosmetic Group, GOK Thermal i els meus projectes de DAW.",
      en: "Websites, APIs and systems I have worked on: Digital DesAny case studies, Neibr, VMV Cosmetic Group, GOK Thermal and my DAW projects.",
    },
  },
  neibr: {
    title: {
      es: "Neibr: backend de una API B2B en Go · Alejandro Cabrera",
      ca: "Neibr: backend d'una API B2B en Go · Alejandro Cabrera",
      en: "Neibr: a B2B API backend in Go · Alejandro Cabrera",
    },
    description: {
      es: "Cómo hice el backend de Neibr en Go, PostgreSQL y Redis: vecinos en un radio de 200 m, webhooks con HMAC y 2,9 millones de peticiones en 50 minutos.",
      ca: "Com vaig fer el backend de Neibr en Go, PostgreSQL i Redis: veïns en un radi de 200 m, webhooks amb HMAC i 2,9 milions de peticions en 50 minuts.",
      en: "How I built the Neibr backend in Go, PostgreSQL and Redis: neighbours within 200 m, HMAC-signed webhooks and 2.9 million requests in 50 minutes.",
    },
  },
  vmv: {
    title: {
      es: "Programador web principal en VMV Cosmetic Group",
      ca: "Programador web principal a VMV Cosmetic Group",
      en: "Lead web developer at VMV Cosmetic Group",
    },
    description: {
      es: "Fui el programador web principal de VMV Cosmetic Group: 32 dominios, 12 plugins internos y 20 microservicios en Go, Java y Node.",
      ca: "Vaig ser el programador web principal de VMV Cosmetic Group: 32 dominis, 12 plugins interns i 20 microserveis en Go, Java i Node.",
      en: "I was lead web developer at VMV Cosmetic Group: 32 domains, 12 internal plugins and 20 microservices in Go, Java and Node.",
    },
  },
  about: {
    title: {
      es: "Sobre mí · Alejandro Cabrera, desarrollador en Granollers",
      ca: "Sobre mi · Alejandro Cabrera, desenvolupador a Granollers",
      en: "About · Alejandro Cabrera, developer in Granollers",
    },
    description: {
      es: "De cambiar el disco duro del portátil familiar con 11 años a cofundar Digital DesAny. Mi recorrido, el Grado Superior DAW y cómo trabajo.",
      ca: "De canviar el disc dur del portàtil familiar amb 11 anys a cofundar Digital DesAny. El meu recorregut, el Grau Superior DAW i com treballo.",
      en: "From swapping the family laptop's hard drive at 11 to co-founding Digital DesAny. My path, the DAW vocational course and how I work.",
    },
  },
  backend: {
    title: {
      es: "Programador backend y APIs en Granollers (Barcelona)",
      ca: "Programador backend i APIs a Granollers (Barcelona)",
      en: "Backend and API developer in Granollers, near Barcelona",
    },
    description: {
      es: "APIs y microservicios en Go, Java y Node desde Granollers (Barcelona). Una API probada a unas 968 peticiones por segundo con el p95 bajo 100 ms.",
      ca: "APIs i microserveis en Go, Java i Node des de Granollers (Barcelona). Una API provada a unes 968 peticions per segon amb el p95 sota 100 ms.",
      en: "APIs and microservices in Go, Java and Node from Granollers, near Barcelona. One API held about 968 requests per second with p95 under 100 ms.",
    },
  },
  web: {
    title: {
      es: "Desarrollador Next.js y WordPress en Granollers",
      ca: "Desenvolupador Next.js i WordPress a Granollers",
      en: "Next.js and WordPress developer in Granollers",
    },
    description: {
      es: "Webs a medida en Next.js y WordPress desde Granollers. En VMV llevé 32 dominios y 12 plugins internos; con Digital DesAny hago webs para pymes.",
      ca: "Webs a mida en Next.js i WordPress des de Granollers. A VMV portava 32 dominis i 12 plugins interns; amb Digital DesAny faig webs per a pimes.",
      en: "Custom Next.js and WordPress websites from Granollers. At VMV I ran 32 domains and 12 internal plugins; with Digital DesAny I build sites for SMEs.",
    },
  },
};

/** Short name of each page: breadcrumbs, footer and links between pages. */
export const PAGE_NAME: Record<PageKey, Localized> = {
  home: { es: "Inicio", ca: "Inici", en: "Home" },
  projects: { es: "Proyectos", ca: "Projectes", en: "Projects" },
  neibr: { es: "Neibr", ca: "Neibr", en: "Neibr" },
  vmv: { es: "VMV Cosmetic Group", ca: "VMV Cosmetic Group", en: "VMV Cosmetic Group" },
  about: { es: "Sobre mí", ca: "Sobre mi", en: "About me" },
  backend: { es: "Desarrollo backend", ca: "Desenvolupament backend", en: "Backend development" },
  web: { es: "Desarrollo web", ca: "Desenvolupament web", en: "Web development" },
};

/** Where each page sits: its parent in the breadcrumb trail. */
export const PARENT: Partial<Record<PageKey, PageKey>> = {
  projects: "home",
  neibr: "projects",
  vmv: "projects",
  about: "home",
  backend: "home",
  web: "home",
};

export const UI = {
  breadcrumbLabel: { es: "Estás en", ca: "Ets a", en: "You are here" } as Localized,
  ctaHeading: { es: "Cuéntame tu proyecto", ca: "Explica'm el teu projecte", en: "Tell me about your project" } as Localized,
};

export const PAGES = {
  projects: {
    h1: { es: "Proyectos", ca: "Projectes", en: "Projects" } as Localized,
    lede: {
      es: "Webs, APIs y sistemas en los que he trabajado: los casos de Digital DesAny, Neibr, VMV Cosmetic Group, un encargo freelance y mis proyectos de DAW.",
      ca: "Webs, APIs i sistemes en què he treballat: els casos de Digital DesAny, Neibr, VMV Cosmetic Group, un encàrrec freelance i els meus projectes de DAW.",
      en: "Websites, APIs and systems I have worked on: the Digital DesAny case studies, Neibr, VMV Cosmetic Group, a freelance job and my DAW projects.",
    } as Localized,
    groups: {
      desany: { es: "Con Digital DesAny", ca: "Amb Digital DesAny", en: "With Digital DesAny" },
      backend: { es: "Backend y producto", ca: "Backend i producte", en: "Backend and product" },
      freelance: { es: "Encargo freelance", ca: "Encàrrec freelance", en: "Freelance job" },
      learning: { es: "Formación y código abierto", ca: "Formació i codi obert", en: "Education and open source" },
    } as Record<"desany" | "backend" | "freelance" | "learning", Localized>,
    wordpressName: "Simply Bootstrap Carousel",
  },

  neibr: {
    h1: {
      es: "Neibr: el backend de una API B2B para paquetería",
      ca: "Neibr: el backend d'una API B2B per a paqueteria",
      en: "Neibr: the backend of a B2B API for parcel carriers",
    } as Localized,
    sections: {
      role: { es: "Mi parte", ca: "La meva part", en: "My part" },
      assignment: { es: "Cómo se asignaba un vecino", ca: "Com s'assignava un veí", en: "How a neighbour was assigned" },
      security: { es: "Seguridad e integridad", ca: "Seguretat i integritat", en: "Security and integrity" },
    } as Record<"role" | "assignment" | "security", Localized>,
  },

  vmv: {
    h1: {
      es: "Programador web principal en VMV Cosmetic Group",
      ca: "Programador web principal a VMV Cosmetic Group",
      en: "Lead web developer at VMV Cosmetic Group",
    } as Localized,
    sections: {
      figures: { es: "Las cifras", ca: "Les xifres", en: "The figures" },
      built: { es: "Lo que hice", ca: "El que hi vaig fer", en: "What I built" },
      tech: { es: "Tecnologías y áreas", ca: "Tecnologies i àrees", en: "Technologies and areas" },
    } as Record<"figures" | "built" | "tech", Localized>,
    tech: {
      es: "WordPress, Go, Java 21, Spring Boot 3, AS/400, Node, Next.js, Docker, CI/CD, DNS y correo corporativo.",
      ca: "WordPress, Go, Java 21, Spring Boot 3, AS/400, Node, Next.js, Docker, CI/CD, DNS i correu corporatiu.",
      en: "WordPress, Go, Java 21, Spring Boot 3, AS/400, Node, Next.js, Docker, CI/CD, DNS and corporate email.",
    } as Localized,
  },

  about: {
    h1: { es: "Sobre mí", ca: "Sobre mi", en: "About me" } as Localized,
    lede: {
      es: "Soy Alejandro Cabrera, desarrollador web y backend en Granollers y cofundador de Digital DesAny, el estudio que llevo con Oriol Tamborero.",
      ca: "Sóc l'Alejandro Cabrera, desenvolupador web i backend a Granollers i cofundador de Digital DesAny, l'estudi que porto amb l'Oriol Tamborero.",
      en: "I'm Alejandro Cabrera, a web and backend developer in Granollers and co-founder of Digital DesAny, the studio I run with Oriol Tamborero.",
    } as Localized,
    sections: {
      path: { es: "Recorrido", ca: "Recorregut", en: "My path" },
      education: { es: "Formación y código abierto", ca: "Formació i codi obert", en: "Education and open source" },
      process: { es: "Cómo trabajo", ca: "Com treballo", en: "How I work" },
      profiles: { es: "Dónde encontrarme", ca: "On trobar-me", en: "Where to find me" },
    } as Record<"path" | "education" | "process" | "profiles", Localized>,
  },

  backend: {
    h1: {
      es: "Programador backend y APIs en Granollers (Barcelona)",
      ca: "Programador backend i APIs a Granollers (Barcelona)",
      en: "Backend and API developer in Granollers, near Barcelona",
    } as Localized,
    lede: {
      es: "Diseño y programo APIs, microservicios e integraciones en Go, Java y Node. Estos son los sistemas que puedo enseñar.",
      ca: "Dissenyo i programo APIs, microserveis i integracions en Go, Java i Node. Aquests són els sistemes que puc ensenyar.",
      en: "I design and build APIs, microservices and integrations in Go, Java and Node. These are the systems I can show.",
    } as Localized,
    sections: {
      neibr: { es: "Neibr: una API B2B en Go", ca: "Neibr: una API B2B en Go", en: "Neibr: a B2B API in Go" },
      vmv: {
        es: "VMV Cosmetic Group: 20 microservicios e integración con AS/400",
        ca: "VMV Cosmetic Group: 20 microserveis i integració amb AS/400",
        en: "VMV Cosmetic Group: 20 microservices and AS/400 integration",
      },
      hardware: { es: "Pagos en máquinas expendedoras", ca: "Pagaments en màquines expenedores", en: "Payments on vending machines" },
      process: { es: "Cómo trabajo", ca: "Com treballo", en: "How I work" },
      tech: { es: "Tecnologías", ca: "Tecnologies", en: "Technologies" },
    } as Record<"neibr" | "vmv" | "hardware" | "process" | "tech", Localized>,
    service: desany("/servicios/software-a-medida", "/serveis/programari-a-mida"),
    serviceLabel: {
      es: "Software a medida en digitaldesany.com",
      ca: "Programari a mida a digitaldesany.com",
      en: "Custom software at digitaldesany.com",
    } as Localized,
  },

  web: {
    h1: {
      es: "Webs a medida con Next.js y WordPress, desde Granollers",
      ca: "Webs a mida amb Next.js i WordPress, des de Granollers",
      en: "Custom websites in Next.js and WordPress, from Granollers",
    } as Localized,
    lede: {
      es: "Con Digital DesAny hago webs a medida para pymes de toda Cataluña, en cuatro partes que se contratan juntas o por separado: diseño, desarrollo, digitalización y despliegue.",
      ca: "Amb Digital DesAny faig webs a mida per a pimes de tot Catalunya, en quatre parts que es contracten juntes o per separat: disseny, desenvolupament, digitalització i desplegament.",
      en: "With Digital DesAny I build custom websites for small and medium businesses across Catalonia, in four parts you can hire together or separately: design, development, digitalisation and deployment.",
    } as Localized,
    sections: {
      cases: { es: "Webs publicadas", ca: "Webs publicades", en: "Published websites" },
      nextjs: { es: "Next.js", ca: "Next.js", en: "Next.js" },
      wordpress: { es: "WordPress", ca: "WordPress", en: "WordPress" },
      parts: { es: "Las cuatro partes", ca: "Les quatre parts", en: "The four parts" },
    } as Record<"cases" | "nextjs" | "wordpress" | "parts", Localized>,
    nextjs: {
      es: "Lara's Oak y GOK Thermal están hechas con Next.js, igual que la plataforma de firma de documentos de VMV Cosmetic Group y Peer2Stream, mi trabajo de fin de grado.",
      ca: "Lara's Oak i GOK Thermal estan fetes amb Next.js, igual que la plataforma de signatura de documents de VMV Cosmetic Group i Peer2Stream, el meu treball de final de grau.",
      en: "Lara's Oak and GOK Thermal are built with Next.js, as are the VMV Cosmetic Group document signing platform and Peer2Stream, my final project.",
    } as Localized,
    wordpress: {
      es: "En VMV Cosmetic Group llevaba 32 dominios, 21 de ellos con web activa, con 12 plugins internos de WordPress y un store interno propio. En WordPress.org tengo publicado el plugin Simply Bootstrap Carousel.",
      ca: "A VMV Cosmetic Group portava 32 dominis, 21 d'ells amb web activa, amb 12 plugins interns de WordPress i un store intern propi. A WordPress.org tinc publicat el plugin Simply Bootstrap Carousel.",
      en: "At VMV Cosmetic Group I looked after 32 domains, 21 of them with a live site, with 12 internal WordPress plugins and an in-house plugin store. On WordPress.org I publish the Simply Bootstrap Carousel plugin.",
    } as Localized,
    parts: [
      { label: { es: "Diseño", ca: "Disseny", en: "Design" }, href: desany("/servicios/diseno", "/serveis/disseny") },
      { label: { es: "Desarrollo", ca: "Desenvolupament", en: "Development" }, href: desany("/servicios/desarrollo", "/serveis/desenvolupament") },
      { label: { es: "Digitalización", ca: "Digitalització", en: "Digitalisation" }, href: desany("/servicios/digitalizacion", "/serveis/digitalitzacio") },
      { label: { es: "Despliegue", ca: "Desplegament", en: "Deployment" }, href: desany("/servicios/despliegue", "/serveis/desplegament") },
    ] as { label: Localized; href: Localized }[],
    partsNote: {
      es: "Cada parte tiene su página en digitaldesany.com.",
      ca: "Cada part té la seva pàgina a digitaldesany.com.",
      en: "Each part has its own page at digitaldesany.com.",
    } as Localized,
  },
};

/** The 404 page: one page for every locale, so it says everything three times. */
export const NOT_FOUND = {
  title: "404",
  lines: [
    { lang: "es", heading: "No encuentro esta página", text: "Puede que el enlace esté mal o que la página ya no exista.", link: "Ir al inicio", href: "/" },
    { lang: "ca", heading: "No trobo aquesta pàgina", text: "Potser l'enllaç està malament o la pàgina ja no existeix.", link: "Anar a l'inici", href: "/ca" },
    { lang: "en", heading: "I can't find this page", text: "The link may be wrong, or the page may no longer exist.", link: "Go to the home page", href: "/en" },
  ],
};
