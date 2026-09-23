import { Bot, Plus } from "lucide-react";

import { Button } from "@/registry/lantern/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/registry/lantern/ui/empty";

export default function EmptyDemo() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia>
          <Bot />
        </EmptyMedia>
        <EmptyTitle>No turtles yet</EmptyTitle>
        <EmptyDescription>
          Place a turtle and run the pairing program to see its fuel, position and job here.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex flex-wrap justify-center gap-2">
          <Button>
            <Plus />
            Pair a turtle
          </Button>
          <Button variant="secondary">Read the guide</Button>
        </div>
      </EmptyContent>
    </Empty>
  );
}
