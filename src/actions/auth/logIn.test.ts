import { FormActionState, UserRole } from "@/types";
import { crearSesion } from "@/lib/session";
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

describe("Suite de pruebas de logInAction", () => {
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
      email: "not-an-email@gmail.c",
      password: "aaa"
    });

    const resultado = await logIn({} as FormActionState, datosForm);

    expect(resultado.state).toBe("error");
    expect(resultado.message).toBe("Form data validation failed");
    expect(resultado.errors).toBeDefined();
    expect(prisma.user.findUnique).not.toHaveBeenCalled();
  });

  it("Debe devolver un error si el usuario no existe", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    const datosForm = crearFormData({
      email: "john@example.com",
      password: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    });

    const resultado = await logIn({} as FormActionState, datosForm);

    expect(resultado.state).toBe("error");
    expect(resultado.message).toBe("Form data validation failed");
    expect(resultado.errors?.email).toBe("There is no user with this email in the database.");
  });

  it("Debe devolver un error si la contraseña no coincide", async () => {
    const hashedPassword = await bcrypt.hash("testestestestestestest", 10);

    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: "1",
      role: "admin",
      credentials: { password: hashedPassword }
    });

    const datosForm = crearFormData({
      email: "john@example.com",
      password: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    });

    const resultado = await logIn({} as FormActionState, datosForm);

    expect(resultado.state).toBe("error");
    expect(resultado.message).toBe("Form data validation failed");
    expect(resultado.errors?.password).toBe("The password is not valid for this user.");
  });

  it("Debe devolver success si el usuario existe y la contraseña es correcta", async () => {
    const hashedPassword = await bcrypt.hash("aaaaaaaaaaaaaaaaaaaa", 10);

    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: "1",
      role: "admin",
      credentials: { password: hashedPassword }
    });

    const datosForm = crearFormData({
      email: "john@example.com",
      password: "aaaaaaaaaaaaaaaaaaaa"
    });

    const resultado = await logIn({} as FormActionState, datosForm);

    expect(resultado.state).toBe("success");
    expect(resultado.message).toBe("The username and password are correct");
    expect(resultado.redirectTo).toBe("/communities");
    await waitFor(() => expect(crearSesion).toHaveBeenCalledTimes(1));
  });

  it("Debe devolver redirectTo a backoffice cuando el usuario es webAdmin", async () => {
    const hashedPassword = await bcrypt.hash("aaaaaaaaaaaaaaaaaaaa", 10);

    (prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: "1",
      role: UserRole.webAdmin,
      credentials: { password: hashedPassword }
    });

    const datosForm = crearFormData({
      email: "webadmin@vecinos.local",
      password: "aaaaaaaaaaaaaaaaaaaa"
    });

    const resultado = await logIn({} as FormActionState, datosForm);

    expect(resultado.state).toBe("success");
    expect(resultado.redirectTo).toBe("/backoffice/overview");
  });
});
