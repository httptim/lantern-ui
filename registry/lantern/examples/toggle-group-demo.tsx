import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/registry/lantern/ui/toggle-group";

export default function ToggleGroupDemo() {
  return (
    <div className="flex flex-col items-start gap-6">
      <ToggleGroup type="single" variant="outline" defaultValue="left" aria-label="Text alignment">
        <ToggleGroupItem value="left" aria-label="Align left">
          <AlignLeftIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align center">
          <AlignCenterIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Align right">
          <AlignRightIcon />
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="single" variant="outline" size="sm" defaultValue="week" aria-label="Uptime range">
        <ToggleGroupItem value="day" className="px-3">Day</ToggleGroupItem>
        <ToggleGroupItem value="week" className="px-3">Week</ToggleGroupItem>
        <ToggleGroupItem value="month" className="px-3">Month</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
