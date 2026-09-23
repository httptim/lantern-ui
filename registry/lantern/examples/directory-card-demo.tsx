import { BookOpen } from "lucide-react";

import { Badge } from "@/registry/lantern/ui/badge";
import {
  DirectoryCard,
  DirectoryCardArt,
  DirectoryCardCategory,
  DirectoryCardDescription,
  DirectoryCardFooter,
  DirectoryCardHeader,
  DirectoryCardTags,
  DirectoryCardTitle,
} from "@/registry/lantern/ui/directory-card";

export default function DirectoryCardDemo() {
  return (
    <DirectoryCard asChild className="w-full max-w-sm">
      <a href="#guestbook">
        <DirectoryCardArt address="hub://guestbook/">
          <BookOpen />
        </DirectoryCardArt>
        <DirectoryCardHeader>
          <DirectoryCardCategory>Community</DirectoryCardCategory>
          <DirectoryCardTitle>Lantern Guestbook</DirectoryCardTitle>
          <DirectoryCardDescription>Leave a little warmth for the next traveler.</DirectoryCardDescription>
          <DirectoryCardTags>
            <Badge variant="outline">Lua</Badge>
            <Badge variant="outline">Hub</Badge>
          </DirectoryCardTags>
        </DirectoryCardHeader>
        <DirectoryCardFooter status="online">
          Online
          <span className="ml-auto">Computer 4127</span>
        </DirectoryCardFooter>
      </a>
    </DirectoryCard>
  );
}
