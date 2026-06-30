import { SocialIcon } from "@/types";
import Link from "next/link";
import Image from "next/image";
import style from "./style.module.css";
interface Props {
  icons: SocialIcon[];
  className?: string;
}

/**
 * Component that renders external social links with icons.
 *
 * @param icons - List of social icons with rendering metadata.
 * @param className - Optional CSS class to modify the appearance of the component.
 *
 * @returns Social links with icons as a React element.
 */
const Social = ({ icons, className = "" }: Props): React.ReactNode => {
  return (
    <div aria-label="social" className={`${style.social} ${className}`.trim()}>
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
