import NavMenu from "@/ui/components/NavMenu";
import Logo from "@/ui/components/Logo";
import Social from "@/ui/components/Social";
import { NavItem, SocialIcon } from "@/types/types";
import style from "./style.module.css";

interface Props {
  links: NavItem[];
  socialIcons: SocialIcon[];
  isSimple?: boolean;
}

/**
 * Componente Footer
 *
 * Componente que crea un pié de página. En su forma normal, crea un menú, una zona de
 * iconos de redes sociales y el logo de la aplicación, junto con un párrafo de copyright.
 * En su forma simple solo incluye el párrafo de copyright.
 *
 * @param links Array de elementos NavItem con los enlaces del menu
 * @param socialIcons Array de elementos de tipo SocialIcon con los iconos de las redes sociales.
 * @param isSimple Valor booleano que indica si el pié de página es simple o no.
 *
 * @returns Nodo de React con el footer.
 */

const Footer = ({ links, socialIcons, isSimple = false }: Props): React.ReactNode => {
  return (
    <footer role="footer" className={style.footer}>
      {isSimple ? (
        ""
      ) : (
        <>
          <NavMenu links={links} orientation="vertical" />
          <Social icons={socialIcons} />
          <Logo url="assets/images/logo-white.svg" width={300} height={150} />
        </>
      )}
      <p className={style.copy}>Copyright &copy; 2025 Fco Sueza. Software under MIT License. </p>
    </footer>
  );
};

export default Footer;
