"use client";

import * as React from "react";
import { CircleAlert, CircleCheck, Info, Loader2, TriangleAlert, X } from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

/** Lantern-styled toaster. Mount once near the root, then call toast() from anywhere. */
function Toaster({ toastOptions, ...props }: ToasterProps) {
  return (
    <Sonner
      theme="dark"
      className="toaster group font-sans!"
      icons={{
        success: <CircleCheck className="size-4 text-success" />,
        info: <Info className="size-4 text-info" />,
        warning: <TriangleAlert className="size-4 text-warning" />,
        error: <CircleAlert className="size-4 text-destructive" />,
        loading: <Loader2 className="size-4 animate-spin text-primary" />,
        close: <X className="size-3" />,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        ...toastOptions,
        classNames: {
          toast: "font-sans! shadow-block-sm! gap-3! border-border! px-4! py-3.5!",
          title: "text-sm! font-semibold! text-foreground!",
          description: "text-[13px]! text-muted-foreground!",
          icon: "self-start! mt-0.5!",
          actionButton:
            "h-7! rounded-sm! bg-primary! px-2.5! font-mono! text-[10px]! font-semibold! tracking-[0.12em]! text-primary-foreground! uppercase!",
          cancelButton:
            "h-7! rounded-sm! bg-secondary! px-2.5! font-mono! text-[10px]! tracking-[0.12em]! text-muted-foreground! uppercase!",
          closeButton: "border-input! bg-popover! text-muted-foreground! hover:text-foreground!",
          ...toastOptions?.classNames,
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
