import { cookies as mockCookies } from "next/headers";
import eliminarSesion from "./eliminarSesion";

// Mock cookies
jest.mock("next/headers", () => ({
  cookies: jest.fn()
}));

(mockCookies as jest.Mock).mockReturnValue({
  delete: jest.fn()
});

describe("eliminarSesion testing suite..", () => {
  it("Debe llamar a la función eliminar de cookies para borrar la sesión del usuario", async () => {
    const almacenCookies = await mockCookies();
    await eliminarSesion();

    expect(almacenCookies.delete).toHaveBeenCalled();
  });
});
