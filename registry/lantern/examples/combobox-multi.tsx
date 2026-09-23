"use client";

import * as React from "react";

import { ComboboxMulti } from "@/registry/lantern/ui/combobox";

const tags = [
  "turtles",
  "rednet",
  "mining",
  "farming",
  "storage",
  "monitors",
  "guestbook",
  "shops",
].map((tag) => ({ value: tag, label: tag }));

export default function ComboboxMultiDemo() {
  const [value, setValue] = React.useState<string[]>(["turtles", "rednet"]);

  return (
    <div className="w-full max-w-80">
      <ComboboxMulti
        aria-label="Tags"
        options={tags}
        value={value}
        onChange={setValue}
        placeholder="Pick tags"
        searchPlaceholder="Search tags..."
        empty="No tag found."
      />
    </div>
  );
}
