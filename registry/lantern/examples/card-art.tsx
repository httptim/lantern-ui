import { ArrowUpRight, Diamond } from "lucide-react";

import { Badge } from "@/registry/lantern/ui/badge";
import { Card, CardArt, CardDescription, CardHeader, CardTitle } from "@/registry/lantern/ui/card";
import { Eyebrow } from "@/registry/lantern/ui/eyebrow";

export default function CardArtDemo() {
  return (
    <Card className="w-full max-w-sm gap-4 transition-transform hover:-translate-y-1">
      <CardArt>
        <Diamond />
        <span className="absolute bottom-3 left-4 font-mono text-[8px] tracking-[0.15em] uppercase">hub://guestbook/</span>
      </CardArt>
      <CardHeader>
        <Eyebrow>Community</Eyebrow>
        <CardTitle className="flex items-center justify-between">
          Lantern Guestbook <ArrowUpRight className="size-4 text-primary" />
        </CardTitle>
        <CardDescription>Leave a little warmth for the next traveler.</CardDescription>
        <div className="mt-2 flex gap-1.5">
          <Badge variant="outline">Lua</Badge>
          <Badge variant="outline">Hub</Badge>
        </div>
      </CardHeader>
    </Card>
  );
}
