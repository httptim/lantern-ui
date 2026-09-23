import { Avatar, AvatarFallback, AvatarImage } from "@/registry/lantern/ui/avatar";

export default function AvatarFallbackExample() {
  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src="/missing-turtle.png" alt="Turtle 07" />
        <AvatarFallback>T7</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>OP</AvatarFallback>
      </Avatar>
      <Avatar className="size-12">
        <AvatarFallback className="bg-primary text-primary-foreground">HB</AvatarFallback>
      </Avatar>
    </div>
  );
}
