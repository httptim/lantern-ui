"use client";

import * as React from "react";
import {
  ChevronRightIcon,
  FileCodeIcon,
  FileIcon,
  FileImageIcon,
  FileJsonIcon,
  FileTextIcon,
  FolderIcon,
  FolderOpenIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

type FileTreeItem = {
  id: string;
  name: string;
  /** Present (even empty) for folders. */
  children?: FileTreeItem[];
  icon?: React.ReactNode;
  /** Short status letter such as "M", "A" or "D". */
  badge?: string;
  badgeTone?: "warning" | "success" | "destructive" | "muted";
  /** Accessible description of the badge, e.g. "Modified". */
  badgeLabel?: string;
  disabled?: boolean;
};

const badgeTones = {
  warning: "text-warning",
  success: "text-success",
  destructive: "text-destructive",
  muted: "text-muted-foreground",
} as const;

function fileIcon(name: string) {
  const ext = name.split(".").pop()?.toLowerCase();
  if (["lua", "ts", "tsx", "js", "jsx", "py", "sh"].includes(ext ?? "")) return <FileCodeIcon />;
  if (ext === "json") return <FileJsonIcon />;
  if (["png", "jpg", "jpeg", "gif", "svg", "webp", "nfp"].includes(ext ?? "")) return <FileImageIcon />;
  if (["md", "txt", "log"].includes(ext ?? "")) return <FileTextIcon />;
  return <FileIcon />;
}

type Visible = { item: FileTreeItem; parent: string | null };

function useControllable<T>(value: T | undefined, defaultValue: T, onChange?: (v: T) => void) {
  const [inner, setInner] = React.useState(defaultValue);
  const controlled = value !== undefined;
  const current = controlled ? value : inner;
  const set = React.useCallback(
    (v: T) => {
      if (!controlled) setInner(v);
      onChange?.(v);
    },
    [controlled, onChange],
  );
  return [current, set] as const;
}

/** An accessible file tree with arrow-key navigation, indentation guides and status badges. */
function FileTree({
  className,
  items,
  selectedId: selectedProp,
  defaultSelectedId = null,
  onSelect,
  expanded: expandedProp,
  defaultExpanded = [],
  onExpandedChange,
  "aria-label": ariaLabel = "Files",
  ...props
}: Omit<React.ComponentProps<"ul">, "onSelect"> & {
  items: FileTreeItem[];
  selectedId?: string | null;
  defaultSelectedId?: string | null;
  onSelect?: (item: FileTreeItem) => void;
  expanded?: string[];
  defaultExpanded?: string[];
  onExpandedChange?: (ids: string[]) => void;
}) {
  const [selectedId, setSelectedId] = useControllable<string | null>(selectedProp, defaultSelectedId);
  const [expanded, setExpanded] = useControllable(expandedProp, defaultExpanded, onExpandedChange);
  const expandedSet = React.useMemo(() => new Set(expanded), [expanded]);
  const [focusedId, setFocusedId] = React.useState<string | null>(null);
  const refs = React.useRef(new Map<string, HTMLLIElement>());

  const visible = React.useMemo(() => {
    const out: Visible[] = [];
    const walk = (list: FileTreeItem[], parent: string | null) => {
      for (const item of list) {
        out.push({ item, parent });
        if (item.children && expandedSet.has(item.id)) walk(item.children, item.id);
      }
    };
    walk(items, null);
    return out;
  }, [items, expandedSet]);

  // The tab stop: focused item if still visible, else selected, else first.
  const tabId =
    (focusedId && visible.some((v) => v.item.id === focusedId) && focusedId) ||
    (selectedId && visible.some((v) => v.item.id === selectedId) && selectedId) ||
    visible[0]?.item.id;

  function focus(id: string) {
    setFocusedId(id);
    refs.current.get(id)?.focus();
  }

  function toggle(id: string, open?: boolean) {
    const isOpen = expandedSet.has(id);
    const next = open ?? !isOpen;
    if (next === isOpen) return;
    setExpanded(next ? [...expanded, id] : expanded.filter((e) => e !== id));
  }

  function select(item: FileTreeItem) {
    if (item.disabled) return;
    setSelectedId(item.id);
    onSelect?.(item);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLUListElement>) {
    const index = visible.findIndex((v) => v.item.id === tabId);
    const current = visible[index];
    if (!current) return;
    const { item, parent } = current;
    const isFolder = !!item.children;
    let handled = true;
    switch (event.key) {
      case "ArrowDown":
        if (index < visible.length - 1) focus(visible[index + 1].item.id);
        break;
      case "ArrowUp":
        if (index > 0) focus(visible[index - 1].item.id);
        break;
      case "Home":
        focus(visible[0].item.id);
        break;
      case "End":
        focus(visible[visible.length - 1].item.id);
        break;
      case "ArrowRight":
        if (isFolder && !expandedSet.has(item.id)) toggle(item.id, true);
        else if (isFolder && item.children!.length) focus(item.children![0].id);
        break;
      case "ArrowLeft":
        if (isFolder && expandedSet.has(item.id)) toggle(item.id, false);
        else if (parent) focus(parent);
        break;
      case "Enter":
      case " ":
        select(item);
        if (isFolder) toggle(item.id);
        break;
      case "*": {
        const siblings = parent ? visible.find((v) => v.item.id === parent)?.item.children ?? [] : items;
        const folders = siblings.filter((s) => s.children).map((s) => s.id);
        setExpanded([...new Set([...expanded, ...folders])]);
        break;
      }
      default: {
        handled = false;
        // Type-ahead: jump to the next visible item starting with the typed character.
        if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
          const ch = event.key.toLowerCase();
          const order = [...visible.slice(index + 1), ...visible.slice(0, index + 1)];
          const hit = order.find((v) => v.item.name.toLowerCase().startsWith(ch));
          if (hit) {
            focus(hit.item.id);
            handled = true;
          }
        }
      }
    }
    if (handled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  function renderItems(list: FileTreeItem[], depth: number): React.ReactNode {
    return list.map((item, i) => {
      const isFolder = !!item.children;
      const isOpen = isFolder && expandedSet.has(item.id);
      const isSelected = selectedId === item.id;
      const indent = depth * 16;
      return (
        <li
          key={item.id}
          ref={(el) => {
            if (el) refs.current.set(item.id, el);
            else refs.current.delete(item.id);
          }}
          role="treeitem"
          aria-level={depth + 1}
          aria-setsize={list.length}
          aria-posinset={i + 1}
          aria-expanded={isFolder ? isOpen : undefined}
          aria-selected={isSelected}
          aria-disabled={item.disabled || undefined}
          tabIndex={item.id === tabId ? 0 : -1}
          data-slot="file-tree-item"
          onFocus={(e) => {
            e.stopPropagation();
            setFocusedId(item.id);
          }}
          className="outline-none [&:focus-visible>[data-slot=file-tree-row]]:ring-2 [&:focus-visible>[data-slot=file-tree-row]]:ring-ring/40 [&:focus-visible>[data-slot=file-tree-row]]:ring-inset"
        >
          <div
            data-slot="file-tree-row"
            data-selected={isSelected || undefined}
            onClick={(e) => {
              e.stopPropagation();
              focus(item.id);
              select(item);
              if (isFolder) toggle(item.id);
            }}
            style={{ paddingLeft: indent + 6 }}
            className={cn(
              "flex h-8 cursor-pointer items-center gap-1.5 border-l-2 border-transparent pr-2 text-[13px] text-muted-foreground transition-colors select-none hover:bg-secondary/60 hover:text-foreground",
              "data-selected:border-primary data-selected:bg-primary/10 data-selected:text-foreground",
              item.disabled && "pointer-events-none opacity-45",
            )}
          >
            <span aria-hidden="true" className="flex size-4 shrink-0 items-center justify-center">
              {isFolder && (
                <ChevronRightIcon className={cn("size-3.5 transition-transform duration-150", isOpen && "rotate-90")} />
              )}
            </span>
            <span
              aria-hidden="true"
              className={cn(
                "flex shrink-0 [&_svg]:size-4",
                isFolder ? "text-primary" : "text-[#b7ca9e]",
                isSelected && !isFolder && "text-primary",
              )}
            >
              {item.icon ?? (isFolder ? isOpen ? <FolderOpenIcon /> : <FolderIcon /> : fileIcon(item.name))}
            </span>
            <span className={cn("min-w-0 flex-1 truncate", !isFolder && "font-mono text-[12.5px]")}>{item.name}</span>
            {item.badge && (
              <span
                className={cn("shrink-0 font-mono text-[10px] font-semibold tracking-wider", badgeTones[item.badgeTone ?? "warning"])}
                title={item.badgeLabel}
              >
                <span aria-hidden={item.badgeLabel ? true : undefined}>{item.badge}</span>
                {item.badgeLabel && <span className="sr-only">{item.badgeLabel}</span>}
              </span>
            )}
          </div>
          {isFolder && isOpen && item.children!.length > 0 && (
            <ul
              role="group"
              className="relative before:absolute before:inset-y-0 before:left-(--guide) before:w-px before:bg-input/55"
              style={{ "--guide": `${indent + 15}px` } as React.CSSProperties}
            >
              {renderItems(item.children!, depth + 1)}
            </ul>
          )}
        </li>
      );
    });
  }

  return (
    <ul
      role="tree"
      aria-label={ariaLabel}
      data-slot="file-tree"
      onKeyDown={onKeyDown}
      className={cn("py-1", className)}
      {...props}
    >
      {renderItems(items, 0)}
    </ul>
  );
}

export { FileTree, type FileTreeItem };
