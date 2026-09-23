"use client";

import * as React from "react";

import { Calendar } from "@/registry/lantern/ui/calendar";

export default function CalendarDropdown() {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2012, 6, 19));

  return (
    <Calendar
      mode="single"
      captionLayout="dropdown"
      defaultMonth={date}
      startMonth={new Date(2010, 0)}
      endMonth={new Date(new Date().getFullYear(), 11)}
      selected={date}
      onSelect={setDate}
      className="rounded-lg border shadow-block-sm"
    />
  );
}
