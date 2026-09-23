import {
  Navbar,
  NavbarBrand,
  NavbarCta,
  NavbarLabel,
  NavbarLink,
  NavbarLinks,
  NavbarMark,
  NavbarMobile,
} from "@/registry/lantern/ui/navbar";

const links = [
  { href: "#", label: "Directory", active: true },
  { href: "#", label: "Guestbooks" },
  { href: "#", label: "Docs" },
];

export default function NavbarDemo() {
  return (
    <div className="w-full overflow-hidden rounded-lg border">
      <Navbar className="static border-b-0 [&>div]:px-4 sm:[&>div]:px-6">
        <NavbarBrand href="#">
          <NavbarMark />
          lantern
          <NavbarLabel>Hub</NavbarLabel>
        </NavbarBrand>
        <NavbarLinks>
          {links.map((link) => (
            <NavbarLink key={link.label} href={link.href} active={link.active}>
              {link.label}
            </NavbarLink>
          ))}
          <NavbarCta href="#">Publish a hub</NavbarCta>
        </NavbarLinks>
        <NavbarMobile>
          {links.map((link) => (
            <NavbarLink key={link.label} href={link.href} active={link.active}>
              {link.label}
            </NavbarLink>
          ))}
          <NavbarCta href="#">Publish a hub</NavbarCta>
        </NavbarMobile>
      </Navbar>
    </div>
  );
}
