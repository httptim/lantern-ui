import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";

import { Toggle } from "@/registry/lantern/ui/toggle";

export default function ToggleOutline() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Toggle variant="outline" aria-label="Bold" defaultPressed>
        <BoldIcon />
      </Toggle>
      <Toggle variant="outline" aria-label="Italic">
        <ItalicIcon />
      </Toggle>
      <Toggle variant="outline" aria-label="Underline">
        <UnderlineIcon />
      </Toggle>
      <Toggle variant="outline" size="sm" aria-label="Bold, small">
        <BoldIcon />
      </Toggle>
      <Toggle variant="outline" size="lg" aria-label="Bold, large">
        <BoldIcon />
      </Toggle>
    </div>
  );
}
