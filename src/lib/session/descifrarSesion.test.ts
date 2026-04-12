import { jwtVerify } from "jose";
import descifrarSesion from "./descifrarSesion";
import { SessionPayload, UserRole } from "@/types";

jest.mock("jose", () => ({
  jwtVerify: jest.fn()
}));

describe("descifrarSesion test suite...", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("Should return the payload if the token is correct", async () => {
    const mockCarga: SessionPayload = { userID: "123", role: UserRole.tenant };

    (jwtVerify as jest.Mock).mockResolvedValueOnce({ payload: mockCarga });

    const resultado = await descifrarSesion("valid.token.here");

    expect(jwtVerify).toHaveBeenCalledWith("valid.token.here", expect.anything(), { algorithms: ["HS256"] });
    expect(resultado).toEqual(mockCarga);
  });

  it("Should return an error if jwtVerify throw an exception", async () => {
    (jwtVerify as jest.Mock).mockRejectedValueOnce(new Error("Invalid token"));

    const resultado = await descifrarSesion("invalid.token.here");

    expect(resultado).toEqual({
      error: "session error",
      message: "Session can't be decrypted."
    });
  });

  it("Should return an error if the tokne is empty", async () => {
    (jwtVerify as jest.Mock).mockRejectedValueOnce(new Error("No token provided"));

    const resultado = await descifrarSesion(undefined);

    expect(jwtVerify).toHaveBeenCalled();
    expect(resultado).toEqual({
      error: "session error",
      message: "Session can't be decrypted."
    });
  });
});
