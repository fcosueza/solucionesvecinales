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
 * @param props - Props del componente Footer.
 * @param props.links - List of links for footer menu.
 * @param props.socialIcons - List of social icons to display.
 * @param props.withLogo - Indicates whether the institutional logo should be shown.
 * @returns El Footer with navigation, social media and logo as a React element.
 */
const Footer = ({ links, socialIcons, withLogo = false }: Props): React.ReactNode => {
  const menuNavegacion = links ? <NavMenu links={links} orientation="vertical" /> : "";
  const iconosSociales = socialIcons ? <Social icons={socialIcons} /> : "";
  const logoInstitucional = withLogo ? <Logo url="/assets/images/logo-white.svg" width={300} height={150} /> : "";

  return (
    <footer className={style.footer}>
      {menuNavegacion}
      {iconosSociales}
      {logoInstitucional}
    </footer>
  );
};

export default Footer;
