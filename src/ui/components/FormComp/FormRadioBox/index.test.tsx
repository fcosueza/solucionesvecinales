import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RadioBoxType } from "@/types";
import FormRadioBox from ".";

describe("FormRadioBox component test suite...", () => {
  const legendTxt: string = "Testing Label";
  const name: string = "test";
  const radioType = RadioBoxType.radio;
  const elements = [
    {
      labelText: "Test1",
      radioAttr: {
        id: "test1",
        value: "test1",
        defaultChecked: true
      }
    },
    {
      labelText: "Test2",
      radioAttr: {
        id: "test2",
        value: "test2"
      }
    }
  ];

  it("Should render the form control", () => {
    render(<FormRadioBox legend={legendTxt} name={name} elementList={elements} type={radioType} />);

    expect(screen.getByRole("form-control")).toBeInTheDocument();
  });

  it("Should create a fieldset element to group the radiobox elements", () => {
    render(<FormRadioBox legend={legendTxt} name={name} elementList={elements} type={radioType} />);

    expect(screen.getByRole("group")).toBeInTheDocument();
  });

  it("Should render the legend with the proper text", () => {
    render(<FormRadioBox legend={legendTxt} name={name} elementList={elements} type={radioType} />);

    expect(screen.getByText(legendTxt)).toBeInTheDocument();
  });

  it("Should render inputs of the specified type", () => {
    render(<FormRadioBox legend={legendTxt} name={name} elementList={elements} type={radioType} />);

    expect(screen.getAllByRole(radioType)).toHaveLength(elements.length);
  });

  it("Should render the radioboxes with the specified labels", () => {
    render(<FormRadioBox legend={legendTxt} name={name} elementList={elements} type={radioType} />);

    elements.forEach(elements => {
      expect(screen.getByLabelText(elements.labelText)).toBeInTheDocument();
    });
  });

  it("Should check by default the specified radiobox", () => {
    const checkedElement = "Test1";

    render(<FormRadioBox legend={legendTxt} name={name} elementList={elements} type={radioType} />);
    expect(screen.getByLabelText(checkedElement)).toBeChecked();
  });

  it("Should check the element checked by the user", async () => {
    render(<FormRadioBox legend={legendTxt} name={name} elementList={elements} type={radioType} />);

    const element = screen.getByLabelText("Test2");

    await userEvent.click(element);

    expect(element).toBeChecked();
    expect(screen.getByLabelText("Test1")).not.toBeChecked();
  });

  it("Should rener a error message if its passed one", () => {
    render(<FormRadioBox legend={legendTxt} name={name} elementList={elements} type={radioType} errorMsg={"Error"} />);

    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
});
