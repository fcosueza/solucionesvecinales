import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { communityFinance } from "@/actions/community/communityFinance";
import FinanceAddForm from ".";

jest.mock("@/actions/community/communityFinance", () => ({
  communityFinance: jest.fn()
}));

const communityFinanceMock = communityFinance as jest.MockedFunction<typeof communityFinance>;

const getFormAction = (form: HTMLFormElement): ((formData: FormData) => Promise<void>) => {
  const reactPropsKey = Object.keys(form).find(key => key.startsWith("__reactProps$"));

  if (!reactPropsKey) {
    throw new Error("React props not found on form element");
  }

  return (form as any)[reactPropsKey].action;
};

describe("FinanceAddForm component test suite", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    communityFinanceMock.mockResolvedValue(undefined);
  });

  it("renders the modal with its base fields", () => {
    render(<FinanceAddForm communityID={8} onClose={jest.fn()} />);

    expect(screen.getByRole("heading", { name: "Nuevo registro" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Descripcion del registro")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Importe")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveValue("gasto");
    expect(screen.getByRole("button", { name: "Cancelar" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "Guardar" })).toBeEnabled();
  });

  it("closes when clicking cancel or the overlay, but not when clicking inside the popup", async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    const { container, rerender } = render(<FinanceAddForm communityID={8} onClose={onClose} />);

    await user.click(screen.getByRole("button", { name: "Cancelar" }));
    expect(onClose).toHaveBeenCalledTimes(1);

    rerender(<FinanceAddForm communityID={8} onClose={onClose} />);

    const overlay = container.firstChild as HTMLElement;
    await user.click(overlay);
    expect(onClose).toHaveBeenCalledTimes(2);

    rerender(<FinanceAddForm communityID={8} onClose={onClose} />);

    const popup = screen.getByRole("heading", { name: "Nuevo registro" }).parentElement as HTMLElement;
    fireEvent.click(popup);
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it("submits the form, shows the pending state, and closes when the action finishes", async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    let resolveAction: (() => void) | undefined;

    communityFinanceMock.mockImplementation(
      () =>
        new Promise<void>(resolve => {
          resolveAction = resolve;
        })
    );

    render(<FinanceAddForm communityID={8} onClose={onClose} />);

    await user.type(screen.getByPlaceholderText("Descripcion del registro"), "Factura ascensor");
    await user.type(screen.getByPlaceholderText("Importe"), "45.50");
    await user.selectOptions(screen.getByRole("combobox"), "ingreso");

    const form = screen.getByRole("button", { name: "Guardar" }).closest("form") as HTMLFormElement;
    const action = getFormAction(form);

    let submission: Promise<void>;

    await act(async () => {
      submission = action(new FormData(form));
      await Promise.resolve();
    });

    await waitFor(() => {
      expect(communityFinanceMock).toHaveBeenCalledWith(8, expect.any(FormData));
      expect(screen.getByRole("button", { name: "Guardando..." })).toBeDisabled();
      expect(screen.getByRole("button", { name: "Cancelar" })).toBeDisabled();
    });

    const [, formData] = communityFinanceMock.mock.calls[0];
    expect(formData.get("descripcion")).toBe("Factura ascensor");
    expect(formData.get("importe")).toBe("45.5");
    expect(formData.get("tipo")).toBe("ingreso");
    expect(onClose).not.toHaveBeenCalled();

    await act(async () => {
      resolveAction?.();
      await submission;
    });

    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  it("submits the default payment type when the select is not changed", async () => {
    const user = userEvent.setup();

    render(<FinanceAddForm communityID={8} onClose={jest.fn()} />);

    await user.type(screen.getByPlaceholderText("Descripcion del registro"), "Limpieza portal");
    await user.type(screen.getByPlaceholderText("Importe"), "18.75");

    const form = screen.getByRole("button", { name: "Guardar" }).closest("form") as HTMLFormElement;
    const action = getFormAction(form);

    await act(async () => {
      await action(new FormData(form));
    });

    await waitFor(() => {
      expect(communityFinanceMock).toHaveBeenCalledWith(8, expect.any(FormData));
    });

    const [, formData] = communityFinanceMock.mock.calls[0];
    expect(formData.get("tipo")).toBe("gasto");
  });
});
