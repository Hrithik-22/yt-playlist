import {  Navbar, NavbarBrand,   NavbarContent,   NavbarItem,} from "@nextui-org/navbar";
import {Link} from "@nextui-org/link";
import logo from "../assets/yt-logo.png";

function Header() {
  return (
    <Navbar>
      <NavbarBrand >
        <img className="w-20 " src={logo} />
        <p className="font-bold text-inherit">Playlist Length Calculator</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="https://github.com/Hrithik-22" target="_blank">Github</Link>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Link href="https://www.linkedin.com/in/hrithik-kedare-840a3a148/" target="_blank">LinkedIn</Link>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Link href="https://x.com/way_of_ace" target="_blank">X</Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export default Header