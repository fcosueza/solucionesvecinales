import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RadioType } from "@/types";
import FormRadio from ".";

describe("FormRadio component test suite...", () => {
  const legendTxt: string = "Testing Label";
  const radioType = RadioType.radio;
  const elements = [
    {
      labelText: "Test1",
      radioAttr: {
        id: "test1",
        name: "test1",
        value: "test1",
        defaultChecked: true
      }
    },
    {
      labelText: "Test2",
      radioAttr: {
        id: "test2",
        name: "test2",
        value: "test2"
      }
    }
  ];

  it("Should render the form control", () => {
    render(<FormRadio legend={legendTxt} elementList={elements} type={radioType} />);

    expect(screen.getByRole("form-control")).toBeInTheDocument();
  });

  it("Should render the legend with the proper text", () => {
    render(<FormRadio legend={legendTxt} elementList={elements} type={radioType} />);

    expect(screen.getByLabelText(legendTxt)).toBeInTheDocument();
  });

  it("Should render inputs of the specieiged type", () => {
    render(<FormRadio legend={legendTxt} elementList={elements} type={radioType} />);

    expect(screen.getAllByRole(radioType)).toHaveLength(elements.length);
  });

  it("Should render a textarea with the default rows", () => {
    const defaultRows = 5;

    render(<FormRadio legend={legendTxt} elementList={elements} type={radioType} />);
    expect(screen.getByRole("textbox")).toHaveProperty("rows", defaultRows);
  });

  it("Should render a textarea with the specified rows", () => {
    const rows = 10;

    render(<FormRadio legend={legendTxt} elementList={elements} type={radioType} />);
    expect(screen.getByRole("textbox")).toHaveProperty("rows", rows);
  });

  it("Should show in input field what the user is writing", async () => {
    render(<FormRadio legend={legendTxt} elementList={elements} type={radioType} />);

    const userInput = "testname";
    const nameInput = screen.getByRole("textbox");

    await userEvent.type(nameInput, userInput);

    expect(nameInput).toHaveValue(userInput);
  });

  it("Should show in input field the specified value", async () => {
    const value = "Ipp";

    render(<FormRadio legend={legendTxt} elementList={elements} type={radioType} />);

    expect(screen.getByRole("textbox")).toHaveValue(value);
  });

  it("Should render input with the required field to false by default", () => {
    const name = "TestName";

    render(<FormRadio legend={legendTxt} elementList={elements} type={radioType} />);

    expect(screen.getByRole("textbox")).toHaveProperty("name", name);
  });

  it("Should show an error msg if there is one", async () => {
    const errorMsg = "testerror";

    render(<FormRadio legend={legendTxt} elementList={elements} type={radioType} errorMsg={errorMsg} />);

    const errorElement = screen.getByRole("alert");

    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveTextContent(errorMsg);
  });
});
