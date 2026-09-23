import { exampleSource } from "@/lib/docs";
import { examples } from "@/registry/__index__";

import { CodeBlock } from "./code-block";
import { PreviewTabs } from "./preview-tabs";

export function ComponentPreview({ name, align }: { name: string; align?: "center" | "start" }) {
  const Example = examples[name];
  if (!Example) return <p className="text-destructive">Missing example: {name}</p>;
  return (
    <PreviewTabs
      align={align}
      preview={<Example />}
      code={<CodeBlock code={exampleSource(name)} maxHeight />}
    />
  );
}
