import { render, screen } from "@testing-library/react";
import SignUpForm from ".";

describe("SignUpForm Componente test...", () => {
  it("Must render the form", () => {
    render(<SignUpForm />);

    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  it("Should render the email input control", () => {
    render(<SignUpForm />);

    expect(screen.getByLabelText("email-input")).toBeInTheDocument();
  });

  it("Should render the password input control", () => {
    render(<SignUpForm />);

    expect(screen.getByLabelText("password-input")).toBeInTheDocument();
  });

  it("Should render the password repeat input control", () => {
    render(<SignUpForm />);

    expect(screen.getByLabelText("repeat-input")).toBeInTheDocument();
  });

  it("Should render the  user name input control", () => {
    render(<SignUpForm />);

    expect(screen.getByRole("textbox", { name: "username-input" })).toBeInTheDocument();
  });

  it("Should render the name input control", () => {
    render(<SignUpForm />);

    expect(screen.getByRole("textbox", { name: "name-input" })).toBeInTheDocument();
  });

  it("Should render the surname input control", () => {
    render(<SignUpForm />);

    expect(screen.getByRole("textbox", { name: "surname-input" })).toBeInTheDocument();
  });
});
