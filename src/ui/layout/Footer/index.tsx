import NavMenu from "@/ui/components/NavMenu";
import Logo from "@/ui/components/Logo";
import Social from "@/ui/components/Social";
import { NavItemData, SocialItem } from "@/types/types";
import style from "./style.module.css";

interface Props {
  links: NavItemData[];
  socialIcons: SocialItem[];
}

const Footer = ({ links, socialIcons }: Props): React.ReactNode => {
  return (
    <footer role="footer" className={style.footer}>
      <NavMenu links={links} orientation="vertical" />
      <Social icons={socialIcons} />
      <Logo url="assets/images/logo-white.svg" width={300} height={150} />
      <p className={style.copy}>Lorem Ipsum Dolor Sit Amet</p>
    </footer>
  );
};

export default Footer;
