import { render, screen } from "@testing-library/react";
import { useActionState } from "react";
import { deleteUser } from "@/actions/user";
import { FormActionState } from "@/types";
import UserDeleteForm from ".";

jest.mock("react", () => {
  const actual = jest.requireActual("react");
  return {
    ...actual,
    useActionState: jest.fn(actual.useActionState)
  };
});

jest.mock("@/actions/user", () => ({
  deleteUser: jest.fn()
}));

const mockUseActionState = useActionState as unknown as jest.Mock;
const deleteUserMock = deleteUser as jest.MockedFunction<typeof deleteUser>;

const baseState: FormActionState = {
  state: "error",
  message: ""
};

describe("UserDeleteForm component test suite", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseActionState.mockImplementation(() => [baseState, jest.fn()]);
  });

  it("renders hidden id and submit button with default class and no feedback message", () => {
    render(<UserDeleteForm userId="9" />);

    expect(screen.getByDisplayValue("9")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Eliminar" })).toBeInTheDocument();
    expect(screen.queryByText("Usuario eliminado")).not.toBeInTheDocument();
    expect(screen.queryByText("No se pudo eliminar")).not.toBeInTheDocument();
  });

  it("applies custom button class name", () => {
    render(<UserDeleteForm userId="10" deleteClassName="dangerBtn" />);

    expect(screen.getByRole("button", { name: "Eliminar" })).toHaveClass("dangerBtn");
  });

  it("shows success feedback in green", () => {
    mockUseActionState.mockReturnValueOnce([
      {
        state: "success",
        message: "Usuario eliminado"
      },
      jest.fn()
    ]);

    render(<UserDeleteForm userId="11" />);

    const message = screen.getByText("Usuario eliminado");
    expect(message).toBeInTheDocument();
    expect(message).toHaveStyle({ color: "green" });
  });

  it("shows error feedback in red", () => {
    mockUseActionState.mockReturnValueOnce([
      {
        state: "error",
        message: "No se pudo eliminar"
      },
      jest.fn()
    ]);

    render(<UserDeleteForm userId="12" />);

    const message = screen.getByText("No se pudo eliminar");
    expect(message).toBeInTheDocument();
    expect(message).toHaveStyle({ color: "red" });
  });

  it("forwards previous state and form data to deleteUser through useActionState callback", async () => {
    let actionCallback: ((prev: FormActionState, formData: FormData) => Promise<FormActionState>) | undefined;

    mockUseActionState.mockImplementation(
      (action: (prev: FormActionState, formData: FormData) => Promise<FormActionState>) => {
        actionCallback = action;
        return [baseState, jest.fn()];
      }
    );

    deleteUserMock.mockResolvedValue({
      state: "success",
      message: "ok"
    } as FormActionState);

    render(<UserDeleteForm userId="13" />);

    const prevState: FormActionState = { state: "error", message: "prev" };
    const formData = new FormData();
    formData.append("id", "13");

    const result = await actionCallback?.(prevState, formData);

    expect(deleteUserMock).toHaveBeenCalledWith(prevState, formData);
    expect(result).toEqual({ state: "success", message: "ok" });
  });
});
