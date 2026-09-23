import { Bot, Pickaxe, Radio } from "lucide-react";

import { Badge } from "@/registry/lantern/ui/badge";
import {
  DirectoryCard,
  DirectoryCardArt,
  DirectoryCardCategory,
  DirectoryCardDescription,
  DirectoryCardFooter,
  DirectoryCardHeader,
  DirectoryCardTags,
  DirectoryCardTitle,
} from "@/registry/lantern/ui/directory-card";

const sites = [
  {
    href: "#radio",
    icon: Radio,
    address: "hub://radio/",
    category: "Media",
    title: "Night Radio",
    description: "Disc rotations streamed over rednet from the spawn tower.",
    tags: ["Audio", "Rednet"],
    status: "online" as const,
    statusLabel: "Online",
    host: "Computer 812",
  },
  {
    href: "#turtles",
    icon: Bot,
    address: "hub://turtles/",
    category: "Tools",
    title: "Turtle Yard",
    description: "Queue mining jobs and watch fuel levels for the whole fleet.",
    tags: ["Lua", "Fleet"],
    status: "busy" as const,
    statusLabel: "Busy",
    host: "Computer 2290",
  },
  {
    href: "#market",
    icon: Pickaxe,
    address: "hub://market/",
    category: "Trade",
    title: "Ore Exchange",
    description: "Post buy and sell orders for iron, gold and diamonds.",
    tags: ["Shop"],
    status: "offline" as const,
    statusLabel: "Offline",
    host: "Computer 51",
  },
];

export default function DirectoryCardGrid() {
  return (
    <div className="@container w-full">
      <div className="grid gap-4 @xl:grid-cols-2 @4xl:grid-cols-3">
        {sites.map((site) => (
          <DirectoryCard key={site.href} asChild>
            <a href={site.href}>
              <DirectoryCardArt address={site.address}>
                <site.icon />
              </DirectoryCardArt>
              <DirectoryCardHeader>
                <DirectoryCardCategory>{site.category}</DirectoryCardCategory>
                <DirectoryCardTitle>{site.title}</DirectoryCardTitle>
                <DirectoryCardDescription>{site.description}</DirectoryCardDescription>
                <DirectoryCardTags>
                  {site.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </DirectoryCardTags>
              </DirectoryCardHeader>
              <DirectoryCardFooter status={site.status}>
                {site.statusLabel}
                <span className="ml-auto">{site.host}</span>
              </DirectoryCardFooter>
            </a>
          </DirectoryCard>
        ))}
      </div>
    </div>
  );
}
