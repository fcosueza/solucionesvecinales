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
 * Componente que renderiza el pie de página con navegación, redes sociales y logo opcional.
 *
 * @param props - Props del componente Footer.
 * @param props.links - Lista de enlaces para el menú del pie de página.
 * @param props.socialIcons - Lista de iconos sociales para mostrar.
 * @param props.withLogo - Indica si se debe mostrar el logo institucional.
 *
 * @returns El pie de página con navegación, redes sociales y logo como un elemento React.
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
      <p className={style.copy}>Copyright &copy; 2025 Fco Sueza. Software under MIT License. </p>
    </footer>
  );
};

export default Footer;
