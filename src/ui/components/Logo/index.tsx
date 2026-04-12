import Image from "next/image";
import style from "./style.module.css";

/** Props del componente Logo. */
interface Props {
  url?: string;
  altText?: string;
  width?: number;
  height?: number;
}

/**
 * Componente que renderiza el logo del proyecto con dimensiones opcionales.
 *
 * @param props - Props del componente Logo.
 * @param props.url - Ruta del recurso de imagen del logo.
 * @param props.altText - Texto alternativo para accesibilidad.
 * @param props.width - Ancho del logo en píxeles.
 * @param props.height - Alto del logo en píxeles.
 *
 * @returns El logo del proyecto como un elemento React.
 */
const Logo = ({
  url = "assets/images/logo.svg",
  altText = "Logo de la aplicación Soluciones Vecinales",
  width = 150,
  height = 120
}: Props): React.ReactNode => {
  return <Image className={style.logo} src={url} width={width} height={height} alt={altText} aria-label="Logo" />;
};

export default Logo;
