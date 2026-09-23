import { Label } from "@/registry/lantern/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/lantern/ui/select";

export default function SelectStates() {
  return (
    <div className="grid w-full max-w-60 gap-5">
      <div className="grid gap-2">
        <Label htmlFor="sel-region">Region</Label>
        <Select>
          <SelectTrigger id="sel-region" aria-invalid className="w-full">
            <SelectValue placeholder="Choose a region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="overworld">Overworld</SelectItem>
            <SelectItem value="nether">Nether</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-destructive">Pick where your host computer lives.</p>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="sel-plan">Plan</Label>
        <Select defaultValue="free" disabled>
          <SelectTrigger id="sel-plan" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="free">Free</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Select defaultValue="10">
        <SelectTrigger size="sm" aria-label="Rows per page" className="w-24">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="10">10 rows</SelectItem>
          <SelectItem value="25">25 rows</SelectItem>
          <SelectItem value="50">50 rows</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
