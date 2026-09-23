"use client";

import * as React from "react";

import { DatePicker } from "@/registry/lantern/ui/date-picker";

export default function DatePickerDemo() {
  const [date, setDate] = React.useState<Date | undefined>();

  return (
    <div className="w-full max-w-60">
      <DatePicker aria-label="Launch date" value={date} onChange={setDate} placeholder="Pick a launch date" />
    </div>
  );
}
