import Image from "next/image";
import style from "./style.module.css";

interface Props {
  url?: string;
  altText: string;
  width?: number;
  height?: number;
}

/**
 * Componente Logo
 *
 * Componente que crea el Logo para la página, renderizando por defecto la imagen
 * logo.svg en public/assets/images, aunque se puede indicar cualquiera con el parametro
 * url.
 *
 * @param url Ruta de la imagen que se quere renderizar, por defecto "assets/images/logo.svg".
 * @param width Anchura del logo en pixeles.
 * @param height Altura del logo en pixeles.
 * @param altText Texto alternativo para la imagen.
 *
 * @returns Nodo de react con un elemento de tipo img conteniendo el logo.
 */

const Logo = ({
  url = "assets/images/logo.svg",
  altText,
  width = 150,
  height = 120
}: Props): React.ReactNode => {
  return <Image className={style.logo} src={url} width={width} height={height} alt={altText} />;
};

export default Logo;
