import { ScrollProgress } from "@/components/ScrollProgress";
import { GridBackground } from "@/components/GridBackground";
import { TelemetryBar } from "@/components/TelemetryBar";
import { Hero } from "@/components/Hero";
import { NeibrFeature } from "@/components/NeibrFeature";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import { ApproachContent } from "@/components/ApproachSection";
import { VmvBlock } from "@/components/VmvBlock";
import { TimelineSection } from "@/components/TimelineSection";
import { ServicesContent } from "@/components/ServicesSection";
import { WorkContent } from "@/components/WorkSection";
import { Contact } from "@/components/Contact";
import { approach, services, freelance, products, academic } from "@/data/projects";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <ScrollProgress />
      <GridBackground />
      <TelemetryBar />

      {/* Always-on narrative + flagship */}
      <Hero />
      <NeibrFeature />

      <CollapsibleSection
        id="enfoque"
        number={approach.sectionNumber}
        label={approach.sectionLabel}
        title={approach.heading}
        summary={approach.description}
        defaultOpen
      >
        <ApproachContent />
      </CollapsibleSection>

      <VmvBlock />
      <TimelineSection />

      {/* Catalog sections — collapsed by default to tame the vertical scroll */}
      <CollapsibleSection
        id="servicios"
        number={services.sectionNumber}
        label={services.sectionLabel}
        title={services.heading}
        summary={services.description}
      >
        <ServicesContent />
      </CollapsibleSection>

      <CollapsibleSection
        id="freelance"
        number={freelance.sectionNumber}
        label={freelance.sectionLabel}
        title={freelance.heading}
        summary={freelance.description}
      >
        <WorkContent items={freelance.projects} />
      </CollapsibleSection>

      <CollapsibleSection
        id="productos"
        number={products.sectionNumber}
        label={products.sectionLabel}
        title={products.heading}
        summary={products.description}
      >
        <WorkContent items={products.items} />
      </CollapsibleSection>

      <CollapsibleSection
        id="academico"
        number={academic.sectionNumber}
        label={academic.sectionLabel}
        title={academic.heading}
        summary={academic.description}
      >
        <WorkContent items={academic.projects} />
      </CollapsibleSection>

      <Contact />
    </main>
  );
}
