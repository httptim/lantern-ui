"use client";

import * as React from "react";

import { Button } from "@/registry/lantern/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/lantern/ui/card";
import { Checkbox } from "@/registry/lantern/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/registry/lantern/ui/field";
import { Input } from "@/registry/lantern/ui/input";

type Errors = Partial<Record<"player" | "email" | "password" | "terms", { message: string }[]>>;

function validate(data: FormData): Errors {
  const errors: Errors = {};
  const player = String(data.get("player") ?? "");
  const email = String(data.get("email") ?? "");
  const password = String(data.get("password") ?? "");

  if (player.length < 3) errors.player = [{ message: "Player name needs at least 3 characters." }];
  else if (/\s/.test(player)) errors.player = [{ message: "Player names cannot contain spaces." }];
  if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = [{ message: "Enter a valid email address." }];
  const pw: { message: string }[] = [];
  if (password.length < 8) pw.push({ message: "Use at least 8 characters." });
  if (!/\d/.test(password)) pw.push({ message: "Include at least one number." });
  if (pw.length) errors.password = pw;
  if (!data.get("terms")) errors.terms = [{ message: "You need to accept the hub rules." }];
  return errors;
}

export default function FieldSignup() {
  const [errors, setErrors] = React.useState<Errors>({
    player: [{ message: "Player names cannot contain spaces." }],
    password: [{ message: "Use at least 8 characters." }, { message: "Include at least one number." }],
  });
  const [done, setDone] = React.useState(false);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>One account for every server you play on.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            const next = validate(new FormData(e.currentTarget));
            setErrors(next);
            setDone(Object.keys(next).length === 0);
          }}
        >
          <FieldGroup>
            <Field data-invalid={!!errors.player}>
              <FieldLabel htmlFor="su-player">Player name</FieldLabel>
              <Input
                id="su-player"
                name="player"
                defaultValue="steve builder"
                aria-invalid={!!errors.player}
                aria-describedby="su-player-error"
              />
              <FieldError id="su-player-error" errors={errors.player} />
            </Field>
            <Field data-invalid={!!errors.email}>
              <FieldLabel htmlFor="su-email">Email</FieldLabel>
              <Input
                id="su-email"
                name="email"
                type="email"
                defaultValue="steve@example.com"
                aria-invalid={!!errors.email}
                aria-describedby="su-email-error"
              />
              <FieldError id="su-email-error" errors={errors.email} />
            </Field>
            <Field data-invalid={!!errors.password}>
              <FieldLabel htmlFor="su-password">Password</FieldLabel>
              <Input
                id="su-password"
                name="password"
                type="password"
                defaultValue="turtle"
                aria-invalid={!!errors.password}
                aria-describedby="su-password-error"
              />
              <FieldError id="su-password-error" errors={errors.password} />
            </Field>
            <Field orientation="horizontal" data-invalid={!!errors.terms}>
              <Checkbox id="su-terms" name="terms" aria-invalid={!!errors.terms} aria-describedby="su-terms-error" />
              <FieldContent>
                <FieldLabel htmlFor="su-terms">I accept the hub rules</FieldLabel>
                <FieldError id="su-terms-error" errors={errors.terms} />
              </FieldContent>
            </Field>
            <Field>
              <Button type="submit" className="w-full">
                Create account
              </Button>
              {done && (
                <FieldDescription role="status" className="text-center text-success">
                  Account created. Check your email to confirm.
                </FieldDescription>
              )}
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
