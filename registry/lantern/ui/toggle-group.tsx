"use client";

import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";
import { toggleVariants } from "@/registry/lantern/ui/toggle";

const ToggleGroupContext = React.createContext<VariantProps<typeof toggleVariants>>({
  size: "default",
  variant: "default",
});

function ToggleGroup({
  className,
  variant,
  size,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> & VariantProps<typeof toggleVariants>) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      data-variant={variant ?? "default"}
      data-size={size ?? "default"}
      className={cn(
        "group/toggle-group flex w-fit items-center rounded-md data-[variant=default]:gap-1 data-[variant=outline]:shadow-[3px_3px_0_var(--shadow-block)]",
        className,
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>{children}</ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
}

function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> & VariantProps<typeof toggleVariants>) {
  const context = React.useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={context.variant || variant || "default"}
      data-size={context.size || size || "default"}
      className={cn(
        toggleVariants({ variant: context.variant || variant, size: context.size || size }),
        "min-w-0 flex-1 shrink-0 shadow-none focus:z-10 focus-visible:z-10",
        "data-[variant=outline]:rounded-none data-[variant=outline]:focus-visible:ring-offset-0 data-[variant=outline]:first:rounded-l-md data-[variant=outline]:last:rounded-r-md",
        "data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l data-[variant=outline]:data-[state=on]:border-input",
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
}

export { ToggleGroup, ToggleGroupItem };
