import { TelemetryBar } from "@/components/TelemetryBar";
import { Hero } from "@/components/Hero";
import { NeibrFeature } from "@/components/NeibrFeature";
import { ApproachSection } from "@/components/ApproachSection";
import { VmvBlock } from "@/components/VmvBlock";
import { TimelineSection } from "@/components/TimelineSection";
import { ServicesSection } from "@/components/ServicesSection";
import { WorkSection } from "@/components/WorkSection";
import { Contact } from "@/components/Contact";
import { DATA } from "@/lib/content";

export default function Home() {
  return (
    <>
      <TelemetryBar />
      <main style={{ position: "relative", zIndex: 2 }}>
        <Hero />
        <NeibrFeature />
        <ApproachSection />
        <VmvBlock />
        <TimelineSection />
        <ServicesSection />
        <WorkSection data={DATA.freelance} />
        <WorkSection data={DATA.products} />
        <WorkSection data={DATA.academic} />
        <Contact />
      </main>
    </>
  );
}
