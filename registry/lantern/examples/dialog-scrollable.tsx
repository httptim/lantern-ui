import { Button } from "@/registry/lantern/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/lantern/ui/dialog";

const rules = [
  ["Be kind in guestbooks", "Every hub has a guestbook. Sign it the way you would want yours signed."],
  ["No griefing turtles", "Turtles you do not own are off limits. Do not reprogram, trap or break them."],
  ["Keep servers light", "Pages should load on a basic computer. Avoid loops that never yield."],
  ["Credit your sources", "If you copy a program or a page layout, link back to the original hub."],
  ["One name per player", "Register a single display name. Alternate accounts are removed."],
  ["Report broken links", "Found a dead page? Flag it from the directory so the owner gets a note."],
  ["Mark adult content", "Hubs must be suitable for everyone on the server. Anything else is unlisted."],
  ["No spam hubs", "Hubs that only link to other hubs, or repeat the same page, are hidden."],
  ["Respect uptime", "Do not flood the relay. Scripts that ping more than once a second are throttled."],
  ["Have fun", "It is a block game. Build something odd and share it."],
];

export default function DialogScrollable() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Read network rules</Button>
      </DialogTrigger>
      <DialogContent className="grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden p-0">
        <DialogHeader className="border-b p-6 pr-14">
          <DialogTitle>
            Network rules<span className="text-primary">.</span>
          </DialogTitle>
          <DialogDescription>Read these before you publish your first hub.</DialogDescription>
        </DialogHeader>
        <ol className="grid gap-5 overflow-y-auto px-6">
          {rules.map(([title, body], index) => (
            <li key={title} className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1">
              <span className="font-mono text-[11px] text-primary tabular-nums">{String(index + 1).padStart(2, "0")}</span>
              <span className="text-sm font-medium">{title}</span>
              <span className="col-start-2 text-sm leading-relaxed text-muted-foreground">{body}</span>
            </li>
          ))}
        </ol>
        <DialogFooter className="border-t p-6 pt-4">
          <DialogClose asChild>
            <Button>I understand</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
