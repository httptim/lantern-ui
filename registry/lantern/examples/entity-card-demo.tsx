"use client";

import * as React from "react";

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
import { StatusDot } from "@/registry/lantern/ui/status-dot";

const turtles = [
  { name: "Testy", status: "online", tone: "online", job: "Strip mine 41/64", pos: "120 12 -352", fuel: 72 },
  { name: "Digger", status: "online", tone: "online", job: "Idle at home", pos: "118 64 -340", fuel: 91 },
  { name: "Builder-2", status: "busy", tone: "busy", job: "Build layer 3/10", pos: "140 70 -310", fuel: 44 },
  { name: "Farmhand", status: "offline", tone: "offline", job: "Last seen 2h ago", pos: "96 65 -300", fuel: 12 },
] as const;

export default function EntityCardDemo() {
  const [selected, setSelected] = React.useState("Testy");

  return (
    <EntityCardList className="w-full max-w-[268px]" aria-label="Fleet">
      {turtles.map((t) => (
        <EntityCard key={t.name} selected={selected === t.name} onClick={() => setSelected(t.name)}>
          <EntityCardHeader>
            <StatusDot tone={t.tone} pulse={t.tone !== "offline"} />
            <EntityCardTitle>{t.name}</EntityCardTitle>
            <EntityCardTag>{t.status}</EntityCardTag>
          </EntityCardHeader>
          <EntityCardDescription>{t.job}</EntityCardDescription>
          <EntityCardMeta>
            <span>{t.pos}</span>
            <span>Fuel {t.fuel}%</span>
          </EntityCardMeta>
          <EntityCardBar value={t.fuel} />
        </EntityCard>
      ))}
    </EntityCardList>
  );
}
