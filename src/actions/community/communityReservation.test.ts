import reserveCommonArea, { deleteReservation } from "./communityReservation";
import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

jest.mock("@/lib/dal", () => jest.fn());
jest.mock("next/cache", () => ({
  revalidatePath: jest.fn()
}));
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
  const verifySessionMock = verifySession as jest.Mock;
  const revalidatePathMock = revalidatePath as jest.Mock;
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
