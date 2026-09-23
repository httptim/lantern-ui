import { Terminal } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/registry/lantern/ui/alert";

export default function AlertDemo() {
  return (
    <Alert className="max-w-md">
      <Terminal />
      <AlertTitle>Your computer is listening</AlertTitle>
      <AlertDescription>Run lantern on any in-game computer to publish its site to the hub.</AlertDescription>
    </Alert>
  );
}
