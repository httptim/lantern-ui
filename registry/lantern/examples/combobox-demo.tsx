"use client";

import * as React from "react";
import { ServerIcon } from "lucide-react";

import { Combobox } from "@/registry/lantern/ui/combobox";

const servers = [
  { value: "quarry", label: "quarry.hub", keywords: ["mining"] },
  { value: "turtlewright", label: "turtlewright.hub", keywords: ["turtles"] },
  { value: "east-market", label: "east-market.hub", keywords: ["shop", "trade"] },
  { value: "relay-02", label: "relay-02.rednet", keywords: ["network"] },
  { value: "archive", label: "archive.hub", keywords: ["logs", "backup"] },
  { value: "mainframe", label: "mainframe.local", disabled: true },
].map((server) => ({ ...server, icon: <ServerIcon /> }));

export default function ComboboxDemo() {
  const [value, setValue] = React.useState("");

  return (
    <div className="w-full max-w-64">
      <Combobox
        aria-label="Server"
        options={servers}
        value={value}
        onChange={setValue}
        placeholder="Pick a server"
        searchPlaceholder="Search servers..."
        empty="No server found."
      />
    </div>
  );
}
