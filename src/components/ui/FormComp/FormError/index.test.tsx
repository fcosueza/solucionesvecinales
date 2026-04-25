import { render, screen } from "@testing-library/react";
import FormError from ".";

describe("Suite de pruebas del componente FormError", () => {
  const mensajePrueba = "An error has ocurred.";

  it("Debe renderizar el mensaje de error correctamente", () => {
    render(<FormError message={mensajePrueba} />);

    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("Debe renderizar el mensaje recibido con un asterisco", () => {
    render(<FormError message={mensajePrueba} />);

    expect(screen.getByText("* " + mensajePrueba)).toBeInTheDocument();
  });

  it("Debe cargar la clase errorMsg", () => {
    render(<FormError message={mensajePrueba} />);

    expect(screen.getByRole("alert")).toHaveClass("errorMsg");
  });
});
