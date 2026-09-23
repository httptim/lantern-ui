# lanternui

Add [Lantern UI](https://lantern-ui-kit.vercel.app) components to your React project. Lantern UI is the design
from lantern.thultz.dev as copy-paste components built on shadcn/ui, Radix and Tailwind CSS v4.

```sh
npx lanternui init                # set up shadcn (Radix) and add the Lantern theme
npx lanternui add button card     # add components by name
npx lanternui add all             # add everything
npx lanternui list                # see what is available
```

The source is copied into your `components/ui` folder, so you own it and can change anything.
Flags such as `--overwrite` and `-y` are passed through to the shadcn CLI.

Works with npm, pnpm (`pnpm dlx lanternui`), yarn (`yarn dlx lanternui`) and bun (`bunx lanternui`).

Source: https://github.com/httptim/lantern-ui
