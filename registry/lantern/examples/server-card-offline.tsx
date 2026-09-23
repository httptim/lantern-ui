import { ServerCard } from "@/registry/lantern/ui/server-card";

export default function ServerCardOffline() {
  return (
    <ServerCard
      className="w-full max-w-sm"
      name="Creative Test"
      address="10.0.4.12:25566"
      online={false}
      maxPlayers={10}
      version="1.20.1"
      motd="Down for a world backup"
    />
  );
}
