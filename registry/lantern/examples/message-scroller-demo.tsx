"use client";

import * as React from "react";
import { Cpu, SendHorizontal } from "lucide-react";

import { Avatar, AvatarFallback } from "@/registry/lantern/ui/avatar";
import { Bubble, BubbleContent } from "@/registry/lantern/ui/bubble";
import { Button } from "@/registry/lantern/ui/button";
import { Input } from "@/registry/lantern/ui/input";
import { Marker, MarkerContent } from "@/registry/lantern/ui/marker";
import { Message, MessageAvatar, MessageContent, MessageFooter } from "@/registry/lantern/ui/message";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
  useMessageScroller,
} from "@/registry/lantern/ui/message-scroller";
import { StatusDot } from "@/registry/lantern/ui/status-dot";

type ChatMessage = { id: string; from: "me" | "hub"; text: string; time: string };

const seed: ChatMessage[] = [
  ["hub", "Morning. Deepstone came back online at 06:10."],
  ["me", "Nice. Any players on yet?"],
  ["hub", "Two. moss_builder and river_kay are at spawn."],
  ["me", "Can you check on turtle T-03?"],
  ["hub", "T-03 is mining the north tunnel, depth 41."],
  ["hub", "Fuel is at 38 percent, enough for about 900 moves."],
  ["me", "Good. Queue a return trip when it drops under 20."],
  ["hub", "Done. I will ping you when it heads home."],
  ["me", "Also, did anyone sign the guestbook overnight?"],
  ["hub", "Three new entries. One asks for a map of the tunnels."],
  ["me", "Pin that one, I will draw a map later."],
  ["hub", "Pinned to the top of guestbook.hub."],
].map(([from, text], index) => ({
  id: `seed-${index}`,
  from: from as ChatMessage["from"],
  text,
  time: `08:${String(10 + index * 3).padStart(2, "0")}`,
}));

const replies = [
  "Copy that.",
  "Logged it on the hub terminal.",
  "T-03 says hello. It is still digging.",
  "Queued. I will report back when it finishes.",
  "The guestbook has one more visitor since you asked.",
];

function now() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
}

function Chat() {
  const [messages, setMessages] = React.useState<ChatMessage[]>(seed);
  const [draft, setDraft] = React.useState("");
  const [typing, setTyping] = React.useState(false);
  const { scrollToEnd } = useMessageScroller();
  const followRef = React.useRef(false);
  const replyIndex = React.useRef(0);
  const timeout = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (followRef.current) {
      followRef.current = false;
      scrollToEnd({ behavior: "smooth" });
    }
  }, [messages, scrollToEnd]);

  React.useEffect(() => () => {
    if (timeout.current) window.clearTimeout(timeout.current);
  }, []);

  function send(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    followRef.current = true;
    setMessages((current) => [...current, { id: crypto.randomUUID(), from: "me", text, time: now() }]);
    setDraft("");
    setTyping(true);
    if (timeout.current) window.clearTimeout(timeout.current);
    timeout.current = window.setTimeout(() => {
      const reply = replies[replyIndex.current++ % replies.length];
      setTyping(false);
      setMessages((current) => [...current, { id: crypto.randomUUID(), from: "hub", text: reply, time: now() }]);
    }, 900);
  }

  return (
    <>
      <MessageScroller className="flex-1">
        <MessageScrollerViewport aria-label="Hub chat messages">
          <MessageScrollerContent className="gap-4 px-3 py-4 sm:px-4">
            <MessageScrollerItem>
              <Marker variant="separator" role="separator">
                <MarkerContent>Today</MarkerContent>
              </Marker>
            </MessageScrollerItem>
            {messages.map((message) => (
              <MessageScrollerItem key={message.id} messageId={message.id}>
                <Message align={message.from === "me" ? "end" : "start"}>
                  {message.from === "hub" && (
                    <MessageAvatar>
                      <Avatar>
                        <AvatarFallback>
                          <Cpu className="size-4" />
                        </AvatarFallback>
                      </Avatar>
                    </MessageAvatar>
                  )}
                  <MessageContent>
                    <Bubble variant={message.from === "me" ? "default" : "muted"}>
                      <BubbleContent>{message.text}</BubbleContent>
                    </Bubble>
                    <MessageFooter>
                      <time>{message.time}</time>
                    </MessageFooter>
                  </MessageContent>
                </Message>
              </MessageScrollerItem>
            ))}
            {typing && (
              <MessageScrollerItem>
                <Marker aria-live="polite" className="animate-lantern-pulse ps-11">
                  <MarkerContent>Hub terminal is typing</MarkerContent>
                </Marker>
              </MessageScrollerItem>
            )}
          </MessageScrollerContent>
        </MessageScrollerViewport>
        <MessageScrollerButton />
      </MessageScroller>
      <form onSubmit={send} className="flex gap-2 border-t bg-card p-3">
        <Input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Message the hub"
          aria-label="Message"
          autoComplete="off"
        />
        <Button type="submit" size="icon" aria-label="Send message" disabled={!draft.trim()}>
          <SendHorizontal />
        </Button>
      </form>
    </>
  );
}

export default function MessageScrollerDemo() {
  return (
    <div className="flex h-[480px] w-full max-w-lg flex-col overflow-hidden rounded-lg border bg-background shadow-block-sm">
      <div className="flex items-center justify-between gap-3 border-b bg-card px-4 py-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <StatusDot tone="online" />
          <span className="truncate font-display text-sm font-medium tracking-tight">hub-chat</span>
        </div>
        <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">deepstone</span>
      </div>
      <MessageScrollerProvider autoScroll>
        <Chat />
      </MessageScrollerProvider>
    </div>
  );
}
