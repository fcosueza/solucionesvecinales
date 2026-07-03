import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LogInForm from ".";
import logIn from "@/actions/auth/logIn";
import { toast } from "sonner";

const pushMock = jest.fn();

// Simula la Server Action logInAction
jest.mock("@/actions/auth/logIn", () => jest.fn());
jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock
  })
}));

function configurar(jsx: React.ReactNode) {
  return {
    user: userEvent.setup(),
    ...render(jsx)
  };
}

describe("LogInForm component test suite", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    pushMock.mockReset();
  });

  it("Should render the form correctly", () => {
    render(<LogInForm />);

    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  it("Should render the fields for entering email and password", () => {
    render(<LogInForm />);

    expect(screen.getByRole("textbox", { name: "email-input" })).toBeInTheDocument();
    expect(screen.getByLabelText("password-input")).toBeInTheDocument();
  });

  it("Should update the input fields as the user types", async () => {
    const { user } = configurar(<LogInForm />);

    const email = "testname@email.com";
    const password = "asssssssasasdsdasdasdasas";

    const inputEmail = screen.getByRole("textbox", { name: "email-input" });
    const inputPassword = screen.getByLabelText("password-input");

    await user.type(inputEmail, email);
    await user.type(inputPassword, password);

    expect(inputEmail).toHaveValue(email);
    expect(inputPassword).toHaveValue(password);
  });

  it("Should show an error message if the email is incorrect", async () => {
    const { user } = configurar(<LogInForm />);

    const actionMock = logIn as jest.Mock;
    const formaData = new FormData();

    const email = "testname@email.c";
    const password = "asssssssasasdsdasdasdasas";

    const inputEmail = screen.getByRole("textbox", { name: "email-input" });
    const inputPassword = screen.getByLabelText("password-input");

    formaData.append("email", email);
    formaData.append("password", password);

    actionMock.mockResolvedValue({
      state: "error",
      message: "Incorrect form data",
      errors: {
        email: "email incorrecto"
      },
      payload: formaData
    });

    await user.type(inputEmail, email);
    await user.type(inputPassword, password);
    await user.click(screen.getByRole("button"));

    expect(await screen.findByRole("alert")).toBeInTheDocument();
    await waitFor(() => {
      expect(inputEmail).toHaveValue("");
      expect(inputPassword).toHaveValue("");
    });
  });

  it("Should show an error message if the password is incorrect", async () => {
    const { user } = configurar(<LogInForm />);

    const actionMock = logIn as jest.Mock;
    const formaData = new FormData();
    const email = "testname@email.com";
    const password = "as";

    const inputEmail = screen.getByRole("textbox", { name: "email-input" });
    const inputPassword = screen.getByLabelText("password-input");

    formaData.append("email", email);
    formaData.append("password", password);

    actionMock.mockResolvedValue({
      state: "error",
      message: "Incorrect form data",
      errors: {
        password: "password incorrecto"
      },
      payload: formaData
    });

    await user.type(inputEmail, email);
    await user.type(inputPassword, password);
    await user.click(screen.getByRole("button"));

    expect(await screen.findByRole("alert")).toBeInTheDocument();
    await waitFor(() => {
      expect(inputPassword).toHaveValue("");
      expect(inputEmail).toHaveValue(email);
    });
  });

  it("Should call toast.error with the message when the action returns an error", async () => {
    const { user } = configurar(<LogInForm />);

    const actionMock = logIn as jest.Mock;
    const message = "Credenciales incorrectas";

    actionMock.mockResolvedValue({
      state: "error",
      message: message
    });

    await user.type(screen.getByRole("textbox", { name: "email-input" }), "test@email.com");
    await user.type(screen.getByLabelText("password-input"), "password123");
    await user.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(message);
    });
  });

  it("Should call toast.success with the message when the action returns success", async () => {
    const { user } = configurar(<LogInForm />);

    const actionMock = logIn as jest.Mock;
    const message = "Sesión iniciada correctamente";

    actionMock.mockResolvedValue({
      state: "success",
      message: message
    });

    await user.type(screen.getByRole("textbox", { name: "email-input" }), "test@email.com");
    await user.type(screen.getByLabelText("password-input"), "password123");
    await user.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(message);
    });
  });

  it("Should redirect to the back office when the action returns redirectTo for webAdmin", async () => {
    const { user } = configurar(<LogInForm />);

    const actionMock = logIn as jest.Mock;

    actionMock.mockResolvedValue({
      state: "success",
      message: "Sesión iniciada correctamente",
      redirectTo: "/backoffice/overview"
    });

    await user.type(screen.getByRole("textbox", { name: "email-input" }), "webadmin@vecinos.local");
    await user.type(screen.getByLabelText("password-input"), "password123");
    await user.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/backoffice/overview");
    });
  });
});
