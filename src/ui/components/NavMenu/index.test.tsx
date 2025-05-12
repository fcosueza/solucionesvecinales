import { render, screen } from "@testing-library/react";
import NavMenu from ".";
import { NavItem } from "@/types";

describe("Tests del componente NavMenu...", () => {
  it("Debe renderizar el elemento de navegación", () => {
    const links: NavItem[] = [{ text: "testLink", href: "/home" }];

    render(<NavMenu links={links} />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
  it("Debe renderizar un enlace de forma apropiada.", () => {
    const links: NavItem[] = [{ text: "testLink", href: "/home" }];

    render(<NavMenu links={links} />);
    expect(screen.getByRole("link")).toBeInTheDocument();
  });

  it("Debe renderizar un enlace con el texto adecuado.", () => {
    const links: NavItem[] = [{ text: "testLink", href: "/home" }];

    render(<NavMenu links={links} />);
    expect(screen.getByText(links[0].text)).toBeInTheDocument();
  });

  it("Debe renderizar un enlace con el atributo href correctamente", () => {
    const links: NavItem[] = [{ text: "testLink", href: "/home" }];

    render(<NavMenu links={links} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", links[0].href);
  });

  it("Debe renderizar todos los enlaces que se le han pasado.", () => {
    const links: NavItem[] = [
      { text: "testLink-1", href: "/home" },
      { text: "testLink-2", href: "/contact" },
      { text: "testLink-3", href: "/about" }
    ];

    render(<NavMenu links={links} />);
    expect(screen.getAllByRole("link")).toHaveLength(3);
  });

  it("Debe crear el menú en horizontal si no se especifica nada", () => {
    const links: NavItem[] = [
      { text: "testLink-1", href: "/home" },
      { text: "testLink-2", href: "/contact" },
      { text: "testLink-3", href: "/about" }
    ];

    render(<NavMenu links={links} />);
    expect(screen.getAllByRole("listitem")[0]).toHaveClass("horizontal");
  });

  it("Debe crear el menú en vertical si se especifica en vertical", () => {
    const links: NavItem[] = [
      { text: "testLink-1", href: "/home" },
      { text: "testLink-2", href: "/contact" },
      { text: "testLink-3", href: "/about" }
    ];

    render(<NavMenu links={links} orientation="vertical" />);
    expect(screen.getAllByRole("listitem")[0]).toHaveClass("vertical");
  });
});
