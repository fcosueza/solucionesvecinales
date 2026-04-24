import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from ".";
import contactMsg from "@/actions/contactMsg";
import { toast } from "sonner";

jest.mock("@/actions/contactMsg", () => jest.fn());
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

describe("Suite de pruebas del componente ContactForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Debe renderizar un formulario correctamente", () => {
    render(<ContactForm />);

    expect(screen.getByRole("form")).toBeInTheDocument();
  });
  it("Debe renderizar los campos del formulario correctamente", () => {
    render(<ContactForm />);

    expect(screen.getByRole("textbox", { name: "name-input" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "email-input" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "msg-input" })).toBeInTheDocument();
  });

  it("Debe mostrar en los campos lo que está escribiendo el usuario", async () => {
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

  it("Debe mostrar el mensaje de error y aplicar la clase si el nombre es incorrecto", async () => {
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

  it("Debe mostrar el mensaje de error y aplicar la clase si el correo es incorrecto", async () => {
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

  it("Debe mostrar el mensaje de error y aplicar la clase si el mensaje es incorrecto", async () => {
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

  it("Debe llamar a toast.error con el mensaje cuando la acción devuelve un error", async () => {
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

  it("Debe llamar a toast.success con el mensaje cuando la acción se completa correctamente", async () => {
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
