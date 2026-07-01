import NavMenu from "@/components/ui/NavMenu";
import Logo from "@/components/ui/Logo";
import Social from "@/components/ui/Social";
import { NavItem, SocialIcon } from "@/types";
import style from "./style.module.css";

/** Props del componente Footer. */
interface Props {
  links?: NavItem[];
  socialIcons?: SocialIcon[];
  withLogo?: boolean;
}

/**
 * Component that renders the footer with navigation, social networks and optional logo.
 *
 * @param links - List of links for footer menu.
 * @param socialIcons - List of social icons to display.
 * @param withLogo - Indicates whether the institutional logo should be shown.
 *
 * @returns The footer component as a React node.
 */
const Footer = ({ links, socialIcons, withLogo = false }: Props): React.ReactNode => {
  const navMenu = links ? <NavMenu links={links} orientation="vertical" /> : "";
  const socialIconsComponent = socialIcons ? <Social icons={socialIcons} /> : "";
  const logoComponent = withLogo ? <Logo url="/assets/images/logo-white.svg" width={300} height={150} /> : "";

  return (
    <footer className={style.footer}>
      {navMenu}
      {socialIconsComponent}
      {logoComponent}
    </footer>
  );
};

export default Footer;
