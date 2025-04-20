import { render, screen } from "@testing-library/react";
import { NavItem, SocialIcon } from "@/types/types";
import Footer from ".";

describe("Tests del componente Footer...", () => {
  const links: NavItem[] = [
    { text: "Inicio", href: "#" },
    { text: "Características", href: "#about" },
    { text: "Contacto", href: "#contact" },
    { text: "Login", href: "#login" }
  ];

  const icons: SocialIcon[] = [
    {
      src: "/assets/icons/facebook.png",
      altText: "Facebook Icon",
      url: "https://www.facebook.com/",
      title: "Facebook",
      width: 50,
      height: 50
    },
    {
      src: "/assets/icons/github.png",
      altText: "Github Icon",
      url: "https://www.github.com/",
      title: "Github",
      width: 50,
      height: 50
    }
  ];

  it("Debe renderizar el contenedor footer de forma adecuada", () => {
    render(<Footer links={links} socialIcons={icons} />);

    expect(screen.getByRole("footer")).toBeInTheDocument();
  });

  it("Debe renderizar el menú con los enlaces que le hemos pasado de forma vertical", () => {
    render(<Footer links={links} socialIcons={[]} />);

    expect(screen.getByRole("nav")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(links.length);
    expect(screen.getAllByRole("listitem")[0]).toHaveClass("vertical");
  });

  it("Debe renderizar los iconos sociales que le hemos pasado", () => {
    render(<Footer links={links} socialIcons={icons} />);

    expect(screen.getByRole("social")).toBeInTheDocument();
  });

  it("Debe renderizar el logo de la aplicación", () => {
    render(<Footer links={links} socialIcons={icons} />);

    expect(screen.getByRole("logo")).toBeInTheDocument();
  });

  it("Debe renderizar el parrafo de copyright", () => {
    render(<Footer links={links} socialIcons={icons} />);

    expect(screen.getByRole("paragraph")).toBeInTheDocument();
  });
});
