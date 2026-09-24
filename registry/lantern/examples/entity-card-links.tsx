import { FileCodeIcon } from "lucide-react";

import {
  EntityCard,
  EntityCardDescription,
  EntityCardHeader,
  EntityCardList,
  EntityCardTag,
  EntityCardTitle,
} from "@/registry/lantern/ui/entity-card";

const scripts = [
  { file: "strip_mine.lua", when: "AI, just now", tag: "New" },
  { file: "quarry_9x9.lua", when: "2 days ago" },
  { file: "farm_wheat.lua", when: "Last week" },
  { file: "sort_chests.lua", when: "Sep 12" },
];

export default function EntityCardLinks() {
  return (
    <nav aria-label="Programs" className="w-full max-w-[240px]">
      <EntityCardList className="gap-1.5">
        {scripts.map((s, i) => (
          <EntityCard key={s.file} asChild selected={i === 0} className="gap-1 px-2.5 py-2">
            <a href="#">
              <EntityCardHeader>
                <FileCodeIcon aria-hidden="true" className="size-3.5 shrink-0 text-muted-foreground" />
                <EntityCardTitle className="font-mono text-xs font-normal tracking-normal">{s.file}</EntityCardTitle>
                {s.tag && <EntityCardTag className="text-primary">{s.tag}</EntityCardTag>}
              </EntityCardHeader>
              <EntityCardDescription className="pl-5.5">{s.when}</EntityCardDescription>
            </a>
          </EntityCard>
        ))}
      </EntityCardList>
    </nav>
  );
}
