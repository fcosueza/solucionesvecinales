import { render, screen } from "@testing-library/react";
import { NavItem, SocialIcon } from "@/types";
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

    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("Debe renderizar el menú con los enlaces que le hemos pasado de forma vertical", () => {
    render(<Footer links={links} socialIcons={[]} />);

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(links.length);
    expect(screen.getAllByRole("listitem")[0]).toHaveClass("vertical");
  });

  it("Debe renderizar los iconos sociales que le hemos pasado", () => {
    render(<Footer links={links} socialIcons={icons} />);

    expect(screen.getByLabelText("social")).toBeInTheDocument();
  });

  it("Debe renderizar el logo de la aplicación cuando se epecifica con logo", () => {
    render(<Footer links={links} socialIcons={icons} withLogo={true} />);

    expect(screen.getByRole("img", { name: "Logo" })).toBeInTheDocument();
  });

  it("Debe renderizar el parrafo de copyright", () => {
    render(<Footer links={links} socialIcons={icons} />);

    expect(screen.getByRole("paragraph")).toBeInTheDocument();
  });

  it("No debe renderizar el menú si no le pasamos ningún enlace", () => {
    render(<Footer socialIcons={icons} />);

    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it("No debe renderizar los iconos sociales si no le pasamos ningún enlace", () => {
    render(<Footer links={links} />);

    expect(screen.queryByRole("social")).not.toBeInTheDocument();
  });

  it("No debe renderizar el logo si se indica la opción withLogo como false", () => {
    render(<Footer socialIcons={icons} withLogo={false} />);

    expect(screen.queryByRole("logo")).not.toBeInTheDocument();
  });

  it("Solo debe renderizar el parrafo de copyright no se pasa ningún elemento", () => {
    render(<Footer socialIcons={icons} withLogo={false} />);

    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
    expect(screen.queryByRole("logo")).not.toBeInTheDocument();
    expect(screen.queryByRole("social")).not.toBeInTheDocument();
    expect(screen.getByRole("paragraph")).toBeInTheDocument();
  });
});
