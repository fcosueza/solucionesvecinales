import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from ".";

describe("ContactForm component test suite...", () => {
  it("Should render a form correctly", () => {
    render(<ContactForm />);

    expect(screen.getByRole("form")).toBeInTheDocument();
  });
  it("Should render form controls correctly", () => {
    render(<ContactForm />);

    expect(screen.getAllByRole("form-control")).toHaveLength(3);
  });

  it("Should render form control to insert name correctly", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText("Nombre")).toBeInTheDocument();
    expect(screen.getAllByRole("textbox")[0]).toHaveProperty("name", "name");
  });

  it("Should render form control to insert email correctly", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText("Correo *")).toBeInTheDocument();
    expect(screen.getAllByRole("textbox")[1]).toHaveProperty("name", "email");
  });

  it("Should render form control to insert message correctly", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText("Mensaje (mín. 20 caracteres) *")).toBeInTheDocument();
    expect(screen.getAllByRole("textbox")[2]).toHaveProperty("name", "msg");
  });

  it("Should show in input fields what the user is writing", async () => {
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
});
