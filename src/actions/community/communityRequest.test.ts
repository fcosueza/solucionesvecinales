import { deleteRequest, requestCommunitySubscription } from "./communityRequest";
import prisma from "@/lib/prisma";
import verifySession from "@/lib/dal";
import { revalidatePath } from "next/cache";
import { UserRole } from "@/types";

jest.mock("@/lib/dal", () => jest.fn());
jest.mock("next/cache", () => ({
  revalidatePath: jest.fn()
}));
jest.mock("@/lib/prisma", () => ({
  community: {
    findUnique: jest.fn()
  },
  user: {
    findUnique: jest.fn()
  },
  request: {
    findFirst: jest.fn(),
    create: jest.fn(),
    delete: jest.fn()
  }
}));

describe("requestCommunitySubscription test suite", () => {
  const formDataWithCommunity = (communityID: string) => {
    const formData = new FormData();

    formData.append("communityID", communityID);

    return formData;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should do nothing if the user is not authenticated", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: false });

    await requestCommunitySubscription(formDataWithCommunity("5"));

    expect(prisma.community.findUnique).not.toHaveBeenCalled();
    expect(prisma.request.create).not.toHaveBeenCalled();
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("Should do nothing if communityID is invalid", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: {
        userID: "tenant-1"
      }
    });

    await requestCommunitySubscription(formDataWithCommunity("abc"));

    expect(prisma.community.findUnique).not.toHaveBeenCalled();
    expect(prisma.request.create).not.toHaveBeenCalled();
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("Should not create a request if the user is an admin", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: {
        userID: "admin-1",
        role: "admin"
      }
    });

    await requestCommunitySubscription(formDataWithCommunity("5"));

    expect(prisma.community.findUnique).not.toHaveBeenCalled();
    expect(prisma.user.findUnique).not.toHaveBeenCalled();
    expect(prisma.request.findFirst).not.toHaveBeenCalled();
    expect(prisma.request.create).not.toHaveBeenCalled();
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("Should not create a request if the user is already subscribed", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: {
        userID: "tenant-1"
      }
    });

    (prisma.community.findUnique as jest.Mock).mockResolvedValue({ id: 5 });
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      memberships: [{ community: 5 }]
    });
    (prisma.request.findFirst as jest.Mock).mockResolvedValue(null);

    await requestCommunitySubscription(formDataWithCommunity("5"));

    expect(prisma.request.create).not.toHaveBeenCalled();
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("Should not create a request if a pending request already exists", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: {
        userID: "tenant-1"
      }
    });

    (prisma.community.findUnique as jest.Mock).mockResolvedValue({ id: 5 });
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      memberships: []
    });
    (prisma.request.findFirst as jest.Mock).mockResolvedValue({ id: 10 });

    await requestCommunitySubscription(formDataWithCommunity("5"));

    expect(prisma.request.create).not.toHaveBeenCalled();
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("Should create a new pending request when applicable", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: {
        userID: "tenant-1"
      }
    });

    (prisma.community.findUnique as jest.Mock).mockResolvedValue({ id: 5 });
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      memberships: []
    });
    (prisma.request.findFirst as jest.Mock).mockResolvedValue(null);

    await requestCommunitySubscription(formDataWithCommunity("5"));

    expect(prisma.request.create).toHaveBeenCalledWith({
      data: {
        user: "tenant-1",
        community: 5,
        status: "pending"
      }
    });
    expect(revalidatePath).toHaveBeenCalledWith("/communities/search");
  });

  it("Should not create a request if the community does not exist", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: {
        userID: "tenant-1"
      }
    });

    (prisma.community.findUnique as jest.Mock).mockResolvedValue(null);
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({ memberships: [] });
    (prisma.request.findFirst as jest.Mock).mockResolvedValue(null);

    await requestCommunitySubscription(formDataWithCommunity("5"));

    expect(prisma.request.create).not.toHaveBeenCalled();
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("Should not create a request if the user has no memberships (userWithCommunities is null)", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: {
        userID: "tenant-1"
      }
    });

    (prisma.community.findUnique as jest.Mock).mockResolvedValue({ id: 5 });
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
    (prisma.request.findFirst as jest.Mock).mockResolvedValue(null);

    await requestCommunitySubscription(formDataWithCommunity("5"));

    expect(prisma.request.create).toHaveBeenCalled();
  });
});

describe("deleteRequest test suite", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should do nothing if there is no authenticated session", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: false });

    const formData = new FormData();
    formData.append("id", "10");

    await deleteRequest(formData);

    expect(prisma.request.delete).not.toHaveBeenCalled();
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("Should do nothing if the role is not webAdmin", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: { userID: "admin-1", role: UserRole.admin }
    });

    const formData = new FormData();
    formData.append("id", "10");

    await deleteRequest(formData);

    expect(prisma.request.delete).not.toHaveBeenCalled();
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("Should do nothing if the id is invalid", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: { userID: "webadmin-1", role: UserRole.webAdmin }
    });

    const formData = new FormData();
    formData.append("id", "abc");

    await deleteRequest(formData);

    expect(prisma.request.delete).not.toHaveBeenCalled();
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("Should delete request and revalidate routes", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: { userID: "webadmin-1", role: UserRole.webAdmin }
    });
    (prisma.request.delete as jest.Mock).mockResolvedValue({});

    const formData = new FormData();
    formData.append("id", "24");

    await deleteRequest(formData);

    expect(prisma.request.delete).toHaveBeenCalledWith({ where: { id: 24 } });
    expect(revalidatePath).toHaveBeenCalledWith("/backoffice/requests");
    expect(revalidatePath).toHaveBeenCalledWith("/backoffice/overview");
  });

  it("Should not throw an error if prisma.delete fails", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: { userID: "webadmin-1", role: UserRole.webAdmin }
    });
    (prisma.request.delete as jest.Mock).mockRejectedValue(new Error("DB error"));

    const formData = new FormData();
    formData.append("id", "24");

    await expect(deleteRequest(formData)).resolves.toBeUndefined();
    expect(revalidatePath).not.toHaveBeenCalled();
  });
});
