import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { UserRole } from "@/types";
import { revalidatePath } from "next/cache";
import { addMessage, deleteMessage } from "./communityMessage";

jest.mock("@/lib/dal", () => jest.fn());
jest.mock("next/cache", () => ({
  revalidatePath: jest.fn()
}));
jest.mock("@/lib/prisma", () => ({
  membership: {
    findUnique: jest.fn()
  },
  message: {
    create: jest.fn(),
    delete: jest.fn()
  }
}));

describe("communityMessage test suite", () => {
  const verifySessionMock = verifySession as jest.Mock;
  const prismaCreateMock = prisma.message.create as jest.Mock;
  const prismaDeleteMock = prisma.message.delete as jest.Mock;
  const revalidatePathMock = revalidatePath as jest.Mock;

  const createFormData = (text?: string) => {
    const formData = new FormData();

    if (text !== undefined) {
      formData.append("texto", text);
    }

    return formData;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (prisma.membership.findUnique as jest.Mock).mockResolvedValue({ user: "admin-1" });
  });

  it("Should not add a message if there is no session", async () => {
    verifySessionMock.mockResolvedValue({ isAuth: false });

    await addMessage(10, createFormData("Mensaje valido"));

    expect(prismaCreateMock).not.toHaveBeenCalled();
    expect(revalidatePathMock).not.toHaveBeenCalled();
  });

  it("Should not add a message if the user is not admin", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: {
        userID: "user-1",
        role: UserRole.tenant
      }
    });

    await addMessage(10, createFormData("Mensaje valido"));

    expect(prismaCreateMock).not.toHaveBeenCalled();
    expect(revalidatePathMock).not.toHaveBeenCalled();
  });

  it("Should not add a message if text is empty or blank", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: {
        userID: "admin-1",
        role: UserRole.admin
      }
    });

    await addMessage(10, createFormData("   \n  "));

    expect(prismaCreateMock).not.toHaveBeenCalled();
    expect(revalidatePathMock).not.toHaveBeenCalled();
  });

  it("Should add a message and revalidate if the user is admin", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: {
        userID: "admin-1",
        role: UserRole.admin
      }
    });
    prismaCreateMock.mockResolvedValue({});

    await addMessage(15, createFormData("  Aviso de reunion  "));

    expect(prismaCreateMock).toHaveBeenCalledWith({
      data: {
        community: 15,
        text: "Aviso de reunion"
      }
    });
    expect(revalidatePathMock).toHaveBeenCalledWith("/communities/15/overview");
  });

  it("Should add a message and revalidate if the user is webAdmin", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: {
        userID: "webadmin-1",
        role: UserRole.webAdmin
      }
    });
    prismaCreateMock.mockResolvedValue({});

    await addMessage(22, createFormData("Mensaje web admin"));

    expect(prismaCreateMock).toHaveBeenCalledWith({
      data: {
        community: 22,
        text: "Mensaje web admin"
      }
    });
    expect(revalidatePathMock).toHaveBeenCalledWith("/communities/22/overview");
  });

  it("Should not add a message if the user is not a member of the community", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: {
        userID: "admin-1",
        role: UserRole.admin
      }
    });
    (prisma.membership.findUnique as jest.Mock).mockResolvedValue(null);

    await addMessage(15, createFormData("Mensaje"));

    expect(prismaCreateMock).not.toHaveBeenCalled();
    expect(revalidatePathMock).not.toHaveBeenCalled();
  });

  it("Should not propagate error or revalidate if create fails", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: {
        userID: "admin-1",
        role: UserRole.admin
      }
    });
    prismaCreateMock.mockRejectedValue(new Error("DB error"));

    await expect(addMessage(15, createFormData("Mensaje"))).resolves.toBeUndefined();
    expect(revalidatePathMock).not.toHaveBeenCalled();
  });

  it("Should not delete a message if there is no session", async () => {
    verifySessionMock.mockResolvedValue({ isAuth: false });

    await deleteMessage(7, new Date("2026-05-02T09:30:00.000Z"));

    expect(prismaDeleteMock).not.toHaveBeenCalled();
    expect(revalidatePathMock).not.toHaveBeenCalled();
  });

  it("Should not delete a message if the user is not admin", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: {
        userID: "user-1",
        role: UserRole.tenant
      }
    });

    await deleteMessage(7, new Date("2026-05-02T09:30:00.000Z"));

    expect(prismaDeleteMock).not.toHaveBeenCalled();
    expect(revalidatePathMock).not.toHaveBeenCalled();
  });

  it("Should delete a message and revalidate if the user is admin", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: {
        userID: "admin-1",
        role: UserRole.admin
      }
    });
    prismaDeleteMock.mockResolvedValue({});

    const createdAt = new Date("2026-05-02T09:30:00.000Z");
    await deleteMessage(7, createdAt);

    expect(prismaDeleteMock).toHaveBeenCalledWith({
      where: {
        createdAt_community: {
          createdAt: createdAt,
          community: 7
        }
      }
    });
    expect(revalidatePathMock).toHaveBeenCalledWith("/communities/7/overview");
  });

  it("Should delete a message and revalidate if the user is webAdmin", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: {
        userID: "webadmin-1",
        role: UserRole.webAdmin
      }
    });
    prismaDeleteMock.mockResolvedValue({});

    const createdAt = new Date("2026-05-02T09:30:00.000Z");
    await deleteMessage(11, createdAt);

    expect(prismaDeleteMock).toHaveBeenCalledWith({
      where: {
        createdAt_community: {
          createdAt: createdAt,
          community: 11
        }
      }
    });
    expect(revalidatePathMock).toHaveBeenCalledWith("/communities/11/overview");
  });

  it("Should not delete a message if the user is not a member of the community", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: {
        userID: "admin-1",
        role: UserRole.admin
      }
    });
    (prisma.membership.findUnique as jest.Mock).mockResolvedValue(null);

    await deleteMessage(7, new Date("2026-05-02T09:30:00.000Z"));

    expect(prismaDeleteMock).not.toHaveBeenCalled();
    expect(revalidatePathMock).not.toHaveBeenCalled();
  });

  it("Should not propagate error or revalidate if delete fails", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: {
        userID: "admin-1",
        role: UserRole.admin
      }
    });
    prismaDeleteMock.mockRejectedValue(new Error("DB error"));

    await expect(deleteMessage(7, new Date("2026-05-02T09:30:00.000Z"))).resolves.toBeUndefined();
    expect(revalidatePathMock).not.toHaveBeenCalled();
  });
});
