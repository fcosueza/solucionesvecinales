import { render, screen } from "@testing-library/react";
import SignUpForm from ".";

describe("Test para el componente SignUpForm", () => {
  it("Debe renderizar el formulario de forma correcta.", () => {
    render(<SignUpForm />);

    expect(screen.getByRole("form")).toBeInTheDocument();
  });
  it("Debe renderizar los controles del formulario", () => {
    render(<SignUpForm />);

    expect(screen.getAllByLabelText("form-control")).toHaveLength(2);
  });

  it("Debe renderizar los controles para introducir el correo", () => {
    render(<SignUpForm />);

    expect(screen.getByLabelText("Correo")).toBeInTheDocument();
  });

  it("Debe renderizar los controles para introducir la contraseña", () => {
    render(<SignUpForm />);

    expect(screen.getByLabelText("Contraseña")).toBeInTheDocument();
  });
});
