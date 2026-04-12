import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LogInForm from ".";
import logInAction from "@/actions/auth/logInAction";

// Simula la Server Action logInAction
jest.mock("@/actions/auth/logInAction", () => jest.fn());

function configurar(jsx: React.ReactNode) {
  return {
    user: userEvent.setup(),
    ...render(jsx)
  };
}

describe("Suite de pruebas del componente LogInForm", () => {
  it("Debe renderizar el formulario correctamente", () => {
    render(<LogInForm />);

    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  it("Debe renderizar los campos para insertar el correo y la contraseña", () => {
    render(<LogInForm />);

    expect(screen.getByRole("textbox", { name: "email-input" })).toBeInTheDocument();
    expect(screen.getByLabelText("password-input")).toBeInTheDocument();
  });

  it("Debe mostrar en cada campo lo que está escribiendo el usuario", async () => {
    const { user } = configurar(<LogInForm />);

    const correo = "testname@email.com";
    const contrasena = "asssssssasasdsdasdasdasas";

    const inputCorreo = screen.getByRole("textbox", { name: "email-input" });
    const inputContrasena = screen.getByLabelText("password-input");

    await user.type(inputCorreo, correo);
    await user.type(inputContrasena, contrasena);

    expect(inputCorreo).toHaveValue(correo);
    expect(inputContrasena).toHaveValue(contrasena);
  });

  it("Debe mostrar el mensaje de error si el correo es incorrecto", async () => {
    const { user } = configurar(<LogInForm />);

    const actionMock = logInAction as jest.Mock;
    const datosFormulario = new FormData();

    const correo = "testname@email.c";
    const contrasena = "asssssssasasdsdasdasdasas";

    const inputCorreo = screen.getByRole("textbox", { name: "email-input" });
    const inputContrasena = screen.getByLabelText("password-input");

    datosFormulario.append("email", correo);
    datosFormulario.append("password", contrasena);

    actionMock.mockResolvedValue({
      state: "error",
      message: "Incorrect form data",
      errors: {
        email: "email incorrecto"
      },
      payload: datosFormulario
    });

    await user.type(inputCorreo, correo);
    await user.type(inputContrasena, contrasena);
    await user.click(screen.getByRole("button"));

    expect(await screen.findByRole("alert")).toBeInTheDocument();
    await waitFor(() => {
      expect(inputCorreo).toHaveValue("");
      expect(inputContrasena).toHaveValue("");
    });
  });

  it("Debe mostrar mensaje de error si la contraseña es incorrecta", async () => {
    const { user } = configurar(<LogInForm />);

    const actionMock = logInAction as jest.Mock;
    const datosFormulario = new FormData();
    const correo = "testname@email.com";
    const contrasena = "as";

    const inputCorreo = screen.getByRole("textbox", { name: "email-input" });
    const inputContrasena = screen.getByLabelText("password-input");

    datosFormulario.append("email", correo);
    datosFormulario.append("password", contrasena);

    actionMock.mockResolvedValue({
      state: "error",
      message: "Incorrect form data",
      errors: {
        password: "password incorrecto"
      },
      payload: datosFormulario
    });

    await user.type(inputCorreo, correo);
    await user.type(inputContrasena, contrasena);
    await user.click(screen.getByRole("button"));

    expect(await screen.findByRole("alert")).toBeInTheDocument();
    await waitFor(() => {
      expect(inputContrasena).toHaveValue("");
      expect(inputCorreo).toHaveValue(correo);
    });
  });
});
