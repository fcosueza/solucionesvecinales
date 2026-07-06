import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { UserRole } from "@/types";
import { revalidatePath } from "next/cache";
import { communityFinance, deleteRecord } from "./communityFinance";

jest.mock("@/lib/dal", () => jest.fn());
jest.mock("next/cache", () => ({
  revalidatePath: jest.fn()
}));
jest.mock("@/lib/prisma", () => ({
  membership: {
    findUnique: jest.fn()
  },
  financialRecord: {
    create: jest.fn(),
    delete: jest.fn()
  }
}));

describe("communityFinance server function test suite", () => {
  const createFormData = ({
    description = "Factura ascensor",
    amount = "150.50",
    type = "gasto"
  }: {
    description?: string;
    amount?: string;
    type?: string;
  }) => {
    const formData = new FormData();
    formData.append("descripcion", description);
    formData.append("importe", amount);
    formData.append("tipo", type);
    return formData;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (prisma.membership.findUnique as jest.Mock).mockResolvedValue({ user: "admin-1" });
  });

  it("Should do nothing if the user is not authenticated", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: false });

    await communityFinance(1, createFormData({}));

    expect(prisma.financialRecord.create).not.toHaveBeenCalled();
  });

  it("Should do nothing if the user is not an admin", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: { userID: "user-1", role: UserRole.tenant }
    });

    await communityFinance(1, createFormData({}));

    expect(prisma.financialRecord.create).not.toHaveBeenCalled();
  });

  it("Should do nothing if the form is invalid", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: { userID: "admin-1", role: UserRole.admin }
    });

    await communityFinance(0, createFormData({ description: "", amount: "NaN", type: "otro" }));

    expect(prisma.financialRecord.create).not.toHaveBeenCalled();
  });

  it("Should do nothing if fields are missing in FormData", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: { userID: "admin-1", role: UserRole.admin }
    });
    const formData = new FormData();

    await communityFinance(1, formData);

    expect(prisma.financialRecord.create).not.toHaveBeenCalled();
  });

  it("Should do nothing if the user is not a member of the community", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: { userID: "admin-1", role: UserRole.admin }
    });
    (prisma.membership.findUnique as jest.Mock).mockResolvedValue(null);

    await communityFinance(1, createFormData({}));

    expect(prisma.financialRecord.create).not.toHaveBeenCalled();
  });

  it("Should create a record and revalidate routes if the user is admin", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: { userID: "admin-1", role: UserRole.admin }
    });
    (prisma.financialRecord.create as jest.Mock).mockResolvedValue({});

    await communityFinance(4, createFormData({ description: "  Cuota mensual  ", amount: "300", type: "ingreso" }));

    expect(prisma.financialRecord.create).toHaveBeenCalledWith({
      data: {
        community: 4,
        description: "Cuota mensual",
        amount: 300,
        type: "income"
      }
    });
    expect(revalidatePath).toHaveBeenCalledWith("/communities/4/finanzas");
    expect(revalidatePath).toHaveBeenCalledWith("/communities/4/overview");
  });

  it("Should create a record if the user is webAdmin", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: { userID: "webadmin-1", role: UserRole.webAdmin }
    });
    (prisma.financialRecord.create as jest.Mock).mockResolvedValue({});

    await communityFinance(2, createFormData({ type: "gasto" }));

    expect(prisma.financialRecord.create).toHaveBeenCalled();
  });

  it("Should not throw an error if prisma.create fails", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: { userID: "admin-1", role: UserRole.admin }
    });
    (prisma.financialRecord.create as jest.Mock).mockRejectedValue(new Error("DB error"));

    await expect(communityFinance(1, createFormData({}))).resolves.toBeUndefined();
    expect(revalidatePath).not.toHaveBeenCalled();
  });
});

describe("deleteRecord test suite", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should do nothing if there is no authenticated session", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: false });

    const formData = new FormData();
    formData.append("id", "12");

    await deleteRecord(formData);

    expect(prisma.financialRecord.delete).not.toHaveBeenCalled();
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("Should do nothing if the role is not webAdmin", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: { userID: "admin-1", role: UserRole.admin }
    });

    const formData = new FormData();
    formData.append("id", "12");

    await deleteRecord(formData);

    expect(prisma.financialRecord.delete).not.toHaveBeenCalled();
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("Should do nothing if the id is invalid", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: { userID: "webadmin-1", role: UserRole.webAdmin }
    });

    const formData = new FormData();
    formData.append("id", "NaN");

    await deleteRecord(formData);

    expect(prisma.financialRecord.delete).not.toHaveBeenCalled();
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("Should delete the record and revalidate routes", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: { userID: "webadmin-1", role: UserRole.webAdmin }
    });
    (prisma.financialRecord.delete as jest.Mock).mockResolvedValue({});

    const formData = new FormData();
    formData.append("id", "18");

    await deleteRecord(formData);

    expect(prisma.financialRecord.delete).toHaveBeenCalledWith({ where: { id: 18 } });
    expect(revalidatePath).toHaveBeenCalledWith("/backoffice/finanzas");
    expect(revalidatePath).toHaveBeenCalledWith("/backoffice/overview");
  });

  it("Should not throw an error if prisma.delete fails", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: { userID: "webadmin-1", role: UserRole.webAdmin }
    });
    (prisma.financialRecord.delete as jest.Mock).mockRejectedValue(new Error("DB error"));

    const formData = new FormData();
    formData.append("id", "18");

    await expect(deleteRecord(formData)).resolves.toBeUndefined();
    expect(revalidatePath).not.toHaveBeenCalled();
  });
});
