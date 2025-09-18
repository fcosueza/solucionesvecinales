import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from ".";
import contactMsgAction from "@/actions/contactMsgAction";

jest.mock("@/actions/contactMsgAction");

function setup(jsx: React.ReactNode) {
  return {
    user: userEvent.setup(),
    ...render(jsx)
  };
}

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
    const { user } = setup(<ContactForm />);

    const name = "testname";
    const email = "testname@email.com";
    const msg = "Lorem ipsum dolor sit amet consecterum asasa asdad asdad";

    await user.type(screen.getByRole("textbox", { name: "name-input" }), name);
    await user.type(screen.getByRole("textbox", { name: "email-input" }), email);
    await user.type(screen.getByRole("textbox", { name: "msg-input" }), msg);

    expect(screen.getByRole("textbox", { name: "name-input" })).toHaveValue(name);
    expect(screen.getByRole("textbox", { name: "email-input" })).toHaveValue(email);
    expect(screen.getByRole("textbox", { name: "msg-input" })).toHaveValue(msg);
  });

  it("Should show error msg and load error class if the name its not correct", async () => {
    const { user } = setup(<ContactForm />);

    const formData = new FormData();
    const mockAction = contactMsgAction as jest.Mock;

    const name = "t";
    const email = "testname@email.com";
    const msg = "Lorem ipsum dolor sit amet consecterum asasa asdad asdad";

    formData.append("name", name);
    formData.append("email", email);
    formData.append("msg", msg);

    mockAction.mockResolvedValue({
      state: "error",
      message: "Incorrect form data",
      errors: { name: "Nombre incorrecto" },
      payload: formData
    });

    await user.type(screen.getByRole("textbox", { name: "name-input" }), name);
    await user.type(screen.getByRole("textbox", { name: "email-input" }), email);
    await user.type(screen.getByRole("textbox", { name: "msg-input" }), msg);
    await user.click(screen.getByRole("button"));

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "name-input" })).toHaveClass("control__inputError");
    expect(screen.getByRole("textbox", { name: "name-input" })).toHaveValue("");
  });

  it("Should show error msg and load error class if the email its not correct", async () => {
    const { user } = setup(<ContactForm />);

    const formData = new FormData();
    const mockAction = contactMsgAction as jest.Mock;

    const name = "test";
    const email = "testname@email.c";
    const msg = "Lorem ipsum dolor sit amet consecterum asasa asdad asdad";

    formData.append("name", name);
    formData.append("email", email);
    formData.append("msg", msg);

    mockAction.mockResolvedValue({
      state: "error",
      message: "Incorrect form data",
      errors: { email: "El correo es incorrecto" },
      payload: formData
    });

    await user.type(screen.getByRole("textbox", { name: "name-input" }), name);
    await user.type(screen.getByRole("textbox", { name: "email-input" }), email);
    await user.type(screen.getByRole("textbox", { name: "msg-input" }), msg);

    await user.click(screen.getByRole("button"));

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "email-input" })).toHaveClass("control__inputError");
    expect(screen.getByRole("textbox", { name: "email-input" })).toHaveValue("");
  });

  it("Should show error msg and load error class if the msg its not correct", async () => {
    const { user } = setup(<ContactForm />);

    const formData = new FormData();
    const mockAction = contactMsgAction as jest.Mock;

    const name = "test";
    const email = "testname@email.com";
    const msg = "Lorem ipsum";

    formData.append("name", name);
    formData.append("email", email);
    formData.append("msg", msg);

    mockAction.mockResolvedValue({
      state: "error",
      message: "Incorrect form data",
      errors: { msg: "El mensaje es incorrecto" },
      payload: formData
    });

    await user.type(screen.getByRole("textbox", { name: "name-input" }), name);
    await user.type(screen.getByRole("textbox", { name: "email-input" }), email);
    await user.type(screen.getByRole("textbox", { name: "msg-input" }), msg);
    await user.click(screen.getByRole("button"));

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "msg-input" })).toHaveClass("control__inputError");
    expect(screen.getByRole("textbox", { name: "msg-input" })).toHaveValue("");
  });
});
