import { CloudIcon, MonitorIcon } from "lucide-react";

import { Label } from "@/registry/lantern/ui/label";
import { RadioGroup, RadioGroupItem } from "@/registry/lantern/ui/radio-group";

const modes = [
  {
    value: "in-game",
    title: "In-game host",
    description: "Your computer serves the site. It goes offline when the chunk unloads.",
    icon: MonitorIcon,
  },
  {
    value: "hub",
    title: "Lantern Hub",
    description: "We keep a copy online around the clock and sync it when your computer boots.",
    icon: CloudIcon,
  },
];

export default function RadioGroupCards() {
  return (
    <RadioGroup defaultValue="hub" aria-label="Hosting mode" className="w-full max-w-md">
      {modes.map((mode) => (
        <Label
          key={mode.value}
          htmlFor={`host-${mode.value}`}
          className="cursor-pointer items-start gap-3 rounded-md border border-input p-4 transition-[border-color,background-color,box-shadow] hover:border-muted-foreground/60 has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary/8 has-data-[state=checked]:shadow-[4px_5px_0_var(--shadow-block)]"
        >
          <mode.icon className="mt-px size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          <span className="grid flex-1 gap-1.5">
            <span className="text-sm font-medium">{mode.title}</span>
            <span className="text-[13px] leading-normal font-normal text-muted-foreground">{mode.description}</span>
          </span>
          <RadioGroupItem value={mode.value} id={`host-${mode.value}`} />
        </Label>
      ))}
    </RadioGroup>
  );
}
