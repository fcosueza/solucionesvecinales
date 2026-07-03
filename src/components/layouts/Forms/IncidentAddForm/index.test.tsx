import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { addIncident } from "@/actions/community/communityIncident";
import IncidentAddForm from ".";

jest.mock("@/actions/community/communityIncident", () => ({
  addIncident: jest.fn()
}));

const addIncidentMock = addIncident as jest.MockedFunction<typeof addIncident>;

const getFormAction = (form: HTMLFormElement): ((formData: FormData) => Promise<void>) => {
  const reactPropsKey = Object.keys(form).find(key => key.startsWith("__reactProps$"));

  if (!reactPropsKey) {
    throw new Error("React props not found on form element");
  }

  return (form as any)[reactPropsKey].action;
};

describe("IncidentAddForm component test suite", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    addIncidentMock.mockResolvedValue(undefined);
  });

  it("renders the modal with its base fields", () => {
    render(<IncidentAddForm communityID={5} onClose={jest.fn()} />);

    expect(screen.getByRole("heading", { name: "Nueva incidencia" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Titulo de la incidencia")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Describe la incidencia...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancelar" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "Guardar" })).toBeEnabled();
  });

  it("closes when clicking cancel or the overlay, but not when clicking inside the popup", async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    const { container, rerender } = render(<IncidentAddForm communityID={5} onClose={onClose} />);

    await user.click(screen.getByRole("button", { name: "Cancelar" }));
    expect(onClose).toHaveBeenCalledTimes(1);

    rerender(<IncidentAddForm communityID={5} onClose={onClose} />);

    const overlay = container.firstChild as HTMLElement;
    await user.click(overlay);
    expect(onClose).toHaveBeenCalledTimes(2);

    rerender(<IncidentAddForm communityID={5} onClose={onClose} />);

    const popup = screen.getByRole("heading", { name: "Nueva incidencia" }).parentElement as HTMLElement;
    fireEvent.click(popup);
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it("submits the form, shows the pending state, and closes when the action finishes", async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    let resolveAction: (() => void) | undefined;

    addIncidentMock.mockImplementation(
      () =>
        new Promise<void>(resolve => {
          resolveAction = resolve;
        })
    );

    render(<IncidentAddForm communityID={5} onClose={onClose} />);

    await user.type(screen.getByPlaceholderText("Titulo de la incidencia"), "Ascensor averiado");
    await user.type(
      screen.getByPlaceholderText("Describe la incidencia..."),
      "El ascensor se queda bloqueado en el tercer piso."
    );

    const form = screen.getByRole("button", { name: "Guardar" }).closest("form") as HTMLFormElement;
    const action = getFormAction(form);

    let submission: Promise<void>;

    await act(async () => {
      submission = action(new FormData(form));
      await Promise.resolve();
    });

    await waitFor(() => {
      expect(addIncidentMock).toHaveBeenCalledWith(5, expect.any(FormData));
      expect(screen.getByRole("button", { name: "Guardando..." })).toBeDisabled();
      expect(screen.getByRole("button", { name: "Cancelar" })).toBeDisabled();
    });

    const [, formData] = addIncidentMock.mock.calls[0];
    expect(formData.get("titulo")).toBe("Ascensor averiado");
    expect(formData.get("descripcion")).toBe("El ascensor se queda bloqueado en el tercer piso.");
    expect(onClose).not.toHaveBeenCalled();

    await act(async () => {
      resolveAction?.();
      await submission;
    });

    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
