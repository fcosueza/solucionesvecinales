import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormRadioAttrs, RadioType } from "@/types";
import FormRadio from ".";

describe("FormRadio component test suite...", () => {
  const legendTxt: string = "Testing Label";
  const radioType = RadioType.radio;
  const attr: FormRadioAttrs[] = [
    {
      id: "test1",
      name: "test1",
      labelText: "Test1",
      value: "test1"
    },
    {
      id: "test2",
      name: "test2",
      labelText: "test2",
      value: "test2"
    }
  ];

  it("Should render by default a label and an input correctly ", () => {
    render(<FormRadio legend={legendTxt} attr={attr} type={radioType} />);

    expect(screen.getByLabelText(legendTxt)).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
  it("Should render the label with the proper text", () => {
    render(<FormRadio legend={legendTxt} attr={attr} type={radioType} />);
    expect(screen.getByLabelText(legendTxt)).toBeInTheDocument();
  });

  it("Should render the input with the proper field attributes", () => {
    render(<FormRadio legend={legendTxt} attr={attr} type={radioType} />);

    const input = screen.getByRole("textbox");

    expect(input).toHaveProperty("type", radioType);
  });

  it("Should render input with the specified name", () => {
    const name = "TestName";

    render(<FormRadio legend={legendTxt} attr={attr} type={radioType} />);

    expect(screen.getByRole("textbox")).toHaveProperty("name", name);
  });

  it("Should render a textarea with the default rows", () => {
    const defaultRows = 5;

    render(<FormRadio legend={legendTxt} attr={attr} type={radioType} />);
    expect(screen.getByRole("textbox")).toHaveProperty("rows", defaultRows);
  });

  it("Should render a textarea with the specified rows", () => {
    const rows = 10;

    render(<FormRadio legend={legendTxt} attr={attr} type={radioType} />);
    expect(screen.getByRole("textbox")).toHaveProperty("rows", rows);
  });

  it("Should show in input field what the user is writing", async () => {
    render(<FormRadio legend={legendTxt} attr={attr} type={radioType} />);

    const userInput = "testname";
    const nameInput = screen.getByRole("textbox");

    await userEvent.type(nameInput, userInput);

    expect(nameInput).toHaveValue(userInput);
  });

  it("Should show in input field the specified value", async () => {
    const value = "Ipp";

    render(<FormRadio legend={legendTxt} attr={attr} type={radioType} />);

    expect(screen.getByRole("textbox")).toHaveValue(value);
  });

  it("Should render input with the required field to false by default", () => {
    const name = "TestName";

    render(<FormRadio legend={legendTxt} attr={attr} type={radioType} />);

    expect(screen.getByRole("textbox")).toHaveProperty("name", name);
  });

  it("Should show an error msg if there is one", async () => {
    const errorMsg = "testerror";

    render(<FormRadio legend={legendTxt} attr={attr} type={radioType} errorMsg={errorMsg} />);

    const errorElement = screen.getByRole("alert");

    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveTextContent(errorMsg);
  });
});
