"use client";

import { ControlPad } from "@/registry/lantern/ui/control-pad";

export default function ControlPadCompact() {
  return <ControlPad keyboard="pad" showLabels={false} showHints={false} className="w-40" />;
}
