import { KeyReveal } from "@/registry/lantern/ui/key-reveal";

export default function KeyRevealMasked() {
  return (
    <KeyReveal
      masked
      className="max-w-md"
      label="Hub API key"
      value="lnt_hub_2c9e0b7f41aa83d6_hearth"
      warning="Anyone with this key can post to your guestbook. It will not be shown again."
    />
  );
}
