"use client";

import { useTweaks } from "@/lib/tweaks";
import type { WorkData } from "@/lib/content";
import { SectionHead } from "./ui/SectionHead";
import { ProjectCard } from "./ProjectCard";

type WorkSectionProps = {
  data: WorkData;
};

/** Reusable project section; layout switchable via Tweaks (stack/split/list). */
export function WorkSection({ data }: WorkSectionProps) {
  const { tweaks } = useTweaks();
  const layout = tweaks.cards;
  const containerClass = layout === "stack" ? "g4" : "";
  return (
    <section
      id={data.id}
      className="shell section"
      data-screen-label={`Work / ${data.num}`}
      style={{ paddingBottom: "clamp(56px,9vw,110px)" }}
    >
      <SectionHead num={data.num} label={data.label} heading={data.heading} description={data.description} />
      <div className={containerClass} style={{ marginTop: "clamp(30px,4vw,56px)" }}>
        {data.projects.map((p, i) => (
          <ProjectCard key={p.id} p={p} index={i} layout={layout} flip={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}
