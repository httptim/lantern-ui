"use client";

import * as React from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/registry/lantern/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/registry/lantern/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/lantern/ui/popover";

type ComboboxOption = {
  value: string;
  label: string;
  /** Extra words to match when searching. */
  keywords?: string[];
  icon?: React.ReactNode;
  disabled?: boolean;
};

const comboboxTrigger =
  "flex min-h-10 w-full min-w-0 cursor-pointer items-center justify-between gap-2 rounded-md border border-input bg-background/40 px-3 py-2 text-left text-sm text-foreground transition-[border-color,box-shadow] outline-none hover:border-muted-foreground/60 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/25 data-[state=open]:border-primary aria-invalid:border-destructive aria-invalid:ring-destructive/20 disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground";

type ComboboxBaseProps = {
  options: ComboboxOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  empty?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  contentClassName?: string;
  id?: string;
  "aria-invalid"?: boolean;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
};

function ComboboxOptions({
  options,
  searchPlaceholder,
  empty,
  isSelected,
  onSelect,
  multiple,
  search,
  onSearchChange,
  onInputKeyDown,
}: {
  options: ComboboxOption[];
  searchPlaceholder: string;
  empty: React.ReactNode;
  isSelected: (value: string) => boolean;
  onSelect: (value: string) => void;
  multiple?: boolean;
  search?: string;
  onSearchChange?: (search: string) => void;
  onInputKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
}) {
  return (
    <Command>
      <CommandInput
        placeholder={searchPlaceholder}
        value={search}
        onValueChange={onSearchChange}
        onKeyDown={onInputKeyDown}
      />
      <CommandList>
        <CommandEmpty>{empty}</CommandEmpty>
        <CommandGroup>
          {options.map((option) => {
            const selected = isSelected(option.value);
            return (
              <CommandItem
                key={option.value}
                value={option.value}
                keywords={[option.label, ...(option.keywords ?? [])]}
                disabled={option.disabled}
                onSelect={() => onSelect(option.value)}
                data-checked={selected}
                className="data-[checked=true]:text-primary"
              >
                {multiple && (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex size-4 items-center justify-center rounded-[3px] border border-input",
                      selected && "border-primary bg-primary text-primary-foreground",
                    )}
                  >
                    {selected && <CheckIcon className="size-3 text-primary-foreground" strokeWidth={3} />}
                  </span>
                )}
                {option.icon}
                <span className="truncate">{option.label}</span>
                {!multiple && (
                  <CheckIcon className={cn("ml-auto size-4 text-primary", selected ? "opacity-100" : "opacity-0")} />
                )}
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

function Combobox({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  searchPlaceholder = "Search...",
  empty = "No results found.",
  disabled,
  className,
  contentClassName,
  ...aria
}: ComboboxBaseProps & {
  value?: string;
  onChange?: (value: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const selected = options.find((option) => option.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          data-slot="combobox-trigger"
          className={cn(comboboxTrigger, className)}
          {...aria}
        >
          <span className={cn("flex min-w-0 items-center gap-2 truncate", !selected && "text-muted-foreground/70")}>
            {selected?.icon}
            <span className="truncate">{selected ? selected.label : placeholder}</span>
          </span>
          <ChevronsUpDownIcon className="size-4 opacity-80" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        collisionPadding={12}
        className={cn("w-(--radix-popover-trigger-width) min-w-[12rem] p-0", contentClassName)}
      >
        <ComboboxOptions
          options={options}
          searchPlaceholder={searchPlaceholder}
          empty={empty}
          isSelected={(v) => v === value}
          onSelect={(v) => {
            onChange?.(v);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

function ComboboxMulti({
  options,
  value = [],
  onChange,
  placeholder = "Select options",
  searchPlaceholder = "Search...",
  empty = "No results found.",
  maxShown = 3,
  disabled,
  className,
  contentClassName,
  ...aria
}: ComboboxBaseProps & {
  value?: string[];
  onChange?: (value: string[]) => void;
  /** Badges to show in the trigger before collapsing the rest into "+N". */
  maxShown?: number;
}) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const selected = value
    .map((v) => options.find((option) => option.value === v))
    .filter((option): option is ComboboxOption => Boolean(option));
  const shown = selected.slice(0, maxShown);
  const hidden = selected.length - shown.length;

  const toggle = (v: string) => onChange?.(value.includes(v) ? value.filter((item) => item !== v) : [...value, v]);

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setSearch("");
      }}
    >
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          data-slot="combobox-trigger"
          className={cn(comboboxTrigger, "py-1.5", className)}
          {...aria}
        >
          {selected.length === 0 ? (
            <span className="truncate text-muted-foreground/70">{placeholder}</span>
          ) : (
            <span className="flex min-w-0 flex-wrap items-center gap-1">
              {shown.map((option) => (
                <Badge key={option.value} variant="secondary" className="max-w-full py-1.5">
                  <span className="truncate">{option.label}</span>
                </Badge>
              ))}
              {hidden > 0 && (
                <Badge variant="outline" className="py-1.5">
                  +{hidden}
                </Badge>
              )}
              <span className="sr-only">{selected.map((option) => option.label).join(", ")}</span>
            </span>
          )}
          <ChevronsUpDownIcon className="size-4 opacity-80" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        collisionPadding={12}
        className={cn("w-(--radix-popover-trigger-width) min-w-[12rem] p-0", contentClassName)}
      >
        <ComboboxOptions
          multiple
          options={options}
          searchPlaceholder={searchPlaceholder}
          empty={empty}
          isSelected={(v) => value.includes(v)}
          onSelect={toggle}
          search={search}
          onSearchChange={setSearch}
          onInputKeyDown={(event) => {
            if (event.key === "Backspace" && search === "" && value.length > 0) {
              onChange?.(value.slice(0, -1));
            }
          }}
        />
        {value.length > 0 && (
          <div className="flex items-center justify-between border-t px-3 py-2">
            <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
              {value.length} selected
            </span>
            <button
              type="button"
              onClick={() => onChange?.([])}
              className="cursor-pointer rounded-sm px-1 font-mono text-[10px] tracking-[0.2em] text-primary uppercase outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring/25"
            >
              Clear
            </button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

export { Combobox, ComboboxMulti, type ComboboxOption };
