import { render, screen } from "@testing-library/react";
import SignUpForm from ".";

describe("SignUpForm Componente test...", () => {
  it("Must render the form", () => {
    render(<SignUpForm />);

    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  it("Should render the email input control", () => {
    render(<SignUpForm />);

    expect(screen.getByLabelText("email")).toBeInTheDocument();
  });

  it("Should render the password input control", () => {
    render(<SignUpForm />);

    expect(screen.getByLabelText("password")).toBeInTheDocument();
  });

  it("Should render the password repeat input control", () => {
    render(<SignUpForm />);

    expect(screen.getByLabelText("password_repeat")).toBeInTheDocument();
  });

  it("Should render the  user name input control", () => {
    render(<SignUpForm />);

    expect(screen.getByLabelText("userName")).toBeInTheDocument();
  });

  it("Should render the name input control", () => {
    render(<SignUpForm />);

    expect(screen.getByLabelText("name")).toBeInTheDocument();
  });

  it("Should render the surname input control", () => {
    render(<SignUpForm />);

    expect(screen.getByLabelText("surname")).toBeInTheDocument();
  });

  it("Should render the fieldset to contain role selection", () => {
    render(<SignUpForm />);

    expect(screen.getByRole("fieldset")).toBeInTheDocument();
  });
});
