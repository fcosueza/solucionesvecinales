import { FormActionState } from "@/types";
import contactMsgAction from "./contactMsgAction";
import prisma from "../lib/prisma";

jest.mock("../lib/prisma", () => ({
  contacto: {
    create: jest.fn()
  }
}));

describe("Pruebas de la acción contactMsgAction", () => {
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

    const resultado = await contactMsgAction({} as FormActionState, datosForm);

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

    const resultado = await contactMsgAction({} as FormActionState, datosForm);

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

    const resultado = await contactMsgAction({} as FormActionState, datosForm);

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
