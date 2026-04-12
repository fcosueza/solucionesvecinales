import crearSesion from "./crearSesion";
import cifrarSesion from "./cifrarSesion";
import { cookies } from "next/headers";
import { UserRole } from "@/types";

// Mock cifrarSesion and cookies
jest.mock("./cifrarSesion", () => jest.fn());
jest.mock("next/headers", () => ({
  cookies: jest.fn()
}));

describe("crearSesion test suite...", () => {
  const mockEstablece = jest.fn();
  const mockAlmacenCookies = { set: mockEstablece };
  const mockCifrarSesion = cifrarSesion as jest.Mock;
  const mockFnCookies = cookies as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockFnCookies.mockResolvedValue(mockAlmacenCookies);
  });

  it("Should create the session correctly", async () => {
    const tokenFalso = "encrypted-session-token";
    mockCifrarSesion.mockResolvedValue(tokenFalso);

    const idUsuario = "user123";
    const rol: UserRole = UserRole.admin;

    const ahora = Date.now();
    jest.spyOn(global.Date, "now").mockReturnValue(ahora);

    await crearSesion(idUsuario, rol);

    expect(mockCifrarSesion).toHaveBeenCalledWith({ userID: idUsuario, role: rol }, expect.any(Date));
    expect(mockFnCookies).toHaveBeenCalled();
    expect(mockEstablece).toHaveBeenCalledWith(
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

  it("Should not call set if the token generation fails", async () => {
    mockCifrarSesion.mockRejectedValueOnce(new Error("encryption failed"));

    await expect(crearSesion("user123", "USER" as UserRole)).rejects.toThrow("encryption failed");

    expect(mockCifrarSesion).toHaveBeenCalled();
    expect(mockEstablece).not.toHaveBeenCalled();
  });

  it("Should throw and error if cookies fail", async () => {
    mockCifrarSesion.mockResolvedValue("some-token");
    mockFnCookies.mockRejectedValueOnce(new Error("Cookies API error"));

    await expect(crearSesion("id", "USER" as UserRole)).rejects.toThrow("Cookies API error");

    expect(mockEstablece).not.toHaveBeenCalled();
  });
});
