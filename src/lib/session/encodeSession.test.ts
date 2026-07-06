import { SessionPayload, UserRole } from "@/types";
import encodeSession from "./encodeSession";
import { SignJWT } from "jose";

jest.mock("jose", () => {
  return {
    SignJWT: jest.fn().mockImplementation(() => ({
      setProtectedHeader: jest.fn().mockReturnThis(),
      setIssuedAt: jest.fn().mockReturnThis(),
      setExpirationTime: jest.fn().mockReturnThis(),
      sign: jest.fn().mockResolvedValue("mocked.jwt.token")
    }))
  };
});

describe("encodeSession test suite", () => {
  const loadedData: SessionPayload = { userID: "1", role: UserRole.tenant };
  const expirationDate: Date = new Date(Date.now() + 30000);

  it("should call SignJWT with the correct parameters", async () => {
    await encodeSession(loadedData, expirationDate);

    expect(SignJWT).toHaveBeenCalled();
  });

  it("should create a token with the specified expiration time", async () => {
    const mockInstance = (SignJWT as jest.Mock).mock.results[0].value;

    await encodeSession(loadedData, expirationDate);

    expect(mockInstance.setProtectedHeader).toHaveBeenCalledWith({ alg: "HS256" });
    expect(mockInstance.setIssuedAt).toHaveBeenCalled();
    expect(mockInstance.setExpirationTime).toHaveBeenCalledWith(expirationDate);
    expect(mockInstance.sign).toHaveBeenCalled();
  });

  it("should return the token", async () => {
    const result = await encodeSession(loadedData, expirationDate);

    expect(result).toBe("mocked.jwt.token");
  });
});
