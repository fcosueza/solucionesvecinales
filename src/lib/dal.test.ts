import verifySession from "./dal";
import { cookies } from "next/headers";
import { decodeSession } from "@/lib/session";

jest.mock("next/headers", () => ({
  cookies: jest.fn()
}));

jest.mock("@/lib/session", () => ({
  decodeSession: jest.fn()
}));

describe("Suite de pruebas de verifySession", () => {
  const cookiesMock = cookies as jest.Mock;
  const decodeSessionMock = decodeSession as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Debe devolver isAuth false si decodeSession devuelve error", async () => {
    cookiesMock.mockResolvedValue({
      get: jest.fn().mockReturnValue({ value: "cookie-token" })
    });
    decodeSessionMock.mockResolvedValue({ error: "token_invalido", message: "Sesion invalida" });

    const result = await verifySession();

    expect(decodeSessionMock).toHaveBeenCalledWith("cookie-token");
    expect(result).toEqual({ isAuth: false });
  });

  it("Debe devolver isAuth true y session cuando la sesion es valida", async () => {
    const payload = { userID: "user-1", role: "admin", iat: 111, exp: 222 };

    cookiesMock.mockResolvedValue({
      get: jest.fn().mockReturnValue({ value: "cookie-token" })
    });
    decodeSessionMock.mockResolvedValue(payload);

    const result = await verifySession();

    expect(decodeSessionMock).toHaveBeenCalledWith("cookie-token");
    expect(result).toEqual({
      isAuth: true,
      session: payload
    });
  });

  it("Debe pasar undefined a decodeSession si no hay cookie de session", async () => {
    cookiesMock.mockResolvedValue({
      get: jest.fn().mockReturnValue(undefined)
    });
    decodeSessionMock.mockResolvedValue({ error: "cookie_missing", message: "Sin cookie" });

    const result = await verifySession();

    expect(decodeSessionMock).toHaveBeenCalledWith(undefined);
    expect(result).toEqual({ isAuth: false });
  });
});
