import fs from "node:fs";
import path from "node:path";

import metas from "@/registry/__meta__.json";
import site from "@/lib/site.json";

export type ComponentMeta = {
  name: string;
  type?: "block";
  title: string;
  category: string;
  description: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files?: string[];
  examples?: { name: string; title?: string }[];
  usage?: string;
  notes?: string[];
};

const all = metas as ComponentMeta[];
export const components = all.filter((m) => m.type !== "block");
export const blockItems = all.filter((m) => m.type === "block");
export const categories = ["Lantern", "Forms", "Display", "Data", "Layout", "Overlays", "Navigation", "Feedback", "Chat"];

export const guides = [
  { title: "Introduction", href: "/docs" },
  { title: "Installation", href: "/docs/installation" },
  { title: "Theming", href: "/docs/theming" },
  { title: "Components", href: "/docs/components" },
  { title: "Blocks", href: "/docs/blocks" },
];

export function navGroups() {
  return categories
    .map((c) => ({
      title: c,
      items: components
        .filter((m) => m.category === c)
        .map((m) => ({ title: m.title, href: `/docs/components/${m.name}` })),
    }))
    .filter((g) => g.items.length)
    .concat(
      blockItems.length
        ? [{ title: "Blocks", items: blockItems.map((m) => ({ title: m.title, href: `/docs/blocks/${m.name}` })) }]
        : [],
    );
}

/** Every docs page in sidebar order, for previous/next links. */
export function pageOrder() {
  return [...guides, ...navGroups().flatMap((g) => g.items)];
}

export function getComponent(name: string) {
  return components.find((m) => m.name === name);
}

export function getBlock(name: string) {
  return blockItems.find((m) => m.name === name);
}

export const registryUrl = (name: string) => `${site.url}/r/${name}.json`;
/** Short install address: shadcn reads registry.json straight from the public GitHub repo. */
export const itemRef = (name: string) => `${site.repo}/${name}`;

const root = process.cwd();
const toUserImports = (src: string) =>
  src
    .replaceAll("@/registry/lantern/ui/", "@/components/ui/")
    .replaceAll("@/registry/lantern/hooks/", "@/hooks/")
    .replaceAll("@/registry/lantern/lib/", "@/lib/")
    .replaceAll("@/registry/lantern/blocks/", "@/components/")
    .trimEnd();

/** Where a registry file lands in the user's project. */
const userPath = (f: string) =>
  f.startsWith("hooks/") || f.startsWith("lib/")
    ? f
    : f.startsWith("blocks/")
      ? `components/${f.slice("blocks/".length)}`
      : `components/${f}`;

export function exampleSource(name: string) {
  return toUserImports(fs.readFileSync(path.join(root, "registry/lantern/examples", `${name}.tsx`), "utf8"));
}

export function componentSource(meta: ComponentMeta) {
  return (meta.files ?? [`ui/${meta.name}.tsx`]).map((f) => ({
    path: userPath(f),
    code: toUserImports(fs.readFileSync(path.join(root, "registry/lantern", f), "utf8")),
  }));
}

export function importLine(meta: ComponentMeta) {
  const src = fs.readFileSync(path.join(root, "registry/lantern", meta.files?.[0] ?? `ui/${meta.name}.tsx`), "utf8");
  const exported = src.match(/export \{([^}]+)\}/)?.[1];
  const names = exported
    ?.split(",")
    .map((s) => s.trim())
    .filter((s) => s && !/Variants$/.test(s) && !s.startsWith("type "));
  if (!names?.length) return "";
  const list = names.length > 4 ? `\n  ${names.join(",\n  ")},\n` : ` ${names.join(", ")} `;
  return `import {${list}} from "@/components/ui/${meta.name}";`;
}
