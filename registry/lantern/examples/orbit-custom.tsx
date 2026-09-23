import { Orbit, OrbitRing } from "@/registry/lantern/ui/orbit";

export default function OrbitCustom() {
  return (
    <div className="relative flex h-72 w-full max-w-md items-center justify-center overflow-hidden">
      <Orbit>
        <OrbitRing width={300} height={120} rotation={-12} />
        <OrbitRing width={220} height={220} rotation={0} className="border-primary/30" />
        <OrbitRing width={120} height={300} rotation={24} x={20} />
      </Orbit>
      <span className="relative size-3 rounded-full bg-primary shadow-[0_0_24px_#f5a66580]" />
    </div>
  );
}
