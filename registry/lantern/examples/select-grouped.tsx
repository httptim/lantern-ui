import { CpuIcon, MonitorIcon, TabletSmartphoneIcon } from "lucide-react";

import { Label } from "@/registry/lantern/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/registry/lantern/ui/select";

export default function SelectGrouped() {
  return (
    <div className="grid w-full max-w-60 gap-2">
      <Label htmlFor="sel-host">Host computer</Label>
      <Select defaultValue="base-81">
        <SelectTrigger id="sel-host" className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Computers</SelectLabel>
            <SelectItem value="base-81">
              <MonitorIcon />
              Base #81
            </SelectItem>
            <SelectItem value="library-12">
              <MonitorIcon />
              Library #12
            </SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Turtles</SelectLabel>
            <SelectItem value="miner-3">
              <CpuIcon />
              Miner #3
            </SelectItem>
            <SelectItem value="farmer-7" disabled>
              <CpuIcon />
              Farmer #7 (offline)
            </SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Pocket</SelectLabel>
            <SelectItem value="pocket-2">
              <TabletSmartphoneIcon />
              Pocket #2
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
