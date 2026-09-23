import { Bubble, BubbleContent } from "@/registry/lantern/ui/bubble";

const variants = ["default", "secondary", "muted", "tinted", "outline", "ghost", "destructive"] as const;

export default function BubbleVariants() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      {variants.map((variant, index) => (
        <Bubble key={variant} variant={variant} align={index % 2 ? "end" : "start"}>
          <BubbleContent>
            <span className="me-2 font-mono text-[10px] tracking-[0.15em] uppercase opacity-70">{variant}</span>
            Signal received from turtle.farm
          </BubbleContent>
        </Bubble>
      ))}
    </div>
  );
}
