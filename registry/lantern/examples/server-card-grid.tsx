import { ServerCard } from "@/registry/lantern/ui/server-card";

const servers = [
  { name: "Lantern SMP", address: "play.example.net", players: 18, maxPlayers: 20, version: "1.21.4", playerNames: ["Thultz", "ByteMiner", "Ashling"] },
  { name: "Turtle Lab", address: "lab.example.net", players: 2, maxPlayers: 8, version: "1.20.1", playerNames: ["copper_kid", "Pim"] },
  { name: "Skyblock", address: "sky.example.net", online: false, maxPlayers: 40, version: "1.19.2" },
];

export default function ServerCardGrid() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {servers.map((s) => (
        <ServerCard key={s.name} {...s} />
      ))}
    </div>
  );
}
