"use client";

import * as React from "react";
import { Tabs as TabsPrimitive } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

type TabsVariant = "line" | "boxed";

const TabsVariantContext = React.createContext<TabsVariant>("line");

function Tabs({
  className,
  variant = "line",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root> & { variant?: TabsVariant }) {
  return (
    <TabsVariantContext.Provider value={variant}>
      <TabsPrimitive.Root
        data-slot="tabs"
        data-variant={variant}
        className={cn("flex flex-col gap-4 data-[orientation=vertical]:flex-row", className)}
        {...props}
      />
    </TabsVariantContext.Provider>
  );
}

const tabsListVariants = cva("inline-flex max-w-full items-center overflow-x-auto [scrollbar-width:none]", {
  variants: {
    variant: {
      line: "w-full gap-6 border-b",
      boxed: "w-fit gap-1 rounded-md border bg-card p-1",
    },
  },
  defaultVariants: { variant: "line" },
});

function TabsList({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> & VariantProps<typeof tabsListVariants>) {
  const contextVariant = React.useContext(TabsVariantContext);
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(tabsListVariants({ variant: variant ?? contextVariant }), className)}
      {...props}
    />
  );
}

const tabsTriggerVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 font-mono text-[11px] font-semibold tracking-[0.16em] whitespace-nowrap uppercase transition-colors outline-none disabled:pointer-events-none disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-ring/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
  {
    variants: {
      variant: {
        line: "relative -mb-px h-10 border-b-2 border-transparent px-0.5 text-muted-foreground hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-foreground",
        boxed:
          "h-8 rounded-sm px-3 text-muted-foreground hover:text-foreground data-[state=active]:bg-secondary data-[state=active]:text-primary data-[state=active]:shadow-[inset_0_0_0_1px_var(--color-input)]",
      },
    },
    defaultVariants: { variant: "line" },
  },
);

function TabsTrigger({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger> & VariantProps<typeof tabsTriggerVariants>) {
  const contextVariant = React.useContext(TabsVariantContext);
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(tabsTriggerVariants({ variant: variant ?? contextVariant }), className)}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/25", className)}
      {...props}
    />
  );
}

export { Tabs, TabsContent, TabsList, TabsTrigger, tabsListVariants, tabsTriggerVariants };
