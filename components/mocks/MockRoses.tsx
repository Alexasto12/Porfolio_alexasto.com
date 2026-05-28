export function MockRoses() {
  return (
    <div className="w-full h-full relative" style={{ background: "#f7eee5" }}>
      <div className="absolute inset-0">
        <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <radialGradient id="rose" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#b62b41" />
              <stop offset="60%" stopColor="#8b1e3f" />
              <stop offset="100%" stopColor="#5a0f25" />
            </radialGradient>
          </defs>
          {[[60, 60, 26], [120, 120, 32], [220, 80, 40], [260, 160, 22]].map(([cx, cy, r], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r={r} fill="url(#rose)" />
              <circle cx={cx - 4} cy={cy - 4} r={r * 0.6} fill="#5a0f25" opacity="0.5" />
              <circle cx={cx + 2} cy={cy + 4} r={r * 0.35} fill="#3a081a" opacity="0.4" />
            </g>
          ))}
          <path d="M 0 200 L 60 150 L 100 180 L 180 130 L 260 180 L 320 140 L 320 200 Z" fill="#2d4a2b" />
        </svg>
      </div>
      <div className="relative h-full flex flex-col justify-between p-4 sm:p-5">
        <div className="flex items-baseline justify-between text-[9px] font-mono uppercase tracking-[0.2em]" style={{ color: "#5a0f25" }}>
          <span>roses · sant jordi</span>
          <span>23.04</span>
        </div>
        <div>
          <div className="font-display font-extrabold leading-[0.92] tracking-[-0.02em] text-[clamp(1rem,3vw,2.4rem)]" style={{ color: "#5a0f25" }}>
            Una rosa.
          </div>
          <div className="font-display font-extrabold leading-[0.92] tracking-[-0.02em] text-[clamp(1rem,3vw,2.4rem)]" style={{ color: "#fff" }}>
            Una historia.
          </div>
          <div className="mt-2 flex gap-2 text-[8px] font-mono uppercase tracking-[0.16em]">
            <span className="px-2 py-1" style={{ background: "#fff", color: "#5a0f25" }}>.com</span>
            <span className="px-2 py-1" style={{ background: "#fff", color: "#5a0f25" }}>.cat</span>
            <span className="px-2 py-1" style={{ background: "#fff", color: "#5a0f25" }}>.es</span>
          </div>
        </div>
      </div>
    </div>
  );
}
