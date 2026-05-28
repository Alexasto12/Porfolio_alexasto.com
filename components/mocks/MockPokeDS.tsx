export function MockPokeDS() {
  return (
    <div className="w-full h-full flex items-center justify-center p-3" style={{ background: "#bcbfca" }}>
      <div className="relative" style={{ width: "82%", height: "92%" }}>
        {/* Top screen */}
        <div className="absolute left-0 right-0 top-0 h-[44%] rounded-[6px]" style={{ background: "#1a1a1a", border: "2px solid #2a2a2a" }}>
          <div className="absolute inset-1.5 rounded-[3px] grid grid-cols-2 gap-1 p-1.5" style={{ background: "#48c5d5" }}>
            <div className="flex items-center justify-center">
              <svg viewBox="0 0 40 40" className="w-full h-full">
                <circle cx="20" cy="22" r="14" fill="#ed1e24" />
                <rect x="6" y="20" width="28" height="3" fill="#000" />
                <circle cx="20" cy="22" r="5" fill="#fff" stroke="#000" strokeWidth="1.4" />
              </svg>
            </div>
            <div className="flex flex-col gap-1 text-[7px] font-mono leading-[1.1]" style={{ color: "#0e2a2f" }}>
              <div className="font-bold">#025 PIKACHU</div>
              <div>HP ▮▮▮▮▮▮▮▯</div>
              <div>ATK 55</div>
              <div>DEF 40</div>
              <div>SPD 90</div>
              <div className="mt-auto pt-1" style={{ borderTop: "1px solid rgba(0,0,0,0.2)" }}>type · electric</div>
            </div>
          </div>
        </div>
        {/* Hinge */}
        <div className="absolute left-[10%] right-[10%] top-[44%] h-[8%]" style={{ background: "#9ea1ab" }} />
        {/* Bottom screen */}
        <div className="absolute left-0 right-0 bottom-0 h-[44%] rounded-[6px] flex items-center" style={{ background: "#1a1a1a", border: "2px solid #2a2a2a" }}>
          <div className="absolute left-1.5 right-1.5 top-1.5 bottom-1.5 rounded-[3px] grid grid-cols-6 gap-1 p-1.5" style={{ background: "#e9e6dd" }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="rounded-[2px] flex items-center justify-center text-[7px] font-mono" style={{ background: i === 4 ? "#8b1e3f" : "#c8c4b6", color: i === 4 ? "#fff" : "#3a3a30" }}>
                {String(i + 22).padStart(3, "0")}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
