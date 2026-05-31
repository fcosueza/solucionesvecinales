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
 * Component that renders the project logo with optional dimensions.
 *
 * @param props - Props del componente Logo.
 * @param props.url - Logo image resource path.
 * @param props.altText - Alternative text for accessibility.
 * @param props.width - Width of the logo in pixels.
 * @param props.height - Height of the logo in pixels.
 * @returns El logo del proyecto como un elemento React.
 */
const Logo = ({
  url = "/assets/images/logo.svg",
  altText = "Logo de la aplicación Soluciones Vecinales",
  width = 150,
  height = 120
}: Props): React.ReactNode => {
  return (
    <Image
      className={style.logo}
      src={url}
      width={width}
      height={height}
      alt={altText}
      aria-label="Logo"
      loading="eager"
    />
  );
};

export default Logo;
