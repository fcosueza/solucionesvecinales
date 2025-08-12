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

    expect(screen.getByRole("textbox", { name: "name-input" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "email-input" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "msg-input" })).toBeInTheDocument();
  });

  it("Should show in input fields what the user is writing", async () => {
    render(<ContactForm />);

    const name = "testname";
    const email = "testname@email.com";
    const msg = "Lorem ipsum dolor sit amet consecterum asasa asdad asdad";

    await userEvent.type(screen.getByRole("textbox", { name: "name-input" }), name);
    await userEvent.type(screen.getByRole("textbox", { name: "email-input" }), email);
    await userEvent.type(screen.getByRole("textbox", { name: "msg-input" }), msg);

    expect(screen.getByRole("textbox", { name: "name-input" })).toHaveValue(name);
    expect(screen.getByRole("textbox", { name: "email-input" })).toHaveValue(email);
    expect(screen.getByRole("textbox", { name: "msg-input" })).toHaveValue(msg);
  });

  it("Should show error msg and load error class if the name its not correct", async () => {
    render(<ContactForm />);

    const name = "t";
    const email = "testname@email.com";
    const msg = "Lorem ipsum dolor sit amet consecterum asasa asdad asdad";

    await userEvent.type(screen.getByRole("textbox", { name: "name-input" }), name);
    await userEvent.type(screen.getByRole("textbox", { name: "email-input" }), email);
    await userEvent.type(screen.getByRole("textbox", { name: "msg-input" }), msg);
    await userEvent.click(screen.getByRole("button"));

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "name-input" })).toHaveClass("control__inputError");
    expect(screen.getByRole("textbox", { name: "name-input" })).toHaveValue("");
  });

  it("Should show error msg and load error class if the email its not correct", async () => {
    render(<ContactForm />);

    const name = "test";
    const email = "testname@email.c";
    const msg = "Lorem ipsum dolor sit amet consecterum asasa asdad asdad";

    await userEvent.type(screen.getByRole("textbox", { name: "name-input" }), name);
    await userEvent.type(screen.getByRole("textbox", { name: "email-input" }), email);
    await userEvent.type(screen.getByRole("textbox", { name: "msg-input" }), msg);
    await userEvent.click(screen.getByRole("button"));

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "email-input" })).toHaveClass("control__inputError");
    expect(screen.getByRole("textbox", { name: "email-input" })).toHaveValue("");
  });

  it("Should show error msg and load error class if the msg its not correct", async () => {
    render(<ContactForm />);

    const name = "test";
    const email = "testname@email.com";
    const msg = "Lorem ipsum";

    await userEvent.type(screen.getByRole("textbox", { name: "name-input" }), name);
    await userEvent.type(screen.getByRole("textbox", { name: "email-input" }), email);
    await userEvent.type(screen.getByRole("textbox", { name: "msg-input" }), msg);
    await userEvent.click(screen.getByRole("button"));

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "msg-input" })).toHaveClass("control__inputError");
    expect(screen.getByRole("textbox", { name: "msg-input" })).toHaveValue("");
  });
});
