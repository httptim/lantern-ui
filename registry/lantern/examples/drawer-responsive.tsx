"use client";

import * as React from "react";

import { Button } from "@/registry/lantern/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/lantern/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/lantern/ui/drawer";
import { Input } from "@/registry/lantern/ui/input";
import { Label } from "@/registry/lantern/ui/label";

function useMediaQuery(query: string) {
  return React.useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export default function DrawerResponsive() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="secondary">Edit hub profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit hub profile</DialogTitle>
            <DialogDescription>Shown on the directory. Save when you are done.</DialogDescription>
          </DialogHeader>
          <ProfileForm onSaved={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="secondary">Edit hub profile</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit hub profile</DrawerTitle>
          <DrawerDescription>Shown on the directory. Save when you are done.</DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-5" onSaved={() => setOpen(false)} />
        <DrawerFooter className="pt-3">
          <DrawerClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ProfileForm({ className, onSaved }: { className?: string; onSaved: () => void }) {
  return (
    <form
      className={["grid gap-4", className].filter(Boolean).join(" ")}
      onSubmit={(e) => {
        e.preventDefault();
        onSaved();
      }}
    >
      <div className="grid gap-2">
        <Label htmlFor="hub-name">Hub name</Label>
        <Input id="hub-name" defaultValue="North hub" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="hub-owner">Owner</Label>
        <Input id="hub-owner" defaultValue="miner-02" />
      </div>
      <Button type="submit">Save profile</Button>
    </form>
  );
}
