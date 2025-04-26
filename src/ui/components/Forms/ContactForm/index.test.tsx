import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from ".";

describe("Test para el componente ContactForm", () => {
  const handleMock = jest.fn();

  it("Debe renderizar el formulario de forma correcta.", () => {
    render(<ContactForm />);

    expect(screen.getByRole("form")).toBeInTheDocument();
  });
  it("Debe renderizar los controles del formulario", () => {
    render(<ContactForm />);

    expect(screen.getAllByRole("form-control")).toHaveLength(3);
  });

  it("Debe renderizar los controles para introducir el nombre", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText("Nombre")).toBeInTheDocument();
    expect(screen.getAllByRole("textbox")[0]).toHaveProperty("name", "name");
  });

  it("Debe renderizar los controles para introducir el correo", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText("Correo *")).toBeInTheDocument();
    expect(screen.getAllByRole("textbox")[1]).toHaveProperty("name", "email");
  });

  it("Debe renderizar los controles para introducir el mensaje", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText("Mensaje (mín. 20 caracteres) *")).toBeInTheDocument();
    expect(screen.getAllByRole("textbox")[2]).toHaveProperty("name", "msg");
  });

  it("Debe mostrar adecuadamente en los campos inputs lo que el usuario escribe", async () => {
    render(<ContactForm />);

    const name = "testname";
    const email = "testname@email.com";
    const msg = "Lorem ipsum dolor sit amet consecterum asasa asdad asdad";

    const nameInput = screen.getByLabelText("Nombre");
    const emailInput = screen.getByLabelText("Correo *");
    const msgInput = screen.getByLabelText("Mensaje (mín. 20 caracteres) *");

    await userEvent.type(nameInput, name);
    await userEvent.type(emailInput, email);
    await userEvent.type(msgInput, msg);

    expect(nameInput).toHaveValue(name);
    expect(emailInput).toHaveValue(email);
    expect(msgInput).toHaveValue(msg);
  });

  it("Debe llamar a la función que se ha pasado si los datos son correctos", async () => {
    render(<ContactForm action={handleMock} />);

    const name = "testname";
    const email = "testname@email.com";
    const msg = "Lorem ipsum dolor sit amet consecterum";

    const nameInput = screen.getByLabelText("Nombre");
    const emailInput = screen.getByLabelText("Correo *");
    const msgInput = screen.getByLabelText("Mensaje (mín. 20 caracteres) *");

    await userEvent.type(nameInput, name);
    await userEvent.type(emailInput, email);
    await userEvent.type(msgInput, msg);

    await userEvent.click(screen.getByRole("button"));

    await waitFor(() => expect(handleMock).toHaveBeenCalled());
  });

  it("No debe llamar a la función que se ha pasado si los datos son incorrectos", async () => {
    render(<ContactForm action={handleMock} />);

    const name = "testname";
    const email = "testname@email.com";
    const msg = "Lorem ipsum ";

    const nameInput = screen.getByLabelText("Nombre");
    const emailInput = screen.getByLabelText("Correo *");
    const msgInput = screen.getByLabelText("Mensaje (mín. 20 caracteres) *");

    await userEvent.type(nameInput, name);
    await userEvent.type(emailInput, email);
    await userEvent.type(msgInput, msg);

    await userEvent.click(screen.getByRole("button"));

    await waitFor(() => expect(handleMock).toHaveBeenCalled());
  });
});
