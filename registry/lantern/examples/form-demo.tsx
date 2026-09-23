"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/registry/lantern/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/registry/lantern/ui/form";
import { Input } from "@/registry/lantern/ui/input";
import { Textarea } from "@/registry/lantern/ui/textarea";

const formSchema = z.object({
  name: z.string().min(3, "Site name needs at least 3 characters.").max(32, "Keep the site name under 32 characters."),
  address: z
    .string()
    .min(3, "Address needs at least 3 characters.")
    .regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers and dashes only."),
  about: z.string().max(140, "Keep the description under 140 characters.").optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function FormDemo() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", address: "", about: "" },
  });

  function onSubmit(values: FormValues) {
    toast("Site published", {
      description: (
        <pre className="mt-2 w-full overflow-x-auto rounded-md border bg-background p-3 font-mono text-[11px] text-foreground">
          {JSON.stringify(values, null, 2)}
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="grid w-full max-w-sm gap-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Site name</FormLabel>
              <FormControl>
                <Input placeholder="Turtle Farm" {...field} />
              </FormControl>
              <FormDescription>Shown in the hub directory.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground">hub://</span>
                <FormControl>
                  <Input placeholder="turtle-farm" className="font-mono" {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="about"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="What visitors will find here." className="min-h-20" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-3">
          <Button type="submit">Publish site</Button>
          <Button type="button" variant="ghost" onClick={() => form.reset()}>
            Reset
          </Button>
        </div>
      </form>
    </Form>
  );
}
