"use client";

import * as React from "react";

import { Checkbox } from "@/registry/lantern/ui/checkbox";
import { Label } from "@/registry/lantern/ui/label";

const tasks = [
  { id: "modem", label: "Attach a wireless modem" },
  { id: "install", label: "Run the Lantern installer" },
  { id: "claim", label: "Claim a hub address" },
  { id: "publish", label: "Publish your first page" },
];

export default function CheckboxChecklist() {
  const [done, setDone] = React.useState<string[]>(["modem", "install"]);
  const all = done.length === tasks.length;

  return (
    <div className="w-full max-w-sm rounded-lg border bg-card">
      <div className="flex items-center justify-between gap-3 border-b px-4 py-3">
        <div className="flex items-center gap-3">
          <Checkbox
            id="cl-all"
            checked={all ? true : done.length ? "indeterminate" : false}
            onCheckedChange={() => setDone(all ? [] : tasks.map((t) => t.id))}
          />
          <Label htmlFor="cl-all" className="font-mono text-[10px] tracking-[0.2em] text-success uppercase">
            Setup checklist
          </Label>
        </div>
        <span className="font-mono text-[11px] text-muted-foreground">
          {done.length}/{tasks.length}
        </span>
      </div>
      <ul className="grid gap-3.5 p-4">
        {tasks.map((task) => {
          const checked = done.includes(task.id);
          return (
            <li key={task.id} className="flex items-center gap-3">
              <Checkbox
                id={`cl-${task.id}`}
                checked={checked}
                onCheckedChange={(v) =>
                  setDone((d) => (v === true ? [...d, task.id] : d.filter((x) => x !== task.id)))
                }
              />
              <Label
                htmlFor={`cl-${task.id}`}
                className={checked ? "text-muted-foreground line-through decoration-muted-foreground/60" : undefined}
              >
                {task.label}
              </Label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
