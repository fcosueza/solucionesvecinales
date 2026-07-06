import { cookies as mockCookies } from "next/headers";
import deleteSession from "./deleteSession";

// Mock cookies
jest.mock("next/headers", () => ({
  cookies: jest.fn()
}));

(mockCookies as jest.Mock).mockReturnValue({
  delete: jest.fn()
});

describe("deleteSession test suits", () => {
  it("should call deleteSession to remove the user's session", async () => {
    const almacenCookies = await mockCookies();
    await deleteSession();

    expect(almacenCookies.delete).toHaveBeenCalled();
  });
});
