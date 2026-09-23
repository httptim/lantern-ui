import { Skeleton } from "@/registry/lantern/ui/skeleton";

export default function SkeletonDemo() {
  return (
    <div
      role="status"
      aria-label="Loading site"
      className="w-full max-w-xs overflow-hidden rounded-lg border bg-card"
    >
      <Skeleton className="h-32 rounded-none border-b bg-accent/60" />
      <div className="space-y-3 p-5">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <div className="flex items-center gap-3 pt-2">
          <Skeleton className="size-8 rounded-full" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  );
}
