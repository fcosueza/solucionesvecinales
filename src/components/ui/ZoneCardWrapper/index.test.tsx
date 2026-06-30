import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ZoneCardWrapper from ".";

const mockDeleteZone = jest.fn();
const mockRefresh = jest.fn();
const mockToastSuccess = jest.fn();
const mockToastError = jest.fn();
const mockCardCommonArea = jest.fn();
const mockCommonAreaReservationButton = jest.fn();

jest.mock("@/actions/community/communityZone", () => ({
  deleteZone: (...args: unknown[]) => mockDeleteZone(...args)
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: mockRefresh
  })
}));

jest.mock("sonner", () => ({
  toast: {
    success: (...args: unknown[]) => mockToastSuccess(...args),
    error: (...args: unknown[]) => mockToastError(...args)
  }
}));

jest.mock("@/components/ui/Cards/CardCommonArea", () => ({
  __esModule: true,
  default: (props: {
    name: string;
    description: string;
    imageUrl: string;
    reservationSummary: string;
    isAdmin: boolean;
    onDeleteRequest?: () => void;
    action?: React.ReactNode;
  }) => {
    mockCardCommonArea(props);

    return (
      <div>
        <p>{props.name}</p>
        <p>{props.description}</p>
        <p>{props.imageUrl}</p>
        <p>{props.reservationSummary}</p>
        <p>{props.isAdmin ? "admin" : "user"}</p>
        {props.isAdmin && props.onDeleteRequest ? (
          <button type="button" onClick={props.onDeleteRequest}>
            Abrir confirmar eliminación
          </button>
        ) : null}
        <div data-testid="card-action">{props.action}</div>
      </div>
    );
  }
}));

jest.mock("@/components/ui/CommonAreaReservationButton", () => ({
  __esModule: true,
  default: (props: {
    communityID: number;
    zoneName: string;
    openingHour: number;
    closingHour: number;
    existingReservations: Array<{ date: string; startHour: number; endHour: number }>;
    disabled?: boolean;
  }) => {
    mockCommonAreaReservationButton(props);

    return <button type="button">Reserva mock</button>;
  }
}));

describe("ZoneCardWrapper component test suite", () => {
  const zone = {
    name: "Piscina",
    description: "Zona de piscina",
    startTime: new Date("2026-06-30T09:00:00.000Z"),
    endTime: new Date("2026-06-30T21:00:00.000Z"),
    image: null,
    reservations: [
      {
        date: new Date("2026-07-01T00:00:00.000Z"),
        startTime: new Date("2026-07-01T10:00:00.000Z"),
        endTime: new Date("2026-07-01T11:00:00.000Z")
      }
    ]
  };

  const baseProps = {
    communityID: 7,
    zone,
    reservationSummary: "Sin reservas activas",
    hasActiveReservation: false,
    isAdmin: true
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render card info and map reservation button props", () => {
    render(<ZoneCardWrapper {...baseProps} />);

    expect(screen.getByText("Piscina")).toBeInTheDocument();
    expect(screen.getByText("Zona de piscina")).toBeInTheDocument();
    expect(screen.getByText("/assets/images/default-community.jpeg")).toBeInTheDocument();
    expect(screen.getByText("Sin reservas activas")).toBeInTheDocument();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    expect(mockCommonAreaReservationButton).toHaveBeenCalledWith({
      communityID: 7,
      zoneName: "Piscina",
      openingHour: 9,
      closingHour: 21,
      existingReservations: [{ date: "2026-07-01", startHour: 10, endHour: 11 }],
      disabled: false
    });
  });

  it("should open and close the confirm modal through dialog interactions", async () => {
    const user = userEvent.setup();

    render(<ZoneCardWrapper {...baseProps} />);

    await user.click(screen.getByRole("button", { name: "Abrir confirmar eliminación" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sí, eliminar" })).toBeInTheDocument();

    await user.click(screen.getByText("Eliminar zona"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Cancelar" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Abrir confirmar eliminación" }));
    const overlay = screen.getByRole("dialog").parentElement;
    expect(overlay).not.toBeNull();
    await user.click(overlay as HTMLElement);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("should delete zone successfully, keep modal open and refresh route", async () => {
    const user = userEvent.setup();
    let resolveDelete: ((value: { state: "success"; message: string }) => void) | undefined;

    mockDeleteZone.mockImplementation(
      () =>
        new Promise<{ state: "success"; message: string }>(resolve => {
          resolveDelete = resolve;
        })
    );

    render(<ZoneCardWrapper {...baseProps} />);

    await user.click(screen.getByRole("button", { name: "Abrir confirmar eliminación" }));
    await user.click(screen.getByRole("button", { name: "Sí, eliminar" }));

    expect(mockDeleteZone).toHaveBeenCalledWith(7, "Piscina");
    expect(screen.getByRole("button", { name: "Eliminando..." })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Cancelar" })).toBeDisabled();

    const overlay = screen.getByRole("dialog").parentElement;
    await user.click(overlay as HTMLElement);
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    resolveDelete?.({ state: "success", message: "Zona eliminada" });

    await waitFor(() => {
      expect(mockToastSuccess).toHaveBeenCalledWith("Zona eliminada");
      expect(mockRefresh).toHaveBeenCalledTimes(1);
    });

    expect(mockToastError).not.toHaveBeenCalled();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("should show error toast and close modal on delete failure", async () => {
    const user = userEvent.setup();

    mockDeleteZone.mockResolvedValue({ state: "error", message: "No se pudo eliminar" });

    render(<ZoneCardWrapper {...baseProps} hasActiveReservation />);

    expect(mockCommonAreaReservationButton).toHaveBeenLastCalledWith(expect.objectContaining({ disabled: true }));

    await user.click(screen.getByRole("button", { name: "Abrir confirmar eliminación" }));
    await user.click(screen.getByRole("button", { name: "Sí, eliminar" }));

    await waitFor(() => {
      expect(mockToastError).toHaveBeenCalledWith("No se pudo eliminar");
    });

    expect(mockRefresh).not.toHaveBeenCalled();
    expect(mockToastSuccess).not.toHaveBeenCalled();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
