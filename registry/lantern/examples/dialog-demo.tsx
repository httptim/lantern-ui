"use client";

import { Button } from "@/registry/lantern/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/lantern/ui/dialog";
import { Input } from "@/registry/lantern/ui/input";
import { Label } from "@/registry/lantern/ui/label";

export default function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Edit profile</Button>
      </DialogTrigger>
      <DialogContent>
        <form className="grid gap-5" onSubmit={(event) => event.preventDefault()}>
          <DialogHeader>
            <DialogTitle>
              Edit profile<span className="text-primary">.</span>
            </DialogTitle>
            <DialogDescription>Change how your name and hub appear on the Lantern network.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="profile-name">Display name</Label>
              <Input id="profile-name" defaultValue="turtlewright" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="profile-hub">Hub address</Label>
              <Input id="profile-hub" defaultValue="lantern://turtlewright.hub" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
