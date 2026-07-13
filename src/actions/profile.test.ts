import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { saveImage } from "@/lib/saveImage";
import { deleteSession } from "@/lib/session";
import { deleteUser } from "@/lib/user";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { deleteProfile, updateProfile, uploadProfile } from "./profile";

// Mocks
jest.mock("@/lib/dal", () => jest.fn());
jest.mock("@/lib/saveImage", () => ({
  saveImage: jest.fn()
}));
jest.mock("@/lib/session", () => ({
  deleteSession: jest.fn()
}));
jest.mock("next/navigation", () => ({
  redirect: jest.fn()
}));
jest.mock("@/lib/user", () => ({
  deleteUser: jest.fn()
}));
jest.mock("@/lib/prisma", () => ({
  __esModule: true,
  default: {
    user: {
      update: jest.fn()
    }
  }
}));

describe("Test suite for profile actions", () => {
  const verifySessionMock = verifySession as jest.Mock;
  const saveImageMock = saveImage as jest.Mock;
  const deleteSessionMock = deleteSession as jest.Mock;
  const deleteUserMock = deleteUser as jest.Mock;
  const redirectMock = redirect as unknown as jest.Mock;
  const prismaUserUpdateMock = (prisma as any).user.update as jest.Mock;

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
    expect(result.message).toBe("Datos del formulario no válidos");
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
    const bcryptHashSpy = jest.spyOn(bcrypt, "hash").mockResolvedValue("hashed-pass" as never);

    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: { userID: "user-1", role: "tenant" }
    });
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
    expect(bcryptHashSpy).toHaveBeenCalledWith("123456789012345", 10);
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
    saveImageMock.mockResolvedValue({
      error: "invalid_image_type",
      message: "Formato de imagen no válido. Usa JPG, PNG, WebP o GIF."
    });

    const formData = validForm();
    formData.append("imagen", new File(["img"], "avatar.txt", { type: "text/plain" }));

    const result = await updateProfile({ state: "error", message: "" }, formData);

    expect(result.state).toBe("error");
    expect(result.message).toBe("Formato de imagen no válido. Usa JPG, PNG, WebP o GIF.");
    expect(result.payload).toBe(formData);
    expect(saveImageMock).toHaveBeenCalledWith(expect.any(File), "user-1", "profiles");
    expect(prismaUserUpdateMock).not.toHaveBeenCalled();
  });

  it("Should return an error in updateProfile if saveImage returns size error", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: { userID: "user-1", role: "tenant" }
    });
    saveImageMock.mockResolvedValue({
      error: "image_too_large",
      message: "El tamaño de la imagen no puede exceder los 5 MB."
    });

    const formData = validForm();
    formData.append("imagen", new File(["x".repeat(5 * 1024 * 1024 + 1)], "avatar.png", { type: "image/png" }));

    const result = await updateProfile({ state: "error", message: "" }, formData);

    expect(result.state).toBe("error");
    expect(result.message).toBe("El tamaño de la imagen no puede exceder los 5 MB.");
    expect(result.payload).toBe(formData);
    expect(saveImageMock).toHaveBeenCalledWith(expect.any(File), "user-1", "profiles");
    expect(prismaUserUpdateMock).not.toHaveBeenCalled();
  });

  it("Should return an error in updateProfile if saveImage throws", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: { userID: "user-1", role: "tenant" }
    });
    saveImageMock.mockRejectedValue(new Error("disk error"));

    const formData = validForm();
    formData.append("imagen", new File(["img"], "avatar.png", { type: "image/png" }));

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
    saveImageMock.mockResolvedValue("/uploads/profiles/user-1-123456.png");
    prismaUserUpdateMock.mockResolvedValue({});

    const formData = validForm();
    formData.append("imagen", new File(["img"], "avatar.png", { type: "image/png" }));

    const result = await updateProfile({ state: "error", message: "" }, formData);

    expect(result.state).toBe("success");
    expect(result.message).toBe("Perfil actualizado exitosamente");
    expect(saveImageMock).toHaveBeenCalledWith(expect.any(File), "user-1", "profiles");
    expect(prismaUserUpdateMock).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: "user-1" },
        data: expect.objectContaining({ image: "/uploads/profiles/user-1-123456.png" })
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
    expect(saveImageMock).not.toHaveBeenCalled();
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
    expect(deleteUserMock).not.toHaveBeenCalled();
  });

  it("Should return any deleteUser error message in deleteProfile", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: { userID: "user-1", role: "tenant" }
    });
    deleteUserMock.mockResolvedValue({
      error: "delete_user_failed",
      message: "No se pudo eliminar el usuario"
    });

    const result = await deleteProfile({ state: "error", message: "" });

    expect(result).toEqual({
      state: "error",
      message: "No se pudo eliminar el usuario"
    });
    expect(deleteSessionMock).not.toHaveBeenCalled();
    expect(redirectMock).not.toHaveBeenCalled();
  });

  it("Should return an error in deleteProfile when the user still administrates communities", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: { userID: "user-1", role: "tenant" }
    });
    deleteUserMock.mockResolvedValue({
      error: "user_is_community_admin",
      message: "No se puede eliminar un usuario que aun administra comunidades"
    });

    const result = await deleteProfile({ state: "error", message: "" });

    expect(result).toEqual({
      state: "error",
      message: "No se puede eliminar un usuario que aun administra comunidades"
    });
    expect(deleteSessionMock).not.toHaveBeenCalled();
    expect(redirectMock).not.toHaveBeenCalled();
  });

  it("Should return an error in deleteProfile when the user does not exist", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: { userID: "user-1", role: "tenant" }
    });
    deleteUserMock.mockResolvedValue({
      error: "not_found",
      message: "No existe el usuario a eliminar"
    });

    const result = await deleteProfile({ state: "error", message: "" });

    expect(result).toEqual({ state: "error", message: "No existe el usuario a eliminar" });
    expect(deleteSessionMock).not.toHaveBeenCalled();
    expect(redirectMock).not.toHaveBeenCalled();
  });

  it("Should delete the profile, close the session, and redirect", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: { userID: 25, role: "tenant" }
    });
    deleteUserMock.mockResolvedValue(null);

    await deleteProfile({ state: "error", message: "" });

    expect(deleteUserMock).toHaveBeenCalledTimes(1);
    expect(deleteUserMock).toHaveBeenCalledWith("25");
    expect(deleteSessionMock).toHaveBeenCalledTimes(1);
    expect(redirectMock).toHaveBeenCalledWith("/");
  });
});

describe("Test suite for uploadProfile", () => {
  const verifySessionMock = verifySession as jest.Mock;
  const saveImageMock = saveImage as jest.Mock;
  const prismaUserUpdateMock = (prisma as any).user.update as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return an error if there is no authenticated session", async () => {
    verifySessionMock.mockResolvedValue({ isAuth: false, session: null });

    const result = await uploadProfile(new FormData());

    expect(result).toEqual({
      error: "unauthorized",
      message: "Debes iniciar sesión para subir una imagen"
    });
    expect(prismaUserUpdateMock).not.toHaveBeenCalled();
  });

  it("should return an error if saveImage returns an error", async () => {
    verifySessionMock.mockResolvedValue({ isAuth: true, session: { userID: "user-1", role: "tenant" } });
    saveImageMock.mockResolvedValue({
      error: "invalid_image_type",
      message: "Formato de imagen no válido. Usa JPG, PNG, WebP o GIF."
    });

    const fd = new FormData();
    fd.append("imagen", new File(["data"], "archivo.txt", { type: "text/plain" }));

    const result = await uploadProfile(fd);

    expect(result).toEqual({
      error: "invalid_image_type",
      message: "Formato de imagen no válido. Usa JPG, PNG, WebP o GIF."
    });
    expect(prismaUserUpdateMock).not.toHaveBeenCalled();
  });

  it("should return a generic error if prisma update fails after saveImage", async () => {
    verifySessionMock.mockResolvedValue({ isAuth: true, session: { userID: "user-1", role: "tenant" } });
    saveImageMock.mockResolvedValue("/uploads/profiles/user-1-123456.png");
    prismaUserUpdateMock.mockRejectedValue(new Error("db failure"));

    const fd = new FormData();
    fd.append("imagen", new File(["img"], "avatar.png", { type: "image/png" }));

    const result = await uploadProfile(fd);

    expect(result).toEqual({
      error: "upload_image_failed",
      message: "No se pudo subir la imagen. Por favor, inténtalo de nuevo."
    });
    expect(prismaUserUpdateMock).toHaveBeenCalledWith({
      where: { id: "user-1" },
      data: { image: "/uploads/profiles/user-1-123456.png" }
    });
  });

  it("should update the user image and return the URL on success", async () => {
    verifySessionMock.mockResolvedValue({ isAuth: true, session: { userID: "user-1", role: "tenant" } });
    saveImageMock.mockResolvedValue("/uploads/profiles/user-1-123456.png");
    prismaUserUpdateMock.mockResolvedValueOnce({});

    const fd = new FormData();
    fd.append("imagen", new File(["img"], "avatar.png", { type: "image/png" }));

    const result = await uploadProfile(fd);

    expect(result).toEqual({ imagen: "/uploads/profiles/user-1-123456.png" });
    expect(prismaUserUpdateMock).toHaveBeenCalledWith({
      where: { id: "user-1" },
      data: { image: "/uploads/profiles/user-1-123456.png" }
    });
  });
});
