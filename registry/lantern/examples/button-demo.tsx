import { ArrowUpRight } from "lucide-react";

import { Button } from "@/registry/lantern/ui/button";

export default function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button>
        Make yourself at home <ArrowUpRight />
      </Button>
      <Button variant="secondary">Explore the network</Button>
    </div>
  );
}
