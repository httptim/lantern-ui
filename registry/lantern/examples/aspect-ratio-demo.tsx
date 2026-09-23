import { Castle } from "lucide-react";

import { AspectRatio } from "@/registry/lantern/ui/aspect-ratio";

export default function AspectRatioDemo() {
  return (
    <div className="w-full max-w-md">
      <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg border bg-accent bg-grid shadow-block-sm">
        <div className="flex size-full items-center justify-center text-[#b7ca9e]">
          <Castle className="size-14 stroke-[1.25]" />
        </div>
        <span className="absolute top-3 left-4 font-mono text-[9px] tracking-[0.2em] text-[#b7ca9e] uppercase">
          Screenshot
        </span>
        <span className="absolute right-4 bottom-3 font-mono text-[9px] tracking-[0.2em] text-[#b7ca9e]/70 uppercase">
          16 : 9
        </span>
      </AspectRatio>
    </div>
  );
}
