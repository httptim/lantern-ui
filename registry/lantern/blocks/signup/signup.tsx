"use client";

import * as React from "react";
import { ArrowRightIcon, BookOpenIcon, CpuIcon, EyeIcon, EyeOffIcon, GlobeIcon, ServerIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/registry/lantern/ui/button";
import { Checkbox } from "@/registry/lantern/ui/checkbox";
import { Eyebrow } from "@/registry/lantern/ui/eyebrow";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/registry/lantern/ui/field";
import { Input } from "@/registry/lantern/ui/input";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/registry/lantern/ui/input-group";

type Values = { name: string; email: string; password: string; terms: boolean };
type Errors = Partial<Record<keyof Values, string>>;

const perks = [
  { icon: GlobeIcon, title: "A hub site", text: "One address on the network with pages, a guestbook and a status board." },
  { icon: CpuIcon, title: "Turtle fleet", text: "Watch fuel, position and inventory for up to 8 turtles." },
  { icon: ServerIcon, title: "One server", text: "Link a game server and see who is online from any computer." },
  { icon: BookOpenIcon, title: "Guestbook", text: "Visitors sign in-game. You moderate from the web." },
];

const levels = [
  { label: "Too short", tone: "bg-destructive", text: "text-destructive" },
  { label: "Weak", tone: "bg-destructive", text: "text-destructive" },
  { label: "Fair", tone: "bg-warning", text: "text-warning" },
  { label: "Good", tone: "bg-success", text: "text-success" },
  { label: "Strong", tone: "bg-success", text: "text-success" },
];

function strength(password: string) {
  if (password.length < 8) return 0;
  let score = 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password) || password.length >= 14) score++;
  return score;
}

function validate(v: Values): Errors {
  const errors: Errors = {};
  if (!v.name.trim()) errors.name = "Enter a name for your hub profile.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) errors.email = "Enter a valid email address.";
  if (v.password.length < 8) errors.password = "Use at least 8 characters.";
  if (!v.terms) errors.terms = "Accept the terms to continue.";
  return errors;
}

export default function Signup() {
  const [values, setValues] = React.useState<Values>({ name: "", email: "", password: "", terms: false });
  const [errors, setErrors] = React.useState<Errors>({});
  const [submitted, setSubmitted] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [done, setDone] = React.useState(false);

  const score = strength(values.password);
  const level = levels[score];

  function update<K extends keyof Values>(key: K, value: Values[K]) {
    const next = { ...values, [key]: value };
    setValues(next);
    if (submitted) setErrors(validate(next));
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    const next = validate(values);
    setErrors(next);
    if (Object.keys(next).length === 0) setDone(true);
  }

  return (
    <div className="relative min-h-svh overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-grid [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="relative mx-auto grid min-h-svh max-w-6xl items-center gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_380px] lg:gap-20 lg:px-10">
        <div className="mx-auto w-full max-w-md lg:mx-0">
          <Eyebrow>Create an account</Eyebrow>
          <h1 className="mt-3 text-4xl font-medium tracking-[-0.05em] sm:text-5xl">
            Claim your <span className="text-primary">hub.</span>
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">Free for one hub site. No card needed.</p>

          {done ? (
            <div role="status" className="mt-8 rounded-lg border border-success/40 bg-success/10 p-5">
              <p className="font-display text-lg font-medium tracking-tight">Check your inbox.</p>
              <p className="mt-1 text-sm text-muted-foreground">
                We sent a sign-in link to <span className="text-foreground">{values.email}</span>.
              </p>
            </div>
          ) : (
            <form className="mt-8" noValidate onSubmit={onSubmit}>
              <FieldGroup className="gap-5">
                <Field data-invalid={!!errors.name}>
                  <FieldLabel htmlFor="signup-name">Name</FieldLabel>
                  <Input
                    id="signup-name"
                    autoComplete="name"
                    placeholder="Alex Marsh"
                    value={values.name}
                    aria-invalid={!!errors.name}
                    onChange={(e) => update("name", e.target.value)}
                  />
                  <FieldError>{errors.name}</FieldError>
                </Field>
                <Field data-invalid={!!errors.email}>
                  <FieldLabel htmlFor="signup-email">Email</FieldLabel>
                  <Input
                    id="signup-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={values.email}
                    aria-invalid={!!errors.email}
                    onChange={(e) => update("email", e.target.value)}
                  />
                  <FieldError>{errors.email}</FieldError>
                </Field>
                <Field data-invalid={!!errors.password}>
                  <FieldLabel htmlFor="signup-password">Password</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="At least 8 characters"
                      value={values.password}
                      aria-invalid={!!errors.password}
                      aria-describedby="signup-strength"
                      onChange={(e) => update("password", e.target.value)}
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
                  <div id="signup-strength" className="flex items-center gap-3" aria-live="polite">
                    <div className="grid flex-1 grid-cols-4 gap-1" aria-hidden="true">
                      {[1, 2, 3, 4].map((i) => (
                        <span
                          key={i}
                          className={cn(
                            "h-1 rounded-[1px] bg-[#2b352f] transition-colors",
                            values.password && score >= i && level.tone,
                          )}
                        />
                      ))}
                    </div>
                    <span
                      className={cn(
                        "w-16 text-right font-mono text-[10px] tracking-[0.16em] uppercase",
                        values.password ? level.text : "text-muted-foreground",
                      )}
                    >
                      {values.password ? level.label : "Strength"}
                    </span>
                  </div>
                  <FieldError>{errors.password}</FieldError>
                </Field>
                <Field orientation="horizontal" data-invalid={!!errors.terms}>
                  <Checkbox
                    id="signup-terms"
                    checked={values.terms}
                    aria-invalid={!!errors.terms}
                    onCheckedChange={(v) => update("terms", v === true)}
                  />
                  <FieldContent>
                    <FieldLabel htmlFor="signup-terms" className="font-normal">
                      I accept the terms and the hub rules
                    </FieldLabel>
                    {errors.terms ? (
                      <FieldError>{errors.terms}</FieldError>
                    ) : (
                      <FieldDescription>
                        Read them on <a href="#">example.com/terms</a>.
                      </FieldDescription>
                    )}
                  </FieldContent>
                </Field>
                <Button type="submit" size="lg" className="w-full">
                  Create account
                  <ArrowRightIcon />
                </Button>
              </FieldGroup>
            </form>
          )}

          <p className="mt-8 text-sm text-muted-foreground">
            Already on the network?{" "}
            <a
              href="#"
              className="rounded-sm text-primary underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              Sign in
            </a>
          </p>
        </div>

        <aside className="mx-auto w-full max-w-md rounded-lg border bg-card p-6 shadow-block-sm lg:mx-0">
          <div className="font-mono text-[10px] tracking-[0.2em] text-success uppercase">What you get</div>
          <ul className="mt-5 grid gap-5">
            {perks.map((perk) => (
              <li key={perk.title} className="flex gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-md border border-input bg-secondary text-primary">
                  <perk.icon className="size-4" />
                </span>
                <div>
                  <p className="font-display text-[15px] font-medium tracking-tight">{perk.title}</p>
                  <p className="mt-0.5 text-[13px] leading-relaxed text-muted-foreground">{perk.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
