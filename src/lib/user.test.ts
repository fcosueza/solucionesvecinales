import prisma from "@/lib/prisma";
import { deleteUser } from "./user";

jest.mock("@/lib/prisma", () => ({
  __esModule: true,
  default: {
    community: {
      findFirst: jest.fn()
    },
    user: {
      delete: jest.fn()
    }
  }
}));

describe("User lib helpers suite tests", () => {
  const prismaCommunityFindFirstMock = (prisma as any).community.findFirst as jest.Mock;
  const prismaUserDeleteMock = (prisma as any).user.delete as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    prismaCommunityFindFirstMock.mockResolvedValue(null);
  });

  it("should delete a user by id", async () => {
    prismaUserDeleteMock.mockResolvedValue({});

    await expect(deleteUser("user-42")).resolves.toBeNull();

    expect(prismaCommunityFindFirstMock).toHaveBeenCalledTimes(1);
    expect(prismaCommunityFindFirstMock).toHaveBeenCalledWith({
      where: { adminId: "user-42" },
      select: { id: true }
    });

    expect(prismaUserDeleteMock).toHaveBeenCalledTimes(1);
    expect(prismaUserDeleteMock).toHaveBeenCalledWith({
      where: { id: "user-42" }
    });
  });

  it("should return user_is_community_admin when user administrates communities", async () => {
    prismaCommunityFindFirstMock.mockResolvedValue({ id: "community-1" });

    await expect(deleteUser("user-42")).resolves.toEqual({
      error: "user_is_community_admin",
      message: "No se puede eliminar un usuario que aun administra comunidades"
    });

    expect(prismaUserDeleteMock).not.toHaveBeenCalled();
  });

  it("should return not_found when prisma raises P2025", async () => {
    prismaUserDeleteMock.mockRejectedValue({ code: "P2025" });

    await expect(deleteUser("user-42")).resolves.toEqual({
      error: "not_found",
      message: "No existe el usuario a eliminar"
    });
  });

  it("should propagate unknown prisma delete errors", async () => {
    prismaUserDeleteMock.mockRejectedValue(new Error("db error"));

    await expect(deleteUser("user-42")).resolves.toEqual({
      error: "delete_user_failed",
      message: "No se pudo eliminar el usuario"
    });
  });
});
