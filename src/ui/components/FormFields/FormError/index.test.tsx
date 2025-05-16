import { render, screen } from "@testing-library/react";
import FormError from ".";

describe("FormErrorMsg component test suite...", () => {
  const testMsg = "An error has ocurred.";

  it("Should render the error msg correctly", () => {
    render(<FormError message={testMsg} />);

    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("Should render the message passed has prop with and asterisk", () => {
    render(<FormError message={testMsg} />);

    expect(screen.getByText("* " + testMsg)).toBeInTheDocument();
  });

  it("Should have the errorMsg class loaded", () => {
    render(<FormError message={testMsg} />);

    expect(screen.getByRole("alert")).toHaveClass("errorMsg");
  });
});
