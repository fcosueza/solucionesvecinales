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

describe("updateIncidentStatus test suite", () => {
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

  it("Should do nothing if the user is not authenticated", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: false });

    await updateIncidentStatus(createFormData({}));

    expect(prisma.incident.findFirst).not.toHaveBeenCalled();
    expect(prisma.incident.updateMany).not.toHaveBeenCalled();
  });

  it("Should do nothing if the form is invalid", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: true, session: { userID: "admin-1" } });

    await updateIncidentStatus(createFormData({ communityID: "abc", incidentDate: "invalid-date" }));

    expect(prisma.incident.findFirst).not.toHaveBeenCalled();
  });

  it("Should do nothing if userID is empty", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: true, session: { userID: "admin-1" } });

    await updateIncidentStatus(createFormData({ userID: "   " }));

    expect(prisma.incident.findFirst).not.toHaveBeenCalled();
    expect(prisma.incident.updateMany).not.toHaveBeenCalled();
  });

  it("Should do nothing if incidentDate is invalid", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: true, session: { userID: "admin-1" } });

    await updateIncidentStatus(createFormData({ incidentDate: "fecha-invalida" }));

    expect(prisma.incident.findFirst).not.toHaveBeenCalled();
    expect(prisma.incident.updateMany).not.toHaveBeenCalled();
  });

  it("Should do nothing if userID and incidentDate are missing in FormData", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: true, session: { userID: "admin-1" } });
    const formData = new FormData();
    formData.append("communityID", "1");

    await updateIncidentStatus(formData);

    expect(prisma.incident.findFirst).not.toHaveBeenCalled();
    expect(prisma.incident.updateMany).not.toHaveBeenCalled();
  });

  it("Should not update the incident if the user is not a member of the community", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: true, session: { userID: "admin-1" } });
    (prisma.membership.findUnique as jest.Mock).mockResolvedValue(null);

    await updateIncidentStatus(createFormData({}));

    expect(prisma.incident.findFirst).not.toHaveBeenCalled();
    expect(prisma.incident.updateMany).not.toHaveBeenCalled();
  });

  it("Should change status from reported to inProgress", async () => {
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
    expect(revalidatePath).toHaveBeenCalledWith("/communities/1/incidents");
    expect(revalidatePath).toHaveBeenCalledWith("/communities/1/overview");
  });

  it("Should change status from inProgress to resolved", async () => {
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

  it("Should not update if the incident is already resolved", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: true, session: { userID: "admin-1" } });
    (prisma.incident.findFirst as jest.Mock).mockResolvedValue({ status: "resolved" });

    await updateIncidentStatus(createFormData({}));

    expect(prisma.incident.updateMany).not.toHaveBeenCalled();
  });

  it("Should not update if the incident does not exist", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: true, session: { userID: "admin-1" } });
    (prisma.incident.findFirst as jest.Mock).mockResolvedValue(null);

    await updateIncidentStatus(createFormData({}));

    expect(prisma.incident.updateMany).not.toHaveBeenCalled();
  });

  it("Should use resolved status if an unexpected status is received", async () => {
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

describe("deleteIncident test suite", () => {
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

  it("Should not delete if there is no session", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: false });

    await deleteIncident(createFormData({}));

    expect(prisma.incident.findFirst).not.toHaveBeenCalled();
    expect(prisma.incident.delete).not.toHaveBeenCalled();
  });

  it("Should not delete if the user is not admin", async () => {
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

  it("Should not delete if data is invalid", async () => {
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

  it("Should not delete if userID is empty", async () => {
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

  it("Should not delete if userID and incidentDate are missing in FormData", async () => {
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

  it("Should not delete if the admin is not a member of the community", async () => {
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

  it("Should not delete if the incident does not exist", async () => {
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

  it("Should not delete incidents that are not resolved", async () => {
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

  it("Should delete resolved incidents and revalidate routes", async () => {
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
    expect(revalidatePath).toHaveBeenCalledWith("/communities/7/incidents");
    expect(revalidatePath).toHaveBeenCalledWith("/communities/7/overview");
  });

  it("Should not throw an error if prisma.delete fails", async () => {
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

describe("addIncident test suite", () => {
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

  it("Should do nothing if the user is not authenticated", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: false });

    await addIncident(1, createFormData({}));

    expect(prisma.incident.create).not.toHaveBeenCalled();
  });

  it("Should do nothing if data is invalid", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: true, session: { userID: "user-1" } });

    await addIncident(0, createFormData({ titulo: "", descripcion: "" }));

    expect(prisma.incident.create).not.toHaveBeenCalled();
  });

  it("Should not create an incident if title is empty after trim", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: true, session: { userID: "user-1" } });

    await addIncident(3, createFormData({ titulo: "   ", descripcion: "Descripcion valida" }));

    expect(prisma.incident.create).not.toHaveBeenCalled();
  });

  it("Should not create an incident if description is empty after trim", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: true, session: { userID: "user-1" } });

    await addIncident(3, createFormData({ titulo: "Titulo valido", descripcion: "   " }));

    expect(prisma.incident.create).not.toHaveBeenCalled();
  });

  it("Should not create an incident if title and description are missing in FormData", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: true, session: { userID: "user-1" } });
    const formData = new FormData();

    await addIncident(3, formData);

    expect(prisma.incident.create).not.toHaveBeenCalled();
  });

  it("Should not create an incident if the user is not a member of the community", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: true, session: { userID: "user-1" } });
    (prisma.membership.findUnique as jest.Mock).mockResolvedValue(null);

    await addIncident(3, createFormData({}));

    expect(prisma.incident.create).not.toHaveBeenCalled();
  });

  it("Should create an incident and revalidate routes", async () => {
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
    expect(revalidatePath).toHaveBeenCalledWith("/communities/3/incidents");
    expect(revalidatePath).toHaveBeenCalledWith("/communities/3/overview");
  });

  it("Should not throw an error if prisma.create fails", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: true, session: { userID: "user-1" } });
    (prisma.incident.create as jest.Mock).mockRejectedValue(new Error("DB error"));

    await expect(addIncident(3, createFormData({}))).resolves.toBeUndefined();
    expect(revalidatePath).not.toHaveBeenCalled();
  });
});

describe("deleteIncidentAdmin test suite", () => {
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

  it("Should do nothing if there is no authenticated session", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: false });

    await deleteIncidentAdmin(createFormData({}));

    expect(prisma.incident.delete).not.toHaveBeenCalled();
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("Should do nothing if the role is not webAdmin", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: { userID: "admin-1", role: UserRole.admin }
    });

    await deleteIncidentAdmin(createFormData({}));

    expect(prisma.incident.delete).not.toHaveBeenCalled();
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("Should do nothing if data is invalid", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: { userID: "webadmin-1", role: UserRole.webAdmin }
    });

    await deleteIncidentAdmin(createFormData({ comunidad: "abc", fecha: "fecha-invalida" }));

    expect(prisma.incident.delete).not.toHaveBeenCalled();
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("Should do nothing if usuario and fecha are missing in FormData", async () => {
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

  it("Should delete incident and revalidate routes", async () => {
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
    expect(revalidatePath).toHaveBeenCalledWith("/backoffice/incidents");
    expect(revalidatePath).toHaveBeenCalledWith("/backoffice/overview");
  });

  it("Should not throw an error if prisma.delete fails", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: { userID: "webadmin-1", role: UserRole.webAdmin }
    });
    (prisma.incident.delete as jest.Mock).mockRejectedValue(new Error("DB error"));

    await expect(deleteIncidentAdmin(createFormData({}))).resolves.toBeUndefined();
    expect(revalidatePath).not.toHaveBeenCalled();
  });
});
