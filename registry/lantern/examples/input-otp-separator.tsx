"use client";

import * as React from "react";

import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/registry/lantern/ui/input-otp";

export default function InputOTPWithSeparator() {
  const [value, setValue] = React.useState("");

  return (
    <div className="grid gap-3">
      <InputOTP
        maxLength={6}
        value={value}
        onChange={(v) => setValue(v.toUpperCase())}
        pattern="^[a-zA-Z0-9]+$"
        aria-label="Hub invite code"
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
        {value.length === 6 ? "Code ready" : `${6 - value.length} characters left`}
      </p>
    </div>
  );
}
