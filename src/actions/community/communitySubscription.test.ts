import reviewCommunityRequest from "./communitySubscription";
import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

jest.mock("@/lib/dal", () => jest.fn());
jest.mock("next/cache", () => ({
  revalidatePath: jest.fn()
}));

const txMock = {
  request: {
    findFirst: jest.fn(),
    updateMany: jest.fn()
  },
  membership: {
    upsert: jest.fn()
  }
};

jest.mock("@/lib/prisma", () => ({
  community: {
    findUnique: jest.fn()
  },
  $transaction: jest.fn(async callback => callback(txMock))
}));

describe("reviewCommunityRequest test suite", () => {
  const createFormData = ({
    communityID = "1",
    requestID = "101",
    decision = "approve"
  }: {
    communityID?: string;
    requestID?: string;
    decision?: "approve" | "reject";
  }) => {
    const formData = new FormData();

    formData.append("communityID", communityID);
    formData.append("requestID", requestID);
    formData.append("decision", decision);

    return formData;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should do nothing if the user is not authenticated", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: false });

    await reviewCommunityRequest(createFormData({}));

    expect(prisma.community.findUnique).not.toHaveBeenCalled();
    expect(prisma.$transaction).not.toHaveBeenCalled();
  });

  it("Should not allow review if the user does not manage the community", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: {
        userID: "admin-1"
      }
    });

    (prisma.community.findUnique as jest.Mock).mockResolvedValue({ id: 1, adminId: "admin-2" });

    await reviewCommunityRequest(createFormData({}));

    expect(prisma.$transaction).not.toHaveBeenCalled();
    expect(txMock.request.updateMany).not.toHaveBeenCalled();
  });

  it("Should approve a pending request and create membership", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: {
        userID: "admin-1"
      }
    });

    (prisma.community.findUnique as jest.Mock).mockResolvedValue({ id: 1, adminId: "admin-1" });
    txMock.request.findFirst.mockResolvedValue({ user: "user-1" });
    txMock.request.updateMany.mockResolvedValue({ count: 1 });

    await reviewCommunityRequest(createFormData({ decision: "approve" }));

    expect(txMock.request.updateMany).toHaveBeenCalledWith({
      where: {
        id: 101,
        community: 1,
        status: "pending"
      },
      data: {
        status: "approved"
      }
    });
    expect(txMock.membership.upsert).toHaveBeenCalledWith({
      where: {
        user_community: {
          user: "user-1",
          community: 1
        }
      },
      update: {},
      create: {
        user: "user-1",
        community: 1
      }
    });
    expect(revalidatePath).toHaveBeenCalledWith("/communities/1/solicitudes");
  });

  it("Should reject a pending request without creating membership", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: {
        userID: "admin-1"
      }
    });

    (prisma.community.findUnique as jest.Mock).mockResolvedValue({ id: 1, adminId: "admin-1" });
    txMock.request.findFirst.mockResolvedValue({ user: "user-1" });
    txMock.request.updateMany.mockResolvedValue({ count: 1 });

    await reviewCommunityRequest(createFormData({ decision: "reject" }));

    expect(txMock.request.updateMany).toHaveBeenCalledWith({
      where: {
        id: 101,
        community: 1,
        status: "pending"
      },
      data: {
        status: "rejected"
      }
    });
    expect(txMock.membership.upsert).not.toHaveBeenCalled();
  });

  it("Should not change request if it is not pending", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: {
        userID: "admin-1"
      }
    });

    (prisma.community.findUnique as jest.Mock).mockResolvedValue({ id: 1, adminId: "admin-1" });
    txMock.request.findFirst.mockResolvedValue(null);

    await reviewCommunityRequest(createFormData({ decision: "approve" }));

    expect(txMock.request.updateMany).not.toHaveBeenCalled();
    expect(txMock.membership.upsert).not.toHaveBeenCalled();
  });

  it("Should not create membership if updateMany did not update any row", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: {
        userID: "admin-1"
      }
    });

    (prisma.community.findUnique as jest.Mock).mockResolvedValue({ id: 1, adminId: "admin-1" });
    txMock.request.findFirst.mockResolvedValue({ user: "user-1" });
    txMock.request.updateMany.mockResolvedValue({ count: 0 });

    await reviewCommunityRequest(createFormData({ decision: "approve" }));

    expect(txMock.request.updateMany).toHaveBeenCalled();
    expect(txMock.membership.upsert).not.toHaveBeenCalled();
  });

  it("Should do nothing if form data is invalid", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: {
        userID: "admin-1"
      }
    });

    await reviewCommunityRequest(createFormData({ communityID: "abc", requestID: "-1" }));

    expect(prisma.community.findUnique).not.toHaveBeenCalled();
    expect(prisma.$transaction).not.toHaveBeenCalled();
  });

  it("Should do nothing if decision is invalid", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: {
        userID: "admin-1"
      }
    });

    const formData = new FormData();
    formData.append("communityID", "1");
    formData.append("requestID", "101");
    formData.append("decision", "maybe");

    await reviewCommunityRequest(formData);

    expect(prisma.community.findUnique).not.toHaveBeenCalled();
    expect(prisma.$transaction).not.toHaveBeenCalled();
  });

  it("Should do nothing if decision field is null", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: {
        userID: "admin-1"
      }
    });

    const formData = new FormData();
    formData.append("communityID", "1");
    formData.append("requestID", "101");
    // decision not appended → formData.get("decision") returns null

    await reviewCommunityRequest(formData);

    expect(prisma.community.findUnique).not.toHaveBeenCalled();
    expect(prisma.$transaction).not.toHaveBeenCalled();
  });
});
