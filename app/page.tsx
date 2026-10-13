import { TelemetryBar } from "@/components/TelemetryBar";
import { ClientSections } from "@/components/ClientSections";

export default function Home() {
  return (
    <>
      <TelemetryBar />
      <main id="contenido" tabIndex={-1} style={{ position: "relative", zIndex: 2 }}>
        <ClientSections />
      </main>
    </>
  );
}
