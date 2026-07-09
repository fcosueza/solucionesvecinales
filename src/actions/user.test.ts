import verifySession from "@/lib/dal";
import { deleteUser as deleteUserById } from "@/lib/user";
import { FormActionState, UserRole } from "@/types";
import { revalidatePath } from "next/cache";
import { deleteUser } from "./user";

// Mocks
jest.mock("@/lib/dal", () => jest.fn());
jest.mock("next/cache", () => ({
  revalidatePath: jest.fn()
}));
jest.mock("@/lib/user", () => ({
  deleteUser: jest.fn()
}));

describe("Test suite for user server functions", () => {
  const verifySessionMock = verifySession as jest.Mock;
  const deleteUserByIdMock = deleteUserById as jest.Mock;
  const revalidatePathMock = revalidatePath as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return unauthorized error if there is no authenticated session", async () => {
    verifySessionMock.mockResolvedValue({ isAuth: false });

    const prevState: FormActionState = { state: "error", message: "" };
    const formData = new FormData();
    formData.set("id", "user-1");

    await expect(deleteUser(prevState, formData)).resolves.toEqual({
      state: "error",
      message: "No estas autorizado para realizar esta acción"
    });

    expect(deleteUserByIdMock).not.toHaveBeenCalled();
    expect(revalidatePathMock).not.toHaveBeenCalled();
  });

  it("should return unauthorized error if the role is not webAdmin", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: { userID: "admin-1", role: UserRole.admin }
    });

    const prevState: FormActionState = { state: "error", message: "" };
    const formData = new FormData();
    formData.set("id", "user-1");

    await expect(deleteUser(prevState, formData)).resolves.toEqual({
      state: "error",
      message: "No estas autorizado para realizar esta acción"
    });

    expect(deleteUserByIdMock).not.toHaveBeenCalled();
    expect(revalidatePathMock).not.toHaveBeenCalled();
  });

  it("should return invalid_user_id error if the id is empty", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: { userID: "web-admin-1", role: UserRole.webAdmin }
    });

    const prevState: FormActionState = { state: "error", message: "" };
    const formData = new FormData();
    formData.set("id", "   ");

    await expect(deleteUser(prevState, formData)).resolves.toEqual({
      state: "error",
      message: "Se requiere un ID de usuario válido"
    });

    expect(deleteUserByIdMock).not.toHaveBeenCalled();
    expect(revalidatePathMock).not.toHaveBeenCalled();
  });

  it("should return invalid_user_id error if no id is sent", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: { userID: "web-admin-1", role: UserRole.webAdmin }
    });

    const formData = new FormData();
    const prevState: FormActionState = { state: "error", message: "" };

    await expect(deleteUser(prevState, formData)).resolves.toEqual({
      state: "error",
      message: "Se requiere un ID de usuario válido"
    });

    expect(deleteUserByIdMock).not.toHaveBeenCalled();
    expect(revalidatePathMock).not.toHaveBeenCalled();
  });

  it("should return user_is_community_admin error if lib reports it", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: { userID: "web-admin-1", role: UserRole.webAdmin }
    });
    deleteUserByIdMock.mockResolvedValue({
      error: "user_is_community_admin",
      message: "No se puede eliminar un usuario que aun administra comunidades"
    });

    const formData = new FormData();
    formData.set("id", "user-25");
    const prevState: FormActionState = { state: "error", message: "" };

    await expect(deleteUser(prevState, formData)).resolves.toEqual({
      state: "error",
      message: "No se puede eliminar un usuario que aun administra comunidades"
    });

    expect(deleteUserByIdMock).toHaveBeenCalledWith("user-25");
    expect(revalidatePathMock).not.toHaveBeenCalled();
  });

  it("should return not found error if lib reports it", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: { userID: "web-admin-1", role: UserRole.webAdmin }
    });
    deleteUserByIdMock.mockResolvedValue({
      error: "not_found",
      message: "No existe el usuario a eliminar"
    });

    const formData = new FormData();
    formData.set("id", "user-25");
    const prevState: FormActionState = { state: "error", message: "" };

    await expect(deleteUser(prevState, formData)).resolves.toEqual({
      state: "error",
      message: "No existe el usuario a eliminar"
    });

    expect(deleteUserByIdMock).toHaveBeenCalledWith("user-25");
    expect(revalidatePathMock).not.toHaveBeenCalled();
  });

  it("should delete the user and revalidate paths when everything is valid", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: { userID: "web-admin-1", role: UserRole.webAdmin }
    });
    deleteUserByIdMock.mockResolvedValue(null);

    const formData = new FormData();
    formData.set("id", "  user-25  ");
    const prevState: FormActionState = { state: "error", message: "" };

    await expect(deleteUser(prevState, formData)).resolves.toEqual({
      state: "success",
      message: "Usuario eliminado exitosamente"
    });

    expect(deleteUserByIdMock).toHaveBeenCalledWith("user-25");
    expect(revalidatePathMock).toHaveBeenCalledTimes(2);
    expect(revalidatePathMock).toHaveBeenNthCalledWith(1, "/backoffice/users");
    expect(revalidatePathMock).toHaveBeenNthCalledWith(2, "/backoffice/overview");
  });

  it("should return any deleteUser error message in deleteUser", async () => {
    verifySessionMock.mockResolvedValue({
      isAuth: true,
      session: { userID: "web-admin-1", role: UserRole.webAdmin }
    });

    deleteUserByIdMock.mockResolvedValue({
      error: "delete_user_failed",
      message: "No se pudo eliminar el usuario"
    });

    const formData = new FormData();
    formData.set("id", "user-25");
    const prevState: FormActionState = { state: "error", message: "" };

    await expect(deleteUser(prevState, formData)).resolves.toEqual({
      state: "error",
      message: "No se pudo eliminar el usuario"
    });

    expect(deleteUserByIdMock).toHaveBeenCalledWith("user-25");
    expect(revalidatePathMock).not.toHaveBeenCalled();
  });
});
