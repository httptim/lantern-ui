import { CommandTabs } from "@/registry/lantern/ui/command-tabs";

export default function CommandTabsInstall() {
  return (
    <div className="flex w-full max-w-xl flex-col gap-4">
      <CommandTabs command="radix-ui lucide-react" type="install" />
      <p className="text-sm text-muted-foreground">Pick a manager above and every command block on the page follows it.</p>
      <CommandTabs command="lanterncn init" />
    </div>
  );
}
