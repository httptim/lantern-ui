import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/registry/lantern/ui/resizable";

export default function ResizableVertical() {
  return (
    <ResizablePanelGroup orientation="vertical" className="max-w-md rounded-lg border bg-card" style={{ height: 260 }}>
      <ResizablePanel defaultSize="35%" minSize="15%">
        <div className="flex h-full items-center justify-center p-4">
          <span className="font-display text-sm font-medium">Guestbook</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize="65%" minSize="15%">
        <div className="flex h-full items-center justify-center p-4">
          <span className="font-display text-sm font-medium">Entries</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
