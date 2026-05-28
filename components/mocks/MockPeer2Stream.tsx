export function MockPeer2Stream() {
  const posters = [
    "#e63946", "#1d3557", "#2a9d8f", "#e9c46a", "#f4a261", "#264653",
    "#a8dadc", "#457b9d", "#fb8500", "#023047",
  ];
  return (
    <div className="w-full h-full flex flex-col" style={{ background: "#0b0d11", color: "#f0ede4" }}>
      <div className="flex items-center justify-between px-4 py-2 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="font-display font-extrabold text-[clamp(0.7rem,1.8vw,1rem)] tracking-[-0.02em]">
          peer<span style={{ color: "#8b1e3f" }}>2</span>stream
        </div>
        <div className="flex items-center gap-3 text-[8px] font-mono uppercase tracking-[0.18em]" style={{ color: "#9a9788" }}>
          <span>Discover</span><span>Library</span><span>Settings</span>
          <span className="h-4 w-4 rounded-full" style={{ background: "#8b1e3f" }} />
        </div>
      </div>
      <div className="flex-1 p-3 sm:p-4 grid grid-cols-5 gap-1.5">
        {posters.map((c, i) => (
          <div key={i} className="relative" style={{ background: c }}>
            <div className="absolute left-1 right-1 bottom-1 h-[2px]" style={{ background: "rgba(0,0,0,0.4)" }}>
              <div className="h-full" style={{ background: "#8b1e3f", width: `${((i * 17) % 100)}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between px-4 py-2 text-[8px] font-mono uppercase tracking-[0.18em] border-t" style={{ color: "#9a9788", borderColor: "rgba(255,255,255,0.06)" }}>
        <span>tmdb sync · 2.4M titles</span>
        <span style={{ color: "#8b1e3f" }}>● live</span>
      </div>
    </div>
  );
}
