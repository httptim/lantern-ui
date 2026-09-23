# Lantern UI component conventions

Lantern UI is a shadcn-style registry. Each component is a copy-paste React file styled with
Tailwind v4 and the Lantern tokens in `app/globals.css` (mirrored in `registry/theme.json`).

## Files per component

1. `registry/lantern/ui/<name>.tsx`: the component. Model the API on the current shadcn/ui
   "new-york" v4 component of the same name (function components, `data-slot` attributes,
   `cn()` from `@/lib/utils`, `React.ComponentProps<...>` props, named exports at the bottom).
   Import Radix from the unified package: `import { Dialog as DialogPrimitive } from "radix-ui"`.
   Icons come from `lucide-react`. Add `"use client"` when the file uses Radix or hooks.
   Import sibling components as `@/registry/lantern/ui/<other>` (shadcn rewrites these on install).
2. `registry/lantern/examples/<name>-demo.tsx` plus any extra examples
   (`<name>-<variant>.tsx`). Each default-exports one component, imports only from
   `@/registry/lantern/ui/*`, `lucide-react`, `react`, and (for toasts) `sonner`.
   Add `"use client"` if it uses state or event handlers.
3. `registry/meta/<name>.json`:
   ```json
   { "name": "<name>", "title": "Title Case", "category": "Forms|Display|Data|Layout|Overlays|Navigation|Feedback|Lantern",
     "description": "One or two plain sentences.",
     "dependencies": ["radix-ui"],            // npm packages the component file imports (not react)
     "registryDependencies": ["button"],       // other Lantern UI items it imports
     "examples": [{ "name": "<name>-demo" }, { "name": "<name>-sizes", "title": "Sizes" }],
     "usage": "<Component>...</Component>",    // short JSX snippet shown under Usage
     "notes": ["Optional extra paragraph shown on the docs page."] }
   ```
   The first example is the hero preview and has no title.
   `files` is optional and defaults to `["ui/<name>.tsx"]`. List every file when a component needs more,
   e.g. `["ui/sidebar.tsx", "hooks/use-mobile.ts"]`. Hooks live in `registry/lantern/hooks/` and are
   imported as `@/registry/lantern/hooks/<file>`.

## Third-party libraries

Already installed; do not run npm install. Several are newer majors than you may know, so read their
types in `node_modules/<pkg>` before writing code: cmdk, react-day-picker (v10) with date-fns,
vaul, react-resizable-panels (v4), @tanstack/react-table (v9), recharts (v3), embla-carousel-react,
input-otp, sonner. List each one a component file imports in its meta `dependencies`.

## Lantern look

Read `registry/lantern/ui/button.tsx`, `input.tsx`, `card.tsx`, `badge.tsx` and `terminal.tsx` first.

- Dark only. Background `bg-background` (#111614), panels `bg-card`, raised `bg-secondary`,
  popovers `bg-popover`. Borders `border-border` (#303b34); control borders `border-input` (#495347).
- Accent is orange `primary` (#f5a665). Green `success` (#9bba86) is for eyebrows and positive states.
  `destructive` (#e0715f), `warning` (#e8c98a), `info` (#8fb3c9).
- Radius is small: `rounded-md` (5px) for controls, `rounded-lg` for panels. No pill shapes except
  switches, avatars, dots.
- Type: `font-display` (Space Grotesk) for titles, tracking-tight; body DM Sans; `font-mono` for
  small uppercase labels with wide tracking (`text-[10px] tracking-[0.2em] uppercase`).
- Focus: `focus-visible:ring-2 focus-visible:ring-ring/25` plus `focus-visible:border-primary` for fields;
  buttons use a ring offset. Checked/selected states use `primary`.
- Overlays: `bg-popover border shadow-block-sm` (hard offset shadow, no blur). Overlay backdrops
  `bg-[#080b0a]/75`. Use the tw-animate-css `data-[state=open]:animate-in fade-in-0 zoom-in-95` pattern.
- Chart colors: `chart-1` orange, `chart-2` green, `chart-3` blue, `chart-4` yellow, `chart-5` red.
  Sidebar tokens: `sidebar`, `sidebar-foreground`, `sidebar-primary`, `sidebar-accent`, `sidebar-border`, `sidebar-ring`.
- Utilities available: `bg-grid`, `shadow-block`, `shadow-block-sm`, `animate-lantern-pulse`, `animate-lantern-blink`.
- Every component must work at 375px wide and on desktop.

## Rules

- No emojis anywhere, including example copy. Use lucide icons.
- Example copy should feel like Lantern: in-game computers, hub sites, turtles, servers, guestbooks.
  Keep it plain and short.
- Accessibility: labels for fields, `aria-label` for icon-only buttons, keyboard support via Radix.
- After writing, run `PATH=~/.nvm/versions/node/v22.14.0/bin:$PATH npm run registry` and
  `PATH=~/.nvm/versions/node/v22.14.0/bin:$PATH npx tsc --noEmit -p .` from the project root and fix
  errors in your own files. Other agents are writing files at the same time; ignore errors in files
  you did not write. Do not edit files you did not create, except to read them.
