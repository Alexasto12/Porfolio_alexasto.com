import { GridBackground } from "@/components/GridBackground";
import { TelemetryBar } from "@/components/TelemetryBar";
import { Hero } from "@/components/Hero";
import { ApproachSection } from "@/components/ApproachSection";
import { NeibrFeature } from "@/components/NeibrFeature";
import { VmvBlock } from "@/components/VmvBlock";
import { WorkSection } from "@/components/WorkSection";
import { Contact } from "@/components/Contact";
import { freelance, products, academic } from "@/data/projects";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <GridBackground />
      <TelemetryBar />
      <Hero />
      <NeibrFeature />
      <ApproachSection />
      <VmvBlock />
      <WorkSection
        id="freelance"
        label={freelance.sectionLabel}
        intro={freelance.intro}
        items={freelance.projects}
      />
      <WorkSection
        id="productos"
        label={products.sectionLabel}
        intro={products.intro}
        items={products.items}
      />
      <WorkSection
        id="academico"
        label={academic.sectionLabel}
        intro={academic.intro}
        items={academic.projects}
      />
      <Contact />
    </main>
  );
}
