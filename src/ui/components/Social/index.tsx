import { SocialItem } from "@/types/types";
import Link from "next/link";
import Image from "next/image";
import style from "./style.module.css";
import { link } from "fs";

interface Props {
  icons: SocialItem[];
}

const Social = ({ icons }: Props): React.ReactNode => {
  return (
    <div role="social" className={style.social}>
      {icons.map(icon => {
        return (
          <Link href={icon.url} key={icon.src}>
            <Image
              src={icon.src}
              alt={icon.altText}
              title={icon.title}
              width={icon.width}
              height={icon.height}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default Social;
