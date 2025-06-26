import { render, screen, within } from "@testing-library/react";
import SignUpForm from ".";

describe("SignUpForm Componente test...", () => {
  it("Must render the form", () => {
    render(<SignUpForm />);

    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  it("Should render the name input control", () => {
    render(<SignUpForm />);

    expect(screen.getByRole("textbox", { name: "name-input" })).toBeInTheDocument();
  });

  it("Should render the surname input control", () => {
    render(<SignUpForm />);

    expect(screen.getByRole("textbox", { name: "surname-input" })).toBeInTheDocument();
  });

  it("Should render the role selection control", () => {
    render(<SignUpForm />);

    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
  });

  it("Should render the 2 roles in the role selection control", () => {
    render(<SignUpForm />);

    const radioGroup = screen.getByRole("radiogroup");

    expect(within(radioGroup).getByRole("radio", { name: "tenant-radio" })).toBeInTheDocument();
    expect(within(radioGroup).getByRole("radio", { name: "admin-radio" })).toBeInTheDocument();
  });

  it("Should check by default tenant option in role selection control", () => {
    render(<SignUpForm />);

    const radioGroup = screen.getByRole("radiogroup");

    expect(within(radioGroup).getByRole("radio", { name: "tenant-radio" })).toBeChecked();
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
});
