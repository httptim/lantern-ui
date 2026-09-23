"use client";

import * as React from "react";
import { MinusIcon, PlusIcon } from "lucide-react";

import { Button } from "@/registry/lantern/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/lantern/ui/drawer";

const history = [40, 64, 32, 80, 56, 72, 48];

export default function DrawerDemo() {
  const [fuel, setFuel] = React.useState(64);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="secondary">Refuel turtle</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Refuel miner-02</DrawerTitle>
            <DrawerDescription>Pick how much coal to load before the next run.</DrawerDescription>
          </DrawerHeader>
          <div className="px-5 pb-2">
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setFuel((f) => Math.max(8, f - 8))}
                disabled={fuel <= 8}
                aria-label="Less coal"
              >
                <MinusIcon />
              </Button>
              <div className="flex-1 text-center">
                <div className="font-display text-6xl font-medium tracking-tighter tabular-nums">{fuel}</div>
                <div className="mt-1 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">Coal per run</div>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setFuel((f) => Math.min(128, f + 8))}
                disabled={fuel >= 128}
                aria-label="More coal"
              >
                <PlusIcon />
              </Button>
            </div>
            <div className="mt-6 flex h-20 items-end gap-2" aria-hidden="true">
              {history.map((h, i) => (
                <div key={i} className="flex-1 rounded-t-sm bg-secondary" style={{ height: `${(h / 128) * 100}%` }} />
              ))}
              <div className="flex-1 rounded-t-sm bg-primary transition-[height]" style={{ height: `${(fuel / 128) * 100}%` }} />
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button>Load {fuel} coal</Button>
            </DrawerClose>
            <DrawerClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
