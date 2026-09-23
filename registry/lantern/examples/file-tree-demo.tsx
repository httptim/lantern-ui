import { FileTree, type FileTreeItem } from "@/registry/lantern/ui/file-tree";

const site: FileTreeItem[] = [
  {
    id: "hub",
    name: "hub-site",
    children: [
      { id: "index", name: "index.lua", badge: "M", badgeTone: "warning", badgeLabel: "Modified" },
      {
        id: "pages",
        name: "pages",
        children: [
          { id: "guestbook", name: "guestbook.lua" },
          { id: "shop", name: "shop.lua", badge: "A", badgeTone: "success", badgeLabel: "Added" },
          { id: "about", name: "about.md" },
        ],
      },
      {
        id: "assets",
        name: "assets",
        children: [
          { id: "logo", name: "logo.nfp" },
          { id: "theme", name: "theme.json", badge: "M", badgeTone: "warning", badgeLabel: "Modified" },
        ],
      },
      { id: "readme", name: "README.txt" },
    ],
  },
];

export default function FileTreeDemo() {
  return (
    <div className="w-full max-w-xs rounded-lg border bg-card">
      <div className="border-b px-4 py-2.5 font-mono text-[10px] tracking-[0.2em] text-success uppercase">Explorer</div>
      <FileTree items={site} defaultExpanded={["hub", "pages"]} defaultSelectedId="index" aria-label="Site files" />
    </div>
  );
}
