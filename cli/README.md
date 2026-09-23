# lanterncn

Add [Lantern UI](https://ui.thultz.dev) components to your React project. Lantern UI is the design
from lantern.thultz.dev as copy-paste components built on shadcn/ui, Radix and Tailwind CSS v4.

```sh
npx lanterncn init                # set up shadcn (Radix) and add the Lantern theme
npx lanterncn add button card     # add components by name
npx lanterncn add all             # add everything
npx lanterncn list                # see what is available
```

The source is copied into your `components/ui` folder, so you own it and can change anything.
Flags such as `--overwrite` and `-y` are passed through to the shadcn CLI.

Works with npm, pnpm (`pnpm dlx lanterncn`), yarn (`yarn dlx lanterncn`) and bun (`bunx lanterncn`).

Source: https://github.com/httptim/lantern-ui
