import NavMenu from "@/ui/components/NavMenu";
import Logo from "@/ui/components/Logo";
import Social from "@/ui/components/Social";
import { NavItem, SocialIcon } from "@/types";
import style from "./style.module.css";

interface Props {
  links?: NavItem[];
  socialIcons?: SocialIcon[];
  withLogo?: boolean;
}

const Footer = ({ links, socialIcons, withLogo = false }: Props): React.ReactNode => {
  const menu = links ? <NavMenu links={links} orientation="vertical" /> : "";
  const social = socialIcons ? <Social icons={socialIcons} /> : "";
  const logo = withLogo ? <Logo url="assets/images/logo-white.svg" width={300} height={150} /> : "";

  return (
    <footer className={style.footer}>
      {menu}
      {social}
      {logo}
      <p className={style.copy}>Copyright &copy; 2025 Fco Sueza. Software under MIT License. </p>
    </footer>
  );
};

export default Footer;
