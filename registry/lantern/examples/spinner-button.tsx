import { Button } from "@/registry/lantern/ui/button";
import { Spinner } from "@/registry/lantern/ui/spinner";

export default function SpinnerButton() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button disabled>
        <Spinner className="text-current" aria-hidden="true" role={undefined} />
        Publishing
      </Button>
      <Button variant="outline" disabled>
        <Spinner aria-hidden="true" role={undefined} />
        Syncing site
      </Button>
    </div>
  );
}
