"use client";

import { toast } from "sonner";

import { Button } from "@/registry/lantern/ui/button";

function syncSite() {
  return new Promise<{ name: string }>((resolve) => setTimeout(() => resolve({ name: "turtle.farm" }), 2000));
}

export default function SonnerDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button
        variant="outline"
        onClick={() => toast("Guestbook signed", { description: "Your note is pinned on guestbook.hub." })}
      >
        Default
      </Button>
      <Button variant="outline" onClick={() => toast.success("Site published", { description: "turtle.farm is live." })}>
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.error("Server unreachable", { description: "Deepstone stopped answering." })}
      >
        Error
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast("Turtle T-03 is low on fuel", {
            description: "95 moves left.",
            action: { label: "Refuel", onClick: () => toast.success("Refuel queued for T-03") },
          })
        }
      >
        With action
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.promise(syncSite(), {
            loading: "Syncing site...",
            success: (data) => `${data.name} synced`,
            error: "Sync failed",
          })
        }
      >
        Promise
      </Button>
    </div>
  );
}
