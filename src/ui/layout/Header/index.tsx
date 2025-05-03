"use client";

import Logo from "@/ui/components/Logo";
import NavMenu from "@/ui/components/NavMenu";
import Button from "@/ui/components/Button";
import { useRouter } from "next/navigation";
import { NavItem } from "@/types/types";
import style from "./style.module.css";

interface Props {
  menuLinks: NavItem[];
  buttonText: string;
  buttonRoute?: string;
  burgerMenu?: boolean;
}

/**
 * Componente Header
 *
 * Componente que crear la barra superior de la aplicación, compuesta por el logo de la
 * aplicación, un menu con enlaces a las diferentes secciones y el botón de acceso a la
 * página de login.
 *
 * @param menuLinks Array de tipo NavItemData con la información de los enlaces del menú.
 * @param buttonText Cadena con el texto que va a mostrar el botón.
 * @param buttonRoute Ruta donde redirecciona el botón
 *
 * @returns Nodo de React de tipo header con la cabecera.
 */
const Header = ({ menuLinks, buttonText, buttonRoute = "/" }: Props): React.ReactNode => {
  const router = useRouter();

  return (
    <header id="header" className={style.header}>
      <Logo altText="Logo de SolucionesVecinales" width={220} height={100} />
      <div role="toolbar" className={style.navBar}>
        {menuLinks.length > 0 ? <NavMenu links={menuLinks} /> : null}
        <Button text={buttonText} onClick={() => router.push(buttonRoute)} />
      </div>
    </header>
  );
};

export default Header;
