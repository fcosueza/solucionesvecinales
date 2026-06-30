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
 * @param url - Logo image resource path.
 * @param altText - Alternative text for accessibility.
 * @param width - Width of the logo in pixels.
 * @param height - Height of the logo in pixels.
 *
 * @returns The project logo as a React element.
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
