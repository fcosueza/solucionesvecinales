import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from ".";

describe("ContactForm component test suite...", () => {
  it("Should render a form correctly", () => {
    render(<ContactForm />);

    expect(screen.getByRole("form")).toBeInTheDocument();
  });
  it("Should render form controls properly", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText("name-input")).toBeInTheDocument();
    expect(screen.getByLabelText("email-input")).toBeInTheDocument();
    expect(screen.getByLabelText("msg-input")).toBeInTheDocument();
  });

  it("Should show in input fields what the user is writing", async () => {
    render(<ContactForm />);

    const name = "testname";
    const email = "testname@email.com";
    const msg = "Lorem ipsum dolor sit amet consecterum asasa asdad asdad";

    const nameInput = screen.getByRole("textbox", { name: "name-input" });
    const emailInput = screen.getByRole("textbox", { name: "email-input" });
    const msgInput = screen.getByRole("textbox", { name: "msg-input" });

    await userEvent.type(nameInput, name);
    await userEvent.type(emailInput, email);
    await userEvent.type(msgInput, msg);

    expect(nameInput).toHaveValue(name);
    expect(emailInput).toHaveValue(email);
    expect(msgInput).toHaveValue(msg);
  });

  it("Should show error msg and load error class if the name its not correct", async () => {
    render(<ContactForm />);

    const name = "t";
    const email = "testname@email.com";
    const msg = "Lorem ipsum dolor sit amet consecterum asasa asdad asdad";

    const nameInput = screen.getByRole("textbox", { name: "name-input" });
    const emailInput = screen.getByRole("textbox", { name: "email-input" });
    const msgInput = screen.getByRole("textbox", { name: "msg-input" });
    const submitBtn = screen.getByRole("button");

    await userEvent.type(nameInput, name);
    await userEvent.type(emailInput, email);
    await userEvent.type(msgInput, msg);
    await userEvent.click(submitBtn);

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(nameInput).toHaveClass("control__inputError");
    expect(nameInput).toHaveValue("");
  });

  it("Should show error msg and load error class if the email its not correct", async () => {
    render(<ContactForm />);

    const name = "test";
    const email = "testname@email.c";
    const msg = "Lorem ipsum dolor sit amet consecterum asasa asdad asdad";

    const nameInput = screen.getByRole("textbox", { name: "name-input" });
    const emailInput = screen.getByRole("textbox", { name: "email-input" });
    const msgInput = screen.getByRole("textbox", { name: "msg-input" });
    const submitBtn = screen.getByRole("button");

    await userEvent.type(nameInput, name);
    await userEvent.type(emailInput, email);
    await userEvent.type(msgInput, msg);
    await userEvent.click(submitBtn);

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(emailInput).toHaveClass("control__inputError");
    expect(emailInput).toHaveValue("");
  });

  it("Should show error msg and load error class if the msg its not correct", async () => {
    render(<ContactForm />);

    const name = "test";
    const email = "testname@email.com";
    const msg = "Lorem ipsum";

    const nameInput = screen.getByRole("textbox", { name: "name-input" });
    const emailInput = screen.getByRole("textbox", { name: "email-input" });
    const msgInput = screen.getByRole("textbox", { name: "msg-input" });
    const submitBtn = screen.getByRole("button");

    await userEvent.type(nameInput, name);
    await userEvent.type(emailInput, email);
    await userEvent.type(msgInput, msg);
    await userEvent.click(submitBtn);

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(msgInput).toHaveClass("control__inputError");
    expect(msgInput).toHaveValue("");
  });
});
