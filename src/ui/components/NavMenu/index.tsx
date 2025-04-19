import Link from "next/link";
import { NavItemData } from "@/types/types";
import style from "./style.module.css";

interface Props {
  links: NavItemData[];
  orientation?: "horizontal" | "vertical";
  color?: "white" | "black";
}

/**
 * Componente NavMenu
 *
 * Componente que crea un menu con un número determinado de enlaces en posición
 * vertical u horizontal.
 *
 * @param links Array de tipo NavItemData con la información de los enlaces
 * @param orientation Cadena con la orientación del menú
 * @param color
 *
 * @returns Nodo de react con el menú en formato de lista HTML.
 */

const NavMenu = ({ links, orientation = "horizontal" }: Props): React.ReactNode => {
  const linkList = links.map(link => (
    <li className={orientation == "horizontal" ? style.horizontal : style.vertical} key={link.src}>
      <Link className={style.navItem} href={link.src}>
        {link.text}
      </Link>
    </li>
  ));

  return <ul className={style.navList}>{linkList}</ul>;
};

export default NavMenu;
