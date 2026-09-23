"use client";

import * as React from "react";
import { BookOpenIcon, CpuIcon, LayoutDashboardIcon, ServerIcon, SettingsIcon } from "lucide-react";

import { Separator } from "@/registry/lantern/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarProvider,
  SidebarTrigger,
} from "@/registry/lantern/ui/sidebar";

const items = [
  { title: "Overview", icon: LayoutDashboardIcon },
  { title: "Servers", icon: ServerIcon },
  { title: "Turtles", icon: CpuIcon },
  { title: "Guestbook", icon: BookOpenIcon },
  { title: "Settings", icon: SettingsIcon },
];

export default function SidebarFloating() {
  const [active, setActive] = React.useState("Guestbook");

  return (
    <div className="h-[460px] w-full overflow-hidden rounded-lg border bg-background">
      <SidebarProvider keyboardShortcut={false} className="relative h-full min-h-0">
        <Sidebar variant="floating" className="absolute h-full">
          <SidebarHeader className="px-4 pt-4">
            <div className="font-display text-base font-medium tracking-tight">Lantern hub</div>
            <div className="font-mono text-[10px] tracking-[0.2em] text-success uppercase">Floating sidebar</div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Pages</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton isActive={active === item.title} onClick={() => setActive(item.title)}>
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Syncing</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {[0, 1, 2].map((i) => (
                    <SidebarMenuItem key={i}>
                      <SidebarMenuSkeleton showIcon />
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-12 shrink-0 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-1 data-[orientation=vertical]:h-4" />
            <span className="truncate font-mono text-[10px] tracking-[0.2em] text-foreground uppercase">{active}</span>
          </header>
          <div className="grid flex-1 content-start gap-3 p-4 pt-1">
            {["Thanks for the relay tips. - miner-02", "Hub looks great from spawn.", "Left some coal in the chest."].map(
              (entry) => (
                <div key={entry} className="rounded-lg border bg-card px-4 py-3 text-sm text-muted-foreground">
                  {entry}
                </div>
              ),
            )}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
