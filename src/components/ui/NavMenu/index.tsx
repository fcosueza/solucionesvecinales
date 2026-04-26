import Link from "next/link";
import { NavItem } from "@/types";
import style from "./style.module.css";

/** Props del componente NavMenu. */
interface Props {
  links: NavItem[];
  orientation?: "horizontal" | "vertical";
  color?: "white" | "black";
  className?: string;
}

/**
 * Componente que renderiza un menú de navegación con orientación configurable y con elementos indicados.
 *
 * @param props - Props del componente NavMenu.
 * @param props.links - Lista de enlaces a renderizar en el menú.
 * @param props.orientation - Orientación del menú: horizontal o vertical.
 * @param props.color - Variante de color disponible para el menú.
 *
 * @param props.className - Clase CSS opcional para modifcar la apariencia del componente.
 * @returns El menú de navegación con los enlaces indicados como un elemento React.
 */
const NavMenu = ({ links, orientation = "horizontal", className = "" }: Props): React.ReactNode => {
  const listaEnlaces = links.map(enlace => (
    <li className={orientation == "horizontal" ? style.horizontal : style.vertical} key={enlace.href}>
      <Link className={style.navItem} href={enlace.href}>
        {enlace.text}
      </Link>
    </li>
  ));

  return (
    <nav id="navbar" className={className}>
      <ul className={style.navList}>{listaEnlaces}</ul>
    </nav>
  );
};

export default NavMenu;
