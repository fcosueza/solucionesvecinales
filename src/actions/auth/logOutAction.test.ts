import logOutAction from "./logOutAction";
import { eliminarSesion } from "@/lib/session";
import { redirect } from "next/navigation";

jest.mock("next/navigation");
jest.mock("@/lib/session");

describe("Pruebas de la server action logOutAction", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Debe llamar a la funcio eliminarSesion", async () => {
    await logOutAction();

    expect(eliminarSesion).toHaveBeenCalled();
  });

  it("Debe redirigir al usuario a la página de inicio", async () => {
    await logOutAction();

    expect(redirect).toHaveBeenCalledWith("/");
  });
});
