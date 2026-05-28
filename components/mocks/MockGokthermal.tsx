export function MockGokthermal() {
  return (
    <div className="w-full h-full flex flex-col" style={{ background: "#f1ede4" }}>
      <div className="flex items-center justify-between px-4 py-2 text-[8px] sm:text-[9px] font-mono uppercase tracking-[0.18em] border-b" style={{ color: "#3a3a32", borderColor: "rgba(0,0,0,0.12)" }}>
        <span><strong>gok</strong> thermal</span>
        <div className="flex gap-3">
          <span>Servicios</span><span>Proyectos</span><span>Contacto</span>
        </div>
      </div>
      <div className="relative flex-1 flex items-end p-4 sm:p-5" style={{ background: "linear-gradient(180deg, #2d6480 0%, #5a8da5 100%)" }}>
        <div>
          <div className="font-display font-extrabold text-[clamp(0.9rem,2.6vw,1.7rem)] leading-[0.95] tracking-[-0.02em]" style={{ color: "#fff" }}>
            Climatización y ACS
          </div>
          <div className="font-display font-extrabold text-[clamp(0.9rem,2.6vw,1.7rem)] leading-[0.95] tracking-[-0.02em]" style={{ color: "#ffd166" }}>
            Granollers · Vallès Oriental
          </div>
          <div className="mt-2 flex gap-2">
            <span className="text-[8px] font-mono uppercase tracking-[0.16em] px-2 py-1" style={{ background: "#fff", color: "#1d4255" }}>Pedir visita</span>
            <span className="text-[8px] font-mono uppercase tracking-[0.16em] px-2 py-1" style={{ border: "1px solid #fff", color: "#fff" }}>WhatsApp</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-0 border-t" style={{ borderColor: "rgba(0,0,0,0.12)" }}>
        {["Aerotermia", "Reformas", "Mantenimiento"].map((t, i) => (
          <div key={t} className="px-3 py-2 text-[8px] font-mono uppercase tracking-[0.14em]" style={{ color: "#3a3a32", borderRight: i < 2 ? "1px solid rgba(0,0,0,0.08)" : "none" }}>
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}
