import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/registry/lantern/ui/input-otp";

export default function InputOTPDemo() {
  return (
    <div className="grid gap-3">
      <InputOTP maxLength={6} aria-label="Pairing code">
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <p className="text-xs text-muted-foreground">
        Run <code className="font-mono text-primary">lantern pair</code> on your computer to get a code.
      </p>
    </div>
  );
}
