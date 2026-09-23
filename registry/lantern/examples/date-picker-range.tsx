"use client";

import * as React from "react";
import { addDays } from "date-fns";
import type { DateRange } from "react-day-picker";

import { DateRangePicker } from "@/registry/lantern/ui/date-picker";
import { Label } from "@/registry/lantern/ui/label";

export default function DatePickerRange() {
  const [range, setRange] = React.useState<DateRange | undefined>(() => {
    const today = new Date();
    return { from: today, to: addDays(today, 6) };
  });

  return (
    <div className="grid w-full max-w-80 gap-2.5">
      <Label htmlFor="log-range">Server log range</Label>
      <DateRangePicker id="log-range" value={range} onChange={setRange} />
    </div>
  );
}
