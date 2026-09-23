import { Field, FieldDescription, FieldLabel } from "@/registry/lantern/ui/field";
import { TagInput } from "@/registry/lantern/ui/tag-input";

export default function TagInputDemo() {
  return (
    <Field className="w-full max-w-md">
      <FieldLabel htmlFor="site-tags">Site tags</FieldLabel>
      <TagInput
        id="site-tags"
        defaultValue={["turtles", "guestbook"]}
        placeholder="Add a tag"
        aria-describedby="site-tags-help"
      />
      <FieldDescription id="site-tags-help">
        Press Enter or comma to add. Backspace removes the last tag. Paste a comma separated list to add several.
      </FieldDescription>
    </Field>
  );
}
