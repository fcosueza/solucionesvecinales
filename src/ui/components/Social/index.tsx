import { SocialIcon } from "@/types/types";
import Link from "next/link";
import Image from "next/image";
import style from "./style.module.css";

interface Props {
  icons: SocialIcon[];
}

/**
 * Componente Social
 *
 * Componente que genera un elemento con iconos de redes sociales o similares. Los iconos
 * son enlaces que se podrán.
 *
 * @param icons Array de elementos SocialItem con los iconos de las redes sociales.
 *
 * @returns Un nodo de React compuesto por un div y los iconos pasados como parámetros.
 */
const Social = ({ icons }: Props): React.ReactNode => {
  return (
    <div role="social" className={style.social}>
      {icons.map(icon => {
        return (
          <Link href={icon.url} key={icon.src} target="_blank">
            <Image
              className={style.icon}
              src={icon.src}
              alt={icon.altText}
              width={icon.width}
              height={icon.height}
              title={icon.title}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default Social;
