import { highlight } from "@/lib/highlight";
import { cn } from "@/lib/utils";

import { CopyButton } from "./copy-button";

export async function CodeBlock({
  code,
  lang = "tsx",
  title,
  className,
  maxHeight,
}: {
  code: string;
  lang?: string;
  title?: string;
  className?: string;
  maxHeight?: boolean;
}) {
  const html = await highlight(code, lang);
  return (
    <div className={cn("relative overflow-hidden rounded-lg border bg-terminal", className)}>
      {title && (
        <div className="flex items-center gap-2 border-b bg-[#16211c] px-4 py-2.5 font-mono text-[11px] text-[#a8b89b]">{title}</div>
      )}
      <CopyButton value={code} className="absolute top-2 right-2 z-10" />
      <div
        className={cn("code-block", maxHeight && "max-h-[460px] overflow-y-auto")}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
