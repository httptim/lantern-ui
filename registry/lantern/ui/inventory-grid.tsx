"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type InventoryContextValue = {
  columns: number;
  count: number;
  size: "default" | "sm";
  selected: number | null;
  focusIndex: number;
  select: (index: number) => void;
  register: (index: number, el: HTMLButtonElement | null) => void;
};

const InventoryContext = React.createContext<InventoryContextValue | null>(null);
const SlotIndexContext = React.createContext(-1);

function useInventory() {
  const context = React.useContext(InventoryContext);
  if (!context) throw new Error("InventorySlot must be used within <InventoryGrid />");
  return context;
}

/**
 * TurtleDeck's inventory: square slots on a faint grid. Arrow keys, Home and End move the selection.
 * Children are InventorySlot elements in reading order; they are split into rows of `columns`.
 */
function InventoryGrid({
  className,
  children,
  columns = 4,
  size = "default",
  value,
  defaultValue = null,
  onValueChange,
  style,
  ...props
}: Omit<React.ComponentProps<"div">, "defaultValue" | "onChange"> & {
  columns?: number;
  size?: "default" | "sm";
  /** Selected slot index (controlled). */
  value?: number | null;
  defaultValue?: number | null;
  onValueChange?: (index: number) => void;
}) {
  const [internal, setInternal] = React.useState<number | null>(defaultValue);
  const selected = value !== undefined ? value : internal;
  const slots = React.Children.toArray(children).filter(React.isValidElement);
  const count = slots.length;
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const select = React.useCallback(
    (index: number) => {
      if (value === undefined) setInternal(index);
      onValueChange?.(index);
    },
    [value, onValueChange],
  );

  const register = React.useCallback((index: number, el: HTMLButtonElement | null) => {
    refs.current[index] = el;
  }, []);

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const current = selected ?? 0;
    const row = Math.floor(current / columns);
    let next: number | null = null;
    switch (event.key) {
      case "ArrowRight":
        next = Math.min(current + 1, count - 1);
        break;
      case "ArrowLeft":
        next = Math.max(current - 1, 0);
        break;
      case "ArrowDown":
        next = current + columns < count ? current + columns : current;
        break;
      case "ArrowUp":
        next = current - columns >= 0 ? current - columns : current;
        break;
      case "Home":
        next = event.ctrlKey ? 0 : row * columns;
        break;
      case "End":
        next = event.ctrlKey ? count - 1 : Math.min(row * columns + columns - 1, count - 1);
        break;
      default:
        return;
    }
    event.preventDefault();
    if (next !== selected) select(next);
    refs.current[next]?.focus();
  }

  const rows: React.ReactElement[][] = [];
  slots.forEach((slot, index) => {
    const r = Math.floor(index / columns);
    (rows[r] ??= []).push(
      <SlotIndexContext.Provider key={slot.key ?? index} value={index}>
        {slot}
      </SlotIndexContext.Provider>,
    );
  });

  return (
    <InventoryContext.Provider
      value={{ columns, count, size, selected, focusIndex: selected ?? 0, select, register }}
    >
      <div
        role="grid"
        data-slot="inventory-grid"
        data-size={size}
        onKeyDown={onKeyDown}
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, ...style }}
        className={cn(
          "grid w-full gap-1.5 rounded-lg border bg-card bg-grid p-2 [background-size:12px_12px] data-[size=sm]:gap-1 data-[size=sm]:p-1.5",
          className,
        )}
        {...props}
      >
        {rows.map((cells, r) => (
          <div role="row" key={r} className="contents">
            {cells}
          </div>
        ))}
      </div>
    </InventoryContext.Provider>
  );
}

/** One square slot. Leave out name to render an empty, dimmed slot. */
function InventorySlot({
  className,
  name,
  count,
  color = "#8a8f86",
  icon,
  onClick,
  ...props
}: React.ComponentProps<"button"> & {
  /** Short item name. Omit for an empty slot. */
  name?: string;
  count?: number;
  /** Swatch color for the item. */
  color?: string;
  /** Optional content drawn inside the swatch. */
  icon?: React.ReactNode;
}) {
  const inventory = useInventory();
  const index = React.useContext(SlotIndexContext);
  const selected = inventory.selected === index;
  const empty = !name;
  const sm = inventory.size === "sm";

  return (
    <div role="gridcell" aria-selected={selected} className="min-w-0">
      <button
        ref={(el) => inventory.register(index, el)}
        type="button"
        data-slot="inventory-slot"
        data-selected={selected || undefined}
        data-empty={empty || undefined}
        tabIndex={index === inventory.focusIndex ? 0 : -1}
        aria-label={empty ? `Slot ${index + 1}, empty` : `Slot ${index + 1}, ${name}${count ? `, ${count}` : ""}`}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) inventory.select(index);
        }}
        className={cn(
          "group/slot relative flex aspect-square w-full cursor-pointer flex-col items-center justify-center gap-1 overflow-hidden rounded-sm border border-border bg-[#0d1210] p-1 outline-none transition-[border-color,background-color,box-shadow]",
          "shadow-[inset_2px_2px_0_rgba(0,0,0,0.45),inset_-1px_-1px_0_rgba(255,255,255,0.04)] hover:border-muted-foreground/60 hover:bg-[#131a17]",
          "focus-visible:ring-2 focus-visible:ring-ring/40",
          "data-[selected]:border-primary data-[selected]:bg-primary/8 data-[selected]:shadow-[inset_0_0_0_1px_var(--primary)]",
          "data-[empty]:bg-[#0d1210]/50",
          className,
        )}
        {...props}
      >
        {!empty && (
          <>
            <span
              aria-hidden="true"
              className={cn(
                "flex items-center justify-center rounded-[2px] text-[#0d1210] [&_svg]:size-3/5",
                sm ? "size-[55%]" : "size-[46%]",
                "shadow-[inset_2px_2px_0_rgba(255,255,255,0.28),inset_-2px_-2px_0_rgba(0,0,0,0.38)]",
              )}
              style={{ backgroundColor: color }}
            >
              {icon}
            </span>
            {!sm && (
              <span
                aria-hidden="true"
                className="w-full truncate px-0.5 text-center font-mono text-[9px] leading-none tracking-[0.04em] text-muted-foreground uppercase group-data-[selected]/slot:text-foreground"
              >
                {name}
              </span>
            )}
            {count != null && count > 1 && (
              <span
                aria-hidden="true"
                className={cn(
                  "absolute right-1 font-mono leading-none font-semibold text-foreground tabular-nums [text-shadow:1px_1px_0_#000]",
                  sm ? "bottom-0.5 text-[9px]" : "top-1 text-[10px]",
                )}
              >
                {count}
              </span>
            )}
          </>
        )}
      </button>
    </div>
  );
}

export { InventoryGrid, InventorySlot };
