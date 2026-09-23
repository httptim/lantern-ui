import { Bubble, BubbleContent } from "@/registry/lantern/ui/bubble";

export default function BubbleDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Bubble variant="muted">
        <BubbleContent>Anyone near spawn? The lantern post went dark.</BubbleContent>
      </Bubble>
      <Bubble align="end">
        <BubbleContent>On my way, bringing glowstone.</BubbleContent>
      </Bubble>
      <Bubble variant="muted">
        <BubbleContent>Thanks. It is the one by the guestbook.</BubbleContent>
      </Bubble>
    </div>
  );
}
