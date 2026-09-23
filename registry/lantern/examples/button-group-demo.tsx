import { ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon, RotateCcwIcon, RotateCwIcon } from "lucide-react";

import { Button } from "@/registry/lantern/ui/button";
import { ButtonGroup } from "@/registry/lantern/ui/button-group";

export default function ButtonGroupDemo() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-6">
      <ButtonGroup aria-label="Move turtle">
        <Button variant="outline" size="icon" aria-label="Turn left">
          <RotateCcwIcon />
        </Button>
        <Button variant="outline">Forward</Button>
        <Button variant="outline">Back</Button>
        <Button variant="outline" size="icon" aria-label="Turn right">
          <RotateCwIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup orientation="vertical" aria-label="Dig direction">
        <Button variant="outline" size="icon" aria-label="Dig up">
          <ArrowUpIcon />
        </Button>
        <Button variant="outline" size="icon" aria-label="Dig forward">
          <ArrowRightIcon />
        </Button>
        <Button variant="outline" size="icon" aria-label="Dig down">
          <ArrowDownIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup aria-label="Pages">
        <Button variant="outline" size="sm">
          <ArrowLeftIcon />
          Prev
        </Button>
        <Button variant="outline" size="sm" className="text-primary">
          3
        </Button>
        <Button variant="outline" size="sm">
          Next
          <ArrowRightIcon />
        </Button>
      </ButtonGroup>
    </div>
  );
}
