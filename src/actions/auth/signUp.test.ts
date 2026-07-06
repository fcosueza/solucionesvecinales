import { FormActionState } from "@/types";
import signUp from "./signUp";
import prisma from "../../lib/prisma";

jest.mock("../../lib/prisma", () => ({
  user: {
    create: jest.fn()
  }
}));

describe("signUpAction server function test suite", () => {
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
      email: "test@email.c",
      role: "failrole",
      name: "a",
      surname: "a",
      password: "aa",
      repeat: "a"
    });

    const resultado = await signUp({} as FormActionState, formData);

    expect(resultado.state).toBe("error");
    expect(resultado.message).toBe("Validación de datos del formulario fallida");
    expect(resultado.errors).toBeDefined();
    expect(prisma.user.create).not.toHaveBeenCalled();
  });

  it("Should return an error if Prisma cannot create the user", async () => {
    (prisma.user.create as jest.Mock).mockRejectedValue(new Error("Database error"));

    const formData = crearFormData({
      email: "test@email.com",
      role: "tenant",
      name: "testname",
      surname: "testsurname",
      password: "testtesttesttest",
      repeat: "testtesttesttest"
    });

    const result = await signUp({} as FormActionState, formData);

    expect(result.state).toBe("error");
    expect(result.message).toBe("No se pudo crear el usuario");
    expect(result.errors?.prisma).toBe("Database error");
  });

  it("Should return success if the user is registered successfully", async () => {
    (prisma.user.create as jest.Mock).mockResolvedValue({ id: 1 });

    const formData = crearFormData({
      email: "test@email.com",
      role: "tenant",
      name: "testname",
      surname: "testsurname",
      password: "testtesttesttest",
      repeat: "testtesttesttest"
    });

    const result = await signUp({} as FormActionState, formData);

    expect(result.state).toBe("success");
    expect(result.message).toBe("Usuario creado exitosamente");
    expect(prisma.user.create).toHaveBeenCalled();
  });
});
