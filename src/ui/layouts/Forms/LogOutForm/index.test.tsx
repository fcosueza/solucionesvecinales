import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LogOutForm from ".";
import logOutAction from "@/actions/auth/logOutAction";
import { useRouter as mockUseRouter } from "next/router";

// Mock logInAction server action
jest.mock("@/actions/auth/logOutAction");

// Mock useRouter module
jest.mock("next/router", () => ({
  ...jest.requireActual("next/router"),
  useRouter: jest.fn()
}));

// Adding method push to our useRouter mock
(mockUseRouter as jest.Mock).mockReturnValue({
  back: jest.fn()
});
function setup(jsx: React.ReactNode) {
  return {
    user: userEvent.setup(),
    ...render(jsx)
  };
}

describe("LogOutForm component test suite...", () => {
  it("Should render the form element correctly", () => {
    render(<LogOutForm />);

    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  it("Should render the question text correctly", () => {
    const questionText = "¿Quieres cerrar sesión realmente?";

    render(<LogOutForm questionText={questionText} />);

    expect(screen.getByText(questionText)).toBeInTheDocument();
  });

  it("Should render two buttons to confirm action", () => {
    render(<LogOutForm />);

    expect(screen.getAllByRole("button")).toHaveLength(2);
    expect(screen.getByRole("button", { name: "confirm-button" })).toHaveLength(2);
    expect(screen.getByRole("button", { name: "cancel-button" })).toHaveLength(2);
  });

  it("Should call server action if the confirm button is clicked", async () => {
    const { user } = setup(<LogOutForm />);

    await user.click(screen.getByRole("button", { name: "confirm-button" }));

    expect(logOutAction).toHaveBeenCalledTimes(1);
  });

  it("Should call redirect if the cancel button is clicked", async () => {
    const { user } = setup(<LogOutForm />);
    const router = mockUseRouter();

    await user.click(screen.getByRole("button", { name: "cancer-button" }));

    expect(router.back).toHaveBeenCalledTimes(1);
  });
});
