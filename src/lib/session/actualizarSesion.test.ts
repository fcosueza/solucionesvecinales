import { cookies } from "next/headers";
import descifrarSesion from "./descifrarSesion";
import actualizarSesion from "./actualizarSesion";

jest.mock("./descifrarSesion");
jest.mock("next/headers", () => ({
  cookies: jest.fn()
}));

describe("Pruebas de la función actualizarSesion", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Debe devolver null si no hay cookie de sesión", async () => {
    (cookies as jest.Mock).mockResolvedValue({
      get: jest.fn().mockReturnValue(undefined)
    });

    const resultado = await actualizarSesion();
    expect(resultado).toBeNull();
  });

  it("Debe devolver null si descifrarSesion devuelve un error", async () => {
    (descifrarSesion as jest.Mock).mockResolvedValue({ error: "Invalid token" });
    (cookies as jest.Mock).mockResolvedValue({
      get: jest.fn().mockReturnValue({ value: "mockToken" })
    });

    const resultado = await actualizarSesion();
    expect(resultado).toBeNull();
  });

  it("Debe actualizar la cookie de sesión si la sesión es válida", async () => {
    const mockEstablece = jest.fn();
    const mockObtiene = jest.fn().mockReturnValue({ value: "validToken" });

    (descifrarSesion as jest.Mock).mockResolvedValue({ userId: "123" });
    (cookies as jest.Mock).mockResolvedValue({
      get: mockObtiene,
      set: mockEstablece
    });

    await actualizarSesion();

    expect(mockEstablece).toHaveBeenCalledTimes(1);
    expect(mockEstablece).toHaveBeenCalledWith(
      "session",
      "validToken",
      expect.objectContaining({
        httpOnly: true,
        secure: true,
        sameSite: true,
        path: "/",
        expires: expect.any(Date)
      })
    );
  });
});
