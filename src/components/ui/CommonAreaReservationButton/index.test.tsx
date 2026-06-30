import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CommonAreaReservationButton from ".";

jest.mock("@/actions/community/communityReservation", () => ({
  reserveCommonArea: jest.fn()
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: jest.fn()
  })
}));

describe("CommonAreaReservationButton component test suite", () => {
  const baseProps = {
    communityID: 10,
    zoneName: "Piscina",
    openingHour: 9,
    closingHour: 20,
    existingReservations: [
      {
        date: "2026-06-30",
        startHour: 10,
        endHour: 11
      }
    ]
  };

  it("should render reservation button and keep form closed initially", () => {
    render(<CommonAreaReservationButton {...baseProps} />);

    expect(screen.getByRole("button", { name: "Reservar" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Confirmar reserva" })).not.toBeInTheDocument();
  });

  it("should open CommonAreaReservationForm on button click", async () => {
    render(<CommonAreaReservationButton {...baseProps} />);

    await userEvent.click(screen.getByRole("button", { name: "Reservar" }));

    expect(screen.getByRole("heading", { name: "Reservar Piscina" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Confirmar reserva" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancelar" })).toBeInTheDocument();
  });

  it("should close CommonAreaReservationForm when cancel is clicked", async () => {
    render(<CommonAreaReservationButton {...baseProps} />);

    await userEvent.click(screen.getByRole("button", { name: "Reservar" }));
    expect(screen.getByRole("heading", { name: "Reservar Piscina" })).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Cancelar" }));
    expect(screen.queryByRole("heading", { name: "Reservar Piscina" })).not.toBeInTheDocument();
  });

  it("should keep form closed when disabled", async () => {
    render(<CommonAreaReservationButton {...baseProps} disabled />);

    const button = screen.getByRole("button", { name: "Reservar" });
    expect(button).toBeDisabled();

    await userEvent.click(button);

    expect(screen.queryByRole("button", { name: "Confirmar reserva" })).not.toBeInTheDocument();
  });
});
