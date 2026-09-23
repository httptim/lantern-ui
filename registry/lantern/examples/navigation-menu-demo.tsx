"use client";

import * as React from "react";
import {
  BotIcon,
  BoxIcon,
  CompassIcon,
  FuelIcon,
  GlobeIcon,
  PickaxeIcon,
  RadioTowerIcon,
  StoreIcon,
} from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/registry/lantern/ui/navigation-menu";

const hubs = [
  { title: "Directory", href: "#", icon: GlobeIcon, description: "Every hub site on the server." },
  { title: "East Market", href: "#", icon: StoreIcon, description: "Shops, prices and trade posts." },
  { title: "Rednet relay", href: "#", icon: RadioTowerIcon, description: "Network status and routes." },
  { title: "Storage", href: "#", icon: BoxIcon, description: "Chest indexes for the vault." },
];

const turtles = [
  { title: "Miners", href: "#", icon: PickaxeIcon, description: "Quarry and tunnel crews." },
  { title: "Couriers", href: "#", icon: CompassIcon, description: "Item runs between hubs." },
  { title: "Fuel depot", href: "#", icon: FuelIcon, description: "Coal stock and refuel stops." },
  { title: "All turtles", href: "#", icon: BotIcon, description: "Status for the whole fleet." },
];

function PanelLink({
  title,
  href,
  icon: Icon,
  description,
}: {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a href={href} className="flex-row items-start gap-3">
          <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md border bg-accent">
            <Icon className="size-3.5 text-[#b7ca9e]" />
          </span>
          <span className="grid gap-0.5">
            <span className="font-medium text-foreground">{title}</span>
            <span className="line-clamp-2 text-xs leading-snug text-muted-foreground">{description}</span>
          </span>
        </a>
      </NavigationMenuLink>
    </li>
  );
}

export default function NavigationMenuDemo() {
  return (
    <div className="flex min-h-[360px] w-full items-start justify-center">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Hubs</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-full gap-2 md:w-[540px] md:grid-cols-[180px_1fr]">
                <NavigationMenuLink asChild>
                  <a
                    href="#"
                    className="hidden justify-end gap-1.5 border bg-accent bg-grid p-4 hover:border-primary/60 hover:bg-accent md:flex"
                  >
                    <span className="font-mono text-[10px] tracking-[0.2em] text-success uppercase">Featured</span>
                    <span className="font-display text-lg leading-tight font-medium tracking-tight text-foreground">
                      quarry.hub
                    </span>
                    <span className="text-xs leading-snug text-muted-foreground">
                      Live depth charts from turtle 07 and friends.
                    </span>
                  </a>
                </NavigationMenuLink>
                <ul className="grid gap-1">
                  {hubs.map((hub) => (
                    <PanelLink key={hub.title} {...hub} />
                  ))}
                </ul>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Turtles</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-full gap-1 md:w-[480px] md:grid-cols-2">
                {turtles.map((turtle) => (
                  <PanelLink key={turtle.title} {...turtle} />
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <a href="#">Guestbook</a>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuIndicator />
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
