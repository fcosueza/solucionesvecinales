import Link from "next/link";
import { NavItem } from "@/types";
import style from "./style.module.css";

interface Props {
  links: NavItem[];
  orientation?: "horizontal" | "vertical";
  color?: "white" | "black";
}

/**
 * Component that renders a navigation menu with configurable orientation and with indicated elements.
 *
 * @param links - List of links to render in the menu.
 * @param orientation - Menu orientation: horizontal or vertical.
 * @param color - Color variant available for menu.
 *
 * @returns The navigation menu with links indicated as a React element.
 */
const NavMenu = ({ links, orientation = "horizontal" }: Props): React.ReactNode => {
  const linkList = links.map(link => (
    <li className={orientation == "horizontal" ? style.horizontal : style.vertical} key={link.href}>
      <Link className={style.navItem} href={link.href}>
        {link.text}
      </Link>
    </li>
  ));

  return (
    <nav id="navbar">
      <ul className={style.navList}>{linkList}</ul>
    </nav>
  );
};

export default NavMenu;
