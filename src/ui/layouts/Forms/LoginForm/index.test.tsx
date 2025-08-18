import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from ".";

function setup(jsx: React.ReactNode) {
  return {
    user: userEvent.setup(),
    ...render(jsx)
  };
}

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
    const { user } = setup(<LoginForm />);

    const email = "testname@email.com";
    const password = "asssssssasasdsdasdasdasas";

    const emailInput = screen.getByRole("textbox", { name: "email-input" });
    const passInput = screen.getByLabelText("password-input");

    await user.type(emailInput, email);
    await user.type(passInput, password);

    expect(emailInput).toHaveValue(email);
    expect(passInput).toHaveValue(password);
  });

  it("Should show error message if email is not correct", async () => {
    const { user } = setup(<LoginForm />);

    const email = "testname@email.c";
    const password = "asssssssasasdsdasdasdasas";

    const emailInput = screen.getByRole("textbox", { name: "email-input" });
    const passInput = screen.getByLabelText("password-input");

    await user.type(emailInput, email);
    await user.type(passInput, password);
    await user.click(screen.getByRole("button"));

    expect(await screen.findByRole("alert")).toBeInTheDocument();
    expect(emailInput).toHaveValue("");
    expect(passInput).toHaveValue(password);
  });

  it("Should show error message if password is not correct", async () => {
    const { user } = setup(<LoginForm />);

    const email = "testname@email.com";
    const password = "as";

    const emailInput = screen.getByRole("textbox", { name: "email-input" });
    const passInput = screen.getByLabelText("password-input");

    await user.type(emailInput, email);
    await user.type(passInput, password);
    await user.click(screen.getByRole("button"));

    expect(await screen.findByRole("alert")).toBeInTheDocument();
    expect(passInput).toHaveValue("");
    expect(emailInput).toHaveValue(email);
  });
});
