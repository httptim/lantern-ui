"use client";

import { ArrowRight, Search } from "lucide-react";

import { Badge } from "@/registry/lantern/ui/badge";
import { Button } from "@/registry/lantern/ui/button";
import { Checkbox } from "@/registry/lantern/ui/checkbox";
import { DirectionProvider, useDirection } from "@/registry/lantern/ui/direction";
import { Input } from "@/registry/lantern/ui/input";
import { Label } from "@/registry/lantern/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/lantern/ui/select";

function Panel({ id }: { id: string }) {
  const dir = useDirection();
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-card p-4">
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[10px] tracking-[0.2em] text-success uppercase">Guestbook</span>
        <Badge variant="outline">{dir}</Badge>
      </div>
      <div className="relative">
        <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input aria-label="Search entries" placeholder="Search entries" className="ps-9" />
      </div>
      <div className="flex items-center gap-3">
        <Checkbox id={`${id}-pin`} defaultChecked />
        <Label htmlFor={`${id}-pin`}>Pin newest entry</Label>
      </div>
      <div className="grid gap-2.5">
        <Label htmlFor={`${id}-sort`}>Sort entries</Label>
        <Select defaultValue="newest">
          <SelectTrigger id={`${id}-sort`} className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest first</SelectItem>
            <SelectItem value="oldest">Oldest first</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button className="w-full">
        Sign guestbook <ArrowRight className="rtl:rotate-180" />
      </Button>
    </div>
  );
}

export default function DirectionDemo() {
  return (
    <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-2">
      <DirectionProvider dir="ltr">
        <div dir="ltr">
          <Panel id="ltr" />
        </div>
      </DirectionProvider>
      <DirectionProvider dir="rtl">
        <div dir="rtl">
          <Panel id="rtl" />
        </div>
      </DirectionProvider>
    </div>
  );
}
