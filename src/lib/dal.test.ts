import verifySession from "./dal";
import { cookies } from "next/headers";
import { descifrarSesion } from "@/lib/session";

jest.mock("next/headers", () => ({
  cookies: jest.fn()
}));

jest.mock("@/lib/session", () => ({
  descifrarSesion: jest.fn()
}));

describe("Suite de pruebas de verifySession", () => {
  const cookiesMock = cookies as jest.Mock;
  const descifrarSesionMock = descifrarSesion as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Debe devolver isAuth false si descifrarSesion devuelve error", async () => {
    cookiesMock.mockResolvedValue({
      get: jest.fn().mockReturnValue({ value: "cookie-token" })
    });
    descifrarSesionMock.mockResolvedValue({ error: "token_invalido", message: "Sesion invalida" });

    const result = await verifySession();

    expect(descifrarSesionMock).toHaveBeenCalledWith("cookie-token");
    expect(result).toEqual({ isAuth: false });
  });

  it("Debe devolver isAuth true y session cuando la sesion es valida", async () => {
    const payload = { userID: "user-1", role: "admin", iat: 111, exp: 222 };

    cookiesMock.mockResolvedValue({
      get: jest.fn().mockReturnValue({ value: "cookie-token" })
    });
    descifrarSesionMock.mockResolvedValue(payload);

    const result = await verifySession();

    expect(descifrarSesionMock).toHaveBeenCalledWith("cookie-token");
    expect(result).toEqual({
      isAuth: true,
      session: payload
    });
  });

  it("Debe pasar undefined a descifrarSesion si no hay cookie de session", async () => {
    cookiesMock.mockResolvedValue({
      get: jest.fn().mockReturnValue(undefined)
    });
    descifrarSesionMock.mockResolvedValue({ error: "cookie_missing", message: "Sin cookie" });

    const result = await verifySession();

    expect(descifrarSesionMock).toHaveBeenCalledWith(undefined);
    expect(result).toEqual({ isAuth: false });
  });
});
