import { CpuIcon, MonitorIcon, TabletSmartphoneIcon } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/registry/lantern/ui/toggle-group";

export default function ToggleGroupMultiple() {
  return (
    <div className="grid gap-3">
      <span id="tg-devices" className="font-mono text-[10px] tracking-[0.2em] text-success uppercase">
        Show devices
      </span>
      <ToggleGroup type="multiple" size="sm" defaultValue={["computers", "turtles"]} aria-labelledby="tg-devices">
        <ToggleGroupItem value="computers">
          <MonitorIcon />
          Computers
        </ToggleGroupItem>
        <ToggleGroupItem value="turtles">
          <CpuIcon />
          Turtles
        </ToggleGroupItem>
        <ToggleGroupItem value="pocket">
          <TabletSmartphoneIcon />
          Pocket
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
