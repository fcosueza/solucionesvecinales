import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { eliminarSesion } from "@/lib/session";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { mkdirSync } from "fs";
import { join } from "path";
import { deleteProfile, saveProfileImageFile, updateProfile, uploadProfile } from "./profile";

// Polyfill File.prototype.arrayBuffer para entorno de pruebas de jsdom
if (!File.prototype.arrayBuffer) {
  File.prototype.arrayBuffer = function () {
    return Promise.resolve(new ArrayBuffer(this.size));
  };
}

// Mocks
jest.mock("@/lib/dal", () => jest.fn());
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

  it("Debe devolver error en updateProfile si no hay sesión", async () => {
    verifySessionMock.mockResolvedValue({ isAuth: false });
    const formData = formValido();

    const resultado = await updateProfile({ state: "error", message: "" }, formData);

    expect(resultado.state).toBe("error");
    expect(resultado.message).toBe("Debes iniciar sesión para actualizar tu perfil");
    expect(resultado.payload).toBe(formData);
    expect(prismaUsuarioUpdateMock).not.toHaveBeenCalled();
  });

  it("Debe devolver error en updateProfile si la validación falla", async () => {
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

  it("Debe actualizar perfil sin imagen ni contraseña", async () => {
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

  it("Debe actualizar perfil con una contraseña cifrada", async () => {
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

  it("Debe devolver error en updateProfile si falla el guardado de imagen", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: { userID: "user-1", role: "tenant" }
    });

    const formData = formValido();
    formData.append("imagen", new File(["img"], "avatar.txt", { type: "text/plain" }));

    const resultado = await updateProfile({ state: "error", message: "" }, formData);

    expect(resultado.state).toBe("error");
    expect(resultado.message).toBe("Formato de imagen no permitido. Usa JPG, PNG, WebP o GIF.");
    expect(resultado.payload).toBe(formData);
    expect(prismaUsuarioUpdateMock).not.toHaveBeenCalled();
  });

  it("Debe devolver error en updateProfile si la imagen supera el tamano maximo", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: { userID: "user-1", role: "tenant" }
    });

    const formData = formValido();
    formData.append("imagen", new File(["x".repeat(5 * 1024 * 1024 + 1)], "avatar.png", { type: "image/png" }));

    const resultado = await updateProfile({ state: "error", message: "" }, formData);

    expect(resultado.state).toBe("error");
    expect(resultado.message).toBe("La imagen no puede superar los 5 MB.");
    expect(resultado.payload).toBe(formData);
    expect(prismaUsuarioUpdateMock).not.toHaveBeenCalled();
  });

  it("Debe devolver error en updateProfile si falla la persistencia de imagen", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: { userID: "user-1", role: "tenant" }
    });

    const file = new File(["img"], "avatar.png", { type: "image/png" });
    Object.defineProperty(file, "arrayBuffer", {
      value: jest.fn().mockRejectedValue(new Error("disk error")),
      configurable: true
    });

    const formData = formValido();
    formData.append("imagen", file);

    const resultado = await updateProfile({ state: "error", message: "" }, formData);

    expect(resultado.state).toBe("error");
    expect(resultado.message).toBe("Error al actualizar el perfil. Inténtalo de nuevo.");
    expect(prismaUsuarioUpdateMock).not.toHaveBeenCalled();
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

  it("Debe actualizar perfil con imagen valida", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: { userID: "user-1", role: "tenant" }
    });
    mkdirSync(join(process.cwd(), "public", "uploads", "profiles"), { recursive: true });
    prismaUsuarioUpdateMock.mockResolvedValue({});

    const formData = formValido();
    formData.append("imagen", new File(["img"], "avatar.png", { type: "image/png" }));

    const resultado = await updateProfile({ state: "error", message: "" }, formData);

    expect(resultado.state).toBe("success");
    expect(resultado.message).toBe("Perfil actualizado correctamente");
    expect(prismaUsuarioUpdateMock).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: "user-1" },
        data: expect.objectContaining({ imagen: expect.stringMatching(/^\/uploads\/profiles\/user-1-\d+\.png$/) })
      })
    );
  });

  it("Debe omitir el bloque de imagen si el archivo tiene tamaño cero", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: { userID: "user-1", role: "tenant" }
    });
    prismaUsuarioUpdateMock.mockResolvedValue({});

    // Use a real File with content so jsdom stores it, but override size to 0
    // so imageFile instanceof File is true but size > 0 is false (covers line 66 branch)
    const zeroFile = new File(["x"], "avatar.png", { type: "image/png" });
    Object.defineProperty(zeroFile, "size", { get: () => 0, configurable: true });

    const formData = formValido();
    // Spy on formData.get so "imagen" returns the size-0 File (get is only called
    // explicitly in updateProfile for "imagen"; Object.fromEntries uses the iterator)
    jest.spyOn(formData, "get").mockImplementation(key => {
      if (key === "imagen") return zeroFile;
      return FormData.prototype.get.call(formData, key);
    });

    const resultado = await updateProfile({ state: "error", message: "" }, formData);

    expect(resultado.state).toBe("success");
    expect(prismaUsuarioUpdateMock).toHaveBeenCalledWith({
      where: { id: "user-1" },
      data: { nombre: "Juan", apellido: "Perez", email: "juan@example.com" }
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

describe("Suite de pruebas de saveProfileImageFile", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Debe devolver error si el valor no es un File", async () => {
    const resultado = await saveProfileImageFile("no-es-un-file" as unknown as File, "user-1");

    expect(resultado).toEqual({ error: "No se ha proporcionado ningún archivo" });
  });

  it("Debe devolver error si el archivo tiene tamaño 0", async () => {
    const resultado = await saveProfileImageFile(new File([], "vacio.png", { type: "image/png" }), "user-1");

    expect(resultado).toEqual({ error: "No se ha proporcionado ningún archivo" });
  });

  it("Debe devolver error si el tipo MIME no esta permitido", async () => {
    const resultado = await saveProfileImageFile(new File(["data"], "archivo.txt", { type: "text/plain" }), "user-1");

    expect(resultado).toEqual({ error: "Formato de imagen no permitido. Usa JPG, PNG, WebP o GIF." });
  });

  it("Debe devolver error si el archivo supera el tamaño maximo", async () => {
    const grande = new File(["x".repeat(5 * 1024 * 1024 + 1)], "grande.png", { type: "image/png" });
    const resultado = await saveProfileImageFile(grande, "user-1");

    expect(resultado).toEqual({ error: "La imagen no puede superar los 5 MB." });
  });

  it("Debe guardar el archivo y devolver la URL si los datos son validos", async () => {
    mkdirSync(join(process.cwd(), "public", "uploads", "profiles"), { recursive: true });

    const file = new File(["img"], "avatar.png", { type: "image/png" });
    const resultado = await saveProfileImageFile(file, "user-42");

    expect(resultado.error).toBeUndefined();
    expect(resultado.imagen).toMatch(/^\/uploads\/profiles\/user-42-\d+\.png$/);
  });

  it("Debe usar la extension .jpg si el archivo no tiene extension", async () => {
    mkdirSync(join(process.cwd(), "public", "uploads", "profiles"), { recursive: true });

    const file = new File(["img"], "avatar", { type: "image/png" });
    const resultado = await saveProfileImageFile(file, "user-42");

    expect(resultado.error).toBeUndefined();
    expect(resultado.imagen).toMatch(/^\/uploads\/profiles\/user-42-\d+\.jpg$/);
  });

  it("Debe propagar el error si falla la lectura del archivo", async () => {
    const file = new File(["img"], "avatar.png", { type: "image/png" });
    Object.defineProperty(file, "arrayBuffer", {
      value: jest.fn().mockRejectedValue(new Error("disco lleno")),
      configurable: true
    });

    await expect(saveProfileImageFile(file, "user-1")).rejects.toThrow("disco lleno");
  });
});

describe("Suite de pruebas de uploadProfile", () => {
  const verifySessionMock = verifySession as jest.Mock;
  const prismaUsuarioUpdateMock = (prisma as any).usuario.update as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Debe devolver error si no hay sesion autenticada", async () => {
    verifySessionMock.mockResolvedValue({ isAuth: false, session: null });

    const resultado = await uploadProfile(new FormData());

    expect(resultado).toEqual({ error: "Debes iniciar sesión para subir una imagen" });
    expect(prismaUsuarioUpdateMock).not.toHaveBeenCalled();
  });

  it("Debe devolver error si saveProfileImageFile devuelve error", async () => {
    verifySessionMock.mockResolvedValue({ isAuth: true, session: { userID: "user-1", role: "tenant" } });

    const fd = new FormData();
    fd.append("imagen", new File(["data"], "archivo.txt", { type: "text/plain" }));

    const resultado = await uploadProfile(fd);

    expect(resultado).toEqual({ error: "Formato de imagen no permitido. Usa JPG, PNG, WebP o GIF." });
    expect(prismaUsuarioUpdateMock).not.toHaveBeenCalled();
  });

  it("Debe devolver error generico si saveProfileImageFile no retorna imagen ni error", async () => {
    verifySessionMock.mockResolvedValue({ isAuth: true, session: { userID: "user-1", role: "tenant" } });

    // Pass a non-File value so saveProfileImageFile returns { error: "..." }
    // covering the result.error || !result.imagen branch
    const fd = new FormData();
    fd.append("imagen", "no-es-un-file");

    const resultado = await uploadProfile(fd);

    expect(resultado.error).toBeDefined();
    expect(prismaUsuarioUpdateMock).not.toHaveBeenCalled();
  });

  it("Debe devolver error generico si saveProfileImageFile no retorna imagen", async () => {
    verifySessionMock.mockResolvedValue({ isAuth: true, session: { userID: "user-1", role: "tenant" } });

    // Pass a non-File value so saveProfileImageFile returns { error: "..." }
    const fd = new FormData();
    fd.append("imagen", "no-es-un-file");

    const resultado = await uploadProfile(fd);

    expect(resultado.error).toBeDefined();
    expect(prismaUsuarioUpdateMock).not.toHaveBeenCalled();
  });

  it("Debe actualizar la imagen del usuario y devolver la URL si tiene exito", async () => {
    verifySessionMock.mockResolvedValue({ isAuth: true, session: { userID: "user-1", role: "tenant" } });
    mkdirSync(join(process.cwd(), "public", "uploads", "profiles"), { recursive: true });
    prismaUsuarioUpdateMock.mockResolvedValueOnce({});

    const fd = new FormData();
    fd.append("imagen", new File(["img"], "avatar.png", { type: "image/png" }));

    const resultado = await uploadProfile(fd);

    expect(resultado.error).toBeUndefined();
    expect(resultado.imagen).toMatch(/^\/uploads\/profiles\/user-1-\d+\.png$/);
    expect(prismaUsuarioUpdateMock).toHaveBeenCalledWith({
      where: { id: "user-1" },
      data: { imagen: resultado.imagen }
    });
  });
});
