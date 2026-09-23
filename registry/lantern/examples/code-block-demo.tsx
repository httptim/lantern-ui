import { CodeBlock } from "@/registry/lantern/ui/code-block";

const code = `-- startup.lua: runs when the computer boots
local modem = peripheral.find("modem")
rednet.open(peripheral.getName(modem))

print("Lantern hub online")
while true do
  local id, message = rednet.receive("lantern")
  print(("[%d] %s"):format(id, message))
end`;

export default function CodeBlockDemo() {
  return <CodeBlock title="startup.lua" language="lua" code={code} className="w-full max-w-xl" />;
}
