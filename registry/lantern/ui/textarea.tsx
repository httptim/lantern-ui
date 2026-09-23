import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-20 w-full min-w-0 rounded-md border border-input bg-background/40 px-3 py-2 text-sm leading-relaxed text-foreground transition-[border-color,box-shadow] outline-none placeholder:text-muted-foreground/70 selection:bg-primary selection:text-primary-foreground",
        "hover:border-muted-foreground/60 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/25",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
