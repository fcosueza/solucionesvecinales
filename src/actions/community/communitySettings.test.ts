import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { UserRole } from "@/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { deleteCommunity, deleteCommunityAdmin, updateCommunity } from "./communitySettings";

jest.mock("@/lib/dal", () => jest.fn());
jest.mock("next/cache", () => ({
  revalidatePath: jest.fn()
}));
jest.mock("next/navigation", () => ({
  redirect: jest.fn()
}));
jest.mock("@/lib/prisma", () => ({
  community: {
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  }
}));

describe("communitySettings test suite", () => {
  const verifySessionMock = verifySession as jest.Mock;
  const findUniqueMock = prisma.community.findUnique as jest.Mock;
  const updateMock = prisma.community.update as jest.Mock;
  const deleteMock = prisma.community.delete as jest.Mock;
  const redirectMock = jest.mocked(redirect);
  const revalidatePathMock = jest.mocked(revalidatePath);

  const createCommunityFormData = (communityID = "1") => {
    const formData = new FormData();

    formData.append("communityID", communityID);
    formData.append("name", "Comunidad Centro");
    formData.append("street", "Mayor");
    formData.append("number", "10");
    formData.append("city", "Madrid");
    formData.append("province", "Madrid");
    formData.append("country", "Espana");

    return formData;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("updateCommunity", () => {
    it("Should return an error if the user is not authenticated", async () => {
      verifySessionMock.mockResolvedValue({ isAuth: false });

      const formData = createCommunityFormData();
      const result = await updateCommunity({ state: "error", message: "" }, formData);

      expect(result.state).toBe("error");
      expect(result.message).toBe("Debes iniciar sesión para actualizar la comunidad");
      expect(findUniqueMock).not.toHaveBeenCalled();
      expect(updateMock).not.toHaveBeenCalled();
    });

    it("Should return an error if the user does not own the community", async () => {
      verifySessionMock.mockResolvedValue({
        isAuth: true,
        session: {
          userID: "admin-1",
          role: UserRole.admin
        }
      });
      findUniqueMock.mockResolvedValue({ adminId: "another-admin" });

      const formData = createCommunityFormData("5");
      const result = await updateCommunity({ state: "error", message: "" }, formData);

      expect(result.state).toBe("error");
      expect(result.message).toBe("No tienes permisos para actualizar esta comunidad");
      expect(updateMock).not.toHaveBeenCalled();
    });

    it("Should return an error if the user is not admin", async () => {
      verifySessionMock.mockResolvedValue({
        isAuth: true,
        session: {
          userID: "tenant-1",
          role: UserRole.tenant
        }
      });

      const formData = createCommunityFormData("5");
      const result = await updateCommunity({ state: "error", message: "" }, formData);

      expect(result.state).toBe("error");
      expect(result.message).toBe("No tienes permisos para actualizar esta comunidad");
      expect(findUniqueMock).not.toHaveBeenCalled();
      expect(updateMock).not.toHaveBeenCalled();
    });

    it("Should return an error if community id is invalid", async () => {
      verifySessionMock.mockResolvedValue({
        isAuth: true,
        session: {
          userID: "admin-1",
          role: UserRole.admin
        }
      });

      const formData = createCommunityFormData("NaN");
      const result = await updateCommunity({ state: "error", message: "" }, formData);

      expect(result.state).toBe("error");
      expect(result.message).toBe("ID de comunidad no válido");
      expect(findUniqueMock).not.toHaveBeenCalled();
      expect(updateMock).not.toHaveBeenCalled();
    });

    it("Should return an error if form validation fails", async () => {
      verifySessionMock.mockResolvedValue({
        isAuth: true,
        session: {
          userID: "admin-1",
          role: UserRole.admin
        }
      });
      findUniqueMock.mockResolvedValue({ adminId: "admin-1" });

      const formData = createCommunityFormData("2");
      formData.set("name", "A");

      const result = await updateCommunity({ state: "error", message: "" }, formData);

      expect(result.state).toBe("error");
      expect(result.message).toBe("Datos del formulario incorrectos");
      expect(result.errors).toBeDefined();
      expect(updateMock).not.toHaveBeenCalled();
    });

    it("Should update the community when data is valid", async () => {
      verifySessionMock.mockResolvedValue({
        isAuth: true,
        session: {
          userID: "admin-1",
          role: UserRole.admin
        }
      });
      findUniqueMock.mockResolvedValue({ adminId: "admin-1" });
      updateMock.mockResolvedValue({});

      const formData = createCommunityFormData("7");
      const result = await updateCommunity({ state: "error", message: "" }, formData);

      expect(result).toEqual({
        state: "success",
        message: "Comunidad actualizada correctamente"
      });
      expect(updateMock).toHaveBeenCalledWith({
        where: { id: 7 },
        data: {
          name: "Comunidad Centro",
          street: "Mayor",
          number: 10,
          city: "Madrid",
          province: "Madrid",
          country: "Espana"
        }
      });
    });

    it("Should return an error when update fails", async () => {
      verifySessionMock.mockResolvedValue({
        isAuth: true,
        session: {
          userID: "admin-1",
          role: UserRole.admin
        }
      });
      findUniqueMock.mockResolvedValue({ adminId: "admin-1" });
      updateMock.mockRejectedValue(new Error("DB error"));

      const formData = createCommunityFormData("7");
      const result = await updateCommunity({ state: "error", message: "" }, formData);

      expect(result.state).toBe("error");
      expect(result.message).toBe("No se pudo actualizar la comunidad. Inténtalo de nuevo.");
      expect(result.payload).toBe(formData);
    });
  });

  describe("deleteCommunity", () => {
    it("Should return an error if the user is not authenticated", async () => {
      verifySessionMock.mockResolvedValue({ isAuth: false });

      const formData = createCommunityFormData("8");
      const result = await deleteCommunity({ state: "error", message: "" }, formData);

      expect(result.state).toBe("error");
      expect(result.message).toBe("Debes iniciar sesión para eliminar la comunidad");
      expect(findUniqueMock).not.toHaveBeenCalled();
      expect(deleteMock).not.toHaveBeenCalled();
      expect(redirectMock).not.toHaveBeenCalled();
    });

    it("Should return an error if the user is not admin", async () => {
      verifySessionMock.mockResolvedValue({
        isAuth: true,
        session: {
          userID: "tenant-1",
          role: UserRole.tenant
        }
      });

      const formData = createCommunityFormData("8");
      const result = await deleteCommunity({ state: "error", message: "" }, formData);

      expect(result.state).toBe("error");
      expect(result.message).toBe("No tienes permisos para eliminar esta comunidad");
      expect(findUniqueMock).not.toHaveBeenCalled();
      expect(deleteMock).not.toHaveBeenCalled();
    });

    it("Should return an error if community id is invalid", async () => {
      verifySessionMock.mockResolvedValue({
        isAuth: true,
        session: {
          userID: "admin-1",
          role: UserRole.admin
        }
      });

      const formData = createCommunityFormData("NaN");
      const result = await deleteCommunity({ state: "error", message: "" }, formData);

      expect(result.state).toBe("error");
      expect(result.message).toBe("ID de comunidad no válido");
      expect(findUniqueMock).not.toHaveBeenCalled();
      expect(deleteMock).not.toHaveBeenCalled();
    });

    it("Should return an error if the user does not own the community", async () => {
      verifySessionMock.mockResolvedValue({
        isAuth: true,
        session: {
          userID: "admin-1",
          role: UserRole.admin
        }
      });
      findUniqueMock.mockResolvedValue({ adminId: "another-admin" });

      const formData = createCommunityFormData("8");
      const result = await deleteCommunity({ state: "error", message: "" }, formData);

      expect(result.state).toBe("error");
      expect(result.message).toBe("No tienes permisos para eliminar esta comunidad");
      expect(deleteMock).not.toHaveBeenCalled();
      expect(redirectMock).not.toHaveBeenCalled();
    });

    it("Should return an error when delete fails", async () => {
      verifySessionMock.mockResolvedValue({
        isAuth: true,
        session: {
          userID: "admin-1",
          role: UserRole.admin
        }
      });
      findUniqueMock.mockResolvedValue({ adminId: "admin-1" });
      deleteMock.mockRejectedValue(new Error("DB error"));

      const formData = createCommunityFormData("8");
      const result = await deleteCommunity({ state: "error", message: "" }, formData);

      expect(result.state).toBe("error");
      expect(result.message).toBe("No se pudo eliminar la comunidad. Inténtalo de nuevo.");
      expect(redirectMock).not.toHaveBeenCalled();
    });

    it("Should delete and redirect when user is allowed", async () => {
      verifySessionMock.mockResolvedValue({
        isAuth: true,
        session: {
          userID: "admin-1",
          role: UserRole.admin
        }
      });
      findUniqueMock.mockResolvedValue({ adminId: "admin-1" });
      deleteMock.mockResolvedValue({});

      const formData = createCommunityFormData("8");
      await deleteCommunity({ state: "error", message: "" }, formData);

      expect(deleteMock).toHaveBeenCalledWith({ where: { id: 8 } });
      expect(redirectMock).toHaveBeenCalledWith("/communities");
    });
  });

  describe("deleteCommunityAdmin", () => {
    it("Should do nothing if user is not authenticated", async () => {
      verifySessionMock.mockResolvedValue({ isAuth: false });

      const formData = new FormData();
      formData.append("id", "10");

      await deleteCommunityAdmin(formData);

      expect(deleteMock).not.toHaveBeenCalled();
      expect(revalidatePathMock).not.toHaveBeenCalled();
    });

    it("Should do nothing if role is not webAdmin", async () => {
      verifySessionMock.mockResolvedValue({
        isAuth: true,
        session: {
          userID: "admin-1",
          role: UserRole.admin
        }
      });

      const formData = new FormData();
      formData.append("id", "10");

      await deleteCommunityAdmin(formData);

      expect(deleteMock).not.toHaveBeenCalled();
      expect(revalidatePathMock).not.toHaveBeenCalled();
    });

    it("Should do nothing if id is invalid", async () => {
      verifySessionMock.mockResolvedValue({
        isAuth: true,
        session: {
          userID: "webadmin-1",
          role: UserRole.webAdmin
        }
      });

      const formData = new FormData();
      formData.append("id", "NaN");

      await deleteCommunityAdmin(formData);

      expect(deleteMock).not.toHaveBeenCalled();
      expect(revalidatePathMock).not.toHaveBeenCalled();
    });

    it("Should delete and revalidate both backoffice paths", async () => {
      verifySessionMock.mockResolvedValue({
        isAuth: true,
        session: {
          userID: "webadmin-1",
          role: UserRole.webAdmin
        }
      });
      deleteMock.mockResolvedValue({});

      const formData = new FormData();
      formData.append("id", "12");

      await deleteCommunityAdmin(formData);

      expect(deleteMock).toHaveBeenCalledWith({ where: { id: 12 } });
      expect(revalidatePathMock).toHaveBeenCalledWith("/backoffice/communities");
      expect(revalidatePathMock).toHaveBeenCalledWith("/backoffice/overview");
    });

    it("Should not throw or revalidate if delete fails", async () => {
      verifySessionMock.mockResolvedValue({
        isAuth: true,
        session: {
          userID: "webadmin-1",
          role: UserRole.webAdmin
        }
      });
      deleteMock.mockRejectedValue(new Error("DB error"));

      const formData = new FormData();
      formData.append("id", "12");

      await expect(deleteCommunityAdmin(formData)).resolves.toBeUndefined();
      expect(revalidatePathMock).not.toHaveBeenCalled();
    });
  });
});
