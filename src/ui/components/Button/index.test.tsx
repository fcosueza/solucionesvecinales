import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from ".";

describe("Tests del componente Button...", () => {
  const handleMock = jest.fn();
  const text = "prueba";

  it("Debe renderizar un botón de forma adecuada", () => {
    render(<Button text={text} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("Debe renderizar un botón con el texto especificado", () => {
    render(<Button text={text} />);
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it("Debe renderizar un botón habilitado por defecto", () => {
    render(<Button text={text} />);
    expect(screen.getByRole("button")).toHaveProperty("disabled", false);
  });

  it("Debe renderizar un botón deshabilitado si se le indica", () => {
    render(<Button text={text} disabled={true} />);
    expect(screen.getByRole("button")).toHaveProperty("disabled", true);
  });

  it("Debe renderizar un botón del tipo button por defecto", () => {
    render(<Button text={text} />);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("Debe renderizar un botón del tipo que se especifique", () => {
    const type = "reset";

    render(<Button text={text} type={type} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("Debe llamar a la función pasada cuando se haga click en él", async () => {
    render(<Button text={text} onClick={handleMock} />);
    userEvent.click(screen.getByRole("button"));

    await waitFor(() => expect(handleMock).toHaveBeenCalled());
  });
});
