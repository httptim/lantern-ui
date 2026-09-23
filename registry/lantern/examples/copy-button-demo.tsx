import { CopyButton } from "@/registry/lantern/ui/copy-button";

export default function CopyButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <CopyButton value="pastebin get Xk2p9 hub" label="Copy install command" />
      <CopyButton value="pastebin get Xk2p9 hub" label="Copy install command" variant="outline" size="icon" />
      <CopyButton value="pastebin get Xk2p9 hub" variant="secondary" size="sm">
        Copy command
      </CopyButton>
    </div>
  );
}
