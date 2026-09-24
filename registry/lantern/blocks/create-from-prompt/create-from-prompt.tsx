"use client";

import * as React from "react";
import { ArrowRightIcon, SparklesIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { AccountChip, AccountChipContent, AccountChipLabel, AccountChipTrigger } from "@/registry/lantern/ui/account-chip";
import { Button } from "@/registry/lantern/ui/button";
import { DropdownMenuItem, DropdownMenuSeparator } from "@/registry/lantern/ui/dropdown-menu";
import { Eyebrow } from "@/registry/lantern/ui/eyebrow";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/registry/lantern/ui/input-group";
import {
  JobCard,
  JobCardEyebrow,
  JobCardHeader,
  JobCardTimer,
} from "@/registry/lantern/ui/job-card";
import { Label } from "@/registry/lantern/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/lantern/ui/select";
import { StepList, StepListItem, type StepListState } from "@/registry/lantern/ui/step-list";
import { StreamBox } from "@/registry/lantern/ui/stream-box";
import { Textarea } from "@/registry/lantern/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/registry/lantern/ui/toggle-group";
import { UsageMeter, UsageMeterGroup, UsageMeterGroupLabel } from "@/registry/lantern/ui/usage-meter";

const templates: Record<string, string> = {
  Homepage: "A homepage for my base with a short welcome, a photo wall of builds and a link to my shop.",
  "Shop price list": "A price list for my shop: items, prices in diamonds, and a note when something is sold out.",
  Guestbook:
    "A homepage for my base with an about page, and a guestbook where visitors can sign their name and leave a message. Newest messages first.",
  "Docs site": "Docs for my turtle scripts: one page per script with what it does and how to run it.",
  "Mini wiki": "A small wiki for our town: places, people and rules, each on its own page with links between them.",
  Marketplace: "A marketplace board where players post what they are selling and how to reach them.",
};

const models = [
  { value: "auto", label: "Auto (fast)", cost: "About 1 cent of your allowance" },
  { value: "deepseek-flash", label: "DeepSeek V4.1 Flash", cost: "About 2 cents of your allowance" },
  { value: "qwen-coder", label: "Qwen3 Coder 480B", cost: "About 4 cents of your allowance" },
];

// Mock build plan: step label and how long it takes in the demo (ms).
const plan = [
  { label: "Planned 3 pages and an app", ms: 1400 },
  { label: "Wrote index.json, about.json", ms: 1800 },
  { label: "Wrote app.lua", ms: 2200 },
  { label: "Tested requests", ms: 1600 },
  { label: "Draft ready", ms: 600 },
];

const WRITING = `local MAX = 10

return function(ctx)
  local entries = ctx.read("entries", {})
  if ctx.method == "POST" and ctx.path == "/sign" then
    local name = ctx.fields.name or ""
    local message = ctx.fields.message or ""
    if not name:match("%S") or #name > 60 then
      return {kind="error", status=400, message="Enter a name."}
    end
    table.insert(entries, 1, {name=name, message=message})
    while #entries > MAX do table.remove(entries) end
    ctx.write("entries", entries)
    return {kind="redirect", path="/"}
  end
end`;

const taken = new Set(["north", "spawn", "hub", "market"]);

function addressState(value: string) {
  if (!value) return { tone: "text-muted-foreground", label: "Pick a name" };
  if (!/^[a-z0-9-]{3,32}$/.test(value)) return { tone: "text-destructive", label: "3 to 32 of a-z, 0-9, -" };
  if (taken.has(value)) return { tone: "text-destructive", label: "Taken" };
  return { tone: "text-success", label: "Available" };
}

function clock(ms: number) {
  const s = Math.round(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

/** Lantern Hub's new site page: describe a site, pick a template and model, and watch the draft build. */
export default function CreateFromPrompt() {
  const [address, setAddress] = React.useState("alex-builds");
  const [template, setTemplate] = React.useState("Guestbook");
  const [description, setDescription] = React.useState(templates.Guestbook);
  const [model, setModel] = React.useState("auto");
  const [startedAt, setStartedAt] = React.useState<number | null>(null);
  const [now, setNow] = React.useState(0);
  const addressId = React.useId();
  const descriptionId = React.useId();

  const elapsed = startedAt ? now - startedAt : 0;
  const total = plan.reduce((sum, s) => sum + s.ms, 0);
  const done = startedAt != null && elapsed >= total;
  const running = startedAt != null && !done;
  const status = addressState(address);
  const canGenerate = status.label === "Available" && description.trim().length > 0 && !running;

  React.useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setNow(Date.now()), 100);
    return () => clearInterval(id);
  }, [running]);

  // Step states and end times from the elapsed time.
  let acc = 0;
  const steps = plan.map((s) => {
    const start = acc;
    acc += s.ms;
    const state: StepListState = startedAt == null ? "todo" : elapsed >= acc ? "done" : elapsed >= start ? "current" : "todo";
    return { ...s, state, time: state === "done" ? clock(acc * 9) : state === "current" ? clock(elapsed * 9) : undefined };
  });
  const writeStart = plan[0].ms + plan[1].ms;
  const writeShare = Math.min(1, Math.max(0, (elapsed - writeStart) / plan[2].ms));
  const writing = startedAt ? WRITING.slice(0, Math.floor(WRITING.length * writeShare)) : "";

  function generate(event: React.FormEvent) {
    event.preventDefault();
    if (!canGenerate) return;
    const t = Date.now();
    setStartedAt(t);
    setNow(t);
  }

  return (
    <div className="flex min-h-svh flex-col bg-background">
      <header className="flex h-14 shrink-0 items-center gap-6 border-b bg-card px-4 sm:px-5 lg:h-15">
        <span className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
          <LanternMark />
          lantern<span className="-ml-2 text-primary">.</span>
        </span>
        <nav aria-label="Main" className="hidden gap-5 text-[13px] md:flex">
          {["Explore", "Templates", "Docs", "Dashboard"].map((n) => (
            <a
              key={n}
              href="#"
              aria-current={n === "Dashboard" ? "page" : undefined}
              className="text-muted-foreground transition-colors hover:text-foreground aria-[current=page]:text-foreground"
            >
              {n}
            </a>
          ))}
        </nav>
        <div className="ml-auto">
          <AccountChip>
            <AccountChipTrigger name="Alex" plan="Free" fallback="AL">
              <UsageMeterGroup aria-label="AI allowance" className="hidden lg:flex">
                <UsageMeterGroupLabel>AI allowance</UsageMeterGroupLabel>
                <UsageMeter size="compact" label="5-hour" value={32} />
                <UsageMeter size="compact" label="Week" value={18} />
              </UsageMeterGroup>
            </AccountChipTrigger>
            <AccountChipContent>
              <AccountChipLabel name="Alex" email="alex@thultz.dev" plan="Free">
                <UsageMeter label="5-hour" value={32} reset="Resets at 3:40 pm" />
                <UsageMeter label="Week" value={18} reset="Resets Monday" />
              </AccountChipLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>My sites</DropdownMenuItem>
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </AccountChipContent>
          </AccountChip>
        </div>
      </header>

      <div className="flex flex-1">
        <nav aria-label="Workbench" className="hidden w-[200px] shrink-0 flex-col gap-1 border-r px-3 py-4 lg:flex">
          <Eyebrow className="mb-2 px-2.5">Workbench</Eyebrow>
          {["Overview", "New site", "My sites", "Notifications", "Templates", "Docs", "Status"].map((n) => (
            <a
              key={n}
              href="#"
              aria-current={n === "New site" ? "page" : undefined}
              className="rounded-md border-l-2 border-transparent px-2.5 py-2 text-[13px] text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground aria-[current=page]:border-primary aria-[current=page]:bg-secondary aria-[current=page]:text-foreground"
            >
              {n}
            </a>
          ))}
        </nav>

        <main className="flex min-w-0 flex-1 flex-col gap-8 bg-grid px-4 py-8 sm:px-8 lg:px-12 lg:py-10 xl:flex-row">
          <section className="flex max-w-[640px] min-w-0 flex-1 flex-col gap-4">
            <Eyebrow>New site</Eyebrow>
            <h1 className="text-4xl leading-[1.05] font-bold tracking-tight sm:text-[44px]">
              Describe it. We&apos;ll build the first draft<span className="text-primary">.</span>
            </h1>
            <p className="max-w-[560px] text-[15px] leading-relaxed text-muted-foreground">
              The AI writes the pages and the app, tests every form, and hands you a site you can edit before anyone sees it.
            </p>

            <form
              onSubmit={generate}
              className="mt-1 flex flex-col gap-4 rounded-lg border border-input bg-card p-4 shadow-block sm:p-5"
            >
              <div className="grid gap-2">
                <Label htmlFor={addressId} className="sr-only">
                  Site address
                </Label>
                <InputGroup>
                  <InputGroupAddon className="self-stretch border-r bg-secondary pr-3">
                    <InputGroupText>hub://</InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput
                    id={addressId}
                    value={address}
                    onChange={(e) => setAddress(e.target.value.toLowerCase())}
                    disabled={running}
                    autoComplete="off"
                    spellCheck={false}
                    aria-describedby={`${addressId}-status`}
                    aria-invalid={status.tone === "text-destructive" || undefined}
                    className="font-mono text-[13px]"
                  />
                  <InputGroupAddon align="inline-end">
                    <span
                      id={`${addressId}-status`}
                      aria-live="polite"
                      className={cn("font-mono text-[10px] tracking-[0.12em] uppercase", status.tone)}
                    >
                      {status.label}
                    </span>
                  </InputGroupAddon>
                </InputGroup>
              </div>

              <div className="grid gap-2">
                <Label htmlFor={descriptionId} className="text-xs font-normal text-muted-foreground">
                  What is the site for?
                </Label>
                <Textarea
                  id={descriptionId}
                  rows={4}
                  value={description}
                  disabled={running}
                  onChange={(e) => setDescription(e.target.value)}
                  className="resize-none text-sm"
                />
              </div>

              <ToggleGroup
                type="single"
                value={template}
                onValueChange={(v) => {
                  if (!v) return;
                  setTemplate(v);
                  setDescription(templates[v]);
                }}
                disabled={running}
                aria-label="Start from a template"
                className="w-full flex-wrap justify-start gap-2"
              >
                {Object.keys(templates).map((t) => (
                  <ToggleGroupItem
                    key={t}
                    value={t}
                    size="sm"
                    className="flex-none border border-input px-3 text-xs text-foreground data-[state=on]:border-primary data-[state=on]:bg-secondary data-[state=on]:text-foreground"
                  >
                    {t}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>

              <div className="flex flex-wrap items-center gap-3">
                <Select value={model} onValueChange={setModel} disabled={running}>
                  <SelectTrigger size="sm" aria-label="Model" className="font-mono text-[11px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {models.map((m) => (
                      <SelectItem key={m.value} value={m.value} className="font-mono text-xs">
                        {m.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className="text-xs text-muted-foreground">{models.find((m) => m.value === model)?.cost}</span>
                <Button type="submit" disabled={!canGenerate} className="w-full sm:ml-auto sm:w-auto">
                  <SparklesIcon /> {done ? "Generate again" : "Generate site"}
                </Button>
              </div>
            </form>
          </section>

          <aside aria-label="Build progress" className="flex w-full flex-col gap-3.5 xl:w-[380px] xl:shrink-0 xl:pt-[34px]">
            {startedAt == null ? (
              <div className="flex flex-col gap-3 rounded-lg border bg-card p-4">
                <Eyebrow>What happens next</Eyebrow>
                <StepList>
                  {plan.slice(0, 4).map((s) => (
                    <StepListItem key={s.label}>{s.label.replace(/^Planned/, "Plan").replace(/^Wrote/, "Write").replace(/^Tested/, "Test")}</StepListItem>
                  ))}
                </StepList>
              </div>
            ) : (
              <JobCard className="gap-3.5">
                <JobCardHeader>
                  <JobCardEyebrow>{done ? `Built ${address}` : `Building ${address}`}</JobCardEyebrow>
                  <JobCardTimer className="ml-auto">{clock(Math.min(elapsed, total) * 9)}</JobCardTimer>
                </JobCardHeader>
                <StepList aria-label="Steps">
                  {steps.map((s) => (
                    <StepListItem key={s.label} state={s.state} time={s.time}>
                      {s.label}
                    </StepListItem>
                  ))}
                </StepList>
                {writing && (
                  <StreamBox title="Writing" text={writing} streaming={running && writeShare < 1} maxHeight={120} />
                )}
                {done ? (
                  <Button className="self-start">
                    Open in Creator Studio <ArrowRightIcon />
                  </Button>
                ) : (
                  <Button variant="ghost" size="sm" className="self-start" onClick={() => setStartedAt(null)}>
                    Cancel
                  </Button>
                )}
              </JobCard>
            )}
            <p className="px-1 text-xs leading-relaxed text-muted-foreground">
              Nothing is published until you press Publish in the editor. The draft opens in Creator Studio when it is ready.
            </p>
          </aside>
        </main>
      </div>
    </div>
  );
}

function LanternMark() {
  return (
    <svg width="18" height="20" viewBox="0 0 20 22" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className="text-primary">
      <path d="M7 2h6" />
      <path d="M10 2v3" />
      <rect x="4" y="5" width="12" height="14" rx="2" />
      <path d="M10 9c2 2 2 4 0 6c-2-2-2-4 0-6Z" fill="currentColor" />
    </svg>
  );
}
