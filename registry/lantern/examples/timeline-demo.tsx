import { Badge } from "@/registry/lantern/ui/badge";
import {
  Timeline,
  TimelineDescription,
  TimelineItem,
  TimelineLabel,
  TimelineTitle,
} from "@/registry/lantern/ui/timeline";

export default function TimelineDemo() {
  return (
    <Timeline className="w-full max-w-lg">
      <TimelineItem state="done">
        <TimelineLabel>v0.1 / 2026-03</TimelineLabel>
        <TimelineTitle>Hub sites</TimelineTitle>
        <TimelineDescription>Publish a folder from any in-game computer to hub://your-name/.</TimelineDescription>
      </TimelineItem>
      <TimelineItem state="done">
        <TimelineLabel>v0.2 / 2026-05</TimelineLabel>
        <TimelineTitle>
          Guestbooks <Badge variant="success">Shipped</Badge>
        </TimelineTitle>
        <TimelineDescription>Visitors can sign a page. Owners moderate from the terminal.</TimelineDescription>
      </TimelineItem>
      <TimelineItem state="current">
        <TimelineLabel>v0.3 / Now</TimelineLabel>
        <TimelineTitle>
          Turtle relays <Badge>Beta</Badge>
        </TimelineTitle>
        <TimelineDescription>Route traffic between servers through a chain of turtles.</TimelineDescription>
      </TimelineItem>
      <TimelineItem state="planned">
        <TimelineLabel>v0.4 / Later</TimelineLabel>
        <TimelineTitle>
          Custom domains <Badge variant="outline">Planned</Badge>
        </TimelineTitle>
        <TimelineDescription>Point a short name at your hub site.</TimelineDescription>
      </TimelineItem>
    </Timeline>
  );
}
