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
  it("Should call cookies delete function to delete the user session", async () => {
    const almacenCookies = await mockCookies();
    await eliminarSesion();

    expect(almacenCookies.delete).toHaveBeenCalled();
  });
});
