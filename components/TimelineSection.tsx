"use client";

import { Section } from "./Section";
import { SectionHeader } from "./SectionHeader";
import { HorizontalTimeline } from "./HorizontalTimeline";
import { timeline } from "@/data/projects";

export function TimelineSection() {
  return (
    <Section id="recorrido">
      <SectionHeader
        number={timeline.sectionNumber}
        label={timeline.sectionLabel}
        title={timeline.heading}
        description={timeline.description}
      />
      <div className="mt-14 md:mt-20">
        <HorizontalTimeline entries={timeline.entries} />
      </div>
    </Section>
  );
}
