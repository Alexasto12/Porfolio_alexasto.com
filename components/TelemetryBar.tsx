"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { telemetry } from "@/data/projects";
import { useI18n } from "@/lib/i18n";
import { LangSwitcher } from "./LangSwitcher";

function formatTime(d: Date) {
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

export function TelemetryBar() {
  const [time, setTime] = useState<string>("--:--:--");
  const [mounted, setMounted] = useState(false);
  const reduced = useReducedMotion();
  const { t } = useI18n();

  useEffect(() => {
    setMounted(true);
    const tick = () => setTime(formatTime(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <motion.header
      initial={reduced ? false : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.6, ease: [0.2, 0.7, 0.2, 1] }}
      className="sticky top-0 z-30 w-full backdrop-blur-md"
      style={{
        background: "color-mix(in srgb, var(--paper) 84%, transparent)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div className="shell flex items-center justify-between h-12 sm:h-14">
        <div className="flex items-center gap-3 sm:gap-5 min-w-0">
          <span
            className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] shrink-0"
            style={{ color: "var(--wine)" }}
          >
            {telemetry.systemId}
          </span>
          <span
            className="hidden sm:inline-block h-3 w-px"
            style={{ background: "var(--line-strong)" }}
          />
          <span className="font-mono text-[11px] sm:text-[12px] truncate">
            {telemetry.name}
          </span>
          <span
            className="hidden md:inline-block h-3 w-px"
            style={{ background: "var(--line-strong)" }}
          />
          <span
            className="hidden md:inline-block font-mono text-[11px] truncate"
            style={{ color: "var(--muted)" }}
          >
            {t(telemetry.role)}
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <span
            className="hidden sm:inline-flex items-center gap-2 font-mono text-[11px]"
            style={{ color: "var(--muted)" }}
          >
            <span
              className="dot-pulse inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--wine)" }}
            />
            <span className="uppercase tracking-[0.16em]">
              {t(telemetry.status)}
            </span>
          </span>
          <span
            className="hidden lg:inline-block font-mono text-[11px]"
            style={{ color: "var(--muted)" }}
          >
            UPTIME {telemetry.uptime}
          </span>
          <time
            className="font-mono text-[11px] sm:text-[12px] tabular"
            aria-label={mounted ? `Hora local ${time}` : undefined}
            suppressHydrationWarning
          >
            {time}
          </time>
          <span
            className="hidden sm:inline-block h-3 w-px"
            style={{ background: "var(--line-strong)" }}
          />
          <LangSwitcher />
        </div>
      </div>
    </motion.header>
  );
}
