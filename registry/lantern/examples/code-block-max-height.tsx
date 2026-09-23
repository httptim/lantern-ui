import { CodeBlock } from "@/registry/lantern/ui/code-block";

const code = `-- miner.lua: dig a 3x3 tunnel and come home
local length = tonumber(...) or 32
local fuelNeeded = length * 2 + 10

local function refuel()
  if turtle.getFuelLevel() >= fuelNeeded then return true end
  for slot = 1, 16 do
    turtle.select(slot)
    if turtle.refuel(0) then
      turtle.refuel()
      if turtle.getFuelLevel() >= fuelNeeded then return true end
    end
  end
  return false
end

local function digColumn()
  turtle.digUp()
  turtle.digDown()
end

local function step()
  while not turtle.forward() do
    turtle.dig()
    turtle.attack()
  end
end

if not refuel() then
  print("Not enough fuel, need " .. fuelNeeded)
  return
end

for i = 1, length do
  turtle.dig()
  step()
  digColumn()
  turtle.turnLeft()
  turtle.dig()
  turtle.turnRight()
  turtle.turnRight()
  turtle.dig()
  turtle.turnLeft()
end

turtle.turnLeft()
turtle.turnLeft()
for i = 1, length do
  step()
end

print("Tunnel finished, " .. length .. " blocks")`;

export default function CodeBlockMaxHeight() {
  return <CodeBlock title="miner.lua" language="lua" code={code} showLineNumbers maxHeight={320} className="w-full max-w-xl" />;
}
