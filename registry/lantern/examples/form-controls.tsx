"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/registry/lantern/ui/button";
import { Checkbox } from "@/registry/lantern/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/registry/lantern/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/lantern/ui/select";
import { Switch } from "@/registry/lantern/ui/switch";

const formSchema = z.object({
  world: z.string({ error: "Pick a world for the server." }).min(1, "Pick a world for the server."),
  whitelist: z.boolean(),
  rules: z.boolean().refine((value) => value, { message: "Accept the hub rules to continue." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function FormControls() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { world: "", whitelist: true, rules: false },
  });

  function onSubmit(values: FormValues) {
    toast.success("Server settings saved", {
      description: `${values.world}, whitelist ${values.whitelist ? "on" : "off"}.`,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="grid w-full max-w-sm gap-6">
        <FormField
          control={form.control}
          name="world"
          render={({ field }) => (
            <FormItem>
              <FormLabel>World</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full" onBlur={field.onBlur}>
                    <SelectValue placeholder="Pick a world" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Overworld">Overworld</SelectItem>
                  <SelectItem value="Deepstone">Deepstone</SelectItem>
                  <SelectItem value="Skylands">Skylands</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="whitelist"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between gap-4 rounded-md border border-input p-4">
              <div className="grid gap-1.5">
                <FormLabel>Whitelist</FormLabel>
                <FormDescription>Only listed players can join.</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rules"
          render={({ field }) => (
            <FormItem className="gap-2">
              <div className="flex items-center gap-3">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={(checked) => field.onChange(checked === true)} />
                </FormControl>
                <FormLabel>I accept the hub rules</FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full sm:w-fit">
          Save settings
        </Button>
      </form>
    </Form>
  );
}
