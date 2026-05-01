import { waitFor, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignUpForm from ".";
import { useRouter } from "next/navigation";
import signUp from "@/actions/auth/signUp";
import { toast } from "sonner";

jest.mock("@/actions/auth/signUp", () => jest.fn());
jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn()
}));

function configurar(jsx: React.ReactNode) {
  return {
    user: userEvent.setup(),
    ...render(jsx)
  };
}

describe("Suite de pruebas del componente SignUpForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
  });

  it("Debe renderizar el formulario", () => {
    render(<SignUpForm />);

    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  it("Debe renderizar todos los campos del formulario", () => {
    render(<SignUpForm />);

    expect(screen.getByRole("textbox", { name: "name-input" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "surname-input" })).toBeInTheDocument();
    expect(screen.getByRole("group")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "email-input" })).toBeInTheDocument();
    expect(screen.getByLabelText("password-input")).toBeInTheDocument();
    expect(screen.getByLabelText("repeat-input")).toBeInTheDocument();
  });

  it("Debe renderizar todos los valores predeterminados en los campos", () => {
    render(<SignUpForm />);

    expect(screen.getByRole("textbox", { name: "name-input" })).toHaveValue("");
    expect(screen.getByRole("textbox", { name: "surname-input" })).toHaveValue("");
    expect(screen.getByRole("textbox", { name: "email-input" })).toHaveValue("");
    expect(screen.getByLabelText("password-input")).toHaveValue("");
    expect(screen.getByLabelText("repeat-input")).toHaveValue("");
  });

  it("Debe renderizar 2 roles en el control de selección de rol", () => {
    render(<SignUpForm />);

    const grupoRadio = screen.getByRole("group");

    expect(within(grupoRadio).getByRole("radio", { name: "tenant-radio" })).toBeInTheDocument();
    expect(within(grupoRadio).getByRole("radio", { name: "admin-radio" })).toBeInTheDocument();
  });

  it("Debe marcar por defecto la opción de inquilino en el control de selección de rol", () => {
    render(<SignUpForm />);

    const grupoRadio = screen.getByRole("group");

    expect(within(grupoRadio).getByRole("radio", { name: "tenant-radio" })).toBeChecked();
  });

  it("Debe mostrar mensajes de error si los campos no son correctos", async () => {
    const { user } = configurar(<SignUpForm />);

    const accionMock = signUp as jest.Mock;
    const datosFormulario = new FormData();

    const nombre = "a";
    const apellidos = "a";
    const correo = "email@email.c";
    const contrasena = "blablalbal";
    const repetirContrasena = "blabuieon";

    datosFormulario.append("name", nombre);
    datosFormulario.append("surname", apellidos);
    datosFormulario.append("email", correo);
    datosFormulario.append("password", contrasena);
    datosFormulario.append("repeat", repetirContrasena);

    accionMock.mockResolvedValue({
      state: "error",
      message: "Incorrect form data",
      errors: { name: "error", surname: "error", email: "error", password: "error", repeat: "error" },
      payload: datosFormulario
    });

    await user.type(screen.getByRole("textbox", { name: "name-input" }), nombre);
    await user.type(screen.getByRole("textbox", { name: "surname-input" }), apellidos);
    await user.type(screen.getByRole("textbox", { name: "email-input" }), correo);
    await user.type(screen.getByLabelText("password-input"), contrasena);
    await user.type(screen.getByLabelText("repeat-input"), repetirContrasena);
    await user.click(screen.getByRole("button"));

    expect(await screen.findAllByRole("alert")).toHaveLength(5);
    await waitFor(() => {
      expect(screen.getByRole("textbox", { name: "name-input" })).toHaveValue("");
      expect(screen.getByRole("textbox", { name: "surname-input" })).toHaveValue("");
      expect(screen.getByRole("textbox", { name: "email-input" })).toHaveValue("");
      expect(screen.getByLabelText("password-input")).toHaveValue("");
      expect(screen.getByLabelText("repeat-input")).toHaveValue("");
    });
  });

  it("Debe mantener valores en todos los campos excepto en repetirContraseña, mostrando error si las contraseñas no coinciden", async () => {
    const { user } = configurar(<SignUpForm />);

    const accionMock = signUp as jest.Mock;
    const datosFormulario = new FormData();

    const nombre = "aaaaaaaaaaaaaaaaa";
    const apellidos = "aaaaa";
    const correo = "email@email.com";
    const contrasena = "blablablablablablablabla";
    const repetirContrasena = "blablablablablablablable";

    datosFormulario.append("name", nombre);
    datosFormulario.append("surname", apellidos);
    datosFormulario.append("email", correo);
    datosFormulario.append("password", contrasena);
    datosFormulario.append("repeat", repetirContrasena);

    accionMock.mockResolvedValue({
      state: "error",
      message: "Incorrect form data",
      errors: { repeat: "error" },
      payload: datosFormulario
    });

    await user.type(screen.getByRole("textbox", { name: "name-input" }), nombre);
    await user.type(screen.getByRole("textbox", { name: "surname-input" }), apellidos);
    await user.type(screen.getByRole("textbox", { name: "email-input" }), correo);
    await user.type(screen.getByLabelText("password-input"), contrasena);
    await user.type(screen.getByLabelText("repeat-input"), repetirContrasena);
    await user.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByRole("textbox", { name: "name-input" })).toHaveValue(nombre);
      expect(screen.getByRole("textbox", { name: "surname-input" })).toHaveValue(apellidos);
      expect(screen.getByRole("textbox", { name: "email-input" })).toHaveValue(correo);
      expect(screen.getByLabelText("password-input")).toHaveValue("");
      expect(screen.getByLabelText("repeat-input")).toHaveValue("");
    });
  });

  it("Debe mantener los datos de todos los campos si todos son correctos excepto nombre que es incorrecto", async () => {
    const { user } = configurar(<SignUpForm />);

    const accionMock = signUp as jest.Mock;
    const datosFormulario = new FormData();

    const nombre = "a";
    const apellidos = "aaaaaaaaaaaa";
    const correo = "email@email.com";
    const contrasena = "blablablablablablablabla";
    const repetirContrasena = "blablablablablablablabla";

    datosFormulario.append("name", nombre);
    datosFormulario.append("surname", apellidos);
    datosFormulario.append("email", correo);
    datosFormulario.append("password", contrasena);
    datosFormulario.append("repeat", repetirContrasena);

    accionMock.mockResolvedValue({
      state: "error",
      message: "Incorrect form data",
      errors: { name: "error" },
      payload: datosFormulario
    });

    await user.type(screen.getByRole("textbox", { name: "name-input" }), nombre);
    await user.type(screen.getByRole("textbox", { name: "surname-input" }), apellidos);
    await user.type(screen.getByRole("textbox", { name: "email-input" }), correo);
    await user.type(screen.getByLabelText("password-input"), contrasena);
    await user.type(screen.getByLabelText("repeat-input"), repetirContrasena);
    await user.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByRole("textbox", { name: "name-input" })).toHaveValue("");
      expect(screen.getByRole("textbox", { name: "surname-input" })).toHaveValue(apellidos);
      expect(screen.getByRole("textbox", { name: "email-input" })).toHaveValue(correo);
      expect(screen.getByLabelText("password-input")).toHaveValue("");
      expect(screen.getByLabelText("repeat-input")).toHaveValue("");
    });
  });

  it("Debe redirigir a la página de inicio de sesión si el usuario se creó correctamente", async () => {
    const pushMock = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

    const { user } = configurar(<SignUpForm />);

    const accionMock = signUp as jest.Mock;
    const datosFormulario = new FormData();

    const nombre = "aaaaaaaaaaaa";
    const apellidos = "aaaaaaaaaaaa";
    const correo = "email@email.com";
    const contrasena = "blablablablablablablabla";
    const repetirContrasena = "blablablablablablablabla";

    datosFormulario.append("name", nombre);
    datosFormulario.append("surname", apellidos);
    datosFormulario.append("email", correo);
    datosFormulario.append("password", contrasena);
    datosFormulario.append("role", "inquilino");
    datosFormulario.append("repeat", repetirContrasena);

    accionMock.mockResolvedValue({
      state: "success",
      message: "User created correctly",
      payload: datosFormulario
    });

    await user.type(screen.getByRole("textbox", { name: "name-input" }), nombre);
    await user.type(screen.getByRole("textbox", { name: "surname-input" }), apellidos);
    await user.type(screen.getByRole("textbox", { name: "email-input" }), correo);
    await user.type(screen.getByLabelText("password-input"), contrasena);
    await user.type(screen.getByLabelText("repeat-input"), repetirContrasena);
    await user.click(screen.getByRole("button"));

    await waitFor(() => expect(pushMock).toHaveBeenCalledWith("/login"));
  });

  it("Debe llamar a toast.error con el mensaje cuando la acción devuelve un error", async () => {
    const { user } = configurar(<SignUpForm />);

    const accionMock = signUp as jest.Mock;
    const mensaje = "Error al crear el usuario";

    accionMock.mockResolvedValue({
      state: "error",
      message: mensaje
    });

    await user.type(screen.getByRole("textbox", { name: "name-input" }), "NombreValido");
    await user.type(screen.getByRole("textbox", { name: "surname-input" }), "ApellidoValido");
    await user.type(screen.getByRole("textbox", { name: "email-input" }), "test@email.com");
    await user.type(screen.getByLabelText("password-input"), "password123456");
    await user.type(screen.getByLabelText("repeat-input"), "password123456");
    await user.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(mensaje);
    });
  });

  it("Debe llamar a toast.success con el mensaje cuando el usuario se crea correctamente", async () => {
    const { user } = configurar(<SignUpForm />);

    const accionMock = signUp as jest.Mock;
    const mensaje = "Usuario creado correctamente";

    accionMock.mockResolvedValue({
      state: "success",
      message: mensaje
    });

    await user.type(screen.getByRole("textbox", { name: "name-input" }), "NombreValido");
    await user.type(screen.getByRole("textbox", { name: "surname-input" }), "ApellidoValido");
    await user.type(screen.getByRole("textbox", { name: "email-input" }), "test@email.com");
    await user.type(screen.getByLabelText("password-input"), "password123456");
    await user.type(screen.getByLabelText("repeat-input"), "password123456");
    await user.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(mensaje);
    });
  });
});
