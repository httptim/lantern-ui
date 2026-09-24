"use client";

import * as React from "react";
import { HouseIcon, PauseIcon, PlayIcon } from "lucide-react";

import { Button } from "@/registry/lantern/ui/button";
import {
  JobCard,
  JobCardActions,
  JobCardEyebrow,
  JobCardFooter,
  JobCardHeader,
  JobCardProgress,
  JobCardStats,
  JobCardTimer,
  JobCardTitle,
} from "@/registry/lantern/ui/job-card";

const TOTAL = 64;

export default function JobCardDemo() {
  const [blocks, setBlocks] = React.useState(41);
  const [paused, setPaused] = React.useState(false);
  const [startedAt] = React.useState(() => Date.now() - 252_000);

  React.useEffect(() => {
    if (paused || blocks >= TOTAL) return;
    const id = setInterval(() => setBlocks((b) => Math.min(TOTAL, b + 1)), 1500);
    return () => clearInterval(id);
  }, [paused, blocks]);

  return (
    <JobCard aria-label="Current job" className="w-full max-w-[520px]">
      <JobCardHeader>
        <JobCardEyebrow>{paused ? "Paused" : "Running job"}</JobCardEyebrow>
        <JobCardTitle>Strip mine, 3 branches of 32</JobCardTitle>
        <JobCardTimer startedAt={startedAt} seconds={252} />
      </JobCardHeader>
      <JobCardProgress value={(blocks / TOTAL) * 100} aria-label="Job progress" />
      <JobCardFooter>
        <JobCardStats>
          <span>
            {blocks}/{TOTAL} blocks
          </span>
          <span>Ores 7</span>
          <span>Fuel used 118</span>
        </JobCardStats>
        <JobCardActions>
          <Button size="sm" variant="secondary" onClick={() => setPaused((p) => !p)}>
            {paused ? <PlayIcon /> : <PauseIcon />}
            {paused ? "Resume" : "Pause"}
          </Button>
          <Button size="sm" variant="destructive">
            <HouseIcon /> Stop and come home
          </Button>
        </JobCardActions>
      </JobCardFooter>
    </JobCard>
  );
}
