import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CommonAreaReservationForm from ".";
import { reserveCommonArea } from "@/actions/community/communityReservation";
import { buildAllowedReservationDates } from "@/lib/reservations";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

jest.mock("@/actions/community/communityReservation", () => ({
  reserveCommonArea: jest.fn()
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

jest.mock("@/lib/reservations", () => {
  const actual = jest.requireActual("@/lib/reservations");

  return {
    ...actual,
    buildAllowedReservationDates: jest.fn(() => actual.buildAllowedReservationDates())
  };
});

describe("CommonAreaReservationForm component test suite", () => {
  const mockRefresh = jest.fn();
  const mockOnClose = jest.fn();
  const allowedDates = buildAllowedReservationDates();
  const firstAllowedDate = allowedDates[0];

  const baseProps = {
    communityID: 10,
    zoneName: "Piscina",
    openingHour: 8,
    closingHour: 12,
    existingReservations: [
      {
        date: firstAllowedDate,
        startHour: 9,
        endHour: 10
      }
    ],
    onClose: mockOnClose
  };

  const mockReserveCommonArea = reserveCommonArea as jest.MockedFunction<typeof reserveCommonArea>;
  const mockBuildAllowedReservationDates = buildAllowedReservationDates as jest.MockedFunction<
    typeof buildAllowedReservationDates
  >;
  const mockUseRouter = useRouter as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseRouter.mockReturnValue({
      refresh: mockRefresh
    });

    mockReserveCommonArea.mockResolvedValue({
      state: "error",
      message: "fallback"
    });

    mockBuildAllowedReservationDates.mockImplementation(() => allowedDates);
  });

  it("should compute occupied hours and render available start slots", () => {
    render(<CommonAreaReservationForm {...baseProps} />);

    expect(screen.getByText("Quedan 3 turnos de inicio disponibles para este día.")).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "08:00" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "10:00" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "11:00" })).toBeInTheDocument();
  });

  it("should reset selected start hour when duration changes and current hour is no longer available", async () => {
    const user = userEvent.setup();

    render(<CommonAreaReservationForm {...baseProps} />);

    const startSelect = screen.getByLabelText("Hora de inicio") as HTMLSelectElement;
    expect(startSelect.value).toBe("8");

    await user.selectOptions(screen.getByLabelText("Duración"), "2");

    await waitFor(() => {
      expect(startSelect.value).toBe("10");
    });
  });

  it("should update selected date when user changes date", async () => {
    const user = userEvent.setup();

    render(<CommonAreaReservationForm {...baseProps} />);

    const nextDate = allowedDates[1];
    const dateSelect = screen.getByLabelText("Fecha") as HTMLSelectElement;

    await user.selectOptions(dateSelect, nextDate);

    expect(dateSelect.value).toBe(nextDate);
  });

  it("should update selected start hour when user changes start hour", async () => {
    const user = userEvent.setup();

    render(<CommonAreaReservationForm {...baseProps} />);

    const startSelect = screen.getByLabelText("Hora de inicio") as HTMLSelectElement;

    await user.selectOptions(startSelect, "10");

    expect(startSelect.value).toBe("10");
  });

  it("should handle empty availability and show empty-state message", async () => {
    const user = userEvent.setup();

    render(
      <CommonAreaReservationForm
        {...baseProps}
        openingHour={9}
        closingHour={10}
        existingReservations={[
          {
            date: firstAllowedDate,
            startHour: 9,
            endHour: 10
          }
        ]}
      />
    );

    await waitFor(() => {
      expect(screen.getByLabelText("Hora de inicio")).toBeDisabled();
    });

    expect(screen.getByRole("option", { name: "Sin disponibilidad" })).toBeInTheDocument();
    expect(screen.getByText("No quedan turnos libres con esa duración en la fecha seleccionada.")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Confirmar reserva" }));
    expect(mockReserveCommonArea).not.toHaveBeenCalled();
  });

  it("should show validation toast when start hour is empty and skip submit", async () => {
    const user = userEvent.setup();

    mockReserveCommonArea.mockResolvedValue({
      state: "error",
      message: "should-not-be-used"
    });

    mockBuildAllowedReservationDates.mockReturnValue([]);

    render(<CommonAreaReservationForm {...baseProps} />);

    await user.click(screen.getByRole("button", { name: "Confirmar reserva" }));

    expect(toast.error).toHaveBeenCalledWith("No hay horas disponibles para esta combinación");
    expect(mockReserveCommonArea).not.toHaveBeenCalled();
  });

  it("should submit reservation and close on success", async () => {
    const user = userEvent.setup();

    mockReserveCommonArea.mockResolvedValue({
      state: "success",
      message: "Reserva creada correctamente"
    });

    render(<CommonAreaReservationForm {...baseProps} />);

    await user.click(screen.getByRole("button", { name: "Confirmar reserva" }));

    await waitFor(() => {
      expect(mockReserveCommonArea).toHaveBeenCalledTimes(1);
    });

    const [, , formData] = mockReserveCommonArea.mock.calls[0];
    expect(formData.get("fecha")).toBe(firstAllowedDate);
    expect(formData.get("horaInicio")).toBe("8");
    expect(formData.get("duracion")).toBe("1");

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("Reserva creada correctamente");
      expect(mockRefresh).toHaveBeenCalledTimes(1);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  it("should show error toast when reservation fails", async () => {
    const user = userEvent.setup();

    mockReserveCommonArea.mockResolvedValue({
      state: "error",
      message: "No se pudo reservar"
    });

    render(<CommonAreaReservationForm {...baseProps} />);

    await user.click(screen.getByRole("button", { name: "Confirmar reserva" }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("No se pudo reservar");
    });

    expect(mockOnClose).not.toHaveBeenCalled();
    expect(mockRefresh).not.toHaveBeenCalled();
  });

  it("should close when clicking on overlay", async () => {
    const user = userEvent.setup();
    const { container } = render(<CommonAreaReservationForm {...baseProps} />);

    const overlay = container.firstChild as HTMLElement;
    await user.click(overlay);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("should not close when clicking inside popup content", async () => {
    const user = userEvent.setup();

    render(<CommonAreaReservationForm {...baseProps} />);

    await user.click(screen.getByRole("heading", { name: "Reservar Piscina" }));

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it("should not close from overlay click while reservation is pending", async () => {
    const user = userEvent.setup();
    let resolveReservation: ((value: { state: "error"; message: string }) => void) | undefined;

    mockReserveCommonArea.mockImplementation(
      () =>
        new Promise(resolve => {
          resolveReservation = resolve;
        })
    );

    const { container } = render(<CommonAreaReservationForm {...baseProps} />);

    await user.click(screen.getByRole("button", { name: "Confirmar reserva" }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Reservando..." })).toBeInTheDocument();
    });

    const overlay = container.firstChild as HTMLElement;
    await user.click(overlay);

    expect(mockOnClose).not.toHaveBeenCalled();

    resolveReservation?.({ state: "error", message: "No se pudo reservar" });

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("No se pudo reservar");
    });
  });
});
