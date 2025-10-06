import logOutAction from "./logOutAction";
import { deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

jest.mock("next/navigation");
jest.mock("@/lib/session");

describe("logOutAction test suite...", () => {
  it("Should call deleteSession function", async () => {
    await logOutAction();

    expect(deleteSession).toHaveBeenCalled();
  });

  it("Should redirect the user to home page", async () => {
    await logOutAction();

    expect(redirect).toHaveBeenCalledWith("/");
  });
});
