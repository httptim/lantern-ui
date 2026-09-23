import AlertDemo from "@/registry/lantern/examples/alert-demo";
import BadgeDemo from "@/registry/lantern/examples/badge-demo";
import ButtonVariants from "@/registry/lantern/examples/button-variants";
import CardArtDemo from "@/registry/lantern/examples/card-art";
import FieldLogin from "@/registry/lantern/examples/field-login";
import InputOtpDemo from "@/registry/lantern/examples/input-otp-demo";
import ProgressLabeled from "@/registry/lantern/examples/progress-labeled";
import RadioGroupCards from "@/registry/lantern/examples/radio-group-cards";
import SliderDemo from "@/registry/lantern/examples/slider-demo";
import SonnerDemo from "@/registry/lantern/examples/sonner-demo";
import StatDemo from "@/registry/lantern/examples/stat-demo";
import SwitchSettings from "@/registry/lantern/examples/switch-settings";
import TableDemo from "@/registry/lantern/examples/table-demo";
import TabsDemo from "@/registry/lantern/examples/tabs-demo";
import TerminalDemo from "@/registry/lantern/examples/terminal-demo";
import ToggleGroupDemo from "@/registry/lantern/examples/toggle-group-demo";

function Tile({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`min-w-0 rounded-lg border bg-card p-5 sm:p-6 ${className}`}>
      <div className="mb-4 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">{label}</div>
      {children}
    </div>
  );
}

export function Showcase() {
  return (
    <div className="grid gap-4">
      <StatDemo />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div className="grid min-w-0 content-start gap-4">
          <FieldLogin />
          <Tile label="Settings">
            <SwitchSettings />
          </Tile>
        </div>
        <div className="grid min-w-0 content-start gap-4">
          <CardArtDemo />
          <Tile label="Hosting">
            <RadioGroupCards />
          </Tile>
          <Tile label="Verify">
            <InputOtpDemo />
          </Tile>
        </div>
        <div className="grid min-w-0 content-start gap-4 md:col-span-2 xl:col-span-1">
          <div className="px-2 pt-2 pb-4">
            <TerminalDemo />
          </div>
          <Tile label="Tabs">
            <TabsDemo />
          </Tile>
          <Tile label="Upload">
            <ProgressLabeled />
          </Tile>
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Tile label="Directory" className="self-start overflow-x-auto">
          <TableDemo />
        </Tile>
        <div className="grid min-w-0 content-start gap-4">
          <AlertDemo />
          <Tile label="Buttons">
            <ButtonVariants />
          </Tile>
          <Tile label="Controls">
            <div className="grid gap-6">
              <SliderDemo />
              <ToggleGroupDemo />
              <BadgeDemo />
            </div>
          </Tile>
          <Tile label="Toasts">
            <SonnerDemo />
          </Tile>
        </div>
      </div>
    </div>
  );
}
