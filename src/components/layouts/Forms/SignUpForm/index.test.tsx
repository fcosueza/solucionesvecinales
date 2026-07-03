import { waitFor, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignUpForm from ".";
import { useRouter } from "next/navigation";
import signUp from "@/actions/auth/signUp";
import { toast } from "sonner";

jest.mock("@/actions/auth/signUp", () => jest.fn());
jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn()
}));

function configurar(jsx: React.ReactNode) {
  return {
    user: userEvent.setup(),
    ...render(jsx)
  };
}

describe("SignUpForm component test suite", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
  });

  it("Should render the form", () => {
    render(<SignUpForm />);

    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  it("Should render all form fields", () => {
    render(<SignUpForm />);

    expect(screen.getByRole("textbox", { name: "name-input" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "surname-input" })).toBeInTheDocument();
    expect(screen.getByRole("group")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "email-input" })).toBeInTheDocument();
    expect(screen.getByLabelText("password-input")).toBeInTheDocument();
    expect(screen.getByLabelText("repeat-input")).toBeInTheDocument();
  });

  it("Should render all default values in the fields", () => {
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

  it("Should mark the tenant option by default in the role selection control", () => {
    render(<SignUpForm />);

    const radioGroup = screen.getByRole("group");

    expect(within(radioGroup).getByRole("radio", { name: "tenant-radio" })).toBeChecked();
  });

  it("Should display error messages if the fields are incorrect", async () => {
    const { user } = configurar(<SignUpForm />);

    const accionMock = signUp as jest.Mock;
    const formData = new FormData();

    const name = "a";
    const surname = "a";
    const email = "email@email.c";
    const password = "blablalbal";
    const repetarPassword = "blabuieon";

    formData.append("name", name);
    formData.append("surname", surname);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("repeat", repetarPassword);

    accionMock.mockResolvedValue({
      state: "error",
      message: "Incorrect form data",
      errors: { name: "error", surname: "error", email: "error", password: "error", repeat: "error" },
      payload: formData
    });

    await user.type(screen.getByRole("textbox", { name: "name-input" }), name);
    await user.type(screen.getByRole("textbox", { name: "surname-input" }), surname);
    await user.type(screen.getByRole("textbox", { name: "email-input" }), email);
    await user.type(screen.getByLabelText("password-input"), password);
    await user.type(screen.getByLabelText("repeat-input"), repetarPassword);
    await user.click(screen.getByRole("button"));

    expect(await screen.findAllByRole("alert")).toHaveLength(5);
    await waitFor(() => {
      expect(screen.getByRole("textbox", { name: "name-input" })).toHaveValue("");
      expect(screen.getByRole("textbox", { name: "surname-input" })).toHaveValue("");
      expect(screen.getByRole("textbox", { name: "email-input" })).toHaveValue("");
      expect(screen.getByLabelText("password-input")).toHaveValue("");
      expect(screen.getByLabelText("repeat-input")).toHaveValue("");
    });
  });

  it("Should maintain values in all fields except repeatPassword, showing error if passwords do not match", async () => {
    const { user } = configurar(<SignUpForm />);

    const accionMock = signUp as jest.Mock;
    const formData = new FormData();

    const name = "aaaaaaaaaaaaaaaaa";
    const surname = "aaaaa";
    const email = "email@email.com";
    const password = "blablablablablablablabla";
    const repeatPassword = "blablablablablablablable";

    formData.append("name", name);
    formData.append("surname", surname);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("repeat", repeatPassword);

    accionMock.mockResolvedValue({
      state: "error",
      message: "Incorrect form data",
      errors: { repeat: "error" },
      payload: formData
    });

    await user.type(screen.getByRole("textbox", { name: "name-input" }), name);
    await user.type(screen.getByRole("textbox", { name: "surname-input" }), surname);
    await user.type(screen.getByRole("textbox", { name: "email-input" }), email);
    await user.type(screen.getByLabelText("password-input"), password);
    await user.type(screen.getByLabelText("repeat-input"), repeatPassword);
    await user.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByRole("textbox", { name: "name-input" })).toHaveValue(name);
      expect(screen.getByRole("textbox", { name: "surname-input" })).toHaveValue(surname);
      expect(screen.getByRole("textbox", { name: "email-input" })).toHaveValue(email);
      expect(screen.getByLabelText("password-input")).toHaveValue("");
      expect(screen.getByLabelText("repeat-input")).toHaveValue("");
    });
  });

  it("Should maintain all field values if all are correct except name which is incorrect", async () => {
    const { user } = configurar(<SignUpForm />);

    const accionMock = signUp as jest.Mock;
    const formData = new FormData();

    const name = "a";
    const surname = "aaaaaaaaaaaa";
    const email = "email@email.com";
    const password = "blablablablablablablabla";
    const repeatPassword = "blablablablablablablabla";

    formData.append("name", name);
    formData.append("surname", surname);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("repeat", repeatPassword);

    accionMock.mockResolvedValue({
      state: "error",
      message: "Incorrect form data",
      errors: { name: "error" },
      payload: formData
    });

    await user.type(screen.getByRole("textbox", { name: "name-input" }), name);
    await user.type(screen.getByRole("textbox", { name: "surname-input" }), surname);
    await user.type(screen.getByRole("textbox", { name: "email-input" }), email);
    await user.type(screen.getByLabelText("password-input"), password);
    await user.type(screen.getByLabelText("repeat-input"), repeatPassword);
    await user.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByRole("textbox", { name: "name-input" })).toHaveValue("");
      expect(screen.getByRole("textbox", { name: "surname-input" })).toHaveValue(surname);
      expect(screen.getByRole("textbox", { name: "email-input" })).toHaveValue(email);
      expect(screen.getByLabelText("password-input")).toHaveValue("");
      expect(screen.getByLabelText("repeat-input")).toHaveValue("");
    });
  });

  it("Should redirect to the login page if the user is created successfully", async () => {
    const pushMock = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

    const { user } = configurar(<SignUpForm />);

    const accionMock = signUp as jest.Mock;
    const formData = new FormData();

    const name = "aaaaaaaaaaaa";
    const surname = "aaaaaaaaaaaa";
    const email = "email@email.com";
    const password = "blablablablablablablabla";
    const repeatPassword = "blablablablablablablabla";

    formData.append("name", name);
    formData.append("surname", surname);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", "inquilino");
    formData.append("repeat", repeatPassword);

    accionMock.mockResolvedValue({
      state: "success",
      message: "User created correctly",
      payload: formData
    });

    await user.type(screen.getByRole("textbox", { name: "name-input" }), name);
    await user.type(screen.getByRole("textbox", { name: "surname-input" }), surname);
    await user.type(screen.getByRole("textbox", { name: "email-input" }), email);
    await user.type(screen.getByLabelText("password-input"), password);
    await user.type(screen.getByLabelText("repeat-input"), repeatPassword);
    await user.click(screen.getByRole("button"));

    await waitFor(() => expect(pushMock).toHaveBeenCalledWith("/login"));
  });

  it("Should call toast.error with the message when the action returns an error", async () => {
    const { user } = configurar(<SignUpForm />);

    const accionMock = signUp as jest.Mock;
    const message = "Error al crear el usuario";

    accionMock.mockResolvedValue({
      state: "error",
      message: message
    });

    await user.type(screen.getByRole("textbox", { name: "name-input" }), "NombreValido");
    await user.type(screen.getByRole("textbox", { name: "surname-input" }), "ApellidoValido");
    await user.type(screen.getByRole("textbox", { name: "email-input" }), "test@email.com");
    await user.type(screen.getByLabelText("password-input"), "password123456");
    await user.type(screen.getByLabelText("repeat-input"), "password123456");
    await user.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(message);
    });
  });

  it("Should call toast.success with the message when the user is created successfully", async () => {
    const { user } = configurar(<SignUpForm />);

    const accionMock = signUp as jest.Mock;
    const message = "Usuario creado correctamente";

    accionMock.mockResolvedValue({
      state: "success",
      message: message
    });

    await user.type(screen.getByRole("textbox", { name: "name-input" }), "NombreValido");
    await user.type(screen.getByRole("textbox", { name: "surname-input" }), "ApellidoValido");
    await user.type(screen.getByRole("textbox", { name: "email-input" }), "test@email.com");
    await user.type(screen.getByLabelText("password-input"), "password123456");
    await user.type(screen.getByLabelText("repeat-input"), "password123456");
    await user.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(message);
    });
  });
});
