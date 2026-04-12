import { cookies } from "next/headers";
import descifrarSesion from "./descifrarSesion";
import actualizarSesion from "./actualizarSesion";

jest.mock("./descifrarSesion");
jest.mock("next/headers", () => ({
  cookies: jest.fn()
}));

describe("actualizarSesion test suite...", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should return null if there is no session cookie", async () => {
    (cookies as jest.Mock).mockResolvedValue({
      get: jest.fn().mockReturnValue(undefined)
    });

    const resultado = await actualizarSesion();
    expect(resultado).toBeNull();
  });

  it("Should return null if decryptSession returns an error", async () => {
    (descifrarSesion as jest.Mock).mockResolvedValue({ error: "Invalid token" });
    (cookies as jest.Mock).mockResolvedValue({
      get: jest.fn().mockReturnValue({ value: "mockToken" })
    });

    const resultado = await actualizarSesion();
    expect(resultado).toBeNull();
  });

  it("Should refresh the session cookie if session is valid", async () => {
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
