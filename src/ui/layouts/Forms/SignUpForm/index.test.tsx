import { waitFor, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignUpForm from ".";
import signUpAction from "@/actions/auth/signUpAction";
import { redirect } from "next/navigation";

jest.mock("@/actions/auth/signUpAction", () => jest.fn());
jest.mock("next/navigation");

function setup(jsx: React.ReactNode) {
  return {
    user: userEvent.setup(),
    ...render(jsx)
  };
}

describe("SignUpForm Componente test...", () => {
  it("Must render the form", () => {
    render(<SignUpForm />);

    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  it("Should render all the form input controls", () => {
    render(<SignUpForm />);

    expect(screen.getByRole("textbox", { name: "name-input" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "surname-input" })).toBeInTheDocument();
    expect(screen.getByRole("group")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "email-input" })).toBeInTheDocument();
    expect(screen.getByLabelText("password-input")).toBeInTheDocument();
    expect(screen.getByLabelText("repeat-input")).toBeInTheDocument();
  });

  it("Should render all default values in input fields", () => {
    render(<SignUpForm />);

    expect(screen.getByRole("textbox", { name: "name-input" })).toHaveValue("");
    expect(screen.getByRole("textbox", { name: "surname-input" })).toHaveValue("");
    expect(screen.getByRole("textbox", { name: "email-input" })).toHaveValue("");
    expect(screen.getByLabelText("password-input")).toHaveValue("");
    expect(screen.getByLabelText("repeat-input")).toHaveValue("");
  });

  it("Should render 2 roles in the role selection control", () => {
    render(<SignUpForm />);

    const radioGroup = screen.getByRole("group");

    expect(within(radioGroup).getByRole("radio", { name: "tenant-radio" })).toBeInTheDocument();
    expect(within(radioGroup).getByRole("radio", { name: "admin-radio" })).toBeInTheDocument();
  });

  it("Should check by default tenant option in role selection control", () => {
    render(<SignUpForm />);

    const radioGroup = screen.getByRole("group");

    expect(within(radioGroup).getByRole("radio", { name: "tenant-radio" })).toBeChecked();
  });

  it("Should show error messages if the fields are not corrects", async () => {
    const { user } = setup(<SignUpForm />);

    const mockAction = signUpAction as jest.Mock;
    const formData = new FormData();

    const name = "a";
    const surname = "a";
    const email = "email@email.c";
    const password = "blablalbal";
    const passRepeat = "blabuieon";

    formData.append("name", name);
    formData.append("surname", surname);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("repeat", passRepeat);

    mockAction.mockResolvedValue({
      state: "error",
      messsage: "Incorrect form data",
      errors: { name: "error", surname: "error", email: "error", password: "error", repeat: "error" },
      payload: formData
    });

    await user.type(screen.getByRole("textbox", { name: "name-input" }), name);
    await user.type(screen.getByRole("textbox", { name: "surname-input" }), surname);
    await user.type(screen.getByRole("textbox", { name: "email-input" }), email);
    await user.type(screen.getByLabelText("password-input"), password);
    await user.type(screen.getByLabelText("repeat-input"), passRepeat);
    await user.click(screen.getByRole("button"));

    expect(await screen.findAllByRole("alert")).toHaveLength(5);
    expect(screen.getByRole("textbox", { name: "name-input" })).toHaveValue("");
    expect(screen.getByRole("textbox", { name: "surname-input" })).toHaveValue("");
    expect(screen.getByRole("textbox", { name: "email-input" })).toHaveValue("");
    expect(screen.getByLabelText("password-input")).toHaveValue("");
    expect(screen.getByLabelText("repeat-input")).toHaveValue("");
  });

  it("Should keep values in every field except in passRepeat, showing and error if the passwords doesn't match", async () => {
    const { user } = setup(<SignUpForm />);

    const mockAction = signUpAction as jest.Mock;
    const formData = new FormData();

    const name = "aaaaaaaaaaaaaaaaa";
    const surname = "aaaaa";
    const email = "email@email.com";
    const password = "blablablablablablablabla";
    const passRepeat = "blablablablablablablable";

    formData.append("name", name);
    formData.append("surname", surname);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("repeat", passRepeat);

    mockAction.mockResolvedValue({
      state: "error",
      messsage: "Incorrect form data",
      errors: { repeat: "error" },
      payload: formData
    });

    await user.type(screen.getByRole("textbox", { name: "name-input" }), name);
    await user.type(screen.getByRole("textbox", { name: "surname-input" }), surname);
    await user.type(screen.getByRole("textbox", { name: "email-input" }), email);
    await user.type(screen.getByLabelText("password-input"), password);
    await user.type(screen.getByLabelText("repeat-input"), passRepeat);
    await user.click(screen.getByRole("button"));

    expect(screen.getByRole("textbox", { name: "name-input" })).toHaveValue(name);
    expect(screen.getByRole("textbox", { name: "surname-input" })).toHaveValue(surname);
    expect(screen.getByRole("textbox", { name: "email-input" })).toHaveValue(email);
    expect(screen.getByLabelText("password-input")).toHaveValue(password);
    expect(screen.getByLabelText("repeat-input")).toHaveValue("");
  });

  it("Should keep every field data if all data is correct except name which is wrong", async () => {
    const { user } = setup(<SignUpForm />);

    const mockAction = signUpAction as jest.Mock;
    const formData = new FormData();

    const name = "a";
    const surname = "aaaaaaaaaaaa";
    const email = "email@email.com";
    const password = "blablablablablablablabla";
    const passRepeat = "blablablablablablablabla";

    formData.append("name", name);
    formData.append("surname", surname);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("repeat", passRepeat);

    mockAction.mockResolvedValue({
      state: "error",
      messsage: "Incorrect form data",
      errors: { name: "error" },
      payload: formData
    });

    await user.type(screen.getByRole("textbox", { name: "name-input" }), name);
    await user.type(screen.getByRole("textbox", { name: "surname-input" }), surname);
    await user.type(screen.getByRole("textbox", { name: "email-input" }), email);
    await user.type(screen.getByLabelText("password-input"), password);
    await user.type(screen.getByLabelText("repeat-input"), passRepeat);
    await user.click(screen.getByRole("button"));

    expect(screen.getByRole("textbox", { name: "name-input" })).toHaveValue("");
    expect(screen.getByRole("textbox", { name: "surname-input" })).toHaveValue(surname);
    expect(screen.getByRole("textbox", { name: "email-input" })).toHaveValue(email);
    expect(screen.getByLabelText("password-input")).toHaveValue(password);
    expect(screen.getByLabelText("repeat-input")).toHaveValue(passRepeat);
  });

  it("Should redirect to login page if user created correctly", async () => {
    const { user } = setup(<SignUpForm />);

    const mockAction = signUpAction as jest.Mock;
    const formData = new FormData();

    const name = "aaaaaaaaaaaa";
    const surname = "aaaaaaaaaaaa";
    const email = "email@email.com";
    const password = "blablablablablablablabla";
    const passRepeat = "blablablablablablablabla";

    formData.append("name", name);
    formData.append("surname", surname);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", "tenant");
    formData.append("repeat", passRepeat);

    mockAction.mockResolvedValue({
      state: "success",
      messsage: "User created correctly",
      payload: formData
    });

    await user.type(screen.getByRole("textbox", { name: "name-input" }), name);
    await user.type(screen.getByRole("textbox", { name: "surname-input" }), surname);
    await user.type(screen.getByRole("textbox", { name: "email-input" }), email);
    await user.type(screen.getByLabelText("password-input"), password);
    await user.type(screen.getByLabelText("repeat-input"), passRepeat);
    await user.click(screen.getByRole("button"));

    await waitFor(() => expect(redirect).toHaveBeenCalledWith("/login"));
  });
});
