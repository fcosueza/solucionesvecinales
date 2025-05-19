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

    const email = "testname@email.com";
    const password = "asssssssasasdsdasdasdasas";

    const emailInput = screen.getByLabelText("Correo");
    const passInput = screen.getByLabelText("Contraseña");

    await userEvent.type(emailInput, email);
    await userEvent.type(passInput, password);

    expect(emailInput).toHaveValue(email);
    expect(passInput).toHaveValue(password);
  });

  it("Should show error message if email is not correct", async () => {
    render(<LoginForm />);

    const email = "testname@email.c";
    const password = "asssssssasasdsdasdasdasas";

    const emailInput = screen.getByLabelText("Correo");
    const passInput = screen.getByLabelText("Contraseña");

    await userEvent.type(emailInput, email);
    await userEvent.type(passInput, password);
    await userEvent.click(screen.getByRole("button"));

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(emailInput).toHaveClass("inputError");
    expect(emailInput).toHaveValue("");
  });

  it("Should show error message if password is not correct", async () => {
    render(<LoginForm />);

    const email = "testname@email.com";
    const password = "as";

    const emailInput = screen.getByLabelText("Correo");
    const passInput = screen.getByLabelText("Contraseña");

    await userEvent.type(emailInput, email);
    await userEvent.type(passInput, password);
    await userEvent.click(screen.getByRole("button"));

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(passInput).toHaveClass("inputError");
    expect(passInput).toHaveValue("");
  });
});
