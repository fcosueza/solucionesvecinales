import requestCommunitySubscription from "./communityRequest";
import prisma from "@/lib/prisma";
import verifySession from "@/lib/dal";
import { revalidatePath } from "next/cache";

jest.mock("@/lib/dal", () => jest.fn());
jest.mock("next/cache", () => ({
  revalidatePath: jest.fn()
}));
jest.mock("@/lib/prisma", () => ({
  comunidad: {
    findUnique: jest.fn()
  },
  usuario: {
    findUnique: jest.fn()
  },
  solicitud: {
    findFirst: jest.fn(),
    create: jest.fn()
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

    expect(prisma.comunidad.findUnique).not.toHaveBeenCalled();
    expect(prisma.solicitud.create).not.toHaveBeenCalled();
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

    expect(prisma.comunidad.findUnique).not.toHaveBeenCalled();
    expect(prisma.solicitud.create).not.toHaveBeenCalled();
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

    expect(prisma.comunidad.findUnique).not.toHaveBeenCalled();
    expect(prisma.usuario.findUnique).not.toHaveBeenCalled();
    expect(prisma.solicitud.findFirst).not.toHaveBeenCalled();
    expect(prisma.solicitud.create).not.toHaveBeenCalled();
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("No debe crear solicitud si el usuario ya está suscrito", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: {
        userID: "tenant-1"
      }
    });

    (prisma.comunidad.findUnique as jest.Mock).mockResolvedValue({ id: 5 });
    (prisma.usuario.findUnique as jest.Mock).mockResolvedValue({
      inscripciones: [{ comunidad: 5 }]
    });
    (prisma.solicitud.findFirst as jest.Mock).mockResolvedValue(null);

    await requestCommunitySubscription(formDataWithCommunity("5"));

    expect(prisma.solicitud.create).not.toHaveBeenCalled();
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("No debe crear solicitud si ya existe una solicitud pendiente", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: {
        userID: "tenant-1"
      }
    });

    (prisma.comunidad.findUnique as jest.Mock).mockResolvedValue({ id: 5 });
    (prisma.usuario.findUnique as jest.Mock).mockResolvedValue({
      inscripciones: []
    });
    (prisma.solicitud.findFirst as jest.Mock).mockResolvedValue({ id: 10 });

    await requestCommunitySubscription(formDataWithCommunity("5"));

    expect(prisma.solicitud.create).not.toHaveBeenCalled();
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("Debe crear una nueva solicitud en pendiente cuando procede", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: {
        userID: "tenant-1"
      }
    });

    (prisma.comunidad.findUnique as jest.Mock).mockResolvedValue({ id: 5 });
    (prisma.usuario.findUnique as jest.Mock).mockResolvedValue({
      inscripciones: []
    });
    (prisma.solicitud.findFirst as jest.Mock).mockResolvedValue(null);

    await requestCommunitySubscription(formDataWithCommunity("5"));

    expect(prisma.solicitud.create).toHaveBeenCalledWith({
      data: {
        usuario: "tenant-1",
        comunidad: 5,
        estado: "pendiente"
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

    (prisma.comunidad.findUnique as jest.Mock).mockResolvedValue(null);
    (prisma.usuario.findUnique as jest.Mock).mockResolvedValue({ inscripciones: [] });
    (prisma.solicitud.findFirst as jest.Mock).mockResolvedValue(null);

    await requestCommunitySubscription(formDataWithCommunity("5"));

    expect(prisma.solicitud.create).not.toHaveBeenCalled();
    expect(revalidatePath).not.toHaveBeenCalled();
  });

  it("No debe crear solicitud si el usuario no tiene inscripciones (userWithCommunities es null)", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: {
        userID: "tenant-1"
      }
    });

    (prisma.comunidad.findUnique as jest.Mock).mockResolvedValue({ id: 5 });
    (prisma.usuario.findUnique as jest.Mock).mockResolvedValue(null);
    (prisma.solicitud.findFirst as jest.Mock).mockResolvedValue(null);

    await requestCommunitySubscription(formDataWithCommunity("5"));

    expect(prisma.solicitud.create).toHaveBeenCalled();
  });
});
