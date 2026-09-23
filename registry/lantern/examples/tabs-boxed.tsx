import { Button } from "@/registry/lantern/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/registry/lantern/ui/card";
import { Input } from "@/registry/lantern/ui/input";
import { Label } from "@/registry/lantern/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/lantern/ui/tabs";

export default function TabsBoxed() {
  return (
    <Tabs variant="boxed" defaultValue="hub" className="w-full max-w-sm">
      <TabsList>
        <TabsTrigger value="hub">Hub</TabsTrigger>
        <TabsTrigger value="guestbook">Guestbook</TabsTrigger>
      </TabsList>
      <TabsContent value="hub">
        <Card>
          <CardHeader>
            <CardTitle>Hub details</CardTitle>
            <CardDescription>The name and address shown in the directory.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="tabs-hub-name">Name</Label>
              <Input id="tabs-hub-name" defaultValue="Quarry hub" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tabs-hub-address">Address</Label>
              <Input id="tabs-hub-address" defaultValue="quarry.hub" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save hub</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="guestbook">
        <Card>
          <CardHeader>
            <CardTitle>Guestbook</CardTitle>
            <CardDescription>Pin a welcome message above the signatures.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Label htmlFor="tabs-guestbook">Welcome message</Label>
            <Input id="tabs-guestbook" defaultValue="Sign in and say where you are from." />
          </CardContent>
          <CardFooter>
            <Button>Save guestbook</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
