import { EyeIcon, WrapTextIcon } from "lucide-react";

import { Toggle } from "@/registry/lantern/ui/toggle";

export default function ToggleText() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Toggle variant="outline" defaultPressed>
        <EyeIcon />
        Live preview
      </Toggle>
      <Toggle variant="outline">
        <WrapTextIcon />
        Word wrap
      </Toggle>
    </div>
  );
}
