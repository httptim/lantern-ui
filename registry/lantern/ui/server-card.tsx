"use client";

import * as React from "react";
import { ServerIcon, UsersIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarGroup } from "@/registry/lantern/ui/avatar";
import { Badge } from "@/registry/lantern/ui/badge";
import { CopyButton } from "@/registry/lantern/ui/copy-button";
import { StatusPill } from "@/registry/lantern/ui/status-pill";

function initials(name: string) {
  const parts = name.replace(/([a-z])([A-Z])/g, "$1 $2").split(/[\s_-]+/).filter(Boolean);
  return (parts.length > 1 ? parts[0][0] + parts[1][0] : name.slice(0, 2)).toUpperCase();
}

/** A Minecraft server status card: address, status, players, version and MOTD. */
function ServerCard({
  className,
  name,
  address,
  online = true,
  players = 0,
  maxPlayers = 20,
  version,
  motd,
  playerNames,
  maxAvatars = 4,
  icon,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  name: string;
  address: string;
  online?: boolean;
  players?: number;
  maxPlayers?: number;
  version?: string;
  motd?: React.ReactNode;
  /** Names of players online, shown as an initials stack. */
  playerNames?: string[];
  maxAvatars?: number;
  icon?: React.ReactNode;
}) {
  const count = online ? players : 0;
  const pct = maxPlayers > 0 ? Math.min(100, Math.round((count / maxPlayers) * 100)) : 0;
  const shown = online ? (playerNames ?? []).slice(0, maxAvatars) : [];
  const extra = online ? (playerNames?.length ?? 0) - shown.length : 0;

  return (
    <div
      data-slot="server-card"
      data-online={online}
      className={cn("flex min-w-0 flex-col gap-4 rounded-lg border bg-card p-5 text-card-foreground", className)}
      {...props}
    >
      <div className="flex items-start gap-3">
        <div
          aria-hidden="true"
          className={cn(
            "grid size-10 shrink-0 place-items-center rounded-md border bg-accent bg-grid text-[#b7ca9e] [&_svg]:size-5",
            !online && "opacity-60",
          )}
        >
          {icon ?? <ServerIcon />}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <h3 className="min-w-0 truncate font-display text-lg leading-tight font-medium tracking-tight">{name}</h3>
            <StatusPill tone={online ? "online" : "offline"} className="ml-auto">
              {online ? "Online" : "Offline"}
            </StatusPill>
          </div>
          <div className="-ml-1 flex min-w-0 items-center gap-0.5">
            <span className="truncate px-1 font-mono text-[12px] text-muted-foreground">{address}</span>
            <CopyButton value={address} label={`Copy address ${address}`} className="size-7 [&_svg:not([class*='size-'])]:size-3.5" />
          </div>
        </div>
      </div>

      {motd && (
        <p data-slot="server-card-motd" className="line-clamp-2 border-l-2 border-input pl-3 font-mono text-[12px] text-[#d9b774]">
          {motd}
        </p>
      )}

      <div className="grid gap-2">
        <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.15em] text-muted-foreground uppercase">
          <UsersIcon className="size-3.5 text-primary" aria-hidden="true" />
          Players
          <span className="ml-auto text-[12px] tracking-normal text-foreground normal-case">
            {count}
            <span className="text-muted-foreground"> / {maxPlayers}</span>
          </span>
        </div>
        <div
          role="meter"
          aria-label="Players online"
          aria-valuemin={0}
          aria-valuemax={maxPlayers}
          aria-valuenow={count}
          className="h-1 overflow-hidden rounded-[1px] bg-[#2b352f]"
        >
          <div className="h-full bg-success transition-[width] duration-300" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {(version || shown.length > 0) && (
        <div className="flex min-h-7 items-center gap-3">
          {version && <Badge variant="outline">{version}</Badge>}
          {shown.length > 0 && (
            <AvatarGroup className="ml-auto -space-x-2" aria-label={`Players: ${playerNames?.join(", ")}`} role="img">
              {shown.map((p) => (
                <Avatar key={p} className="size-7" title={p}>
                  <AvatarFallback className="text-[9px]">{initials(p)}</AvatarFallback>
                </Avatar>
              ))}
              {extra > 0 && (
                <Avatar className="size-7">
                  <AvatarFallback className="bg-secondary text-[9px] text-muted-foreground">+{extra}</AvatarFallback>
                </Avatar>
              )}
            </AvatarGroup>
          )}
        </div>
      )}
    </div>
  );
}

export { ServerCard };
