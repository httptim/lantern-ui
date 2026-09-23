import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden whitespace-nowrap border font-mono text-[10px] leading-none tracking-[0.12em] uppercase transition-colors [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "rounded-sm border-transparent bg-primary px-2 py-1 text-primary-foreground",
        outline: "rounded-none border-[#647160] px-1.5 py-1 text-[#b8c2b2]",
        secondary: "rounded-sm border-transparent bg-secondary px-2 py-1 text-secondary-foreground",
        success: "rounded-sm border-success/40 bg-success/10 px-2 py-1 text-success",
        warning: "rounded-sm border-warning/40 bg-warning/10 px-2 py-1 text-warning",
        destructive: "rounded-sm border-destructive/40 bg-destructive/10 px-2 py-1 text-destructive",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span";
  return <Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
