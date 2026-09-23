import { CircleAlert, CircleCheck, Info, TriangleAlert } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/registry/lantern/ui/alert";

export default function AlertVariants() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Alert>
        <Info />
        <AlertTitle>New hub version</AlertTitle>
        <AlertDescription>Restart your computers to pick up the update.</AlertDescription>
      </Alert>
      <Alert variant="success">
        <CircleCheck />
        <AlertTitle>Site published</AlertTitle>
        <AlertDescription>turtle.farm is live on the directory.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <TriangleAlert />
        <AlertTitle>Low fuel</AlertTitle>
        <AlertDescription>T-03 has 95 moves left. Drop coal in its inventory.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <CircleAlert />
        <AlertTitle>Server unreachable</AlertTitle>
        <AlertDescription>Deepstone stopped answering. Your site will be hidden until it returns.</AlertDescription>
      </Alert>
    </div>
  );
}
