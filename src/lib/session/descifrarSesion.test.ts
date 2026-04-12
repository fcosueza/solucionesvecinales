import { jwtVerify } from "jose";
import descifrarSesion from "./descifrarSesion";
import { SessionPayload, UserRole } from "@/types";

jest.mock("jose", () => ({
  jwtVerify: jest.fn()
}));

describe("Suite de pruebas de la función descifrarSesion", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("Debe devolver el payload si el token es correcto", async () => {
    const mockPayload: SessionPayload = { userID: "123", role: UserRole.tenant };

    (jwtVerify as jest.Mock).mockResolvedValueOnce({ payload: mockPayload });

    const resultado = await descifrarSesion("valid.token.here");

    expect(jwtVerify).toHaveBeenCalledWith("valid.token.here", expect.anything(), { algorithms: ["HS256"] });
    expect(resultado).toEqual(mockPayload);
  });

  it("Debe devolver un error si jwtVerify lanza una excepción", async () => {
    (jwtVerify as jest.Mock).mockRejectedValueOnce(new Error("Invalid token"));

    const resultado = await descifrarSesion("invalid.token.here");

    expect(resultado).toEqual({
      error: "session error",
      message: "Session can't be decrypted."
    });
  });

  it("Debe devolver un error si el token está vacío", async () => {
    (jwtVerify as jest.Mock).mockRejectedValueOnce(new Error("No token provided"));

    const resultado = await descifrarSesion(undefined);

    expect(jwtVerify).toHaveBeenCalled();
    expect(resultado).toEqual({
      error: "session error",
      message: "Session can't be decrypted."
    });
  });
});
