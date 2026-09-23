"use client";

import * as React from "react";
import { addDays } from "date-fns";
import type { DateRange } from "react-day-picker";

import { Calendar } from "@/registry/lantern/ui/calendar";

export default function CalendarRange() {
  const [range, setRange] = React.useState<DateRange | undefined>(() => {
    const today = new Date();
    return { from: addDays(today, -2), to: addDays(today, 4) };
  });

  return (
    <Calendar
      mode="range"
      numberOfMonths={2}
      defaultMonth={range?.from}
      selected={range}
      onSelect={setRange}
      className="rounded-lg border shadow-block-sm"
    />
  );
}
