"use client";

import {
  AnnouncementBar,
  AnnouncementBarBadge,
  AnnouncementBarLink,
  AnnouncementBarMessage,
  resetAnnouncementBar,
} from "@/registry/lantern/ui/announcement-bar";
import { Button } from "@/registry/lantern/ui/button";

export default function AnnouncementBarDemo() {
  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-lg border bg-background">
      <AnnouncementBar id="hub-directory-v2">
        <AnnouncementBarBadge>New</AnnouncementBarBadge>
        <AnnouncementBarMessage>The hub directory now lists guestbooks.</AnnouncementBarMessage>
        <AnnouncementBarLink href="#">Read more</AnnouncementBarLink>
      </AnnouncementBar>
      <div className="flex min-h-40 flex-col items-center justify-center gap-3 p-6 text-center">
        <p className="text-sm text-muted-foreground">
          Dismiss the bar and reload: it stays hidden until you bring it back.
        </p>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => resetAnnouncementBar("hub-directory-v2")}
        >
          Show it again
        </Button>
      </div>
    </div>
  );
}
