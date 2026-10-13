"use client";

import { useEffect, useState } from "react";

/**
 * Current time in Granollers (Europe/Madrid), 24 h, updated on the minute.
 * The server HTML leaves it empty: a static page can't know the time.
 */
export function LocalTime({ className = "" }: { className?: string }) {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("es-ES", {
      timeZone: "Europe/Madrid",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    });
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      setNow(fmt.format(new Date()));
      timer = setTimeout(tick, 60_000 - (Date.now() % 60_000) + 50);
    };
    tick();
    return () => clearTimeout(timer);
  }, []);

  return (
    <time className={className} dateTime={now ?? undefined}>
      {now}
    </time>
  );
}
