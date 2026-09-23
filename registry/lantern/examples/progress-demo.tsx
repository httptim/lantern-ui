"use client";

import * as React from "react";

import { Progress } from "@/registry/lantern/ui/progress";

export default function ProgressDemo() {
  const [value, setValue] = React.useState(18);

  React.useEffect(() => {
    const timer = setTimeout(() => setValue(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      <Progress value={value} size="sm" aria-label="Sync progress" />
      <Progress value={value} aria-label="Upload progress" />
      <Progress value={value} size="lg" aria-label="Fuel level" />
    </div>
  );
}
