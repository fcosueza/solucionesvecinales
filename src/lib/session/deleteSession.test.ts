import { cookies as mockCookies } from "next/headers";
import deleteSession from "./deleteSession";

// Mock cookies
jest.mock("next/headers", () => ({
  cookies: jest.fn()
}));

(mockCookies as jest.Mock).mockReturnValue({
  delete: jest.fn()
});

describe("deleteSession testing suite..", () => {
  it("Should call cookies delete function to delete the user session", async () => {
    const cookieStore = await mockCookies();
    await deleteSession();

    expect(cookieStore.delete).toHaveBeenCalled();
  });
});
