import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { UserRole } from "@/types";
import { revalidatePath } from "next/cache";
import { deleteUser } from "./user";

// Mocks
jest.mock("@/lib/dal", () => jest.fn());
jest.mock("next/cache", () => ({
  revalidatePath: jest.fn()
}));

jest.mock("@/lib/prisma", () => ({
  __esModule: true,
  default: {
    usuario: {
      delete: jest.fn()
    }
  }
}));

describe("Suite de pruebas de las server function de user", () => {
  const verifySessionMock = verifySession as jest.Mock;
  const prismaUsuarioDeleteMock = (prisma as any).usuario.delete as jest.Mock;
  const revalidatePathMock = revalidatePath as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Debe salir sin hacer nada si no hay sesión autenticada", async () => {
    verifySessionMock.mockResolvedValue({ isAuth: false });

    const formData = new FormData();
    formData.set("id", "user-1");

    await expect(deleteUser(formData)).resolves.toBeUndefined();

    expect(prismaUsuarioDeleteMock).not.toHaveBeenCalled();
    expect(revalidatePathMock).not.toHaveBeenCalled();
  });

  it("Debe salir sin hacer nada si el rol no es webAdmin", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: { userID: "admin-1", role: UserRole.admin }
    });

    const formData = new FormData();
    formData.set("id", "user-1");

    await expect(deleteUser(formData)).resolves.toBeUndefined();

    expect(prismaUsuarioDeleteMock).not.toHaveBeenCalled();
    expect(revalidatePathMock).not.toHaveBeenCalled();
  });

  it("Debe salir sin hacer nada si el id es vacío", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: { userID: "web-admin-1", role: UserRole.webAdmin }
    });

    const formData = new FormData();
    formData.set("id", "   ");

    await expect(deleteUser(formData)).resolves.toBeUndefined();

    expect(prismaUsuarioDeleteMock).not.toHaveBeenCalled();
    expect(revalidatePathMock).not.toHaveBeenCalled();
  });

  it("Debe salir sin hacer nada si no se envía id", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: { userID: "web-admin-1", role: UserRole.webAdmin }
    });

    const formData = new FormData();

    await expect(deleteUser(formData)).resolves.toBeUndefined();

    expect(prismaUsuarioDeleteMock).not.toHaveBeenCalled();
    expect(revalidatePathMock).not.toHaveBeenCalled();
  });

  it("Debe eliminar usuario y revalidar rutas cuando todo es válido", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: { userID: "web-admin-1", role: UserRole.webAdmin }
    });
    prismaUsuarioDeleteMock.mockResolvedValue({});

    const formData = new FormData();
    formData.set("id", "  user-25  ");

    await expect(deleteUser(formData)).resolves.toBeUndefined();

    expect(prismaUsuarioDeleteMock).toHaveBeenCalledWith({
      where: { id: "user-25" }
    });
    expect(revalidatePathMock).toHaveBeenCalledTimes(2);
    expect(revalidatePathMock).toHaveBeenNthCalledWith(1, "/backoffice/usuarios");
    expect(revalidatePathMock).toHaveBeenNthCalledWith(2, "/backoffice/overview");
  });

  it("Debe ignorar el error de prisma en deleteUser", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: { userID: "web-admin-1", role: UserRole.webAdmin }
    });

    prismaUsuarioDeleteMock.mockRejectedValue(new Error("DB delete failed"));

    const formData = new FormData();
    formData.set("id", "user-25");

    await expect(deleteUser(formData)).resolves.toBeUndefined();

    expect(prismaUsuarioDeleteMock).toHaveBeenCalledWith({
      where: { id: "user-25" }
    });
    expect(revalidatePathMock).not.toHaveBeenCalled();
  });
});
