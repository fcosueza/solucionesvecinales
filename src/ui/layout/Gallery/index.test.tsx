import { render, screen } from "@testing-library/react";
import Gallery from ".";

it("Debe renderizar el contenedor footer de forma adecuada", () => {
  render(<Gallery />);

  expect(screen.getByRole("footer")).toBeInTheDocument();
});
