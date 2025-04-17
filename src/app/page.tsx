import Button from "@/ui/components/Button";
import NavMenu from "@/ui/components/NavMenu";
import Logo from "@/ui/components/Logo";
import { NavItemData } from "@/types/types";

export default function Home() {
  const links: NavItemData[] = [
    { text: "testLink-1", url: "/home" },
    { text: "testLink-2", url: "/contact" },
    { text: "testLink-3", url: "/about" }
  ];

  return (
    <div>
      <h1>Soluciones Vecinales</h1>
      <NavMenu links={links} />
      <Button text="prueba" />
      <Logo url="assets/images/logo.svg" altText="Logotipo" width={200} height={150} />
    </div>
  );
}
