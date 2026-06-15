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
  community: {
    findFirst: jest.fn()
  },
  user: {
    delete: jest.fn()
  }
}));

describe("Test suite for user server functions", () => {
  const verifySessionMock = verifySession as jest.Mock;
  const prismaCommunityFindMock = (prisma as any).community.findFirst as jest.Mock;
  const prismaUserDeleteMock = (prisma as any).user.delete as jest.Mock;
  const revalidatePathMock = revalidatePath as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    prismaCommunityFindMock.mockResolvedValue(null);
  });

  it("Should return unauthorized error if there is no authenticated session", async () => {
    verifySessionMock.mockResolvedValue({ isAuth: false });

    const formData = new FormData();
    formData.set("id", "user-1");

    await expect(deleteUser(formData)).resolves.toEqual({
      error: "unauthorized",
      message: "You are not authorized to delete users"
    });

    expect(prismaCommunityFindMock).not.toHaveBeenCalled();
    expect(prismaUserDeleteMock).not.toHaveBeenCalled();
    expect(revalidatePathMock).not.toHaveBeenCalled();
  });

  it("Should return unauthorized error if the role is not webAdmin", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: { userID: "admin-1", role: UserRole.admin }
    });

    const formData = new FormData();
    formData.set("id", "user-1");

    await expect(deleteUser(formData)).resolves.toEqual({
      error: "unauthorized",
      message: "You are not authorized to delete users"
    });

    expect(prismaCommunityFindMock).not.toHaveBeenCalled();
    expect(prismaUserDeleteMock).not.toHaveBeenCalled();
    expect(revalidatePathMock).not.toHaveBeenCalled();
  });

  it("Should return invalid_user_id error if the id is empty", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: { userID: "web-admin-1", role: UserRole.webAdmin }
    });

    const formData = new FormData();
    formData.set("id", "   ");

    await expect(deleteUser(formData)).resolves.toEqual({
      error: "invalid_user_id",
      message: "A valid user ID is required"
    });

    expect(prismaCommunityFindMock).not.toHaveBeenCalled();
    expect(prismaUserDeleteMock).not.toHaveBeenCalled();
    expect(revalidatePathMock).not.toHaveBeenCalled();
  });

  it("Should return invalid_user_id error if no id is sent", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: { userID: "web-admin-1", role: UserRole.webAdmin }
    });

    const formData = new FormData();

    await expect(deleteUser(formData)).resolves.toEqual({
      error: "invalid_user_id",
      message: "A valid user ID is required"
    });

    expect(prismaCommunityFindMock).not.toHaveBeenCalled();
    expect(prismaUserDeleteMock).not.toHaveBeenCalled();
    expect(revalidatePathMock).not.toHaveBeenCalled();
  });

  it("Should return user_is_community_admin error if they manage any community", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: { userID: "web-admin-1", role: UserRole.webAdmin }
    });

    prismaCommunityFindMock.mockResolvedValue({ id: 10 });

    const formData = new FormData();
    formData.set("id", "user-25");

    await expect(deleteUser(formData)).resolves.toEqual({
      error: "user_is_community_admin",
      message: "Cannot delete a user who still manages communities"
    });

    expect(prismaCommunityFindMock).toHaveBeenCalledWith({
      where: { adminId: "user-25" },
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
      where: { adminId: "user-25" },
      select: { id: true }
    });
    expect(prismaUserDeleteMock).toHaveBeenCalledWith({
      where: { id: "user-25" }
    });
    expect(revalidatePathMock).toHaveBeenCalledTimes(2);
    expect(revalidatePathMock).toHaveBeenNthCalledWith(1, "/backoffice/users");
    expect(revalidatePathMock).toHaveBeenNthCalledWith(2, "/backoffice/overview");
  });

  it("Should return delete_user_failed error in deleteUser", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: { userID: "web-admin-1", role: UserRole.webAdmin }
    });

    prismaUserDeleteMock.mockRejectedValue(new Error("DB delete failed"));

    const formData = new FormData();
    formData.set("id", "user-25");

    await expect(deleteUser(formData)).resolves.toEqual({
      error: "delete_user_failed",
      message: "Could not delete user"
    });

    expect(prismaCommunityFindMock).toHaveBeenCalledWith({ where: { adminId: "user-25" }, select: { id: true } });
    expect(prismaUserDeleteMock).toHaveBeenCalledWith({
      where: { id: "user-25" }
    });
    expect(revalidatePathMock).not.toHaveBeenCalled();
  });
});
