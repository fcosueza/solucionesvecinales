/**
 * @jest-environment node
 */

import { cookies as mockCookies } from "next/headers";
import { UserRole } from "@/types";
import createSession from "./createSession";

jest.mock("next/headers", () => ({
  cookies: jest.fn()
}));

(mockCookies as jest.Mock).mockReturnValue({
  set: jest.fn()
});

describe("createSession test suite...", () => {
  it("Should call cokkies.set to set the cookie", async () => {
    const cookieStore = await mockCookies();
    const role = UserRole.admin;
    const userId = "1";

    await createSession(userId, role);

    expect(cookieStore.set).toHaveBeenCalledTimes(1);
  });
});
