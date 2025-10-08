import createSession from "./createSession";
import encryptSession from "./encryptSession";
import { cookies } from "next/headers";
import { UserRole } from "@/types";

// Mock encryptSession and cookies
jest.mock("./encryptSession", () => jest.fn());
jest.mock("next/headers", () => ({
  cookies: jest.fn()
}));

describe("createSession test suite...", () => {
  const mockSet = jest.fn();
  const mockCookies = { set: mockSet };
  const mockEncryptSession = encryptSession as jest.Mock;
  const mockCookiesFn = cookies as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockCookiesFn.mockResolvedValue(mockCookies);
  });

  it("Should create the session correctly", async () => {
    const fakeSessionToken = "encrypted-session-token";
    mockEncryptSession.mockResolvedValue(fakeSessionToken);

    const userID = "user123";
    const role: UserRole = UserRole.admin;

    const now = Date.now();
    jest.spyOn(global.Date, "now").mockReturnValue(now);

    await createSession(userID, role);

    expect(mockEncryptSession).toHaveBeenCalledWith({ userID, role }, expect.any(Date));
    expect(mockCookiesFn).toHaveBeenCalled();
    expect(mockSet).toHaveBeenCalledWith(
      "session",
      fakeSessionToken,
      expect.objectContaining({
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/"
      })
    );
  });

  it("Should not call set if the token generation fails", async () => {
    mockEncryptSession.mockRejectedValueOnce(new Error("encryption failed"));

    await expect(createSession("user123", "USER" as UserRole)).rejects.toThrow("encryption failed");

    expect(mockEncryptSession).toHaveBeenCalled();
    expect(mockSet).not.toHaveBeenCalled();
  });

  it("Should throw and error if cookies fail", async () => {
    mockEncryptSession.mockResolvedValue("some-token");
    mockCookiesFn.mockRejectedValueOnce(new Error("Cookies API error"));

    await expect(createSession("id", "USER" as UserRole)).rejects.toThrow("Cookies API error");

    expect(mockSet).not.toHaveBeenCalled();
  });
});
