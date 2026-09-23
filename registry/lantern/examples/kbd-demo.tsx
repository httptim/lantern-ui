import { Kbd, KbdGroup } from "@/registry/lantern/ui/kbd";

export default function KbdDemo() {
  return (
    <div className="flex flex-col items-center gap-4 text-sm text-muted-foreground">
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
      <p>
        Hold <Kbd>Ctrl</Kbd> + <Kbd>T</Kbd> to terminate a program on the computer.
      </p>
      <p>
        Press <Kbd>Esc</Kbd> to close the terminal.
      </p>
    </div>
  );
}
