"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/registry/lantern/ui/button";
import { Calendar } from "@/registry/lantern/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/lantern/ui/popover";

type DatePreset<T> = { label: string; value: T | (() => T) };

const resolve = <T,>(value: T | (() => T)) => (typeof value === "function" ? (value as () => T)() : value);

function useWideScreen() {
  return React.useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia("(min-width: 768px)");
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(min-width: 768px)").matches,
    () => true,
  );
}

const triggerClass =
  "w-full min-w-0 justify-start px-3 text-left text-sm font-normal data-[empty=true]:text-muted-foreground/70 data-[state=open]:border-primary";

function PresetList<T>({
  presets,
  onPick,
}: {
  presets: DatePreset<T>[];
  onPick: (value: T) => void;
}) {
  return (
    <div
      data-slot="date-picker-presets"
      className="flex w-0 min-w-full flex-wrap gap-1 border-b p-2 sm:w-36 sm:min-w-0 sm:flex-col sm:flex-nowrap sm:border-r sm:border-b-0"
    >
      <p className="hidden px-2 pt-1.5 pb-1 font-mono text-[10px] tracking-[0.2em] text-success uppercase sm:block">
        Presets
      </p>
      {presets.map((preset) => (
        <Button
          key={preset.label}
          type="button"
          variant="ghost"
          size="sm"
          className="justify-start px-2 font-normal"
          onClick={() => onPick(resolve(preset.value))}
        >
          {preset.label}
        </Button>
      ))}
    </div>
  );
}

function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  dateFormat = "MMM d, yyyy",
  presets,
  disabled,
  className,
  calendarProps,
  id,
  ...aria
}: {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  /** date-fns format string for the trigger label. */
  dateFormat?: string;
  presets?: DatePreset<Date>[];
  disabled?: boolean;
  className?: string;
  calendarProps?: Omit<React.ComponentProps<typeof Calendar>, "mode" | "selected" | "onSelect">;
  id?: string;
  "aria-invalid"?: boolean;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [month, setMonth] = React.useState<Date | undefined>(value);

  const pick = (date: Date | undefined) => {
    onChange?.(date);
    if (date) setMonth(date);
    setOpen(false);
  };

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) setMonth(value);
      }}
    >
      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          variant="outline"
          disabled={disabled}
          data-slot="date-picker-trigger"
          data-empty={!value}
          className={cn(triggerClass, className)}
          {...aria}
        >
          <CalendarIcon className="text-muted-foreground" />
          <span className="truncate">{value ? format(value, dateFormat) : placeholder}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" collisionPadding={12} className="flex w-auto flex-col p-0 sm:flex-row">
        {presets && presets.length > 0 && <PresetList presets={presets} onPick={pick} />}
        <Calendar
          {...calendarProps}
          mode="single"
          month={month}
          onMonthChange={setMonth}
          selected={value}
          onSelect={pick}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  );
}

function DateRangePicker({
  value,
  onChange,
  placeholder = "Pick a date range",
  dateFormat = "MMM d, yyyy",
  numberOfMonths = 2,
  presets,
  disabled,
  className,
  calendarProps,
  id,
  ...aria
}: {
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
  placeholder?: string;
  dateFormat?: string;
  /** Months shown side by side on wide screens. Small screens always show one. */
  numberOfMonths?: number;
  presets?: DatePreset<DateRange>[];
  disabled?: boolean;
  className?: string;
  calendarProps?: Omit<React.ComponentProps<typeof Calendar>, "mode" | "selected" | "onSelect" | "numberOfMonths">;
  id?: string;
  "aria-invalid"?: boolean;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
}) {
  const wide = useWideScreen();
  const [open, setOpen] = React.useState(false);
  const [month, setMonth] = React.useState<Date | undefined>(value?.from);

  const label = value?.from
    ? value.to
      ? `${format(value.from, dateFormat)} - ${format(value.to, dateFormat)}`
      : format(value.from, dateFormat)
    : placeholder;

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) setMonth(value?.from);
      }}
    >
      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          variant="outline"
          disabled={disabled}
          data-slot="date-picker-trigger"
          data-empty={!value?.from}
          className={cn(triggerClass, className)}
          {...aria}
        >
          <CalendarIcon className="text-muted-foreground" />
          <span className="truncate">{label}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" collisionPadding={12} className="flex w-auto flex-col p-0 sm:flex-row">
        {presets && presets.length > 0 && (
          <PresetList
            presets={presets}
            onPick={(range) => {
              onChange?.(range);
              if (range.from) setMonth(range.from);
            }}
          />
        )}
        <Calendar
          {...calendarProps}
          mode="range"
          numberOfMonths={wide ? numberOfMonths : 1}
          month={month}
          onMonthChange={setMonth}
          selected={value}
          onSelect={onChange}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export { DatePicker, DateRangePicker, type DatePreset };
