import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LogInForm from ".";
import logInAction from "@/actions/auth/logInAction";

// Mock logInAction server action
jest.mock("@/actions/auth/logInAction", () => jest.fn());

function configurar(jsx: React.ReactNode) {
  return {
    user: userEvent.setup(),
    ...render(jsx)
  };
}

describe("LogInForm component test suite...", () => {
  it("Should render the form correctly", () => {
    render(<LogInForm />);

    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  it("Should render the controls to insert email and password", () => {
    render(<LogInForm />);

    expect(screen.getByRole("textbox", { name: "email-input" })).toBeInTheDocument();
    expect(screen.getByLabelText("password-input")).toBeInTheDocument();
  });

  it("Should show in every field what the user is writing", async () => {
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

  it("Should show error message if email is not correct", async () => {
    const { user } = configurar(<LogInForm />);

    const accionMock = logInAction as jest.Mock;
    const datosFormulario = new FormData();

    const correo = "testname@email.c";
    const contrasena = "asssssssasasdsdasdasdasas";

    const inputCorreo = screen.getByRole("textbox", { name: "email-input" });
    const inputContrasena = screen.getByLabelText("password-input");

    datosFormulario.append("email", correo);
    datosFormulario.append("password", contrasena);

    accionMock.mockResolvedValue({
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
    expect(inputCorreo).toHaveValue("");
    expect(inputContrasena).toHaveValue("");
  });

  it("Should show error message if password is not correct", async () => {
    const { user } = configurar(<LogInForm />);

    const accionMock = logInAction as jest.Mock;
    const datosFormulario = new FormData();
    const correo = "testname@email.com";
    const contrasena = "as";

    const inputCorreo = screen.getByRole("textbox", { name: "email-input" });
    const inputContrasena = screen.getByLabelText("password-input");

    datosFormulario.append("email", correo);
    datosFormulario.append("password", contrasena);

    accionMock.mockResolvedValue({
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
    expect(inputContrasena).toHaveValue("");
    expect(inputCorreo).toHaveValue(correo);
  });
});
