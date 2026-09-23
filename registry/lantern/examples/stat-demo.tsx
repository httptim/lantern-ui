import { Stat, StatGroup, StatLabel, StatValue } from "@/registry/lantern/ui/stat";

export default function StatDemo() {
  return (
    <StatGroup className="w-full">
      <Stat>
        <StatLabel>sites on the network</StatLabel>
        <StatValue>128</StatValue>
      </Stat>
      <Stat>
        <StatLabel>servers connected</StatLabel>
        <StatValue>14</StatValue>
      </Stat>
      <Stat>
        <StatLabel>guestbook entries</StatLabel>
        <StatValue>3.2k</StatValue>
      </Stat>
    </StatGroup>
  );
}
