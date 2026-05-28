export function MockLarasoak() {
  const tiles = [
    { c: "#d6c8b3", t: 78 },
    { c: "#a89b7e", t: 38 },
    { c: "#7c6f55", t: 62 },
    { c: "#c8a888", t: 28 },
    { c: "#e8d8c0", t: 84 },
    { c: "#8e7e62", t: 46 },
  ];
  return (
    <div className="w-full h-full p-4 sm:p-5 flex flex-col gap-3" style={{ background: "#f4eee2" }}>
      <div className="flex items-baseline justify-between">
        <div className="font-display font-extrabold text-[clamp(0.9rem,2.4vw,1.6rem)] tracking-[-0.02em]" style={{ color: "#2b231a" }}>
          larasoak<span style={{ color: "#8b1e3f" }}>.art</span>
        </div>
        <div className="font-mono text-[8px] uppercase tracking-[0.18em]" style={{ color: "#6a5d4a" }}>
          Storyboards · Concept · Sketchbook
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1.5 flex-1">
        {tiles.map((t, i) => (
          <div key={i} className="relative overflow-hidden">
            <div className="absolute inset-0" style={{ background: t.c }} />
            <div className="absolute left-1 right-1 bottom-1 h-[2px]" style={{ background: "rgba(0,0,0,0.18)" }} />
            <div className="absolute left-1 bottom-2 h-[2px]" style={{ background: "rgba(0,0,0,0.28)", width: `${t.t}%` }} />
          </div>
        ))}
      </div>
      <div className="flex justify-between font-mono text-[8px] tabular" style={{ color: "#6a5d4a" }}>
        <span>24 pieces · curated</span>
        <span>Lara Carrasco Álvarez</span>
      </div>
    </div>
  );
}
