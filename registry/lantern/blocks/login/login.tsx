"use client";

import * as React from "react";
import { ArrowRightIcon, EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "lucide-react";

import { Button } from "@/registry/lantern/ui/button";
import { Checkbox } from "@/registry/lantern/ui/checkbox";
import { Eyebrow } from "@/registry/lantern/ui/eyebrow";
import { Field, FieldGroup, FieldLabel, FieldSeparator } from "@/registry/lantern/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/registry/lantern/ui/input-group";
import { StatusDot } from "@/registry/lantern/ui/status-dot";
import {
  Terminal,
  TerminalAddress,
  TerminalBody,
  TerminalCursor,
  TerminalFooter,
  TerminalHeader,
  TerminalLine,
  TerminalOutput,
} from "@/registry/lantern/ui/terminal";

function Mark({ className = "size-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" aria-hidden="true">
      <path d="m12 2 10 10-10 10L2 12ZM12 7l5 5-5 5-5-5Z" />
    </svg>
  );
}

function GitHubIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [pending, setPending] = React.useState(false);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setTimeout(() => setPending(false), 1200);
  }

  return (
    <div className="grid min-h-svh bg-background lg:grid-cols-2">
      <div className="flex flex-col px-4 py-6 sm:px-10 sm:py-8">
        <a
          href="#"
          className="flex w-fit items-center gap-2 rounded-sm font-display text-xl font-semibold tracking-[-0.04em] focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <span className="text-primary">
            <Mark />
          </span>
          lantern
        </a>

        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-sm">
            <Eyebrow>
              <StatusDot /> Hub network online
            </Eyebrow>
            <h1 className="mt-3 text-4xl font-medium tracking-[-0.05em]">
              Welcome <span className="text-primary">back.</span>
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">Sign in to manage your hub site and turtles.</p>

            <form className="mt-8" onSubmit={onSubmit}>
              <FieldGroup className="gap-5">
                <Field>
                  <FieldLabel htmlFor="login-email">Email</FieldLabel>
                  <InputGroup>
                    <InputGroupAddon>
                      <MailIcon />
                    </InputGroupAddon>
                    <InputGroupInput id="login-email" type="email" autoComplete="email" placeholder="you@example.com" required />
                  </InputGroup>
                </Field>
                <Field>
                  <div className="flex items-center justify-between gap-3">
                    <FieldLabel htmlFor="login-password">Password</FieldLabel>
                    <a
                      href="#"
                      className="rounded-sm text-[13px] text-primary underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <InputGroup>
                    <InputGroupAddon>
                      <LockIcon />
                    </InputGroupAddon>
                    <InputGroupInput
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Your password"
                      required
                    />
                    <InputGroupAddon align="inline-end">
                      <InputGroupButton
                        size="icon-xs"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        aria-pressed={showPassword}
                        onClick={() => setShowPassword((v) => !v)}
                      >
                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                      </InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>
                </Field>
                <Field orientation="horizontal">
                  <Checkbox id="login-remember" defaultChecked />
                  <FieldLabel htmlFor="login-remember" className="font-normal text-muted-foreground">
                    Keep me signed in on this computer
                  </FieldLabel>
                </Field>
                <Button type="submit" size="lg" className="w-full" disabled={pending}>
                  {pending ? "Signing in..." : "Sign in"}
                  <ArrowRightIcon />
                </Button>
                <FieldSeparator>or</FieldSeparator>
                <Button type="button" variant="secondary" size="lg" className="w-full">
                  <GitHubIcon className="size-4" />
                  Continue with GitHub
                </Button>
              </FieldGroup>
            </form>

            <p className="mt-8 text-center text-sm text-muted-foreground">
              New to the network?{" "}
              <a
                href="#"
                className="rounded-sm text-primary underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                Create an account
              </a>
            </p>
          </div>
        </div>

        <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground/70 uppercase">Lantern hub network</p>
      </div>

      <div className="relative hidden overflow-hidden border-l bg-card bg-grid lg:flex lg:flex-col lg:items-center lg:justify-center lg:p-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#71703930,transparent_60%)]" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 size-[520px] -translate-x-1/2 -translate-y-1/2 -rotate-20 rounded-full border border-dashed border-[#5a633b60]" />
        <div className="relative w-full max-w-[460px]" aria-hidden="true">
          <Terminal tilt>
            <TerminalHeader>
              <Mark className="size-3.5" /> COMPUTER 42
            </TerminalHeader>
            <TerminalAddress>hub://north-hub.example.net/login</TerminalAddress>
            <TerminalBody className="min-h-[260px]">
              <div className="mb-4 text-[8px] tracking-[0.2em] text-[#738a69]">SESSION</div>
              <TerminalLine>auth --hub north-hub</TerminalLine>
              <TerminalOutput>{"Handshake with relay... ok\nWaiting for credentials"}</TerminalOutput>
              <TerminalLine>turtles --status</TerminalLine>
              <TerminalOutput>{"miner-01  mining   fuel 82%\nfarmer-07 idle     fuel 64%"}</TerminalOutput>
              <TerminalLine>
                <TerminalCursor />
              </TerminalLine>
            </TerminalBody>
            <TerminalFooter>
              <span>4 turtles</span>
              <span>2 servers</span>
              <span>relay ok</span>
            </TerminalFooter>
          </Terminal>
        </div>
        <p className="relative mt-14 max-w-[36ch] text-center text-sm leading-relaxed text-muted-foreground">
          Your hub site, your servers and every turtle in the fleet, <span className="text-foreground">in one place.</span>
        </p>
      </div>
    </div>
  );
}
