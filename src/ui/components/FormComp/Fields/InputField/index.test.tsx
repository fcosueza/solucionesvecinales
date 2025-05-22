import { render, screen } from "@testing-library/react";
import FormInput from ".";

describe("InputFormControl component test suite...", () => {
  it("Should render the control correctly", () => {
    render(<FormInput />);

    expect(screen.getByRole("form")).toBeInTheDocument();
  });
  it("Should render form controls properly", () => {
    render(<FormInput />);

    expect(screen.getAllByRole("form-control")).toHaveLength(3);
  });
});
