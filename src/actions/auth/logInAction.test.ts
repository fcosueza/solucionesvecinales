import { FormActionState } from "@/types";
import { createSession } from "@/lib/session";
import { waitFor } from "@testing-library/dom";
import logInAction from "./logInAction";
import prisma from "../../lib/prisma";
import bcrypt from "bcrypt";

jest.mock("@/lib/session");
jest.mock("@/lib/prisma", () => ({
  usuario: {
    findUnique: jest.fn()
  }
}));

describe("logInAction test suite", () => {
  const mockFormData = (data: Record<string, string>) => {
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
    const formData = mockFormData({
      email: "not-an-email@gmail.c",
      password: "aaa"
    });

    const result = await logInAction({} as FormActionState, formData);

    expect(result.state).toBe("error");
    expect(result.message).toBe("Datos del formulario incorrectos");
    expect(result.errors).toBeDefined();
    expect(prisma.usuario.findUnique).not.toHaveBeenCalled();
  });

  it("Debe devolver un error si el usuario no existe", async () => {
    (prisma.usuario.findUnique as jest.Mock).mockResolvedValue(null);

    const formData = mockFormData({
      email: "john@example.com",
      password: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    });

    const result = await logInAction({} as FormActionState, formData);

    expect(result.state).toBe("error");
    expect(result.message).toBe("Datos del formulario incorrectos");
    expect(result.errors?.email).toBe("No existe ningún usuario con ese correo");
  });

  it("Debe devolver un error si la contraseña no coincide", async () => {
    const hashedPassword = await bcrypt.hash("testestestestestestest", 10);

    (prisma.usuario.findUnique as jest.Mock).mockResolvedValue({
      id: "1",
      role: "admin",
      credenciales: { password: hashedPassword }
    });

    const formData = mockFormData({
      email: "john@example.com",
      password: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    });

    const result = await logInAction({} as FormActionState, formData);

    expect(result.state).toBe("error");
    expect(result.message).toBe("Datos del formulario incorrectos");
    expect(result.errors?.password).toBe("La contraseña no es válida para este usuario.");
  });

  it("Debe devolver éxito si el usuario existe y la contraseña es correcta", async () => {
    const hashedPassword = await bcrypt.hash("aaaaaaaaaaaaaaaaaaaa", 10);

    (prisma.usuario.findUnique as jest.Mock).mockResolvedValue({
      id: "1",
      role: "admin",
      credenciales: { password: hashedPassword }
    });

    const formData = mockFormData({
      email: "john@example.com",
      password: "aaaaaaaaaaaaaaaaaaaa"
    });

    const result = await logInAction({} as FormActionState, formData);

    expect(result.state).toBe("success");
    expect(result.message).toBe("El usuario y la contraseña son correctos");
    await waitFor(() => expect(createSession).toHaveBeenCalledTimes(1));
  });
});
