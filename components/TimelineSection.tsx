"use client";

import { SectionHeader } from "./SectionHeader";
import { Timeline } from "./Timeline";
import { timeline } from "@/data/projects";

export function TimelineSection() {
  return (
    <section id="recorrido" className="shell pt-28 md:pt-40 pb-24 md:pb-32">
      <SectionHeader
        number={timeline.sectionNumber}
        label={timeline.sectionLabel}
        title={timeline.heading}
        description={timeline.description}
      />
      <Timeline entries={timeline.entries} />
    </section>
  );
}
