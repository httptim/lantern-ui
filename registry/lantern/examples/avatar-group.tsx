import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "@/registry/lantern/ui/avatar";

export default function AvatarGroupExample() {
  return (
    <div className="flex items-center gap-3">
      <AvatarGroup>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>MK</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback className="bg-secondary text-muted-foreground">+4</AvatarFallback>
        </Avatar>
      </AvatarGroup>
      <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">7 signed the guestbook</span>
    </div>
  );
}
