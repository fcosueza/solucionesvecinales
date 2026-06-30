import { render, screen, waitFor } from "@testing-library/react";
import { within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ReservationCard from ".";
import { deleteReservation } from "@/actions/community/communityReservation";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

jest.mock("@/actions/community/communityReservation", () => ({
  deleteReservation: jest.fn()
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn()
}));

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}));

describe("ReservationCard component test suite", () => {
  const mockRefresh = jest.fn();

  const baseProps = {
    reservationID: 12,
    communityID: 7,
    zona: "Piscina",
    fecha: "01/07/2026",
    horario: "10:00 - 11:00"
  };

  const mockDeleteReservation = deleteReservation as jest.MockedFunction<typeof deleteReservation>;
  const mockUseRouter = useRouter as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseRouter.mockReturnValue({
      refresh: mockRefresh
    });

    mockDeleteReservation.mockResolvedValue({
      state: "error",
      message: "fallback"
    });
  });

  it("should render reservation details while confirmation dialog is closed", () => {
    render(<ReservationCard {...baseProps} />);

    expect(screen.getByText(baseProps.zona)).toBeInTheDocument();
    expect(screen.getByText(baseProps.fecha)).toBeInTheDocument();
    expect(screen.getByText(baseProps.horario)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancelar reserva" })).toBeInTheDocument();
    expect(screen.queryByRole("dialog", { name: "Cancelar reserva" })).not.toBeInTheDocument();
  });

  it("should open the confirmation dialog when cancel button is clicked", async () => {
    const user = userEvent.setup();

    render(<ReservationCard {...baseProps} />);

    await user.click(screen.getByRole("button", { name: "Cancelar reserva" }));

    const dialog = screen.getByRole("dialog", { name: "Cancelar reserva" });
    expect(dialog).toBeInTheDocument();

    const dialogContent = within(dialog);
    expect(dialogContent.getByText(baseProps.zona, { selector: "strong" })).toBeInTheDocument();
    expect(dialogContent.getByText(new RegExp(baseProps.fecha.replaceAll("/", "\\/")))).toBeInTheDocument();
    expect(dialogContent.getByText(new RegExp(baseProps.horario))).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Volver" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sí, cancelar" })).toBeInTheDocument();
  });

  it("should close the confirmation dialog when Volver is clicked", async () => {
    const user = userEvent.setup();

    render(<ReservationCard {...baseProps} />);

    await user.click(screen.getByRole("button", { name: "Cancelar reserva" }));
    expect(screen.getByRole("dialog", { name: "Cancelar reserva" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Volver" }));

    expect(screen.queryByRole("dialog", { name: "Cancelar reserva" })).not.toBeInTheDocument();
  });

  it("should close the confirmation dialog when overlay is clicked", async () => {
    const user = userEvent.setup();
    const { container } = render(<ReservationCard {...baseProps} />);

    await user.click(screen.getByRole("button", { name: "Cancelar reserva" }));

    const overlay = container.querySelector('[class*="overlay"]') as HTMLElement;
    await user.click(overlay);

    expect(screen.queryByRole("dialog", { name: "Cancelar reserva" })).not.toBeInTheDocument();
  });

  it("should keep the dialog open when clicking inside the popup", async () => {
    const user = userEvent.setup();

    render(<ReservationCard {...baseProps} />);

    await user.click(screen.getByRole("button", { name: "Cancelar reserva" }));
    await user.click(screen.getByRole("heading", { name: "Cancelar reserva" }));

    expect(screen.getByRole("dialog", { name: "Cancelar reserva" })).toBeInTheDocument();
  });

  it("should cancel the reservation successfully", async () => {
    const user = userEvent.setup();

    mockDeleteReservation.mockResolvedValue({
      state: "success",
      message: "Reserva cancelada correctamente"
    });

    render(<ReservationCard {...baseProps} />);

    await user.click(screen.getByRole("button", { name: "Cancelar reserva" }));
    await user.click(screen.getByRole("button", { name: "Sí, cancelar" }));

    await waitFor(() => {
      expect(mockDeleteReservation).toHaveBeenCalledWith(baseProps.reservationID, baseProps.communityID);
    });

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Reserva cancelada correctamente");
      expect(mockRefresh).toHaveBeenCalledTimes(1);
    });
  });

  it("should show an error and close the dialog when cancellation fails", async () => {
    const user = userEvent.setup();

    mockDeleteReservation.mockResolvedValue({
      state: "error",
      message: "No se pudo cancelar la reserva"
    });

    render(<ReservationCard {...baseProps} />);

    await user.click(screen.getByRole("button", { name: "Cancelar reserva" }));
    await user.click(screen.getByRole("button", { name: "Sí, cancelar" }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("No se pudo cancelar la reserva");
    });

    expect(mockRefresh).not.toHaveBeenCalled();
    expect(screen.queryByRole("dialog", { name: "Cancelar reserva" })).not.toBeInTheDocument();
  });

  it("should keep the dialog open and block overlay close while cancellation is pending", async () => {
    const user = userEvent.setup();
    let resolveDelete: ((value: { state: "error"; message: string }) => void) | undefined;

    mockDeleteReservation.mockImplementation(
      () =>
        new Promise(resolve => {
          resolveDelete = resolve;
        })
    );

    const { container } = render(<ReservationCard {...baseProps} />);

    await user.click(screen.getByRole("button", { name: "Cancelar reserva" }));
    await user.click(screen.getByRole("button", { name: "Sí, cancelar" }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Cancelando..." })).toBeDisabled();
      expect(screen.getByRole("button", { name: "Volver" })).toBeDisabled();
    });

    const overlay = container.querySelector('[class*="overlay"]') as HTMLElement;
    await user.click(overlay);

    expect(screen.getByRole("dialog", { name: "Cancelar reserva" })).toBeInTheDocument();

    resolveDelete?.({ state: "error", message: "No se pudo cancelar la reserva" });

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("No se pudo cancelar la reserva");
    });
  });
});
