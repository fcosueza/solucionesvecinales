import { FormActionState } from "@/types";
import { contactMsg, deleteContact } from "./contactMsg";
import prisma from "../lib/prisma";
import verifySession from "@/lib/dal";
import { revalidatePath } from "next/cache";

// Mocks
jest.mock("../lib/prisma", () => ({
  contact: {
    create: jest.fn(),
    delete: jest.fn()
  }
}));
jest.mock("next/cache", () => ({
  revalidatePath: jest.fn()
}));
jest.mock("@/lib/dal", () => jest.fn());

describe("contactMsgAction test suite", () => {
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

  it("Should return an error when validation fails", async () => {
    const formData = crearFormData({
      name: "a",
      email: "not-an-email@gmail.c",
      msg: "aaa"
    });

    const result = await contactMsg({} as FormActionState, formData);

    expect(result.state).toBe("error");
    expect(result.message).toBe("Datos del formulario no válidos");
    expect(result.errors).toBeDefined();
    expect(prisma.contact.create).not.toHaveBeenCalled();
  });

  it("Should return an error when Prisma cannot create the message", async () => {
    (prisma.contact.create as jest.Mock).mockRejectedValueOnce(new Error("DB error"));

    const formData = crearFormData({
      name: "John Doe",
      email: "john@example.com",
      msg: "Hola, este es un mensaje de prueba para contactMsgAction"
    });

    const result = await contactMsg({} as FormActionState, formData);

    expect(result.state).toBe("error");
    expect(result.message).toBe("No se pudo crear el mensaje");
    expect(result.errors?.prisma).not.toBeNull();
  });

  it("Should return success when the message is created correctly", async () => {
    (prisma.contact.create as jest.Mock).mockResolvedValueOnce({ id: 1 });

    const formData = crearFormData({
      name: "John Doe",
      email: "john@example.com",
      msg: "Hola, este es un mensaje de prueba para contactMsgAction"
    });

    const result = await contactMsg({} as FormActionState, formData);

    expect(result.state).toBe("success");
    expect(result.message).toBe("Mensaje creado exitosamente");
    expect(prisma.contact.create).toHaveBeenCalledWith({
      data: {
        name: "John Doe",
        email: "john@example.com",
        message: "Hola, este es un mensaje de prueba para contactMsgAction"
      }
    });
  });
});

describe("deleteContact test suite", () => {
  const verifySessionMock = verifySession as jest.Mock;
  const revalidatePathMock = revalidatePath as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should exit without acting when there is no authenticated session", async () => {
    verifySessionMock.mockResolvedValue({ isAuth: false, session: null });

    await deleteContact(new FormData());

    expect(prisma.contact.delete).not.toHaveBeenCalled();
  });

  it("should exit without acting when the role is not webAdmin", async () => {
    verifySessionMock.mockResolvedValue({ isAuth: true, session: { role: "tenant" } });

    await deleteContact(new FormData());

    expect(prisma.contact.delete).not.toHaveBeenCalled();
  });

  it("should exit without acting when session is valid but has no user data", async () => {
    verifySessionMock.mockResolvedValue({ isAuth: true, session: null });

    await deleteContact(new FormData());

    expect(prisma.contact.delete).not.toHaveBeenCalled();
  });

  it("should exit without acting when required fields are missing", async () => {
    verifySessionMock.mockResolvedValue({ isAuth: true, session: { role: "adminWeb" } });

    await deleteContact(new FormData());

    expect(prisma.contact.delete).not.toHaveBeenCalled();
  });

  it("should exit without acting when name is present but email is missing", async () => {
    verifySessionMock.mockResolvedValue({ isAuth: true, session: { role: "adminWeb" } });

    const formData = new FormData();
    formData.append("nombre", "Juan");
    formData.append("creadoEn", "2024-01-01T00:00:00.000Z");

    await deleteContact(formData);

    expect(prisma.contact.delete).not.toHaveBeenCalled();
  });

  it("should exit without acting when the provided date is invalid", async () => {
    verifySessionMock.mockResolvedValue({ isAuth: true, session: { role: "adminWeb" } });

    const formData = new FormData();
    formData.append("nombre", "Juan");
    formData.append("email", "juan@example.com");
    formData.append("creadoEn", "fecha-invalida");

    await deleteContact(formData);

    expect(prisma.contact.delete).not.toHaveBeenCalled();
  });

  it("should delete the contact and revalidate the path when data is valid", async () => {
    verifySessionMock.mockResolvedValue({ isAuth: true, session: { role: "adminWeb" } });
    (prisma.contact.delete as jest.Mock).mockResolvedValue({});

    const fecha = "2024-01-01T00:00:00.000Z";
    const formData = new FormData();
    formData.append("nombre", "Juan");
    formData.append("email", "juan@example.com");
    formData.append("creadoEn", fecha);

    await deleteContact(formData);

    expect(prisma.contact.delete).toHaveBeenCalledWith({
      where: {
        name_email_createdAt: {
          name: "Juan",
          email: "juan@example.com",
          createdAt: new Date(fecha)
        }
      }
    });
    expect(revalidatePathMock).toHaveBeenCalledWith("/backoffice/contact");
  });

  it("should handle Prisma errors silently", async () => {
    verifySessionMock.mockResolvedValue({ isAuth: true, session: { role: "adminWeb" } });
    (prisma.contact.delete as jest.Mock).mockRejectedValue(new Error("DB error"));

    const formData = new FormData();
    formData.append("nombre", "Juan");
    formData.append("email", "juan@example.com");
    formData.append("creadoEn", "2024-01-01T00:00:00.000Z");

    await expect(deleteContact(formData)).resolves.toBeUndefined();
    expect(revalidatePathMock).not.toHaveBeenCalled();
  });
});
