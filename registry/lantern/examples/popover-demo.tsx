import { SlidersHorizontalIcon } from "lucide-react";

import { Button } from "@/registry/lantern/ui/button";
import { Input } from "@/registry/lantern/ui/input";
import { Label } from "@/registry/lantern/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/lantern/ui/popover";

export default function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">
          <SlidersHorizontalIcon />
          Turtle route
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="grid gap-1">
            <p className="font-mono text-[10px] font-semibold tracking-[0.2em] text-success uppercase">Route</p>
            <p className="text-sm text-muted-foreground">Set the mining area for turtle 07.</p>
          </div>
          <div className="grid gap-2.5">
            {[
              ["route-width", "Width", "16"],
              ["route-depth", "Depth", "32"],
              ["route-fuel", "Fuel stop", "every 64"],
            ].map(([id, label, value]) => (
              <div key={id} className="grid grid-cols-3 items-center gap-3">
                <Label htmlFor={id}>{label}</Label>
                <Input id={id} defaultValue={value} className="col-span-2 h-8" />
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
