"use client";

import * as React from "react";
import { toast } from "sonner";

import { Button } from "@/registry/lantern/ui/button";
import { ControlPad } from "@/registry/lantern/ui/control-pad";
import { EntityCardBar } from "@/registry/lantern/ui/entity-card";
import { Eyebrow } from "@/registry/lantern/ui/eyebrow";
import { InventoryGrid, InventorySlot } from "@/registry/lantern/ui/inventory-grid";
import { Stat, StatGroup, StatLabel, StatValue } from "@/registry/lantern/ui/stat";

import { inventory, type Turtle } from "./data";

const tools = ["Dig", "Place", "Suck", "Drop", "Inspect", "Attack"];

export function Inspector({ turtle }: { turtle: Turtle }) {
  const [slot, setSlot] = React.useState<number | null>(0);
  const offline = turtle.status === "offline";

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-5">
      <div className="flex flex-col gap-2.5">
        <Eyebrow>01 / Status</Eyebrow>
        <StatGroup variant="tiles" className="grid-cols-3">
          <Stat>
            <StatLabel>Fuel</StatLabel>
            <StatValue>{turtle.fuelUnits.toLocaleString("en-US")}</StatValue>
          </Stat>
          <Stat>
            <StatLabel>Home</StatLabel>
            <StatValue>{turtle.home}</StatValue>
          </Stat>
          <Stat>
            <StatLabel>Slots</StatLabel>
            <StatValue>{turtle.slots}</StatValue>
          </Stat>
        </StatGroup>
        <EntityCardBar value={turtle.fuel} aria-label={`Fuel ${turtle.fuel}%`} />
      </div>

      <div className="flex flex-col gap-2.5">
        <Eyebrow>02 / Move</Eyebrow>
        <ControlPad
          keyboard="pad"
          disabled={offline}
          showHints={false}
          onAction={(_, action) => toast(`${turtle.name}: ${action.label.toLowerCase()}`)}
        />
        <div className="grid grid-cols-3 gap-1.5">
          {tools.map((t) => (
            <Button key={t} size="sm" variant="outline" disabled={offline} className="max-sm:h-11">
              {t}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <div className="flex items-baseline justify-between gap-2">
          <Eyebrow>03 / Inventory</Eyebrow>
          <span className="truncate font-mono text-[10px] tracking-[0.1em] text-muted-foreground uppercase">
            Pickaxe, modem
          </span>
        </div>
        <InventoryGrid aria-label={`${turtle.name} inventory`} value={slot} onValueChange={setSlot}>
          {inventory.map((item, i) =>
            item ? <InventorySlot key={i} name={item.name} count={item.count} color={item.color} /> : <InventorySlot key={i} />,
          )}
        </InventoryGrid>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {["Refuel", "Unload", "Go home"].map((a) => (
          <Button key={a} size="sm" variant="secondary" disabled={offline} className="max-sm:h-11">
            {a}
          </Button>
        ))}
      </div>
    </div>
  );
}
