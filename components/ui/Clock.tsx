"use client";

import { useEffect, useState } from "react";

/** Live Madrid time (HH:MM:SS), rendered only in the browser. */
export function Clock() {
  const [clock, setClock] = useState("");

  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Europe/Madrid",
      });
    setClock(fmt());
    const id = setInterval(() => setClock(fmt()), 1000);
    return () => clearInterval(id);
  }, []);

  return <span className="font-mono">{clock}</span>;
}
