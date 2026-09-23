"use client";

import * as React from "react";

import {
  Guestbook,
  GuestbookComposer,
  GuestbookEntry,
  GuestbookHeader,
  GuestbookList,
} from "@/registry/lantern/ui/guestbook";

type Entry = { id: number; name: string; time: number; message: string };

export default function GuestbookDemo() {
  const [entries, setEntries] = React.useState<Entry[]>(() => {
    const now = Date.now();
    return [
      { id: 3, name: "turtle_wrangler", time: now - 4 * 60_000, message: "Found this hub from the spawn tower. The radio page is great." },
      { id: 2, name: "Moss Keeper", time: now - 3 * 3_600_000, message: "Left some torches by the east tunnel for whoever comes next." },
      { id: 1, name: "ore_baron", time: now - 2 * 86_400_000, message: "First." },
    ];
  });

  return (
    <Guestbook className="w-full max-w-lg">
      <GuestbookHeader>
        Guestbook
        <span className="text-muted-foreground">{entries.length} signatures</span>
      </GuestbookHeader>
      <GuestbookComposer
        onSign={(message) =>
          setEntries((prev) => [{ id: Date.now(), name: "You", time: Date.now(), message }, ...prev])
        }
      />
      <GuestbookList>
        {entries.map((entry) => (
          <GuestbookEntry key={entry.id} name={entry.name} time={entry.time} message={entry.message} />
        ))}
      </GuestbookList>
    </Guestbook>
  );
}
