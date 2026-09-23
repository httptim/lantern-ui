import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/registry/lantern/ui/resizable";

function Pane({ label, hint }: { label: string; hint: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-1 p-4 text-center">
      <span className="font-display text-sm font-medium">{label}</span>
      <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">{hint}</span>
    </div>
  );
}

export default function ResizableDemo() {
  return (
    <ResizablePanelGroup orientation="horizontal" className="max-w-md rounded-lg border bg-card" style={{ height: 220 }}>
      <ResizablePanel defaultSize="40%" minSize="20%">
        <Pane label="Monitor" hint="Left" />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize="60%" minSize="20%">
        <Pane label="Terminal" hint="Right" />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
