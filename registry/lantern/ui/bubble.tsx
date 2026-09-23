import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

function BubbleGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="bubble-group" className={cn("flex min-w-0 flex-col gap-1.5", className)} {...props} />;
}

// The default bubble is the Lantern "sent" style: raised secondary panel with an orange edge on the
// side it is aligned to. muted is the card panel used for replies from other people or the assistant.
const bubbleVariants = cva(
  "group/bubble relative flex w-fit max-w-[80%] min-w-0 flex-col gap-1 group-data-[align=end]/message:self-end data-[align=end]:self-end data-[variant=ghost]:max-w-full",
  {
    variants: {
      variant: {
        default: [
          "*:data-[slot=bubble-content]:border-border *:data-[slot=bubble-content]:bg-secondary *:data-[slot=bubble-content]:text-secondary-foreground",
          "*:data-[slot=bubble-content]:border-s-2 *:data-[slot=bubble-content]:border-s-primary",
          "data-[align=end]:*:data-[slot=bubble-content]:border-s data-[align=end]:*:data-[slot=bubble-content]:border-s-border data-[align=end]:*:data-[slot=bubble-content]:border-e-2 data-[align=end]:*:data-[slot=bubble-content]:border-e-primary",
          "group-data-[align=end]/message:*:data-[slot=bubble-content]:border-s group-data-[align=end]/message:*:data-[slot=bubble-content]:border-s-border group-data-[align=end]/message:*:data-[slot=bubble-content]:border-e-2 group-data-[align=end]/message:*:data-[slot=bubble-content]:border-e-primary",
          "[&>[data-slot=bubble-content]:is(button,a):hover]:bg-[#27312b]",
        ],
        secondary:
          "*:data-[slot=bubble-content]:border-border *:data-[slot=bubble-content]:bg-secondary *:data-[slot=bubble-content]:text-secondary-foreground [&>[data-slot=bubble-content]:is(button,a):hover]:bg-[#27312b]",
        muted:
          "*:data-[slot=bubble-content]:border-border *:data-[slot=bubble-content]:bg-card *:data-[slot=bubble-content]:text-card-foreground [&>[data-slot=bubble-content]:is(button,a):hover]:bg-secondary",
        tinted:
          "*:data-[slot=bubble-content]:border-primary/30 *:data-[slot=bubble-content]:bg-primary/10 *:data-[slot=bubble-content]:text-foreground [&>[data-slot=bubble-content]:is(button,a):hover]:bg-primary/16",
        outline:
          "*:data-[slot=bubble-content]:border-input *:data-[slot=bubble-content]:bg-background [&>[data-slot=bubble-content]:is(button,a):hover]:bg-secondary",
        ghost:
          "border-none *:data-[slot=bubble-content]:rounded-none *:data-[slot=bubble-content]:bg-transparent *:data-[slot=bubble-content]:p-0 [&>[data-slot=bubble-content]:is(button,a):hover]:text-primary",
        destructive:
          "*:data-[slot=bubble-content]:border-destructive/40 *:data-[slot=bubble-content]:bg-destructive/10 *:data-[slot=bubble-content]:text-destructive [&>[data-slot=bubble-content]:is(button,a):hover]:bg-destructive/20",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

function Bubble({
  variant = "default",
  align = "start",
  className,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof bubbleVariants> & { align?: "start" | "end" }) {
  return (
    <div
      data-slot="bubble"
      data-variant={variant}
      data-align={align}
      className={cn(bubbleVariants({ variant }), className)}
      {...props}
    />
  );
}

function BubbleContent({ asChild = false, className, ...props }: React.ComponentProps<"div"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "div";

  return (
    <Comp
      data-slot="bubble-content"
      className={cn(
        "w-fit max-w-full min-w-0 overflow-hidden rounded-lg border border-transparent px-3 py-2 text-sm leading-relaxed wrap-break-word group-data-[align=end]/bubble:self-end",
        "[button]:cursor-pointer [button]:text-left [button,a]:transition-colors [button,a]:outline-none [button,a]:focus-visible:border-primary [button,a]:focus-visible:ring-2 [button,a]:focus-visible:ring-ring/25",
        className,
      )}
      {...props}
    />
  );
}

const bubbleReactionsVariants = cva(
  "absolute z-10 flex w-fit shrink-0 items-center justify-center gap-1 rounded-sm border border-input bg-popover px-1.5 py-0.5 font-mono text-[11px] text-foreground shadow-[2px_3px_0_var(--block-shadow)] has-[button]:p-0 [&_svg:not([class*='size-'])]:size-3",
  {
    variants: {
      side: {
        top: "top-0 -translate-y-3/4",
        bottom: "bottom-0 translate-y-3/4",
      },
      align: {
        start: "left-3",
        end: "right-3",
      },
    },
    defaultVariants: { side: "bottom", align: "end" },
  },
);

function BubbleReactions({
  side = "bottom",
  align = "end",
  className,
  ...props
}: React.ComponentProps<"div"> & { align?: "start" | "end"; side?: "top" | "bottom" }) {
  return (
    <div
      data-slot="bubble-reactions"
      data-align={align}
      data-side={side}
      className={cn(bubbleReactionsVariants({ side, align }), className)}
      {...props}
    />
  );
}

export { BubbleGroup, Bubble, BubbleContent, BubbleReactions };
