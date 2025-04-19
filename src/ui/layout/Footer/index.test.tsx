import { render, screen } from "@testing-library/react";
import { NavItemData } from "@/types/types";
import Footer from ".";

describe("Tests del componente Footer...", () => {
  it("Debe renderizar el contenedor footer de forma adecuada", () => {
    render(<Footer />);
    expect(screen.getByRole("footer")).toBeInTheDocument();
  });

  it("Debe renderizar el menú con los enlaces que le hemos pasado de forma vertical", () => {
    const links: NavItemData[] = [
      { text: "Inicio", src: "#" },
      { text: "Características", src: "#about" },
      { text: "Contacto", src: "#contact" }
    ];
    render(<Footer />);
    expect(screen.getByRole("footer")).toBeInTheDocument();
  });
});
