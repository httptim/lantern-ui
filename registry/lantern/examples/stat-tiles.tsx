import { Stat, StatGroup, StatLabel, StatValue } from "@/registry/lantern/ui/stat";

export default function StatTiles() {
  return (
    <StatGroup variant="tiles" className="w-full max-w-xs">
      <Stat>
        <StatLabel>Fuel</StatLabel>
        <StatValue>3,602</StatValue>
      </Stat>
      <Stat>
        <StatLabel>Home</StatLabel>
        <StatValue>43 m</StatValue>
      </Stat>
      <Stat>
        <StatLabel>Slots</StatLabel>
        <StatValue>6/16</StatValue>
      </Stat>
    </StatGroup>
  );
}
