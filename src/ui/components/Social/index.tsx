import { SocialIcon } from "@/types";
import Link from "next/link";
import Image from "next/image";
import style from "./style.module.css";

interface Props {
  icons: SocialIcon[];
}

const Social = ({ icons }: Props): React.ReactNode => {
  return (
    <div aria-label="social" className={style.social}>
      {icons.map(icon => {
        return (
          <Link href={icon.url} key={icon.src} target="_blank" className={style.link}>
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
