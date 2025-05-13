import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from ".";

describe("LoginForm component test suite...", () => {
  it("Debe renderizar el formulario de forma correcta.", () => {
    render(<LoginForm />);

    expect(screen.getByRole("form")).toBeInTheDocument();
  });
  it("Should render the form correctly", () => {
    render(<LoginForm />);

    expect(screen.getAllByLabelText("form-control")).toHaveLength(2);
  });

  it("Should render the controls to insert email", () => {
    render(<LoginForm />);

    expect(screen.getByLabelText("Correo")).toBeInTheDocument();
  });

  it("Should render the controls to insert password", () => {
    render(<LoginForm />);

    expect(screen.getByLabelText("Contraseña")).toBeInTheDocument();
  });

  it("Should show in every field what the user is writing", async () => {
    render(<LoginForm />);

    const password = "asssssssasasdsdasdasdasas";
    const email = "testname@email.com";

    const passInput = screen.getByLabelText("Contraseña");
    const emailInput = screen.getByLabelText("Correo");

    await userEvent.type(emailInput, email);
    await userEvent.type(passInput, password);

    expect(emailInput).toHaveValue(email);
    expect(passInput).toHaveValue(password);
  });
});
