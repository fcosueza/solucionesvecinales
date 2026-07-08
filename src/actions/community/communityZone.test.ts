import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { UserRole } from "@/types";
import { revalidatePath } from "next/cache";
import { createZone, deleteZone, deleteZoneAdmin } from "./communityZone";

jest.mock("@/lib/dal", () => jest.fn());
jest.mock("next/cache", () => ({
  revalidatePath: jest.fn()
}));
jest.mock("@/lib/prisma", () => ({
  community: {
    findUnique: jest.fn()
  },
  zone: {
    create: jest.fn(),
    delete: jest.fn()
  }
}));

describe("communityZone test suite", () => {
  const verifySessionMock = verifySession as jest.Mock;
  const findUniqueMock = prisma.community.findUnique as jest.Mock;
  const createMock = prisma.zone.create as jest.Mock;
  const deleteMock = prisma.zone.delete as jest.Mock;
  const revalidatePathMock = jest.mocked(revalidatePath);

  const createZoneFormData = ({
    name = "Piscina",
    description = "Zona para verano",
    startTime = "09:00",
    endTime = "21:00"
  }: {
    name?: string;
    description?: string;
    startTime?: string;
    endTime?: string;
  }) => {
    const formData = new FormData();
    formData.append("nombre", name);
    formData.append("descripcion", description);
    formData.append("horaInicio", startTime);
    formData.append("horaFin", endTime);
    return formData;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createZone", () => {
    it("Should return an error if the user is not authenticated", async () => {
      verifySessionMock.mockResolvedValue({ isAuth: false });
      const formData = createZoneFormData({});

      const result = await createZone(1, formData);

      expect(result.state).toBe("error");
      expect(result.message).toBe("Debes iniciar sesión para crear una zona común");
      expect(findUniqueMock).not.toHaveBeenCalled();
      expect(createMock).not.toHaveBeenCalled();
    });

    it("Should return an error if the user is not admin", async () => {
      verifySessionMock.mockResolvedValue({
        isAuth: true,
        session: { userID: "tenant-1", role: UserRole.tenant }
      });

      const result = await createZone(1, createZoneFormData({}));

      expect(result.state).toBe("error");
      expect(result.message).toBe("No tienes permisos para crear zonas comunes");
      expect(findUniqueMock).not.toHaveBeenCalled();
    });

    it("Should return an error if community id is invalid", async () => {
      verifySessionMock.mockResolvedValue({
        isAuth: true,
        session: { userID: "admin-1", role: UserRole.admin }
      });

      const result = await createZone(0, createZoneFormData({}));

      expect(result.state).toBe("error");
      expect(result.message).toBe("ID de comunidad no válido");
      expect(findUniqueMock).not.toHaveBeenCalled();
    });

    it("Should return an error if user does not manage the community", async () => {
      verifySessionMock.mockResolvedValue({
        isAuth: true,
        session: { userID: "admin-1", role: UserRole.admin }
      });
      findUniqueMock.mockResolvedValue({ adminId: "another-admin" });

      const result = await createZone(1, createZoneFormData({}));

      expect(result.state).toBe("error");
      expect(result.message).toBe("No tienes permisos para gestionar esta comunidad");
      expect(createMock).not.toHaveBeenCalled();
    });

    it("Should return an error if the community does not exist", async () => {
      verifySessionMock.mockResolvedValue({
        isAuth: true,
        session: { userID: "admin-1", role: UserRole.admin }
      });
      findUniqueMock.mockResolvedValue(null);

      const result = await createZone(1, createZoneFormData({}));

      expect(result.state).toBe("error");
      expect(result.message).toBe("No tienes permisos para gestionar esta comunidad");
      expect(createMock).not.toHaveBeenCalled();
    });

    it("Should return an error if required fields are missing", async () => {
      verifySessionMock.mockResolvedValue({
        isAuth: true,
        session: { userID: "admin-1", role: UserRole.admin }
      });
      findUniqueMock.mockResolvedValue({ adminId: "admin-1" });

      const result = await createZone(
        1,
        createZoneFormData({
          name: " ",
          description: " ",
          startTime: "",
          endTime: ""
        })
      );

      expect(result.state).toBe("error");
      expect(result.message).toBe("Todos los campos son requeridos");
      expect(createMock).not.toHaveBeenCalled();
    });

    it("Should return an error when required keys are missing in FormData", async () => {
      verifySessionMock.mockResolvedValue({
        isAuth: true,
        session: { userID: "admin-1", role: UserRole.admin }
      });
      findUniqueMock.mockResolvedValue({ adminId: "admin-1" });

      const formData = new FormData();
      const result = await createZone(1, formData);

      expect(result.state).toBe("error");
      expect(result.message).toBe("Todos los campos son requeridos");
      expect(createMock).not.toHaveBeenCalled();
    });

    it("Should return an error if description is too long", async () => {
      verifySessionMock.mockResolvedValue({
        isAuth: true,
        session: { userID: "admin-1", role: UserRole.admin }
      });
      findUniqueMock.mockResolvedValue({ adminId: "admin-1" });

      const result = await createZone(1, createZoneFormData({ description: "x".repeat(101) }));

      expect(result.state).toBe("error");
      expect(result.message).toBe("La descripción no puede superar los 100 caracteres");
      expect(createMock).not.toHaveBeenCalled();
    });

    it("Should return an error if time format is invalid", async () => {
      verifySessionMock.mockResolvedValue({
        isAuth: true,
        session: { userID: "admin-1", role: UserRole.admin }
      });
      findUniqueMock.mockResolvedValue({ adminId: "admin-1" });

      const result = await createZone(1, createZoneFormData({ startTime: "9", endTime: "21:00" }));

      expect(result.state).toBe("error");
      expect(result.message).toBe("Los horarios no son válidos. La hora de fin debe ser posterior a la de inicio");
      expect(createMock).not.toHaveBeenCalled();
    });

    it("Should return an error if end time is not after start time", async () => {
      verifySessionMock.mockResolvedValue({
        isAuth: true,
        session: { userID: "admin-1", role: UserRole.admin }
      });
      findUniqueMock.mockResolvedValue({ adminId: "admin-1" });

      const result = await createZone(1, createZoneFormData({ startTime: "10:00", endTime: "10:00" }));

      expect(result.state).toBe("error");
      expect(result.message).toBe("Los horarios no son válidos. La hora de fin debe ser posterior a la de inicio");
      expect(createMock).not.toHaveBeenCalled();
    });

    it("Should return duplicate error if Prisma throws P2002", async () => {
      verifySessionMock.mockResolvedValue({
        isAuth: true,
        session: { userID: "admin-1", role: UserRole.admin }
      });
      findUniqueMock.mockResolvedValue({ adminId: "admin-1" });
      createMock.mockRejectedValue({ code: "P2002" });
      const formData = createZoneFormData({});

      const result = await createZone(1, formData);

      expect(result.state).toBe("error");
      expect(result.message).toBe("Ya existe una zona con ese nombre en esta comunidad");
      expect(result.payload).toBe(formData);
      expect(revalidatePathMock).not.toHaveBeenCalled();
    });

    it("Should return generic error if Prisma create fails", async () => {
      verifySessionMock.mockResolvedValue({
        isAuth: true,
        session: { userID: "admin-1", role: UserRole.admin }
      });
      findUniqueMock.mockResolvedValue({ adminId: "admin-1" });
      createMock.mockRejectedValue(new Error("DB error"));
      const formData = createZoneFormData({});

      const result = await createZone(1, formData);

      expect(result.state).toBe("error");
      expect(result.message).toBe("No se pudo crear la zona común");
      expect(result.payload).toBe(formData);
      expect(revalidatePathMock).not.toHaveBeenCalled();
    });

    it("Should create zone and revalidate paths on success", async () => {
      verifySessionMock.mockResolvedValue({
        isAuth: true,
        session: { userID: "admin-1", role: UserRole.admin }
      });
      findUniqueMock.mockResolvedValue({ adminId: "admin-1" });
      createMock.mockResolvedValue({});

      const result = await createZone(3, createZoneFormData({ name: "  Gimnasio  ", description: "  Con maquinas  " }));

      expect(createMock).toHaveBeenCalledWith({
        data: {
          name: "Gimnasio",
          description: "Con maquinas",
          community: 3,
          startTime: new Date(Date.UTC(1970, 0, 1, 9, 0, 0, 0)),
          endTime: new Date(Date.UTC(1970, 0, 1, 21, 0, 0, 0))
        }
      });
      expect(revalidatePathMock).toHaveBeenCalledWith("/communities/3/common-areas");
      expect(revalidatePathMock).toHaveBeenCalledWith("/communities/3/overview");
      expect(result).toEqual({
        state: "success",
        message: "Zona común creada correctamente"
      });
    });
  });

  describe("deleteZone", () => {
    it("Should return an error if user is not authenticated", async () => {
      verifySessionMock.mockResolvedValue({ isAuth: false });

      const result = await deleteZone(1, "Piscina");

      expect(result.state).toBe("error");
      expect(result.message).toBe("Debes iniciar sesión para eliminar una zona común");
      expect(findUniqueMock).not.toHaveBeenCalled();
      expect(deleteMock).not.toHaveBeenCalled();
    });

    it("Should return an error if user is not admin", async () => {
      verifySessionMock.mockResolvedValue({
        isAuth: true,
        session: { userID: "tenant-1", role: UserRole.tenant }
      });

      const result = await deleteZone(1, "Piscina");

      expect(result.state).toBe("error");
      expect(result.message).toBe("No tienes permisos para eliminar zonas comunes");
      expect(findUniqueMock).not.toHaveBeenCalled();
    });

    it("Should return an error if input data is invalid", async () => {
      verifySessionMock.mockResolvedValue({
        isAuth: true,
        session: { userID: "admin-1", role: UserRole.admin }
      });

      const result = await deleteZone(0, " ");

      expect(result.state).toBe("error");
      expect(result.message).toBe("Datos no válidos");
      expect(findUniqueMock).not.toHaveBeenCalled();
    });

    it("Should return an error if user does not manage community", async () => {
      verifySessionMock.mockResolvedValue({
        isAuth: true,
        session: { userID: "admin-1", role: UserRole.admin }
      });
      findUniqueMock.mockResolvedValue(null);

      const result = await deleteZone(1, "Piscina");

      expect(result.state).toBe("error");
      expect(result.message).toBe("No tienes permisos para gestionar esta comunidad");
      expect(deleteMock).not.toHaveBeenCalled();
    });

    it("Should return an error if Prisma delete fails", async () => {
      verifySessionMock.mockResolvedValue({
        isAuth: true,
        session: { userID: "admin-1", role: UserRole.admin }
      });
      findUniqueMock.mockResolvedValue({ adminId: "admin-1" });
      deleteMock.mockRejectedValue(new Error("DB error"));

      const result = await deleteZone(2, "Piscina");

      expect(result.state).toBe("error");
      expect(result.message).toBe("No se pudo eliminar la zona común");
      expect(revalidatePathMock).not.toHaveBeenCalled();
    });

    it("Should delete zone and revalidate paths on success", async () => {
      verifySessionMock.mockResolvedValue({
        isAuth: true,
        session: { userID: "admin-1", role: UserRole.admin }
      });
      findUniqueMock.mockResolvedValue({ adminId: "admin-1" });
      deleteMock.mockResolvedValue({});

      const result = await deleteZone(2, "Piscina");

      expect(deleteMock).toHaveBeenCalledWith({
        where: {
          name_community: {
            name: "Piscina",
            community: 2
          }
        }
      });
      expect(revalidatePathMock).toHaveBeenCalledWith("/communities/2/common-areas");
      expect(revalidatePathMock).toHaveBeenCalledWith("/communities/2/overview");
      expect(result).toEqual({
        state: "success",
        message: "Zona común eliminada correctamente"
      });
    });
  });

  describe("deleteZoneAdmin", () => {
    it("Should do nothing if user is not webAdmin", async () => {
      verifySessionMock.mockResolvedValue({
        isAuth: true,
        session: { userID: "admin-1", role: UserRole.admin }
      });

      const formData = new FormData();
      formData.append("nombre", "Piscina");
      formData.append("comunidad", "1");

      await deleteZoneAdmin(formData);

      expect(deleteMock).not.toHaveBeenCalled();
      expect(revalidatePathMock).not.toHaveBeenCalled();
    });

    it("Should do nothing if form data is invalid", async () => {
      verifySessionMock.mockResolvedValue({
        isAuth: true,
        session: { userID: "webadmin-1", role: UserRole.webAdmin }
      });

      const formData = new FormData();
      formData.append("nombre", " ");
      formData.append("comunidad", "NaN");

      await deleteZoneAdmin(formData);

      expect(deleteMock).not.toHaveBeenCalled();
      expect(revalidatePathMock).not.toHaveBeenCalled();
    });

    it("Should do nothing if zone name key is missing", async () => {
      verifySessionMock.mockResolvedValue({
        isAuth: true,
        session: { userID: "webadmin-1", role: UserRole.webAdmin }
      });

      const formData = new FormData();
      formData.append("comunidad", "1");

      await deleteZoneAdmin(formData);

      expect(deleteMock).not.toHaveBeenCalled();
      expect(revalidatePathMock).not.toHaveBeenCalled();
    });

    it("Should do nothing if community id is zero", async () => {
      verifySessionMock.mockResolvedValue({
        isAuth: true,
        session: { userID: "webadmin-1", role: UserRole.webAdmin }
      });

      const formData = new FormData();
      formData.append("nombre", "Piscina");
      formData.append("comunidad", "0");

      await deleteZoneAdmin(formData);

      expect(deleteMock).not.toHaveBeenCalled();
      expect(revalidatePathMock).not.toHaveBeenCalled();
    });

    it("Should swallow errors if Prisma delete fails", async () => {
      verifySessionMock.mockResolvedValue({
        isAuth: true,
        session: { userID: "webadmin-1", role: UserRole.webAdmin }
      });
      deleteMock.mockRejectedValue(new Error("DB error"));

      const formData = new FormData();
      formData.append("nombre", "Piscina");
      formData.append("comunidad", "1");

      await expect(deleteZoneAdmin(formData)).resolves.toBeUndefined();
      expect(revalidatePathMock).not.toHaveBeenCalled();
    });

    it("Should delete zone and revalidate backoffice paths", async () => {
      verifySessionMock.mockResolvedValue({
        isAuth: true,
        session: { userID: "webadmin-1", role: UserRole.webAdmin }
      });
      deleteMock.mockResolvedValue({});

      const formData = new FormData();
      formData.append("nombre", "Piscina");
      formData.append("comunidad", "7");

      await deleteZoneAdmin(formData);

      expect(deleteMock).toHaveBeenCalledWith({
        where: {
          name_community: {
            name: "Piscina",
            community: 7
          }
        }
      });
      expect(revalidatePathMock).toHaveBeenCalledWith("/backoffice/zonas-comunes");
      expect(revalidatePathMock).toHaveBeenCalledWith("/backoffice/overview");
    });
  });
});
