import { GridBackground } from "@/components/GridBackground";
import { TelemetryBar } from "@/components/TelemetryBar";
import { Hero } from "@/components/Hero";
import { ApproachSection } from "@/components/ApproachSection";
import { NeibrFeature } from "@/components/NeibrFeature";
import { VmvBlock } from "@/components/VmvBlock";
import { TimelineSection } from "@/components/TimelineSection";
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
      <TimelineSection />
      <WorkSection
        id="freelance"
        number={freelance.sectionNumber}
        label={freelance.sectionLabel}
        heading={freelance.heading}
        description={freelance.description}
        items={freelance.projects}
      />
      <WorkSection
        id="productos"
        number={products.sectionNumber}
        label={products.sectionLabel}
        heading={products.heading}
        description={products.description}
        items={products.items}
      />
      <WorkSection
        id="academico"
        number={academic.sectionNumber}
        label={academic.sectionLabel}
        heading={academic.heading}
        description={academic.description}
        items={academic.projects}
      />
      <Contact />
    </main>
  );
}
