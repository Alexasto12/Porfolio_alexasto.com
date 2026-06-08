"use client";

import { ProjectCard } from "./ProjectCard";
import type { LocalizedProject } from "@/data/projects";

/** Content-only — chrome supplied by <CollapsibleSection>. */
export function WorkContent({ items }: { items: readonly LocalizedProject[] }) {
  return (
    <div>
      {items.map((item, i) => (
        <ProjectCard
          key={item.id}
          project={item}
          index={i}
          first={i === 0}
          reverse={i % 2 === 1}
        />
      ))}
    </div>
  );
}
