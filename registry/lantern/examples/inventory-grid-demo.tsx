"use client";

import * as React from "react";

import { InventoryGrid, InventorySlot } from "@/registry/lantern/ui/inventory-grid";

const items: ({ name: string; count: number; color: string } | null)[] = [
  { name: "Cobble", count: 64, color: "#8b8f88" },
  { name: "Coal", count: 23, color: "#2f3331" },
  { name: "Iron", count: 7, color: "#c9a48a" },
  { name: "Torch", count: 16, color: "#f5a665" },
  { name: "Dirt", count: 41, color: "#7a5a3c" },
  null,
  { name: "Redstone", count: 12, color: "#c2493a" },
  { name: "Pickaxe", count: 1, color: "#8fb3c9" },
  { name: "Oak log", count: 32, color: "#9a7a4c" },
  { name: "Gold", count: 3, color: "#e8c98a" },
  null,
  null,
  { name: "Kelp", count: 18, color: "#6d9a5a" },
  null,
  { name: "Diamond", count: 2, color: "#7fd3cf" },
  null,
];

export default function InventoryGridDemo() {
  const [selected, setSelected] = React.useState<number | null>(3);
  const current = selected != null ? items[selected] : null;

  return (
    <div className="flex w-full max-w-[280px] flex-col gap-3">
      <InventoryGrid aria-label="Turtle inventory" value={selected} onValueChange={setSelected}>
        {items.map((item, i) =>
          item ? <InventorySlot key={i} name={item.name} count={item.count} color={item.color} /> : <InventorySlot key={i} />,
        )}
      </InventoryGrid>
      <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
        <span>Slot {selected != null ? selected + 1 : "-"}</span>
        <span className="text-foreground">{current ? `${current.name} x${current.count}` : "Empty"}</span>
      </div>
    </div>
  );
}
