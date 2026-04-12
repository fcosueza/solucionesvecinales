import crearSesion from "./crearSesion";
import cifrarSesion from "./cifrarSesion";
import { cookies } from "next/headers";
import { UserRole } from "@/types";

// Mock cifrarSesion and cookies
jest.mock("./cifrarSesion", () => jest.fn());
jest.mock("next/headers", () => ({
  cookies: jest.fn()
}));

describe("Pruebas de la función crearSesion", () => {
  const mockSet = jest.fn();
  const mockAlmacenCookies = { set: mockSet };
  const mockCifrarSesion = cifrarSesion as jest.Mock;
  const mockFnCookies = cookies as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockFnCookies.mockResolvedValue(mockAlmacenCookies);
  });

  it("Debe crear la sesión correctamente", async () => {
    const tokenFalso = "encrypted-session-token";
    mockCifrarSesion.mockResolvedValue(tokenFalso);

    const idUsuario = "user123";
    const rol: UserRole = UserRole.admin;

    const ahora = Date.now();
    jest.spyOn(global.Date, "now").mockReturnValue(ahora);

    await crearSesion(idUsuario, rol);

    expect(mockCifrarSesion).toHaveBeenCalledWith({ userID: idUsuario, role: rol }, expect.any(Date));
    expect(mockFnCookies).toHaveBeenCalled();
    expect(mockSet).toHaveBeenCalledWith(
      "session",
      tokenFalso,
      expect.objectContaining({
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/"
      })
    );
  });

  it("No debe llamar a mockSet si la generación del token falla", async () => {
    mockCifrarSesion.mockRejectedValueOnce(new Error("encryption failed"));

    await expect(crearSesion("user123", "USER" as UserRole)).rejects.toThrow("encryption failed");

    expect(mockCifrarSesion).toHaveBeenCalled();
    expect(mockSet).not.toHaveBeenCalled();
  });

  it("Debe lanzar un error si fallan las cookies", async () => {
    mockCifrarSesion.mockResolvedValue("some-token");
    mockFnCookies.mockRejectedValueOnce(new Error("Cookies API error"));

    await expect(crearSesion("id", "USER" as UserRole)).rejects.toThrow("Cookies API error");

    expect(mockSet).not.toHaveBeenCalled();
  });
});
