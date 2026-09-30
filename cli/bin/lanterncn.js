#!/usr/bin/env node
// lanterncn: a thin front for the shadcn CLI that points it at the Lantern UI registry.
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";

const [command, ...rest] = process.argv.slice(2);
const flags = rest.filter((a) => a.startsWith("-"));
const names = rest.filter((a) => !a.startsWith("-"));

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
Without a terminal (agents, CI) nothing waits for input: init uses its defaults, and add keeps
files you already have unless you pass ${muted("--overwrite")}.
Docs: ${SITE}
`;

// No terminal to ask in (an AI agent, CI, a script): shadcn's questions would wait forever, or end the run having
// added nothing and still exit 0. Answer them the safe way instead: "no" to overwriting a file that is already there.
const interactive = !!process.stdin.isTTY && !process.env.CI;
const NO = "n\n".repeat(500);
const has = (...names) => flags.some((f) => names.some((n) => f === n || f.startsWith(`${n}=`)));

// Run shadcn with the same package manager that launched us. With answers, they are its keyboard.
function shadcn(args, answers) {
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
  const res = spawnSync(cmd, [...pre, ...args], {
    stdio: answers === undefined ? "inherit" : ["pipe", "inherit", "inherit"],
    input: answers,
    env,
    shell: process.platform === "win32",
  });
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

switch (command) {
  case "init": {
    const base = has("--base", "-b") ? [] : ["--base", "radix"];
    // Without a terminal, the questions init would ask get their defaults.
    const quiet = interactive
      ? []
      : [
          ...(has("-d", "--defaults", "-p", "--preset", "-t", "--template") ? [] : ["--defaults"]),
          ...(has("--monorepo", "--no-monorepo") ? [] : ["--no-monorepo"]),
          ...(has("--reinstall", "--no-reinstall") ? [] : ["--no-reinstall"]),
        ];
    if (quiet.length) console.error(muted(`No terminal to ask in: using ${quiet.join(" ")}.`));
    const code = shadcn(["init", ...base, ...rest, ...quiet], interactive ? undefined : NO);
    if (code !== 0) process.exit(code);
    process.exit(shadcn(["add", toRef("lantern-theme"), "-y"], interactive ? undefined : NO));
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
    // Without a terminal: no confirmation, and files already there are kept unless --overwrite says otherwise.
    const quiet = interactive || has("-y", "--yes") ? [] : ["-y"];
    const keep = !interactive && !has("-o", "--overwrite");
    if (keep) console.error(muted("No terminal to ask in: files you already have are kept (add --overwrite to replace them)."));
    process.exit(shadcn(["add", ...items.map(toRef), ...flags, ...quiet], keep ? NO : interactive ? undefined : ""));
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
