"use client";

import { InventoryGrid, InventorySlot } from "@/registry/lantern/ui/inventory-grid";

const palette = ["#8b8f88", "#2f3331", "#c9a48a", "#7a5a3c", "#9a7a4c", "#e8c98a", "#c2493a", "#6d9a5a"];
const names = ["Cobble", "Coal", "Iron ore", "Dirt", "Oak log", "Gold ore", "Redstone", "Kelp"];

const slots = Array.from({ length: 27 }, (_, i) => {
  if ((i * 7) % 5 === 0 && i % 4 !== 1) return null;
  const k = (i * 5) % palette.length;
  return { name: names[k], color: palette[k], count: ((i * 23) % 64) + 1 };
});

export default function InventoryGridChest() {
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <div className="font-mono text-[10px] tracking-[0.2em] text-success uppercase">Storage chest, -12 64 30</div>
      <InventoryGrid aria-label="Chest contents" columns={9} size="sm" defaultValue={0}>
        {slots.map((slot, i) =>
          slot ? <InventorySlot key={i} name={slot.name} color={slot.color} count={slot.count} /> : <InventorySlot key={i} />,
        )}
      </InventoryGrid>
    </div>
  );
}
