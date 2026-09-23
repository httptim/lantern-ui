import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const ambientVariants = cva(
  "pointer-events-none absolute h-[700px] w-[600px] max-w-full bg-[radial-gradient(var(--ambient-color),transparent_65%)] select-none",
  {
    variants: {
      position: {
        "top-right": "top-0 right-0",
        "top-left": "top-0 left-0",
        "bottom-right": "right-0 bottom-0",
        "bottom-left": "bottom-0 left-0",
        top: "top-0 left-1/2 -translate-x-1/2",
        center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
      },
      tone: {
        olive: "",
        amber: "",
      },
      intensity: {
        subtle: "",
        default: "",
        strong: "",
      },
    },
    compoundVariants: [
      { tone: "olive", intensity: "subtle", className: "[--ambient-color:#71703917]" },
      { tone: "olive", intensity: "default", className: "[--ambient-color:#71703926]" },
      { tone: "olive", intensity: "strong", className: "[--ambient-color:#7170394d]" },
      { tone: "amber", intensity: "subtle", className: "[--ambient-color:#f5a6650d]" },
      { tone: "amber", intensity: "default", className: "[--ambient-color:#f5a66517]" },
      { tone: "amber", intensity: "strong", className: "[--ambient-color:#f5a6652b]" },
    ],
    defaultVariants: { position: "top-right", tone: "olive", intensity: "default" },
  },
);

/**
 * The soft corner glow from the Lantern hero. A decorative, absolutely positioned layer:
 * put it inside a relative parent. Size it with className (it defaults to 600 by 700px).
 */
function Ambient({ className, position, tone, intensity, ...props }: React.ComponentProps<"div"> & VariantProps<typeof ambientVariants>) {
  return (
    <div
      data-slot="ambient"
      aria-hidden="true"
      className={cn(ambientVariants({ position, tone, intensity }), className)}
      {...props}
    />
  );
}

export { Ambient, ambientVariants };
