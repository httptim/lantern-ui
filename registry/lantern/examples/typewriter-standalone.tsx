import { Typewriter } from "@/registry/lantern/ui/typewriter";

export default function TypewriterStandalone() {
  return (
    <div className="w-full max-w-md rounded-lg border bg-card p-5">
      <div className="mb-3 font-mono text-[10px] tracking-[0.2em] text-success uppercase">Turtle log</div>
      <Typewriter
        speed={35}
        loop
        loopDelay={3000}
        className="min-h-[140px] text-xs"
        lines={[
          { prompt: true, text: "turtle status 07" },
          { text: "fuel 812 / 1000\nposition -144 64 302" },
          { prompt: true, text: "turtle mine --depth 12", delay: 1200 },
          { text: "mining... 12 blocks cleared", delay: 900 },
        ]}
      />
    </div>
  );
}
