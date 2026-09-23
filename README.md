# Lantern UI

The Lantern design (lantern.thultz.dev) as a shadcn-style component registry, with a docs site at
https://ui.thultz.dev.

```sh
npx lanterncn init
npx lanterncn add button card terminal
```

- `cli/`: the `lanterncn` npm package, a thin front for the shadcn CLI.

- `registry/lantern/ui/`: the components that get installed into user projects.
- `registry/lantern/examples/`: live examples rendered on the docs pages.
- `registry/meta/`: one JSON file per component (title, category, deps, examples, usage).
- `registry/theme.json`: Lantern tokens. Keep `app/globals.css` in sync with it.
- `scripts/build-registry.mjs`: generates `registry.json`, the example index and combined metadata.
  `shadcn build` then writes installable items to `public/r/`.
- `lib/site.json`: site name and the public URL used in install commands.

See `CONVENTIONS.md` for how to add a component.

## Develop

Node 22.

```sh
npm install
npm run registry   # after adding or changing components
npm run dev
```

`npm run build` runs the registry build first, so deploys always ship fresh `public/r/*.json`.
