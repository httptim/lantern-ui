import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/registry/lantern/ui/carousel";

const turtles = ["miner-01", "miner-02", "miner-03", "farmer-07", "builder-11", "scout-04"];

export default function CarouselSizes() {
  return (
    <div className="w-full max-w-md px-12">
      <Carousel opts={{ align: "start" }} aria-label="Turtles">
        <CarouselContent>
          {turtles.map((t) => (
            <CarouselItem key={t} className="basis-1/2 sm:basis-1/3">
              <div className="flex aspect-square flex-col items-center justify-center gap-2 rounded-lg border bg-card p-3">
                <span className="size-1.5 rounded-full bg-success" aria-hidden="true" />
                <span className="truncate font-mono text-xs">{t}</span>
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
