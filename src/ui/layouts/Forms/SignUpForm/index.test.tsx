import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignUpForm from ".";

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
    render(<SignUpForm />);

    const name = "a";
    const surname = "a";
    const email = "email@email.c";
    const password = "blablalbal";
    const passRepeat = "blabuieon";

    await userEvent.type(screen.getByRole("textbox", { name: "name-input" }), name);
    await userEvent.type(screen.getByRole("textbox", { name: "surname-input" }), surname);
    await userEvent.type(screen.getByRole("textbox", { name: "email-input" }), email);
    await userEvent.type(screen.getByLabelText("password-input"), password);
    await userEvent.type(screen.getByLabelText("repeat-input"), passRepeat);
    await userEvent.click(screen.getByRole("button"));

    expect(screen.getAllByRole("alert")).toHaveLength(5);
    expect(screen.getByRole("textbox", { name: "name-input" })).toHaveValue("");
    expect(screen.getByRole("textbox", { name: "surname-input" })).toHaveValue("");
    expect(screen.getByRole("textbox", { name: "email-input" })).toHaveValue("");
    expect(screen.getByLabelText("password-input")).toHaveValue("");
    expect(screen.getByLabelText("repeat-input")).toHaveValue("");
  });

  it("Should keep values in every field except in passRepeat, showing and error if the passwords doesn't match", async () => {
    render(<SignUpForm />);

    const name = "aaaaaaaaaaaaaaaaa";
    const surname = "aaaaa";
    const email = "email@email.com";
    const password = "blablablablablablablabla";
    const passRepeat = "blablablablablablablable";

    await userEvent.type(screen.getByRole("textbox", { name: "name-input" }), name);
    await userEvent.type(screen.getByRole("textbox", { name: "surname-input" }), surname);
    await userEvent.type(screen.getByRole("textbox", { name: "email-input" }), email);
    await userEvent.type(screen.getByLabelText("password-input"), password);
    await userEvent.type(screen.getByLabelText("repeat-input"), passRepeat);
    await userEvent.click(screen.getByRole("button"));

    expect(screen.getByRole("textbox", { name: "name-input" })).toHaveValue(name);
    expect(screen.getByRole("textbox", { name: "surname-input" })).toHaveValue(surname);
    expect(screen.getByRole("textbox", { name: "email-input" })).toHaveValue(email);
    expect(screen.getByLabelText("password-input")).toHaveValue(password);
    expect(screen.getByLabelText("repeat-input")).toHaveValue("");
  });

  it("Should keep every field data if all data is correct except name which is wrong", async () => {
    render(<SignUpForm />);

    const name = "a";
    const surname = "aaaaaaaaaaaa";
    const email = "email@email.com";
    const password = "blablablablablablablabla";
    const passRepeat = "blablablablablablablabla";

    await userEvent.type(screen.getByRole("textbox", { name: "name-input" }), name);
    await userEvent.type(screen.getByRole("textbox", { name: "surname-input" }), surname);
    await userEvent.type(screen.getByRole("textbox", { name: "email-input" }), email);
    await userEvent.type(screen.getByLabelText("password-input"), password);
    await userEvent.type(screen.getByLabelText("repeat-input"), passRepeat);
    await userEvent.click(screen.getByRole("button"));

    expect(screen.getByRole("textbox", { name: "name-input" })).toHaveValue("");
    expect(screen.getByRole("textbox", { name: "surname-input" })).toHaveValue(surname);
    expect(screen.getByRole("textbox", { name: "email-input" })).toHaveValue(email);
    expect(screen.getByLabelText("password-input")).toHaveValue(password);
    expect(screen.getByLabelText("repeat-input")).toHaveValue(passRepeat);
  });
});
