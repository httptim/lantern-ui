"use client";

import * as React from "react";
import {
  BookOpenIcon,
  CpuIcon,
  LayoutDashboardIcon,
  ServerIcon,
  SettingsIcon,
  TerminalSquareIcon,
} from "lucide-react";

import { Separator } from "@/registry/lantern/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/registry/lantern/ui/sidebar";

const items = [
  { title: "Overview", icon: LayoutDashboardIcon },
  { title: "Servers", icon: ServerIcon, badge: "3" },
  { title: "Turtles", icon: CpuIcon, badge: "4" },
  { title: "Guestbook", icon: BookOpenIcon },
  { title: "Terminal", icon: TerminalSquareIcon },
];

export default function SidebarIcon() {
  const [active, setActive] = React.useState("Servers");

  return (
    <div className="h-[460px] w-full overflow-hidden rounded-lg border">
      <SidebarProvider defaultOpen={false} keyboardShortcut={false} className="relative h-full min-h-0">
        <Sidebar collapsible="icon" className="absolute h-full">
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" tooltip="North hub" className="rounded-md border-transparent">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
                    <CpuIcon className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left leading-tight">
                    <span className="truncate font-display font-medium text-sidebar-foreground">North hub</span>
                    <span className="truncate font-mono text-[10px] tracking-[0.12em] uppercase">Computer 42</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Hub</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        tooltip={item.title}
                        isActive={active === item.title}
                        onClick={() => setActive(item.title)}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                      {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Settings"
                  isActive={active === "Settings"}
                  onClick={() => setActive("Settings")}
                >
                  <SettingsIcon />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <SidebarInset>
          <header className="flex h-12 shrink-0 items-center gap-2 border-b px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-1 data-[orientation=vertical]:h-4" />
            <span className="truncate font-mono text-[10px] tracking-[0.2em] text-foreground uppercase">{active}</span>
          </header>
          <div className="grid flex-1 content-start gap-3 p-4">
            <p className="max-w-sm text-sm text-muted-foreground">
              Collapsed to icons. Hover an icon to see its name, or press the toggle to expand.
            </p>
            {["Computer 17", "Computer 42", "Computer 58"].map((name, i) => (
              <div key={name} className="flex items-center justify-between rounded-lg border bg-card px-4 py-3">
                <span className="font-display text-sm font-medium">{name}</span>
                <span className="font-mono text-[10px] tracking-[0.2em] text-success uppercase">
                  {i === 1 ? "Busy" : "Online"}
                </span>
              </div>
            ))}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
