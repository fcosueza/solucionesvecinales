import updateIncidentStatus from "./communityIncident";
import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

jest.mock("@/lib/dal", () => jest.fn());
jest.mock("next/cache", () => ({
  revalidatePath: jest.fn()
}));

jest.mock("@/lib/prisma", () => ({
  incidencia: {
    findFirst: jest.fn(),
    updateMany: jest.fn()
  }
}));

describe("Suite de pruebas de updateIncidentStatus", () => {
  const createFormData = ({
    communityID = "1",
    userID = "user-1",
    incidentDate = "2026-05-02T09:30:00.000Z"
  }: {
    communityID?: string;
    userID?: string;
    incidentDate?: string;
  }) => {
    const formData = new FormData();

    formData.append("communityID", communityID);
    formData.append("userID", userID);
    formData.append("incidentDate", incidentDate);

    return formData;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("No debe hacer nada si el usuario no esta autenticado", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: false });

    await updateIncidentStatus(createFormData({}));

    expect(prisma.incidencia.findFirst).not.toHaveBeenCalled();
    expect(prisma.incidencia.updateMany).not.toHaveBeenCalled();
  });

  it("No debe hacer nada si el formulario es invalido", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: true, session: { userID: "admin-1" } });

    await updateIncidentStatus(createFormData({ communityID: "abc", incidentDate: "invalid-date" }));

    expect(prisma.incidencia.findFirst).not.toHaveBeenCalled();
  });

  it("Debe cambiar estado de reportado a procesandose", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: true, session: { userID: "admin-1" } });
    (prisma.incidencia.findFirst as jest.Mock).mockResolvedValue({ estado: "reportado" });

    await updateIncidentStatus(createFormData({}));

    expect(prisma.incidencia.updateMany).toHaveBeenCalledWith({
      where: {
        comunidad: 1,
        usuario: "user-1",
        fecha: new Date("2026-05-02T09:30:00.000Z"),
        estado: "reportado"
      },
      data: {
        estado: "procesandose",
        actualizadaEn: expect.any(Date)
      }
    });
    expect(revalidatePath).toHaveBeenCalledWith("/communities/1/incidencias");
  });

  it("Debe cambiar estado de procesandose a resuelto", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: true, session: { userID: "admin-1" } });
    (prisma.incidencia.findFirst as jest.Mock).mockResolvedValue({ estado: "procesandose" });

    await updateIncidentStatus(createFormData({}));

    expect(prisma.incidencia.updateMany).toHaveBeenCalledWith({
      where: {
        comunidad: 1,
        usuario: "user-1",
        fecha: new Date("2026-05-02T09:30:00.000Z"),
        estado: "procesandose"
      },
      data: {
        estado: "resuelto",
        actualizadaEn: expect.any(Date)
      }
    });
  });

  it("No debe actualizar si la incidencia ya esta resuelta", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: true, session: { userID: "admin-1" } });
    (prisma.incidencia.findFirst as jest.Mock).mockResolvedValue({ estado: "resuelto" });

    await updateIncidentStatus(createFormData({}));

    expect(prisma.incidencia.updateMany).not.toHaveBeenCalled();
  });

  it("No debe actualizar si la incidencia no existe", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: true, session: { userID: "admin-1" } });
    (prisma.incidencia.findFirst as jest.Mock).mockResolvedValue(null);

    await updateIncidentStatus(createFormData({}));

    expect(prisma.incidencia.updateMany).not.toHaveBeenCalled();
  });
});
