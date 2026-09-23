import {
  AnnouncementBar,
  AnnouncementBarBadge,
  AnnouncementBarLink,
  AnnouncementBarMessage,
} from "@/registry/lantern/ui/announcement-bar";

export default function AnnouncementBarVariants() {
  return (
    <div className="flex w-full max-w-2xl flex-col gap-4">
      <AnnouncementBar className="rounded-md border">
        <AnnouncementBarBadge>New</AnnouncementBarBadge>
        <AnnouncementBarMessage>Turtle relays are back online.</AnnouncementBarMessage>
        <AnnouncementBarLink href="#">Status</AnnouncementBarLink>
      </AnnouncementBar>
      <AnnouncementBar variant="primary" className="rounded-md">
        <AnnouncementBarBadge>v0.4</AnnouncementBarBadge>
        <AnnouncementBarMessage>Lantern 0.4 adds custom domains for hub sites.</AnnouncementBarMessage>
        <AnnouncementBarLink href="#">Changelog</AnnouncementBarLink>
      </AnnouncementBar>
      <AnnouncementBar variant="subtle" className="rounded-md border" dismissible={false}>
        <AnnouncementBarBadge>Note</AnnouncementBarBadge>
        <AnnouncementBarMessage>Server 2 restarts at 04:00 UTC.</AnnouncementBarMessage>
      </AnnouncementBar>
    </div>
  );
}
