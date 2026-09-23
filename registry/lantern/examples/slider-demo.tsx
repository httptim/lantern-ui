"use client";

import * as React from "react";

import { Label } from "@/registry/lantern/ui/label";
import { Slider } from "@/registry/lantern/ui/slider";

export default function SliderDemo() {
  const [value, setValue] = React.useState([8]);

  return (
    <div className="grid w-full max-w-sm gap-4">
      <div className="flex items-center justify-between gap-3">
        <Label id="sl-radius-label">Render distance</Label>
        <span className="font-mono text-xs text-primary">{value[0]} chunks</span>
      </div>
      <Slider value={value} onValueChange={setValue} min={2} max={16} step={1} aria-labelledby="sl-radius-label" />
    </div>
  );
}
