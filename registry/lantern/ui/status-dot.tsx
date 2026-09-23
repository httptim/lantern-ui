import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const statusDotVariants = cva("inline-block size-1.5 shrink-0 rounded-full", {
  variants: {
    tone: {
      online: "bg-[#a7c68c] shadow-[0_0_12px_#91aa7880]",
      busy: "bg-primary shadow-[0_0_12px_#f5a66560]",
      offline: "bg-input",
      error: "bg-destructive shadow-[0_0_12px_#e0715f60]",
    },
    pulse: { true: "animate-lantern-pulse", false: "" },
  },
  defaultVariants: { tone: "online", pulse: true },
});

function StatusDot({
  className,
  tone,
  pulse,
  label,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof statusDotVariants> & { label?: string }) {
  return (
    <span
      data-slot="status-dot"
      role={label ? "status" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn(statusDotVariants({ tone, pulse }), className)}
      {...props}
    />
  );
}

export { StatusDot, statusDotVariants };
