"use client";

import * as React from "react";
import {
  CheckIcon,
  CircleAlertIcon,
  CircleXIcon,
  MessageSquareTextIcon,
  SparklesIcon,
  SquareIcon,
  WrenchIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/registry/lantern/ui/badge";
import { Button } from "@/registry/lantern/ui/button";
import { Eyebrow } from "@/registry/lantern/ui/eyebrow";
import { formatElapsed, useElapsed } from "@/registry/lantern/ui/job-card";
import { Label } from "@/registry/lantern/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/lantern/ui/select";
import { StreamBox } from "@/registry/lantern/ui/stream-box";
import { Textarea } from "@/registry/lantern/ui/textarea";

export type AiPanelStatus = "idle" | "running" | "result" | "error";

export type AiPanelModel = { value: string; label: string };

export type AiPanelFile = {
  path: string;
  /** Short description, e.g. "new, 23 lines" or "+12 lines". */
  detail?: string;
  status?: "new" | "changed" | "deleted";
};

export type AiPanelResult = {
  /** One or two sentences on what the change does. */
  summary: React.ReactNode;
  /** Whether the app's own checks passed. Leave undefined to hide the badge. */
  checksPassed?: boolean;
  /** Badge text, e.g. "Passed TurtleDeck's checks" or "2 checks failed". */
  checksLabel?: string;
  /** The model that wrote it, shown as "by <model>". */
  model?: string;
  /** Dry-run tiles, test requests or anything else that shows the result works. */
  evidence?: React.ReactNode;
  files?: AiPanelFile[];
};

export type AiPanelProps = Omit<React.ComponentProps<"section">, "title"> & {
  title?: React.ReactNode;
  /** Small text on the right of the header, e.g. "Shared allowance". */
  badge?: React.ReactNode;
  promptLabel?: string;
  placeholder?: string;
  prompt: string;
  onPromptChange: (value: string) => void;
  models: AiPanelModel[];
  model: string;
  onModelChange: (value: string) => void;
  status: AiPanelStatus;
  /** Date.now() when the current request started. Drives the elapsed clock while running. */
  startedAt?: number | null;
  /** Streamed reasoning so far. */
  thinking?: string;
  /** Streamed output (code) so far. */
  writing?: string;
  /** After a run: how long the model thought and how long the whole request took, e.g. "1:31" and "2:16". */
  thought?: { duration: string; total?: string };
  result?: AiPanelResult | null;
  error?: React.ReactNode;
  /** Allowance meters shown at the bottom of the panel. */
  allowance?: React.ReactNode;
  generateLabel?: string;
  applyLabel?: string;
  /** Extra buttons between Apply and Discard, e.g. "Send to Testy". */
  resultActions?: React.ReactNode;
  onGenerate: () => void;
  onFix?: () => void;
  onExplain?: () => void;
  onCancel?: () => void;
  onApply?: () => void;
  onDiscard?: () => void;
};

const fileTone = { new: "text-primary", changed: "text-warning", deleted: "text-destructive" } as const;

/**
 * The AI side panel: prompt, actions and model picker; a running state with an elapsed clock and
 * Thinking / Writing stream boxes; and a result card with checks, evidence, changed files and
 * Apply / Discard. Request state comes in through props, so any backend can drive it.
 */
export function AiPanel({
  className,
  title = "Forge with AI",
  badge = "Shared allowance",
  promptLabel = "What should it do?",
  placeholder = "Describe the change in a sentence or two.",
  prompt,
  onPromptChange,
  models,
  model,
  onModelChange,
  status,
  startedAt,
  thinking = "",
  writing = "",
  thought,
  result,
  error,
  allowance,
  generateLabel = "Generate",
  applyLabel = "Apply to editor",
  resultActions,
  onGenerate,
  onFix,
  onExplain,
  onCancel,
  onApply,
  onDiscard,
  ...props
}: AiPanelProps) {
  const promptId = React.useId();
  const running = status === "running";
  const elapsed = useElapsed(running ? startedAt : null);
  const canSend = prompt.trim().length > 0 && !running;
  const hasWriting = writing.length > 0;
  // Thinking starts open and folds away once the model starts writing.
  const [thinkingOpen, setThinkingOpen] = React.useState(true);
  React.useEffect(() => setThinkingOpen(!hasWriting), [hasWriting]);
  const announcement = running ? (hasWriting ? "Writing" : "Thinking") : status === "result" ? "Result ready" : "";

  return (
    <section
      data-slot="ai-panel"
      aria-label={typeof title === "string" ? title : "AI"}
      aria-busy={running}
      className={cn("flex min-h-0 min-w-0 flex-col gap-3.5 bg-card p-4", className)}
      {...props}
    >
      <span className="sr-only" aria-live="polite">
        {announcement}
      </span>
      <div className="flex items-center gap-2">
        <SparklesIcon aria-hidden="true" className="size-4 text-primary" />
        <Eyebrow>{title}</Eyebrow>
        {badge && (
          <span className="ml-auto font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase">{badge}</span>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor={promptId} className="text-xs font-normal text-muted-foreground">
          {promptLabel}
        </Label>
        <Textarea
          id={promptId}
          rows={3}
          value={prompt}
          placeholder={placeholder}
          disabled={running}
          onChange={(e) => onPromptChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey) && canSend) {
              e.preventDefault();
              onGenerate();
            }
          }}
          aria-describedby={`${promptId}-hint`}
          className="max-h-48 min-h-[5.5rem] resize-none text-[13px]"
        />
        <span id={`${promptId}-hint`} className="sr-only">
          Press Control or Command and Enter to generate.
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" onClick={onGenerate} disabled={!canSend}>
          <SparklesIcon /> {generateLabel}
        </Button>
        {onFix && (
          <Button size="sm" variant="secondary" onClick={onFix} disabled={running}>
            <WrenchIcon /> Fix
          </Button>
        )}
        {onExplain && (
          <Button size="sm" variant="secondary" onClick={onExplain} disabled={running}>
            <MessageSquareTextIcon /> Explain
          </Button>
        )}
        <Select value={model} onValueChange={onModelChange} disabled={running}>
          <SelectTrigger size="sm" aria-label="Model" className="min-w-40 flex-1 font-mono text-[11px]">
            <SelectValue placeholder="Model" />
          </SelectTrigger>
          <SelectContent align="end">
            {models.map((m) => (
              <SelectItem key={m.value} value={m.value} className="font-mono text-xs">
                {m.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="-mr-2 flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto pr-2 pb-2 empty:hidden">
        {running && (
          <>
            <div className="flex items-center gap-2.5">
              <span aria-hidden="true" className="size-1.5 animate-lantern-pulse rounded-full bg-primary [animation-duration:1.2s]" />
              <span className="font-mono text-[10px] tracking-[0.2em] text-primary uppercase">
                {hasWriting ? "Writing" : "Thinking"}
              </span>
              <span className="font-mono text-xs text-muted-foreground tabular-nums">
                {elapsed != null ? formatElapsed(elapsed) : "0:00"}
              </span>
              {onCancel && (
                <Button size="sm" variant="ghost" className="ml-auto h-7 px-2" onClick={onCancel}>
                  <SquareIcon /> Cancel
                </Button>
              )}
            </div>
            <StreamBox
              title="Thinking"
              text={thinking}
              streaming={!hasWriting}
              open={thinkingOpen}
              onOpenChange={setThinkingOpen}
            />
            {hasWriting && <StreamBox title="Writing" text={writing} streaming maxHeight={200} />}
          </>
        )}

        {status === "error" && error && (
          <div
            role="alert"
            className="flex gap-2.5 rounded-md border border-destructive/40 bg-destructive/10 p-3 text-[13px] text-destructive"
          >
            <CircleAlertIcon aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            <div className="min-w-0">{error}</div>
          </div>
        )}

        {status === "result" && result && (
          <>
            {thought && thinking && (
              <StreamBox
                title={`Thought for ${thought.duration}`}
                meta={thought.total ? `Whole request ${thought.total}` : undefined}
                text={thinking}
                defaultOpen={false}
              />
            )}
            <div
              data-slot="ai-panel-result"
              className="flex flex-col gap-3 rounded-lg border border-input bg-background p-3.5 shadow-block-sm"
            >
              {(result.checksPassed !== undefined || result.model) && (
                <div className="flex flex-wrap items-center gap-2">
                  {result.checksPassed !== undefined && (
                    <Badge variant={result.checksPassed ? "success" : "destructive"}>
                      {result.checksPassed ? <CheckIcon /> : <CircleXIcon />}
                      {result.checksLabel ?? (result.checksPassed ? "Checks passed" : "Checks failed")}
                    </Badge>
                  )}
                  {result.model && (
                    <span className="ml-auto font-mono text-[11px] text-muted-foreground">by {result.model}</span>
                  )}
                </div>
              )}
              <p className="text-[13px] leading-relaxed">{result.summary}</p>
              {result.evidence}
              {result.files && result.files.length > 0 && (
                <ul aria-label="Changed files" className="flex flex-col gap-1 border-t pt-2.5">
                  {result.files.map((f) => (
                    <li key={f.path} className="flex min-w-0 items-baseline gap-3 font-mono text-xs">
                      <span className={cn("min-w-0 truncate", f.status && fileTone[f.status])}>{f.path}</span>
                      {f.detail && <span className="ml-auto shrink-0 text-muted-foreground">{f.detail}</span>}
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex flex-wrap gap-2">
                {onApply && (
                  <Button size="sm" onClick={onApply}>
                    {applyLabel}
                  </Button>
                )}
                {resultActions}
                {onDiscard && (
                  <Button size="sm" variant="outline" onClick={onDiscard}>
                    Discard
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {allowance && <div className="mt-auto border-t pt-3">{allowance}</div>}
    </section>
  );
}

/** An eyebrow title over evidence content, for the result card. */
export function AiPanelEvidence({
  title,
  className,
  children,
  ...props
}: Omit<React.ComponentProps<"div">, "title"> & { title: React.ReactNode }) {
  return (
    <div data-slot="ai-panel-evidence" className={cn("flex flex-col gap-2", className)} {...props}>
      <Eyebrow>{title}</Eyebrow>
      {children}
    </div>
  );
}

/** A list of checks with a mark each, e.g. test requests and their responses. */
export function AiPanelChecklist({
  items,
  className,
  ...props
}: React.ComponentProps<"ul"> & { items: { label: React.ReactNode; ok: boolean }[] }) {
  return (
    <ul className={cn("flex flex-col gap-1.5 font-mono text-[11px] leading-snug", className)} {...props}>
      {items.map((item, i) => (
        <li key={i} className="flex gap-2">
          {item.ok ? (
            <CheckIcon aria-label="Passed" className="mt-px size-3.5 shrink-0 text-success" />
          ) : (
            <CircleXIcon aria-label="Failed" className="mt-px size-3.5 shrink-0 text-destructive" />
          )}
          <span className="min-w-0 break-words">{item.label}</span>
        </li>
      ))}
    </ul>
  );
}
