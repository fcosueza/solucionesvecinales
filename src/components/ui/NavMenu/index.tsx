import Link from "next/link";
import { NavItem } from "@/types";
import style from "./style.module.css";

/** Props del componente NavMenu. */
interface Props {
  links: NavItem[];
  orientation?: "horizontal" | "vertical";
  color?: "white" | "black";
}

/**
 * Component that renders a navigation menu with configurable orientation and with indicated elements.
 *
 * @param props - Props del componente NavMenu.
 * @param props.links - List of links to render in the menu.
 * @param props.orientation - Menu orientation: horizontal or vertical.
 * @param props.color - Color variant available for menu.
 * @returns El Navigation menu with links indicated as a React element.
 */
const NavMenu = ({ links, orientation = "horizontal" }: Props): React.ReactNode => {
  const listaEnlaces = links.map(enlace => (
    <li className={orientation == "horizontal" ? style.horizontal : style.vertical} key={enlace.href}>
      <Link className={style.navItem} href={enlace.href}>
        {enlace.text}
      </Link>
    </li>
  ));

  return (
    <nav id="navbar">
      <ul className={style.navList}>{listaEnlaces}</ul>
    </nav>
  );
};

export default NavMenu;
