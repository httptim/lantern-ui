import type * as React from "react";

import { Button } from "@/registry/lantern/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/lantern/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from "@/registry/lantern/ui/field";
import { Input } from "@/registry/lantern/ui/input";

function GitHubMark(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

export default function FieldLogin() {
  return (
    <Card className="w-full max-w-sm shadow-block-sm">
      <CardHeader>
        <CardTitle>Sign in to the Hub</CardTitle>
        <CardDescription>Manage your sites and paired computers.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <Button type="button" variant="secondary" className="w-full">
                <GitHubMark />
                Continue with GitHub
              </Button>
            </Field>
            <FieldSeparator>or</FieldSeparator>
            <Field>
              <FieldLabel htmlFor="login-email">Email</FieldLabel>
              <Input id="login-email" type="email" placeholder="you@example.com" autoComplete="email" required />
            </Field>
            <Field>
              <div className="flex items-center justify-between gap-3">
                <FieldLabel htmlFor="login-password">Password</FieldLabel>
                <a href="#" className="text-xs text-primary underline-offset-4 hover:underline">
                  Forgot it?
                </a>
              </div>
              <Input id="login-password" type="password" autoComplete="current-password" required />
            </Field>
            <Field>
              <Button type="submit" className="w-full">
                Sign in
              </Button>
              <FieldDescription className="text-center">
                New here? <a href="#">Create an account</a>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
