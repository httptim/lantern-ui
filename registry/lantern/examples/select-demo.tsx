import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/lantern/ui/select";

export default function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-full max-w-60" aria-label="Site theme">
        <SelectValue placeholder="Pick a theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="lantern">Lantern</SelectItem>
        <SelectItem value="moss">Moss</SelectItem>
        <SelectItem value="amber">Amber terminal</SelectItem>
        <SelectItem value="paper">Paper</SelectItem>
      </SelectContent>
    </Select>
  );
}
