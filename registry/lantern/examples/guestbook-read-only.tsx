import { Guestbook, GuestbookEntry, GuestbookHeader, GuestbookList } from "@/registry/lantern/ui/guestbook";

const entries = [
  { name: "redstone_rae", time: "12m ago", message: "The turtle yard page saved my base. Thank you." },
  { name: "Night Owl", time: "1h ago", message: "Tuning in to the night radio from the nether hub." },
  { name: "cobble_carl", time: "3d ago", message: "Signed on computer 4127. Hello from the desert outpost." },
];

export default function GuestbookReadOnly() {
  return (
    <Guestbook className="w-full max-w-lg">
      <GuestbookHeader>Recent signatures</GuestbookHeader>
      <GuestbookList>
        {entries.map((entry) => (
          <GuestbookEntry key={entry.name} {...entry} />
        ))}
      </GuestbookList>
    </Guestbook>
  );
}
