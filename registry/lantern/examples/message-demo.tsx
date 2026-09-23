import { Check, Cpu } from "lucide-react";

import { Avatar, AvatarFallback } from "@/registry/lantern/ui/avatar";
import { Bubble, BubbleContent, BubbleGroup } from "@/registry/lantern/ui/bubble";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@/registry/lantern/ui/message";

export default function MessageDemo() {
  return (
    <MessageGroup className="w-full max-w-md gap-5">
      <Message>
        <MessageAvatar>
          <Avatar>
            <AvatarFallback>
              <Cpu className="size-4" />
            </AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <MessageHeader>
            <span className="text-success">Hub terminal</span>
          </MessageHeader>
          <BubbleGroup>
            <Bubble variant="muted">
              <BubbleContent>Turtle T-03 finished the north tunnel.</BubbleContent>
            </Bubble>
            <Bubble variant="muted">
              <BubbleContent>Fuel is at 12 percent. Send it home?</BubbleContent>
            </Bubble>
          </BubbleGroup>
          <MessageFooter>
            <time dateTime="2026-09-22T09:41">09:41</time>
          </MessageFooter>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageContent>
          <Bubble>
            <BubbleContent>Yes, park it at the charging dock.</BubbleContent>
          </Bubble>
          <MessageFooter>
            <time dateTime="2026-09-22T09:42">09:42</time>
            <Check className="text-primary" aria-label="Read" />
          </MessageFooter>
        </MessageContent>
      </Message>
    </MessageGroup>
  );
}
