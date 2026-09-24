import { StreamBox } from "@/registry/lantern/ui/stream-box";

const THOUGHT = `Guestbook entries live in ctx.read("entries"). Validate both fields before writing.
Keep the newest 10 so the page stays short. Redirect back to / after a post so a refresh does not sign twice.`;

export default function StreamBoxSummary() {
  return (
    <StreamBox
      className="w-full max-w-md"
      title="Thought for 1:31"
      meta="Whole request 2:16"
      text={THOUGHT}
      defaultOpen={false}
    />
  );
}
