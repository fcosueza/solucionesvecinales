import { FormActionState } from "@/types";
import signUpAction from "./signUpAction";
import prisma from "../../lib/prisma";

jest.mock("../../lib/prisma", () => ({
  usuario: {
    create: jest.fn()
  }
}));

describe("Pruebas de la acción signUpAction", () => {
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

    const resultado = await signUpAction({} as FormActionState, datosForm);

    expect(resultado.state).toBe("error");
    expect(resultado.message).toBe("Datos del formulario incorrectos");
    expect(resultado.errors).toBeDefined();
    expect(prisma.usuario.create).not.toHaveBeenCalled();
  });

  it("Debe devolver un error si Prisma no puede crear el usuario", async () => {
    (prisma.usuario.create as jest.Mock).mockRejectedValue({
      e: {
        message: "Can`t create user"
      }
    });

    const datosForm = crearFormData({
      email: "test@email.com",
      role: "inquilino",
      name: "testname",
      surname: "testsurname",
      password: "testtesttesttest",
      repeat: "testtesttesttest"
    });

    const resultado = await signUpAction({} as FormActionState, datosForm);

    expect(resultado.state).toBe("error");
    expect(resultado.message).toBe("No se pudo crear el usuario");
    expect(resultado.errors?.prisma).not.toBeNull();
  });

  it("Debe devolver éxito si el usuario se ha registrado correctamente", async () => {
    (prisma.usuario.create as jest.Mock).mockResolvedValue({ id: 1 });

    const datosForm = crearFormData({
      email: "test@email.com",
      role: "inquilino",
      name: "testname",
      surname: "testsurname",
      password: "testtesttesttest",
      repeat: "testtesttesttest"
    });

    const resultado = await signUpAction({} as FormActionState, datosForm);

    expect(resultado.state).toBe("success");
    expect(resultado.message).toBe("Usuario creado correctamente");
    expect(prisma.usuario.create).toHaveBeenCalled();
  });
});
