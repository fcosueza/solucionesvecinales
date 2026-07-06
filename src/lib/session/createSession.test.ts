import createSession from "./createSession";
import encodeSession from "./encodeSession";
import { cookies } from "next/headers";
import { UserRole } from "@/types";

// Mock encodeSession and cookies
jest.mock("./encodeSession", () => jest.fn());
jest.mock("next/headers", () => ({
  cookies: jest.fn()
}));

describe("createSession test suite", () => {
  const mockSet = jest.fn();
  const mockCookieStore = { set: mockSet };
  const mockEncodeSession = encodeSession as jest.Mock;
  const mockFnCookies = cookies as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockFnCookies.mockResolvedValue(mockCookieStore);
  });

  it("should create the session correctly", async () => {
    const fakeToken = "encrypted-session-token";
    mockEncodeSession.mockResolvedValue(fakeToken);

    const userID = "user123";
    const role: UserRole = UserRole.admin;

    const now = Date.now();
    jest.spyOn(global.Date, "now").mockReturnValue(now);

    await createSession(userID, role);

    expect(mockEncodeSession).toHaveBeenCalledWith({ userID: userID, role: role }, expect.any(Date));
    expect(mockFnCookies).toHaveBeenCalled();
    expect(mockSet).toHaveBeenCalledWith(
      "session",
      fakeToken,
      expect.objectContaining({
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/"
      })
    );
  });

  it("should not call mockSet if token generation fails", async () => {
    mockEncodeSession.mockRejectedValueOnce(new Error("encryption failed"));

    await expect(createSession("user123", "USER" as UserRole)).rejects.toThrow("encryption failed");

    expect(mockEncodeSession).toHaveBeenCalled();
    expect(mockSet).not.toHaveBeenCalled();
  });

  it("should throw an error if cookies fail", async () => {
    mockEncodeSession.mockResolvedValue("some-token");
    mockFnCookies.mockRejectedValueOnce(new Error("Cookies API error"));

    await expect(createSession("id", "USER" as UserRole)).rejects.toThrow("Cookies API error");

    expect(mockSet).not.toHaveBeenCalled();
  });
});
