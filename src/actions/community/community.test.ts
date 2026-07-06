import addCommunity from "./community";
import { FormActionState, UserRole } from "@/types";
import prisma from "@/lib/prisma";
import verifySession from "@/lib/dal";

// Mocks
jest.mock("@/lib/dal", () => jest.fn());
jest.mock("@/lib/prisma", () => ({
  community: {
    create: jest.fn()
  }
}));

describe("addCommunity server function test suite", () => {
  const createFormData = (data: Record<string, string>) => {
    const fd = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      fd.append(key, value);
    });

    return fd;
  };

  const validForm = () =>
    createFormData({
      name: "Comunidad Centro",
      street: "Mayor",
      number: "10",
      city: "Madrid",
      province: "Madrid",
      country: "España"
    });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should return an error if the user is not authenticated", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: false });

    const result = await addCommunity({} as FormActionState, validForm());

    expect(result.state).toBe("error");
    expect(result.message).toBe("Debes iniciar sesión para crear una comunidad");
    expect(prisma.community.create).not.toHaveBeenCalled();
  });

  it("Should return an error if the user does not have the admin role", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: {
        userID: "usuario-1",
        role: UserRole.tenant
      }
    });

    const result = await addCommunity({} as FormActionState, validForm());

    expect(result.state).toBe("error");
    expect(result.message).toBe("No tienes permisos para crear comunidades");
    expect(prisma.community.create).not.toHaveBeenCalled();
  });

  it("Should return an error if validation fails", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: {
        userID: "admin-1",
        role: UserRole.admin
      }
    });

    const invalidData = createFormData({
      name: "A",
      street: "C",
      number: "0",
      city: "M",
      province: "M",
      country: "E"
    });

    const result = await addCommunity({} as FormActionState, invalidData);

    expect(result.state).toBe("error");
    expect(result.message).toBe("Datos del formulario incorrectos");
    expect(result.errors).toBeDefined();
    expect(prisma.community.create).not.toHaveBeenCalled();
  });

  it("Should create the community successfully when data is valid", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: {
        userID: "admin-1",
        role: UserRole.admin
      }
    });

    (prisma.community.create as jest.Mock).mockResolvedValue({ id: 1 });

    const result = await addCommunity({} as FormActionState, validForm());

    expect(result.state).toBe("success");
    expect(result.message).toBe("Comunidad creada exitosamente");
    expect(prisma.community.create).toHaveBeenCalledWith({
      data: {
        name: "Comunidad Centro",
        street: "Mayor",
        number: 10,
        city: "Madrid",
        province: "Madrid",
        country: "España",
        adminId: "admin-1",
        memberships: {
          create: [
            {
              user: "admin-1"
            }
          ]
        }
      }
    });
  });

  it("Should return a specific error if Prisma returns P2002", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: {
        userID: "admin-1",
        role: UserRole.admin
      }
    });

    (prisma.community.create as jest.Mock).mockRejectedValue({ code: "P2002" });

    const validData = validForm();
    const result = await addCommunity({} as FormActionState, validData);

    expect(result.state).toBe("error");
    expect(result.message).toBe("Ya existe una comunidad con esos datos");
    expect(result.payload).toBe(validData);
  });

  it("Should return an internal error if Prisma fails for a different reason", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: {
        userID: "admin-1",
        role: UserRole.admin
      }
    });

    (prisma.community.create as jest.Mock).mockRejectedValue(new Error("DB error"));

    const validData = validForm();
    const result = await addCommunity({} as FormActionState, validData);

    expect(result.state).toBe("error");
    expect(result.message).toBe("No se pudo crear la comunidad");
    expect(result.errors?.prisma).toBe("Error interno");
    expect(result.payload).toBe(validData);
  });
});
