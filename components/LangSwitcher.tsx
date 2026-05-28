"use client";

import { LOCALES, LOCALE_FULL, LOCALE_LABEL, useI18n } from "@/lib/i18n";

export function LangSwitcher() {
  const { locale, setLocale } = useI18n();

  return (
    <div
      className="flex items-center gap-0 font-mono text-[11px] tabular"
      role="group"
      aria-label="Language switcher"
    >
      {LOCALES.map((code, i) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-label={LOCALE_FULL[code]}
            aria-pressed={active}
            className="px-1.5 py-1 transition-colors duration-300 outline-none focus-visible:underline"
            style={{
              color: active ? "var(--wine)" : "var(--muted)",
              fontWeight: active ? 700 : 400,
            }}
          >
            {LOCALE_LABEL[code]}
            {i < LOCALES.length - 1 ? (
              <span
                className="pl-1.5 select-none"
                style={{ color: "var(--line-strong)" }}
                aria-hidden="true"
              >
                ·
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
