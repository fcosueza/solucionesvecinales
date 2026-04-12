import { cookies as mockCookies } from "next/headers";
import eliminarSesion from "./eliminarSesion";

// Mock cookies
jest.mock("next/headers", () => ({
  cookies: jest.fn()
}));

(mockCookies as jest.Mock).mockReturnValue({
  delete: jest.fn()
});

describe("Pruebas de la función eliminarSesion", () => {
  it("Debe llamar a la función eliminarSesion para borrar la sesión del usuario", async () => {
    const almacenCookies = await mockCookies();
    await eliminarSesion();

    expect(almacenCookies.delete).toHaveBeenCalled();
  });
});
