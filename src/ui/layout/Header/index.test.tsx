import { render, screen } from "@testing-library/react";
import { NavItem } from "@/types/types";
import Header from ".";

describe("Tests del componente Header", () => {
  const handleMock = jest.fn();

  it("Debe renderizar la cabecera correctamente", () => {
    const links: NavItem[] = [
      { text: "testLink-1", src: "/home" },
      { text: "testLink-2", src: "/contact" },
      { text: "testLink-3", src: "/about" }
    ];

    render(<Header menuLinks={links} buttonText="TestButton" buttonFunc={handleMock} />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("Debe renderizar el logo de la aplicación", () => {
    const links: NavItem[] = [
      { text: "testLink-1", src: "/home" },
      { text: "testLink-2", src: "/contact" },
      { text: "testLink-3", src: "/about" }
    ];

    render(<Header menuLinks={links} buttonText="TestButton" buttonFunc={handleMock} />);
    expect(screen.getByRole("logo")).toBeInTheDocument();
  });

  it("Debe renderizar el menu de la aplicación", () => {
    const links: NavItem[] = [
      { text: "testLink-1", src: "/home" },
      { text: "testLink-2", src: "/contact" },
      { text: "testLink-3", src: "/about" }
    ];

    render(<Header menuLinks={links} buttonText="TestButton" buttonFunc={handleMock} />);
    expect(screen.getAllByRole("link")).toHaveLength(3);
  });

  it("No debe renderizar el menú de la aplicación si no se pasan", () => {
    const links: NavItem[] = [];

    render(<Header menuLinks={links} buttonText="TestButton" buttonFunc={handleMock} />);
    expect(screen.queryAllByRole("link")).toHaveLength(0);
  });

  it("Debe renderizar el botón para hacer login", () => {
    const links: NavItem[] = [
      { text: "testLink-1", src: "/home" },
      { text: "testLink-2", src: "/contact" },
      { text: "testLink-3", src: "/about" }
    ];

    render(<Header menuLinks={links} buttonText="TestButton" buttonFunc={handleMock} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
