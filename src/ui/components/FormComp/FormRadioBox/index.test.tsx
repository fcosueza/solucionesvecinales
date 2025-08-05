import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RadioBoxType } from "@/types";
import FormRadioBox from ".";

describe("FormRadioBox component test suite...", () => {
  const legendTxt: string = "Testing Label";
  const radioType = RadioBoxType.radio;
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
    render(<FormRadioBox legend={legendTxt} elementList={elements} type={radioType} />);

    expect(screen.getByRole("form-control")).toBeInTheDocument();
  });

  it("Should create a fieldset element to group the radiobox elements", () => {
    render(<FormRadioBox legend={legendTxt} elementList={elements} type={radioType} />);

    expect(screen.getByRole("group")).toBeInTheDocument();
  });

  it("Should render the legend with the proper text", () => {
    render(<FormRadioBox legend={legendTxt} elementList={elements} type={radioType} />);

    expect(screen.getByText(legendTxt)).toBeInTheDocument();
  });

  it("Should render inputs of the specified type", () => {
    render(<FormRadioBox legend={legendTxt} elementList={elements} type={radioType} />);

    expect(screen.getAllByRole(radioType)).toHaveLength(elements.length);
  });

  it("Should render a the radioboxes with the specified labels", () => {
    render(<FormRadioBox legend={legendTxt} elementList={elements} type={radioType} />);

    elements.forEach(elements => {
      expect(screen.getByLabelText(elements.labelText)).toBeInTheDocument();
    });
  });

  it("Should show in input field what the user is writing", async () => {
    render(<FormRadioBox legend={legendTxt} elementList={elements} type={radioType} />);

    const userInput = "testname";
    const nameInput = screen.getByRole("textbox");

    await userEvent.type(nameInput, userInput);

    expect(nameInput).toHaveValue(userInput);
  });

  it("Should show in input field the specified value", async () => {
    const value = "Ipp";

    render(<FormRadioBox legend={legendTxt} elementList={elements} type={radioType} />);

    expect(screen.getByRole("textbox")).toHaveValue(value);
  });

  it("Should render input with the required field to false by default", () => {
    const name = "TestName";

    render(<FormRadioBox legend={legendTxt} elementList={elements} type={radioType} />);

    expect(screen.getByRole("textbox")).toHaveProperty("name", name);
  });

  it("Should show an error msg if there is one", async () => {
    const errorMsg = "testerror";

    render(<FormRadioBox legend={legendTxt} elementList={elements} type={radioType} errorMsg={errorMsg} />);

    const errorElement = screen.getByRole("alert");

    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveTextContent(errorMsg);
  });
});
