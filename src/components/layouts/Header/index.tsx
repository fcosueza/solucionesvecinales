"use client";

import Logo from "@/components/ui/Logo";
import NavMenu from "@/components/ui/NavMenu";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { NavItem } from "@/types";
import style from "./style.module.css";

/** Props del componente Header. */
interface Props {
  links?: NavItem[];
  buttonText?: string;
  buttonRoute?: string;
  burgerMenu?: boolean;
  backgroundVariant?: "default" | "highlight";
}

/**
 * Component that renders the main header with logo, menu and action button. When the
 * page scrolls, a shadow is added to the header to improve visibility.
 *
 * @param props - Props del componente Header.
 * @param props.links - Optional list of links for the navigation menu.
 * @param props.buttonText - Visible text of the main button.
 * @param props.buttonRoute - Destination route by pressing the button.
 * @param props.burgerMenu - Hamburger menu mode indicator.
 * @param props.backgroundVariant - Visual variant of the header background.
 *
 * @returns La main header with logo, menu and button as a React element.
 */
const Header = ({ links, buttonText, buttonRoute = "/", backgroundVariant = "default" }: Props): React.ReactNode => {
  const menuNavegacion = links ? <NavMenu links={links} /> : "";
  const enrutador = useRouter();
  const [cabeceraDesplazada, setCabeceraDesplazada] = useState(false);

  // Effect to detect the scrolling of the page and be able to add the shadow.
  useEffect(() => {
    const alDesplazar = (): void => {
      setCabeceraDesplazada(window.scrollY > 0);
    };

    alDesplazar();
    window.addEventListener("scroll", alDesplazar, { passive: true });

    return () => {
      window.removeEventListener("scroll", alDesplazar);
    };
  }, []);

  return (
    <header
      id="header"
      className={`${style.header} ${style[`header--${backgroundVariant}`]} ${cabeceraDesplazada ? style["header--scrolled"] : ""}`.trim()}
    >
      <Logo altText="Logo de SolucionesVecinales" width={220} height={100} />
      <div role="toolbar" className={style.navBar}>
        {menuNavegacion}
        {buttonText ? <Button text={buttonText} onClick={() => enrutador.push(buttonRoute)} /> : null}
      </div>
    </header>
  );
};

export default Header;
