import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from ".";

describe("ContactForm component test suite...", () => {
  it("Should render the form", () => {
    render(<ContactForm />);

    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  it("Should render form controls properly", () => {
    render(<ContactForm />);

    expect(screen.getByRole("textbox", { name: "name-input" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "name-input" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "msg-input" })).toBeInTheDocument();
  });

  it("should render all default values in input fields", () => {
    render(<ContactForm />);

    expect(screen.getByRole("textbox", { name: "name-input" })).toHaveValue("");
    expect(screen.getByRole("textbox", { name: "name-input" })).toHaveValue("");
    expect(screen.getByRole("textbox", { name: "msg-input" })).toHaveValue("");
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

  it("Should show errors messsages in all fields if the values are not correct", async () => {
    render(<ContactForm />);

    const name = "t";
    const email = "testname@email.c";
    const msg = "Lorem ipsum dolor";
    const errorMsgLength = 3;

    const nameInput = screen.getByRole("textbox", { name: "name-input" });
    const emailInput = screen.getByRole("textbox", { name: "email-input" });
    const msgInput = screen.getByRole("textbox", { name: "msg-input" });
    const submitBtn = screen.getByRole("button");

    await userEvent.type(nameInput, name);
    await userEvent.type(emailInput, email);
    await userEvent.type(msgInput, msg);
    await userEvent.click(submitBtn);

    expect(screen.getAllByRole("alert")).toHaveLength(errorMsgLength);
    expect(nameInput).toHaveValue("");
    expect(emailInput).toHaveValue("");
    expect(msgInput).toHaveValue("");
  });
});
