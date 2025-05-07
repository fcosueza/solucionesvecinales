"use client";

import Logo from "@/ui/components/Logo";
import NavMenu from "@/ui/components/NavMenu";
import Button from "@/ui/components/Button";
import { useRouter } from "next/navigation";
import { NavItem } from "@/types/types";
import style from "./style.module.css";

interface Props {
  links?: NavItem[];
  buttonText: string;
  buttonRoute?: string;
  burgerMenu?: boolean;
}

const Header = ({ links, buttonText, buttonRoute = "/" }: Props): React.ReactNode => {
  const menu = links ? <NavMenu links={links} /> : "";
  const router = useRouter();

  return (
    <header id="header" className={style.header}>
      <Logo altText="Logo de SolucionesVecinales" width={220} height={100} />
      <div role="toolbar" className={style.navBar}>
        {menu}
        <Button text={buttonText} onClick={() => router.push(buttonRoute)} />
      </div>
    </header>
  );
};

export default Header;
