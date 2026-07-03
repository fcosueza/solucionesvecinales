import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LogOutForm from ".";
import logOut from "@/actions/auth/logOut";
import { useRouter as enrutadorMock } from "next/navigation";

// Simula la Server Action logOutAction.
jest.mock("@/actions/auth/logOut");

// Simulates the useRouter module.
jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useRouter: jest.fn()
}));

// Add the back method to the useRouter mock.
(enrutadorMock as jest.Mock).mockReturnValue({
  back: jest.fn()
});

function configurar(jsx: React.ReactNode) {
  return {
    user: userEvent.setup(),
    ...render(jsx)
  };
}

describe("LogOutForm component test suite", () => {
  it("Should render the form element correctly", () => {
    render(<LogOutForm />);

    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  it("Should render the question text correctly", () => {
    const questionText = "Do you really want to log out?";

    render(<LogOutForm questionText={questionText} />);

    expect(screen.getByText(questionText)).toBeInTheDocument();
  });

  it("Should render two buttons to confirm or cancel the action", () => {
    render(<LogOutForm />);

    expect(screen.getAllByRole("button")).toHaveLength(2);
    expect(screen.getByRole("button", { name: "Yes" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "No" })).toBeInTheDocument();
  });

  it("Should call the server action when the confirm button is clicked", async () => {
    const { user } = configurar(<LogOutForm />);

    await user.click(screen.getByRole("button", { name: "Yes" }));

    expect(logOut).toHaveBeenCalled();
  });

  it("Should call useRouter when the cancel button is clicked", async () => {
    const { user } = configurar(<LogOutForm />);
    const router = enrutadorMock();

    await user.click(screen.getByRole("button", { name: "No" }));
    expect(router.back).toHaveBeenCalled();
  });

  it("Should render the text passed as props for question and buttons", async () => {
    const questionText = "Testing question?";
    const confirmText = "Agreed";
    const cancelText = "No Agreed";

    render(<LogOutForm questionText={questionText} confirmText={confirmText} cancelText={cancelText} />);

    expect(screen.getByText(questionText)).toBeInTheDocument();
    expect(screen.getByText(confirmText)).toBeInTheDocument();
    expect(screen.getByText(cancelText)).toBeInTheDocument();
  });
});
