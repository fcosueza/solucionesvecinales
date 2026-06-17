import updateIncidentStatus, { addIncident, deleteIncident, deleteIncidentAdmin } from "./communityIncident";
import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { UserRole } from "@/types";

jest.mock("@/lib/dal", () => jest.fn());
jest.mock("next/cache", () => ({
  revalidatePath: jest.fn()
}));

jest.mock("@/lib/prisma", () => ({
  membership: {
    findUnique: jest.fn()
  },
  incident: {
    findFirst: jest.fn(),
    updateMany: jest.fn(),
    create: jest.fn(),
    delete: jest.fn()
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
    (prisma.membership.findUnique as jest.Mock).mockResolvedValue({ user: "user-1" });
  });

  it("No debe hacer nada si el usuario no esta autenticado", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: false });

    await updateIncidentStatus(createFormData({}));

    expect(prisma.incident.findFirst).not.toHaveBeenCalled();
    expect(prisma.incident.updateMany).not.toHaveBeenCalled();
  });

  it("No debe hacer nada si el formulario es invalido", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: true, session: { userID: "admin-1" } });

    await updateIncidentStatus(createFormData({ communityID: "abc", incidentDate: "invalid-date" }));

    expect(prisma.incident.findFirst).not.toHaveBeenCalled();
  });

  it("No debe hacer nada si userID esta vacio", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: true, session: { userID: "admin-1" } });

    await updateIncidentStatus(createFormData({ userID: "   " }));

    expect(prisma.incident.findFirst).not.toHaveBeenCalled();
    expect(prisma.incident.updateMany).not.toHaveBeenCalled();
  });

  it("No debe hacer nada si incidentDate no es valida", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: true, session: { userID: "admin-1" } });

    await updateIncidentStatus(createFormData({ incidentDate: "fecha-invalida" }));

    expect(prisma.incident.findFirst).not.toHaveBeenCalled();
    expect(prisma.incident.updateMany).not.toHaveBeenCalled();
  });

  it("No debe hacer nada si faltan userID e incidentDate en el FormData", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: true, session: { userID: "admin-1" } });
    const formData = new FormData();
    formData.append("communityID", "1");

    await updateIncidentStatus(formData);

    expect(prisma.incident.findFirst).not.toHaveBeenCalled();
    expect(prisma.incident.updateMany).not.toHaveBeenCalled();
  });

  it("No debe actualizar incidencia si el usuario no esta inscrito en la comunidad", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: true, session: { userID: "admin-1" } });
    (prisma.membership.findUnique as jest.Mock).mockResolvedValue(null);

    await updateIncidentStatus(createFormData({}));

    expect(prisma.incident.findFirst).not.toHaveBeenCalled();
    expect(prisma.incident.updateMany).not.toHaveBeenCalled();
  });

  it("Debe cambiar estado de reportado a procesandose", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: true, session: { userID: "admin-1" } });
    (prisma.incident.findFirst as jest.Mock).mockResolvedValue({ status: "reported" });

    await updateIncidentStatus(createFormData({}));

    expect(prisma.incident.updateMany).toHaveBeenCalledWith({
      where: {
        community: 1,
        user: "user-1",
        date: new Date("2026-05-02T09:30:00.000Z"),
        status: "reported"
      },
      data: {
        status: "inProgress",
        updatedAt: expect.any(Date)
      }
    });
    expect(revalidatePath).toHaveBeenCalledWith("/communities/1/incidencias");
    expect(revalidatePath).toHaveBeenCalledWith("/communities/1/overview");
  });

  it("Debe cambiar estado de procesandose a resuelto", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: true, session: { userID: "admin-1" } });
    (prisma.incident.findFirst as jest.Mock).mockResolvedValue({ status: "inProgress" });

    await updateIncidentStatus(createFormData({}));

    expect(prisma.incident.updateMany).toHaveBeenCalledWith({
      where: {
        community: 1,
        user: "user-1",
        date: new Date("2026-05-02T09:30:00.000Z"),
        status: "inProgress"
      },
      data: {
        status: "resolved",
        updatedAt: expect.any(Date)
      }
    });
  });

  it("No debe actualizar si la incidencia ya esta resuelta", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: true, session: { userID: "admin-1" } });
    (prisma.incident.findFirst as jest.Mock).mockResolvedValue({ status: "resolved" });

    await updateIncidentStatus(createFormData({}));

    expect(prisma.incident.updateMany).not.toHaveBeenCalled();
  });

  it("No debe actualizar si la incidencia no existe", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: true, session: { userID: "admin-1" } });
    (prisma.incident.findFirst as jest.Mock).mockResolvedValue(null);

    await updateIncidentStatus(createFormData({}));

    expect(prisma.incident.updateMany).not.toHaveBeenCalled();
  });

  it("Debe usar estado resuelto si llega un estado no esperado", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: true, session: { userID: "admin-1" } });
    (prisma.incident.findFirst as jest.Mock).mockResolvedValue({ status: "desconocido" });

    await updateIncidentStatus(createFormData({}));

    expect(prisma.incident.updateMany).toHaveBeenCalledWith({
      where: {
        community: 1,
        user: "user-1",
        date: new Date("2026-05-02T09:30:00.000Z"),
        status: "desconocido"
      },
      data: {
        status: "resolved",
        updatedAt: expect.any(Date)
      }
    });
  });
});

describe("Suite de pruebas de deleteIncident", () => {
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
    (prisma.membership.findUnique as jest.Mock).mockResolvedValue({ user: "admin-1" });
  });

  it("No debe eliminar si no hay sesion", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: false });

    await deleteIncident(createFormData({}));

    expect(prisma.incident.findFirst).not.toHaveBeenCalled();
    expect(prisma.incident.delete).not.toHaveBeenCalled();
  });

  it("No debe eliminar si el usuario no es admin", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: {
        userID: "user-1",
        role: UserRole.tenant
      }
    });

    await deleteIncident(createFormData({}));

    expect(prisma.incident.findFirst).not.toHaveBeenCalled();
    expect(prisma.incident.delete).not.toHaveBeenCalled();
  });

  it("No debe eliminar si los datos son invalidos", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: {
        userID: "admin-1",
        role: UserRole.admin
      }
    });

    await deleteIncident(createFormData({ communityID: "abc", incidentDate: "fecha-invalida" }));

    expect(prisma.incident.findFirst).not.toHaveBeenCalled();
    expect(prisma.incident.delete).not.toHaveBeenCalled();
  });

  it("No debe eliminar si userID esta vacio", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: {
        userID: "admin-1",
        role: UserRole.admin
      }
    });

    await deleteIncident(createFormData({ userID: "   " }));

    expect(prisma.membership.findUnique).not.toHaveBeenCalled();
    expect(prisma.incident.findFirst).not.toHaveBeenCalled();
    expect(prisma.incident.delete).not.toHaveBeenCalled();
  });

  it("No debe eliminar si faltan userID e incidentDate en el FormData", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: {
        userID: "admin-1",
        role: UserRole.admin
      }
    });

    const formData = new FormData();
    formData.append("communityID", "1");

    await deleteIncident(formData);

    expect(prisma.membership.findUnique).not.toHaveBeenCalled();
    expect(prisma.incident.findFirst).not.toHaveBeenCalled();
    expect(prisma.incident.delete).not.toHaveBeenCalled();
  });

  it("No debe eliminar si el admin no esta inscrito en la comunidad", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: {
        userID: "admin-1",
        role: UserRole.admin
      }
    });
    (prisma.membership.findUnique as jest.Mock).mockResolvedValue(null);

    await deleteIncident(createFormData({}));

    expect(prisma.incident.findFirst).not.toHaveBeenCalled();
    expect(prisma.incident.delete).not.toHaveBeenCalled();
  });

  it("No debe eliminar si la incidencia no existe", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: {
        userID: "admin-1",
        role: UserRole.admin
      }
    });
    (prisma.incident.findFirst as jest.Mock).mockResolvedValue(null);

    await deleteIncident(createFormData({}));

    expect(prisma.incident.delete).not.toHaveBeenCalled();
  });

  it("No debe eliminar incidencias que no esten resueltas", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: {
        userID: "admin-1",
        role: UserRole.admin
      }
    });
    (prisma.incident.findFirst as jest.Mock).mockResolvedValue({ status: "inProgress" });

    await deleteIncident(createFormData({}));

    expect(prisma.incident.delete).not.toHaveBeenCalled();
  });

  it("Debe eliminar incidencias resueltas y revalidar rutas", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: {
        userID: "admin-1",
        role: UserRole.admin
      }
    });
    (prisma.incident.findFirst as jest.Mock).mockResolvedValue({ status: "resolved" });
    (prisma.incident.delete as jest.Mock).mockResolvedValue({});

    await deleteIncident(createFormData({ communityID: "7" }));

    expect(prisma.incident.delete).toHaveBeenCalledWith({
      where: {
        community_user_date: {
          community: 7,
          user: "user-1",
          date: new Date("2026-05-02T09:30:00.000Z")
        }
      }
    });
    expect(revalidatePath).toHaveBeenCalledWith("/communities/7/incidencias");
    expect(revalidatePath).toHaveBeenCalledWith("/communities/7/overview");
  });

  it("No debe lanzar error si prisma.delete falla", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: {
        userID: "admin-1",
        role: UserRole.webAdmin
      }
    });
    (prisma.incident.findFirst as jest.Mock).mockResolvedValue({ status: "resolved" });
    (prisma.incident.delete as jest.Mock).mockRejectedValue(new Error("DB error"));

    await expect(deleteIncident(createFormData({}))).resolves.toBeUndefined();
    expect(revalidatePath).not.toHaveBeenCalled();
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
    (prisma.membership.findUnique as jest.Mock).mockResolvedValue({ user: "user-1" });
  });

  it("No debe hacer nada si el usuario no esta autenticado", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: false });

    await addIncident(1, createFormData({}));

    expect(prisma.incident.create).not.toHaveBeenCalled();
  });

  it("No debe hacer nada si los datos son invalidos", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: true, session: { userID: "user-1" } });

    await addIncident(0, createFormData({ titulo: "", descripcion: "" }));

    expect(prisma.incident.create).not.toHaveBeenCalled();
  });

  it("No debe crear incidencia si el titulo queda vacio tras trim", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: true, session: { userID: "user-1" } });

    await addIncident(3, createFormData({ titulo: "   ", descripcion: "Descripcion valida" }));

    expect(prisma.incident.create).not.toHaveBeenCalled();
  });

  it("No debe crear incidencia si la descripcion queda vacia tras trim", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: true, session: { userID: "user-1" } });

    await addIncident(3, createFormData({ titulo: "Titulo valido", descripcion: "   " }));

    expect(prisma.incident.create).not.toHaveBeenCalled();
  });

  it("No debe crear incidencia si faltan titulo y descripcion en el FormData", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: true, session: { userID: "user-1" } });
    const formData = new FormData();

    await addIncident(3, formData);

    expect(prisma.incident.create).not.toHaveBeenCalled();
  });

  it("No debe crear incidencia si el usuario no esta inscrito en la comunidad", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: true, session: { userID: "user-1" } });
    (prisma.membership.findUnique as jest.Mock).mockResolvedValue(null);

    await addIncident(3, createFormData({}));

    expect(prisma.incident.create).not.toHaveBeenCalled();
  });

  it("Debe crear incidencia y revalidar rutas", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: true, session: { userID: "user-1" } });
    (prisma.incident.create as jest.Mock).mockResolvedValue({});

    await addIncident(3, createFormData({ titulo: "  Luz fundida  ", descripcion: "  Escalera oscura  " }));

    expect(prisma.incident.create).toHaveBeenCalledWith({
      data: {
        community: 3,
        user: "user-1",
        title: "Luz fundida",
        description: "Escalera oscura",
        status: "reported"
      }
    });
    expect(revalidatePath).toHaveBeenCalledWith("/communities/3/incidencias");
    expect(revalidatePath).toHaveBeenCalledWith("/communities/3/overview");
  });

  it("No debe lanzar error si prisma.create falla", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: true, session: { userID: "user-1" } });
    (prisma.incident.create as jest.Mock).mockRejectedValue(new Error("DB error"));

    await expect(addIncident(3, createFormData({}))).resolves.toBeUndefined();
    expect(revalidatePath).not.toHaveBeenCalled();
  });
});

describe("Suite de pruebas de deleteIncidentAdmin", () => {
  const createFormData = ({
    comunidad = "3",
    usuario = "user-1",
    fecha = "2026-05-02T09:30:00.000Z"
  }: {
    comunidad?: string;
    usuario?: string;
    fecha?: string;
  }) => {
    const formData = new FormData();

    formData.append("comunidad", comunidad);
    formData.append("usuario", usuario);
    formData.append("fecha", fecha);

    return formData;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("No debe hacer nada si no hay sesion autenticada", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: false });

    await deleteIncidentAdmin(createFormData({}));

    expect(prisma.incident.delete).not.toHaveBeenCalled();
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("No debe hacer nada si el rol no es webAdmin", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: { userID: "admin-1", role: UserRole.admin }
    });

    await deleteIncidentAdmin(createFormData({}));

    expect(prisma.incident.delete).not.toHaveBeenCalled();
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("No debe hacer nada si los datos son invalidos", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: { userID: "webadmin-1", role: UserRole.webAdmin }
    });

    await deleteIncidentAdmin(createFormData({ comunidad: "abc", fecha: "fecha-invalida" }));

    expect(prisma.incident.delete).not.toHaveBeenCalled();
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("No debe hacer nada si faltan usuario y fecha en el FormData", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: { userID: "webadmin-1", role: UserRole.webAdmin }
    });

    const formData = new FormData();
    formData.append("comunidad", "7");

    await deleteIncidentAdmin(formData);

    expect(prisma.incident.delete).not.toHaveBeenCalled();
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("Debe eliminar incidencia y revalidar rutas", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: { userID: "webadmin-1", role: UserRole.webAdmin }
    });
    (prisma.incident.delete as jest.Mock).mockResolvedValue({});

    await deleteIncidentAdmin(createFormData({ comunidad: "7", usuario: "u-9" }));

    expect(prisma.incident.delete).toHaveBeenCalledWith({
      where: {
        community_user_date: {
          community: 7,
          user: "u-9",
          date: new Date("2026-05-02T09:30:00.000Z")
        }
      }
    });
    expect(revalidatePath).toHaveBeenCalledWith("/backoffice/incidencias");
    expect(revalidatePath).toHaveBeenCalledWith("/backoffice/overview");
  });

  it("No debe lanzar error si prisma.delete falla", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: { userID: "webadmin-1", role: UserRole.webAdmin }
    });
    (prisma.incident.delete as jest.Mock).mockRejectedValue(new Error("DB error"));

    await expect(deleteIncidentAdmin(createFormData({}))).resolves.toBeUndefined();
    expect(revalidatePath).not.toHaveBeenCalled();
  });
});
