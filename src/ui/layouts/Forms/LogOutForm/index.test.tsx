import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LogOutForm from ".";
import logOutAction from "@/actions/auth/logOutAction";
import { redirect } from "next/navigation";

// Mock logInAction server action
jest.mock("@/actions/auth/logOutAction");
jest.mock("next/navigation");

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

    render(<LogOutForm text={questionText} />);

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

    await user.click(screen.getByRole("button", { name: "cancer-button" }));

    expect(redirect).toHaveBeenCalledTimes(1);
  });
});
