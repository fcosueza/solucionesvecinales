import updateIncidentStatus, { addIncident } from "./communityIncident";
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
    updateMany: jest.fn(),
    create: jest.fn()
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

  it("No debe hacer nada si userID esta vacio", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: true, session: { userID: "admin-1" } });

    await updateIncidentStatus(createFormData({ userID: "   " }));

    expect(prisma.incidencia.findFirst).not.toHaveBeenCalled();
    expect(prisma.incidencia.updateMany).not.toHaveBeenCalled();
  });

  it("No debe hacer nada si incidentDate no es valida", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: true, session: { userID: "admin-1" } });

    await updateIncidentStatus(createFormData({ incidentDate: "fecha-invalida" }));

    expect(prisma.incidencia.findFirst).not.toHaveBeenCalled();
    expect(prisma.incidencia.updateMany).not.toHaveBeenCalled();
  });

  it("No debe hacer nada si faltan userID e incidentDate en el FormData", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: true, session: { userID: "admin-1" } });
    const formData = new FormData();
    formData.append("communityID", "1");

    await updateIncidentStatus(formData);

    expect(prisma.incidencia.findFirst).not.toHaveBeenCalled();
    expect(prisma.incidencia.updateMany).not.toHaveBeenCalled();
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
    expect(revalidatePath).toHaveBeenCalledWith("/communities/1/overview");
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

  it("Debe usar estado resuelto si llega un estado no esperado", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: true, session: { userID: "admin-1" } });
    (prisma.incidencia.findFirst as jest.Mock).mockResolvedValue({ estado: "desconocido" });

    await updateIncidentStatus(createFormData({}));

    expect(prisma.incidencia.updateMany).toHaveBeenCalledWith({
      where: {
        comunidad: 1,
        usuario: "user-1",
        fecha: new Date("2026-05-02T09:30:00.000Z"),
        estado: "desconocido"
      },
      data: {
        estado: "resuelto",
        actualizadaEn: expect.any(Date)
      }
    });
  });
});

describe("Suite de pruebas de addIncident", () => {
  const createFormData = ({
    titulo = "Puerta rota",
    descripcion = "La puerta del garaje no cierra"
  }: {
    titulo?: string;
    descripcion?: string;
  }) => {
    const formData = new FormData();

    formData.append("titulo", titulo);
    formData.append("descripcion", descripcion);

    return formData;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("No debe hacer nada si el usuario no esta autenticado", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: false });

    await addIncident(1, createFormData({}));

    expect(prisma.incidencia.create).not.toHaveBeenCalled();
  });

  it("No debe hacer nada si los datos son invalidos", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: true, session: { userID: "user-1" } });

    await addIncident(0, createFormData({ titulo: "", descripcion: "" }));

    expect(prisma.incidencia.create).not.toHaveBeenCalled();
  });

  it("No debe crear incidencia si el titulo queda vacio tras trim", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: true, session: { userID: "user-1" } });

    await addIncident(3, createFormData({ titulo: "   ", descripcion: "Descripcion valida" }));

    expect(prisma.incidencia.create).not.toHaveBeenCalled();
  });

  it("No debe crear incidencia si la descripcion queda vacia tras trim", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: true, session: { userID: "user-1" } });

    await addIncident(3, createFormData({ titulo: "Titulo valido", descripcion: "   " }));

    expect(prisma.incidencia.create).not.toHaveBeenCalled();
  });

  it("No debe crear incidencia si faltan titulo y descripcion en el FormData", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: true, session: { userID: "user-1" } });
    const formData = new FormData();

    await addIncident(3, formData);

    expect(prisma.incidencia.create).not.toHaveBeenCalled();
  });

  it("Debe crear incidencia y revalidar rutas", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: true, session: { userID: "user-1" } });
    (prisma.incidencia.create as jest.Mock).mockResolvedValue({});

    await addIncident(3, createFormData({ titulo: "  Luz fundida  ", descripcion: "  Escalera oscura  " }));

    expect(prisma.incidencia.create).toHaveBeenCalledWith({
      data: {
        comunidad: 3,
        usuario: "user-1",
        titulo: "Luz fundida",
        descripcion: "Escalera oscura",
        estado: "reportado"
      }
    });
    expect(revalidatePath).toHaveBeenCalledWith("/communities/3/incidencias");
    expect(revalidatePath).toHaveBeenCalledWith("/communities/3/overview");
  });

  it("No debe lanzar error si prisma.create falla", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: true, session: { userID: "user-1" } });
    (prisma.incidencia.create as jest.Mock).mockRejectedValue(new Error("DB error"));

    await expect(addIncident(3, createFormData({}))).resolves.toBeUndefined();
    expect(revalidatePath).not.toHaveBeenCalled();
  });
});
