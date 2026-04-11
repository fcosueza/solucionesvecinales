import logOutAction from "./logOutAction";
import { deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

jest.mock("next/navigation");
jest.mock("@/lib/session");

describe("logOutAction test suite", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Debe llamar a la función deleteSession", async () => {
    await logOutAction();

    expect(deleteSession).toHaveBeenCalled();
  });

  it("Debe redirigir al usuario a la página de inicio", async () => {
    await logOutAction();

    expect(redirect).toHaveBeenCalledWith("/");
  });
});
