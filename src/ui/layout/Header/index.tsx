import Logo from "@/ui/components/Logo";
import NavMenu from "@/ui/components/NavMenu";
import Button from "@/ui/components/Button";
import { NavItemData } from "@/types/types";
import style from "./style.module.css";

interface Props {
  menuLinks: NavItemData[];
  buttonText: string;
  buttonFunc: (Event: React.MouseEvent<HTMLElement>) => void;
  burgerMenu?: boolean;
  fixed?: boolean;
}

const Header = ({
  menuLinks,
  buttonText,
  buttonFunc,
  burgerMenu = false
}: Props): React.ReactNode => {
  if (burgerMenu) return <h1>TODO: BURGER</h1>;

  return (
    <header id="header" className={style.header}>
      <Logo altText="Logo de SolucionesVecinales" width={220} height={100} />
      <nav id="navbar" className={style.navBar}>
        <NavMenu links={menuLinks} />
        <Button text={buttonText} onClick={buttonFunc} />
      </nav>
    </header>
  );
};

export default Header;
