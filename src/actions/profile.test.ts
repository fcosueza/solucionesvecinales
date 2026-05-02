import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { eliminarSesion } from "@/lib/session";
import { redirect } from "next/navigation";
import { saveProfileImageFile } from "./uploadProfileImage";
import bcrypt from "bcrypt";
import { deleteProfile, updateProfile } from "./profile";

jest.mock("@/lib/dal", () => jest.fn());
jest.mock("@/actions/uploadProfileImage", () => ({
  saveProfileImageFile: jest.fn()
}));
jest.mock("@/lib/session", () => ({
  eliminarSesion: jest.fn()
}));
jest.mock("bcrypt", () => ({
  hash: jest.fn()
}));
jest.mock("next/navigation", () => ({
  redirect: jest.fn()
}));
jest.mock("@/lib/prisma", () => ({
  __esModule: true,
  default: {
    usuario: {
      update: jest.fn()
    },
    $transaction: jest.fn()
  }
}));

describe("Suite de pruebas de profile actions", () => {
  const verifySessionMock = verifySession as jest.Mock;
  const saveProfileImageFileMock = saveProfileImageFile as jest.Mock;
  const bcryptHashMock = bcrypt.hash as jest.Mock;
  const eliminarSesionMock = eliminarSesion as jest.Mock;
  const redirectMock = redirect as unknown as jest.Mock;

  const prismaUsuarioUpdateMock = (prisma as any).usuario.update as jest.Mock;
  const prismaTransactionMock = (prisma as any).$transaction as jest.Mock;

  const crearFormData = (data: Record<string, string>) => {
    const fd = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      fd.append(key, value);
    });

    return fd;
  };

  const formValido = () =>
    crearFormData({
      name: "Juan",
      surname: "Perez",
      email: "juan@example.com",
      password: "",
      repeat: ""
    });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Debe devolver error en updateProfile si no hay sesion", async () => {
    verifySessionMock.mockResolvedValue({ isAuth: false });
    const formData = formValido();

    const resultado = await updateProfile({ state: "error", message: "" }, formData);

    expect(resultado.state).toBe("error");
    expect(resultado.message).toBe("Debes iniciar sesión para actualizar tu perfil");
    expect(resultado.payload).toBe(formData);
    expect(prismaUsuarioUpdateMock).not.toHaveBeenCalled();
  });

  it("Debe devolver error en updateProfile si la validacion falla", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: { userID: "user-1", role: "tenant" }
    });

    const resultado = await updateProfile(
      { state: "error", message: "" },
      crearFormData({
        name: "A",
        surname: "B",
        email: "email-invalido",
        password: "123",
        repeat: "456"
      })
    );

    expect(resultado.state).toBe("error");
    expect(resultado.message).toBe("Datos del formulario incorrectos");
    expect(resultado.errors).toBeDefined();
    expect(prismaUsuarioUpdateMock).not.toHaveBeenCalled();
  });

  it("Debe actualizar perfil sin imagen ni contrasena", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: { userID: "user-1", role: "tenant" }
    });
    prismaUsuarioUpdateMock.mockResolvedValue({});

    const resultado = await updateProfile({ state: "error", message: "" }, formValido());

    expect(resultado).toEqual({
      state: "success",
      message: "Perfil actualizado correctamente"
    });
    expect(prismaUsuarioUpdateMock).toHaveBeenCalledWith({
      where: { id: "user-1" },
      data: {
        nombre: "Juan",
        apellido: "Perez",
        email: "juan@example.com"
      }
    });
  });

  it("Debe actualizar perfil con contrasena cifrada", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: { userID: "user-1", role: "tenant" }
    });
    bcryptHashMock.mockResolvedValue("hashed-pass");
    prismaUsuarioUpdateMock.mockResolvedValue({});

    const resultado = await updateProfile(
      { state: "error", message: "" },
      crearFormData({
        name: "Juan",
        surname: "Perez",
        email: "juan@example.com",
        password: "123456789012345",
        repeat: "123456789012345"
      })
    );

    expect(resultado.state).toBe("success");
    expect(bcryptHashMock).toHaveBeenCalledWith("123456789012345", 10);
    expect(prismaUsuarioUpdateMock).toHaveBeenCalledWith({
      where: { id: "user-1" },
      data: {
        nombre: "Juan",
        apellido: "Perez",
        email: "juan@example.com",
        credenciales: {
          upsert: {
            create: { password: "hashed-pass" },
            update: { password: "hashed-pass" }
          }
        }
      }
    });
  });

  it("Debe devolver error en updateProfile si falla guardado de imagen", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: { userID: "user-1", role: "tenant" }
    });
    saveProfileImageFileMock.mockResolvedValue({ error: "Error en imagen" });

    const formData = formValido();
    formData.append("imagen", new File(["img"], "avatar.png", { type: "image/png" }));

    const resultado = await updateProfile({ state: "error", message: "" }, formData);

    expect(resultado).toEqual({
      state: "error",
      message: "Error en imagen",
      payload: formData
    });
    expect(prismaUsuarioUpdateMock).not.toHaveBeenCalled();
  });

  it("Debe devolver error generico en updateProfile si imagen no devuelve url", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: { userID: "user-1", role: "tenant" }
    });
    saveProfileImageFileMock.mockResolvedValue({});

    const formData = formValido();
    formData.append("imagen", new File(["img"], "avatar.png", { type: "image/png" }));

    const resultado = await updateProfile({ state: "error", message: "" }, formData);

    expect(resultado).toEqual({
      state: "error",
      message: "Error al actualizar la imagen de perfil",
      payload: formData
    });
    expect(prismaUsuarioUpdateMock).not.toHaveBeenCalled();
  });

  it("Debe actualizar perfil con imagen", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: { userID: "user-1", role: "tenant" }
    });
    saveProfileImageFileMock.mockResolvedValue({ imagen: "/uploads/profiles/avatar.png" });
    prismaUsuarioUpdateMock.mockResolvedValue({});

    const formData = formValido();
    formData.append("imagen", new File(["img"], "avatar.png", { type: "image/png" }));

    const resultado = await updateProfile({ state: "error", message: "" }, formData);

    expect(resultado.state).toBe("success");
    expect(saveProfileImageFileMock).toHaveBeenCalled();
    expect(prismaUsuarioUpdateMock).toHaveBeenCalledWith({
      where: { id: "user-1" },
      data: {
        nombre: "Juan",
        apellido: "Perez",
        email: "juan@example.com",
        imagen: "/uploads/profiles/avatar.png"
      }
    });
  });

  it("Debe devolver error en updateProfile si prisma lanza excepcion", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: { userID: "user-1", role: "tenant" }
    });
    prismaUsuarioUpdateMock.mockRejectedValue(new Error("DB error"));

    const formData = formValido();
    const resultado = await updateProfile({ state: "error", message: "" }, formData);

    expect(resultado).toEqual({
      state: "error",
      message: "Error al actualizar el perfil. Inténtalo de nuevo.",
      payload: formData
    });
  });

  it("Debe devolver error en deleteProfile si no hay sesion", async () => {
    verifySessionMock.mockResolvedValue({ isAuth: false });

    const resultado = await deleteProfile({ state: "error", message: "" });

    expect(resultado).toEqual({
      state: "error",
      message: "Debes iniciar sesión para eliminar tu cuenta"
    });
    expect(prismaTransactionMock).not.toHaveBeenCalled();
  });

  it("Debe devolver error en deleteProfile si falla la transaccion", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: { userID: "user-1", role: "tenant" }
    });
    prismaTransactionMock.mockRejectedValue(new Error("tx error"));

    const resultado = await deleteProfile({ state: "error", message: "" });

    expect(resultado).toEqual({
      state: "error",
      message: "No se pudo eliminar la cuenta. Inténtalo de nuevo."
    });
    expect(eliminarSesionMock).not.toHaveBeenCalled();
    expect(redirectMock).not.toHaveBeenCalled();
  });

  it("Debe eliminar perfil, cerrar sesion y redirigir", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: { userID: 25, role: "tenant" }
    });

    const tx = {
      comunidad: { deleteMany: jest.fn().mockResolvedValue({}) },
      usuario: { delete: jest.fn().mockResolvedValue({}) }
    };

    prismaTransactionMock.mockImplementation(async (callback: (arg: typeof tx) => Promise<void>) => callback(tx));

    await deleteProfile({ state: "error", message: "" });

    expect(prismaTransactionMock).toHaveBeenCalledTimes(1);
    expect(tx.comunidad.deleteMany).toHaveBeenCalledWith({ where: { adminID: "25" } });
    expect(tx.usuario.delete).toHaveBeenCalledWith({ where: { id: "25" } });
    expect(eliminarSesionMock).toHaveBeenCalledTimes(1);
    expect(redirectMock).toHaveBeenCalledWith("/");
  });
});
