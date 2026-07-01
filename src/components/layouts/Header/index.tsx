"use client";

import Logo from "@/components/ui/Logo";
import NavMenu from "@/components/ui/NavMenu";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { NavItem } from "@/types";
import style from "./style.module.css";

/** Props del componente Header. */
interface Props {
  links?: NavItem[];
  buttonText?: string;
  buttonRoute?: string;
  burgerMenu?: boolean;
  backgroundVariant?: "default" | "highlight";
}

/**
 * Component that renders the main header with logo, menu and action button. When the
 * page scrolls, a shadow is added to the header to improve visibility.
 *
 * @param links - Optional list of links for the navigation menu.
 * @param buttonText - Visible text of the main button.
 * @param buttonRoute - Destination route by pressing the button.
 * @param burgerMenu - Hamburger menu mode indicator.
 * @param backgroundVariant - Visual variant of the header background.
 *
 * @returns The main header with logo, menu and button as a React element.
 */
const Header = ({ links, buttonText, buttonRoute = "/", backgroundVariant = "default" }: Props): React.ReactNode => {
  const navMenu = links ? <NavMenu links={links} /> : "";
  const router = useRouter();
  const [scrolledHeader, setScrolledHeader] = useState(false);

  // Effect to detect the scrolling of the page and be able to add the shadow.
  useEffect(() => {
    const handleScroll = (): void => {
      setScrolledHeader(window.scrollY > 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      id="header"
      className={`${style.header} ${style[`header--${backgroundVariant}`]} ${scrolledHeader ? style["header--scrolled"] : ""}`.trim()}
    >
      <Logo altText="Logo de SolucionesVecinales" width={220} height={100} />
      <div role="toolbar" className={style.navBar}>
        {navMenu}
        {buttonText ? <Button text={buttonText} onClick={() => router.push(buttonRoute)} /> : null}
      </div>
    </header>
  );
};

export default Header;
