import logOut from "./logOut";
import { deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

jest.mock("next/navigation");
jest.mock("@/lib/session");

describe("logOutAction server function test suite", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should call the deleteSession function", async () => {
    await logOut();

    expect(deleteSession).toHaveBeenCalled();
  });

  it("Should redirect the user to the home page", async () => {
    await logOut();

    expect(redirect).toHaveBeenCalledWith("/");
  });
});
