import Link from "next/link";
import { NavItemData } from "@/types/types";

interface Props {
  links: NavItemData[];
  orientation?: "horizontal" | "vertical";
}

export const NavMenu = ({ links, orientation = "horizontal" }: Props) => {
  const link = links[0];

  return <Link href={link.url}>{link.text}</Link>;
};
