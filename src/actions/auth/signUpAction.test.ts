import { FormActionState } from "@/types";
import signUpAction from "./signUpAction";
import prisma from "../../lib/prisma";

jest.mock("../../lib/prisma", () => ({
  usuario: {
    create: jest.fn()
  }
}));

describe("signUpAction test suite", () => {
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
      email: "test@email.c",
      role: "failrole",
      name: "a",
      surname: "a",
      password: "aa",
      repeat: "a"
    });

    const result = await signUpAction({} as FormActionState, formData);

    expect(result.state).toBe("error");
    expect(result.message).toBe("Datos del formulario incorrectos");
    expect(result.errors).toBeDefined();
    expect(prisma.usuario.create).not.toHaveBeenCalled();
  });

  it("Debe devolver un error si Prisma no puede crear el usuario", async () => {
    (prisma.usuario.create as jest.Mock).mockRejectedValue({
      e: {
        message: "Can`t create user"
      }
    });

    const formData = mockFormData({
      email: "test@email.com",
      role: "inquilino",
      name: "testname",
      surname: "testsurname",
      password: "testtesttesttest",
      repeat: "testtesttesttest"
    });

    const result = await signUpAction({} as FormActionState, formData);

    expect(result.state).toBe("error");
    expect(result.message).toBe("No se pudo crear el usuario");
    expect(result.errors?.prisma).not.toBeNull();
  });

  it("Debe devolver éxito si el usuario se ha registrado correctamente", async () => {
    (prisma.usuario.create as jest.Mock).mockResolvedValue({ id: 1 });

    const formData = mockFormData({
      email: "test@email.com",
      role: "inquilino",
      name: "testname",
      surname: "testsurname",
      password: "testtesttesttest",
      repeat: "testtesttesttest"
    });

    const result = await signUpAction({} as FormActionState, formData);

    expect(result.state).toBe("success");
    expect(result.message).toBe("Usuario creado correctamente");
    expect(prisma.usuario.create).toHaveBeenCalled();
  });
});
