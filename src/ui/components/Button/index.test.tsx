import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from ".";

describe("Pruebas del componente Button", () => {
  const manejadorMock = jest.fn();
  const texto = "prueba";

  it("Debe renderizar un botón correctamente", () => {
    render(<Button text={texto} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("Debe renderizar un botón con el texto indicado", () => {
    render(<Button text={texto} />);
    expect(screen.getByText(texto)).toBeInTheDocument();
  });

  it("Debe renderizar un botón habilitado por defecto", () => {
    render(<Button text={texto} />);
    expect(screen.getByRole("button")).toHaveProperty("disabled", false);
  });

  it("Debe renderizar un botón deshabilitado si se indica", () => {
    render(<Button text={texto} disabled={true} />);
    expect(screen.getByRole("button")).toHaveProperty("disabled", true);
  });

  it("Debe renderizar un botón con el tipo por defecto", () => {
    render(<Button text={texto} />);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("Debe renderizar un botón con el tipo indicado", () => {
    const tipo = "reset";

    render(<Button text={texto} type={tipo} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("Debe ejecutar la funcion indicada al hacer click", async () => {
    render(<Button text={texto} onClick={manejadorMock} />);
    userEvent.click(screen.getByRole("button"));

    await waitFor(() => expect(manejadorMock).toHaveBeenCalled());
  });
});
