import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { addMessage } from "@/actions/community/communityMessage";
import MessageAddForm from ".";

jest.mock("react", () => {
  const actual = jest.requireActual("react");
  return {
    ...actual,
    useState: jest.fn(actual.useState)
  };
});

jest.mock("@/actions/community/communityMessage", () => ({
  addMessage: jest.fn()
}));

const addMessageMock = addMessage as jest.Mock;

describe("MessageAddForm component test suite", () => {
  beforeEach(() => {
    addMessageMock.mockResolvedValue(undefined);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should render the popup with its base content", () => {
    render(<MessageAddForm communityID={5} onClose={jest.fn()} />);

    expect(screen.getByRole("heading", { name: "Nuevo mensaje" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Escribe el mensaje...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancelar" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Publicar" })).toBeInTheDocument();
  });

  it("Should show the initial non-pending state", () => {
    render(<MessageAddForm communityID={5} onClose={jest.fn()} />);

    expect(screen.getByRole("button", { name: "Publicar" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "Cancelar" })).toBeEnabled();
  });

  it("Should show 'Publishing...' while the publication is pending", async () => {
    const setPending = jest.fn();
    (useState as jest.MockedFunction<typeof useState>).mockImplementationOnce(() => [true, setPending]);

    render(<MessageAddForm communityID={5} onClose={jest.fn()} />);

    expect(screen.getByRole("button", { name: "Publicando..." })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Cancelar" })).toBeDisabled();
  });

  it("Should close when clicking 'Cancel'", async () => {
    const onClose = jest.fn();
    render(<MessageAddForm communityID={5} onClose={onClose} />);

    await userEvent.click(screen.getByRole("button", { name: "Cancelar" }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("Should close when clicking the overlay", () => {
    const onClose = jest.fn();
    const { container } = render(<MessageAddForm communityID={5} onClose={onClose} />);

    const overlay = container.querySelector(".overlay");
    expect(overlay).not.toBeNull();

    fireEvent.click(overlay!);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("Should not close when clicking inside the popup", () => {
    const onClose = jest.fn();
    const { container } = render(<MessageAddForm communityID={5} onClose={onClose} />);

    const popup = container.querySelector(".popup");
    expect(popup).not.toBeNull();

    fireEvent.click(popup!);

    expect(onClose).not.toHaveBeenCalled();
  });

  it("Should call addMessage with communityID and FormData on submit", async () => {
    const onClose = jest.fn();
    render(<MessageAddForm communityID={3} onClose={onClose} />);

    await userEvent.type(screen.getByPlaceholderText("Escribe el mensaje..."), "Hola comunidad");
    await userEvent.click(screen.getByRole("button", { name: "Publicar" }));

    await waitFor(() => {
      expect(addMessageMock).toHaveBeenCalledWith(3, expect.any(FormData));
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  it("Should clear the textarea after publishing", async () => {
    const onClose = jest.fn();
    render(<MessageAddForm communityID={3} onClose={onClose} />);

    const textarea = screen.getByPlaceholderText("Escribe el mensaje...") as HTMLTextAreaElement;

    await userEvent.type(textarea, "Texto temporal");
    expect(textarea.value).toBe("Texto temporal");

    await userEvent.click(screen.getByRole("button", { name: "Publicar" }));

    await waitFor(() => {
      expect(addMessageMock).toHaveBeenCalledTimes(1);
      expect(textarea.value).toBe("");
    });
  });

  it("Should not fail if the textarea no longer exists when the publication finishes", async () => {
    const onClose = jest.fn();
    let resolverPublicacion: (() => void) | undefined;

    addMessageMock.mockImplementation(
      () =>
        new Promise<void>(resolve => {
          resolverPublicacion = resolve;
        })
    );

    const { unmount } = render(<MessageAddForm communityID={3} onClose={onClose} />);

    await userEvent.type(screen.getByPlaceholderText("Escribe el mensaje..."), "Mensaje temporal");
    await userEvent.click(screen.getByRole("button", { name: "Publicar" }));

    unmount();
    resolverPublicacion?.();

    await waitFor(() => {
      expect(addMessageMock).toHaveBeenCalledTimes(1);
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
