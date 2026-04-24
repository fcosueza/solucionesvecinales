import logOut from "./logOut";
import { eliminarSesion } from "@/lib/session";
import { redirect } from "next/navigation";

jest.mock("next/navigation");
jest.mock("@/lib/session");

describe("Suite de pruebas de logOutAction", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Debe llamar a la funcio eliminarSesion", async () => {
    await logOut();

    expect(eliminarSesion).toHaveBeenCalled();
  });

  it("Debe redirigir al usuario a la página de inicio", async () => {
    await logOut();

    expect(redirect).toHaveBeenCalledWith("/");
  });
});
