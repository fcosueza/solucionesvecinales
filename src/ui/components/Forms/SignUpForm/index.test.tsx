import { render, screen } from "@testing-library/react";
import SignUpForm from ".";

describe("SignUpForm Componente test", () => {
  it("Must render the form", () => {
    render(<SignUpForm />);

    expect(screen.getByRole("form")).toBeInTheDocument();
  });
});
