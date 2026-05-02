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
  inscripcion: {
    findUnique: jest.fn()
  },
  mensaje: {
    create: jest.fn(),
    delete: jest.fn()
  }
}));

describe("Suite de pruebas de communityMessage", () => {
  const verifySessionMock = verifySession as jest.Mock;
  const prismaCreateMock = prisma.mensaje.create as jest.Mock;
  const prismaDeleteMock = prisma.mensaje.delete as jest.Mock;
  const revalidatePathMock = revalidatePath as jest.Mock;

  const createFormData = (texto?: string) => {
    const formData = new FormData();

    if (texto !== undefined) {
      formData.append("texto", texto);
    }

    return formData;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (prisma.inscripcion.findUnique as jest.Mock).mockResolvedValue({ usuario: "admin-1" });
  });

  it("No debe anadir mensaje si no hay sesion", async () => {
    verifySessionMock.mockResolvedValue({ isAuth: false });

    await addMessage(10, createFormData("Mensaje valido"));

    expect(prismaCreateMock).not.toHaveBeenCalled();
    expect(revalidatePathMock).not.toHaveBeenCalled();
  });

  it("No debe anadir mensaje si no es admin", async () => {
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

  it("No debe anadir mensaje si el texto esta vacio o en blanco", async () => {
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

  it("Debe anadir mensaje y revalidar si el usuario es admin", async () => {
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
        comunidad: 15,
        texto: "Aviso de reunion"
      }
    });
    expect(revalidatePathMock).toHaveBeenCalledWith("/communities/15/overview");
  });

  it("Debe anadir mensaje y revalidar si el usuario es webAdmin", async () => {
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
        comunidad: 22,
        texto: "Mensaje web admin"
      }
    });
    expect(revalidatePathMock).toHaveBeenCalledWith("/communities/22/overview");
  });

  it("No debe anadir mensaje si el usuario no esta inscrito en la comunidad", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: {
        userID: "admin-1",
        role: UserRole.admin
      }
    });
    (prisma.inscripcion.findUnique as jest.Mock).mockResolvedValue(null);

    await addMessage(15, createFormData("Mensaje"));

    expect(prismaCreateMock).not.toHaveBeenCalled();
    expect(revalidatePathMock).not.toHaveBeenCalled();
  });

  it("No debe propagar error ni revalidar si falla create", async () => {
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

  it("No debe eliminar mensaje si no hay sesion", async () => {
    verifySessionMock.mockResolvedValue({ isAuth: false });

    await deleteMessage(7, new Date("2026-05-02T09:30:00.000Z"));

    expect(prismaDeleteMock).not.toHaveBeenCalled();
    expect(revalidatePathMock).not.toHaveBeenCalled();
  });

  it("No debe eliminar mensaje si no es admin", async () => {
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

  it("Debe eliminar mensaje y revalidar si es admin", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: {
        userID: "admin-1",
        role: UserRole.admin
      }
    });
    prismaDeleteMock.mockResolvedValue({});

    const creadoEn = new Date("2026-05-02T09:30:00.000Z");
    await deleteMessage(7, creadoEn);

    expect(prismaDeleteMock).toHaveBeenCalledWith({
      where: {
        creadoEn_comunidad: {
          creadoEn,
          comunidad: 7
        }
      }
    });
    expect(revalidatePathMock).toHaveBeenCalledWith("/communities/7/overview");
  });

  it("Debe eliminar mensaje y revalidar si es webAdmin", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: {
        userID: "webadmin-1",
        role: UserRole.webAdmin
      }
    });
    prismaDeleteMock.mockResolvedValue({});

    const creadoEn = new Date("2026-05-02T09:30:00.000Z");
    await deleteMessage(11, creadoEn);

    expect(prismaDeleteMock).toHaveBeenCalledWith({
      where: {
        creadoEn_comunidad: {
          creadoEn,
          comunidad: 11
        }
      }
    });
    expect(revalidatePathMock).toHaveBeenCalledWith("/communities/11/overview");
  });

  it("No debe eliminar mensaje si el usuario no esta inscrito en la comunidad", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: {
        userID: "admin-1",
        role: UserRole.admin
      }
    });
    (prisma.inscripcion.findUnique as jest.Mock).mockResolvedValue(null);

    await deleteMessage(7, new Date("2026-05-02T09:30:00.000Z"));

    expect(prismaDeleteMock).not.toHaveBeenCalled();
    expect(revalidatePathMock).not.toHaveBeenCalled();
  });

  it("No debe propagar error ni revalidar si falla delete", async () => {
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
