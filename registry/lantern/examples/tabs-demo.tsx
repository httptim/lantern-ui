import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/lantern/ui/tabs";

export default function TabsDemo() {
  return (
    <Tabs defaultValue="program" className="w-full max-w-md">
      <TabsList>
        <TabsTrigger value="program">Program</TabsTrigger>
        <TabsTrigger value="fuel">Fuel</TabsTrigger>
        <TabsTrigger value="log">Log</TabsTrigger>
      </TabsList>
      <TabsContent value="program" className="text-sm leading-relaxed text-muted-foreground">
        Turtle 07 is running <span className="font-mono text-foreground">quarry.lua</span> on a 16 by 16 area, 32
        blocks deep.
      </TabsContent>
      <TabsContent value="fuel" className="text-sm leading-relaxed text-muted-foreground">
        4,120 fuel left. The turtle returns to the chest when it drops below 500.
      </TabsContent>
      <TabsContent value="log" className="font-mono text-xs leading-relaxed text-[#d9b774]">
        [12:04] layer 9 done
        <br />
        [12:06] inventory full, unloading
        <br />
        [12:07] back to work
      </TabsContent>
    </Tabs>
  );
}
