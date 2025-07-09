import { render, screen, within } from "@testing-library/react";
import SignUpForm from ".";

describe("SignUpForm Componente test...", () => {
  it("Must render the form", () => {
    render(<SignUpForm />);

    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  it("Should render all the form input controls", () => {
    render(<SignUpForm />);

    expect(screen.getByLabelText("name-input")).toBeInTheDocument();
    expect(screen.getByLabelText("surname-input")).toBeInTheDocument();
    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
    expect(screen.getByLabelText("email-input")).toBeInTheDocument();
    expect(screen.getByLabelText("password-input")).toBeInTheDocument();
    expect(screen.getByLabelText("repeat-input")).toBeInTheDocument();
  });

  it("should render all default values in input fields", () => {
    render(<SignUpForm />);

    expect(screen.getByLabelText("name-input")).toHaveValue("");
    expect(screen.getByLabelText("surname-input")).toHaveValue("");
    expect(screen.getByLabelText("email-input")).toHaveValue("");
    expect(screen.getByLabelText("password-input")).toHaveValue("");
    expect(screen.getByLabelText("repeat-input")).toHaveValue("");
  });

  it("Should render 2 roles in the role selection control", () => {
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
});
