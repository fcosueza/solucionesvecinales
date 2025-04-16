import Link from "next/link";

export interface NavItemData {
  text: string;
  url: string;
}

interface Props {
  links: NavItemData[];
  orientation?: "horizontal" | "vertical";
}

export const NavMenu = ({ links, orientation = "horizontal" }: Props) => {
  const link = links[0];

  return <Link href={link.url}>{link.text}</Link>;
};
