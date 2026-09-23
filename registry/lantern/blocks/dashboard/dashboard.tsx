"use client";

import * as React from "react";
import { PlusIcon, SearchIcon } from "lucide-react";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/registry/lantern/ui/breadcrumb";
import { Button } from "@/registry/lantern/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/registry/lantern/ui/input-group";
import { Separator } from "@/registry/lantern/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/registry/lantern/ui/sidebar";

import { AppSidebar } from "./app-sidebar";
import { FleetConsole } from "./fleet-console";
import { MiningChart } from "./mining-chart";
import { Stats } from "./stats";
import { TurtlesTable } from "./turtles-table";

export default function Dashboard() {
  const [active, setActive] = React.useState("Overview");

  return (
    <SidebarProvider>
      <AppSidebar active={active} onNavigate={setActive} />
      <SidebarInset className="min-w-0">
        <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b bg-background/90 px-3 backdrop-blur sm:px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-1 data-[orientation=vertical]:h-4" />
          <Breadcrumb className="min-w-0">
            <BreadcrumbList className="flex-nowrap">
              <BreadcrumbItem className="hidden sm:inline-flex">
                <BreadcrumbLink href="#" className="whitespace-nowrap">
                  North hub
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden sm:block" />
              <BreadcrumbItem className="min-w-0">
                <BreadcrumbPage className="truncate">{active}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto flex items-center gap-2">
            <InputGroup className="h-9 w-36 sm:w-48 xl:w-64">
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
              <InputGroupInput type="search" placeholder="Search" aria-label="Search turtles and servers" className="h-[34px]" />
            </InputGroup>
            <Button size="sm" className="hidden lg:inline-flex">
              <PlusIcon /> Add turtle
            </Button>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-3 sm:p-4 lg:gap-6 lg:p-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-medium tracking-[-0.04em] sm:text-3xl">
              Good evening<span className="text-primary">.</span>
            </h1>
            <p className="text-sm text-muted-foreground">9 turtles are working. One found lava on layer 11.</p>
          </div>
          <Stats />
          <div className="grid min-w-0 gap-4 lg:gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
            <MiningChart />
            <FleetConsole />
          </div>
          <TurtlesTable />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
