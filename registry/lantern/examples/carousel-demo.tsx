import { CpuIcon, HardDriveIcon, MonitorIcon, RadioTowerIcon, ServerIcon } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/registry/lantern/ui/carousel";

const slides = [
  { title: "North hub", note: "Computer 42", icon: ServerIcon },
  { title: "Relay tower", note: "Computer 17", icon: RadioTowerIcon },
  { title: "Turtle yard", note: "4 turtles", icon: CpuIcon },
  { title: "Archive", note: "Computer 58", icon: HardDriveIcon },
  { title: "Arcade", note: "Computer 9", icon: MonitorIcon },
];

export default function CarouselDemo() {
  return (
    <div className="w-full max-w-xs px-12">
      <Carousel aria-label="Hubs">
        <CarouselContent>
          {slides.map((s, i) => (
            <CarouselItem key={s.title}>
              <div className="overflow-hidden rounded-lg border bg-card">
                <div className="flex aspect-[4/3] items-center justify-center border-b bg-accent bg-grid text-[#b7ca9e]">
                  <s.icon className="size-12 stroke-[1.25]" />
                </div>
                <div className="flex items-center justify-between p-4">
                  <div>
                    <div className="font-display text-base font-medium tracking-tight">{s.title}</div>
                    <div className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">{s.note}</div>
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}/{String(slides.length).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        <CarouselDots />
      </Carousel>
    </div>
  );
}
