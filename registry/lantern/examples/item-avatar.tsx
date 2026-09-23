import { Plus } from "lucide-react";

import { Avatar, AvatarFallback } from "@/registry/lantern/ui/avatar";
import { Button } from "@/registry/lantern/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "@/registry/lantern/ui/item";

export default function ItemAvatar() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Item variant="outline">
        <ItemMedia>
          <Avatar>
            <AvatarFallback>MB</AvatarFallback>
          </Avatar>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>moss_builder</ItemTitle>
          <ItemDescription>Signed your guestbook two hours ago.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm" variant="outline">
            Reply
          </Button>
        </ItemActions>
      </Item>
      <Item variant="muted">
        <ItemHeader>
          <span>Invite</span>
          <span>3 pending</span>
        </ItemHeader>
        <ItemMedia>
          <div className="flex -space-x-2">
            {["LS", "TK", "RB"].map((initials) => (
              <Avatar key={initials} className="size-8 ring-2 ring-background">
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Build crew</ItemTitle>
          <ItemDescription>Share edit access to turtle.farm.</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="icon-sm" variant="outline" aria-label="Invite a player">
            <Plus />
          </Button>
        </ItemActions>
        <ItemFooter className="font-mono text-[11px] text-muted-foreground">
          <span>Last change 09:42</span>
          <span className="text-success">Synced</span>
        </ItemFooter>
      </Item>
    </div>
  );
}
