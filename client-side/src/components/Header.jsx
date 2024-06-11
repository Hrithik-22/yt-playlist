import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import logo from "../assets/yt-logo.png";

function Header() {
  return (
    <Navbar className="w-full">
      <NavbarBrand className="flex items-center space-x-2 justify-around">
        <img className="w-16 md:w-20" src={logo} alt="Logo" />
        <p className="font-bold text-inherit text-sm md:text-base">Playlist Length Calculator</p>
      </NavbarBrand>
      <NavbarContent className="flex justify-end space-x-4">
        <NavbarItem className="hidden md:flex">
          <Link href="https://github.com/Hrithik-22" target="_blank">Github</Link>
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Link href="https://www.linkedin.com/in/hrithik-kedare-840a3a148/" target="_blank">LinkedIn</Link>
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <Link href="https://x.com/way_of_ace" target="_blank">X</Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default Header;
