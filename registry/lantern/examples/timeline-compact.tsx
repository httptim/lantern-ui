import { GitCommitHorizontal, Rocket, Wrench } from "lucide-react";

import {
  Timeline,
  TimelineDescription,
  TimelineItem,
  TimelineLabel,
  TimelineTitle,
} from "@/registry/lantern/ui/timeline";

export default function TimelineCompact() {
  return (
    <Timeline size="compact" className="w-full max-w-sm">
      <TimelineItem state="current" icon={<Rocket />}>
        <TimelineLabel>v0.3.2 / Today</TimelineLabel>
        <TimelineTitle>Directory search</TimelineTitle>
        <TimelineDescription>Find sites by name or tag.</TimelineDescription>
      </TimelineItem>
      <TimelineItem state="done" icon={<Wrench />}>
        <TimelineLabel>v0.3.1 / Sep 14</TimelineLabel>
        <TimelineTitle>Fixed relay timeouts</TimelineTitle>
      </TimelineItem>
      <TimelineItem state="done" icon={<GitCommitHorizontal />}>
        <TimelineLabel>v0.3.0 / Sep 02</TimelineLabel>
        <TimelineTitle>Turtle relays beta</TimelineTitle>
      </TimelineItem>
    </Timeline>
  );
}
