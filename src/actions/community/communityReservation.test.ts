import reserveCommonArea, { deleteReservation } from "./communityReservation";
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
    inscripcion: {
      findUnique: jest.fn()
    },
    zona: {
      findUnique: jest.fn()
    },
    reserva: {
      findFirst: jest.fn(),
      delete: jest.fn()
    },
    $transaction: jest.fn()
  }
}));

describe("Suite de pruebas de communityReservation", () => {
  const reservationsActual = jest.requireActual("@/lib/reservations") as typeof import("@/lib/reservations");
  const verifySessionMock = verifySession as jest.Mock;
  const revalidatePathMock = revalidatePath as jest.Mock;
  const isAllowedReservationDateMock = reservations.isAllowedReservationDate as jest.Mock;
  const isReservationSlotInPastMock = reservations.isReservationSlotInPast as jest.Mock;
  const prismaMock = prisma as unknown as {
    inscripcion: { findUnique: jest.Mock };
    zona: { findUnique: jest.Mock };
    reserva: { findFirst: jest.Mock; delete: jest.Mock };
    $transaction: jest.Mock;
  };

  const txMock = {
    reserva: {
      findFirst: jest.fn(),
      create: jest.fn()
    },
    reservaFranja: {
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

    prismaMock.inscripcion.findUnique.mockResolvedValue({ usuario: "user-1" });
    prismaMock.zona.findUnique.mockResolvedValue({
      nombre: "Piscina",
      hora_inicio: new Date(Date.UTC(1970, 0, 1, 9, 0, 0, 0)),
      hora_fin: new Date(Date.UTC(1970, 0, 1, 22, 0, 0, 0))
    });

    txMock.reserva.findFirst.mockResolvedValue(null);
    txMock.reserva.create.mockResolvedValue({ id: 1 });
    txMock.reservaFranja.findMany.mockResolvedValue([]);
    prismaMock.$transaction.mockImplementation(async (callback: (tx: typeof txMock) => unknown) => callback(txMock));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("Debe devolver error si el usuario no esta autenticado", async () => {
    verifySessionMock.mockResolvedValue({ isAuth: false });

    const result = await reserveCommonArea(1, "Piscina", buildFormData());

    expect(result.state).toBe("error");
    expect(result.message).toBe("Debes iniciar sesión para reservar una zona común");
    expect(prismaMock.$transaction).not.toHaveBeenCalled();
  });

  it("Debe devolver error si los datos de la reserva no son validos", async () => {
    const formData = buildFormData({ fecha: "2026-05-20" });

    const result = await reserveCommonArea(1, "Piscina", formData);

    expect(result.state).toBe("error");
    expect(result.message).toBe("Solo puedes reservar dentro de los próximos 7 días");
    expect(prismaMock.inscripcion.findUnique).not.toHaveBeenCalled();
  });

  it("Debe devolver error si falta la fecha en el formulario", async () => {
    const formData = new FormData();

    formData.set("horaInicio", "10");
    formData.set("duracion", "2");

    const result = await reserveCommonArea(1, "Piscina", formData);

    expect(result.state).toBe("error");
    expect(result.message).toBe("Los datos de la reserva no son válidos");
    expect(prismaMock.inscripcion.findUnique).not.toHaveBeenCalled();
  });

  it("Debe devolver error si el payload de reserva es invalido", async () => {
    const result = await reserveCommonArea(1, "Piscina", buildFormData({ horaInicio: "abc" }));

    expect(result.state).toBe("error");
    expect(result.message).toBe("Los datos de la reserva no son válidos");
    expect(prismaMock.inscripcion.findUnique).not.toHaveBeenCalled();
  });

  it("Debe devolver error si el usuario no pertenece a la comunidad", async () => {
    prismaMock.inscripcion.findUnique.mockResolvedValue(null);

    const result = await reserveCommonArea(1, "Piscina", buildFormData());

    expect(result.state).toBe("error");
    expect(result.message).toBe("No perteneces a esta comunidad");
    expect(prismaMock.$transaction).not.toHaveBeenCalled();
  });

  it("Debe devolver error si la zona comun no existe", async () => {
    prismaMock.zona.findUnique.mockResolvedValue(null);

    const result = await reserveCommonArea(1, "Piscina", buildFormData());

    expect(result.state).toBe("error");
    expect(result.message).toBe("La zona común no existe");
    expect(prismaMock.$transaction).not.toHaveBeenCalled();
  });

  it("Debe devolver error si la franja queda fuera del horario de la zona", async () => {
    const result = await reserveCommonArea(1, "Piscina", buildFormData({ horaInicio: "21", duracion: "2" }));

    expect(result.state).toBe("error");
    expect(result.message).toBe("La reserva debe quedar dentro del horario disponible de la zona");
    expect(prismaMock.$transaction).not.toHaveBeenCalled();
  });

  it("Debe devolver error si la franja ya paso", async () => {
    isAllowedReservationDateMock.mockReturnValue(true);
    isReservationSlotInPastMock.mockReturnValue(true);

    const result = await reserveCommonArea(1, "Piscina", buildFormData());

    expect(result.state).toBe("error");
    expect(result.message).toBe("No puedes reservar una franja que ya ha pasado");
    expect(prismaMock.$transaction).not.toHaveBeenCalled();
  });

  it("Debe devolver error si el usuario ya tiene una reserva activa", async () => {
    txMock.reserva.findFirst.mockResolvedValue({ id: 12 });

    const result = await reserveCommonArea(1, "Piscina", buildFormData());

    expect(result.state).toBe("error");
    expect(result.message).toBe("Solo puedes tener una reserva activa a la vez");
    expect(txMock.reserva.create).not.toHaveBeenCalled();
  });

  it("Debe devolver error si la franja seleccionada ya esta ocupada", async () => {
    txMock.reservaFranja.findMany.mockResolvedValue([{ id: 99 }]);

    const result = await reserveCommonArea(1, "Piscina", buildFormData());

    expect(result.state).toBe("error");
    expect(result.message).toBe("La franja seleccionada ya está reservada");
    expect(txMock.reserva.create).not.toHaveBeenCalled();
  });

  it("Debe crear la reserva y revalidar rutas cuando todo es valido", async () => {
    const result = await reserveCommonArea(1, "Piscina", buildFormData());

    expect(result).toEqual({
      state: "success",
      message: "Reserva creada correctamente"
    });
    expect(txMock.reserva.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        usuario: "user-1",
        comunidad: 1,
        zona: "Piscina"
      })
    });
    expect(revalidatePathMock).toHaveBeenNthCalledWith(1, "/communities/1/overview");
    expect(revalidatePathMock).toHaveBeenNthCalledWith(2, "/communities/1/zonas-comunes");
  });

  it("Debe traducir el error P2002 a un mensaje de concurrencia", async () => {
    prismaMock.$transaction.mockRejectedValue({ code: "P2002" });

    const result = await reserveCommonArea(1, "Piscina", buildFormData());

    expect(result.state).toBe("error");
    expect(result.message).toBe("La franja seleccionada acaba de ocuparse. Elige otra distinta");
  });

  it("Debe devolver un error generico cuando falla la transaccion por un motivo distinto a P2002", async () => {
    prismaMock.$transaction.mockRejectedValue(new Error("unexpected"));

    const result = await reserveCommonArea(1, "Piscina", buildFormData());

    expect(result.state).toBe("error");
    expect(result.message).toBe("No se pudo completar la reserva. Inténtalo de nuevo");
  });

  it("Debe devolver error al cancelar si el usuario no esta autenticado", async () => {
    verifySessionMock.mockResolvedValue({ isAuth: false, session: null });

    const result = await deleteReservation(3, 1);

    expect(result.state).toBe("error");
    expect(result.message).toBe("Debes iniciar sesión para cancelar una reserva");
    expect(prismaMock.reserva.findFirst).not.toHaveBeenCalled();
  });

  it("Debe devolver error al cancelar si los IDs son invalidos", async () => {
    const result = await deleteReservation(0, 1);

    expect(result.state).toBe("error");
    expect(result.message).toBe("Datos de la reserva no válidos");
    expect(prismaMock.reserva.findFirst).not.toHaveBeenCalled();
  });

  it("Debe devolver error al cancelar si no encuentra la reserva", async () => {
    prismaMock.reserva.findFirst.mockResolvedValue(null);

    const result = await deleteReservation(3, 1);

    expect(result.state).toBe("error");
    expect(result.message).toBe("No se encontró la reserva o no tienes permiso para eliminarla");
    expect(prismaMock.reserva.delete).not.toHaveBeenCalled();
  });

  it("Debe devolver error al cancelar si falla el borrado", async () => {
    prismaMock.reserva.findFirst.mockResolvedValue({ id: 3 });
    prismaMock.reserva.delete.mockRejectedValue(new Error("db error"));

    const result = await deleteReservation(3, 1);

    expect(result.state).toBe("error");
    expect(result.message).toBe("No se pudo cancelar la reserva. Inténtalo de nuevo");
  });

  it("Debe eliminar una reserva propia y revalidar rutas", async () => {
    prismaMock.reserva.findFirst.mockResolvedValue({ id: 3 });
    prismaMock.reserva.delete.mockResolvedValue({ id: 3 });

    const result = await deleteReservation(3, 1);

    expect(result).toEqual({ state: "success", message: "Reserva cancelada correctamente" });
    expect(prismaMock.reserva.delete).toHaveBeenCalledWith({ where: { id: 3 } });
    expect(revalidatePathMock).toHaveBeenNthCalledWith(1, "/communities/1/overview");
    expect(revalidatePathMock).toHaveBeenNthCalledWith(2, "/communities/1/zonas-comunes");
  });
});
