"use client";

import * as React from "react";
import { addDays, startOfMonth, startOfWeek } from "date-fns";
import type { DateRange } from "react-day-picker";

import { DatePicker, DateRangePicker } from "@/registry/lantern/ui/date-picker";
import { Label } from "@/registry/lantern/ui/label";

export default function DatePickerPresets() {
  const [date, setDate] = React.useState<Date | undefined>();
  const [range, setRange] = React.useState<DateRange | undefined>();

  return (
    <div className="grid w-full max-w-80 gap-6">
      <div className="grid gap-2.5">
        <Label htmlFor="restart-date">Scheduled restart</Label>
        <DatePicker
          id="restart-date"
          value={date}
          onChange={setDate}
          placeholder="Pick a day"
          presets={[
            { label: "Today", value: () => new Date() },
            { label: "Tomorrow", value: () => addDays(new Date(), 1) },
            { label: "In a week", value: () => addDays(new Date(), 7) },
          ]}
        />
      </div>
      <div className="grid gap-2.5">
        <Label htmlFor="visits-range">Guestbook visits</Label>
        <DateRangePicker
          id="visits-range"
          value={range}
          onChange={setRange}
          presets={[
            { label: "Last 7 days", value: () => ({ from: addDays(new Date(), -6), to: new Date() }) },
            { label: "Last 30 days", value: () => ({ from: addDays(new Date(), -29), to: new Date() }) },
            { label: "This week", value: () => ({ from: startOfWeek(new Date()), to: new Date() }) },
            { label: "This month", value: () => ({ from: startOfMonth(new Date()), to: new Date() }) },
          ]}
        />
      </div>
    </div>
  );
}
