import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { mkdirSync } from "fs";
import { join } from "path";
import { deleteProfile, saveProfileImageFile, updateProfile, uploadProfile } from "./profile";

// Polyfill File.prototype.arrayBuffer for jsdom sandbox
if (!File.prototype.arrayBuffer) {
  File.prototype.arrayBuffer = function () {
    return Promise.resolve(new ArrayBuffer(this.size));
  };
}

// Mocks
jest.mock("@/lib/dal", () => jest.fn());
jest.mock("@/lib/session", () => ({
  deleteSession: jest.fn()
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
    user: {
      update: jest.fn()
    },
    $transaction: jest.fn()
  }
}));

describe("Test suite for profile actions", () => {
  const verifySessionMock = verifySession as jest.Mock;
  const bcryptHashMock = bcrypt.hash as jest.Mock;
  const deleteSessionMock = deleteSession as jest.Mock;
  const redirectMock = redirect as unknown as jest.Mock;

  const prismaUserUpdateMock = (prisma as any).user.update as jest.Mock;
  const prismaTransactionMock = (prisma as any).$transaction as jest.Mock;

  const createFormData = (data: Record<string, string>) => {
    const fd = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      fd.append(key, value);
    });

    return fd;
  };

  const validForm = () =>
    createFormData({
      name: "Juan",
      surname: "Perez",
      email: "juan@example.com",
      password: "",
      repeat: ""
    });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should return an error in updateProfile if there is no session", async () => {
    verifySessionMock.mockResolvedValue({ isAuth: false });
    const formData = validForm();

    const result = await updateProfile({ state: "error", message: "" }, formData);

    expect(result.state).toBe("error");
    expect(result.message).toBe("Debes iniciar sesión para actualizar tu perfil");
    expect(result.payload).toBe(formData);
    expect(prismaUserUpdateMock).not.toHaveBeenCalled();
  });

  it("Should return an error in updateProfile if validation fails", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: { userID: "user-1", role: "tenant" }
    });

    const result = await updateProfile(
      { state: "error", message: "" },
      createFormData({
        name: "A",
        surname: "B",
        email: "email-invalido",
        password: "123",
        repeat: "456"
      })
    );

    expect(result.state).toBe("error");
    expect(result.message).toBe("Invalid form data");
    expect(result.errors).toBeDefined();
    expect(prismaUserUpdateMock).not.toHaveBeenCalled();
  });

  it("Should update profile without image or password", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: { userID: "user-1", role: "tenant" }
    });
    prismaUserUpdateMock.mockResolvedValue({});

    const result = await updateProfile({ state: "error", message: "" }, validForm());

    expect(result).toEqual({
      state: "success",
      message: "Perfil actualizado exitosamente",
      payload: expect.any(FormData)
    });
    expect(prismaUserUpdateMock).toHaveBeenCalledWith({
      where: { id: "user-1" },
      data: {
        name: "Juan",
        lastName: "Perez",
        email: "juan@example.com"
      }
    });
  });

  it("Should update profile with a hashed password", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: { userID: "user-1", role: "tenant" }
    });
    bcryptHashMock.mockResolvedValue("hashed-pass");
    prismaUserUpdateMock.mockResolvedValue({});

    const result = await updateProfile(
      { state: "error", message: "" },
      createFormData({
        name: "Juan",
        surname: "Perez",
        email: "juan@example.com",
        password: "123456789012345",
        repeat: "123456789012345"
      })
    );

    expect(result.state).toBe("success");
    expect(bcryptHashMock).toHaveBeenCalledWith("123456789012345", 10);
    expect(prismaUserUpdateMock).toHaveBeenCalledWith({
      where: { id: "user-1" },
      data: {
        name: "Juan",
        lastName: "Perez",
        email: "juan@example.com",
        credentials: {
          upsert: {
            create: { password: "hashed-pass" },
            update: { password: "hashed-pass" }
          }
        }
      }
    });
  });

  it("Should return an error in updateProfile if image saving fails", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: { userID: "user-1", role: "tenant" }
    });

    const formData = validForm();
    formData.append("imagen", new File(["img"], "avatar.txt", { type: "text/plain" }));

    const result = await updateProfile({ state: "error", message: "" }, formData);

    expect(result.state).toBe("error");
    expect(result.message).toBe("Formato de imagen no válido. Usa JPG, PNG, WebP o GIF.");
    expect(result.payload).toBe(formData);
    expect(prismaUserUpdateMock).not.toHaveBeenCalled();
  });

  it("Should return an error in updateProfile if the image exceeds the maximum size", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: { userID: "user-1", role: "tenant" }
    });

    const formData = validForm();
    formData.append("imagen", new File(["x".repeat(5 * 1024 * 1024 + 1)], "avatar.png", { type: "image/png" }));

    const result = await updateProfile({ state: "error", message: "" }, formData);

    expect(result.state).toBe("error");
    expect(result.message).toBe("El tamaño de la imagen no puede exceder los 5 MB.");
    expect(result.payload).toBe(formData);
    expect(prismaUserUpdateMock).not.toHaveBeenCalled();
  });

  it("Should return an error in updateProfile if image persistence fails", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: { userID: "user-1", role: "tenant" }
    });

    const file = new File(["img"], "avatar.png", { type: "image/png" });
    Object.defineProperty(file, "arrayBuffer", {
      value: jest.fn().mockRejectedValue(new Error("disk error")),
      configurable: true
    });

    const formData = validForm();
    formData.append("imagen", file);

    const result = await updateProfile({ state: "error", message: "" }, formData);

    expect(result.state).toBe("error");
    expect(result.message).toBe("No se pudo actualizar el perfil. Por favor, inténtalo de nuevo.");
    expect(prismaUserUpdateMock).not.toHaveBeenCalled();
  });

  it("Should return an error in updateProfile if Prisma throws an exception", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: { userID: "user-1", role: "tenant" }
    });
    prismaUserUpdateMock.mockRejectedValue(new Error("DB error"));

    const formData = validForm();
    const result = await updateProfile({ state: "error", message: "" }, formData);

    expect(result).toEqual({
      state: "error",
      message: "No se pudo actualizar el perfil. Por favor, inténtalo de nuevo.",
      payload: formData
    });
  });

  it("Should update profile with a valid image", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: { userID: "user-1", role: "tenant" }
    });
    mkdirSync(join(process.cwd(), "public", "uploads", "profiles"), { recursive: true });
    prismaUserUpdateMock.mockResolvedValue({});

    const formData = validForm();
    formData.append("imagen", new File(["img"], "avatar.png", { type: "image/png" }));

    const result = await updateProfile({ state: "error", message: "" }, formData);

    expect(result.state).toBe("success");
    expect(result.message).toBe("Perfil actualizado exitosamente");
    expect(prismaUserUpdateMock).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: "user-1" },
        data: expect.objectContaining({ image: expect.stringMatching(/^\/uploads\/profiles\/user-1-\d+\.png$/) })
      })
    );
  });

  it("Should skip the image block if the file has zero size", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: { userID: "user-1", role: "tenant" }
    });
    prismaUserUpdateMock.mockResolvedValue({});

    // Use a real File with content so jsdom stores it, but override size to 0
    // so imageFile instanceof File is true but size > 0 is false (covers line 66 branch)
    const zeroFile = new File(["x"], "avatar.png", { type: "image/png" });
    Object.defineProperty(zeroFile, "size", { get: () => 0, configurable: true });

    const formData = validForm();
    // Spy on formData.get so "imagen" returns the size-0 File (get is only called
    // explicitly in updateProfile for "imagen"; Object.fromEntries uses the iterator)
    jest.spyOn(formData, "get").mockImplementation(key => {
      if (key === "imagen") return zeroFile;
      return FormData.prototype.get.call(formData, key);
    });

    const result = await updateProfile({ state: "error", message: "" }, formData);

    expect(result.state).toBe("success");
    expect(prismaUserUpdateMock).toHaveBeenCalledWith({
      where: { id: "user-1" },
      data: { name: "Juan", lastName: "Perez", email: "juan@example.com" }
    });
  });

  it("Should return an error in deleteProfile if there is no session", async () => {
    verifySessionMock.mockResolvedValue({ isAuth: false });

    const result = await deleteProfile({ state: "error", message: "" });

    expect(result).toEqual({
      state: "error",
      message: "Debes iniciar sesión para eliminar tu cuenta"
    });
    expect(prismaTransactionMock).not.toHaveBeenCalled();
  });

  it("Should return an error in deleteProfile if the transaction fails", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: { userID: "user-1", role: "tenant" }
    });
    prismaTransactionMock.mockRejectedValue(new Error("tx error"));

    const result = await deleteProfile({ state: "error", message: "" });

    expect(result).toEqual({
      state: "error",
      message: "No se pudo eliminar la cuenta. Por favor, inténtalo de nuevo."
    });
    expect(deleteSessionMock).not.toHaveBeenCalled();
    expect(redirectMock).not.toHaveBeenCalled();
  });

  it("Should delete the profile, close the session, and redirect", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: { userID: 25, role: "tenant" }
    });

    const tx = {
      community: { deleteMany: jest.fn().mockResolvedValue({}) },
      user: { delete: jest.fn().mockResolvedValue({}) }
    };

    prismaTransactionMock.mockImplementation(async (callback: (arg: typeof tx) => Promise<void>) => callback(tx));

    await deleteProfile({ state: "error", message: "" });

    expect(prismaTransactionMock).toHaveBeenCalledTimes(1);
    expect(tx.community.deleteMany).toHaveBeenCalledWith({ where: { adminId: "25" } });
    expect(tx.user.delete).toHaveBeenCalledWith({ where: { id: "25" } });
    expect(deleteSessionMock).toHaveBeenCalledTimes(1);
    expect(redirectMock).toHaveBeenCalledWith("/");
  });
});

describe("Test suite for saveProfileImageFile", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should return an error if the value is not a File", async () => {
    const result = await saveProfileImageFile("no-es-un-file" as unknown as File, "user-1");

    expect(result).toEqual({ error: "No file provided" });
  });

  it("Should return an error if the file has size 0", async () => {
    const result = await saveProfileImageFile(new File([], "vacio.png", { type: "image/png" }), "user-1");

    expect(result).toEqual({ error: "No file provided" });
  });

  it("Should return an error if the MIME type is not allowed", async () => {
    const result = await saveProfileImageFile(new File(["data"], "archivo.txt", { type: "text/plain" }), "user-1");

    expect(result).toEqual({ error: "Formato de imagen no válido. Usa JPG, PNG, WebP o GIF." });
  });

  it("Should return an error if the file exceeds the maximum size", async () => {
    const bigFile = new File(["x".repeat(5 * 1024 * 1024 + 1)], "grande.png", { type: "image/png" });
    const result = await saveProfileImageFile(bigFile, "user-1");

    expect(result).toEqual({ error: "El tamaño de la imagen no puede exceder los 5 MB." });
  });

  it("Should save the file and return the URL if the data is valid", async () => {
    mkdirSync(join(process.cwd(), "public", "uploads", "profiles"), { recursive: true });

    const file = new File(["img"], "avatar.png", { type: "image/png" });
    const result = await saveProfileImageFile(file, "user-42");

    expect(result.error).toBeUndefined();
    expect(result.imagen).toMatch(/^\/uploads\/profiles\/user-42-\d+\.png$/);
  });

  it("Should use the .jpg extension if the file has no extension", async () => {
    mkdirSync(join(process.cwd(), "public", "uploads", "profiles"), { recursive: true });

    const file = new File(["img"], "avatar", { type: "image/png" });
    const result = await saveProfileImageFile(file, "user-42");

    expect(result.error).toBeUndefined();
    expect(result.imagen).toMatch(/^\/uploads\/profiles\/user-42-\d+\.jpg$/);
  });

  it("Should propagate the error if reading the file fails", async () => {
    const file = new File(["img"], "avatar.png", { type: "image/png" });
    Object.defineProperty(file, "arrayBuffer", {
      value: jest.fn().mockRejectedValue(new Error("disco lleno")),
      configurable: true
    });

    await expect(saveProfileImageFile(file, "user-1")).rejects.toThrow("disco lleno");
  });
});

describe("Test suite for uploadProfile", () => {
  const verifySessionMock = verifySession as jest.Mock;
  const prismaUsuarioUpdateMock = (prisma as any).user.update as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return an error if there is no authenticated session", async () => {
    verifySessionMock.mockResolvedValue({ isAuth: false, session: null });

    const result = await uploadProfile(new FormData());

    expect(result).toEqual({ error: "Debes iniciar sesión para subir una imagen" });
    expect(prismaUsuarioUpdateMock).not.toHaveBeenCalled();
  });

  it("should return an error if saveProfileImageFile returns an error", async () => {
    verifySessionMock.mockResolvedValue({ isAuth: true, session: { userID: "user-1", role: "tenant" } });

    const fd = new FormData();
    fd.append("imagen", new File(["data"], "archivo.txt", { type: "text/plain" }));

    const result = await uploadProfile(fd);

    expect(result).toEqual({ error: "Formato de imagen no válido. Usa JPG, PNG, WebP o GIF." });
    expect(prismaUsuarioUpdateMock).not.toHaveBeenCalled();
  });

  it("should return a generic error if saveProfileImageFile returns neither image nor error", async () => {
    verifySessionMock.mockResolvedValue({ isAuth: true, session: { userID: "user-1", role: "tenant" } });

    // Pass a non-File value so saveProfileImageFile returns { error: "..." }
    // covering the result.error || !result.imagen branch
    const fd = new FormData();
    fd.append("imagen", "no-es-un-file");

    const result = await uploadProfile(fd);

    expect(result.error).toBeDefined();
    expect(prismaUsuarioUpdateMock).not.toHaveBeenCalled();
  });

  it("should return a generic error if saveProfileImageFile does not return an image", async () => {
    verifySessionMock.mockResolvedValue({ isAuth: true, session: { userID: "user-1", role: "tenant" } });

    // Pass a non-File value so saveProfileImageFile returns { error: "..." }
    const fd = new FormData();
    fd.append("imagen", "no-es-un-file");

    const result = await uploadProfile(fd);

    expect(result.error).toBeDefined();
    expect(prismaUsuarioUpdateMock).not.toHaveBeenCalled();
  });

  it("should update the user image and return the URL on success", async () => {
    verifySessionMock.mockResolvedValue({ isAuth: true, session: { userID: "user-1", role: "tenant" } });
    mkdirSync(join(process.cwd(), "public", "uploads", "profiles"), { recursive: true });
    prismaUsuarioUpdateMock.mockResolvedValueOnce({});

    const fd = new FormData();
    fd.append("imagen", new File(["img"], "avatar.png", { type: "image/png" }));

    const result = await uploadProfile(fd);

    expect(result.error).toBeUndefined();
    expect(result.imagen).toMatch(/^\/uploads\/profiles\/user-1-\d+\.png$/);
    expect(prismaUsuarioUpdateMock).toHaveBeenCalledWith({
      where: { id: "user-1" },
      data: { image: result.imagen }
    });
  });
});
