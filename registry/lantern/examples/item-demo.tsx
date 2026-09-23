import { Power, RotateCw, Server } from "lucide-react";

import { Badge } from "@/registry/lantern/ui/badge";
import { Button } from "@/registry/lantern/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/registry/lantern/ui/item";
import { StatusDot } from "@/registry/lantern/ui/status-dot";

const servers = [
  { name: "Deepstone", host: "deepstone.hub:25565", players: "12 / 40", tone: "online" as const },
  { name: "Skylands", host: "skylands.hub:25565", players: "3 / 20", tone: "busy" as const },
  { name: "Turtle Farm", host: "turtle.farm:25565", players: "Offline", tone: "offline" as const },
];

export default function ItemDemo() {
  return (
    <ItemGroup className="w-full max-w-lg rounded-lg border bg-card">
      {servers.map((server, index) => (
        <div key={server.name} role="listitem">
          {index > 0 && <ItemSeparator />}
          <Item>
            <ItemMedia variant="icon">
              <Server />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>
                {server.name}
                <StatusDot tone={server.tone} pulse={server.tone !== "offline"} />
              </ItemTitle>
              <ItemDescription className="font-mono text-xs">{server.host}</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Badge variant="outline" className="hidden sm:inline-flex">
                {server.players}
              </Badge>
              {server.tone === "offline" ? (
                <Button size="icon-sm" variant="outline" aria-label={`Start ${server.name}`}>
                  <Power />
                </Button>
              ) : (
                <Button size="icon-sm" variant="ghost" aria-label={`Restart ${server.name}`}>
                  <RotateCw />
                </Button>
              )}
            </ItemActions>
          </Item>
        </div>
      ))}
    </ItemGroup>
  );
}
