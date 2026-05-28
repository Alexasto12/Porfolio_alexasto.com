export function MockNeibrApi() {
  return (
    <div className="w-full h-full grid grid-cols-2 text-[9px] sm:text-[10px] font-mono leading-[1.55]" style={{ background: "#0e0d09", color: "#f0ede4" }}>
      <div className="p-3 sm:p-4 border-r" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="uppercase tracking-[0.18em] mb-2" style={{ color: "#9a9788" }}>POST · /v1/handovers</div>
        <pre className="whitespace-pre-wrap"><span style={{ color: "#8b1e3f" }}>POST</span>{" /v1/handovers HTTP/1.1\nHost: api.neibr.es\nAuthorization: Bearer <"}<span style={{ color: "#9a9788" }}>opr_tok</span>{">\nContent-Type: application/json\n\n{\n  \"carrier_id\": \"glovo_es\",\n  \"package\": {\n    \"id\": \"PKG_881022\",\n    \"weight_g\": 1200\n  },\n  \"deliver_at\": \"2025-04-30T19:00:00+02:00\"\n}"}</pre>
      </div>
      <div className="p-3 sm:p-4">
        <div className="uppercase tracking-[0.18em] mb-2" style={{ color: "#9a9788" }}>HTTP/1.1 201 Created</div>
        <pre className="whitespace-pre-wrap">{`{\n  "id": "hov_5e2a91",\n  "status": "`}<span style={{ color: "#8b1e3f" }}>HANDOVER_OPEN</span>{`",\n  "secret": "9F1-22D-A04",\n  "neighbour": {\n    "alias": "vecino_5C",\n    "score": 4.82\n  },\n  "points_credit": 14,\n  "expires_at": "T+90m"\n}`}</pre>
        <div className="mt-3 pt-2 border-t flex justify-between" style={{ borderColor: "rgba(255,255,255,0.08)", color: "#9a9788" }}>
          <span>p50 38ms · p99 142ms</span>
          <span style={{ color: "#8b1e3f" }}>● live</span>
        </div>
      </div>
    </div>
  );
}
