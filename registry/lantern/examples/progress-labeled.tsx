import { Progress } from "@/registry/lantern/ui/progress";

const turtles = [
  { name: "T-01 miner", fuel: 82 },
  { name: "T-02 lumber", fuel: 24 },
  { name: "T-03 farmer", fuel: 7 },
];

export default function ProgressLabeled() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      {turtles.map((t) => {
        const id = `fuel-${t.name.split(" ")[0]}`;
        return (
          <div key={t.name} className="space-y-2">
            <div className="flex items-baseline justify-between gap-3">
              <span id={id} className="text-sm">
                {t.name}
              </span>
              <span className="font-mono text-[11px] tracking-[0.12em] text-muted-foreground tabular-nums uppercase">
                Fuel {t.fuel}%
              </span>
            </div>
            <Progress
              value={t.fuel}
              size="lg"
              aria-labelledby={id}
              indicatorClassName={t.fuel < 10 ? "bg-destructive" : undefined}
            />
          </div>
        );
      })}
    </div>
  );
}
