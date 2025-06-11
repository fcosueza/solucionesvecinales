import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputType, FormFieldAttrs } from "@/types";
import FormInput from ".";

describe("FormInput component test suite...", () => {
  const labelTxT: string = "Testing Label";
  const inputType = InputType.text;
  const attr: FormFieldAttrs = {
    id: "TestID"
  };

  it("Should render by default a label and an input correctly ", () => {
    render(<FormInput labelText={labelTxT} attr={attr} type={inputType} />);

    expect(screen.getByLabelText(labelTxT)).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
  it("Should render the label with the proper text", () => {
    render(<FormInput labelText={labelTxT} attr={attr} type={inputType} />);
    expect(screen.getByLabelText(labelTxT)).toBeInTheDocument();
  });

  it("Should render the input with the proper field attributes", () => {
    render(<FormInput labelText={labelTxT} attr={attr} type={inputType} />);

    const input = screen.getByRole("textbox");

    expect(input).toHaveProperty("id", attr.id);
    expect(input).toHaveProperty("type", inputType);
  });

  it("Should render input with the specified name if not included", () => {
    const name = "TestName";
    attr.name = name;

    render(<FormInput labelText={labelTxT} attr={attr} type={inputType} />);

    expect(screen.getByRole("textbox")).toHaveProperty("name", name);
  });

  it("Should render input with a default name if not specified", () => {
    render(<FormInput labelText={labelTxT} attr={attr} type={inputType} />);

    expect(screen.getByRole("textbox")).toHaveProperty("name", attr.id);
  });

  it("Should render a textarea with the default rows", () => {
    const defaultRows = 5;

    render(<FormInput labelText={labelTxT} attr={attr} type={inputType} />);
    expect(screen.getByRole("textbox")).toHaveProperty("rows", defaultRows);
  });

  it("Should render a textarea with the specified rows", () => {
    const rows = 5;

    render(<FormInput labelText={labelTxT} attr={attr} rows={rows} type={InputType.textarea} />);
    expect(screen.getByRole("textbox")).toHaveProperty("rows", rows);
  });

  it("Should show in input field what the user is writing", async () => {
    render(<FormInput labelText={labelTxT} attr={attr} type={inputType} />);

    const userInput = "testname";
    const nameInput = screen.getByRole("textbox");

    await userEvent.type(nameInput, userInput);

    expect(nameInput).toHaveValue(userInput);
  });

  it("Should show an error msg if there is one", async () => {
    const errorMsg = "testerror";
    const errorElement = screen.getByRole("alert");

    render(<FormInput labelText={labelTxT} attr={attr} type={inputType} errorMsg={errorMsg} />);
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveValue(errorMsg);
  });
});
