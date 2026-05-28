"use client";

import { cn } from "@/lib/cn";

type Props = {
  url: string;
  /** Optional badge shown next to the URL bar */
  badge?: string;
  /** Dark or light chrome */
  variant?: "light" | "dark";
  /** Aspect ratio for the viewport area */
  ratio?: "16/10" | "16/9" | "4/3" | "3/4";
  children: React.ReactNode;
  className?: string;
};

export function Browser({
  url,
  badge,
  variant = "light",
  ratio = "16/10",
  children,
  className,
}: Props) {
  const isDark = variant === "dark";
  return (
    <div
      className={cn(
        "rounded-[8px] overflow-hidden shadow-window",
        className
      )}
      style={{
        border: `1px solid ${
          isDark ? "rgba(255,255,255,0.08)" : "var(--line-strong)"
        }`,
        background: isDark ? "#0e0d09" : "var(--paper)",
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-3 px-3 py-2 border-b"
        style={{
          background: isDark
            ? "color-mix(in srgb, #fff 4%, #0e0d09)"
            : "color-mix(in srgb, var(--ink) 4%, var(--paper))",
          borderColor: isDark ? "rgba(255,255,255,0.08)" : "var(--line)",
        }}
      >
        <div className="flex gap-1.5">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: isDark ? "#3b3a35" : "#d4d0c4" }}
          />
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: isDark ? "#3b3a35" : "#d4d0c4" }}
          />
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: isDark ? "#3b3a35" : "#d4d0c4" }}
          />
        </div>
        <div
          className="flex-1 flex items-center gap-2 px-3 py-1 rounded-[4px] font-mono text-[10.5px] tabular truncate"
          style={{
            background: isDark
              ? "rgba(255,255,255,0.04)"
              : "color-mix(in srgb, var(--ink) 6%, transparent)",
            color: isDark ? "var(--paper-on-dark)" : "var(--ink)",
          }}
        >
          <span style={{ color: isDark ? "#8a8678" : "var(--muted)" }}>↗</span>
          <span className="truncate">{url}</span>
        </div>
        {badge ? (
          <span
            className="hidden sm:inline-block font-mono text-[9px] uppercase tracking-[0.18em] px-2 py-1 rounded-[3px]"
            style={{
              border: `1px solid ${
                isDark ? "rgba(255,255,255,0.14)" : "var(--line-strong)"
              }`,
              color: isDark ? "var(--paper-on-dark)" : "var(--muted)",
            }}
          >
            {badge}
          </span>
        ) : null}
      </div>

      {/* Viewport */}
      <div
        className="relative w-full"
        style={{ aspectRatio: ratio.replace("/", " / ") }}
      >
        <div className="absolute inset-0 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
