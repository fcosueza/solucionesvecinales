import { cookies } from "next/headers";
import decryptSession from "./decryptSession";
import updateSession from "./updateSession";

jest.mock("./decryptSession");
jest.mock("next/headers", () => ({
  cookies: jest.fn()
}));

describe("updateSession test suite...", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should return null if there is no session cookie", async () => {
    (cookies as jest.Mock).mockResolvedValue({
      get: jest.fn().mockReturnValue(undefined)
    });

    const result = await updateSession();
    expect(result).toBeNull();
  });

  it("Should return null if decryptSession returns an error", async () => {
    (decryptSession as jest.Mock).mockResolvedValue({ error: "Invalid token" });
    (cookies as jest.Mock).mockResolvedValue({
      get: jest.fn().mockReturnValue({ value: "mockToken" })
    });

    const result = await updateSession();
    expect(result).toBeNull();
  });

  it("Should refresh the session cookie if session is valid", async () => {
    const mockSet = jest.fn();
    const mockGet = jest.fn().mockReturnValue({ value: "validToken" });

    (decryptSession as jest.Mock).mockResolvedValue({ userId: "123" });
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
