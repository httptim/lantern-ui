"use client";

import * as React from "react";
import { EyeOffIcon, UploadIcon } from "lucide-react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/registry/lantern/ui/alert-dialog";
import { Avatar, AvatarFallback } from "@/registry/lantern/ui/avatar";
import { Button } from "@/registry/lantern/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/registry/lantern/ui/field";
import { Input } from "@/registry/lantern/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/registry/lantern/ui/input-group";
import { RadioGroup, RadioGroupItem } from "@/registry/lantern/ui/radio-group";
import { Switch } from "@/registry/lantern/ui/switch";
import { Textarea } from "@/registry/lantern/ui/textarea";

function SectionHeader({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h2 id={id} className="text-xl font-medium tracking-tight">
        {title}
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">{children}</p>
    </div>
  );
}

export function ProfileSection() {
  return (
    <section aria-labelledby="settings-profile">
      <SectionHeader id="settings-profile" title="Profile">How you show up on hub sites and guestbooks.</SectionHeader>
      <FieldGroup>
        <div className="flex items-center gap-4">
          <Avatar className="size-16">
            <AvatarFallback className="text-base">AM</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2">
            <Button type="button" variant="secondary" size="sm" className="w-fit">
              <UploadIcon /> Upload skin
            </Button>
            <p className="text-xs text-muted-foreground">PNG, 64 by 64. We crop to the face.</p>
          </div>
        </div>
        <Field>
          <FieldLabel htmlFor="settings-name">
            Display name
          </FieldLabel>
          <Input id="settings-name" name="name" defaultValue="Alex Marsh" autoComplete="name" />
        </Field>
        <Field>
          <FieldLabel htmlFor="settings-bio">Bio</FieldLabel>
          <Textarea
            id="settings-bio"
            name="bio"
            rows={4}
            defaultValue="Runs the north hub. Mostly quarries, a wheat farm and too many turtles."
          />
          <FieldDescription>Shown on your hub site. 160 characters max.</FieldDescription>
        </Field>
      </FieldGroup>
    </section>
  );
}

const visibility = [
  { value: "public", title: "Public", text: "Listed in the hub directory. Anyone can visit." },
  { value: "unlisted", title: "Unlisted", text: "Anyone with the address can visit. Not listed." },
  { value: "private", title: "Private", text: "Only computers you approve can load it." },
];

export function HubSection() {
  return (
    <section aria-labelledby="settings-hub">
      <SectionHeader id="settings-hub" title="Hub site">Where your site lives and who can find it.</SectionHeader>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="settings-address">
            Site address
          </FieldLabel>
          <InputGroup>
            <InputGroupAddon>
              <InputGroupText>hub://</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput id="settings-address" name="address" defaultValue="north-hub" className="font-mono text-[13px]" />
            <InputGroupAddon align="inline-end">
              <InputGroupText>.example.net</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
          <FieldDescription>Letters, numbers and dashes. Changing it breaks old links.</FieldDescription>
        </Field>
        <FieldSeparator />
        <FieldSet>
          <FieldLegend variant="label">Visibility</FieldLegend>
          <RadioGroup name="visibility" defaultValue="public" className="gap-3">
            {visibility.map((v) => (
              <FieldLabel key={v.value} htmlFor={`settings-vis-${v.value}`}>
                <Field orientation="horizontal">
                  <RadioGroupItem id={`settings-vis-${v.value}`} value={v.value} />
                  <FieldContent>
                    <FieldTitle>{v.title}</FieldTitle>
                    <FieldDescription>{v.text}</FieldDescription>
                  </FieldContent>
                </Field>
              </FieldLabel>
            ))}
          </RadioGroup>
        </FieldSet>
      </FieldGroup>
    </section>
  );
}

const notifications = [
  { id: "guestbook", title: "Guestbook entries", text: "Someone signs your guestbook.", on: true },
  { id: "fuel", title: "Low fuel", text: "A turtle drops under 10% fuel.", on: true },
  { id: "offline", title: "Server offline", text: "A linked server stops answering for 5 minutes.", on: true },
  { id: "digest", title: "Weekly digest", text: "Blocks mined, visitors and uptime every Monday.", on: false },
];

export function NotificationsSection() {
  return (
    <section aria-labelledby="settings-notifications">
      <SectionHeader id="settings-notifications" title="Notifications">Email pings for things that need you.</SectionHeader>
      <FieldSet>
        <FieldLegend variant="label">
          Email me when
        </FieldLegend>
        <div className="divide-y rounded-lg border bg-card">
          {notifications.map((n) => (
            <Field key={n.id} orientation="horizontal" className="px-4 py-4">
              <FieldContent>
                <FieldLabel htmlFor={`settings-notify-${n.id}`}>{n.title}</FieldLabel>
                <FieldDescription>{n.text}</FieldDescription>
              </FieldContent>
              <Switch id={`settings-notify-${n.id}`} name={`notify-${n.id}`} defaultChecked={n.on} />
            </Field>
          ))}
        </div>
      </FieldSet>
    </section>
  );
}

export function DangerSection() {
  const [published, setPublished] = React.useState(true);

  return (
    <section aria-labelledby="settings-danger">
      <SectionHeader id="settings-danger" title="Danger zone">Changes here take your hub site offline.</SectionHeader>
      <div className="rounded-lg border border-destructive/50 bg-destructive/5">
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-medium">
              {published ? "Unpublish hub site" : "Hub site is unpublished"}
            </p>
            <p className="mt-1 text-[13px] text-muted-foreground">
              {published
                ? "Visitors see a closed sign. Turtles keep reporting to you."
                : "Nobody can visit hub://north-hub right now."}
            </p>
          </div>
          {published ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button type="button" variant="destructive" className="w-full sm:w-auto">
                  <EyeOffIcon /> Unpublish
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Unpublish north-hub?</AlertDialogTitle>
                  <AlertDialogDescription>
                    The site goes offline for every visitor and drops out of the directory. You can publish it again
                    later.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Keep it live</AlertDialogCancel>
                  <AlertDialogAction
                    variant="destructive"
                    onClick={() => {
                      setPublished(false);
                      toast("Hub site unpublished", { description: "hub://north-hub is offline." });
                    }}
                  >
                    Unpublish
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <Button
              type="button"
              variant="secondary"
              className="w-full sm:w-auto"
              onClick={() => {
                setPublished(true);
                toast.success("Hub site published", { description: "hub://north-hub is live again." });
              }}
            >
              Publish again
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
