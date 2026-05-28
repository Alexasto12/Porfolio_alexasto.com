"use client";

type Props = {
  items: readonly string[];
  className?: string;
};

export function Ticker({ items, className }: Props) {
  const sequence = [...items, ...items];
  return (
    <div className={`ticker overflow-hidden ${className ?? ""}`} aria-hidden="true">
      <div className="ticker-track py-5">
        {sequence.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-mono text-[11px] uppercase tracking-[0.18em] muted whitespace-nowrap inline-flex items-center gap-10"
          >
            {item}
            <span className="opacity-40 select-none">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
