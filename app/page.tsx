import { GridBackground } from "@/components/GridBackground";
import { TelemetryBar } from "@/components/TelemetryBar";
import { Hero } from "@/components/Hero";
import { NeibrFeature } from "@/components/NeibrFeature";
import { VmvBlock } from "@/components/VmvBlock";
import { WorkSection } from "@/components/WorkSection";
import { Contact } from "@/components/Contact";
import { freelance, products } from "@/data/projects";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <GridBackground />
      <TelemetryBar />
      <Hero />
      <NeibrFeature />
      <VmvBlock />
      <WorkSection
        id="freelance"
        label={freelance.sectionLabel}
        items={freelance.projects}
      />
      <WorkSection
        id="productos"
        label={products.sectionLabel}
        items={products.items}
      />
      <Contact />
    </main>
  );
}
