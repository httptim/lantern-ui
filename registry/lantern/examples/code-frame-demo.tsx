import { FlaskConicalIcon, PlayIcon, SaveIcon } from "lucide-react";

import { Button } from "@/registry/lantern/ui/button";
import {
  CodeFrame,
  CodeFrameBody,
  CodeFrameFooter,
  CodeFrameHeader,
  CodeFrameTag,
  CodeFrameTitle,
  CodeFrameToolbar,
} from "@/registry/lantern/ui/code-frame";

const source = `-- Strip mine for diamonds at y=-59: three 32-block branches,
-- a torch every 8 blocks, home to unload when full.
local BRANCHES, LENGTH, SPACING = 3, 32, 3
local TORCH_EVERY = 8

td.setHome()
td.mine.stairs{ toY = -59, returnHome = false }

td.run("Diamond strip mine", {}, function(check)
  for b = 1, BRANCHES do
    for step = 1, LENGTH do
      check()
      assert(td.digMove("forward"))
      td.clear("up")
      if step % TORCH_EVERY == 0 then
        td.placeTorch("left")
      end
    end
    print(("Branch %d done"):format(b))
  end
end)`;

export default function CodeFrameDemo() {
  return (
    <CodeFrame className="h-[460px] w-full max-w-3xl">
      <CodeFrameHeader>
        <CodeFrameTitle>strip_mine.lua</CodeFrameTitle>
        <CodeFrameTag>Unsaved</CodeFrameTag>
        <CodeFrameToolbar aria-label="File actions">
          <Button size="sm" variant="ghost">
            <SaveIcon /> Save
          </Button>
          <Button size="sm" variant="secondary">
            <FlaskConicalIcon /> Dry run
          </Button>
          <Button size="sm">
            <PlayIcon /> Run on Testy
          </Button>
        </CodeFrameToolbar>
      </CodeFrameHeader>
      <CodeFrameBody code={source} highlightLines={[13, 14]} aria-label="strip_mine.lua source" />
      <CodeFrameFooter>
        <span>Lua</span>
        <span>23 lines</span>
        <span className="ml-auto text-success">Testy idle at home</span>
      </CodeFrameFooter>
    </CodeFrame>
  );
}
