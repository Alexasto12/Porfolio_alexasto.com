"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Compact, real-API snippet for Neibr — verbatim curl from api.neibr.es.
 * Built as a flat code surface (no browser chrome) so the section breathes.
 */
export function ApiSnippet() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reduced ? 0 : 0.7, ease: [0.2, 0.7, 0.2, 1] }}
      className="rounded-[10px] overflow-hidden shadow-window"
      style={{
        background: "#0e0d09",
        border: "1px solid rgba(255,255,255,0.10)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div className="flex items-center gap-3">
          <span
            className="font-mono text-[10px] uppercase tracking-[0.18em] px-2 py-0.5"
            style={{
              background: "var(--wine)",
              color: "#fff",
            }}
          >
            POST
          </span>
          <span
            className="font-mono text-[11px] tabular truncate"
            style={{ color: "var(--paper-on-dark)" }}
          >
            api.neibr.es / api / v1 / b2b / shipments
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: "var(--muted-dark)" }}>
          <span
            className="dot-pulse h-1.5 w-1.5 rounded-full"
            style={{ background: "var(--wine)" }}
          />
          <span>LIVE</span>
        </div>
      </div>

      {/* Body — split: curl on the left, response on the right (stack on small) */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div
          className="p-4 sm:p-5 border-b md:border-b-0 md:border-r"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <div
            className="font-mono text-[10px] uppercase tracking-[0.22em] mb-3"
            style={{ color: "var(--muted-dark)" }}
          >
            ↳ REQUEST · curl
          </div>
          <pre
            className="font-mono text-[12px] leading-[1.6] whitespace-pre-wrap"
            style={{ color: "var(--paper-on-dark)" }}
          >
{"curl "}<span style={{ color: "#9ad7f0" }}>https://api.neibr.es/api/v1/b2b/shipments</span>{" \\\n  --request "}<span style={{ color: "#ff7a90" }}>POST</span>{" \\\n  --header "}<span style={{ color: "#d3a14b" }}>{`'Content-Type: application/json'`}</span>{" \\\n  --header "}<span style={{ color: "#d3a14b" }}>{`'X-API-Key: YOUR_SECRET_TOKEN'`}</span>{" \\\n  --data '{\n    "}<span style={{ color: "#d3a14b" }}>{`"expires_at"`}</span>: <span style={{ color: "#9bd09b" }}>{`"2026-12-31T23:59:59Z"`}</span>,
    <span style={{ color: "#d3a14b" }}>"geo_lat"</span>: <span style={{ color: "#c8a6f0" }}>41.6079</span>,
    <span style={{ color: "#d3a14b" }}>"geo_lng"</span>: <span style={{ color: "#c8a6f0" }}>2.2874</span>,
    <span style={{ color: "#d3a14b" }}>"pickup_window_hours"</span>: <span style={{ color: "#c8a6f0" }}>1</span>
  {"}'"}
          </pre>
        </div>

        <div className="p-4 sm:p-5">
          <div
            className="font-mono text-[10px] uppercase tracking-[0.22em] mb-3 flex items-center gap-2"
            style={{ color: "var(--muted-dark)" }}
          >
            <span
              className="inline-block px-1.5 py-[2px]"
              style={{ background: "rgba(155,208,155,0.18)", color: "#9bd09b" }}
            >
              201
            </span>
            <span>↳ CREATED</span>
          </div>
          <pre
            className="font-mono text-[12px] leading-[1.6] whitespace-pre-wrap"
            style={{ color: "var(--paper-on-dark)" }}
          >
{`{
  "id": "ship_5e2a91",
  "tracking_number": "DHL-000001-01042026",
  "status": "ASSIGNED",
  "neighbour": {
    "alias": "vecino_5C",
    "distance_m": 142
  },
  "expires_at": "2026-12-31T23:59:59Z"
}`}
          </pre>
          <div
            className="mt-4 pt-3 flex justify-between font-mono text-[10px] uppercase tracking-[0.18em] border-t"
            style={{ borderColor: "rgba(255,255,255,0.08)", color: "var(--muted-dark)" }}
          >
            <span>radius 200m · auto-cancel</span>
            <span style={{ color: "var(--wine)" }}>● 201</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
