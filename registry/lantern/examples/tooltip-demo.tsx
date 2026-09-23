import { CopyIcon, RefreshCwIcon, TerminalSquareIcon, Trash2Icon } from "lucide-react";

import { Button } from "@/registry/lantern/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/registry/lantern/ui/tooltip";

const actions = [
  { label: "Open terminal", icon: TerminalSquareIcon },
  { label: "Copy address", icon: CopyIcon },
  { label: "Reboot computer", icon: RefreshCwIcon },
  { label: "Delete hub", icon: Trash2Icon },
];

export default function TooltipDemo() {
  return (
    <TooltipProvider>
      <div className="flex items-center gap-2">
        {actions.map(({ label, icon: Icon }) => (
          <Tooltip key={label}>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" aria-label={label}>
                <Icon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{label}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
