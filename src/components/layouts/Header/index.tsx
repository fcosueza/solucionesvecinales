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
 * Componente que renderiza la cabecera principal con logo, menú y botón de acción. Cuando la 
 * página hace scroll, se añade una sombra a la cabecera para mejorar la visibilidad.
 *
 * @param props - Props del componente Header.
 * @param props.links - Lista opcional de enlaces para el menú de navegación.
 * @param props.buttonText - Texto visible del botón principal.
 * @param props.buttonRoute - Ruta de destino al pulsar el botón.
 * @param props.burgerMenu - Indicador de modo menú hamburguesa.
 * @param props.backgroundVariant - Variante visual del fondo de la cabecera.
 * 
 * @returns La cabecera principal con logo, menú y botón como un elemento React.
 */
const Header = ({
  links,
  buttonText,
  buttonRoute = "/",
  backgroundVariant = "default"
}: Props): React.ReactNode => {
  const menuNavegacion = links ? <NavMenu links={links} /> : "";
  const enrutador = useRouter();
  const [cabeceraDesplazada, setCabeceraDesplazada] = useState(false);

  // Efecto para detectar el desplazamiento de la página y poder añadir la sombra.
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
