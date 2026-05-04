import { FormActionState } from "@/types";
import contactMsg, { deleteContact } from "./contactMsg";
import prisma from "../lib/prisma";
import verifySession from "@/lib/dal";
import { revalidatePath } from "next/cache";

jest.mock("../lib/prisma", () => ({
  contacto: {
    create: jest.fn(),
    delete: jest.fn()
  }
}));
jest.mock("next/cache", () => ({
  revalidatePath: jest.fn()
}));
jest.mock("@/lib/dal", () => jest.fn());

describe("Suite de pruebas de contactMsgAction", () => {
  const verifySessionMock = verifySession as jest.Mock;

  const crearFormData = (data: Record<string, string>) => {
    const fd = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      fd.append(key, value);
    });

    return fd;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Debe devolver un error si la validación falla", async () => {
    const datosForm = crearFormData({
      name: "a",
      email: "not-an-email@gmail.c",
      msg: "aaa"
    });

    const resultado = await contactMsg({} as FormActionState, datosForm);

    expect(resultado.state).toBe("error");
    expect(resultado.message).toBe("Datos del formulario incorrectos");
    expect(resultado.errors).toBeDefined();
    expect(prisma.contacto.create).not.toHaveBeenCalled();
  });

  it("Debe devolver un error si Prisma no puede crear el mensaje", async () => {
    (prisma.contacto.create as jest.Mock).mockRejectedValueOnce(new Error("DB error"));

    const datosForm = crearFormData({
      name: "John Doe",
      email: "john@example.com",
      msg: "Hola, este es un mensaje de prueba para contactMsgAction"
    });

    const resultado = await contactMsg({} as FormActionState, datosForm);

    expect(resultado.state).toBe("error");
    expect(resultado.message).toBe("No se pudo crear el mensaje");
    expect(resultado.errors?.prisma).not.toBeNull();
  });

  it("Debe devolver éxito si el mensaje se crea correctamente", async () => {
    (prisma.contacto.create as jest.Mock).mockResolvedValueOnce({ id: 1 });

    const datosForm = crearFormData({
      name: "John Doe",
      email: "john@example.com",
      msg: "Hola, este es un mensaje de prueba para contactMsgAction"
    });

    const resultado = await contactMsg({} as FormActionState, datosForm);

    expect(resultado.state).toBe("success");
    expect(resultado.message).toBe("Mensaje creado exitosamente");
    expect(prisma.contacto.create).toHaveBeenCalledWith({
      data: {
        nombre: "John Doe",
        email: "john@example.com",
        mensaje: "Hola, este es un mensaje de prueba para contactMsgAction"
      }
    });
  });
});

describe("Suite de pruebas de deleteContact", () => {
  const verifySessionMock = verifySession as jest.Mock;
  const revalidatePathMock = revalidatePath as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Debe salir sin actuar si no hay sesion autenticada", async () => {
    verifySessionMock.mockResolvedValue({ isAuth: false, session: null });

    await deleteContact(new FormData());

    expect(prisma.contacto.delete).not.toHaveBeenCalled();
  });

  it("Debe salir sin actuar si el rol no es webAdmin", async () => {
    verifySessionMock.mockResolvedValue({ isAuth: true, session: { role: "tenant" } });

    await deleteContact(new FormData());

    expect(prisma.contacto.delete).not.toHaveBeenCalled();
  });

  it("Debe salir sin actuar si la sesion es valida pero sin datos de usuario", async () => {
    verifySessionMock.mockResolvedValue({ isAuth: true, session: null });

    await deleteContact(new FormData());

    expect(prisma.contacto.delete).not.toHaveBeenCalled();
  });

  it("Debe salir sin actuar si faltan campos obligatorios", async () => {
    verifySessionMock.mockResolvedValue({ isAuth: true, session: { role: "adminWeb" } });

    await deleteContact(new FormData());

    expect(prisma.contacto.delete).not.toHaveBeenCalled();
  });

  it("Debe salir sin actuar si el nombre esta presente pero falta el email", async () => {
    verifySessionMock.mockResolvedValue({ isAuth: true, session: { role: "adminWeb" } });

    const fd = new FormData();
    fd.append("nombre", "Juan");
    fd.append("creadoEn", "2024-01-01T00:00:00.000Z");

    await deleteContact(fd);

    expect(prisma.contacto.delete).not.toHaveBeenCalled();
  });

  it("Debe salir sin actuar si la fecha proporcionada es invalida", async () => {
    verifySessionMock.mockResolvedValue({ isAuth: true, session: { role: "adminWeb" } });

    const fd = new FormData();
    fd.append("nombre", "Juan");
    fd.append("email", "juan@example.com");
    fd.append("creadoEn", "fecha-invalida");

    await deleteContact(fd);

    expect(prisma.contacto.delete).not.toHaveBeenCalled();
  });

  it("Debe eliminar el contacto y revalidar la ruta si los datos son validos", async () => {
    verifySessionMock.mockResolvedValue({ isAuth: true, session: { role: "adminWeb" } });
    (prisma.contacto.delete as jest.Mock).mockResolvedValue({});

    const fecha = "2024-01-01T00:00:00.000Z";
    const fd = new FormData();
    fd.append("nombre", "Juan");
    fd.append("email", "juan@example.com");
    fd.append("creadoEn", fecha);

    await deleteContact(fd);

    expect(prisma.contacto.delete).toHaveBeenCalledWith({
      where: {
        nombre_email_creadoEn: {
          nombre: "Juan",
          email: "juan@example.com",
          creadoEn: new Date(fecha)
        }
      }
    });
    expect(revalidatePathMock).toHaveBeenCalledWith("/backoffice/contacto");
  });

  it("Debe manejar errores de prisma silenciosamente", async () => {
    verifySessionMock.mockResolvedValue({ isAuth: true, session: { role: "adminWeb" } });
    (prisma.contacto.delete as jest.Mock).mockRejectedValue(new Error("DB error"));

    const fd = new FormData();
    fd.append("nombre", "Juan");
    fd.append("email", "juan@example.com");
    fd.append("creadoEn", "2024-01-01T00:00:00.000Z");

    await expect(deleteContact(fd)).resolves.toBeUndefined();
    expect(revalidatePathMock).not.toHaveBeenCalled();
  });
});
