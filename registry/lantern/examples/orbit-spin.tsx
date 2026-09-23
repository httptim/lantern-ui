import { Orbit } from "@/registry/lantern/ui/orbit";

export default function OrbitSpin() {
  return (
    <div className="relative flex h-72 w-full max-w-md items-center justify-center overflow-hidden">
      <Orbit count={3} size={260} rotation={-30} spin duration={60} ringClassName="border-[#5a633b90]" />
      <div className="relative text-center">
        <div className="font-mono text-[10px] tracking-[0.2em] text-success uppercase">Relay online</div>
        <div className="mt-1 font-display text-2xl font-medium tracking-tight">turtle-07</div>
      </div>
    </div>
  );
}
