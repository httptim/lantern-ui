import { ServerCard } from "@/registry/lantern/ui/server-card";

export default function ServerCardDemo() {
  return (
    <ServerCard
      className="w-full max-w-sm"
      name="Lantern SMP"
      address="play.example.net"
      players={7}
      maxPlayers={20}
      version="1.21.4"
      motd="Turtle races every Friday at spawn"
      playerNames={["Thultz", "ByteMiner", "RedstoneRae", "copper_kid", "Ashling", "NightOwl", "Pim"]}
    />
  );
}
