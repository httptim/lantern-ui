"use client";

import * as React from "react";

import { Label } from "@/registry/lantern/ui/label";
import { Slider } from "@/registry/lantern/ui/slider";

const fmt = (h: number) => `${String(h).padStart(2, "0")}:00`;

export default function SliderRange() {
  const [value, setValue] = React.useState([6, 18]);

  return (
    <div className="grid w-full max-w-sm gap-4">
      <div className="flex items-center justify-between gap-3">
        <Label id="sl-window-label">Sync window</Label>
        <span className="font-mono text-xs text-primary">
          {fmt(value[0])} to {fmt(value[1])}
        </span>
      </div>
      <Slider
        value={value}
        onValueChange={setValue}
        min={0}
        max={24}
        step={1}
        minStepsBetweenThumbs={1}
        aria-labelledby="sl-window-label"
      />
      <div className="flex justify-between font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
        <span>Dawn</span>
        <span>Dusk</span>
      </div>
    </div>
  );
}
