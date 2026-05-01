import addCommunity from "./addCommunity";
import { FormActionState, UserRole } from "@/types";
import prisma from "@/lib/prisma";
import verifySession from "@/lib/dal";

jest.mock("@/lib/dal", () => jest.fn());
jest.mock("@/lib/prisma", () => ({
  comunidad: {
    create: jest.fn()
  }
}));

describe("Suite de pruebas de addCommunity", () => {
  const crearFormData = (data: Record<string, string>) => {
    const fd = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      fd.append(key, value);
    });

    return fd;
  };

  const formValido = () =>
    crearFormData({
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

  it("Debe devolver un error si el usuario no está autenticado", async () => {
    (verifySession as jest.Mock).mockResolvedValue({ isAuth: false });

    const resultado = await addCommunity({} as FormActionState, formValido());

    expect(resultado.state).toBe("error");
    expect(resultado.message).toBe("Debes iniciar sesión para crear una comunidad");
    expect(prisma.comunidad.create).not.toHaveBeenCalled();
  });

  it("Debe devolver un error si el usuario no tiene rol administrador", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: {
        userID: "usuario-1",
        role: UserRole.tenant
      }
    });

    const resultado = await addCommunity({} as FormActionState, formValido());

    expect(resultado.state).toBe("error");
    expect(resultado.message).toBe("No tienes permisos para crear comunidades");
    expect(prisma.comunidad.create).not.toHaveBeenCalled();
  });

  it("Debe devolver un error si la validación falla", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: {
        userID: "admin-1",
        role: UserRole.admin
      }
    });

    const datosInvalidos = crearFormData({
      name: "A",
      street: "C",
      number: "0",
      city: "M",
      province: "M",
      country: "E"
    });

    const resultado = await addCommunity({} as FormActionState, datosInvalidos);

    expect(resultado.state).toBe("error");
    expect(resultado.message).toBe("Datos del formulario incorrectos");
    expect(resultado.errors).toBeDefined();
    expect(prisma.comunidad.create).not.toHaveBeenCalled();
  });

  it("Debe crear la comunidad correctamente cuando los datos son válidos", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: {
        userID: "admin-1",
        role: UserRole.admin
      }
    });

    (prisma.comunidad.create as jest.Mock).mockResolvedValue({ id: 1 });

    const resultado = await addCommunity({} as FormActionState, formValido());

    expect(resultado.state).toBe("success");
    expect(resultado.message).toBe("Comunidad creada exitosamente");
    expect(prisma.comunidad.create).toHaveBeenCalledWith({
      data: {
        nombre: "Comunidad Centro",
        calle: "Mayor",
        numero: 10,
        ciudad: "Madrid",
        provincia: "Madrid",
        pais: "España",
        adminID: "admin-1",
        inscripciones: {
          create: [
            {
              usuario: "admin-1"
            }
          ]
        }
      }
    });
  });

  it("Debe devolver un error específico si Prisma devuelve P2002", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: {
        userID: "admin-1",
        role: UserRole.admin
      }
    });

    (prisma.comunidad.create as jest.Mock).mockRejectedValue({ code: "P2002" });

    const datosFormulario = formValido();
    const resultado = await addCommunity({} as FormActionState, datosFormulario);

    expect(resultado.state).toBe("error");
    expect(resultado.message).toBe("Ya existe una comunidad con esos datos");
    expect(resultado.payload).toBe(datosFormulario);
  });

  it("Debe devolver un error interno si Prisma falla por un motivo distinto", async () => {
    (verifySession as jest.Mock).mockResolvedValue({
      isAuth: true,
      session: {
        userID: "admin-1",
        role: UserRole.admin
      }
    });

    (prisma.comunidad.create as jest.Mock).mockRejectedValue(new Error("DB error"));

    const datosFormulario = formValido();
    const resultado = await addCommunity({} as FormActionState, datosFormulario);

    expect(resultado.state).toBe("error");
    expect(resultado.message).toBe("No se pudo crear la comunidad");
    expect(resultado.errors?.prisma).toBe("Error interno");
    expect(resultado.payload).toBe(datosFormulario);
  });
});
