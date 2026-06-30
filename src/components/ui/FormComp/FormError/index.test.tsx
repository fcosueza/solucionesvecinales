import { render, screen } from "@testing-library/react";
import FormError from ".";

describe("FormError component test suite", () => {
  const testMessage = "An error has ocurred.";

  it("should render the error message correctly", () => {
    render(<FormError message={testMessage} />);

    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("should render the received message with an asterisk", () => {
    render(<FormError message={testMessage} />);

    expect(screen.getByText("* " + testMessage)).toBeInTheDocument();
  });

  it("should apply the errorMsg class", () => {
    render(<FormError message={testMessage} />);

    expect(screen.getByRole("alert")).toHaveClass("errorMsg");
  });
});
