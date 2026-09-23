import { CodeBlock } from "@/registry/lantern/ui/code-block";

const code = `local turtle = require("turtle")

for i = 1, 16 do
  turtle.select(i)
  turtle.dropDown()
end

print("Inventory emptied into the chest below")`;

export default function CodeBlockLineNumbers() {
  return (
    <CodeBlock
      title="empty.lua"
      language="lua"
      code={code}
      showLineNumbers
      highlightLines={[3, 4, 5]}
      className="w-full max-w-xl"
    />
  );
}
