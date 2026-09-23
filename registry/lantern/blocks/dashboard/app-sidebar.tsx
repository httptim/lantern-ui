"use client";

import * as React from "react";
import {
  BookOpenIcon,
  ChevronsUpDownIcon,
  CpuIcon,
  GlobeIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  MapIcon,
  PackageIcon,
  PlusIcon,
  ServerIcon,
  SettingsIcon,
  TerminalSquareIcon,
  UserIcon,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/registry/lantern/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/lantern/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from "@/registry/lantern/ui/sidebar";
import { StatusDot } from "@/registry/lantern/ui/status-dot";

const groups = [
  {
    label: "Fleet",
    action: "Add turtle",
    items: [
      { title: "Overview", icon: LayoutDashboardIcon },
      { title: "Turtles", icon: CpuIcon, badge: "12" },
      { title: "Inventory", icon: PackageIcon },
      { title: "Map", icon: MapIcon },
      { title: "Console", icon: TerminalSquareIcon },
    ],
  },
  {
    label: "Hub",
    action: "Add server",
    items: [
      { title: "Hub site", icon: GlobeIcon },
      { title: "Servers", icon: ServerIcon, badge: "2" },
      { title: "Guestbook", icon: BookOpenIcon, badge: "5" },
    ],
  },
];

export function AppSidebar({
  active,
  onNavigate,
  ...props
}: React.ComponentProps<typeof Sidebar> & { active: string; onNavigate: (title: string) => void }) {
  const { isMobile, setOpenMobile } = useSidebar();

  function go(title: string) {
    onNavigate(title);
    if (isMobile) setOpenMobile(false);
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="rounded-md border-transparent" tooltip="TurtleDeck">
              <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <CpuIcon className="size-4" />
              </div>
              <div className="grid flex-1 text-left leading-tight">
                <span className="truncate font-display font-medium text-sidebar-foreground">TurtleDeck</span>
                <span className="truncate font-mono text-[10px] tracking-[0.12em] uppercase">North hub</span>
              </div>
              <ChevronsUpDownIcon className="ml-auto" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        {groups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupAction aria-label={group.action}>
              <PlusIcon />
            </SidebarGroupAction>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton isActive={active === item.title} tooltip={item.title} onClick={() => go(item.title)}>
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                    {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive={active === "Settings"} tooltip="Settings" onClick={() => go("Settings")}>
                  <SettingsIcon />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            <div className="mt-2 flex items-center gap-2 rounded-md border border-sidebar-border bg-background/40 px-2.5 py-2 group-data-[collapsible=icon]:hidden">
              <StatusDot />
              <span className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">Relay online</span>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" className="rounded-md border-transparent data-[state=open]:bg-sidebar-accent">
                  <Avatar className="size-8">
                    <AvatarFallback>AM</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left leading-tight">
                    <span className="truncate text-[13px] font-medium text-sidebar-foreground">Alex Marsh</span>
                    <span className="truncate font-mono text-[10px] text-muted-foreground">alex@example.com</span>
                  </div>
                  <ChevronsUpDownIcon className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side={isMobile ? "top" : "right"}
                align="end"
                sideOffset={8}
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56"
              >
                <DropdownMenuLabel>Signed in as Alex</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onSelect={() => go("Settings")}>
                    <UserIcon /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => go("Settings")}>
                    <SettingsIcon /> Settings
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <LogOutIcon /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
