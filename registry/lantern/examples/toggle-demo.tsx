import { BookmarkIcon } from "lucide-react";

import { Toggle } from "@/registry/lantern/ui/toggle";

export default function ToggleDemo() {
  return (
    <div className="flex items-center gap-2">
      <Toggle aria-label="Bookmark site">
        <BookmarkIcon />
      </Toggle>
      <Toggle aria-label="Bookmark site (on)" defaultPressed>
        <BookmarkIcon />
      </Toggle>
      <Toggle aria-label="Bookmark site (disabled)" disabled>
        <BookmarkIcon />
      </Toggle>
    </div>
  );
}
