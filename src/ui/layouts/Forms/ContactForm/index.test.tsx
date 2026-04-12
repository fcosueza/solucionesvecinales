import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from ".";
import contactMsgAction from "@/actions/contactMsgAction";

jest.mock("@/actions/contactMsgAction", () => jest.fn());

function configurar(jsx: React.ReactNode) {
  return {
    user: userEvent.setup(),
    ...render(jsx)
  };
}

describe("ContactForm component test suite...", () => {
  it("Should render a form correctly", () => {
    render(<ContactForm />);

    expect(screen.getByRole("form")).toBeInTheDocument();
  });
  it("Should render form controls properly", () => {
    render(<ContactForm />);

    expect(screen.getByRole("textbox", { name: "name-input" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "email-input" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "msg-input" })).toBeInTheDocument();
  });

  it("Should show in input fields what the user is writing", async () => {
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

  it("Should show error msg and load error class if the name its not correct", async () => {
    const { user } = configurar(<ContactForm />);

    const datosFormulario = new FormData();
    const accionMock = contactMsgAction as jest.Mock;

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

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "name-input" })).toHaveClass("control__inputError");
    expect(screen.getByRole("textbox", { name: "name-input" })).toHaveValue("");
  });

  it("Should show error msg and load error class if the email its not correct", async () => {
    const { user } = configurar(<ContactForm />);

    const datosFormulario = new FormData();
    const accionMock = contactMsgAction as jest.Mock;

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

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "email-input" })).toHaveClass("control__inputError");
    expect(screen.getByRole("textbox", { name: "email-input" })).toHaveValue("");
  });

  it("Should show error msg and load error class if the msg its not correct", async () => {
    const { user } = configurar(<ContactForm />);

    const datosFormulario = new FormData();
    const accionMock = contactMsgAction as jest.Mock;

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

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "msg-input" })).toHaveClass("control__inputError");
    expect(screen.getByRole("textbox", { name: "msg-input" })).toHaveValue("");
  });
});
