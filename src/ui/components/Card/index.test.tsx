import { render, screen } from "@testing-library/react";
import Card from ".";

describe("Tests del componente Card...", () => {
  it("Debe renderizar un elemento Card", () => {
    render(<Card />);

    expect(screen.getByRole("card")).toBeInTheDocument();
  });
});
