import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputFormControl from ".";

describe("InputFormControl component test suite...", () => {
  it("Should render the control correctly", () => {
    render(<InputFormControl />);

    expect(screen.getByRole("form")).toBeInTheDocument();
  });
  it("Should render form controls properly", () => {
    render(<InputFormControl />);

    expect(screen.getAllByRole("form-control")).toHaveLength(3);
  });

  it("Should render form control to insert name properly", () => {
    render(<InputFormControl />);

    expect(screen.getByLabelText("Nombre")).toBeInTheDocument();
    expect(screen.getAllByRole("textbox")[0]).toHaveProperty("name", "name");
  });

  it("Should render form control to insert email properly", () => {
    render(<InputFormControl />);

    expect(screen.getByLabelText("Correo *")).toBeInTheDocument();
    expect(screen.getAllByRole("textbox")[1]).toHaveProperty("name", "email");
  });

  it("Should render form control to insert message properly", () => {
    render(<InputFormControl />);

    expect(screen.getByLabelText("Mensaje (mín. 20 caracteres) *")).toBeInTheDocument();
    expect(screen.getAllByRole("textbox")[2]).toHaveProperty("name", "msg");
  });

  it("Should show in input fields what the user is writing", async () => {
    render(<InputFormControl />);

    const name = "testname";
    const email = "testname@email.com";
    const msg = "Lorem ipsum dolor sit amet consecterum asasa asdad asdad";

    const nameInput = screen.getAllByRole("textbox")[0];
    const emailInput = screen.getAllByRole("textbox")[1];
    const msgInput = screen.getAllByRole("textbox")[2];

    await userEvent.type(nameInput, name);
    await userEvent.type(emailInput, email);
    await userEvent.type(msgInput, msg);

    expect(nameInput).toHaveValue(name);
    expect(emailInput).toHaveValue(email);
    expect(msgInput).toHaveValue(msg);
  });
});
