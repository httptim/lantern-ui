"use client";

import * as React from "react";
import { Flame, ThumbsUp } from "lucide-react";

import { Bubble, BubbleContent, BubbleReactions } from "@/registry/lantern/ui/bubble";

export default function BubbleReactionsDemo() {
  const [liked, setLiked] = React.useState(false);

  return (
    <div className="flex w-full max-w-md flex-col gap-8 py-2">
      <Bubble variant="muted">
        <BubbleContent>New build is up at hub://skylands. Come look.</BubbleContent>
        <BubbleReactions>
          <Flame className="text-primary" />2
        </BubbleReactions>
      </Bubble>
      <Bubble align="end">
        <BubbleContent asChild>
          <button type="button" onClick={() => setLiked((value) => !value)} aria-pressed={liked}>
            Tap to like this message
          </button>
        </BubbleContent>
        <BubbleReactions align="start" hidden={!liked}>
          <ThumbsUp className="text-primary" />1
        </BubbleReactions>
      </Bubble>
    </div>
  );
}
