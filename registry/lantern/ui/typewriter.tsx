"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { TerminalBody } from "@/registry/lantern/ui/terminal";

type TypewriterLine = {
  /** Show the prompt symbol and style the line as a typed command. */
  prompt?: boolean;
  text: string;
  /** Milliseconds to wait before this line starts. Defaults to the pause prop. */
  delay?: number;
  /** Print the whole line at once instead of typing it. Defaults to true for output lines (no prompt). */
  instant?: boolean;
};

type TypewriterProps = Omit<React.ComponentProps<"div">, "children"> & {
  lines: TypewriterLine[];
  /** Milliseconds per character. */
  speed?: number;
  /** Milliseconds between lines. */
  pause?: number;
  /** Milliseconds before the first line. */
  startDelay?: number;
  /** Start again after the last line. */
  loop?: boolean;
  /** Milliseconds to hold the finished text before looping. */
  loopDelay?: number;
  /** Show a blinking block cursor. */
  cursor?: boolean;
  /** When finished, leave an empty prompt line with the cursor on it. */
  finalPrompt?: boolean;
  promptSymbol?: React.ReactNode;
  onComplete?: () => void;
};

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(callback: () => void) {
  const mql = window.matchMedia(reducedMotionQuery);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function usePrefersReducedMotion() {
  return React.useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(reducedMotionQuery).matches,
    () => false,
  );
}

type Step = { line: number; char: number; done: boolean };
const initialStep: Step = { line: 0, char: -1, done: false };

function Typewriter({
  className,
  lines,
  speed = 45,
  pause = 600,
  startDelay = 400,
  loop = false,
  loopDelay = 2400,
  cursor = true,
  finalPrompt = true,
  promptSymbol = "$",
  onComplete,
  ...props
}: TypewriterProps) {
  const reduced = usePrefersReducedMotion();
  // char -1 means the current line is waiting to start.
  const [step, setStep] = React.useState<Step>(initialStep);
  const onCompleteRef = React.useRef(onComplete);
  // Inline line arrays get a new identity on every parent render; only restart timers when the content changes.
  const linesKey = JSON.stringify(lines);
  const linesRef = React.useRef(lines);
  React.useEffect(() => {
    onCompleteRef.current = onComplete;
    linesRef.current = lines;
  });

  React.useEffect(() => {
    const lines = linesRef.current;
    if (reduced || lines.length === 0) return;

    if (step.done) {
      if (!loop) return;
      const t = window.setTimeout(() => setStep(initialStep), loopDelay);
      return () => window.clearTimeout(t);
    }

    const current = lines[step.line];
    if (!current) return;
    const instant = current.instant ?? !current.prompt;

    if (step.char === -1) {
      const wait = current.delay ?? (step.line === 0 ? startDelay : pause);
      const t = window.setTimeout(
        () => setStep({ line: step.line, char: instant ? current.text.length : 0, done: false }),
        wait,
      );
      return () => window.clearTimeout(t);
    }

    if (step.char < current.text.length) {
      const t = window.setTimeout(() => setStep({ ...step, char: step.char + 1 }), speed);
      return () => window.clearTimeout(t);
    }

    if (step.line < lines.length - 1) {
      setStep({ line: step.line + 1, char: -1, done: false });
    } else {
      setStep({ ...step, done: true });
      onCompleteRef.current?.();
    }
  }, [step, reduced, linesKey, speed, pause, startDelay, loop, loopDelay]);

  const showAll = reduced || step.done;
  const lastVisible = showAll ? lines.length - 1 : step.char === -1 ? step.line - 1 : step.line;
  const cursorEl = cursor ? (
    <span
      data-slot="typewriter-cursor"
      className="ml-px inline-block h-[1.1em] w-[0.6em] bg-current align-[-0.2em] text-terminal-foreground motion-safe:animate-lantern-blink"
    />
  ) : null;
  const cursorOnPrompt = showAll && finalPrompt;

  return (
    <div data-slot="typewriter" className={cn("font-mono text-[13px] leading-[1.7]", className)} {...props}>
      <div aria-hidden="true">
        {lines.slice(0, lastVisible + 1).map((line, i) => {
          const text = !showAll && i === step.line ? line.text.slice(0, Math.max(step.char, 0)) : line.text;
          const isCursorLine = !cursorOnPrompt && i === lastVisible;
          const afterOutput = i > 0 && line.prompt && !lines[i - 1].prompt;
          return (
            <div
              key={i}
              data-slot={line.prompt ? "typewriter-command" : "typewriter-output"}
              className={cn(
                "min-h-[1.7em] break-words whitespace-pre-wrap",
                line.prompt ? "text-terminal-foreground" : "text-[#d9b774]",
                afterOutput && "mt-3",
              )}
            >
              {line.prompt && <span className="mr-2 text-primary select-none">{promptSymbol}</span>}
              {text}
              {isCursorLine && cursorEl}
            </div>
          );
        })}
        {lastVisible < 0 && cursor && <div className="min-h-[1.7em]">{cursorEl}</div>}
        {cursorOnPrompt && (
          <div className={cn("min-h-[1.7em]", lines.length > 0 && !lines[lines.length - 1].prompt && "mt-3")}>
            <span className="mr-2 text-primary select-none">{promptSymbol}</span>
            {cursorEl}
          </div>
        )}
      </div>
      <div className="sr-only">
        {lines.map((line, i) => (
          <p key={i}>{line.text}</p>
        ))}
      </div>
    </div>
  );
}

/** Typewriter inside the padded body of a Terminal. Use in place of TerminalBody. */
function TerminalTypewriter({
  className,
  bodyClassName,
  ...props
}: TypewriterProps & { bodyClassName?: string }) {
  return (
    <TerminalBody data-slot="terminal-typewriter" className={bodyClassName}>
      <Typewriter className={className} {...props} />
    </TerminalBody>
  );
}

export { Typewriter, TerminalTypewriter, type TypewriterLine };
