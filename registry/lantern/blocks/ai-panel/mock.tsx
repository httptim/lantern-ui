"use client";

import * as React from "react";

import { Stat, StatGroup, StatLabel, StatValue } from "@/registry/lantern/ui/stat";
import { formatElapsed } from "@/registry/lantern/ui/job-card";

import { AiPanelChecklist, AiPanelEvidence, type AiPanelProps, type AiPanelResult, type AiPanelStatus } from "./panel";

// Canned responses so the block runs without a backend. Replace useMockAiRun with calls to your own API.

export const mockModels = [
  { value: "auto", label: "Auto (fast)" },
  { value: "deepseek-flash", label: "DeepSeek V4.1 Flash (thinks)" },
  { value: "qwen-coder", label: "Qwen3 Coder 480B" },
];

const flavors = {
  turtledeck: {
    title: "Forge with AI",
    prompt:
      "Strip mine at y=-59 for diamonds: 3 branches of 32, a torch every 8 blocks, come home to unload when full.",
    thinking: `Diamonds peak between y=-64 and y=-54, so -59 sits in the middle of the band.
Three branches of 32 blocks, 3 apart, so nothing is skipped between tunnels.
td.mine.stairs walks down first; td.run wraps the loop so a full inventory sends it home to unload.
Each step: check(), dig and move forward, clear the block above for a 2-high tunnel.
Torch on the left wall every 8 blocks.
Fuel estimate: about 480 including the stairs. Testy has 3,602, which is plenty.`,
    writing: `local BRANCHES, LENGTH, SPACING = 3, 32, 3
local TORCH_EVERY = 8

td.setHome()
td.mine.stairs{ toY = -59, returnHome = false }

td.run("Diamond strip mine", {}, function(check)
  for b = 1, BRANCHES do
    for step = 1, LENGTH do
      check()
      assert(td.digMove("forward"))
      td.clear("up")
      if step % TORCH_EVERY == 0 then td.placeTorch("left") end
    end
    td.face((td.facing() + 1) % 4)
    for _ = 1, SPACING do td.digMove("forward") end
  end
end)`,
    result: {
      summary:
        "Walks down to y=-59 by stairs, mines three 32-block branches three apart with a torch every 8 blocks, and lets td.run bring it home and unload when the inventory fills.",
      checksPassed: true,
      checksLabel: "Passed TurtleDeck's checks",
      files: [{ path: "strip_mine.lua", detail: "new, 23 lines", status: "new" }],
      evidence: (
        <AiPanelEvidence title="Dry run in a simulated world">
          <StatGroup variant="tiles">
            <Stat>
              <StatLabel>Dug</StatLabel>
              <StatValue>214</StatValue>
            </Stat>
            <Stat>
              <StatLabel>Torches</StatLabel>
              <StatValue>12</StatValue>
            </Stat>
            <Stat>
              <StatLabel>Fuel</StatLabel>
              <StatValue>486</StatValue>
            </Stat>
            <Stat>
              <StatLabel>Ends</StatLabel>
              <StatValue>Home</StatValue>
            </Stat>
          </StatGroup>
        </AiPanelEvidence>
      ),
    } satisfies Omit<AiPanelResult, "model">,
  },
  lantern: {
    title: "Build with AI",
    prompt:
      "Add a guestbook: the form posts to /sign with name and message, show the 10 newest entries, reject empty ones.",
    thinking: `Entries live in ctx.read("entries"). Validate the name before writing; a blank or 60+ character name gets a 400.
Keep only the newest 10 so the page stays short.
Redirect back to / after a post so a refresh does not sign twice.
index.json needs the form and a list bound to entries.`,
    writing: `local MAX = 10

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
end`,
    result: {
      summary:
        "Adds app.lua with a /sign handler that validates the name, keeps the newest 10 entries, and lists them on the home page under the form.",
      checksPassed: true,
      checksLabel: "Passed Lantern's checks",
      files: [
        { path: "app.lua", detail: "new, 47 lines", status: "new" },
        { path: "index.json", detail: "+12 lines", status: "changed" },
      ],
      evidence: (
        <AiPanelEvidence title="Test requests">
          <AiPanelChecklist
            items={[
              { ok: true, label: "POST /sign name=Tim -> redirect /" },
              { ok: true, label: 'POST /sign name="" -> 400 Enter a name' },
              { ok: true, label: 'GET / shows "Tim: Nice base!"' },
            ]}
          />
        </AiPanelEvidence>
      ),
    } satisfies Omit<AiPanelResult, "model">,
  },
};

export type MockFlavor = keyof typeof flavors;

/**
 * Drives AiPanel with canned streaming text. Returns props to spread on AiPanel, the written code,
 * and `show` to jump straight to a state.
 */
export function useMockAiRun(flavor: MockFlavor = "turtledeck", onApply?: (code: string) => void) {
  const data = flavors[flavor];
  const [prompt, setPrompt] = React.useState(data.prompt);
  const [model, setModel] = React.useState("deepseek-flash");
  const [status, setStatus] = React.useState<AiPanelStatus>("idle");
  const [startedAt, setStartedAt] = React.useState<number | null>(null);
  const [thinking, setThinking] = React.useState("");
  const [writing, setWriting] = React.useState("");
  const [thought, setThought] = React.useState<{ duration: string; total: string } | undefined>();
  const timer = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = React.useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  }, []);
  React.useEffect(() => stop, [stop]);

  const finish = React.useCallback(
    (start: number, thinkEnd: number) => {
      stop();
      setThinking(data.thinking);
      setWriting(data.writing);
      const now = Date.now();
      // Scale the demo's seconds up so the summary line reads like a real run.
      setThought({ duration: formatElapsed(((thinkEnd - start) / 1000) * 12), total: formatElapsed(((now - start) / 1000) * 12) });
      setStatus("result");
    },
    [data, stop],
  );

  const generate = React.useCallback(() => {
    stop();
    const start = Date.now();
    let thinkEnd = 0;
    let t = 0;
    let w = 0;
    setStartedAt(start);
    setThinking("");
    setWriting("");
    setThought(undefined);
    setStatus("running");
    timer.current = setInterval(() => {
      if (t < data.thinking.length) {
        t = Math.min(data.thinking.length, t + 7);
        setThinking(data.thinking.slice(0, t));
        if (t === data.thinking.length) thinkEnd = Date.now();
      } else if (w < data.writing.length) {
        w = Math.min(data.writing.length, w + 9);
        setWriting(data.writing.slice(0, w));
      } else {
        finish(start, thinkEnd);
      }
    }, 40);
  }, [data, finish, stop]);

  const reset = React.useCallback(() => {
    stop();
    setStatus("idle");
    setStartedAt(null);
    setThinking("");
    setWriting("");
    setThought(undefined);
  }, [stop]);

  const show = React.useCallback(
    (next: AiPanelStatus) => {
      if (next === "running") generate();
      else if (next === "result") {
        const start = Date.now() - 11_000;
        finish(start, start + 7_600);
      } else if (next === "error") {
        stop();
        setStatus("error");
      } else reset();
    },
    [finish, generate, reset, stop],
  );

  const modelLabel = mockModels.find((m) => m.value === model)?.label.replace(/ \(.*\)$/, "");

  const panelProps = {
    title: data.title,
    prompt,
    onPromptChange: setPrompt,
    models: mockModels,
    model,
    onModelChange: setModel,
    status,
    startedAt,
    thinking,
    writing,
    thought,
    result: status === "result" ? { ...data.result, model: modelLabel } : null,
    error:
      status === "error" ? "The model stopped before finishing. Nothing was charged to your allowance. Try again." : undefined,
    onGenerate: generate,
    onFix: generate,
    onExplain: generate,
    onCancel: reset,
    onApply: () => {
      onApply?.(data.writing);
      reset();
    },
    onDiscard: reset,
  } satisfies AiPanelProps;

  return { panelProps, status, show, code: data.writing };
}
