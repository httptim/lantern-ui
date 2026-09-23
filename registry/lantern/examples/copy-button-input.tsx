"use client";

import { CopyButton } from "@/registry/lantern/ui/copy-button";
import { Input } from "@/registry/lantern/ui/input";
import { Label } from "@/registry/lantern/ui/label";

export default function CopyButtonInput() {
  const link = "lantern://hub.turtle/guestbook";
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="share-link">Share link</Label>
      <div className="flex gap-2">
        <Input id="share-link" readOnly value={link} className="font-mono text-[13px]" onFocus={(e) => e.currentTarget.select()} />
        <CopyButton value={link} label="Copy share link" variant="outline" size="icon" />
      </div>
    </div>
  );
}
