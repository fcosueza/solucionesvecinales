import Link from "next/link";
import { NavItemData } from "@/types/types";
import style from "./style.module.css";

interface Props {
  links: NavItemData[];
  orientation?: "horizontal" | "vertical";
}

export const NavMenu = ({ links, orientation = "horizontal" }: Props) => {
  const linkList = links.map(link => (
    <li className={orientation == "horizontal" ? style.horizontal : style.vertical} key={link.url}>
      <Link className={style.navItem} href={link.url}>
        {link.text}
      </Link>
    </li>
  ));

  return <ul className={style.navList}>{linkList}</ul>;
};
