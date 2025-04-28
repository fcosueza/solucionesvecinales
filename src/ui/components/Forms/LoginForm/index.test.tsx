import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from ".";

describe("Test para el componente LoginForm", () => {
  const handleMock = jest.fn();

  it("Debe renderizar el formulario de forma correcta.", () => {
    render(<LoginForm />);

    expect(screen.getByRole("form")).toBeInTheDocument();
  });
  it("Debe renderizar los controles del formulario", () => {
    render(<LoginForm />);

    expect(screen.getAllByRole("form-control")).toHaveLength(2);
  });

  it("Debe renderizar los controles para introducir el correo", () => {
    render(<LoginForm />);

    expect(screen.getByLabelText("Correo *")).toBeInTheDocument();
    expect(screen.getAllByRole("textbox")[0]).toHaveProperty("name", "email");
  });

  it("Debe renderizar los controles para introducir la contraseña", () => {
    render(<LoginForm />);

    expect(screen.getByLabelText("Contraseña *")).toBeInTheDocument();
    expect(screen.getAllByRole("textbox")[1]).toHaveProperty("name", "password");
  });

  it("Debe mostrar adecuadamente en los campos inputs lo que el usuario escribe", async () => {
    render(<LoginForm />);

    const password = "asssssssasasdsdasdasdasas";
    const email = "testname@email.com";

    const passInput = screen.getByLabelText("Contraseña *");
    const emailInput = screen.getByLabelText("Correo *");

    await userEvent.type(emailInput, email);
    await userEvent.type(passInput, password);

    expect(emailInput).toHaveValue(email);
    expect(passInput).toHaveValue(password);
  });

  it("Debe llamar a la función que se ha pasado si los datos son correctos", async () => {
    render(<LoginForm action={handleMock} />);

    const password = "asssssssasasdsdasdasdasas";
    const email = "testname@email.com";

    const passInput = screen.getByLabelText("Contraseña *");
    const emailInput = screen.getByLabelText("Correo *");

    await userEvent.type(emailInput, email);
    await userEvent.type(passInput, password);

    await userEvent.click(screen.getByRole("button"));

    await waitFor(() => expect(handleMock).toHaveBeenCalled());
  });

  it("No debe llamar a la función que se ha pasado si los datos son incorrectos", async () => {
    render(<LoginForm action={handleMock} />);

    const password = "asssssssasasdsdasdasdasas";
    const email = "testname";

    const passInput = screen.getByLabelText("Contraseña *");
    const emailInput = screen.getByLabelText("Correo *");

    await userEvent.type(emailInput, email);
    await userEvent.type(passInput, password);

    await userEvent.click(screen.getByRole("button"));

    await waitFor(() => expect(handleMock).toHaveBeenCalled());
  });
});
