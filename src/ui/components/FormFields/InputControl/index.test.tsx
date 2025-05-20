import { render, screen } from "@testing-library/react";
import InputControl from ".";

describe("InputFormControl component test suite...", () => {
  it("Should render the control correctly", () => {
    render(<InputControl />);

    expect(screen.getByRole("form")).toBeInTheDocument();
  });
  it("Should render form controls properly", () => {
    render(<InputControl />);

    expect(screen.getAllByRole("form-control")).toHaveLength(3);
  });
});
