import { cookies } from "next/headers";
import decodeSession from "./decodeSession";
import updateSession from "./updateSession";

jest.mock("./decodeSession");
jest.mock("next/headers", () => ({
  cookies: jest.fn()
}));

describe("updateSession test suite", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return null if decodeSession returns an error", async () => {
    (decodeSession as jest.Mock).mockResolvedValue({ error: "Invalid token" });
    (cookies as jest.Mock).mockResolvedValue({
      get: jest.fn().mockReturnValue({ value: "mockToken" })
    });

    const result = await updateSession();
    expect(result).toBeNull();
  });

  it("should update the session cookie if the session is valid", async () => {
    const mockSet = jest.fn();
    const mockGet = jest.fn().mockReturnValue({ value: "validToken" });

    (decodeSession as jest.Mock).mockResolvedValue({ userId: "123" });
    (cookies as jest.Mock).mockResolvedValue({
      get: mockGet,
      set: mockSet
    });

    await updateSession();

    expect(mockSet).toHaveBeenCalledTimes(1);
    expect(mockSet).toHaveBeenCalledWith(
      "session",
      "validToken",
      expect.objectContaining({
        httpOnly: true,
        secure: true,
        sameSite: true,
        path: "/",
        expires: expect.any(Date)
      })
    );
  });
});
