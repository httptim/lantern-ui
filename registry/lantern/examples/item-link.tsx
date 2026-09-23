import { BookOpen, ChevronRight, ExternalLink } from "lucide-react";

import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/registry/lantern/ui/item";

export default function ItemLink() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Item asChild variant="outline">
        <a href="#">
          <ItemMedia variant="icon">
            <BookOpen />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Turtle API guide</ItemTitle>
            <ItemDescription>Move, dig and refuel from a script.</ItemDescription>
          </ItemContent>
          <ItemActions>
            <ChevronRight className="size-4 text-muted-foreground" />
          </ItemActions>
        </a>
      </Item>
      <Item asChild variant="outline" size="sm">
        <a href="#" target="_blank" rel="noreferrer">
          <ItemContent>
            <ItemTitle>Open guestbook.hub</ItemTitle>
          </ItemContent>
          <ItemActions>
            <ExternalLink className="size-4 text-primary" />
          </ItemActions>
        </a>
      </Item>
    </div>
  );
}
