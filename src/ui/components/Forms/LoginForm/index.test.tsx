import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from ".";

describe("Test para el componente LoginForm", () => {
  it("Debe renderizar el formulario de forma correcta.", () => {
    render(<LoginForm />);

    expect(screen.getByRole("form")).toBeInTheDocument();
  });
  it("Debe renderizar los controles del formulario", () => {
    render(<LoginForm />);

    expect(screen.getAllByLabelText("form-control")).toHaveLength(2);
  });

  it("Debe renderizar los controles para introducir el correo", () => {
    render(<LoginForm />);

    expect(screen.getByLabelText("Correo")).toBeInTheDocument();
  });

  it("Debe renderizar los controles para introducir la contraseña", () => {
    render(<LoginForm />);

    expect(screen.getByLabelText("Contraseña")).toBeInTheDocument();
  });

  it("Debe mostrar adecuadamente en los campos inputs lo que el usuario escribe", async () => {
    render(<LoginForm />);

    const password = "asssssssasasdsdasdasdasas";
    const email = "testname@email.com";

    const passInput = screen.getByLabelText("Contraseña");
    const emailInput = screen.getByLabelText("Correo");

    await userEvent.type(emailInput, email);
    await userEvent.type(passInput, password);

    expect(emailInput).toHaveValue(email);
    expect(passInput).toHaveValue(password);
  });
});
