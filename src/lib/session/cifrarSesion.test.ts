import { SessionPayload, UserRole } from "@/types";
import cifrarSesion from "./cifrarSesion";
import { SignJWT } from "jose";

jest.mock("jose", () => {
  return {
    SignJWT: jest.fn().mockImplementation(() => ({
      setProtectedHeader: jest.fn().mockReturnThis(),
      setIssuedAt: jest.fn().mockReturnThis(),
      setExpirationTime: jest.fn().mockReturnThis(),
      sign: jest.fn().mockResolvedValue("mocked.jwt.token")
    }))
  };
});

describe("cifrarSesion test suite...", () => {
  const cargaDatos: SessionPayload = { userID: "1", role: UserRole.tenant };
  const fechaExp: Date = new Date(Date.now() + 30000);

  it("Debe crear un token con encabezado protegido", async () => {
    await cifrarSesion(cargaDatos, fechaExp);

    expect(SignJWT).toHaveBeenCalled();
  });

  it("Debe crear un token con la hora de expiración especificada", async () => {
    const instanciaMock = (SignJWT as jest.Mock).mock.results[0].value;

    await cifrarSesion(cargaDatos, fechaExp);

    expect(instanciaMock.setProtectedHeader).toHaveBeenCalledWith({ alg: "HS256" });
    expect(instanciaMock.setIssuedAt).toHaveBeenCalled();
    expect(instanciaMock.setExpirationTime).toHaveBeenCalledWith(fechaExp);
    expect(instanciaMock.sign).toHaveBeenCalled();
  });

  it("Debe retornar el token simulado", async () => {
    const resultado = await cifrarSesion(cargaDatos, fechaExp);

    expect(resultado).toBe("mocked.jwt.token");
  });
});
