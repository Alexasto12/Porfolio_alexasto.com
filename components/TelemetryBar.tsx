"use client";

import { motion, useReducedMotion } from "motion/react";
import { telemetry } from "@/data/projects";
import { useI18n, l } from "@/lib/i18n";
import { LangSwitcher } from "./LangSwitcher";

const NAV = [
  { href: "#neibr", label: l("Neibr", "Neibr", "Neibr") },
  { href: "#experiencia", label: l("Experiencia", "Experience", "Experiència") },
  { href: "#recorrido", label: l("Recorrido", "Path", "Recorregut") },
  { href: "#servicios", label: l("Servicios", "Services", "Serveis") },
];

export function TelemetryBar() {
  const reduced = useReducedMotion();
  const { t } = useI18n();

  return (
    <motion.header
      initial={reduced ? false : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.6, ease: [0.2, 0.7, 0.2, 1] }}
      className="sticky top-0 z-30 w-full backdrop-blur-md"
      style={{
        background: "color-mix(in srgb, var(--paper) 86%, transparent)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div className="shell flex items-center justify-between h-12 sm:h-14">
        <a href="#perfil" className="flex items-center gap-3 sm:gap-5 min-w-0">
          <span
            className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] shrink-0"
            style={{ color: "var(--wine)" }}
          >
            {telemetry.systemId}
          </span>
          <span className="hidden sm:inline-block h-3 w-px" style={{ background: "var(--line-strong)" }} />
          <span className="font-mono text-[11px] sm:text-[12px] truncate">{telemetry.name}</span>
          <span className="hidden md:inline-block h-3 w-px" style={{ background: "var(--line-strong)" }} />
          <span className="hidden md:inline-block font-mono text-[11px] truncate" style={{ color: "var(--muted)" }}>
            {t(telemetry.role)}
          </span>
        </a>

        <nav
          className="hidden lg:flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.18em]"
          style={{ color: "var(--muted)" }}
        >
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="link-underline">
              {t(item.label)}
            </a>
          ))}
          <a href="#contacto" className="link-underline" style={{ color: "var(--wine)" }}>
            {t(l("Contacto", "Contact", "Contacte"))}
          </a>
        </nav>

        <LangSwitcher />
      </div>
    </motion.header>
  );
}
