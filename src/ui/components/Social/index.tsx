import { SocialIcon } from "@/types";
import Link from "next/link";
import Image from "next/image";
import style from "./style.module.css";

/** Props del componente Social. */
interface Props {
  icons: SocialIcon[];
}

/**
 * Renderiza enlaces sociales externos con iconos.
 * @param props - Props del componente Social.
 * @param props.icons - Lista de iconos sociales con metadatos de renderizado.
 */
const Social = ({ icons }: Props): React.ReactNode => {
  return (
    <div aria-label="social" className={style.social}>
      {icons.map(icono => {
        return (
          <Link href={icono.url} key={icono.src} target="_blank" className={style.link}>
            <Image
              className={style.icon}
              src={icono.src}
              alt={icono.altText}
              width={icono.width}
              height={icono.height}
              title={icono.title}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default Social;
