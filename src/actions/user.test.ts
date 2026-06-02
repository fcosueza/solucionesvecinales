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
    comunidad: {
      findFirst: jest.fn()
    },
    usuario: {
      delete: jest.fn()
    }
  }
}));

describe("Test suite for user server functions", () => {
  const verifySessionMock = verifySession as jest.Mock;
  const prismaCommunityFindMock = (prisma as any).comunidad.findFirst as jest.Mock;
  const prismaUserDeleteMock = (prisma as any).usuario.delete as jest.Mock;
  const revalidatePathMock = revalidatePath as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    prismaCommunityFindMock.mockResolvedValue(null);
  });

  it("Should exit without doing anything if there is no authenticated session", async () => {
    verifySessionMock.mockResolvedValue({ isAuth: false });

    const formData = new FormData();
    formData.set("id", "user-1");

    await expect(deleteUser(formData)).resolves.toBeUndefined();

    expect(prismaCommunityFindMock).not.toHaveBeenCalled();
    expect(prismaUserDeleteMock).not.toHaveBeenCalled();
    expect(revalidatePathMock).not.toHaveBeenCalled();
  });

  it("Should exit without doing anything if the role is not webAdmin", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: { userID: "admin-1", role: UserRole.admin }
    });

    const formData = new FormData();
    formData.set("id", "user-1");

    await expect(deleteUser(formData)).resolves.toBeUndefined();

    expect(prismaCommunityFindMock).not.toHaveBeenCalled();
    expect(prismaUserDeleteMock).not.toHaveBeenCalled();
    expect(revalidatePathMock).not.toHaveBeenCalled();
  });

  it("Should exit without doing anything if the id is empty", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: { userID: "web-admin-1", role: UserRole.webAdmin }
    });

    const formData = new FormData();
    formData.set("id", "   ");

    await expect(deleteUser(formData)).resolves.toBeUndefined();

    expect(prismaCommunityFindMock).not.toHaveBeenCalled();
    expect(prismaUserDeleteMock).not.toHaveBeenCalled();
    expect(revalidatePathMock).not.toHaveBeenCalled();
  });

  it("Should exit without doing anything if no id is sent", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: { userID: "web-admin-1", role: UserRole.webAdmin }
    });

    const formData = new FormData();

    await expect(deleteUser(formData)).resolves.toBeUndefined();

    expect(prismaCommunityFindMock).not.toHaveBeenCalled();
    expect(prismaUserDeleteMock).not.toHaveBeenCalled();
    expect(revalidatePathMock).not.toHaveBeenCalled();
  });

  it("Should not delete the user if they manage any community", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: { userID: "web-admin-1", role: UserRole.webAdmin }
    });

    prismaCommunityFindMock.mockResolvedValue({ id: 10 });

    const formData = new FormData();
    formData.set("id", "user-25");

    await expect(deleteUser(formData)).resolves.toBeUndefined();

    expect(prismaCommunityFindMock).toHaveBeenCalledWith({
      where: { adminID: "user-25" },
      select: { id: true }
    });
    expect(prismaUserDeleteMock).not.toHaveBeenCalled();
    expect(revalidatePathMock).not.toHaveBeenCalled();
  });

  it("Should delete the user and revalidate paths when everything is valid", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: { userID: "web-admin-1", role: UserRole.webAdmin }
    });
    prismaUserDeleteMock.mockResolvedValue({});

    const formData = new FormData();
    formData.set("id", "  user-25  ");

    await expect(deleteUser(formData)).resolves.toBeUndefined();

    expect(prismaCommunityFindMock).toHaveBeenCalledWith({
      where: { adminID: "user-25" },
      select: { id: true }
    });
    expect(prismaUserDeleteMock).toHaveBeenCalledWith({
      where: { id: "user-25" }
    });
    expect(revalidatePathMock).toHaveBeenCalledTimes(2);
    expect(revalidatePathMock).toHaveBeenNthCalledWith(1, "/backoffice/usuarios");
    expect(revalidatePathMock).toHaveBeenNthCalledWith(2, "/backoffice/overview");
  });

  it("Should ignore the Prisma error in deleteUser", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: { userID: "web-admin-1", role: UserRole.webAdmin }
    });

    prismaUserDeleteMock.mockRejectedValue(new Error("DB delete failed"));

    const formData = new FormData();
    formData.set("id", "user-25");

    await expect(deleteUser(formData)).resolves.toBeUndefined();

    expect(prismaCommunityFindMock).toHaveBeenCalledWith({ where: { adminID: "user-25" }, select: { id: true } });
    expect(prismaUserDeleteMock).toHaveBeenCalledWith({
      where: { id: "user-25" }
    });
    expect(revalidatePathMock).not.toHaveBeenCalled();
  });
});
