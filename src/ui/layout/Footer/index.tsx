import NavMenu from "@/ui/components/NavMenu";
import Logo from "@/ui/components/Logo";
import Social from "@/ui/components/Social";
import { NavItem, SocialIcon } from "@/types/types";
import style from "./style.module.css";

interface Props {
  links: NavItem[];
  socialIcons: SocialIcon[];
}

const Footer = ({ links, socialIcons }: Props): React.ReactNode => {
  return (
    <footer role="footer" className={style.footer}>
      <NavMenu links={links} orientation="vertical" />
      <Social icons={socialIcons} />
      <Logo url="assets/images/logo-white.svg" width={300} height={150} />
      <p className={style.copy}>Copyright &copy; 2025 Fco Sueza. Software under MIT License. </p>
    </footer>
  );
};

export default Footer;
