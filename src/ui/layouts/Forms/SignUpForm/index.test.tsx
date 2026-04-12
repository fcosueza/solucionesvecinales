import { waitFor, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignUpForm from ".";
import signUpAction from "@/actions/auth/signUpAction";
import { redirect } from "next/navigation";

jest.mock("@/actions/auth/signUpAction", () => jest.fn());
jest.mock("next/navigation");

function configurar(jsx: React.ReactNode) {
  return {
    user: userEvent.setup(),
    ...render(jsx)
  };
}

describe("SignUpForm Componente test...", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Must render the form", () => {
    render(<SignUpForm />);

    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  it("Should render all the form input controls", () => {
    render(<SignUpForm />);

    expect(screen.getByRole("textbox", { name: "name-input" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "surname-input" })).toBeInTheDocument();
    expect(screen.getByRole("group")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "email-input" })).toBeInTheDocument();
    expect(screen.getByLabelText("password-input")).toBeInTheDocument();
    expect(screen.getByLabelText("repeat-input")).toBeInTheDocument();
  });

  it("Should render all default values in input fields", () => {
    render(<SignUpForm />);

    expect(screen.getByRole("textbox", { name: "name-input" })).toHaveValue("");
    expect(screen.getByRole("textbox", { name: "surname-input" })).toHaveValue("");
    expect(screen.getByRole("textbox", { name: "email-input" })).toHaveValue("");
    expect(screen.getByLabelText("password-input")).toHaveValue("");
    expect(screen.getByLabelText("repeat-input")).toHaveValue("");
  });

  it("Should render 2 roles in the role selection control", () => {
    render(<SignUpForm />);

    const grupoRadio = screen.getByRole("group");

    expect(within(grupoRadio).getByRole("radio", { name: "tenant-radio" })).toBeInTheDocument();
    expect(within(grupoRadio).getByRole("radio", { name: "admin-radio" })).toBeInTheDocument();
  });

  it("Should check by default tenant option in role selection control", () => {
    render(<SignUpForm />);

    const grupoRadio = screen.getByRole("group");

    expect(within(grupoRadio).getByRole("radio", { name: "tenant-radio" })).toBeChecked();
  });

  it("Should show error messages if the fields are not corrects", async () => {
    const { user } = configurar(<SignUpForm />);

    const accionMock = signUpAction as jest.Mock;
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
      messsage: "Incorrect form data",
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
    expect(screen.getByRole("textbox", { name: "name-input" })).toHaveValue("");
    expect(screen.getByRole("textbox", { name: "surname-input" })).toHaveValue("");
    expect(screen.getByRole("textbox", { name: "email-input" })).toHaveValue("");
    expect(screen.getByLabelText("password-input")).toHaveValue("");
    expect(screen.getByLabelText("repeat-input")).toHaveValue("");
  });

  it("Should keep values in every field except in passRepeat, showing and error if the passwords doesn't match", async () => {
    const { user } = configurar(<SignUpForm />);

    const accionMock = signUpAction as jest.Mock;
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
      messsage: "Incorrect form data",
      errors: { repeat: "error" },
      payload: datosFormulario
    });

    await user.type(screen.getByRole("textbox", { name: "name-input" }), nombre);
    await user.type(screen.getByRole("textbox", { name: "surname-input" }), apellidos);
    await user.type(screen.getByRole("textbox", { name: "email-input" }), correo);
    await user.type(screen.getByLabelText("password-input"), contrasena);
    await user.type(screen.getByLabelText("repeat-input"), repetirContrasena);
    await user.click(screen.getByRole("button"));

    expect(screen.getByRole("textbox", { name: "name-input" })).toHaveValue(nombre);
    expect(screen.getByRole("textbox", { name: "surname-input" })).toHaveValue(apellidos);
    expect(screen.getByRole("textbox", { name: "email-input" })).toHaveValue(correo);
    expect(screen.getByLabelText("password-input")).toHaveValue("");
    expect(screen.getByLabelText("repeat-input")).toHaveValue("");
  });

  it("Should keep every field data if all data is correct except name which is wrong", async () => {
    const { user } = configurar(<SignUpForm />);

    const accionMock = signUpAction as jest.Mock;
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
      messsage: "Incorrect form data",
      errors: { name: "error" },
      payload: datosFormulario
    });

    await user.type(screen.getByRole("textbox", { name: "name-input" }), nombre);
    await user.type(screen.getByRole("textbox", { name: "surname-input" }), apellidos);
    await user.type(screen.getByRole("textbox", { name: "email-input" }), correo);
    await user.type(screen.getByLabelText("password-input"), contrasena);
    await user.type(screen.getByLabelText("repeat-input"), repetirContrasena);
    await user.click(screen.getByRole("button"));

    expect(screen.getByRole("textbox", { name: "name-input" })).toHaveValue("");
    expect(screen.getByRole("textbox", { name: "surname-input" })).toHaveValue(apellidos);
    expect(screen.getByRole("textbox", { name: "email-input" })).toHaveValue(correo);
    expect(screen.getByLabelText("password-input")).toHaveValue("");
    expect(screen.getByLabelText("repeat-input")).toHaveValue("");
  });

  it("Should redirect to login page if user created correctly", async () => {
    const { user } = configurar(<SignUpForm />);

    const accionMock = signUpAction as jest.Mock;
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
      messsage: "User created correctly",
      payload: datosFormulario
    });

    await user.type(screen.getByRole("textbox", { name: "name-input" }), nombre);
    await user.type(screen.getByRole("textbox", { name: "surname-input" }), apellidos);
    await user.type(screen.getByRole("textbox", { name: "email-input" }), correo);
    await user.type(screen.getByLabelText("password-input"), contrasena);
    await user.type(screen.getByLabelText("repeat-input"), repetirContrasena);
    await user.click(screen.getByRole("button"));

    await waitFor(() => expect(redirect).toHaveBeenCalledWith("/login"));
  });
});
