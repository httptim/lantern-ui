import { Plus, Settings } from "lucide-react";

import { Button } from "@/registry/lantern/ui/button";

export default function ButtonSizes() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm">Small</Button>
      <Button>Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" variant="outline" aria-label="Add">
        <Plus />
      </Button>
      <Button size="icon-sm" variant="ghost" aria-label="Settings">
        <Settings />
      </Button>
    </div>
  );
}
