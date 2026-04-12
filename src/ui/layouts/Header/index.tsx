"use client";

import Logo from "@/ui/components/Logo";
import NavMenu from "@/ui/components/NavMenu";
import Button from "@/ui/components/Button";
import { useRouter } from "next/navigation";
import { NavItem } from "@/types";
import style from "./style.module.css";

/** Props del componente Header. */
interface Props {
  links?: NavItem[];
  buttonText: string;
  buttonRoute?: string;
  burgerMenu?: boolean;
}

/**
 * Componente que renderiza la cabecera principal con logo, menú y botón de acción.
 *
 * @param props - Props del componente Header.
 * @param props.links - Lista opcional de enlaces para el menú de navegación.
 * @param props.buttonText - Texto visible del botón principal.
 * @param props.buttonRoute - Ruta de destino al pulsar el botón.
 * @param props.burgerMenu - Indicador de modo menú hamburguesa.
 *
 * @returns La cabecera principal con logo, menú y botón como un elemento React.
 */
const Header = ({ links, buttonText, buttonRoute = "/" }: Props): React.ReactNode => {
  const menuNavegacion = links ? <NavMenu links={links} /> : "";
  const enrutador = useRouter();

  return (
    <header id="header" className={style.header}>
      <Logo altText="Logo de SolucionesVecinales" width={220} height={100} />
      <div role="toolbar" className={style.navBar}>
        {menuNavegacion}
        <Button text={buttonText} onClick={() => enrutador.push(buttonRoute)} />
      </div>
    </header>
  );
};

export default Header;
