import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function NativeSelect({
  className,
  size = "default",
  ...props
}: Omit<React.ComponentProps<"select">, "size"> & { size?: "sm" | "default" }) {
  return (
    <div
      data-slot="native-select-wrapper"
      className="group/native-select relative w-fit has-[select:disabled]:opacity-50"
    >
      <select
        data-slot="native-select"
        data-size={size}
        className={cn(
          "h-10 w-full min-w-0 cursor-pointer appearance-none rounded-md border border-input bg-background/40 px-3 py-2 pr-9 text-sm text-foreground transition-[border-color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground",
          "data-[size=sm]:h-8 data-[size=sm]:py-1 data-[size=sm]:text-xs",
          "hover:border-muted-foreground/60 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/25",
          "aria-invalid:border-destructive aria-invalid:ring-destructive/20 disabled:pointer-events-none disabled:cursor-not-allowed",
          className,
        )}
        {...props}
      />
      <ChevronDownIcon
        data-slot="native-select-icon"
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground opacity-80 select-none group-has-[select:focus-visible]/native-select:text-primary group-has-[select[aria-invalid=true]]/native-select:text-destructive"
      />
    </div>
  );
}

function NativeSelectOption({ className, ...props }: React.ComponentProps<"option">) {
  return <option data-slot="native-select-option" className={cn("bg-popover text-popover-foreground", className)} {...props} />;
}

function NativeSelectOptGroup({ className, ...props }: React.ComponentProps<"optgroup">) {
  return (
    <optgroup
      data-slot="native-select-optgroup"
      className={cn("bg-popover text-popover-foreground", className)}
      {...props}
    />
  );
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption };
