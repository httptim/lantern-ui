"use client";

import * as React from "react";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { DayPicker, getDefaultClassNames, type DayButton } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/registry/lantern/ui/button";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
}) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "group/calendar bg-card p-3 [--cell-size:--spacing(9)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className,
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) => date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn("relative flex flex-col gap-4 md:flex-row md:gap-6", defaultClassNames.months),
        month: cn("flex w-full flex-col gap-3", defaultClassNames.month),
        nav: cn("absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1", defaultClassNames.nav),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) p-0 select-none aria-disabled:opacity-40",
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) p-0 select-none aria-disabled:opacity-40",
          defaultClassNames.button_next,
        ),
        month_caption: cn(
          "flex h-(--cell-size) w-full items-center justify-center px-(--cell-size)",
          defaultClassNames.month_caption,
        ),
        dropdowns: cn(
          "flex h-(--cell-size) w-full items-center justify-center gap-1.5 text-sm font-medium",
          defaultClassNames.dropdowns,
        ),
        dropdown_root: cn(
          "relative rounded-md border border-input bg-background/40 transition-[border-color,box-shadow] hover:border-muted-foreground/60 has-focus:border-primary has-focus:ring-2 has-focus:ring-ring/25",
          defaultClassNames.dropdown_root,
        ),
        dropdown: cn("absolute inset-0 cursor-pointer bg-popover opacity-0", defaultClassNames.dropdown),
        caption_label: cn(
          "font-medium select-none",
          captionLayout === "label"
            ? "font-display text-[15px] tracking-tight"
            : "flex h-8 items-center gap-1 rounded-md pr-1.5 pl-2.5 text-[13px] [&>svg]:size-3.5 [&>svg]:text-muted-foreground",
          defaultClassNames.caption_label,
        ),
        month_grid: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "flex-1 pb-1 font-mono text-[10px] font-normal tracking-[0.12em] text-muted-foreground uppercase select-none",
          defaultClassNames.weekday,
        ),
        week: cn("mt-1 flex w-full", defaultClassNames.week),
        week_number_header: cn("w-(--cell-size) select-none", defaultClassNames.week_number_header),
        week_number: cn(
          "font-mono text-[10px] text-muted-foreground select-none",
          defaultClassNames.week_number,
        ),
        day: cn(
          "group/day relative aspect-square h-full w-full p-0 text-center select-none",
          "[&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md",
          defaultClassNames.day,
        ),
        range_start: cn("rounded-l-md bg-primary/15", defaultClassNames.range_start),
        range_middle: cn("rounded-none bg-primary/15", defaultClassNames.range_middle),
        range_end: cn("rounded-r-md bg-primary/15", defaultClassNames.range_end),
        today: cn("", defaultClassNames.today),
        outside: cn("text-muted-foreground/50 data-[selected=true]:bg-transparent", defaultClassNames.outside),
        disabled: cn("text-muted-foreground opacity-40", defaultClassNames.disabled),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => (
          <div data-slot="calendar" ref={rootRef} className={cn(className)} {...props} />
        ),
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") return <ChevronLeftIcon className={cn("size-4", className)} {...props} />;
          if (orientation === "right") return <ChevronRightIcon className={cn("size-4", className)} {...props} />;
          return <ChevronDownIcon className={cn("size-4", className)} {...props} />;
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => (
          <td {...props}>
            <div className="flex size-(--cell-size) items-center justify-center text-center">{children}</div>
          </td>
        ),
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({ className, day, modifiers, ...props }: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames();
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-today={modifiers.today}
      data-selected-single={
        modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "relative flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 rounded-md text-[13px] leading-none font-normal text-foreground tabular-nums active:translate-y-0",
        "hover:bg-secondary hover:text-foreground group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 focus-visible:ring-offset-card group-data-[outside=true]/day:bg-transparent! group-data-[outside=true]/day:font-normal! group-data-[outside=true]/day:text-muted-foreground/50! group-data-[outside=true]/day:after:hidden group-data-[outside=true]/day:hover:bg-secondary! group-data-[disabled=true]/day:text-muted-foreground",
        "data-[today=true]:font-semibold data-[today=true]:text-primary data-[today=true]:after:absolute data-[today=true]:after:bottom-1 data-[today=true]:after:left-1/2 data-[today=true]:after:size-1 data-[today=true]:after:-translate-x-1/2 data-[today=true]:after:rounded-full data-[today=true]:after:bg-primary",
        "data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-transparent data-[range-middle=true]:text-foreground data-[range-middle=true]:hover:bg-primary/20",
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:hover:bg-primary data-[selected-single=true]:font-semibold data-[selected-single=true]:text-primary-foreground! data-[selected-single=true]:after:bg-primary-foreground!",
        "data-[range-start=true]:rounded-md data-[range-start=true]:rounded-r-none data-[range-start=true]:bg-primary data-[range-start=true]:hover:bg-primary data-[range-start=true]:font-semibold data-[range-start=true]:text-primary-foreground! data-[range-start=true]:after:bg-primary-foreground!",
        "data-[range-end=true]:rounded-md data-[range-end=true]:rounded-l-none data-[range-end=true]:bg-primary data-[range-end=true]:hover:bg-primary data-[range-end=true]:font-semibold data-[range-end=true]:text-primary-foreground! data-[range-end=true]:after:bg-primary-foreground!",
        "data-[range-start=true]:data-[range-end=true]:rounded-md",
        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
