import { render, screen } from "@testing-library/react";
import NavMenu from ".";
import { NavItem } from "@/types";

describe("Pruebas del componente NavMenu", () => {
  it("Debe renderizar el elemento de navegación", () => {
    const enlaces: NavItem[] = [{ text: "testLink", href: "/home" }];

    render(<NavMenu links={enlaces} />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
  it("Debe renderizar un enlace de forma apropiada", () => {
    const enlaces: NavItem[] = [{ text: "testLink", href: "/home" }];

    render(<NavMenu links={enlaces} />);
    expect(screen.getByRole("link")).toBeInTheDocument();
  });

  it("Debe renderizar un enlace con el texto adecuado", () => {
    const enlaces: NavItem[] = [{ text: "testLink", href: "/home" }];

    render(<NavMenu links={enlaces} />);
    expect(screen.getByText(enlaces[0].text)).toBeInTheDocument();
  });

  it("Debe renderizar un enlace con el atributo href correctamente", () => {
    const enlaces: NavItem[] = [{ text: "testLink", href: "/home" }];

    render(<NavMenu links={enlaces} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", enlaces[0].href);
  });

  it("Debe renderizar todos los enlaces recibidos", () => {
    const enlaces: NavItem[] = [
      { text: "testLink-1", href: "/home" },
      { text: "testLink-2", href: "/contact" },
      { text: "testLink-3", href: "/about" }
    ];

    render(<NavMenu links={enlaces} />);
    expect(screen.getAllByRole("link")).toHaveLength(3);
  });

  it("Debe crear el menú en horizontal si no se especifica nada", () => {
    const enlaces: NavItem[] = [
      { text: "testLink-1", href: "/home" },
      { text: "testLink-2", href: "/contact" },
      { text: "testLink-3", href: "/about" }
    ];

    render(<NavMenu links={enlaces} />);
    expect(screen.getAllByRole("listitem")[0]).toHaveClass("horizontal");
  });

  it("Debe crear el menú en vertical si se especifica esta opción", () => {
    const enlaces: NavItem[] = [
      { text: "testLink-1", href: "/home" },
      { text: "testLink-2", href: "/contact" },
      { text: "testLink-3", href: "/about" }
    ];

    render(<NavMenu links={enlaces} orientation="vertical" />);
    expect(screen.getAllByRole("listitem")[0]).toHaveClass("vertical");
  });
});
