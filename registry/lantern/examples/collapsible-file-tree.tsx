import { ChevronRightIcon, FileIcon, FolderIcon } from "lucide-react";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/registry/lantern/ui/collapsible";

type Node = string | [string, Node[]];

const tree: Node[] = [
  [
    "startup",
    ["boot.lua", ["drivers", ["modem.lua", "monitor.lua"]]],
  ],
  ["programs", ["hub.lua", "guestbook.lua", ["turtle", ["mine.lua", "refuel.lua"]]]],
  "config.json",
  "README.txt",
];

function TreeNode({ node, defaultOpen }: { node: Node; defaultOpen?: boolean }) {
  if (typeof node === "string") {
    return (
      <li>
        <span className="flex items-center gap-2 rounded-sm px-2 py-1 text-muted-foreground">
          <FileIcon className="size-3.5 shrink-0" />
          {node}
        </span>
      </li>
    );
  }
  const [name, children] = node;
  return (
    <li>
      <Collapsible defaultOpen={defaultOpen} className="group/folder">
        <CollapsibleTrigger className="flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-1 text-left text-foreground outline-none hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring/25">
          <ChevronRightIcon className="size-3.5 shrink-0 text-muted-foreground transition-transform group-data-[state=open]/folder:rotate-90" />
          <FolderIcon className="size-3.5 shrink-0 text-primary" />
          {name}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ul className="ml-[15px] border-l pl-2">
            {children.map((child) => (
              <TreeNode key={typeof child === "string" ? child : child[0]} node={child} />
            ))}
          </ul>
        </CollapsibleContent>
      </Collapsible>
    </li>
  );
}

export default function CollapsibleFileTree() {
  return (
    <div className="w-full max-w-[280px] rounded-lg border bg-card p-3">
      <div className="mb-2 px-2 font-mono text-[10px] font-semibold tracking-[0.2em] text-success uppercase">
        Computer 42 / disk
      </div>
      <ul className="font-mono text-[13px]">
        {tree.map((node) => (
          <TreeNode key={typeof node === "string" ? node : node[0]} node={node} defaultOpen={node[0] === "programs"} />
        ))}
      </ul>
    </div>
  );
}
