export function MockSalerm() {
  return (
    <div className="w-full h-full flex" style={{ background: "#f3efe5" }}>
      {/* Magazine spread */}
      <div className="flex-1 grid grid-cols-2 gap-1 p-3 sm:p-4">
        <div className="relative flex flex-col justify-between p-3" style={{ background: "linear-gradient(160deg,#8b1e3f 0%, #6d142c 100%)", color: "#f0e8d8" }}>
          <div className="font-mono text-[8px] uppercase tracking-[0.2em] opacity-80">Salerm · ISSUE 04</div>
          <div className="font-display font-extrabold leading-[0.92] tracking-[-0.02em] text-[clamp(0.9rem,2.6vw,1.6rem)]">
            Color &<br/>science.
          </div>
          <div className="text-[8px] font-mono uppercase tracking-[0.16em] opacity-80">Cover Story · 2025</div>
        </div>
        <div className="flex flex-col gap-1 text-[8px] font-mono" style={{ color: "#3a3a32" }}>
          <div className="h-2/3 grid grid-cols-2 gap-1">
            <div style={{ background: "#d4c8b6" }} />
            <div style={{ background: "#a89478" }} />
            <div style={{ background: "#c8a4b6" }} />
            <div style={{ background: "#b58aa0" }} />
          </div>
          <div className="leading-[1.4]" style={{ color: "#3a3a32" }}>
            <div className="font-bold mb-0.5">Editorial · 04</div>
            <div className="opacity-70">Pigmentación dirigida y técnica de capas.</div>
          </div>
          <div className="mt-auto flex justify-between" style={{ color: "#6d142c" }}>
            <span>p. 12</span>
            <span>magazine.salerm.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}
