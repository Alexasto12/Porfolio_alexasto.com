export type Tag = string;

export type ProjectLink = {
  label: string;
  href: string;
};

export type FreelanceProject = {
  id: string;
  name: string;
  domain: string;
  description: string;
  tags: Tag[];
  link: ProjectLink;
};

export type OwnProduct = {
  id: string;
  name: string;
  description: string;
  tags: Tag[];
  link?: ProjectLink;
};

export type VmvCapability = {
  title: string;
  description: string;
};

export type VmvStat = {
  value: number;
  label: string;
  caption: string;
};

export const telemetry = {
  systemId: "AC_SYSTEMS",
  name: "Alejandro Cabrera",
  role: "Systems Architect · BCN",
  status: "sistema activo",
  uptime: "99.98%",
} as const;

export const hero = {
  sectionLabel: "001 — PERFIL",
  sectionHint: "hover para reanimar ↻",
  firstName: "Alejandro",
  lastName: "Cabrera",
  intro:
    "Arquitecto de sistemas. Diseño y construyo microservicios de alto rendimiento, infraestructura de red corporativa y plataformas API-first. Busco que la elegancia estructural del backend se refleje en la del frontend.",
  stack: ["Go / Java · Node", "Next · Astro", "Docker · LiteLLM"],
} as const;

export const neibr = {
  sectionLabel: "PROYECTO BANDERA",
  domain: "neibr.es",
  title: "Neibr",
  description:
    "Infraestructura logística B2B API-First. Elimina retornos de paquetería mediante Double Blind Handover y garantía de Cero Retornos. Los operadores logísticos integran la API; los vecinos reciben paquetes y acumulan puntos canjeables.",
  stat: {
    value: 3_000_000,
    valueLabel: "requests",
    duration: "50 min",
    caption: "Stress test superado sin degradación.",
  },
  tags: [
    "GO BACKEND",
    "API-FIRST",
    "B2B + APP",
    "MULTI-IDIOMA (ES/CA/EN)",
  ] as Tag[],
  concepts: [
    "Double Blind Handover",
    "Garantía Cero Retornos",
    "Sistema de puntos vecinal",
  ],
  link: { label: "neibr.es", href: "https://neibr.es" } as ProjectLink,
} as const;

export const vmv = {
  sectionLabel: "001 — EXPERIENCIA",
  client: "VMV Cosmetic Group",
  heading: "Stack completo a escala corporativa",
  stats: [
    {
      value: 32,
      label: "dominios administrados",
      caption: "21 con web activa",
    },
    {
      value: 12,
      label: "plugins propios",
      caption: "+ store interno de plugins",
    },
    {
      value: 20,
      label: "microservicios",
      caption: "Go · Java · Node",
    },
  ] as VmvStat[],
  capabilities: [
    {
      title: "Ecosistema de plugins.",
      description:
        "Una red de plugins corporativos con su propio orquestador de actualizaciones — un \"store\" interno que distribuye y versiona cada pieza.",
    },
    {
      title: "Seguridad perimetral.",
      description:
        "WAF de carga temprana con IP scoring dinámico y bloqueos sincronizados entre un microservicio en Go y la capa de WordPress.",
    },
    {
      title: "Visualizador de revistas interactivo.",
      description:
        "CMS con lectura protegida por tokens y panel de administración aislado.",
    },
    {
      title: "Gateway de IA unificado.",
      description:
        "Proxy/enrutador de modelos de lenguaje con API compatible OpenAI, control de contexto y streaming.",
    },
    {
      title: "Motor de generación de PDF asíncrono.",
      description:
        "Cola de jobs y estados en tiempo real (SSE) para liberar a los servidores web.",
    },
    {
      title: "Integraciones legacy.",
      description: "Puentes hacia mainframe AS/400 desde servicios Java.",
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
  ],
} as const;

export const freelance = {
  sectionLabel: "002 — FREELANCE",
  projects: [
    {
      id: "larasoak",
      name: "larasoak.art",
      domain: "larasoak.art",
      description:
        "Portfolio editorial con CMS propio: gestión de obra y subida de imágenes a almacenamiento en la nube (Vercel Blob). Secciones de storyboards, concept art, client work y sketchbook.",
      tags: ["NEXT.JS", "CMS PROPIO", "VERCEL BLOB", "CLIENTE PAGADO"],
      link: { label: "larasoak.art ↗", href: "https://larasoak.art" },
    },
    {
      id: "gokthermal",
      name: "gokthermal.com",
      domain: "gokthermal.com",
      description:
        "Sitio de servicios con galería de proyectos, reseñas y contacto directo (WhatsApp/llamada). En desarrollo.",
      tags: ["NEXT.JS", "EN PROGRESO"],
      link: { label: "gokthermal.com ↗", href: "https://gokthermal.com" },
    },
  ] as FreelanceProject[],
} as const;

export const products = {
  sectionLabel: "003 — PRODUCTOS PROPIOS",
  items: [
    {
      id: "roses-st-jordi",
      name: "Roses Sant Jordi",
      description:
        "Proyecto propio multi-dominio para la campaña de Sant Jordi. Hasta 5.000 visitas de tráfico real.",
      tags: ["MULTI-DOMINIO", "+5K TRÁFICO"],
      link: { label: "rosesstjordi.com ↗", href: "https://rosesstjordi.com" },
    },
    {
      id: "alexasto",
      name: "alexasto.com",
      description: "Marca personal (este sitio).",
      tags: ["NEXT.JS 15", "MOTION", "TAILWIND v4"],
    },
    {
      id: "neibr-ref",
      name: "Neibr",
      description:
        "Plataforma logística destacada arriba como proyecto bandera.",
      tags: ["VER ARRIBA ↑"],
      link: { label: "neibr.es ↗", href: "https://neibr.es" },
    },
  ] as OwnProduct[],
} as const;

export const contact = {
  heading: "Construyamos algo",
  headingAccent: "robusto.",
  cta: { label: "ENVIAR MENSAJE", href: "mailto:alexasto2000@gmail.com" },
  links: [
    { label: "GITHUB", href: "https://github.com/Alexasto12" },
    { label: "EMAIL", href: "mailto:alexasto2000@gmail.com" },
    {
      label: "LINKEDIN",
      href: "https://www.linkedin.com/in/alejandro-cabrera-asto/",
    },
  ],
} as const;
