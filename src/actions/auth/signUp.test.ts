import { FormActionState } from "@/types";
import signUp from "./signUp";
import prisma from "../../lib/prisma";

jest.mock("../../lib/prisma", () => ({
  user: {
    create: jest.fn()
  }
}));

describe("Suite de pruebas de signUpAction", () => {
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
      email: "test@email.c",
      role: "failrole",
      name: "a",
      surname: "a",
      password: "aa",
      repeat: "a"
    });

    const resultado = await signUp({} as FormActionState, datosForm);

    expect(resultado.state).toBe("error");
    expect(resultado.message).toBe("Form data validation failed");
    expect(resultado.errors).toBeDefined();
    expect(prisma.user.create).not.toHaveBeenCalled();
  });

  it("Debe devolver un error si Prisma no puede crear el usuario", async () => {
    (prisma.user.create as jest.Mock).mockRejectedValue(new Error("Database error"));

    const datosForm = crearFormData({
      email: "test@email.com",
      role: "tenant",
      name: "testname",
      surname: "testsurname",
      password: "testtesttesttest",
      repeat: "testtesttesttest"
    });

    const resultado = await signUp({} as FormActionState, datosForm);

    expect(resultado.state).toBe("error");
    expect(resultado.message).toBe("Failed to create user");
    expect(resultado.errors?.prisma).toBe("Database error");
  });

  it("Debe devolver éxito si el usuario se ha registrado correctamente", async () => {
    (prisma.user.create as jest.Mock).mockResolvedValue({ id: 1 });

    const datosForm = crearFormData({
      email: "test@email.com",
      role: "tenant",
      name: "testname",
      surname: "testsurname",
      password: "testtesttesttest",
      repeat: "testtesttesttest"
    });

    const resultado = await signUp({} as FormActionState, datosForm);

    expect(resultado.state).toBe("success");
    expect(resultado.message).toBe("User created successfully");
    expect(prisma.user.create).toHaveBeenCalled();
  });
});
