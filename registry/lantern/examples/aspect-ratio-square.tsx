import { Box, Map, Pickaxe } from "lucide-react";

import { AspectRatio } from "@/registry/lantern/ui/aspect-ratio";

const tiles = [
  { ratio: 1, label: "1 : 1", icon: Box },
  { ratio: 4 / 3, label: "4 : 3", icon: Map },
  { ratio: 3 / 4, label: "3 : 4", icon: Pickaxe },
];

export default function AspectRatioSquare() {
  return (
    <div className="grid w-full max-w-md grid-cols-3 items-start gap-3">
      {tiles.map(({ ratio, label, icon: Icon }) => (
        <AspectRatio key={label} ratio={ratio} className="overflow-hidden rounded-md border bg-accent bg-grid">
          <div className="flex size-full flex-col items-center justify-center gap-2 text-[#b7ca9e]">
            <Icon className="size-6 stroke-[1.5]" />
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase">{label}</span>
          </div>
        </AspectRatio>
      ))}
    </div>
  );
}
