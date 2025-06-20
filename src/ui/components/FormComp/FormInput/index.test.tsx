import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputType, FormInputAttrs } from "@/types";
import FormInput from ".";

describe("FormInput component test suite...", () => {
  const labelTxT: string = "Testing Label";
  const inputType = InputType.text;
  const attr: FormInputAttrs = {
    id: "TestID",
    type: InputType.text
  };

  it("Should render by default a label and an input correctly ", () => {
    render(<FormInput labelText={labelTxT} attr={attr} />);

    expect(screen.getByLabelText(labelTxT)).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
  it("Should render the label with the proper text", () => {
    render(<FormInput labelText={labelTxT} attr={attr} />);
    expect(screen.getByLabelText(labelTxT)).toBeInTheDocument();
  });

  it("Should render the input with the proper field attributes", () => {
    render(<FormInput labelText={labelTxT} attr={attr} />);

    const input = screen.getByRole("textbox");

    expect(input).toHaveProperty("id", attr.id);
    expect(input).toHaveProperty("type", inputType);
  });

  it("Should render input with the specified name", () => {
    const name = "TestName";
    attr.name = name;

    render(<FormInput labelText={labelTxT} attr={attr} />);

    expect(screen.getByRole("textbox")).toHaveProperty("name", name);
  });

  it("Should render a textarea with the default rows", () => {
    const defaultRows = 5;
    attr.type = InputType.textarea;

    render(<FormInput labelText={labelTxT} attr={attr} />);
    expect(screen.getByRole("textbox")).toHaveProperty("rows", defaultRows);
  });

  it("Should render a textarea with the specified rows", () => {
    const rows = 10;
    attr.type = InputType.textarea;

    render(<FormInput labelText={labelTxT} attr={attr} rows={rows} />);
    expect(screen.getByRole("textbox")).toHaveProperty("rows", rows);
  });

  it("Should show in input field what the user is writing", async () => {
    render(<FormInput labelText={labelTxT} attr={attr} />);

    const userInput = "testname";
    const nameInput = screen.getByRole("textbox");

    await userEvent.type(nameInput, userInput);

    expect(nameInput).toHaveValue(userInput);
  });

  it("Should show in input field the specified value", async () => {
    const value = "Ipp";
    attr.defaultValue = value;

    render(<FormInput labelText={labelTxT} attr={attr} />);

    expect(screen.getByRole("textbox")).toHaveValue(value);
  });

  it("Should render input with the required field to false by default", () => {
    const name = "TestName";
    attr.name = name;

    render(<FormInput labelText={labelTxT} attr={attr} />);

    expect(screen.getByRole("textbox")).toHaveProperty("name", name);
  });

  it("Should show an error msg if there is one", async () => {
    const errorMsg = "testerror";

    render(<FormInput labelText={labelTxT} attr={attr} errorMsg={errorMsg} />);

    const errorElement = screen.getByRole("alert");

    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveTextContent(errorMsg);
  });
});
