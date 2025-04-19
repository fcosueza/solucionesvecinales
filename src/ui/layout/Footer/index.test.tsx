import { render, screen } from "@testing-library/react";
import Footer from ".";

describe("Tests del componente Footer...", () => {
  it("Debe renderizar el contenedor footer de forma adecuada", () => {
    render(<Footer />);
    expect(screen.getByRole("footer")).toBeInTheDocument();
  });
});
