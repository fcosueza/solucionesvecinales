import { deleteReservation, reserveCommonArea } from "./communityReservation";
import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import * as reservations from "@/lib/reservations";
import { revalidatePath } from "next/cache";

jest.mock("@/lib/dal", () => jest.fn());
jest.mock("next/cache", () => ({
  revalidatePath: jest.fn()
}));
jest.mock("@/lib/reservations", () => {
  const actual = jest.requireActual("@/lib/reservations");

  return {
    ...actual,
    isAllowedReservationDate: jest.fn(actual.isAllowedReservationDate),
    isReservationSlotInPast: jest.fn(actual.isReservationSlotInPast)
  };
});
jest.mock("@/lib/prisma", () => ({
  __esModule: true,
  default: {
    membership: {
      findUnique: jest.fn()
    },
    zone: {
      findUnique: jest.fn()
    },
    reservation: {
      findFirst: jest.fn(),
      delete: jest.fn()
    },
    $transaction: jest.fn()
  }
}));

describe("communityReservation test suite", () => {
  const reservationsActual = jest.requireActual("@/lib/reservations") as typeof import("@/lib/reservations");
  const verifySessionMock = verifySession as jest.Mock;
  const revalidatePathMock = revalidatePath as jest.Mock;
  const isAllowedReservationDateMock = reservations.isAllowedReservationDate as jest.Mock;
  const isReservationSlotInPastMock = reservations.isReservationSlotInPast as jest.Mock;
  const prismaMock = prisma as unknown as {
    membership: { findUnique: jest.Mock };
    zone: { findUnique: jest.Mock };
    reservation: { findFirst: jest.Mock; delete: jest.Mock };
    $transaction: jest.Mock;
  };

  const txMock = {
    reservation: {
      findFirst: jest.fn(),
      create: jest.fn()
    },
    reservationSlot: {
      findMany: jest.fn()
    }
  };

  const buildFormData = (overrides?: Partial<{ fecha: string; horaInicio: string; duracion: string }>) => {
    const formData = new FormData();

    formData.set("fecha", overrides?.fecha ?? "2026-05-05");
    formData.set("horaInicio", overrides?.horaInicio ?? "10");
    formData.set("duracion", overrides?.duracion ?? "2");

    return formData;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers().setSystemTime(new Date(Date.UTC(2026, 4, 4, 9, 30, 0)));
    isAllowedReservationDateMock.mockImplementation((date: string, baseDate?: Date) =>
      reservationsActual.isAllowedReservationDate(date, baseDate)
    );
    isReservationSlotInPastMock.mockImplementation((reservationDateValue: string, endHour: number, now?: Date) =>
      reservationsActual.isReservationSlotInPast(reservationDateValue, endHour, now)
    );

    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: {
        userID: "user-1",
        role: "tenant"
      }
    });

    prismaMock.membership.findUnique.mockResolvedValue({ user: "user-1" });
    prismaMock.zone.findUnique.mockResolvedValue({
      name: "Piscina",
      startTime: new Date(Date.UTC(1970, 0, 1, 9, 0, 0, 0)),
      endTime: new Date(Date.UTC(1970, 0, 1, 22, 0, 0, 0))
    });

    txMock.reservation.findFirst.mockResolvedValue(null);
    txMock.reservation.create.mockResolvedValue({ id: 1 });
    txMock.reservationSlot.findMany.mockResolvedValue([]);
    prismaMock.$transaction.mockImplementation(async (callback: (tx: typeof txMock) => unknown) => callback(txMock));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("Should return an error if the user is not authenticated", async () => {
    verifySessionMock.mockResolvedValue({ isAuth: false });

    const result = await reserveCommonArea(1, "Piscina", buildFormData());

    expect(result.state).toBe("error");
    expect(result.message).toBe("Debes iniciar sesión para reservar una zona común");
    expect(prismaMock.$transaction).not.toHaveBeenCalled();
  });

  it("Should return an error if reservation data is invalid", async () => {
    const formData = buildFormData({ fecha: "2026-05-20" });

    const result = await reserveCommonArea(1, "Piscina", formData);

    expect(result.state).toBe("error");
    expect(result.message).toBe("Solo puedes reservar dentro de los próximos 7 días");
    expect(prismaMock.membership.findUnique).not.toHaveBeenCalled();
  });

  it("Should return an error if date is missing in the form", async () => {
    const formData = new FormData();

    formData.set("horaInicio", "10");
    formData.set("duracion", "2");

    const result = await reserveCommonArea(1, "Piscina", formData);

    expect(result.state).toBe("error");
    expect(result.message).toBe("Los datos de la reserva no son válidos");
    expect(prismaMock.membership.findUnique).not.toHaveBeenCalled();
  });

  it("Should return an error if reservation payload is invalid", async () => {
    const result = await reserveCommonArea(1, "Piscina", buildFormData({ horaInicio: "abc" }));

    expect(result.state).toBe("error");
    expect(result.message).toBe("Los datos de la reserva no son válidos");
    expect(prismaMock.membership.findUnique).not.toHaveBeenCalled();
  });

  it("Should return an error if the user does not belong to the community", async () => {
    prismaMock.membership.findUnique.mockResolvedValue(null);

    const result = await reserveCommonArea(1, "Piscina", buildFormData());

    expect(result.state).toBe("error");
    expect(result.message).toBe("No perteneces a esta comunidad");
    expect(prismaMock.$transaction).not.toHaveBeenCalled();
  });

  it("Should return an error if the common area does not exist", async () => {
    prismaMock.zone.findUnique.mockResolvedValue(null);

    const result = await reserveCommonArea(1, "Piscina", buildFormData());

    expect(result.state).toBe("error");
    expect(result.message).toBe("La zona común no existe");
    expect(prismaMock.$transaction).not.toHaveBeenCalled();
  });

  it("Should return an error if the time range is outside the area schedule", async () => {
    const result = await reserveCommonArea(1, "Piscina", buildFormData({ horaInicio: "21", duracion: "2" }));

    expect(result.state).toBe("error");
    expect(result.message).toBe("La reserva debe quedar dentro del horario disponible de la zona");
    expect(prismaMock.$transaction).not.toHaveBeenCalled();
  });

  it("Should return an error if the time range has already passed", async () => {
    isAllowedReservationDateMock.mockReturnValue(true);
    isReservationSlotInPastMock.mockReturnValue(true);

    const result = await reserveCommonArea(1, "Piscina", buildFormData());

    expect(result.state).toBe("error");
    expect(result.message).toBe("No puedes reservar una franja que ya ha pasado");
    expect(prismaMock.$transaction).not.toHaveBeenCalled();
  });

  it("Should return an error if the user already has an active reservation", async () => {
    txMock.reservation.findFirst.mockResolvedValue({ id: 12 });

    const result = await reserveCommonArea(1, "Piscina", buildFormData());

    expect(result.state).toBe("error");
    expect(result.message).toBe("Solo puedes tener una reserva activa a la vez");
    expect(txMock.reservation.create).not.toHaveBeenCalled();
  });

  it("Should return an error if the selected time range is already occupied", async () => {
    txMock.reservationSlot.findMany.mockResolvedValue([{ id: 99 }]);

    const result = await reserveCommonArea(1, "Piscina", buildFormData());

    expect(result.state).toBe("error");
    expect(result.message).toBe("La franja seleccionada ya está reservada");
    expect(txMock.reservation.create).not.toHaveBeenCalled();
  });

  it("Should create the reservation and revalidate routes when everything is valid", async () => {
    const result = await reserveCommonArea(1, "Piscina", buildFormData());

    expect(result).toEqual({
      state: "success",
      message: "Reserva creada correctamente"
    });
    expect(txMock.reservation.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        user: "user-1",
        community: 1,
        zone: "Piscina"
      })
    });
    expect(revalidatePathMock).toHaveBeenNthCalledWith(1, "/communities/1/overview");
    expect(revalidatePathMock).toHaveBeenNthCalledWith(2, "/communities/1/common-areas");
  });

  it("Should translate P2002 into a concurrency message", async () => {
    prismaMock.$transaction.mockRejectedValue({ code: "P2002" });

    const result = await reserveCommonArea(1, "Piscina", buildFormData());

    expect(result.state).toBe("error");
    expect(result.message).toBe("La franja seleccionada acaba de ocuparse. Elige otra distinta");
  });

  it("Should return a generic error when transaction fails for a reason other than P2002", async () => {
    prismaMock.$transaction.mockRejectedValue(new Error("unexpected"));

    const result = await reserveCommonArea(1, "Piscina", buildFormData());

    expect(result.state).toBe("error");
    expect(result.message).toBe("No se pudo completar la reserva. Inténtalo de nuevo");
  });

  it("Should return an error on cancel if the user is not authenticated", async () => {
    verifySessionMock.mockResolvedValue({ isAuth: false, session: null });

    const result = await deleteReservation(3, 1);

    expect(result.state).toBe("error");
    expect(result.message).toBe("Debes iniciar sesión para cancelar una reserva");
    expect(prismaMock.reservation.findFirst).not.toHaveBeenCalled();
  });

  it("Should return an error on cancel if IDs are invalid", async () => {
    const result = await deleteReservation(0, 1);

    expect(result.state).toBe("error");
    expect(result.message).toBe("Datos de la reserva no válidos");
    expect(prismaMock.reservation.findFirst).not.toHaveBeenCalled();
  });

  it("Should return an error on cancel if reservation is not found", async () => {
    prismaMock.reservation.findFirst.mockResolvedValue(null);

    const result = await deleteReservation(3, 1);

    expect(result.state).toBe("error");
    expect(result.message).toBe("No se encontró la reserva o no tienes permiso para eliminarla");
    expect(prismaMock.reservation.delete).not.toHaveBeenCalled();
  });

  it("Should return an error on cancel if deletion fails", async () => {
    prismaMock.reservation.findFirst.mockResolvedValue({ id: 3 });
    prismaMock.reservation.delete.mockRejectedValue(new Error("db error"));

    const result = await deleteReservation(3, 1);

    expect(result.state).toBe("error");
    expect(result.message).toBe("No se pudo cancelar la reserva. Inténtalo de nuevo");
  });

  it("Should delete an owned reservation and revalidate routes", async () => {
    prismaMock.reservation.findFirst.mockResolvedValue({ id: 3 });
    prismaMock.reservation.delete.mockResolvedValue({ id: 3 });

    const result = await deleteReservation(3, 1);

    expect(result).toEqual({ state: "success", message: "Reserva cancelada correctamente" });
    expect(prismaMock.reservation.delete).toHaveBeenCalledWith({ where: { id: 3 } });
    expect(revalidatePathMock).toHaveBeenNthCalledWith(1, "/communities/1/overview");
    expect(revalidatePathMock).toHaveBeenNthCalledWith(2, "/communities/1/common-areas");
  });
});
