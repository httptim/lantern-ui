import { CircleCheck, UserPlus } from "lucide-react";

import { Bubble, BubbleContent } from "@/registry/lantern/ui/bubble";
import { Marker, MarkerContent, MarkerIcon } from "@/registry/lantern/ui/marker";

export default function MarkerDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Marker variant="separator" role="separator">
        <MarkerContent>Yesterday</MarkerContent>
      </Marker>
      <Bubble variant="muted">
        <BubbleContent>Server restart at midnight.</BubbleContent>
      </Bubble>
      <Marker variant="separator" role="separator">
        <MarkerContent>Today</MarkerContent>
      </Marker>
      <Marker className="justify-center">
        <MarkerIcon>
          <UserPlus />
        </MarkerIcon>
        <MarkerContent>moss_builder joined the channel</MarkerContent>
      </Marker>
      <Bubble align="end">
        <BubbleContent>Welcome in. Tunnels are on the east wall.</BubbleContent>
      </Bubble>
      <Marker variant="border" className="text-success">
        <MarkerIcon>
          <CircleCheck />
        </MarkerIcon>
        <MarkerContent>
          Backup finished. <a href="#">View log</a>
        </MarkerContent>
      </Marker>
    </div>
  );
}
