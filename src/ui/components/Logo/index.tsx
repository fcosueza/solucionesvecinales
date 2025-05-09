import Image from "next/image";
import style from "./style.module.css";

interface Props {
  url?: string;
  altText?: string;
  width?: number;
  height?: number;
}

const Logo = ({
  url = "assets/images/logo.svg",
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
    />
  );
};

export default Logo;
