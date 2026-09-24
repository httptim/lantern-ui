"use client";

import * as React from "react";
import { DownloadIcon, FilePlusIcon, LayoutTemplateIcon, ShieldCheckIcon, UploadIcon, WandIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/registry/lantern/ui/button";
import {
  CodeFrame,
  CodeFrameBody,
  CodeFrameFooter,
  CodeFrameHeader,
  CodeFrameTag,
  CodeFrameTitle,
  CodeFrameToolbar,
} from "@/registry/lantern/ui/code-frame";
import { Eyebrow } from "@/registry/lantern/ui/eyebrow";
import { FileTree, type FileTreeItem } from "@/registry/lantern/ui/file-tree";
import { UsageMeter, UsageMeterGroup, UsageMeterGroupLabel } from "@/registry/lantern/ui/usage-meter";

import { useMockAiRun } from "../ai-panel/mock";
import { AiPanel } from "../ai-panel/panel";

type SiteFile = { name: string; code: string; status?: "new" | "changed" };

const initialFiles: SiteFile[] = [
  {
    name: "index.json",
    status: "changed",
    code: `{
  "title": "alex-builds",
  "blocks": [
    { "type": "heading", "text": "Guestbook" },
    { "type": "text", "text": "Leave a little warmth. Notes are public." },
    { "type": "list", "bind": "entries", "item": "{name}: {message}" },
    { "type": "form", "action": "/sign", "fields": ["name", "message"], "submit": "Sign guestbook" },
    { "type": "link", "text": "Back to the Hub", "href": "hub://" }
  ]
}`,
  },
  {
    name: "about.json",
    code: `{
  "title": "About",
  "blocks": [
    { "type": "heading", "text": "About this base" },
    { "type": "text", "text": "A lighthouse, a wheat farm and too many chests." }
  ]
}`,
  },
  {
    name: "app.lua",
    status: "new",
    code: `-- Handles form posts for this site.
return function(ctx)
  return nil
end`,
  },
];

const statusBadge = {
  new: { badge: "N", badgeTone: "success", badgeLabel: "New" },
  changed: { badge: "M", badgeTone: "warning", badgeLabel: "Changed" },
} as const;

/** Lantern's Creator Studio: files, a code frame and the AI panel side by side. Stacks on phones. */
export default function EditorWorkspace() {
  const [files, setFiles] = React.useState(initialFiles);
  const [openFile, setOpenFile] = React.useState("app.lua");
  const current = files.find((f) => f.name === openFile) ?? files[0];
  const unsaved = files.filter((f) => f.status).length;

  const { panelProps } = useMockAiRun("lantern", (code) => {
    setFiles((list) => list.map((f) => (f.name === "app.lua" ? { ...f, code, status: "new" } : f)));
    setOpenFile("app.lua");
    toast.success("Applied to app.lua", { description: "Review it, then publish when you are ready." });
  });

  const tree: FileTreeItem[] = files.map((f) => ({ id: f.name, name: f.name, ...(f.status ? statusBadge[f.status] : {}) }));

  return (
    <div className="flex min-h-svh flex-col bg-background lg:h-svh">
      <div className="flex flex-col gap-4 border-b px-4 py-5 sm:px-6 lg:flex-row lg:items-end">
        <div className="flex min-w-0 flex-col gap-1.5">
          <Eyebrow>Creator studio / alex-builds</Eyebrow>
          <h1 className="text-2xl font-bold tracking-tight sm:text-[28px]">
            Your world, in the making<span className="text-primary">.</span>
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-2 lg:ml-auto">
          {unsaved > 0 && (
            <span className="mr-1 font-mono text-[11px] tracking-[0.1em] text-warning uppercase">
              {unsaved} unsaved {unsaved === 1 ? "change" : "changes"}
            </span>
          )}
          <Button size="sm" variant="outline">
            <ShieldCheckIcon /> Validate
          </Button>
          <Button size="sm" variant="outline">
            <DownloadIcon /> Download
          </Button>
          <Button
            size="sm"
            onClick={() => {
              setFiles((list) => list.map((f) => ({ ...f, status: undefined })));
              toast.success("Published to hub://alex-builds");
            }}
          >
            <UploadIcon /> Publish
          </Button>
        </div>
      </div>

      <div className="flex flex-1 flex-col lg:min-h-0 lg:flex-row">
        <aside aria-label="Site files" className="flex shrink-0 flex-col gap-2 border-b p-3 lg:w-[210px] lg:border-r lg:border-b-0">
          <div className="flex items-center justify-between px-1">
            <Eyebrow>Files / {files.length}</Eyebrow>
            <Button size="sm" variant="ghost" className="h-7 px-2" aria-label="New file">
              <FilePlusIcon />
            </Button>
          </div>
          <FileTree
            items={tree}
            selectedId={openFile}
            onSelect={(item) => setOpenFile(item.id)}
            aria-label="Site files"
          />
          <Button size="sm" variant="ghost" className="mt-auto hidden justify-start lg:flex">
            <LayoutTemplateIcon /> Start from a template
          </Button>
        </aside>

        <CodeFrame className="h-[440px] rounded-none border-0 lg:h-auto lg:flex-1">
          <CodeFrameHeader>
            <CodeFrameTitle>{current.name}</CodeFrameTitle>
            {current.status && (
              <CodeFrameTag tone={current.status === "new" ? "primary" : "warning"}>{current.status}</CodeFrameTag>
            )}
            <CodeFrameToolbar aria-label="File actions">
              <Button size="sm" variant="ghost" className="h-7">
                <WandIcon /> Format
              </Button>
            </CodeFrameToolbar>
          </CodeFrameHeader>
          <CodeFrameBody code={current.code} aria-label={`${current.name} source`} />
          <CodeFrameFooter>
            <span>{current.name.endsWith(".lua") ? "Lua" : "JSON"}</span>
            <span>{current.code.split("\n").length} lines</span>
          </CodeFrameFooter>
        </CodeFrame>

        <AiPanel
          {...panelProps}
          className="border-t lg:w-[360px] lg:overflow-y-auto lg:border-t-0 lg:border-l xl:w-[400px]"
          allowance={
            <UsageMeterGroup aria-label="AI allowance" className="w-full justify-between border-0 p-0">
              <UsageMeterGroupLabel>AI allowance</UsageMeterGroupLabel>
              <UsageMeter size="compact" label="5-hour" value={32} />
              <UsageMeter size="compact" label="Week" value={18} />
            </UsageMeterGroup>
          }
        />
      </div>
    </div>
  );
}
