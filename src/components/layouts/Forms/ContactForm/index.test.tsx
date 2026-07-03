import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from ".";
import { contactMsg } from "@/actions/contactMsg";
import { toast } from "sonner";

jest.mock("@/actions/contactMsg", () => ({
  contactMsg: jest.fn()
}));
jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}));

function configurar(jsx: React.ReactNode) {
  return {
    user: userEvent.setup(),
    ...render(jsx)
  };
}

describe("ContactForm component test suite", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the form correctly", () => {
    render(<ContactForm />);

    expect(screen.getByRole("form")).toBeInTheDocument();
  });
  it("should render the form fields correctly", () => {
    render(<ContactForm />);

    expect(screen.getByRole("textbox", { name: "name-input" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "email-input" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "msg-input" })).toBeInTheDocument();
  });

  it("should display the user's input in the form fields", async () => {
    const { user } = configurar(<ContactForm />);

    const nombre = "testname";
    const correo = "testname@email.com";
    const mensaje = "Lorem ipsum dolor sit amet consecterum asasa asdad asdad";

    await user.type(screen.getByRole("textbox", { name: "name-input" }), nombre);
    await user.type(screen.getByRole("textbox", { name: "email-input" }), correo);
    await user.type(screen.getByRole("textbox", { name: "msg-input" }), mensaje);

    expect(screen.getByRole("textbox", { name: "name-input" })).toHaveValue(nombre);
    expect(screen.getByRole("textbox", { name: "email-input" })).toHaveValue(correo);
    expect(screen.getByRole("textbox", { name: "msg-input" })).toHaveValue(mensaje);
  });

  it("should display an error message and apply the class if the name is incorrect", async () => {
    const { user } = configurar(<ContactForm />);

    const datosFormulario = new FormData();
    const accionMock = contactMsg as jest.Mock;

    const nombre = "t";
    const correo = "testname@email.com";
    const mensaje = "Lorem ipsum dolor sit amet consecterum asasa asdad asdad";

    datosFormulario.append("name", nombre);
    datosFormulario.append("email", correo);
    datosFormulario.append("msg", mensaje);

    accionMock.mockResolvedValue({
      state: "error",
      message: "Incorrect form data",
      errors: { name: "Nombre incorrecto" },
      payload: datosFormulario
    });

    await user.type(screen.getByRole("textbox", { name: "name-input" }), nombre);
    await user.type(screen.getByRole("textbox", { name: "email-input" }), correo);
    await user.type(screen.getByRole("textbox", { name: "msg-input" }), mensaje);
    await user.click(screen.getByRole("button"));

    expect(await screen.findByRole("alert")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByRole("textbox", { name: "name-input" })).toHaveClass("control__inputError");
      expect(screen.getByRole("textbox", { name: "name-input" })).toHaveValue("");
    });
  });

  it("should display an error message and apply the class if the email is incorrect", async () => {
    const { user } = configurar(<ContactForm />);

    const datosFormulario = new FormData();
    const accionMock = contactMsg as jest.Mock;

    const nombre = "test";
    const correo = "testname@email.c";
    const mensaje = "Lorem ipsum dolor sit amet consecterum asasa asdad asdad";

    datosFormulario.append("name", nombre);
    datosFormulario.append("email", correo);
    datosFormulario.append("msg", mensaje);

    accionMock.mockResolvedValue({
      state: "error",
      message: "Incorrect form data",
      errors: { email: "El correo es incorrecto" },
      payload: datosFormulario
    });

    await user.type(screen.getByRole("textbox", { name: "name-input" }), nombre);
    await user.type(screen.getByRole("textbox", { name: "email-input" }), correo);
    await user.type(screen.getByRole("textbox", { name: "msg-input" }), mensaje);

    await user.click(screen.getByRole("button"));

    expect(await screen.findByRole("alert")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByRole("textbox", { name: "email-input" })).toHaveClass("control__inputError");
      expect(screen.getByRole("textbox", { name: "email-input" })).toHaveValue("");
    });
  });

  it("should display an error message and apply the class if the message is incorrect", async () => {
    const { user } = configurar(<ContactForm />);

    const datosFormulario = new FormData();
    const accionMock = contactMsg as jest.Mock;

    const nombre = "test";
    const correo = "testname@email.com";
    const mensaje = "Lorem ipsum";

    datosFormulario.append("name", nombre);
    datosFormulario.append("email", correo);
    datosFormulario.append("msg", mensaje);

    accionMock.mockResolvedValue({
      state: "error",
      message: "Incorrect form data",
      errors: { msg: "El mensaje es incorrecto" },
      payload: datosFormulario
    });

    await user.type(screen.getByRole("textbox", { name: "name-input" }), nombre);
    await user.type(screen.getByRole("textbox", { name: "email-input" }), correo);
    await user.type(screen.getByRole("textbox", { name: "msg-input" }), mensaje);
    await user.click(screen.getByRole("button"));

    expect(await screen.findByRole("alert")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByRole("textbox", { name: "msg-input" })).toHaveClass("control__inputError");
      expect(screen.getByRole("textbox", { name: "msg-input" })).toHaveValue("");
    });
  });

  it("should call toast.error with the message when the action returns an error", async () => {
    const { user } = configurar(<ContactForm />);

    const accionMock = contactMsg as jest.Mock;
    const mensaje = "Ha ocurrido un error al enviar el mensaje";

    accionMock.mockResolvedValue({
      state: "error",
      message: mensaje
    });

    await user.type(screen.getByRole("textbox", { name: "email-input" }), "test@email.com");
    await user.type(screen.getByRole("textbox", { name: "msg-input" }), "Lorem ipsum dolor sit amet consecterum");
    await user.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(mensaje);
    });
  });

  it("should call toast.success with the message when the action completes successfully", async () => {
    const { user } = configurar(<ContactForm />);

    const accionMock = contactMsg as jest.Mock;
    const mensaje = "Mensaje enviado correctamente";

    accionMock.mockResolvedValue({
      state: "success",
      message: mensaje
    });

    await user.type(screen.getByRole("textbox", { name: "email-input" }), "test@email.com");
    await user.type(screen.getByRole("textbox", { name: "msg-input" }), "Lorem ipsum dolor sit amet consecterum");
    await user.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(mensaje);
    });
  });
});
