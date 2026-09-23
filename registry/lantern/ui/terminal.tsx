import * as React from "react";

import { cn } from "@/lib/utils";

/** The tilted in-game terminal window from the Lantern hero. */
function Terminal({ className, tilt = false, ...props }: React.ComponentProps<"div"> & { tilt?: boolean }) {
  return (
    <div
      data-slot="terminal"
      className={cn(
        "relative overflow-hidden rounded-[11px] border border-terminal-border bg-terminal font-mono text-terminal-foreground shadow-block",
        tilt && "-rotate-2",
        className,
      )}
      {...props}
    />
  );
}

function TerminalHeader({
  className,
  children,
  lights = true,
  ...props
}: React.ComponentProps<"div"> & { lights?: boolean }) {
  return (
    <div
      data-slot="terminal-header"
      className={cn(
        "flex items-center justify-between gap-3 bg-terminal-bar px-[18px] py-3 text-xs text-[#d6dfbb] [&_svg]:size-3.5 [&_svg]:text-primary",
        className,
      )}
      {...props}
    >
      <span className="flex min-w-0 items-center gap-2 truncate">{children}</span>
      {lights && (
        <span aria-hidden="true" className="flex gap-1.5">
          <i className="size-1.5 rounded-full bg-[#849377]" />
          <i className="size-1.5 rounded-full bg-[#849377]" />
          <i className="size-1.5 rounded-full bg-[#849377]" />
        </span>
      )}
    </div>
  );
}

function TerminalAddress({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="terminal-address"
      className={cn("truncate border-b border-[#30412f] px-[18px] py-2.5 text-[11px] text-[#a8b89b]", className)}
      {...props}
    />
  );
}

function TerminalBody({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="terminal-body" className={cn("px-7 py-6 text-[13px] leading-[1.7]", className)} {...props} />;
}

function TerminalLine({
  className,
  prompt = "$",
  children,
  ...props
}: React.ComponentProps<"div"> & { prompt?: React.ReactNode }) {
  return (
    <div data-slot="terminal-line" className={cn("whitespace-pre-wrap", className)} {...props}>
      {prompt !== null && <span className="mr-2 text-primary select-none">{prompt}</span>}
      {children}
    </div>
  );
}

function TerminalOutput({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="terminal-output" className={cn("mb-3 whitespace-pre-wrap text-[#d9b774]", className)} {...props} />;
}

function TerminalCursor({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="terminal-cursor"
      aria-hidden="true"
      className={cn("inline-block h-[15px] w-2 animate-lantern-blink bg-terminal-foreground align-[-3px]", className)}
      {...props}
    />
  );
}

function TerminalFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="terminal-footer"
      className={cn("flex justify-between gap-3 bg-[#263625] px-4 py-2 text-[9px] tracking-wider text-[#8fa382] uppercase", className)}
      {...props}
    />
  );
}

export { Terminal, TerminalHeader, TerminalAddress, TerminalBody, TerminalLine, TerminalOutput, TerminalCursor, TerminalFooter };
