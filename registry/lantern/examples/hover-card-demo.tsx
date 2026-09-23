import { CalendarDaysIcon, ServerIcon } from "lucide-react";

import { Badge } from "@/registry/lantern/ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/registry/lantern/ui/hover-card";

export default function HoverCardDemo() {
  return (
    <p className="text-sm text-muted-foreground">
      Built by{" "}
      <HoverCard>
        <HoverCardTrigger asChild>
          <a
            href="#"
            className="rounded-sm text-primary underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
          >
            @turtlewright
          </a>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="flex gap-4">
            <div
              aria-hidden="true"
              className="flex size-11 shrink-0 items-center justify-center rounded-full border border-input bg-accent font-display text-lg font-semibold text-[#b7ca9e]"
            >
              T
            </div>
            <div className="grid min-w-0 gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-display text-base font-medium tracking-tight text-foreground">turtlewright</span>
                <Badge variant="success">Online</Badge>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Runs the quarry hub and a guestbook with 312 signatures. Mostly writes turtle scripts.
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
                <span className="inline-flex items-center gap-1.5">
                  <ServerIcon className="size-3" /> 3 hubs
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDaysIcon className="size-3" /> Since day 14
                </span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>{" "}
      on the east server.
    </p>
  );
}
