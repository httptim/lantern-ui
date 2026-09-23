import { BlockSpinner, Spinner } from "@/registry/lantern/ui/spinner";

export default function SpinnerDemo() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-6">
        <Spinner />
        <Spinner className="size-6" />
        <Spinner className="size-8 text-success" />
      </div>
      <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
        <BlockSpinner />
        Connecting to hub
      </div>
    </div>
  );
}
