"use client";

import { SectionHeader } from "./SectionHeader";
import { ProjectCard } from "./ProjectCard";
import type { Localized } from "@/lib/i18n";
import type { LocalizedProject } from "@/data/projects";

type Props = {
  id: string;
  number: string;
  label: Localized<string>;
  heading?: Localized<string>;
  description?: Localized<string>;
  items: readonly LocalizedProject[];
};

export function WorkSection({
  id,
  number,
  label,
  heading,
  description,
  items,
}: Props) {
  return (
    <section id={id} className="shell pt-28 md:pt-40 pb-8">
      <SectionHeader
        number={number}
        label={label}
        title={heading}
        description={description}
      />

      <div className="mt-14 md:mt-20">
        {items.map((item, i) => (
          <ProjectCard
            key={item.id}
            project={item}
            index={i}
            reverse={i % 2 === 1}
          />
        ))}
      </div>
    </section>
  );
}
