"use client";

import { SearchIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/registry/lantern/ui/button";
import {
  EntityCard,
  EntityCardBar,
  EntityCardDescription,
  EntityCardHeader,
  EntityCardList,
  EntityCardMeta,
  EntityCardTag,
  EntityCardTitle,
} from "@/registry/lantern/ui/entity-card";
import { Eyebrow } from "@/registry/lantern/ui/eyebrow";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/registry/lantern/ui/input-group";
import { StatusDot } from "@/registry/lantern/ui/status-dot";

import { turtles } from "./data";

export function Fleet({ selected, onSelect }: { selected: string; onSelect: (id: string) => void }) {
  const [query, setQuery] = React.useState("");
  const shown = turtles.filter((t) => t.name.toLowerCase().includes(query.trim().toLowerCase()));
  const online = turtles.filter((t) => t.status !== "offline").length;

  return (
    <div className="flex min-h-full flex-col gap-3 p-4">
      <div className="flex items-baseline justify-between gap-2">
        <Eyebrow>Fleet / {turtles.length} turtles</Eyebrow>
        <span className="font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase">{online} online</span>
      </div>
      <InputGroup className="h-9">
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput
          type="search"
          placeholder="Find a turtle"
          aria-label="Find a turtle"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </InputGroup>
      <EntityCardList aria-label="Turtles">
        {shown.map((t) => (
          <EntityCard key={t.id} selected={selected === t.id} onClick={() => onSelect(t.id)}>
            <EntityCardHeader>
              <StatusDot tone={t.status} pulse={t.status !== "offline"} />
              <EntityCardTitle>{t.name}</EntityCardTitle>
              <EntityCardTag>{t.status}</EntityCardTag>
            </EntityCardHeader>
            <EntityCardDescription>{t.job}</EntityCardDescription>
            <EntityCardMeta>
              <span>{t.pos.join(" ")}</span>
              <span>Fuel {t.fuel}%</span>
            </EntityCardMeta>
            <EntityCardBar value={t.fuel} />
          </EntityCard>
        ))}
        {shown.length === 0 && <p className="py-4 text-center text-xs text-muted-foreground">No turtle called that.</p>}
      </EntityCardList>
      <div className="mt-auto rounded-md border border-dashed border-input p-3 text-xs leading-relaxed text-muted-foreground">
        Updates ready: <span className="text-foreground">2 turtles</span> on v1.8.
        <Button size="sm" variant="secondary" className="mt-2 flex h-7">
          Update
        </Button>
      </div>
    </div>
  );
}
