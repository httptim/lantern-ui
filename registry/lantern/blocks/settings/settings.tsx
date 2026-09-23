"use client";

import * as React from "react";
import { BellIcon, GlobeIcon, TriangleAlertIcon, UserIcon } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Button } from "@/registry/lantern/ui/button";
import { Eyebrow } from "@/registry/lantern/ui/eyebrow";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/lantern/ui/select";

import { DangerSection, HubSection, NotificationsSection, ProfileSection } from "./sections";

const sections = [
  { id: "profile", label: "Profile", icon: UserIcon, content: ProfileSection },
  { id: "hub", label: "Hub site", icon: GlobeIcon, content: HubSection },
  { id: "notifications", label: "Notifications", icon: BellIcon, content: NotificationsSection },
  { id: "danger", label: "Danger zone", icon: TriangleAlertIcon, content: DangerSection },
] as const;

type SectionId = (typeof sections)[number]["id"];

export default function Settings() {
  const [active, setActive] = React.useState<SectionId>("profile");
  const [saving, setSaving] = React.useState(false);

  function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("Settings saved", { description: "North hub picks up the changes on its next sync." });
    }, 700);
  }

  return (
    <div className="min-h-svh bg-background">
      <div className="border-b bg-card bg-grid">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-10">
          <Eyebrow>North hub</Eyebrow>
          <h1 className="mt-2 text-3xl font-medium tracking-[-0.05em] sm:text-4xl">
            Settings<span className="text-primary">.</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">Your profile, your hub site and what we ping you about.</p>
        </div>
      </div>

      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-8 sm:px-6 md:grid-cols-[200px_minmax(0,1fr)] lg:gap-12 lg:px-10">
        <nav aria-label="Settings sections">
          <div className="md:hidden">
            <Select value={active} onValueChange={(value) => setActive(value as SectionId)}>
              <SelectTrigger className="w-full" aria-label="Settings section">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sections.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    <s.icon /> {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <ul className="sticky top-6 hidden gap-1 md:grid">
            {sections.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  aria-current={active === s.id ? "page" : undefined}
                  onClick={() => setActive(s.id)}
                  className={cn(
                    "flex w-full cursor-pointer items-center gap-2.5 rounded-r-md border-l px-3 py-2 text-left text-[13.5px] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
                    active === s.id
                      ? "border-primary bg-secondary font-medium text-foreground [&>svg]:text-primary"
                      : "border-transparent text-muted-foreground hover:border-input hover:bg-secondary/60 hover:text-foreground",
                    s.id === "danger" && active !== s.id && "hover:text-destructive",
                  )}
                >
                  <s.icon className="size-4 shrink-0" />
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <form onSubmit={save} className="min-w-0">
          {sections.map((s) => (
            <div key={s.id} hidden={active !== s.id} className="animate-in duration-200 fade-in-0">
              <s.content />
            </div>
          ))}
          {active !== "danger" && (
            <div className="mt-8 flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-end">
              <p className="mr-auto font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                Last saved 2 hours ago
              </p>
              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save changes"}
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
