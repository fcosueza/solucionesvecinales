import { FormActionState, UserRole } from "@/types";
import { createSession } from "@/lib/session";
import { waitFor } from "@testing-library/dom";
import logIn from "./logIn";
import prisma from "../../lib/prisma";
import bcrypt from "bcrypt";

jest.mock("@/lib/session");
jest.mock("@/lib/prisma", () => ({
  user: {
    findUnique: jest.fn()
  }
}));

describe("logInAction server function test suite", () => {
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

  it("Should return an error if validation fails", async () => {
    const formData = crearFormData({
      email: "not-an-email@gmail.c",
      password: "aaa"
    });

    const result = await logIn({} as FormActionState, formData);

    expect(result.state).toBe("error");
    expect(result.message).toBe("Validación de datos del formulario fallida");
    expect(result.errors).toBeDefined();
    expect(prisma.user.findUnique).not.toHaveBeenCalled();
  });

  it("Should return an error if the user does not exist", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    const formData = crearFormData({
      email: "john@example.com",
      password: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    });

    const result = await logIn({} as FormActionState, formData);

    expect(result.state).toBe("error");
    expect(result.message).toBe("Validación de datos del formulario fallida");
    expect(result.errors?.email).toBe("No existe un usuario con este correo electrónico en la base de datos.");
  });

  it("Should return an error if the password does not match", async () => {
    const hashedPassword = await bcrypt.hash("testestestestestestest", 10);

    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: "1",
      role: "admin",
      credentials: { password: hashedPassword }
    });

    const formData = crearFormData({
      email: "john@example.com",
      password: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    });

    const result = await logIn({} as FormActionState, formData);

    expect(result.state).toBe("error");
    expect(result.message).toBe("Validación de datos del formulario fallida");
    expect(result.errors?.password).toBe("La contraseña no es válida para este usuario.");
  });

  it("Should return success if the user exists and the password is correct", async () => {
    const hashedPassword = await bcrypt.hash("aaaaaaaaaaaaaaaaaaaa", 10);

    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: "1",
      role: "admin",
      credentials: { password: hashedPassword }
    });

    const formData = crearFormData({
      email: "john@example.com",
      password: "aaaaaaaaaaaaaaaaaaaa"
    });

    const result = await logIn({} as FormActionState, formData);

    expect(result.state).toBe("success");
    expect(result.message).toBe("El nombre de usuario y la contraseña son correctos");
    expect(result.redirectTo).toBe("/communities");
    await waitFor(() => expect(createSession).toHaveBeenCalledTimes(1));
  });

  it("Should return redirectTo to backoffice when the user is webAdmin", async () => {
    const hashedPassword = await bcrypt.hash("aaaaaaaaaaaaaaaaaaaa", 10);

    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: "1",
      role: UserRole.webAdmin,
      credentials: { password: hashedPassword }
    });

    const formData = crearFormData({
      email: "webadmin@vecinos.local",
      password: "aaaaaaaaaaaaaaaaaaaa"
    });

    const result = await logIn({} as FormActionState, formData);

    expect(result.state).toBe("success");
    expect(result.redirectTo).toBe("/backoffice/overview");
  });
});
