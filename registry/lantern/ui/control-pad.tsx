"use client";

import * as React from "react";
import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  ChevronsDownIcon,
  ChevronsUpIcon,
  RotateCcwIcon,
  RotateCwIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/registry/lantern/ui/button";

type ControlPadAction = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  /** KeyboardEvent.key that triggers this button, e.g. "w", " " or "Shift". */
  key?: string;
  /** Text shown in the key hint. Defaults to the key. */
  hint?: string;
};

/** Default TurtleDeck layout. `null` leaves a cell empty. */
const defaultControlPadActions: (ControlPadAction | null)[] = [
  { id: "turnLeft", label: "Turn left", icon: <RotateCcwIcon />, key: "q" },
  { id: "forward", label: "Forward", icon: <ArrowUpIcon />, key: "w" },
  { id: "turnRight", label: "Turn right", icon: <RotateCwIcon />, key: "e" },
  { id: "left", label: "Left", icon: <ArrowLeftIcon />, key: "a" },
  { id: "back", label: "Back", icon: <ArrowDownIcon />, key: "s" },
  { id: "right", label: "Right", icon: <ArrowRightIcon />, key: "d" },
  { id: "up", label: "Up", icon: <ChevronsUpIcon />, key: " ", hint: "Space" },
  null,
  { id: "down", label: "Down", icon: <ChevronsDownIcon />, key: "Shift", hint: "Shift" },
];

function keyHint(action: ControlPadAction) {
  if (action.hint) return action.hint;
  if (!action.key) return undefined;
  return action.key === " " ? "Space" : action.key.length === 1 ? action.key.toUpperCase() : action.key;
}

function ariaKey(key: string) {
  return key === " " ? "Space" : key.length === 1 ? key.toUpperCase() : key;
}

function isInside(root: HTMLElement | null, target: EventTarget | null) {
  return !!root && target instanceof Node && root.contains(target);
}

function isEditable(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return target.isContentEditable || !!target.closest("input, textarea, select, [contenteditable=''], [contenteditable='true']");
}

/** The TurtleDeck movement pad: a 3x3 grid of buttons with icons, labels and key hints. */
function ControlPad({
  className,
  actions = defaultControlPadActions,
  onAction,
  keyboard = false,
  showLabels = true,
  showHints = true,
  disabled = false,
  columns = 3,
  "aria-label": ariaLabel = "Movement controls",
  ...props
}: Omit<React.ComponentProps<"div">, "onKeyDown" | "onKeyUp"> & {
  actions?: (ControlPadAction | null)[];
  onAction?: (id: string, action: ControlPadAction) => void;
  /** Bind keys: "pad" while focus is inside the pad, "page" (or true) anywhere except text fields. */
  keyboard?: boolean | "pad" | "page";
  showLabels?: boolean;
  showHints?: boolean;
  disabled?: boolean;
  columns?: number;
}) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [pressed, setPressed] = React.useState<ReadonlySet<string>>(() => new Set());
  const scope = keyboard === true ? "page" : keyboard || null;

  const latest = React.useRef({ actions, onAction, disabled });
  latest.current = { actions, onAction, disabled };

  const findAction = React.useCallback((event: KeyboardEvent | React.KeyboardEvent) => {
    const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
    return latest.current.actions.find(
      (a): a is ControlPadAction => !!a?.key && (a.key.length === 1 ? a.key.toLowerCase() : a.key) === key,
    );
  }, []);

  const handleDown = React.useCallback(
    (event: KeyboardEvent | React.KeyboardEvent) => {
      if (latest.current.disabled || event.ctrlKey || event.metaKey || event.altKey) return;
      if (isEditable(event.target)) return;
      const action = findAction(event);
      if (!action) return;
      // Leave Space alone on other controls elsewhere on the page.
      const inside = isInside(rootRef.current, event.target);
      if (!inside && action.key === " " && event.target instanceof HTMLElement && event.target.closest("button, a, [role]")) return;
      event.preventDefault();
      setPressed((prev) => (prev.has(action.id) ? prev : new Set(prev).add(action.id)));
      if (!event.repeat) latest.current.onAction?.(action.id, action);
    },
    [findAction],
  );

  const handleUp = React.useCallback(
    (event: KeyboardEvent | React.KeyboardEvent) => {
      const action = findAction(event);
      if (!action) return;
      if (!isEditable(event.target) && action.key === " " && isInside(rootRef.current, event.target)) {
        event.preventDefault(); // stop the focused pad button from also clicking
      }
      setPressed((prev) => {
        if (!prev.has(action.id)) return prev;
        const next = new Set(prev);
        next.delete(action.id);
        return next;
      });
    },
    [findAction],
  );

  React.useEffect(() => {
    if (scope !== "page") return;
    const clear = () => setPressed(new Set());
    window.addEventListener("keydown", handleDown);
    window.addEventListener("keyup", handleUp);
    window.addEventListener("blur", clear);
    return () => {
      window.removeEventListener("keydown", handleDown);
      window.removeEventListener("keyup", handleUp);
      window.removeEventListener("blur", clear);
    };
  }, [scope, handleDown, handleUp]);

  return (
    <div
      ref={rootRef}
      role="group"
      aria-label={ariaLabel}
      data-slot="control-pad"
      className={cn("grid gap-1.5", className)}
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      onKeyDown={scope === "pad" ? handleDown : undefined}
      onKeyUp={scope === "pad" ? handleUp : undefined}
      onBlur={scope === "pad" ? (e) => !e.currentTarget.contains(e.relatedTarget) && setPressed(new Set()) : undefined}
      {...props}
    >
      {actions.map((action, i) => {
        if (!action) return <span key={`empty-${i}`} aria-hidden="true" data-slot="control-pad-spacer" />;
        const hint = keyHint(action);
        return (
          <button
            key={action.id}
            type="button"
            data-slot="control-pad-button"
            data-pressed={pressed.has(action.id) || undefined}
            disabled={disabled}
            aria-label={showLabels ? undefined : action.label}
            aria-keyshortcuts={scope && action.key ? ariaKey(action.key) : undefined}
            title={showLabels ? undefined : hint ? `${action.label} (${hint})` : action.label}
            onClick={() => onAction?.(action.id, action)}
            className={cn(
              buttonVariants({ variant: "secondary" }),
              "h-auto min-w-0 flex-col gap-1 px-1 text-[12.5px]",
              showLabels ? "pt-2.5 pb-2" : "aspect-square py-0 sm:aspect-auto sm:h-12",
              "data-pressed:translate-y-px data-pressed:border-primary data-pressed:bg-primary/10 data-pressed:text-primary",
              "[&_svg]:text-primary",
            )}
          >
            {action.icon && <span aria-hidden="true" className="flex">{action.icon}</span>}
            {showLabels && <span className="max-w-full truncate">{action.label}</span>}
            {showHints && hint && (
              <kbd
                aria-hidden="true"
                className="font-mono text-[9px] font-normal tracking-[0.1em] text-muted-foreground uppercase"
              >
                {hint}
              </kbd>
            )}
          </button>
        );
      })}
    </div>
  );
}

export { ControlPad, defaultControlPadActions, type ControlPadAction };
