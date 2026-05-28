export function MockNeibrLanding() {
  return (
    <div className="w-full h-full p-4 sm:p-6 flex flex-col justify-between" style={{ background: "#fafaf2" }}>
      <div className="flex items-center justify-between text-[8px] sm:text-[9px] font-mono uppercase tracking-[0.18em]" style={{ color: "#7c7a70" }}>
        <span>neibr</span>
        <div className="flex gap-3">
          <span>Operadores</span>
          <span>Vecinos</span>
          <span>API</span>
          <span style={{ color: "#8b1e3f" }}>Empezar →</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="font-display font-extrabold leading-[0.92] tracking-[-0.02em] text-[clamp(1rem,3vw,2.4rem)]" style={{ color: "#16150f" }}>
          Cero retornos.
        </div>
        <div className="font-display font-extrabold leading-[0.92] tracking-[-0.02em] text-[clamp(1rem,3vw,2.4rem)]" style={{ color: "#8b1e3f" }}>
          Cero fricciones.
        </div>
        <div className="mt-1 text-[9px] sm:text-[10px] max-w-[28ch] leading-[1.4]" style={{ color: "#4d4a3f" }}>
          La red logística vecinal para operadores B2B. Tu paquete, en manos de quien sí está en casa.
        </div>
        <div className="mt-2 flex gap-2">
          <span className="px-2 py-1 text-[8px] font-mono uppercase tracking-[0.16em]" style={{ background: "#16150f", color: "#fafaf2" }}>Soy operador</span>
          <span className="px-2 py-1 text-[8px] font-mono uppercase tracking-[0.16em]" style={{ border: "1px solid #16150f", color: "#16150f" }}>Soy vecino</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {["3M req · 50min", "API REST", "ES · CA · EN"].map((t) => (
          <div key={t} className="border-t pt-1.5 text-[8px] font-mono tabular" style={{ borderColor: "rgba(0,0,0,0.12)", color: "#4d4a3f" }}>
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}
