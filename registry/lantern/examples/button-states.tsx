import { Loader2 } from "lucide-react";

import { Button } from "@/registry/lantern/ui/button";

export default function ButtonStates() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button disabled>
        <Loader2 className="animate-spin" /> Publishing
      </Button>
      <Button variant="secondary" disabled>
        Disabled
      </Button>
      <Button variant="secondary" asChild>
        <a href="#">As a link</a>
      </Button>
    </div>
  );
}
