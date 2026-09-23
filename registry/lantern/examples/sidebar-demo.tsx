"use client";

import * as React from "react";
import {
  BookOpenIcon,
  ChevronRightIcon,
  ChevronsUpDownIcon,
  CpuIcon,
  LayoutDashboardIcon,
  MoreHorizontalIcon,
  PlusIcon,
  ServerIcon,
  SettingsIcon,
  TerminalSquareIcon,
} from "lucide-react";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/registry/lantern/ui/collapsible";
import { Separator } from "@/registry/lantern/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@/registry/lantern/ui/sidebar";

const hub = [
  { title: "Overview", icon: LayoutDashboardIcon },
  { title: "Servers", icon: ServerIcon, badge: "3" },
  { title: "Guestbook", icon: BookOpenIcon, badge: "12" },
  { title: "Terminal", icon: TerminalSquareIcon },
];

const turtles = ["miner-01", "miner-02", "farmer-07"];

export default function SidebarDemo() {
  const [active, setActive] = React.useState("Overview");

  return (
    <div className="h-[560px] w-full overflow-hidden rounded-lg border">
      {/* Inside a docs preview: fill the frame instead of the viewport. */}
      <SidebarProvider className="relative h-full min-h-0">
        <Sidebar className="absolute h-full">
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" className="rounded-md border-transparent">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
                    <CpuIcon className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left leading-tight">
                    <span className="truncate font-display font-medium text-sidebar-foreground">North hub</span>
                    <span className="truncate font-mono text-[10px] tracking-[0.12em] uppercase">Computer 42</span>
                  </div>
                  <ChevronsUpDownIcon className="ml-auto" />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            <SidebarInput placeholder="Search the hub" aria-label="Search the hub" />
          </SidebarHeader>
          <SidebarSeparator />
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Hub</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {hub.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        isActive={active === item.title}
                        onClick={() => setActive(item.title)}
                        tooltip={item.title}
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
            <SidebarGroup>
              <SidebarGroupLabel>Fleet</SidebarGroupLabel>
              <SidebarGroupAction aria-label="Add turtle">
                <PlusIcon />
              </SidebarGroupAction>
              <SidebarGroupContent>
                <SidebarMenu>
                  <Collapsible defaultOpen asChild className="group/collapsible">
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip="Turtles">
                          <CpuIcon />
                          <span>Turtles</span>
                          <ChevronRightIcon className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {turtles.map((t) => (
                            <SidebarMenuSubItem key={t}>
                              <SidebarMenuSubButton
                                href="#"
                                isActive={active === t}
                                onClick={(e) => {
                                  e.preventDefault();
                                  setActive(t);
                                }}
                              >
                                <span className="font-mono text-xs">{t}</span>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={active === "Settings"}
                      onClick={() => setActive("Settings")}
                      tooltip="Settings"
                    >
                      <SettingsIcon />
                      <span>Settings</span>
                    </SidebarMenuButton>
                    <SidebarMenuAction showOnHover aria-label="More settings">
                      <MoreHorizontalIcon />
                    </SidebarMenuAction>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <div className="flex items-center gap-2 rounded-md border border-sidebar-border bg-background/40 px-2.5 py-2 group-data-[collapsible=icon]:hidden">
              <span className="size-1.5 shrink-0 animate-lantern-pulse rounded-full bg-success" aria-hidden="true" />
              <span className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">Relay online</span>
            </div>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <SidebarInset>
          <header className="flex h-12 shrink-0 items-center gap-2 border-b px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-1 data-[orientation=vertical]:h-4" />
            <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">North hub</span>
            <span className="font-mono text-[10px] text-muted-foreground">/</span>
            <span className="truncate font-mono text-[10px] tracking-[0.2em] text-foreground uppercase">{active}</span>
          </header>
          <div className="@container flex min-h-0 flex-1 flex-col gap-4 overflow-auto p-4">
            <div className="grid gap-3 @sm:grid-cols-3">
              {[
                ["Turtles online", "3 / 4"],
                ["Fuel stored", "12,480"],
                ["Guestbook", "12 new"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border bg-card p-4">
                  <div className="font-mono text-[10px] tracking-[0.2em] text-success uppercase">{label}</div>
                  <div className="mt-2 font-display text-xl font-medium tracking-tight whitespace-nowrap">{value}</div>
                </div>
              ))}
            </div>
            <div className="min-h-40 flex-1 rounded-lg border bg-card bg-grid p-4">
              <div className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">Recent activity</div>
              <ul className="mt-3 grid gap-2 font-mono text-xs text-muted-foreground">
                <li>
                  <span className="text-primary">&gt;</span> miner-02 returned to base with 64 coal
                </li>
                <li>
                  <span className="text-primary">&gt;</span> new guestbook entry from computer 17
                </li>
                <li>
                  <span className="text-primary">&gt;</span> relay handshake ok on lantern-main
                </li>
              </ul>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
