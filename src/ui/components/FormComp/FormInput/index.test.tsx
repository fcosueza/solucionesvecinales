import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputType, FormFieldAttrs } from "@/types";
import FormInput from ".";

describe("FormInput component test suite...", () => {
  const labelTxT: string = "Testing Label";
  const attr: FormFieldAttrs = {
    id: "TestID",
    type: InputType.text
  };

  it("Should render by default a label and an input correctly ", () => {
    render(<FormInput />);

    expect(screen.getByRole("label")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
  it("Should render the label with the proper text", () => {
    render(<FormInput labelText={labelTxT} attr={attr} />);
    expect(screen.getByLabelText(labelTxT)).toBeInTheDocument();
  });

  it("Should render the input with the proper field attributes", () => {
    render(<FormInput labelText={labelTxT} attr={attr} />);

    expect(screen.getByLabelText("Nombre")).toBeInTheDocument();
    expect(screen.getAllByRole("textbox")[0]).toHaveProperty("name", "name");
  });

  it("Should render form control to insert email properly", () => {
    render(<FormInput labelText={labelTxT} attr={attr} />);

    expect(screen.getByLabelText("Correo")).toBeInTheDocument();
    expect(screen.getAllByRole("textbox")[1]).toHaveProperty("name", "email");
  });

  it("Should render form control to insert message properly", () => {
    render(<FormInput labelText={labelTxT} attr={attr} />);

    expect(screen.getByLabelText("Mensaje (mín. 20 caracteres)")).toBeInTheDocument();
    expect(screen.getAllByRole("textbox")[2]).toHaveProperty("name", "msg");
  });

  it("Should show in input fields what the user is writing", async () => {
    render(<FormInput labelText={labelTxT} attr={attr} />);

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
