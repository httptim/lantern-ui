#!/usr/bin/env node
// lanterncn: a thin front for the shadcn CLI that points it at the Lantern UI registry.
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";

const REGISTRY = (process.env.LANTERN_REGISTRY || "https://ui.thultz.dev/r").replace(/\/$/, "");
const SITE = REGISTRY.replace(/\/r$/, "");
const { version } = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));

const c = process.stdout.isTTY && !process.env.NO_COLOR;
const orange = (s) => (c ? `\x1b[38;2;245;166;101m${s}\x1b[0m` : s);
const green = (s) => (c ? `\x1b[38;2;155;186;134m${s}\x1b[0m` : s);
const muted = (s) => (c ? `\x1b[38;2;150;163;153m${s}\x1b[0m` : s);

const help = `
${orange("lanterncn")} ${muted(`v${version}`)}  Lantern UI components, added with the shadcn CLI.

${green("USAGE")}
  npx lanterncn init                 Set up shadcn with Radix and add the Lantern theme
  npx lanterncn add <name...>        Add components or blocks, e.g. ${muted("add button card dashboard")}
  npx lanterncn add all              Add every component (not blocks)
  npx lanterncn list                 List available components and blocks

Extra flags pass through to shadcn, e.g. ${muted("--overwrite")}, ${muted("--path")}, ${muted("-y")}.
Docs: ${SITE}
`;

// Run shadcn with the same package manager that launched us.
function shadcn(args) {
  const agent = process.env.npm_config_user_agent || "";
  const [cmd, pre] = agent.startsWith("pnpm")
    ? ["pnpm", ["dlx", "shadcn@latest"]]
    : agent.startsWith("yarn")
      ? ["yarn", ["dlx", "shadcn@latest"]]
      : agent.startsWith("bun")
        ? ["bunx", ["--bun", "shadcn@latest"]]
        : ["npx", ["-y", "shadcn@latest"]];
  // Drop the settings npx set for this process, or the nested npx would reuse them and run the wrong package.
  const env = Object.fromEntries(
    Object.entries(process.env).filter(([k]) => !/^npm_(config_(package|call|yes)|command|lifecycle_)/i.test(k)),
  );
  const res = spawnSync(cmd, [...pre, ...args], { stdio: "inherit", env, shell: process.platform === "win32" });
  if (res.error) {
    console.error(`Could not run ${cmd}: ${res.error.message}`);
    process.exit(1);
  }
  return res.status ?? 1;
}

async function registry() {
  const res = await fetch(`${REGISTRY}/registry.json`).catch(() => null);
  if (!res?.ok) {
    console.error(`Could not reach the Lantern UI registry at ${REGISTRY}.`);
    process.exit(1);
  }
  return (await res.json()).items;
}

const toRef = (name) => (/^(https?:|@|\.|\/)/.test(name) || name.includes("/") ? name : `${REGISTRY}/${name}.json`);

const [command, ...rest] = process.argv.slice(2);
const flags = rest.filter((a) => a.startsWith("-"));
const names = rest.filter((a) => !a.startsWith("-"));

switch (command) {
  case "init": {
    const base = flags.some((f) => f === "--base" || f.startsWith("--base=") || f === "-b") ? [] : ["--base", "radix"];
    const code = shadcn(["init", ...base, ...rest]);
    if (code !== 0) process.exit(code);
    process.exit(shadcn(["add", toRef("lantern-theme"), "-y"]));
  }
  case "add": {
    let items = names;
    if (items.length === 1 && items[0] === "all") {
      items = (await registry()).filter((i) => i.type === "registry:ui").map((i) => i.name);
    }
    if (!items.length) {
      console.log(help);
      console.error("Name at least one component, e.g. npx lanterncn add button");
      process.exit(1);
    }
    process.exit(shadcn(["add", ...items.map(toRef), ...flags]));
  }
  case "list":
  case "ls": {
    const all = await registry();
    const ui = all.filter((i) => i.type === "registry:ui");
    const blocks = all.filter((i) => i.type === "registry:block");
    const width = Math.max(...[...ui, ...blocks].map((i) => i.name.length));
    const print = (i) => console.log(`  ${orange(i.name.padEnd(width))}  ${muted(i.description ?? "")}`);
    console.log(`\n${green("COMPONENTS")} ${muted(String(ui.length))}\n`);
    ui.forEach(print);
    if (blocks.length) {
      console.log(`\n${green("BLOCKS")} ${muted(String(blocks.length))}\n`);
      blocks.forEach(print);
    }
    console.log(`\n${muted("Add one with")} npx lanterncn add <name>\n`);
    break;
  }
  case "-v":
  case "--version":
    console.log(version);
    break;
  case undefined:
  case "help":
  case "-h":
  case "--help":
    console.log(help);
    break;
  default:
    console.log(help);
    console.error(`Unknown command: ${command}`);
    process.exit(1);
}
