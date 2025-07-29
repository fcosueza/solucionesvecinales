import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from ".";

describe("LoginForm component test suite...", () => {
  it("Should render the form correctly", () => {
    render(<LoginForm />);

    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  it("Should render the controls to insert email and password", () => {
    render(<LoginForm />);

    expect(screen.getByRole("textbox", { name: "email-input" })).toBeInTheDocument();
    expect(screen.getByLabelText("password-input")).toBeInTheDocument();
  });

  it("Should show in every field what the user is writing", async () => {
    render(<LoginForm />);

    const email = "testname@email.com";
    const password = "asssssssasasdsdasdasdasas";

    const emailInput = screen.getByRole("textbox", { name: "email-input" });
    const passInput = screen.getByLabelText("password-input");

    await userEvent.type(emailInput, email);
    await userEvent.type(passInput, password);

    expect(emailInput).toHaveValue(email);
    expect(passInput).toHaveValue(password);
  });

  it("Should show error messages if the fields are not corrects", async () => {
    render(<LoginForm />);

    const email = "testname@email.c";
    const password = "aasdasdasas";

    const emailInput = screen.getByRole("textbox", { name: "email-input" });
    const passInput = screen.getByLabelText("password-input");

    await userEvent.type(emailInput, email);
    await userEvent.type(passInput, password);
    await userEvent.click(screen.getByRole("button"));

    expect(screen.getAllByRole("alert")).toHaveLength(2);
    expect(emailInput).toHaveValue("");
    expect(passInput).toHaveValue("");
  });
});
