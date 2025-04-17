import { render, screen } from "@testing-library/react";
import { NavItemData } from "@/types/types";
import Header from ".";

describe("Tests del componente Header", () => {
  const handleMock = jest.fn();

  it("Debe renderizar la cabecera correctamente", () => {
    const links: NavItemData[] = [
      { text: "testLink-1", url: "/home" },
      { text: "testLink-2", url: "/contact" },
      { text: "testLink-3", url: "/about" }
    ];

    render(<Header menuLinks={links} buttonText="TestButton" buttonFunc={handleMock} />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("Debe renderizar el logo de la aplicación", () => {
    const links: NavItemData[] = [
      { text: "testLink-1", url: "/home" },
      { text: "testLink-2", url: "/contact" },
      { text: "testLink-3", url: "/about" }
    ];

    render(<Header menuLinks={links} buttonText="TestButton" buttonFunc={handleMock} />);
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("Debe renderizar el menu de la aplicación", () => {
    const links: NavItemData[] = [
      { text: "testLink-1", url: "/home" },
      { text: "testLink-2", url: "/contact" },
      { text: "testLink-3", url: "/about" }
    ];

    render(<Header menuLinks={links} buttonText="TestButton" buttonFunc={handleMock} />);
    expect(screen.getAllByRole("link")).toHaveLength(3);
  });

  it("Debe renderizar el botón para hacer login", () => {
    const links: NavItemData[] = [
      { text: "testLink-1", url: "/home" },
      { text: "testLink-2", url: "/contact" },
      { text: "testLink-3", url: "/about" }
    ];

    render(<Header menuLinks={links} buttonText="TestButton" buttonFunc={handleMock} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
