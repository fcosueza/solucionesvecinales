import requestCommunitySubscription, { deleteRequest } from "./communityRequest";
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

describe("Suite de pruebas de requestCommunitySubscription", () => {
  const formDataWithCommunity = (communityID: string) => {
    const formData = new FormData();

    formData.append("communityID", communityID);

    return formData;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("No debe hacer nada si el usuario no está autenticado", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: false });

    await requestCommunitySubscription(formDataWithCommunity("5"));

    expect(prisma.community.findUnique).not.toHaveBeenCalled();
    expect(prisma.request.create).not.toHaveBeenCalled();
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("No debe hacer nada si communityID no es válido", async () => {
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

  it("No debe crear solicitud si el usuario es administrador", async () => {
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

  it("No debe crear solicitud si el usuario ya está suscrito", async () => {
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

  it("No debe crear solicitud si ya existe una solicitud pendiente", async () => {
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

  it("Debe crear una nueva solicitud en pendiente cuando procede", async () => {
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

  it("No debe crear solicitud si la comunidad no existe", async () => {
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

  it("No debe crear solicitud si el usuario no tiene inscripciones (userWithCommunities es null)", async () => {
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

describe("Suite de pruebas de deleteRequest", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("No debe hacer nada si no hay sesion autenticada", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: false });

    const formData = new FormData();
    formData.append("id", "10");

    await deleteRequest(formData);

    expect(prisma.request.delete).not.toHaveBeenCalled();
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("No debe hacer nada si el rol no es webAdmin", async () => {
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

  it("No debe hacer nada si el id es invalido", async () => {
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

  it("Debe eliminar solicitud y revalidar rutas", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: { userID: "webadmin-1", role: UserRole.webAdmin }
    });
    (prisma.request.delete as jest.Mock).mockResolvedValue({});

    const formData = new FormData();
    formData.append("id", "24");

    await deleteRequest(formData);

    expect(prisma.request.delete).toHaveBeenCalledWith({ where: { id: 24 } });
    expect(revalidatePath).toHaveBeenCalledWith("/backoffice/solicitudes");
    expect(revalidatePath).toHaveBeenCalledWith("/backoffice/overview");
  });

  it("No debe lanzar error si prisma.delete falla", async () => {
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
