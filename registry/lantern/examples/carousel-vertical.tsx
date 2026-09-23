import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/registry/lantern/ui/carousel";

const entries = [
  ["computer 17", "Hub looks great from spawn."],
  ["miner-02", "Left some coal in the chest."],
  ["computer 58", "Archive is back online."],
  ["farmer-07", "Wheat is ready by the north gate."],
  ["computer 9", "New high score on the arcade."],
];

export default function CarouselVertical() {
  return (
    <div className="w-full max-w-xs py-12">
      <Carousel orientation="vertical" opts={{ align: "start" }} aria-label="Guestbook entries">
        <CarouselContent className="h-[216px]">
          {entries.map(([who, text]) => (
            <CarouselItem key={who} className="basis-1/2">
              <div className="flex h-full flex-col justify-center gap-1 rounded-lg border bg-card px-4">
                <span className="font-mono text-[10px] tracking-[0.2em] text-success uppercase">{who}</span>
                <span className="text-sm">{text}</span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
